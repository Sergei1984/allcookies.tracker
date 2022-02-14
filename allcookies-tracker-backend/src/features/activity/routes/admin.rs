use crate::features::activity::repo::PersistentActivityRepo;
use crate::features::{
    ActivityInfo, AdminActivityService, AdminUserInfo, PagedResult, PhotoSigningInfo, SkipTake,
};
use actix_web::{dev::HttpResponseBuilder, error, get, http::StatusCode, web, Responder, Scope};
use chrono::NaiveDate;
use serde::Deserialize;

pub fn activity_admin_route() -> Scope {
    web::scope("/admin/activity")
        .service(get_activity)
        .service(get_photo)
}

#[derive(Deserialize)]
pub struct GetActivityPhotoPath {
    pub token: String,
}

#[derive(Deserialize)]
pub struct ActivityByDatePath {
    pub date: Option<String>,
}

#[get("")]
pub async fn get_activity(
    skip_take: web::Query<SkipTake>,
    date: web::Query<ActivityByDatePath>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<ActivityInfo>>, actix_web::Error> {
    let mut activity_date: Option::<NaiveDate> = None;

    if date.date.is_some() {
        let parsed = NaiveDate::parse_from_str(&date.date.as_ref().unwrap().clone(), "%Y-%m-%d");
        if parsed.is_err() {
            return Err(error::ErrorBadRequest("Query date parameter has incorrect format"));
        }

        activity_date = Some(parsed.unwrap());
    }

    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;

    let result: Result<web::Json<PagedResult<ActivityInfo>>, actix_web::Error>;

    {
        let mut svc =
            AdminActivityService::new(current_user, PersistentActivityRepo::new(&mut trans));

        let data = svc
            .get_activity(activity_date, skip_take.skip.unwrap_or(0), skip_take.take.unwrap_or(50))
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

#[get("photo/{token}")]
pub async fn get_photo(
    path: web::Path<GetActivityPhotoPath>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<impl Responder, actix_web::Error> {
    let mut trans = pool.begin().await.map_err(|e| error::ErrorBadRequest(e))?;
    let photo_data: Vec<u8>;

    {
        let photo_sign_info = PhotoSigningInfo::from_jwt(&path.token)?;

        let mut svc = AdminActivityService::new(
            AdminUserInfo::new_fake(photo_sign_info.user_id),
            PersistentActivityRepo::new(&mut trans),
        );

        photo_data = svc
            .get_photo(photo_sign_info.activity_id, photo_sign_info.photo_id)
            .await
            .map_err(|e| error::ErrorBadRequest(e.to_string()))?;

        drop(svc);
    }

    trans
        .commit()
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    return Ok(HttpResponseBuilder::new(StatusCode::from_u16(200).unwrap())
        .content_type("image/jpg")
        .body(photo_data));
}
