use crate::domain::activity::repo::PersistentActivityRepo;
use crate::domain::{
    ActivityInfo, ClientActivityService, ClientActivityServiceImpl, ManagerUserInfo, PagedResult,
    SkipTake,
};
use actix_web::{error, get, put, web, Scope};
use serde::{Deserialize, Serialize};

pub fn activity_client_route() -> Scope {
    web::scope("/client/activity")
        .service(get_my_activity)
        .service(open_day)
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
            ClientActivityServiceImpl::new(current_user, PersistentActivityRepo::new(&mut trans));

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

#[put("open-day")]
pub async fn open_day(
    current_user: ManagerUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<()>, actix_web::Error> {
    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    {
        let svc =
            ClientActivityServiceImpl::new(current_user, PersistentActivityRepo::new(&mut trans));
        drop(svc);
    }

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(()))
}
