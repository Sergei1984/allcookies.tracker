use crate::domain::authorization::repos::PersistentActiveUserRepository;
use crate::domain::authorization::ActiveUserService;
use crate::domain::ActiveUser;
use crate::domain::ActiveUserServiceImpl;
use crate::domain::AdminUserInfo;
use crate::domain::CurrentUser;
use crate::domain::ManagerUserInfo;
use crate::AppError;
use actix_web::dev::Payload;
use actix_web::FromRequest;
use actix_web::HttpRequest;
use actix_web::{get, web, Scope};
use sqlx::PgPool;
use std::future::Future;
use std::pin::Pin;

pub fn profile_route() -> Scope {
    web::scope("/profile").service(me)
}

#[get("/me")]
pub async fn me(current_user: CurrentUser) -> Result<web::Json<CurrentUser>, actix_web::Error> {
    Ok(web::Json(current_user))
}

impl FromRequest for AdminUserInfo {
    type Error = AppError;
    type Future = Pin<Box<dyn Future<Output = Result<Self, Self::Error>>>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let r = req.clone();
        Box::pin(async move {
            let current_user = CurrentUser::from_request(&r, &mut Payload::None).await?;

            let db = r.app_data::<PgPool>().unwrap();

            let svc = ActiveUserServiceImpl::new(PersistentActiveUserRepository::new(db));

            let active_user = svc
                .get_active_user(current_user.id)
                .await
                .map_err(|_| AppError::internal_server_err())?;

            match active_user {
                Some(account) => match account {
                    ActiveUser::Admin(admin) => Ok(admin),
                    _ => Err(AppError::not_authorized_err()),
                },
                None => Err(AppError::not_authorized_err()),
            }
        })
    }
}

impl FromRequest for ManagerUserInfo {
    type Error = AppError;
    type Future = Pin<Box<dyn Future<Output = Result<Self, Self::Error>>>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let r = req.clone();
        Box::pin(async move {
            let current_user = CurrentUser::from_request(&r, &mut Payload::None).await?;

            let db = r.app_data::<PgPool>().unwrap();

            let svc = ActiveUserServiceImpl::new(PersistentActiveUserRepository::new(db));

            let active_user = svc
                .get_active_user(current_user.id)
                .await
                .map_err(|_| AppError::internal_server_err())?;

            match active_user {
                Some(account) => match account {
                    ActiveUser::Admin(admin) => Ok(admin.into()),
                    ActiveUser::Manager(manager) => Ok(manager),
                },
                None => Err(AppError::not_authorized_err()),
            }
        })
    }
}
