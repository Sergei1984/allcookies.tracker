use crate::features::authorization::CurrentUser;
use crate::features::authentication::svcs::AuthServiceImpl;
use crate::features::authentication::contract::AuthService;
use crate::features::authentication::repos::PersistentAuthRepository;
use actix_web::{error, post, web, Scope};
use serde::{Deserialize, Serialize};

pub fn authentication_route() -> Scope {
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

    let current_user: CurrentUser = (&user).into();

    let jwt = current_user.to_jwt();

    Ok(web::Json(LoginResponse {
        ok: true,
        jwt: jwt,
    }))
}
