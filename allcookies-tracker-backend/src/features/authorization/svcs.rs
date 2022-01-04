use super::ActiveUserService;
use crate::features::ActiveUser;
use crate::features::UserAccount;
use crate::AnError;
use async_trait::async_trait;

pub struct ActiveUserServiceImpl<TActiveUserRepo: ActiveUserRepository + Send + Sync> {
    repo: TActiveUserRepo,
}

#[async_trait]
pub trait ActiveUserRepository {
    async fn find_user_by_id(&self, user_id: i64) -> Result<Option<UserAccount>, AnError>;
}

impl<TActiveUserRepo> ActiveUserServiceImpl<TActiveUserRepo>
where
    TActiveUserRepo: ActiveUserRepository + Send + Sync,
{
    pub fn new(repo: TActiveUserRepo) -> Self {
        ActiveUserServiceImpl { repo: repo }
    }
}

#[async_trait]
impl<TCurrentUserRepo> ActiveUserService for ActiveUserServiceImpl<TCurrentUserRepo>
where
    TCurrentUserRepo: ActiveUserRepository + Send + Sync,
{
    async fn get_active_user(&self, id: i64) -> Result<Option<ActiveUser>, AnError> {
        let account = self.repo.find_user_by_id(id).await?;

        match account {
            Some(account) => {
                if account.is_blocked {
                    return Ok(None);
                } else if account.account_role.to_lowercase() == "admin" {
                    return Ok(Some(ActiveUser::Admin(account.into())));
                } else {
                    return Ok(Some(ActiveUser::Manager(account.into())));
                }
            }
            None => {
                return Ok(None);
            }
        }
    }
}
