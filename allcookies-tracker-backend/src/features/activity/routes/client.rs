use actix_web::http::StatusCode;
use crate::features::activity::repo::PersistentActivityRepo;
use crate::features::{
    ActivityInfo, ClientActivityService, ManagerUserInfo, NewCloseDayActivity, NewOpenDayActivity,
    NewSellingPointCheckActivity, PagedResult, SkipTake,
};
use actix_web::Responder;
use actix_web::{dev::HttpResponseBuilder, error, get, post, web, web::Bytes, Scope};
use serde::{Deserialize, Serialize};

pub fn activity_client_route() -> Scope {
    web::scope("/client/activity")
        .service(get_my_activity)
        .service(open_day)
        .service(close_day)
        .service(check_selling_point)
        .service(add_photo)
}

#[derive(Serialize, Deserialize)]
pub struct GetMyActivityQuery {}

#[get("")]
pub async fn get_my_activity(
    current_user: ManagerUserInfo,
    skip_take: web::Query<SkipTake>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<ActivityInfo>>, actix_web::Error> {
    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    let result: Result<web::Json<PagedResult<ActivityInfo>>, actix_web::Error>;

    {
        let mut svc =
            ClientActivityService::new(current_user, PersistentActivityRepo::new(&mut trans));

        let data = svc
            .get_my_activity(skip_take.skip.unwrap_or(0), skip_take.take.unwrap_or(50))
            .await
            .map_err(|e| error::ErrorBadRequest(e))?;

        result = Ok(web::Json(data));

        drop(svc);
    }

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    return result;
}

#[post("open-day")]
pub async fn open_day(
    current_user: ManagerUserInfo,
    open_day: web::Json<NewOpenDayActivity>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<ActivityInfo>, actix_web::Error> {
    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    let result: Result<web::Json<ActivityInfo>, actix_web::Error>;

    {
        let mut svc =
            ClientActivityService::new(current_user, PersistentActivityRepo::new(&mut trans));

        let new_open_day = open_day.into_inner();

        let data = svc
            .open_day(new_open_day)
            .await
            .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        result = Ok(web::Json(data));

        drop(svc);
    }

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    return result;
}

#[post("close-day")]
pub async fn close_day(
    current_user: ManagerUserInfo,
    close_day: web::Json<NewCloseDayActivity>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<ActivityInfo>, actix_web::Error> {
    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    let result: Result<web::Json<ActivityInfo>, actix_web::Error>;

    {
        let mut svc =
            ClientActivityService::new(current_user, PersistentActivityRepo::new(&mut trans));

        let new_close_day = close_day.into_inner();

        let data = svc
            .close_day(new_close_day)
            .await
            .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        result = Ok(web::Json(data));

        drop(svc);
    }

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    return result;
}

#[post("check-selling-point")]
pub async fn check_selling_point(
    current_user: ManagerUserInfo,
    point_check: web::Json<NewSellingPointCheckActivity>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<ActivityInfo>, actix_web::Error> {
    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    let result: Result<web::Json<ActivityInfo>, actix_web::Error>;

    {
        let mut svc =
            ClientActivityService::new(current_user, PersistentActivityRepo::new(&mut trans));

        let point_check_activity = point_check.into_inner();

        let data = svc
            .check_selling_point(point_check_activity)
            .await
            .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        result = Ok(web::Json(data));

        drop(svc);
    }

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    return result;
}

#[derive(Deserialize)]
pub struct ActivityIdPath {
    pub id: i64,
}

#[post("{id}/photo")]
pub async fn add_photo(
    current_user: ManagerUserInfo,
    activity: web::Path<ActivityIdPath>,
    photo_data: Bytes,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<impl Responder, actix_web::Error> {
    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    {
        let mut svc =
            ClientActivityService::new(current_user, PersistentActivityRepo::new(&mut trans));

        let _ = svc
            .add_photo(activity.id, &photo_data.to_vec()[..])
            .await
            .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        drop(svc);
    }

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    return Ok(HttpResponseBuilder::new(StatusCode::from_u16(204).unwrap()).finish());
}
