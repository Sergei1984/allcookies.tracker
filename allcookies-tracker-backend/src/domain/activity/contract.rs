use chrono::{DateTime, Utc};
use crate::domain::LatLonPoint;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct OpenDayActivity {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CloseDayActivity {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheckActivity {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
    pub selling_point_id: i64,
    pub products: Vec<ProductCheckInfo>,
    pub photos: Vec<Photo>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductCheckInfo {
    pub product_id: i64,
    pub quantity: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Photo {
    /// Base64 encoded photo data
    photo_data: String,
}
