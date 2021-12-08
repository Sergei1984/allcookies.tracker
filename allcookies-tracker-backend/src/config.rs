pub struct Config {}

impl Config {
    pub fn connection_string() -> String {
        std::env::var("DATABASE_URL").unwrap()
    }
}
