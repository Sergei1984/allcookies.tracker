use crate::domain::geo_primitives::LatLonPoint;
use chrono::{offset::Utc, DateTime};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone)]
pub struct UserAccount {
    pub id: i64,
    pub login: String,
    pub password_hash: String,
    pub name: String,
    pub is_blocked: bool,
    pub account_role: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPoint {
    pub id: i64,
    pub title: String,
    pub description: Option<String>,
    pub address: Option<String>,
    pub location: Option<LatLonPoint>, // https://github.com/georust/geozero
    pub is_disabled: bool,
    pub created_by: i64,
    pub created_at: DateTime<Utc>,
    pub modified_by: i64,
    pub modified_at: DateTime<Utc>,
    pub deleted_by: Option<i64>,
    pub deleted_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Product {
    pub id: i64,
    pub title: String,
    pub image_url: Option<String>,
    pub is_disabled: bool,
    pub created_by: i64,
    pub created_at: DateTime<Utc>,
    pub modified_by: i64,
    pub modified_at: DateTime<Utc>,
    pub deleted_by: Option<i64>,
    pub deleted_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Activity {
    pub id: i64,
    pub activity_type: String,
    pub location: Option<LatLonPoint>,
    pub selling_point_id: Option<i64>,
    pub amend_by_activity_id: Option<i64>,
    pub created_by: i64,
    pub created_at: DateTime<Utc>,
    pub deleted_by: Option<i64>,
    pub deleted_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheck {
    pub id: i64,
    pub activity_id: i64,
    pub product_id: i64,
    pub quantity: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheckPhotos {
    pub id: i64,
    pub activity_id: i64,
    pub photo_data: Vec<u8>,
}
