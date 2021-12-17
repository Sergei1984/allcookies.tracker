use crate::domain::UserAccount;
use crate::AnError;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CurrentUser {
    pub id: i64,
    pub email: String,
    pub name: String,
    pub account_role: String,
    pub iss: String,
    pub sub: String,
    pub exp: i64,
}

#[async_trait]
pub trait CurrentUserService {
    async fn is_user_active(&self, current_user: CurrentUser) -> Result<ActiveUserInfo, AnError>;
}

#[allow(unused)]
pub struct ActiveUserInfo {
    id: i64,
    email: String,
    account_role: String,
}

#[allow(unused)]
impl ActiveUserInfo {
    pub fn id(&self) -> i64 {
        self.id
    }

    pub fn email(&self) -> String {
        self.email.clone()
    }

    pub fn is_admin(&self) -> bool {
        self.account_role.to_lowercase() == "admin"
    }

    pub fn is_agent(&self) -> bool {
        self.account_role.to_lowercase() == "manager"
    }
}

impl From<UserAccount> for ActiveUserInfo {
    fn from(user_account: UserAccount) -> Self {
        ActiveUserInfo {
            id: user_account.id,
            email: user_account.login,
            account_role: user_account.account_role,
        }
    }
}
