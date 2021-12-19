use crate::domain::geo_primitives::LatLonPoint;
use crate::domain::NewSellingPoint;
use crate::domain::PagedResult;
use crate::domain::SellingPoint;
use crate::AnError;
use async_trait::async_trait;

#[async_trait]
pub trait SellingPointClientService {
    async fn find_all(
        &self,
        search_by_name: Option<String>,
        location: Option<LatLonPoint>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn create(&self, item: NewSellingPoint) -> Result<SellingPoint, AnError>;
}

#[async_trait]
pub trait SellingPointAdminService {
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn create(&self, item: NewSellingPoint) -> Result<SellingPoint, AnError>;
}
