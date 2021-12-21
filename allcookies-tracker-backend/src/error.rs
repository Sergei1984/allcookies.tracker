pub type AnError = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Debug)]
pub struct AppError {
    description: String,
    status_code: actix_web::http::StatusCode,
}

impl AppError {
    pub fn new(description: &str, status_code: actix_web::http::StatusCode) -> Self {
        AppError {
            description: String::from(description),
            status_code: status_code,
        }
    }

    pub fn new_an_err(description: &str, status_code: actix_web::http::StatusCode) -> AnError {
        Box::new(AppError::new(description, status_code))
    }

    pub fn not_authorized() -> AnError {
        Self::new_an_err(
            "Not authorized",
            actix_web::http::StatusCode::from_u16(401).unwrap(),
        )
    }

    pub fn not_authorized_err() -> AppError {
        Self::new(
            "Not authorized",
            actix_web::http::StatusCode::from_u16(401).unwrap(),
        )
    }
    pub fn internal_server_err(desc: Option<&str>) -> AppError {
        Self::new(
            desc.unwrap_or("Internal server error"),
            actix_web::http::StatusCode::from_u16(500).unwrap(),
        )
    }

    pub fn not_found_err() -> AppError {
        Self::new(
            "Not found",
            actix_web::http::StatusCode::from_u16(404).unwrap(),
        )
    }
}

impl actix_web::error::ResponseError for AppError {
    fn error_response(&self) -> actix_web::HttpResponse {
        actix_web::HttpResponseBuilder::new(self.status_code())
            .insert_header((
                actix_web::http::header::CONTENT_TYPE,
                "text/html; charset=utf-8",
            ))
            .body(self.description.clone())
    }

    fn status_code(&self) -> actix_web::http::StatusCode {
        self.status_code
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
