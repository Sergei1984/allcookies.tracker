use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct PagedResult<T> {
    pub total: i64,
    pub data: Vec<T>,
}

#[derive(Deserialize, Serialize)]
pub struct SkipTake {
    pub skip: Option<i64>,
    pub take: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct TitleSearch {
    pub title: Option<String>,
}

#[derive(Deserialize)]
pub struct IdPath {
    pub id: i64,
}

/// Produces a copy of value with updated fields
pub trait Patch<TPatch> {
    fn patch(&self, patch: TPatch) -> Self;
}