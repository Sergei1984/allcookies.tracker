use crate::domain::activity::repo::PersistentActivityRepo;
use crate::domain::{AdminUserInfo, PagedResult, SkipTake};
use actix_web::{error, get, web, Scope};

pub fn activity_admin_route() -> Scope {
    web::scope("/admin/activity").service(get_activity)
}

#[get("")]
pub async fn get_activity(
    skip_take: web::Query<SkipTake>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<()>>, actix_web::Error> {
    let p = pool.into_inner();
    let trans = p.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    let repo = PersistentActivityRepo::new(&trans);

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(PagedResult {
        total: 0,
        data: vec![],
    }))
}
