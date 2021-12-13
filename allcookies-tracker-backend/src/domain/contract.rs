
#[derive(Debug)]
pub struct PagedResult<T> {
    pub total: i64,
    pub data: Vec<T>
}