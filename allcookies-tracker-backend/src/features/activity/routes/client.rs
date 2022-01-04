use crate::features::activity::repo::PersistentActivityRepo;
use crate::features::{
    ActivityInfo, ClientActivityService, ManagerUserInfo, NewCloseDayActivity, NewOpenDayActivity,
    PagedResult, SkipTake,
};
use actix_web::{error, get, post, web, Scope};
use serde::{Deserialize, Serialize};

pub fn activity_client_route() -> Scope {
    web::scope("/client/activity")
        .service(get_my_activity)
        .service(open_day)
        .service(close_day)
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
