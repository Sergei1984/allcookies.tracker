use super::CurrentUserRepository;
use crate::domain::UserAccount;
use crate::AnError;
use async_trait::async_trait;
use sqlx::PgPool;

pub struct PersistentCurrentUserRepository<'a> {
    db: &'a PgPool,
}

impl<'a> PersistentCurrentUserRepository<'a> {
    pub fn new(db: &'a PgPool) -> Self {
        PersistentCurrentUserRepository { db: db }
    }
}

#[async_trait]
impl CurrentUserRepository for PersistentCurrentUserRepository<'_> {
    async fn find_user_by_id(&self, id: i64) -> Result<Option<UserAccount>, AnError> {
        let result = sqlx::query_as!(UserAccount, "select * from user_account where id = $1", id)
            .fetch_optional(self.db)
            .await?;

        Ok(result)
    }
}
