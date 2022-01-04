use crate::features::products::contract::ProductClientService;
use crate::features::products::repos::PersistentProductRepository;
use crate::features::products::svcs::ProductClientServiceImpl;
use crate::features::{ManagerUserInfo, PagedResult, Product, SkipTake, TitleSearch};
use actix_web::{error, get, web, Scope};

pub fn product_client_route() -> Scope {
    web::scope("/client/product").service(find_product)
}

#[get("")]
pub async fn find_product(
    title_filter: web::Query<TitleSearch>,
    skip_take: web::Query<SkipTake>,
    current_user: ManagerUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<Product>>, actix_web::Error> {
    let title_filter = title_filter.into_inner();
    let svc = ProductClientServiceImpl::new(PersistentProductRepository::new(&pool), current_user);

    let result = svc
        .find_all(
            title_filter.title,
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
