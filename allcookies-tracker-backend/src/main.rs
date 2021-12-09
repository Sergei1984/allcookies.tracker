mod config;
mod domain;
mod error;
// mod migrations;
mod routes;

use crate::config::Config;
use crate::domain::auth_route;
use actix_web::{web, App, HttpServer};
pub use error::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // migrations::migrate().expect("Migrations run");

    let pool = sqlx::PgPool::connect(&Config::connection_string())
        .await
        .expect("Error connecting database");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(auth_route())
            .route("/ping", web::get().to(routes::ping))
    })
    .bind(Config::server_url())?
    .run()
    .await
}
