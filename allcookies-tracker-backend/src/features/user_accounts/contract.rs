use crate::features::{Patch, UserAccount};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserAccountInfo {
    pub id: i64,
    pub login: String,
    pub name: String,
    pub is_blocked: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewUserAccount {
    pub login: String,
    pub name: String,
    pub is_blocked: bool,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserAccount {
    pub login: Option<String>,
    pub password: Option<String>,
    pub name: Option<String>,
    pub is_blocked: Option<bool>,
}

impl Patch<UpdateUserAccount> for UserAccount {
    fn patch(&self, patch: &UpdateUserAccount) -> Self {
        UserAccount {
            login: patch.login.clone().unwrap_or_else(|| self.login.clone()),
            password_hash: patch
                .password
                .clone()
                .unwrap_or_else(|| self.password_hash.clone()),
            name: patch.name.clone().unwrap_or_else(|| self.name.clone()),
            is_blocked: patch.is_blocked.unwrap_or_else(|| self.is_blocked),
            account_role: self.account_role.clone(),
            ..(*self)
        }
    }
}
