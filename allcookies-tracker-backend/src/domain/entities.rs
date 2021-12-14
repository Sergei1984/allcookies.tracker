use crate::domain::geo_primitives::LatLonPoint;
use chrono::{offset::Utc, DateTime};
use ormx::*;


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

#[derive(Debug, Table)]
#[ormx(table = "selling_point", id = id, insertable, deletable)]
pub struct SellingPoint {
    pub id: i64,
    pub title: String,
    pub description: Option<String>,
    pub address: Option<String>,
    #[ormx(custom_type)]
    pub location: Option<LatLonPoint>, // https://github.com/georust/geozero
    pub created_by: i64,
    pub created_at: DateTime<Utc>,
    pub modified_by: i64,
    pub modified_at: DateTime<Utc>,
    pub deleted_by: Option<i64>,
    pub deleted_at: Option<DateTime<Utc>>,
}
