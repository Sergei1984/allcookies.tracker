use crate::domain::selling_points::contract::*;
use crate::domain::selling_points::repos::PersistentSellingPointRepository;
use crate::domain::selling_points::svcs::SellingPointClientServiceImpl;
use crate::domain::IdPath;
use crate::domain::ManagerUserInfo;
use crate::domain::NewSellingPoint;
use crate::domain::PagedResult;
use crate::domain::SellingPoint;
use crate::domain::SkipTake;
use crate::domain::TitleSearch;
use actix_web::{error, get, patch, post, web, Scope};

pub fn selling_point_client_route() -> Scope {
    web::scope("/client/selling-point")
        .service(find_selling_point)
        .service(create_selling_point)
        .service(update_selling_point)
}

#[get("")]
pub async fn find_selling_point(
    title: web::Query<TitleSearch>,
    skip_take: web::Query<SkipTake>,
    current_user: ManagerUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<SellingPoint>>, actix_web::Error> {
    let svc = SellingPointClientServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    let result = svc
        .find_all(
            title.title.clone(),
            None,
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
    current_user: ManagerUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<SellingPoint>, actix_web::Error> {
    let svc = SellingPointClientServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    let new_selling_point = svc
        .create(selling_point.into_inner())
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(new_selling_point))
}

#[patch("{id}")]
pub async fn update_selling_point(
    id: web::Path<IdPath>,
    selling_point: web::Json<UpdateSellingPoint>,
    current_user: ManagerUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<SellingPoint>, actix_web::Error> {
    let svc = SellingPointClientServiceImpl::new(
        current_user,
        PersistentSellingPointRepository::new(&pool),
    );

    let selling_point = svc
        .get_one(id.id)
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    if let Some(selling_point) = selling_point {
        let updated = svc
            .update(selling_point)
            .await
            .map_err(|e| error::ErrorBadRequest(e))?;

        Ok(web::Json(updated))
    } else {
        Err(error::ErrorNotFound("Not found"))
    }
}
