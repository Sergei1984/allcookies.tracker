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

pub struct ActiveUserInfo {
    account_role: String,
}

impl ActiveUserInfo {
    pub fn is_admin(&self) -> bool {
        self.account_role.to_lowercase() == "admin"
    }

    pub fn is_agent(&self) -> bool {
        self.account_role.to_lowercase() == "manager"
    }
}
