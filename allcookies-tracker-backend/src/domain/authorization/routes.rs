use actix_web::{get, web, Scope};
use crate::domain::CurrentUser;

pub fn profile_route() -> Scope {
    web::scope("/profile").service(me)
}


#[get("/me")]
pub async fn me(
    current_user: CurrentUser
) -> Result<web::Json<CurrentUser>, actix_web::Error> {
    Ok(web::Json(current_user))
}
