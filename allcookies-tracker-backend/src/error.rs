pub type AnError = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Debug)]
pub struct AppError {
    description: String,
}

impl AppError {
    pub fn new(description: &str) -> Self {
        AppError {
            description: String::from(description),
        }
    }
}

impl std::error::Error for AppError {
    fn description(&self) -> &str {
        &self.description
    }
}

impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}
