use crate::domain::LatLonPoint;
use crate::AppError;
use async_trait::async_trait;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[async_trait]
pub trait ActivityClientService {
    async fn open_day() -> Result<OpenDayActivity, AppError>;
    async fn close_day() -> Result<CloseDayActivity, AppError>;
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "activity_type")]
pub enum AllActivity {
    OpenDayActivity,
    CloseDayActivity,
    SellingPointCheckActivity,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OpenDayActivity {
    pub activity_type: String,
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CloseDayActivity {
    pub activity_type: String,
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheckActivity {
    pub activity_type: String,
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
