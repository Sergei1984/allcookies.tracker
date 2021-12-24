use crate::AppError;
use serde::{Deserialize, Serialize};
use sqlx::decode::Decode;
use sqlx::encode::{Encode, IsNull};
use sqlx::error::{BoxDynError, Error};
use sqlx::postgres::{PgArgumentBuffer, PgTypeInfo, PgValueRef, Postgres};
use sqlx::types::Type;
use sqlx::ValueRef;

#[derive(Debug, PartialEq, Default, Clone, Serialize, Deserialize)]
pub struct LatLonPoint {
    pub lat: f64,
    pub lon: f64,
}

impl Type<Postgres> for LatLonPoint {
    fn type_info() -> PgTypeInfo {
        PgTypeInfo::with_name("bytea")
    }
}

impl Encode<'_, Postgres> for LatLonPoint {
    fn encode_by_ref(&self, _buf: &mut PgArgumentBuffer) -> IsNull {
        IsNull::Yes
    }

    fn size_hint(&self) -> usize {
        std::mem::size_of::<LatLonPoint>()
    }
}

impl<'r> Decode<'r, Postgres> for LatLonPoint {
    fn decode(value: PgValueRef<'r>) -> Result<Self, BoxDynError> {
        if value.is_null() {
            return Ok(LatLonPoint { lon: 0.0, lat: 0.0 });
        }

        let blob = <&[u8] as Decode<Postgres>>::decode(value)?;

        let endian = blob[0];
        if endian == 0 {
            // Little endian
            let primitive_type = i32::from_be_bytes(blob[1..5].try_into().unwrap());
            if primitive_type != 1 {
                return Err(AppError::new_an_err(
                    "Error converting column value to LatLonPoint",
                    actix_web::http::StatusCode::from_u16(500).unwrap(),
                ));
            } // 2D point

            let lat = f64::from_be_bytes(blob[5..13].try_into().unwrap());
            let lon = f64::from_be_bytes(blob[13..21].try_into().unwrap());
            Ok(LatLonPoint { lat: lat, lon: lon })
        } else {
            // Big endian
            let primitive_type = i32::from_le_bytes(blob[1..5].try_into().unwrap());
            if primitive_type != 1 {
                return Err(AppError::new_an_err(
                    "Error converting column value to LatLonPoint",
                    actix_web::http::StatusCode::from_u16(500).unwrap(),
                ));
            } // 2D point

            let lat = f64::from_le_bytes(blob[5..13].try_into().unwrap());
            let lon = f64::from_le_bytes(blob[13..21].try_into().unwrap());
            Ok(LatLonPoint { lat: lat, lon: lon })
        }
    }
}
