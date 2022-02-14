use chrono::NaiveDate;

use crate::features::activity::repo::ActivityRepo;
use crate::features::activity::svcs::utils::to_activity_info;
use crate::features::{ActiveUserInfo, ActivityInfo, AdminUserInfo, PagedResult};
use crate::AppError;

pub struct AdminActivityService<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    repo: TActivityRepo,
    current_user: AdminUserInfo,
}

impl<TActivityRepo> AdminActivityService<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    pub fn new(current_user: AdminUserInfo, repo: TActivityRepo) -> Self {
        AdminActivityService {
            current_user: current_user,
            repo: repo,
        }
    }

    pub async fn get_activity(
        &mut self,
        date: Option<NaiveDate>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<ActivityInfo>, AppError> {
        let (data, extra) = self
            .repo
            .get_all_activity(date, skip, take)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

        let activity = to_activity_info(&self.current_user, data.data, extra);

        Ok(PagedResult {
            data: activity,
            total: data.total,
        })
    }

    pub async fn get_photo(
        &mut self,
        activity_id: i64,
        photo_id: i64,
    ) -> Result<Vec<u8>, AppError> {
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
