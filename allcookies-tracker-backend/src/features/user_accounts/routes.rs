use crate::features::{
    AdminUserAccountService, AdminUserInfo, IdPath, NewUserAccount, PagedResult,
    PersistentUserAccountRepository, SkipTake, UpdateUserAccount, UserAccountInfo,
};
use crate::AppError;
use actix_web::{get, patch, post, web, Scope};
use serde::Deserialize;

pub fn user_account_admin_route() -> Scope {
    web::scope("/admin/user-accounts")
        .service(get_user_accounts)
        .service(get_user_account_by_id)
        .service(create_user_account)
        .service(update_user_account)
}

#[derive(Deserialize)]
pub struct GetActivityPhotoPath {
    pub token: String,
}

#[get("")]
pub async fn get_user_accounts(
    skip_take: web::Query<SkipTake>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<PagedResult<UserAccountInfo>>, actix_web::Error> {
    let svc =
        AdminUserAccountService::new(current_user, PersistentUserAccountRepository::new(&pool));

    let result = svc
        .get_all(skip_take.skip.unwrap_or(0), skip_take.take.unwrap_or(50))
        .await?;

    Ok(web::Json(result))
}

#[get("{id}")]
pub async fn get_user_account_by_id(
    id: web::Path<IdPath>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<UserAccountInfo>, actix_web::Error> {
    let svc =
        AdminUserAccountService::new(current_user, PersistentUserAccountRepository::new(&pool));

    let result = svc.get_by_id(id.id).await?;

    if let Some(user_account) = result {
        return Ok(web::Json(user_account));
    }

    Err(AppError::not_found_err().into())
}

#[post("")]
pub async fn create_user_account(
    new_user_account: web::Json<NewUserAccount>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<UserAccountInfo>, actix_web::Error> {
    let svc =
        AdminUserAccountService::new(current_user, PersistentUserAccountRepository::new(&pool));

    let result = svc.create_user(new_user_account.into_inner()).await?;

    Ok(web::Json(result))
}

#[patch("{id}")]
pub async fn update_user_account(
    id: web::Path<IdPath>,
    user_account_patch: web::Json<UpdateUserAccount>,
    current_user: AdminUserInfo,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<UserAccountInfo>, actix_web::Error> {
    let svc =
        AdminUserAccountService::new(current_user, PersistentUserAccountRepository::new(&pool));

    let result = svc
        .update_user(id.id, user_account_patch.into_inner())
        .await?;

    Ok(web::Json(result))
}
