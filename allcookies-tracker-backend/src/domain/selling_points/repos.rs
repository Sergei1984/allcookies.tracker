use crate::domain::{PagedResult, SellingPoint};
use crate::AnError;
use async_trait::async_trait;
use sqlx::PgPool;

#[async_trait]
pub trait SellingPointRepository {
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError>;
}

#[derive(Debug)]
pub struct PersistentSellingPointRepository<'a> {
    db: &'a PgPool,
}

impl<'a> PersistentSellingPointRepository<'a> {
    pub fn new(db: &'a PgPool) -> Self {
        PersistentSellingPointRepository { db: db }
    }
}

#[async_trait]
impl<'a> SellingPointRepository for PersistentSellingPointRepository<'a> {
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError> {
        let accounts = sqlx::query_as!(
            SellingPoint,
            r#"select id, title, description, address, location as "location!: _", created_by, created_at, modified_by, modified_at, deleted_by, deleted_at from selling_point offset $1 limit $2"#,
            skip,
            take
        )
        .fetch_all(self.db)
        .await?;

        let count: i64 = sqlx::query_scalar("select count(1) from selling_point")
            .fetch_one(self.db)
            .await?;

        Ok(PagedResult {
            total: count,
            data: accounts
        })
    }
}
