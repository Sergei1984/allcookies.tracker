use crate::domain::activity::repo::ActivityRepo;
use crate::domain::{
    ActivityInfo, ClientActivityService, CloseDayActivityInfo, OpenDayActivityInfo, PagedResult,
};
use crate::AppError;

pub struct ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    repo: TActivityRepo,
}

impl<TActivityRepo> ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    pub fn new(repo: TActivityRepo) -> Self {
        ClientActivityServiceImpl { repo: repo }
    }
}

#[async_trait::async_trait]
impl<TActivityRepo> ClientActivityService for ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    async fn get_my_activity(
        &mut self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<ActivityInfo>, AppError> {
        todo!()
    }
}
