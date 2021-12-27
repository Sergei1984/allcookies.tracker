use crate::domain::{Activity, Count, PagedResult};
use crate::AnError;
use sqlx::{Postgres, Transaction};

#[async_trait::async_trait]
pub trait ActivityRepo {
    async fn get_latest_activity(&mut self, current_user_id: i64) -> Result<Activity, AnError>;

    async fn get_my_activity(
        &mut self,
        current_user_id: i64,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Activity>, AnError>;
}

pub struct PersistentActivityRepo<'a, 'c> {
    db: &'a mut Transaction<'c, Postgres>,
}

impl<'a, 'c> PersistentActivityRepo<'a, 'c> {
    pub fn new<'t>(db: &'t mut Transaction<'c, Postgres>) -> PersistentActivityRepo<'t, 'c> {
        PersistentActivityRepo::<'t, 'c> { db: db }
    }
}

#[async_trait::async_trait]
impl<'a, 'c> ActivityRepo for PersistentActivityRepo<'a, 'c> {
    async fn get_latest_activity(&mut self, current_user_id: i64) -> Result<Activity, AnError> {
        let activity = sqlx::query_as!(
            Activity,
            r#"select
                id,
                activity_type,
                location as "location!: _",
                amend_by_activity_id,
                created_by,
                created_at,
                deleted_by,
                deleted_at
            from
                activity
            where 
                created_by = $1 and deleted_by is null
            order by 
                created_at desc
            offset 0 limit 1
                "#,
            current_user_id,
        )
        .fetch_one(&mut *self.db)
        .await?;

        Ok(activity)
    }

    async fn get_my_activity(
        &mut self,
        current_user_id: i64,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Activity>, AnError> {
        let activity = sqlx::query_as!(
            Activity,
            r#"select
                id,
                activity_type,
                location as "location!: _",
                amend_by_activity_id,
                created_by,
                created_at,
                deleted_by,
                deleted_at
            from
                activity
            where 
                created_by = $1 and deleted_by is null
            order by 
                created_at desc
            offset $2 limit $3
                "#,
            current_user_id,
            skip,
            take
        )
        .fetch_all(&mut *self.db)
        .await?;

        let count = sqlx::query_as!(
            Count,
            r#"
            select
                count(1) as "count!"
            from
                activity
            where 
                created_by = $1 and deleted_by is null
            "#,
            current_user_id
        )
        .fetch_one(&mut *self.db)
        .await?;

        Ok(PagedResult {
            total: count.count,
            data: activity,
        })
    }
}
