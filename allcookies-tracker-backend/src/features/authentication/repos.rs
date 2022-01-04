use crate::features::authentication::contract::AuthRepository;
use crate::features::UserAccount;
use crate::AnError;
use async_trait::async_trait;
use sqlx::PgPool;

pub struct PersistentAuthRepository<'a> {
    db: &'a PgPool,
}

impl<'a> PersistentAuthRepository<'a> {
    pub fn new(db: &'a PgPool) -> Self {
        PersistentAuthRepository { db: db }
    }
}

#[async_trait]
impl AuthRepository for PersistentAuthRepository<'_> {
    async fn find_account_by_login(&self, login: &str) -> Result<Option<UserAccount>, AnError> {
        let accounts = sqlx::query_as!(
            UserAccount,
            "select * from user_account where login = $1",
            login
        )
        .fetch_all(self.db)
        .await?;

        match accounts.into_iter().next() {
            Some(acc) => Ok(Some(acc)),
            None => Ok(None),
        }
    }
}
