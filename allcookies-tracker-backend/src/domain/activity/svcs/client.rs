use crate::domain::activity::repo::ActivityRepo;
use crate::domain::{
    ActiveUserInfo, ActivityInfo, ClientActivityService, CloseDayActivityInfo, ManagerUserInfo,
    OpenDayActivityInfo, PagedResult, SellingPointCheckActivityInfo, SellingPointRef,
};
use crate::AppError;

pub struct ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    repo: TActivityRepo,
    current_user: ManagerUserInfo,
}

impl<TActivityRepo> ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    pub fn new(current_user: ManagerUserInfo, repo: TActivityRepo) -> Self {
        ClientActivityServiceImpl {
            current_user: current_user,
            repo: repo,
        }
    }
}

#[async_trait::async_trait]
impl<TActivityRepo> ClientActivityService for ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    async fn get_my_activity(
        &mut self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<ActivityInfo>, AppError> {
        let (data, _info, selling_points) = self
            .repo
            .get_my_activity(self.current_user.id(), skip, take)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

        let activity: Vec<ActivityInfo> = data
            .data
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
                        products: vec![],
                        photos: vec![],
                    })
                }
            })
            .collect();

        Ok(PagedResult {
            data: activity,
            total: data.total,
        })
    }
}
