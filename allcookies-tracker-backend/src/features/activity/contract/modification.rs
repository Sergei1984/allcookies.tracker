use crate::features::LatLonPoint;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use validator::Validate;

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

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct NewSellingPointCheckActivity {
    pub location: Option<LatLonPoint>,

    pub time: DateTime<Utc>,

    #[validate(range(min = 1))]
    pub selling_point_id: i64,

    #[validate]
    pub products: Vec<ProductCheck>,
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct ProductCheck {
    #[validate(range(min = 1))]
    pub product_id: i64,

    #[validate(range(min = 1))]
    pub quantity: Option<i32>,
}
