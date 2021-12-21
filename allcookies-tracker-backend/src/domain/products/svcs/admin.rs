use crate::domain::products::repos::ProductRepository;
use crate::domain::{AdminUserInfo, PagedResult, Product, ProductAdminService};
use crate::AppError;
use async_trait::async_trait;

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
}
