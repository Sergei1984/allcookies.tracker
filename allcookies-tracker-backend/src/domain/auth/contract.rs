use crate::AppError;
use async_trait::async_trait;

use crate::domain::UserAccount;

#[async_trait]
pub trait AuthService {
    async fn login(&self, login: &str, password: &str) -> Result<UserAccount, AppError>;
}

#[async_trait]
pub trait AuthRepository {
    async fn find_account_by_login(&self, login: &str) -> Option<UserAccount>;
}
