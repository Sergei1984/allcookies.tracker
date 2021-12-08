use ormx::Table;

#[derive(Debug, Table, Clone)]
#[ormx(table = "user_account", id = id, insertable, deletable)]
pub struct UserAccount {
    pub id: i64,
    pub login: String,
    pub password_hash: String,
    pub name: String,
    pub is_blocked: bool,
    pub account_role: String,
}
