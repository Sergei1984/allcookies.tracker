use crate::domain::UserAccount;
use crate::AnError;
use crate::Config;
use hmac::*;
use jwt::*;
use sha2::Sha256;

use serde::{Deserialize, Serialize};

mod test;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CurrentUser {
    pub id: i64,
    pub email: String,
    pub name: String,
    pub account_role: String,
    pub iss: String,
    pub sub: String,
    pub exp: i64,
}

impl CurrentUser {
    pub fn from_jwt(jwt: String) -> Result<Self, AnError> {
        let key: Hmac<Sha256> = Hmac::new_from_slice(Config::jwt_secret()).unwrap();

        let token: Token<Header, CurrentUser, _> = (&jwt).verify_with_key(&key)?;

        return Ok(token.claims().clone());
    }

    pub fn to_jwt(&self) -> String {
        let header = Header::default();
        let unsigned_token = Token::new(header, self);
        let key: Hmac<Sha256> = Hmac::new_from_slice(Config::jwt_secret()).unwrap();

        unsigned_token.sign_with_key(&key).unwrap().into()
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
