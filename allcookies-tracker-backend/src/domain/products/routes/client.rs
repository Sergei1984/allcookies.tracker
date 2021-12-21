use crate::domain::Product;
use crate::domain::IdPath;
use crate::domain::LatLonQuery;
use crate::domain::ManagerUserInfo;
use crate::domain::NewSellingPoint;
use crate::domain::PagedResult;
use crate::domain::SellingPoint;
use crate::domain::SkipTake;
use crate::domain::TitleSearch;
use actix_web::{error, get, patch, post, web, Scope};

pub fn product_client_route() -> Scope {
    web::scope("/client/product")
        .service(find_product)
}

#[get("")]
pub async fn find_product(
    title: web::Query<TitleSearch>,
    skip_take: web::Query<SkipTake>,
    current_user: ManagerUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<Product>>, actix_web::Error> {
    todo!()
}

// #[post("")]
// pub async fn create_selling_point(
//     selling_point: web::Json<NewSellingPoint>,
//     current_user: ManagerUserInfo,
//     pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
// ) -> Result<web::Json<SellingPoint>, actix_web::Error> {
//     let svc = SellingPointClientServiceImpl::new(
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
//     current_user: ManagerUserInfo,
//     pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
// ) -> Result<web::Json<SellingPoint>, actix_web::Error> {
//     let svc = SellingPointClientServiceImpl::new(
//         current_user,
//         PersistentSellingPointRepository::new(&pool),
//     );
//     svc.update(id.id, selling_point.into_inner())
//         .await
//         .map(|r| web::Json(r))
//         .map_err(|e| e.into())
// }
