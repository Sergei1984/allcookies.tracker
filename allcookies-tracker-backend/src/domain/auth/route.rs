use crate::domain::auth::persistent_auth_repository::PersistentAuthRepository;
use crate::domain::{AuthService, AuthServiceImpl};
use crate::AnError;
use crate::Config;
use actix_web::{error, post, web, Responder, Scope};
use serde::{Deserialize, Serialize};

pub fn auth_route() -> Scope {
    web::scope("/auth").service(login)
}

#[derive(Deserialize)]
pub struct LoginRequest {
    login: String,
    password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    ok: bool,
    jwt: String,
}

#[post("/sign-in")]
pub async fn login(
    request: web::Json<LoginRequest>,
    pool: web::Data<sqlx::Pool<sqlx::Postgres>>,
) -> Result<web::Json<LoginResponse>, actix_web::Error> {
    let service = AuthServiceImpl::new(PersistentAuthRepository::new(&pool));

    let user = service
        .login(&request.login, &request.password)
        .await
        .map_err(|e| error::ErrorBadRequest(e))?;

    Ok(web::Json(LoginResponse {
        ok: true,
        jwt: format!("{} :: {}", &user.login, &user.name),
    }))
}
