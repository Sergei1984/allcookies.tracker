use super::contract::{AuthRepository, AuthService};
use crate::features::UserAccount;
use crate::AnError;
use crate::AppError;
use async_trait::async_trait;
use bcrypt::verify;

pub struct AuthServiceImpl<TAuthRepo: AuthRepository + Send + Sync> {
    auth_repo: TAuthRepo,
}

static AUHT_GENERIC_ERROR: &str = "Account is not found or credentials are invalid";

impl<TAuthRepo> AuthServiceImpl<TAuthRepo>
where
    TAuthRepo: AuthRepository + Send + Sync,
{
    pub fn new(auth_repo: TAuthRepo) -> Self {
        AuthServiceImpl {
            auth_repo: auth_repo,
        }
    }
}

#[async_trait]
impl<TAuthRepo> AuthService for AuthServiceImpl<TAuthRepo>
where
    TAuthRepo: AuthRepository + Send + Sync,
{
    async fn login(&self, login: &str, password: &str) -> Result<UserAccount, AnError> {
        if login.is_empty() {
            return Err(AppError::new_an_err("Login is required", actix_web::http::StatusCode::BAD_REQUEST));
        }
        if password.is_empty() {
            return Err(AppError::new_an_err("Password is required", actix_web::http::StatusCode::BAD_REQUEST));
        }

        let account_opt = self.auth_repo.find_account_by_login(login).await?;

        if let Some(account) = account_opt {
            if account.is_blocked {
                return Err(AppError::new_an_err(AUHT_GENERIC_ERROR, actix_web::http::StatusCode::BAD_REQUEST));
            }

            let is_password_valid = verify(password, &account.password_hash)?;
            if !is_password_valid {
                return Err(AppError::new_an_err(AUHT_GENERIC_ERROR, actix_web::http::StatusCode::BAD_REQUEST));
            }

            return Ok(account);
        } else {
            return Err(AppError::new_an_err(AUHT_GENERIC_ERROR, actix_web::http::StatusCode::BAD_REQUEST));
        }
    }
}
