use crate::domain::geo_primitives::LatLonPoint;
use crate::domain::PagedResult;
use crate::domain::Patch;
use crate::domain::SellingPoint;
use crate::AnError;
use crate::AppError;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct NewSellingPoint {
    pub title: String,
    pub description: Option<String>,
    pub address: Option<String>,
    pub location: LatLonPoint,
    pub is_disabled: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateSellingPoint {
    pub title: Option<String>,
    pub description: Option<Option<String>>,
    pub address: Option<Option<String>>,
    pub location: Option<LatLonPoint>,
    pub is_disabled: Option<bool>,
}

impl Patch<UpdateSellingPoint> for SellingPoint {
    fn patch(&self, patch: UpdateSellingPoint) -> Self {
        SellingPoint {
            id: self.id,
            title: patch.title.unwrap_or_else(|| self.title.clone()),
            description: patch
                .description
                .unwrap_or_else(|| self.description.clone()),
            address: patch.address.unwrap_or_else(|| self.address.clone()),
            location: patch.location.unwrap_or_else(|| self.location),
            is_disabled: patch.is_disabled.unwrap_or_else(|| self.is_disabled),
            ..(*self)
        }
    }
}

#[async_trait]
pub trait SellingPointClientService {
    async fn find_all(
        &self,
        search_by_name: Option<String>,
        location: Option<LatLonPoint>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AppError>;

    async fn create(&self, item: NewSellingPoint) -> Result<SellingPoint, AnError>;

    async fn update(&self, id: i64, patch: UpdateSellingPoint) -> Result<SellingPoint, AppError>;
}

#[async_trait]
pub trait SellingPointAdminService {
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AppError>;

    async fn create(&self, item: NewSellingPoint) -> Result<SellingPoint, AnError>;

    async fn update(&self, id: i64, patch: UpdateSellingPoint) -> Result<SellingPoint, AppError>;
}
