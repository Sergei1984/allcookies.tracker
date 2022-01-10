use crate::{AppError, Config};
use chrono::Duration;
use chrono::Utc;
use hmac::*;
use jwt::*;
use serde::{Deserialize, Serialize};
use sha2::Sha256;

#[derive(Serialize, Deserialize, Clone)]
pub struct PhotoSigningInfo {
    pub photo_id: i64,
    pub activity_id: i64,
    pub user_id: i64,
    pub rnd: i64,
    pub iss: i64,
}

impl PhotoSigningInfo {
    pub fn from_jwt(value: &str) -> Result<PhotoSigningInfo, AppError> {
        let key: Hmac<Sha256> = Hmac::new_from_slice(Config::jwt_secret()).unwrap();

        let token: Token<Header, PhotoSigningInfo, _> = (value)
            .verify_with_key(&key)
            .map_err(|e| AppError::bad_request(&e.to_string()))?;

        let photo_signing_info = token.claims().clone();

        let now = Utc::now().timestamp_millis();
        let iss = photo_signing_info.iss;

        let issued = Duration::milliseconds(now - iss);

        if issued > Config::photo_token_validity_minutes() {
            return Err(AppError::bad_request("Token is expired"));
        }

        return Ok(photo_signing_info);
    }

    pub fn to_jwt(photo_id: i64, activity_id: i64, user_id: i64) -> Result<String, AppError> {
        let signing_info = PhotoSigningInfo {
            photo_id: photo_id,
            activity_id: activity_id,
            user_id: user_id,
            iss: Utc::now().timestamp_millis(),
            rnd: rand::random::<i64>(),
        };

        let header = jwt::Header::default();
        let unsigned_token = Token::new(header, signing_info);
        let key: Hmac<Sha256> = Hmac::new_from_slice(Config::jwt_secret()).unwrap();

        Ok(unsigned_token.sign_with_key(&key).unwrap().into())
    }
}
