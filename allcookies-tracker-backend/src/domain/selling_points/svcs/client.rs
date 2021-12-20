use crate::domain::authorization::ActiveUserInfo;
use crate::domain::contract::Patch;
use crate::domain::geo_primitives::LatLonPoint;
use crate::domain::selling_points::repos::SellingPointRepository;
use crate::domain::ManagerUserInfo;
use crate::domain::NewSellingPoint;
use crate::domain::PagedResult;
use crate::domain::SellingPoint;
use crate::domain::SellingPointClientService;
use crate::domain::UpdateSellingPoint;
use crate::AnError;
use crate::AppError;
use async_trait::async_trait;

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
        let mut new_point = NewSellingPoint { ..item };
        new_point.is_disabled = false;

        self.selling_point_repo
            .create(new_point, self.current_user.id())
            .await
    }

    async fn update(&self, id: i64, patch: UpdateSellingPoint) -> Result<SellingPoint, AppError> {
        let existing = self.get_one(id).await?;
        if let Some(existing) = existing {
            let updated = existing.patch(patch);

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
