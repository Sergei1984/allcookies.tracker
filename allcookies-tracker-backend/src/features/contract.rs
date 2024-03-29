use serde::Deserializer;
use crate::features::geo_primitives::LatLonPoint;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Count {
    pub count: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PagedResult<T> {
    pub total: i64,
    pub data: Vec<T>,
}

#[derive(Deserialize, Serialize)]
pub struct SkipTake {
    pub skip: Option<i64>,
    pub take: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct TitleSearch {
    pub title: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct LatLonQuery {
    pub lat: Option<f64>,
    pub lon: Option<f64>,
}

#[derive(Deserialize)]
pub struct IdPath {
    pub id: i64,
}

/// Produces a copy of value with updated fields
pub trait Patch<TPatch> {
    fn patch(&self, patch: &TPatch) -> Self;
}

impl From<LatLonQuery> for Option<LatLonPoint> {
    fn from(src: LatLonQuery) -> Self {
        if src.lat.is_some() && src.lon.is_some() {
            return Some(LatLonPoint {
                lat: src.lat.unwrap_or(0.0),
                lon: src.lon.unwrap_or(0.0),
            });
        }

        None
    }
}

// Any value that is present is considered Some value, including null.
pub fn optional_patch_field<'de, T, D>(deserializer: D) -> Result<Option<T>, D::Error>
    where T: Deserialize<'de>,
          D: Deserializer<'de>
{
    Deserialize::deserialize(deserializer).map(Some)
}