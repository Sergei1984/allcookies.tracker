mod config;
mod domain;
mod error;

use crate::config::Config;
use crate::domain::{
    activity_admin_route, activity_client_route, authentication_route, product_admin_route,
    product_client_route, profile_route, selling_point_admin_route, selling_point_client_route,
};
use actix_web::HttpResponse;

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
            .wrap(middleware::NormalizePath::new(
                middleware::normalize::TrailingSlash::Trim,
            ))
            .route("/health", web::to(|| HttpResponse::Ok().body("Healthy")))
            .service(authentication_route())
            .service(profile_route())
            .service(selling_point_admin_route())
            .service(selling_point_client_route())
            .service(product_admin_route())
            .service(product_client_route())
            .service(activity_client_route())
            .service(activity_admin_route())
    })
    .bind(Config::server_url())?
    .run()
    .await
}
