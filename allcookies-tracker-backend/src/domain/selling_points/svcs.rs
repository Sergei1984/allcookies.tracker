use crate::AppError;
use crate::domain::CurrentUser;
use crate::domain::selling_points::repos::SellingPointRepository;
use crate::domain::PagedResult;
use crate::domain::SellingPoint;
use crate::domain::SellingPointAdminService;
use crate::AnError;
use async_trait::async_trait;

pub struct SellingPointAdminServiceImpl<TSellingPointRepo: SellingPointRepository + Send + Sync> {
    selling_point_repo: TSellingPointRepo,
    current_user: CurrentUser
}

impl<TSellingPointRepo> SellingPointAdminServiceImpl<TSellingPointRepo>
where
    TSellingPointRepo: SellingPointRepository + Send + Sync,
{
    pub fn new(current_user: CurrentUser, selling_point_repo: TSellingPointRepo) -> Self {
        SellingPointAdminServiceImpl {
            current_user: current_user,
            selling_point_repo: selling_point_repo,
        }
    }
}

#[async_trait]
impl<TSellingPointRepo> SellingPointAdminService for SellingPointAdminServiceImpl<TSellingPointRepo>
where
    TSellingPointRepo: SellingPointRepository + Send + Sync,
{
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError> {
        if !self.current_user.is_admin() {
            return Err(AppError::not_authorized())
        }
        self.selling_point_repo.get_all(skip, take).await
    }
}
