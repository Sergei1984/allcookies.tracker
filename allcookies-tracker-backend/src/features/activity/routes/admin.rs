// use crate::features::activity::repo::PersistentActivityRepo;
// use crate::features::{AdminUserInfo, PagedResult, SkipTake};
use actix_web::{web, Scope};

pub fn activity_admin_route() -> Scope {
    web::scope("/admin/activity")
    //.service(get_activity)
}

// #[get("")]
// pub async fn get_activity(
//     skip_take: web::Query<SkipTake>,
//     current_user: AdminUserInfo,
//     pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
// ) -> Result<web::Json<PagedResult<()>>, actix_web::Error> {
//     let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;
//     {
//         let repo = PersistentActivityRepo::new(&mut trans);
//         drop(repo);
//     }

//     trans
//         .commit()
//         .await
//         .map_err(|e| error::ErrorBadRequest(e))?;

//     drop(trans);

//     Ok(web::Json(PagedResult {
//         total: 0,
//         data: vec![],
//     }))
// }
