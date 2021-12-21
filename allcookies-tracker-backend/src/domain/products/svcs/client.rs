use crate::domain::products::repos::ProductRepository;
use crate::domain::{ManagerUserInfo, PagedResult, Product, ProductClientService};
use crate::AppError;
use async_trait::async_trait;

#[allow(unused)]
pub struct ProductClientServiceImpl<TProductRepository: ProductRepository + Send + Sync> {
    product_repo: TProductRepository,
    current_user: ManagerUserInfo,
}

impl<TProductRepository> ProductClientServiceImpl<TProductRepository>
where
    TProductRepository: ProductRepository + Send + Sync,
{
    pub fn new(product_repo: TProductRepository, current_user: ManagerUserInfo) -> Self {
        ProductClientServiceImpl {
            product_repo: product_repo,
            current_user: current_user,
        }
    }
}

#[async_trait]
impl<TProductRepository> ProductClientService for ProductClientServiceImpl<TProductRepository>
where
    TProductRepository: ProductRepository + Send + Sync,
{
    async fn find_all(
        &self,
        title: Option<String>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Product>, AppError> {
        self.product_repo
            .get_all(title, Some(false), skip, take)
            .await
            .map_err(|e| AppError::internal_server_err(Some(&e.to_string())))
    }
}
