use crate::features::activity::repo::ActivityRepo;
use crate::features::activity::svcs::utils::to_activity_info;
use crate::features::{
    ActiveUserInfo, ActivityInfo, ManagerUserInfo, NewCloseDayActivity, NewOpenDayActivity,
    NewSellingPointCheckActivity, PagedResult,
};
use crate::AppError;
use chrono::Utc;
use validator::Validate;

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
        let (data, extra) = self
            .repo
            .get_my_activity(self.current_user.id(), skip, take)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

        let activity = to_activity_info(&self.current_user, data.data, extra);

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
            .create_activity(
                "open_day",
                open_day.time,
                open_day.location,
                None,
                self.current_user.id(),
            )
            .await
            .map_err(|e| {
                AppError::new(
                    &e.to_string(),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                )
            })?;

        self.get_activity_info_by_id(activity_id).await
    }

    pub async fn close_day(
        &mut self,
        close_day: NewCloseDayActivity,
    ) -> Result<ActivityInfo, AppError> {
        let _ = self.is_day_open().await?;

        let activity_id = self
            .repo
            .create_activity(
                "close_day",
                close_day.time,
                close_day.location,
                None,
                self.current_user.id(),
            )
            .await
            .map_err(|e| {
                AppError::new(
                    &e.to_string(),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                )
            })?;

        self.get_activity_info_by_id(activity_id).await
    }

    pub async fn check_selling_point(
        &mut self,
        point_check: NewSellingPointCheckActivity,
    ) -> Result<ActivityInfo, AppError> {
        let _ = self.is_day_open().await?;

        if let Err(_) = point_check.validate() {
            return Err(AppError::bad_request("Point check data is invalid"));
        }

        let activity_id = self
            .repo
            .create_activity(
                "point_check",
                point_check.time,
                point_check.location,
                Some(point_check.selling_point_id),
                self.current_user.id(),
            )
            .await
            .map_err(|e| {
                AppError::new(
                    &e.to_string(),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                )
            })?;

        for product in point_check.products {
            let _ = self
                .repo
                .create_selling_point_check(
                    activity_id,
                    product.product_id,
                    product.remaining_quantity,
                    product.order_quantity,
                )
                .await
                .map_err(|e| {
                    AppError::new(
                        &e.to_string(),
                        actix_web::http::StatusCode::from_u16(400).unwrap(),
                    )
                })?;
        }

        self.get_activity_info_by_id(activity_id).await
    }

    pub async fn add_photo(&mut self, activity_id: i64, photo: &[u8]) -> Result<(), AppError> {
        let _ = self.is_day_open().await?;
        let activity = self.get_activity_info_by_id(activity_id).await?;

        if let ActivityInfo::SellingPointCheck(selling_point_check) = activity {
            if selling_point_check.created.id == self.current_user.id()
                && selling_point_check.time.date() == Utc::today()
            {
                let _ = self
                    .repo
                    .create_photo(selling_point_check.id, photo)
                    .await
                    .map_err(|e| AppError::bad_request(&e.to_string()))?;

                return Ok(());
            }
        }

        return Err(AppError::bad_request("Invalid activity"));
    }

    pub async fn get_photo(
        &mut self,
        activity_id: i64,
        photo_id: i64,
    ) -> Result<Vec<u8>, AppError> {
        let _ = self.is_day_open().await?;
        let activity = self.get_activity_info_by_id(activity_id).await?;

        if let ActivityInfo::SellingPointCheck(selling_point_check) = activity {
            if selling_point_check.created.id == self.current_user.id() {
                let data = self
                    .repo
                    .get_photo(activity_id, photo_id)
                    .await
                    .map_err(|e| AppError::bad_request(&e.to_string()))?;

                return Ok(data);
            }
        }

        return Err(AppError::bad_request("Invalid activity"));
    }

    async fn is_day_open(&mut self) -> Result<(), AppError> {
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
            if last_activity.activity_type == "close_day" && last_activity.at.date() == Utc::today()
            {
                return Err(AppError::new(
                    "Day is closed already",
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                ));
            }
        }

        Ok(())
    }

    async fn get_activity_info_by_id(
        &mut self,
        activity_id: i64,
    ) -> Result<ActivityInfo, AppError> {
        let (activity, extra) = self
            .repo
            .get_activity_info_by_id(activity_id)
            .await
            .map_err(|e| {
                AppError::new(
                    &e.to_string(),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                )
            })?;

        to_activity_info(&self.current_user, vec![activity], extra)
            .into_iter()
            .next()
            .ok_or(AppError::new(
                "New created activity is not found",
                actix_web::http::StatusCode::from_u16(400).unwrap(),
            ))
    }
}
