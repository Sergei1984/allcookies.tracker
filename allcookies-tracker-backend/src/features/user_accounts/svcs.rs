use crate::features::{
    AdminUserInfo, NewUserAccount, PagedResult, UpdateUserAccount, UserAccountInfo,
};
use crate::{AnError, AppError};

#[async_trait::async_trait]
pub trait UserAccountRepository {
    async fn get_all_non_admins(
        &self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<UserAccountInfo>, AnError>;

    async fn get_by_id(&self, id: i64) -> Result<Option<UserAccountInfo>, AnError>;

    async fn create_user_account(&self, user_account: NewUserAccount) -> Result<i64, AnError>;

    async fn update_user_account(
        &self,
        user_account_id: i64,
        patch: UpdateUserAccount,
    ) -> Result<Option<()>, AnError>;
}

pub struct AdminUserAccountService<TRepo: UserAccountRepository + Send + Sync> {
    repo: TRepo,
    // current_user: AdminUserInfo,
}

impl<TRepo> AdminUserAccountService<TRepo>
where
    TRepo: UserAccountRepository + Send + Sync,
{
    pub fn new(_current_user: AdminUserInfo, repo: TRepo) -> Self {
        AdminUserAccountService { repo: repo }
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

    pub async fn create_user(
        &self,
        user_account: NewUserAccount,
    ) -> Result<UserAccountInfo, AppError> {
        let user_with_hash = NewUserAccount {
            password: bcrypt::hash(user_account.password, bcrypt::DEFAULT_COST).unwrap(),
            ..user_account
        };

        let id = self
            .repo
            .create_user_account(user_with_hash)
            .await
            .map_err(|e| AppError::bad_request(&e.to_string()))?;

        self.get_by_id(id).await?.ok_or(AppError::not_found_err())
    }

    pub async fn update_user(
        &self,
        user_account_id: i64,
        user_account_patch: UpdateUserAccount,
    ) -> Result<UserAccountInfo, AppError> {
        let user_account_patch_with_hash = UpdateUserAccount {
            password: user_account_patch
                .password
                .map(|pwd| bcrypt::hash(pwd, bcrypt::DEFAULT_COST).unwrap()),
            ..user_account_patch
        };

        let _ = self
            .repo
            .update_user_account(user_account_id, user_account_patch_with_hash)
            .await
            .map_err(|e| AppError::bad_request(&e.to_string()))?;

        self.get_by_id(user_account_id)
            .await?
            .ok_or(AppError::not_found_err())
    }
}
