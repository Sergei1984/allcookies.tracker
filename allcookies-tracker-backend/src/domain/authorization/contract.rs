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
pub trait ActiveUserService {
    async fn get_active_user(&self, id: i64) -> Result<Option<ActiveUser>, AnError>;
}

pub enum ActiveUser {
    Manager(ManagerUserInfo),
    Admin(AdminUserInfo),
}

#[allow(unused)]
pub struct ManagerUserInfo {
    id: i64,
    email: String,
}

#[allow(unused)]
pub struct AdminUserInfo {
    id: i64,
    email: String,
}

#[allow(unused)]
pub trait ActiveUserInfo {
    fn id(&self) -> i64;

    fn email(&self) -> String;

    fn is_admin(&self) -> bool;

    fn is_manager(&self) -> bool;
}

#[allow(unused)]
impl ActiveUserInfo for ManagerUserInfo {
    fn id(&self) -> i64 {
        self.id
    }

    fn email(&self) -> String {
        self.email.clone()
    }

    fn is_admin(&self) -> bool {
        false
    }

    fn is_manager(&self) -> bool {
        true
    }
}

#[allow(unused)]
impl ActiveUserInfo for AdminUserInfo {
    fn id(&self) -> i64 {
        self.id
    }

    fn email(&self) -> String {
        self.email.clone()
    }

    fn is_admin(&self) -> bool {
        true
    }

    fn is_manager(&self) -> bool {
        false
    }
}

impl From<UserAccount> for ManagerUserInfo {
    fn from(src: UserAccount) -> Self {
        ManagerUserInfo {
            id: src.id,
            email: src.login.clone(),
        }
    }
}

impl From<UserAccount> for AdminUserInfo {
    fn from(src: UserAccount) -> Self {
        AdminUserInfo {
            id: src.id,
            email: src.login.clone(),
        }
    }
}

impl From<AdminUserInfo> for ManagerUserInfo {
    fn from(src: AdminUserInfo) -> Self {
        ManagerUserInfo {
            id: src.id(),
            email: src.email(),
        }
    }
}
