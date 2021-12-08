mod config;
mod domain;
mod error;
mod migrations;

pub use error::*;

#[tokio::main]
async fn main() {
    migrations::migrate().await.expect("Migrations run");
}
