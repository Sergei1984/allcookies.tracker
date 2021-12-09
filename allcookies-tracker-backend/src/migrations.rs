use crate::config::Config;
use crate::error::AnError;
use postgres::{Client, NoTls};

mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("migrations");
}

pub fn migrate() -> Result<(), AnError> {
    println!("Run migrations...");

    let mut client = Client::connect(&Config::connection_string(), NoTls)?;

    let migration_report = embedded::migrations::runner().run(&mut client)?;
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
