use crate::domain::products::contract::ProductAdminService;
use crate::domain::products::repos::PersistentProductRepository;
use crate::domain::products::svcs::ProductAdminServiceImpl;
use crate::domain::AdminUserInfo;
use crate::domain::PagedResult;
use crate::domain::Product;
use crate::domain::SkipTake;
use actix_web::{error, get, web, Scope};
use serde::{Deserialize, Serialize};

pub fn product_admin_route() -> Scope {
    web::scope("/admin/product").service(get_product)
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

// #[post("")]
// pub async fn create_selling_point(
//     selling_point: web::Json<NewSellingPoint>,
//     current_user: AdminUserInfo,
//     pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
// ) -> Result<web::Json<SellingPoint>, actix_web::Error> {
//     let svc = SellingPointAdminServiceImpl::new(
//         current_user,
//         PersistentSellingPointRepository::new(&pool),
//     );

//     let new_selling_point = svc
//         .create(selling_point.into_inner())
//         .await
//         .map_err(|e| error::ErrorBadRequest(e))?;

//     Ok(web::Json(new_selling_point))
// }

// #[patch("{id}")]
// pub async fn update_selling_point(
//     id: web::Path<IdPath>,
//     selling_point: web::Json<UpdateSellingPoint>,
//     current_user: AdminUserInfo,
//     pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
// ) -> Result<web::Json<SellingPoint>, actix_web::Error> {
//     let svc = SellingPointAdminServiceImpl::new(
//         current_user,
//         PersistentSellingPointRepository::new(&pool),
//     );

//     svc.update(id.id, selling_point.into_inner())
//         .await
//         .map(|r| web::Json(r))
//         .map_err(|e| e.into())
// }

// #[delete("{id}")]
// pub async fn delete_selling_point(
//     id: web::Path<IdPath>,
//     current_user: AdminUserInfo,
//     pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
// ) -> Result<HttpResponse, actix_web::Error> {
//     let svc = SellingPointAdminServiceImpl::new(
//         current_user,
//         PersistentSellingPointRepository::new(&pool),
//     );

//     svc.delete(id.id)
//         .await
//         .map_err(|e| e.into())
//         .map(|_| HttpResponse::NoContent().finish())
// }
