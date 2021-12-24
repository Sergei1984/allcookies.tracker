use serde::{Deserialize, Serialize};
use sqlx::decode::Decode;
use sqlx::encode::{Encode, IsNull};
use sqlx::error::BoxDynError;
use sqlx::postgres::{PgArgumentBuffer, PgTypeInfo, PgValueFormat, PgValueRef, Postgres};
use sqlx::types::Type;

#[derive(Debug, PartialEq, Default, Clone, Serialize, Deserialize)]
pub struct LatLonPoint {
    pub lat: f64,
    pub lon: f64,
}

impl Type<Postgres> for LatLonPoint {
    fn type_info() -> PgTypeInfo {
        PgTypeInfo::with_name("geometry")
    }
}

impl Encode<'_, Postgres> for LatLonPoint {
    fn encode_by_ref(&self, buf: &mut PgArgumentBuffer) -> IsNull {
        // Encode::<Postgres>::encode(&us, buf)
        IsNull::Yes
    }

    fn size_hint(&self) -> usize {
        std::mem::size_of::<LatLonPoint>()
    }
}

impl<'r> Decode<'r, Postgres> for LatLonPoint {
    fn decode(value: PgValueRef<'r>) -> Result<Self, BoxDynError> {
        Ok(LatLonPoint { lat: 0.0, lon: 0.0 })
    }
}
