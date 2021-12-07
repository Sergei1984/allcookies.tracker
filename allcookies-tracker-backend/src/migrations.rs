use crate::config::Config;
use tokio_postgres::NoTls;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("migrations");
}

pub async fn migrate() -> Result<(), Error> {
    let (mut client, con) = tokio_postgres::connect(&Config::connection_string(), NoTls).await?;

    tokio::spawn(async move {
        if let Err(e) = con.await {
            eprintln!("connection error: {}", e);
        }
    });

    let migration_report = embedded::migrations::runner()
        .run_async(&mut client)
        .await?;
    for migration in migration_report.applied_migrations() {
        println!(
            "Migration Applied -  Name: {}, Version: {}",
            migration.name(),
            migration.version()
        );
    }

    println!("DB migrations finished!");

    Ok(())
}
