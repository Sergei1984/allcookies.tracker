use crate::domain::activity::repo::PersistentActivityRepo;
use crate::domain::ManagerUserInfo;
use actix_web::{error, put, web, Scope};

pub fn activity_client_route() -> Scope {
    web::scope("/client/activity").service(open_day)
}

#[put("open-day")]
pub async fn open_day(
    current_user: ManagerUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<()>, actix_web::Error> {
    let p = pool.into_inner();
    let trans = p.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    let repo = PersistentActivityRepo::new(&trans);

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(()))
}
