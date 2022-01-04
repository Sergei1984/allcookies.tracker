use crate::features::UserAccount;
use crate::AnError;
use crate::AppError;
use crate::Config;
use actix_web::{dev::Payload, http::header, FromRequest, HttpRequest};
use hmac::*;
use jwt::*;
use sha2::Sha256;
use std::future::ready;
use std::future::Ready;

mod contract;
mod repos;
mod routes;
mod svcs;
mod test;

pub use contract::*;
pub use routes::*;
pub use svcs::*;

#[allow(unused)]
impl CurrentUser {
    pub fn from_jwt(jwt: String) -> Result<Self, AnError> {
        let key: Hmac<Sha256> = Hmac::new_from_slice(Config::jwt_secret()).unwrap();

        let token: Token<Header, CurrentUser, _> = (&jwt).verify_with_key(&key)?;

        return Ok(token.claims().clone());
    }

    pub fn to_jwt(&self) -> String {
        let header = jwt::Header::default();
        let unsigned_token = Token::new(header, self);
        let key: Hmac<Sha256> = Hmac::new_from_slice(Config::jwt_secret()).unwrap();

        unsigned_token.sign_with_key(&key).unwrap().into()
    }

    pub fn is_admin(&self) -> bool {
        self.account_role.eq_ignore_ascii_case("admin")
    }
}

impl FromRequest for CurrentUser {
    type Error = AppError;
    type Future = Ready<Result<Self, Self::Error>>;
    type Config = ();

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        if let Some(auth_header) = req.headers().get(header::AUTHORIZATION) {
            if let Ok(current_user) =
                CurrentUser::from_jwt(auth_header.to_str().unwrap().to_owned())
            {
                return ready(Ok(current_user));
            }
        }

        return ready(Err(AppError::new(
            "Not authorized",
            actix_web::http::StatusCode::UNAUTHORIZED,
        )));
    }
}

impl From<&UserAccount> for CurrentUser {
    fn from(user_account: &UserAccount) -> Self {
        CurrentUser {
            id: user_account.id,
            email: user_account.login.clone(),
            name: user_account.name.clone(),
            account_role: user_account.account_role.clone(),
            iss: Config::jwt_issuer(),
            sub: user_account.login.clone(),
            exp: chrono::Local::now()
                .checked_add_signed(chrono::Duration::days(365))
                .unwrap()
                .timestamp(),
        }
    }
}
