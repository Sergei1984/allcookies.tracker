use crate::features::selling_points::repos::SellingPointRepository;
use crate::features::{
    ActiveUserInfo, LatLonPoint, ManagerUserInfo, NewSellingPoint, PagedResult, Patch,
    SellingPoint, SellingPointClientService, UpdateSellingPoint,
};
use crate::{AnError, AppError};
use async_trait::async_trait;
use validator::Validate;

pub struct SellingPointClientServiceImpl<TSellingPointRepo: SellingPointRepository + Send + Sync> {
    selling_point_repo: TSellingPointRepo,
    current_user: ManagerUserInfo,
}

impl<TSellingPointRepo> SellingPointClientServiceImpl<TSellingPointRepo>
where
    TSellingPointRepo: SellingPointRepository + Send + Sync,
{
    pub fn new(current_user: ManagerUserInfo, selling_point_repo: TSellingPointRepo) -> Self {
        SellingPointClientServiceImpl {
            current_user: current_user,
            selling_point_repo: selling_point_repo,
        }
    }
}

#[async_trait]
impl<TSellingPointRepo> SellingPointClientService
    for SellingPointClientServiceImpl<TSellingPointRepo>
where
    TSellingPointRepo: SellingPointRepository + Send + Sync,
{
    async fn find_all(
        &self,
        search_by_name: Option<String>,
        location: Option<LatLonPoint>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<SellingPoint>, AnError> {
        self.selling_point_repo
            .find_active(search_by_name, location, skip, take)
            .await
    }

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AppError> {
        let item = self
            .selling_point_repo
            .get_one(id)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

        if let Some(item) = item {
            if item.is_disabled {
                return Err(AppError::not_found_err());
            }

            return Ok(Some(item));
        } else {
            Err(AppError::not_found_err())
        }
    }

    async fn create(&self, item: NewSellingPoint) -> Result<SellingPoint, AnError> {
        if let Err(_) = item.validate() {
            return Err(Box::new(AppError::bad_request("Selling point is invalid")));
        }

        let mut new_point = NewSellingPoint { ..item };
        new_point.is_disabled = false;

        self.selling_point_repo
            .create(new_point, self.current_user.id())
            .await
    }

    async fn update(&self, id: i64, patch: UpdateSellingPoint) -> Result<SellingPoint, AppError> {
        let existing = self.get_one(id).await?;
        if let Some(existing) = existing {
            let mut updated = existing.patch(&patch);
            updated.is_disabled = false;

            let _ = self
                .selling_point_repo
                .update(updated, self.current_user.id())
                .await
                .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

            self.get_one(id).await?.ok_or(AppError::not_found_err())
        } else {
            Err(AppError::not_found_err())
        }
    }
}
