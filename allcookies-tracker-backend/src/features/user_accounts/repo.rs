use crate::features::UserAccountRepository;
use crate::features::{NewUserAccount, PagedResult, UserAccountInfo};
use crate::{select_with_count, AnError};
use sqlx::PgPool;

#[derive(Debug)]
pub struct PersistentUserAccountRepository<'a> {
    db: &'a PgPool,
}

impl<'a> PersistentUserAccountRepository<'a> {
    pub fn new(db: &'a PgPool) -> Self {
        Self { db: db }
    }
}

#[async_trait::async_trait]
impl<'a> UserAccountRepository for PersistentUserAccountRepository<'a> {
    async fn get_all_non_admins(
        &self,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<UserAccountInfo>, AnError> {
        let (user_accounts, count) = select_with_count!(
            UserAccountInfo,
            self.db,
            r#"select 
                    id, 
                    login,
                    name,
                    is_blocked
                from 
                    user_account
                where
                    account_role <> 'admin' 
                offset $1 limit $2"#,
            skip,
            take
        )?;

        Ok(PagedResult {
            total: count,
            data: user_accounts,
        })
    }

    async fn get_by_id(&self, id: i64) -> Result<Option<UserAccountInfo>, AnError> {
        let user_account = sqlx::query_as!(
            UserAccountInfo,
            r#" select 
                    id, 
                    login,
                    name,
                    is_blocked
                from 
                    user_account
                where
                    account_role <> 'admin' and id = $1
                    "#,
            id
        )
        .fetch_optional(self.db)
        .await?;

        Ok(user_account)
    }

    async fn create_user_account(&self, user_account: NewUserAccount) -> Result<i64, AnError> {
        let rec = sqlx::query!(
            r#"
            insert into user_account(
                login, 
                password_hash, 
                name, 
                is_blocked, 
                account_role
            )
            values ($1, $2, $3, $4, 'mgr')
            returning id
            "#,
            user_account.login,
            user_account.password,
            user_account.name,
            user_account.is_blocked
        )
        .fetch_one(self.db)
        .await?;

        Ok(rec.id)
    }
}
