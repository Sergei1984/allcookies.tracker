use crate::domain::{PagedResult, Product};
use crate::AppError;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct NewProduct {
    pub title: String,
    pub image: Option<String>,
    pub is_disabled: bool,
}

#[async_trait]
pub trait ProductClientService {
    async fn find_all(
        &self,
        title: Option<String>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Product>, AppError>;
}

#[async_trait]
pub trait ProductAdminService {
    async fn find_all(
        &self,
        title: Option<String>,
        is_disabled: Option<bool>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Product>, AppError>;
}
