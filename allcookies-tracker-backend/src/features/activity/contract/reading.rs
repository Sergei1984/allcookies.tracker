use crate::features::LatLonPoint;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(tag = "activity_type")]
pub enum ActivityInfo {
    #[serde(rename = "open_day")]
    OpenDay(OpenDayActivityInfo),

    #[serde(rename = "close_day")]
    CloseDay(CloseDayActivityInfo),

    #[serde(rename = "point_check")]
    SellingPointCheck(SellingPointCheckActivityInfo),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OpenDayActivityInfo {
    pub id: i64,
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
    pub created: UserActivityRef,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CloseDayActivityInfo {
    pub id: i64,
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
    pub created: UserActivityRef,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheckActivityInfo {
    pub id: i64,
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
    pub created: UserActivityRef,
    pub selling_point: SellingPointRef,
    pub products: Vec<ProductCheckInfo>,
    pub photos: Vec<Photo>,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct SellingPointRef {
    pub id: i64,
    pub title: String,
    pub address: Option<String>,
    pub location: Option<LatLonPoint>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductCheckInfo {
    pub product: ProductRef,
    pub remaining_quantity: Option<i32>,
    pub order_quantity: i32
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductRef {
    pub id: i64,
    pub title: String,
    pub image_url: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Photo {
    pub id: i64,
    pub time: DateTime<Utc>,
    pub url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserActivityRef {
    pub id: i64,
    pub login: String,
    pub name: String,
    pub at: DateTime<Utc>,
}
