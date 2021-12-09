mod config;
mod domain;
mod error;
mod migrations;
mod routes;

use crate::config::Config;
use actix_web::{web, App, HttpServer};
pub use error::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    migrations::migrate().expect("Migrations run");

    HttpServer::new(|| App::new().route("/ping", web::get().to(routes::ping)))
        .bind(Config::server_url())?
        .run()
        .await
}
