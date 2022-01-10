use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserAccountInfo {
    pub id: i64,
    pub login: String,
    pub name: String,
    pub is_blocked: bool,
}
