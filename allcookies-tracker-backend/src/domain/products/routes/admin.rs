use crate::domain::AdminUserInfo;
use crate::domain::IdPath;
use crate::domain::NewSellingPoint;
use crate::domain::PagedResult;
use crate::domain::Product;
use crate::domain::SellingPoint;
use crate::domain::SkipTake;
use actix_web::HttpResponse;
use actix_web::{delete, error, get, patch, post, web, Scope};

pub fn product_admin_route() -> Scope {
    web::scope("/admin/product").service(get_product)
}

#[get("")]
pub async fn get_product(
    skip_take: web::Query<SkipTake>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<Product>>, actix_web::Error> {
    // let svc = SellingPointAdminServiceImpl::new(
    //     current_user,
    //     PersistentSellingPointRepository::new(&pool),
    // );

    // let result = svc
    //     .get_all(skip_take.skip.unwrap_or(0), skip_take.take.unwrap_or(20))
    //     .await
    //     .map_err(|e| error::ErrorBadRequest(e))?;

    // Ok(web::Json(result))
    todo!()
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
