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

#[derive(Debug, Table, Clone)]
#[ormx(table = "selling_point", id = id, insertable, deletable)]
pub struct SellingPoint {
    pub id: i64,
    pub title: String,
    pub description: Option<String>,
    pub address: Option<String>,
    pub created_by: i64
    // pub location: wkb::Decode<geo::geo_types::Geometry<f64>>
}
