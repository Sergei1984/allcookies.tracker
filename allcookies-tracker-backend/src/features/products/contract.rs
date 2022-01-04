use crate::features::optional_patch_field;
use crate::features::{PagedResult, Patch, Product};
use crate::AppError;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct NewProduct {
    pub title: String,
    pub image_url: Option<String>,
    pub is_disabled: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateProduct {
    pub title: Option<String>,
    #[serde(default, deserialize_with = "optional_patch_field")]
    pub image_url: Option<Option<String>>,
    pub is_disabled: Option<bool>,
}

impl Patch<UpdateProduct> for Product {
    fn patch(&self, patch: &UpdateProduct) -> Self {
        Product {
            title: patch.title.clone().unwrap_or_else(|| self.title.clone()),
            image_url: patch
                .image_url
                .clone()
                .unwrap_or_else(|| self.image_url.clone()),
            is_disabled: patch.is_disabled.unwrap_or_else(|| self.is_disabled),
            ..(*self)
        }
    }
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

    async fn create(&self, new_product: &NewProduct) -> Result<Product, AppError>;

    async fn update(&self, id: i64, patch: &UpdateProduct) -> Result<Product, AppError>;

    async fn delete(&self, id: i64) -> Result<Product, AppError>;
}
