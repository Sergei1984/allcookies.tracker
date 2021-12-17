use crate::domain::selling_points::contract::*;
use crate::domain::selling_points::repos::PersistentSellingPointRepository;
use crate::domain::selling_points::svcs::SellingPointAdminServiceImpl;
use crate::domain::CurrentUser;
use crate::domain::NewSellingPoint;
use crate::domain::PagedResult;
use crate::domain::SellingPoint;
use crate::domain::SkipTake;
use actix_web::{error, get, post, web, Scope};

pub fn selling_point_admin_route() -> Scope {
    web::scope("/admin/selling-point")
        .service(get_selling_point)
        .service(create_selling_point)
}

#[get("")]
pub async fn get_selling_point(
    skip_take: web::Query<SkipTake>,
    current_user: CurrentUser,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<SellingPoint>>, actix_web::Error> {
    let svc = SellingPointAdminServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    let result = svc
        .get_all(skip_take.skip.unwrap_or(0), skip_take.take.unwrap_or(20))
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(result))
}

#[post("")]
pub async fn create_selling_point(
    selling_point: web::Json<NewSellingPoint>,
    current_user: CurrentUser,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<SellingPoint>, actix_web::Error> {
    let svc = SellingPointAdminServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    let new_selling_point = svc
        .create(selling_point.into_inner())
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(new_selling_point))
}
