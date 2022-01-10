use crate::features::{AdminUserInfo, PagedResult, UserAccountInfo};
use crate::{AnError, AppError};

#[async_trait::async_trait]
pub trait UserAccountRepository {
    async fn get_all_non_admins(
        &self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<UserAccountInfo>, AnError>;

    async fn get_by_id(&self, id: i64) -> Result<Option<UserAccountInfo>, AnError>;
}

pub struct AdminUserAccountService<TRepo: UserAccountRepository + Send + Sync> {
    repo: TRepo,
    current_user: AdminUserInfo,
}

impl<TRepo> AdminUserAccountService<TRepo>
where
    TRepo: UserAccountRepository + Send + Sync,
{
    pub fn new(current_user: AdminUserInfo, repo: TRepo) -> Self {
        AdminUserAccountService {
            repo: repo,
            current_user: current_user,
        }
    }

    pub async fn get_all(
        &self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<UserAccountInfo>, AppError> {
        let data = self
            .repo
            .get_all_non_admins(skip, take)
            .await
            .map_err(|e| AppError::bad_request(&e.to_string()))?;

        Ok(data)
    }

    pub async fn get_by_id(&self, id: i64) -> Result<Option<UserAccountInfo>, AppError> {
        let result = self
            .repo
            .get_by_id(id)
            .await
            .map_err(|e| AppError::bad_request(&e.to_string()))?;
        Ok(result)
    }
}
