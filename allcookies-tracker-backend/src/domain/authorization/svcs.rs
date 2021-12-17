use super::{ActiveUserInfo, CurrentUser, CurrentUserService};
use crate::domain::UserAccount;
use crate::AnError;
use crate::AppError;
use async_trait::async_trait;

pub struct CurrentUserServiceImpl<TCurrentUserRepo: CurrentUserRepository + Send + Sync> {
    repo: TCurrentUserRepo,
}

#[async_trait]
pub trait CurrentUserRepository {
    async fn find_user_by_id(&self, user_id: i64) -> Result<Option<UserAccount>, AnError>;
}

#[async_trait]
impl<TCurrentUserRepo> CurrentUserService for CurrentUserServiceImpl<TCurrentUserRepo>
where
    TCurrentUserRepo: CurrentUserRepository + Send + Sync,
{
    async fn is_user_active(&self, current_user: CurrentUser) -> Result<ActiveUserInfo, AnError> {
        let account = self.repo.find_user_by_id(current_user.id).await?;

        
    }
}
