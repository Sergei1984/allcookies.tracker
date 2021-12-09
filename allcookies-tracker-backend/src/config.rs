pub struct Config {}

impl Config {
    pub fn connection_string() -> String {
        std::env::var("DATABASE_URL").unwrap()
    }

    pub fn server_url() -> String {
        std::env::var("SERVER_URL").unwrap()
    }
}
