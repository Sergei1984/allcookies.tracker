use crate::domain::activity::repo::ActivityRepo;
use crate::domain::activity::repo::SellingPointCheckDto;
use crate::domain::{
    ActiveUserInfo, Activity, ActivityInfo, CloseDayActivityInfo, ManagerUserInfo,
    NewOpenDayActivity, OpenDayActivityInfo, PagedResult, ProductCheckInfo, ProductRef,
    SellingPoint, SellingPointCheckActivityInfo, SellingPointRef,
};
use crate::AppError;
use chrono::Utc;

pub struct ClientActivityService<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    repo: TActivityRepo,
    current_user: ManagerUserInfo,
}

impl<TActivityRepo> ClientActivityService<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    pub fn new(current_user: ManagerUserInfo, repo: TActivityRepo) -> Self {
        ClientActivityService {
            current_user: current_user,
            repo: repo,
        }
    }

    pub async fn get_my_activity(
        &mut self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<ActivityInfo>, AppError> {
        let (data, info, selling_points) = self
            .repo
            .get_my_activity(self.current_user.id(), skip, take)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

        let activity = self.to_activity_info(data.data, info, selling_points);

        Ok(PagedResult {
            data: activity,
            total: data.total,
        })
    }

    pub async fn open_day(
        &mut self,
        open_day: NewOpenDayActivity,
    ) -> Result<ActivityInfo, AppError> {
        let last_activity_opt = self
            .repo
            .get_latest_activity(self.current_user.id())
            .await
            .map_err(|e| {
                AppError::new(
                    &e.to_string(),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                )
            })?;

        if let Some(last_activity) = last_activity_opt {
            if last_activity.activity_type != "close_day" && last_activity.at.date() == Utc::today()
            {
                return Err(AppError::new(
                    "Day is not closed",
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                ));
            }
        }

        let activity_id = self
            .repo
            .create_open_day(self.current_user.id(), open_day.time, open_day.location)
            .await
            .map_err(|e| {
                AppError::new(
                    &e.to_string(),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                )
            })?;

        let (activity, check, selling_points) = self
            .repo
            .get_activity_info_by_id(activity_id)
            .await
            .map_err(|e| {
                AppError::new(
                    &e.to_string(),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                )
            })?;

        self.to_activity_info(vec![activity], check, selling_points)
            .into_iter()
            .next()
            .ok_or(AppError::new(
                "New created activity is not found",
                actix_web::http::StatusCode::from_u16(400).unwrap(),
            ))
    }

    fn to_activity_info(
        &self,
        activity: Vec<Activity>,
        selling_point_check: Vec<SellingPointCheckDto>,
        selling_points: Vec<SellingPoint>,
    ) -> Vec<ActivityInfo> {
        activity
            .into_iter()
            .map(|i| match i.activity_type.as_str() {
                "open_day" => ActivityInfo::OpenDay(OpenDayActivityInfo {
                    id: i.id,
                    location: i.location,
                    time: i.created_at,
                }),
                "close_day" => ActivityInfo::CloseDay(CloseDayActivityInfo {
                    id: i.id,
                    location: i.location,
                    time: i.created_at,
                }),
                _ => {
                    let selling_point = selling_points
                        .iter()
                        .find(|sp| sp.id == i.selling_point_id.unwrap())
                        .unwrap();

                    ActivityInfo::SellingPointCheck(SellingPointCheckActivityInfo {
                        id: i.id,
                        location: i.location,
                        time: i.created_at,
                        selling_point: SellingPointRef {
                            id: selling_point.id,
                            title: selling_point.title.clone(),
                            address: selling_point.address.clone(),
                            location: selling_point.location.clone(),
                        },
                        products: selling_point_check
                            .iter()
                            .filter(|c| c.activity_id == i.id)
                            .map(|c| ProductCheckInfo {
                                product: ProductRef {
                                    id: c.product_id,
                                    title: c.product_title.clone(),
                                    image_url: c.product_image_url.clone(),
                                },
                                quantity: c.quantity,
                            })
                            .collect(),
                        photos: vec![],
                    })
                }
            })
            .collect()
    }
}
