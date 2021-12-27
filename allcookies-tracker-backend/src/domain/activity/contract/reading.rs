use crate::domain::LatLonPoint;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(tag = "t")]
pub enum ActivityInfo {
    OpenDayActivityInfo,
    CloseDayActivityInfo,
    SellingPointCheckActivityInfo,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OpenDayActivityInfo {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CloseDayActivityInfo {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheckActivityInfo {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
    pub selling_point: SellingPointRef,
    pub products: Vec<ProductCheckInfo>,
    pub photos: Vec<Photo>,
}

#[derive(Debug, Serialize, Deserialize)]
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
