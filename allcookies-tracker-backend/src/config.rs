pub struct Config {}

impl Config {
    pub fn connection_string() -> String {
        String::from("postgresql://postgres:123456@localhost:5432/allcookies_backend")
    }
}
