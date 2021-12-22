use crate::domain::products::repos::ProductRepository;
use crate::domain::{
    ActiveUserInfo, AdminUserInfo, NewProduct, PagedResult, Patch, Product, ProductAdminService,
    UpdateProduct,
};
use crate::AppError;
use async_trait::async_trait;

#[allow(unused)]
pub struct ProductAdminServiceImpl<TProductRepository: ProductRepository + Send + Sync> {
    product_repo: TProductRepository,
    current_user: AdminUserInfo,
}

impl<TProductRepository> ProductAdminServiceImpl<TProductRepository>
where
    TProductRepository: ProductRepository + Send + Sync,
{
    pub fn new(product_repo: TProductRepository, current_user: AdminUserInfo) -> Self {
        ProductAdminServiceImpl {
            product_repo: product_repo,
            current_user: current_user,
        }
    }
}

#[async_trait]
impl<TProductRepository> ProductAdminService for ProductAdminServiceImpl<TProductRepository>
where
    TProductRepository: ProductRepository + Send + Sync,
{
    async fn find_all(
        &self,
        title: Option<String>,
        is_disabled: Option<bool>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Product>, AppError> {
        self.product_repo
            .get_all(title, is_disabled, skip, take)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))
    }

    async fn create(&self, new_product: &NewProduct) -> Result<Product, AppError> {
        self.product_repo
            .create(new_product, self.current_user.id())
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))
    }

    async fn update(&self, id: i64, patch: &UpdateProduct) -> Result<Product, AppError> {
        let product = self
            .product_repo
            .get_one(id)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?
            .ok_or(AppError::not_found_err())?;

        let updated_product = product.patch(&patch);

        let _ = self
            .product_repo
            .update(&updated_product, self.current_user.id())
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;

        self.product_repo
            .get_one(id)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?
            .ok_or(AppError::not_found_err())
    }

    async fn delete(&self, id: i64) -> Result<Product, AppError> {
        self.product_repo
            .delete(id, self.current_user.id())
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?;
            
        self.product_repo
            .get_one(id)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))?
            .ok_or(AppError::not_found_err())
    }
}
