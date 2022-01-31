use crate::features::selling_points::contract::*;
use crate::features::selling_points::repos::PersistentSellingPointRepository;
use crate::features::selling_points::svcs::SellingPointAdminServiceImpl;
use crate::features::AdminUserInfo;
use crate::features::IdPath;
use crate::features::NewSellingPoint;
use crate::features::PagedResult;
use crate::features::SellingPoint;
use crate::features::SkipTake;
use crate::features::TitleSearch;
use actix_web::HttpResponse;
use actix_web::{delete, error, get, patch, post, web, Scope};

pub fn selling_point_admin_route() -> Scope {
    web::scope("/admin/selling-point")
        .service(get_selling_point)
        .service(create_selling_point)
        .service(update_selling_point)
        .service(delete_selling_point)
}

#[get("")]
pub async fn get_selling_point(
    skip_take: web::Query<SkipTake>,
    title: web::Query<TitleSearch>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<SellingPoint>>, actix_web::Error> {
    let svc = SellingPointAdminServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    let result = svc
        .get_all(
            title.title.clone(),
            skip_take.skip.unwrap_or(0),
            skip_take.take.unwrap_or(20),
        )
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(result))
}

#[post("")]
pub async fn create_selling_point(
    selling_point: web::Json<NewSellingPoint>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<SellingPoint>, actix_web::Error> {
    let svc = SellingPointAdminServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    let new_selling_point = svc
        .create(selling_point.into_inner())
        .await
        .map_err(|_| error::ErrorBadRequest("Bad request"))?;

    Ok(web::Json(new_selling_point))
}

#[patch("{id}")]
pub async fn update_selling_point(
    id: web::Path<IdPath>,
    selling_point: web::Json<UpdateSellingPoint>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<SellingPoint>, actix_web::Error> {
    let svc = SellingPointAdminServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    svc.update(id.id, selling_point.into_inner())
        .await
        .map(|r| web::Json(r))
        .map_err(|e| e.into())
}

#[delete("{id}")]
pub async fn delete_selling_point(
    id: web::Path<IdPath>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<HttpResponse, actix_web::Error> {
    let svc = SellingPointAdminServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    svc.delete(id.id)
        .await
        .map_err(|e| e.into())
        .map(|_| HttpResponse::NoContent().finish())
}
