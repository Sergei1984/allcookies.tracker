mod config;
mod domain;
mod error;
mod routes;

use crate::config::Config;
use crate::domain::authentication_route;
use crate::domain::profile_route;
use crate::domain::selling_point_admin_route;
use actix_web::{middleware, web, App, HttpServer};
pub use error::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = sqlx::PgPool::connect(&Config::connection_string())
        .await
        .expect("Error connecting database");

    env_logger::Builder::from_default_env().init();

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::new("%t %a %r %s %b %T"))
            .wrap(middleware::NormalizePath::trim())
            .service(authentication_route())
            .service(profile_route())
            .service(selling_point_admin_route())
            .route("/ping", web::get().to(routes::ping))
    })
    .bind(Config::server_url())?
    .run()
    .await
}
