pub struct Config {}

impl Config {
    pub fn connection_string() -> String {
        std::env::var("DATABASE_URL").unwrap()
    }

    pub fn server_url() -> String {
        std::env::var("SERVER_URL").unwrap()
    }

    pub fn jwt_issuer() -> String {
        "allcookies.tracker".to_owned()
    }

    pub fn jwt_secret() -> &'static [u8] {
        b"*kajsd23##434234,I900asd234"
    }
}
