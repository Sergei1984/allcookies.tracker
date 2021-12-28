use crate::domain::activity::repo::ActivityRepo;
use crate::domain::{
    ActivityInfo, ClientActivityService, CloseDayActivityInfo, ManagerUserInfo,
    OpenDayActivityInfo, PagedResult,
};
use crate::AppError;

pub struct ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    repo: TActivityRepo,
    current_user: ManagerUserInfo,
}

impl<TActivityRepo> ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    pub fn new(current_user: ManagerUserInfo, repo: TActivityRepo) -> Self {
        ClientActivityServiceImpl {
            current_user: current_user,
            repo: repo,
        }
    }
}

#[async_trait::async_trait]
impl<TActivityRepo> ClientActivityService for ClientActivityServiceImpl<TActivityRepo>
where
    TActivityRepo: ActivityRepo + Send + Sync,
{
    async fn get_my_activity(
        &mut self,
        _skip: i64,
        _take: i64,
    ) -> Result<PagedResult<ActivityInfo>, AppError> {
        Ok(PagedResult {
            data: vec![],
            total: 0,
        })
    }
}
