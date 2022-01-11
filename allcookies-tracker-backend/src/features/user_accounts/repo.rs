use crate::features::UserAccountRepository;
use crate::features::{
    NewUserAccount, PagedResult, Patch, UpdateUserAccount, UserAccount, UserAccountInfo,
};
use crate::{select_with_count, AnError, AppError};
use sqlx::Done;
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

    async fn update_user_account(
        &self,
        user_account_id: i64,
        patch: UpdateUserAccount,
    ) -> Result<Option<()>, AnError> {
        let user_account = sqlx::query_as!(
            UserAccount,
            r#" select 
                    *
                from 
                    user_account
                where
                    account_role <> 'admin' and id = $1
                    "#,
            user_account_id
        )
        .fetch_optional(self.db)
        .await?;

        if let Some(existing) = user_account {
            let updated = existing.patch(&patch);

            let rec = sqlx::query!(
                r#"
                update user_account
                set 
                    login = $2,
                    password_hash = $3,
                    name = $4,
                    is_blocked = $5
                where
                    account_role <> 'admin' and id = $1
                "#,
                user_account_id,
                updated.login,
                updated.password_hash,
                updated.name,
                updated.is_blocked
            )
            .execute(self.db)
            .await?;

            if rec.rows_affected() != 1 {
                return Err(AppError::new_an_err(
                    &format!("Can't update user account with id {}", user_account_id),
                    actix_web::http::StatusCode::from_u16(400).unwrap(),
                ));
            }
        } else {
            return Ok(None);
        }

        Ok(Some(()))
    }
}
