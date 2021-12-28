use crate::domain::LatLonPoint;
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
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CloseDayActivityInfo {
    pub id: i64,
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheckActivityInfo {
    pub id: i64,
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
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
    pub quantity: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductRef {
    pub id: i64,
    pub title: String,
    pub image_url: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Photo {
    /// Base64 encoded photo data
    photo_data: String,
}
