use crate::domain::{ActivityInfo, PagedResult};
use crate::AppError;
use async_trait::async_trait;

#[async_trait]
pub trait ClientActivityService {
    async fn get_my_activity(
        &mut self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<ActivityInfo>, AppError>;
}
