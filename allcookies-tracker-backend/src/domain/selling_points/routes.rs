use crate::domain::selling_points::contract::*;
use crate::domain::selling_points::repos::PersistentSellingPointRepository;
use crate::domain::selling_points::svcs::SellingPointAdminServiceImpl;
use crate::domain::PagedResult;
use crate::domain::SellingPoint;
use crate::domain::SkipTake;
use actix_web::{error, get, web, Scope};

pub fn selling_point_admin_route() -> Scope {
    web::scope("/admin/selling-point").service(get_admin_selling_point)
}

#[get("")]
pub async fn get_admin_selling_point(
    skip_take: web::Query<SkipTake>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<SellingPoint>>, actix_web::Error> {
    let svc = SellingPointAdminServiceImpl::new(PersistentSellingPointRepository::new(&pool));

    let result = svc
        .get_all(skip_take.skip.unwrap_or(0), skip_take.take.unwrap_or(20))
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(result))
}