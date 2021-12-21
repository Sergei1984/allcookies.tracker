use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct NewProduct {
    pub title: String,
    pub image: Option<String>,
    pub is_disabled: bool,
}
