use crate::domain::products::contract::ProductAdminService;
use crate::domain::products::repos::PersistentProductRepository;
use crate::domain::products::svcs::ProductAdminServiceImpl;
use crate::domain::{
    AdminUserInfo, IdPath, NewProduct, PagedResult, Product, SkipTake, UpdateProduct,
};
use actix_web::{delete, error, get, patch, post, web, Scope};
use serde::{Deserialize, Serialize};

pub fn product_admin_route() -> Scope {
    web::scope("/admin/product")
        .service(get_product)
        .service(create_product)
        .service(update_product)
        .service(delete_product)
}

#[derive(Serialize, Deserialize)]
pub struct GetProductQuery {
    pub is_disabled: Option<bool>,
    pub title: Option<String>,
}

#[get("")]
pub async fn get_product(
    filter: web::Query<GetProductQuery>,
    skip_take: web::Query<SkipTake>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<Product>>, actix_web::Error> {
    let filter = filter.into_inner();
    let svc = ProductAdminServiceImpl::new(PersistentProductRepository::new(&pool), current_user);

    let result = svc
        .find_all(
            filter.title,
            filter.is_disabled,
            skip_take.skip.unwrap_or(0),
            skip_take.take.unwrap_or(20),
        )
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(result))
}

#[post("")]
pub async fn create_product(
    product: web::Json<NewProduct>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<Product>, actix_web::Error> {
    let svc = ProductAdminServiceImpl::new(PersistentProductRepository::new(&pool), current_user);

    let new_product = svc
        .create(&product.into_inner())
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(new_product))
}

#[patch("{id}")]
pub async fn update_product(
    id: web::Path<IdPath>,
    product: web::Json<UpdateProduct>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<Product>, actix_web::Error> {
    let svc = ProductAdminServiceImpl::new(PersistentProductRepository::new(&pool), current_user);

    svc.update(id.id, &product.into_inner())
        .await
        .map(|r| web::Json(r))
        .map_err(|e| e.into())
}

#[delete("{id}")]
pub async fn delete_product(
    id: web::Path<IdPath>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<Product>, actix_web::Error> {
    let svc = ProductAdminServiceImpl::new(PersistentProductRepository::new(&pool), current_user);

    svc.delete(id.id)
        .await
        .map_err(|e| e.into())
        .map(|e| web::Json(e))
}
