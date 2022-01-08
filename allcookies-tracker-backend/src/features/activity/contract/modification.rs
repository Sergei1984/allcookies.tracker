use crate::features::LatLonPoint;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct NewOpenDayActivity {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewCloseDayActivity {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewSellingPointCheckActivity {
    pub location: Option<LatLonPoint>,
    pub time: DateTime<Utc>,
    pub selling_point_id: i64,
    pub products: Vec<ProductCheck>
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductCheck {
    pub product_id: i64,
    pub quantity: i32,
}