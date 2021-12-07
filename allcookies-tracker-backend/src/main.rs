mod config;
mod migrations;

#[tokio::main]
async fn main() {
    migrations::migrate().await.expect("Migration run");
}
