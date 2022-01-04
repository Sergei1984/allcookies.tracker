use crate::features::authorization::ActiveUserInfo;
use crate::features::contract::Patch;
use crate::features::selling_points::repos::SellingPointRepository;
use crate::features::AdminUserInfo;
use crate::features::NewSellingPoint;
use crate::features::PagedResult;
use crate::features::SellingPoint;
use crate::features::SellingPointAdminService;
use crate::features::UpdateSellingPoint;
use crate::AnError;
use crate::AppError;
use async_trait::async_trait;
use validator::Validate;

pub struct SellingPointAdminServiceImpl<TSellingPointRepo: SellingPointRepository + Send + Sync> {
    selling_point_repo: TSellingPointRepo,
    current_user: AdminUserInfo,
}

impl<TSellingPointRepo> SellingPointAdminServiceImpl<TSellingPointRepo>
where
    TSellingPointRepo: SellingPointRepository + Send + Sync,
{
    pub fn new(current_user: AdminUserInfo, selling_point_repo: TSellingPointRepo) -> Self {
        SellingPointAdminServiceImpl {
            current_user: current_user,
            selling_point_repo: selling_point_repo,
        }
    }
}

#[async_trait]
impl<TSellingPointRepo> SellingPointAdminService for SellingPointAdminServiceImpl<TSellingPointRepo>
where
    TSellingPointRepo: SellingPointRepository + Send + Sync,
{
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError> {
        self.selling_point_repo.get_all(skip, take).await
    }

    async fn create(&self, item: NewSellingPoint) -> Result<SellingPoint, AnError> {
        let is_valid = item.validate();

        if is_valid.is_err() {
            return Err(AppError::new_an_err(
                "Input is not valid",
                actix_web::http::StatusCode::from_u16(400).unwrap(),
            ));
        }

        self.selling_point_repo
            .create(item, self.current_user.id())
            .await
    }

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AppError> {
        self.selling_point_repo
            .get_one(id)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))
    }

    async fn update(&self, id: i64, patch: UpdateSellingPoint) -> Result<SellingPoint, AppError> {
        let existing = self.get_one(id).await?;
        if let Some(existing) = existing {
            let updated = existing.patch(&patch);

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

    async fn delete(&self, id: i64) -> Result<(), AppError> {
        let _ = self
            .selling_point_repo
            .delete(id, self.current_user.id())
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

        Ok(())
    }
}
