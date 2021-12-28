use crate::domain::{Activity, Count, LatLonPoint, PagedResult};
use crate::AnError;
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, Transaction};

#[derive(Serialize, Deserialize)]
pub struct SellingPointCheckDto {
    pub id: i64,
    pub activity_id: i64,
    pub selling_point_id: i64,
    pub selling_point_title: String,
    pub selling_point_location: Option<LatLonPoint>,
    pub product_id: i64,
    pub product_title: String,
    pub product_image_url: String,
    pub product_is_disabled: bool,
    pub quantity: i32,
}

#[async_trait::async_trait]
pub trait ActivityRepo {
    async fn get_latest_activity(&mut self, current_user_id: i64) -> Result<Activity, AnError>;

    async fn get_my_activity(
        &mut self,
        current_user_id: i64,
        skip: i64,
        take: i64,
    ) -> Result<(PagedResult<Activity>, Vec<SellingPointCheckDto>), AnError>;
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
    ) -> Result<(PagedResult<Activity>, Vec<SellingPointCheckDto>), AnError> {
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

        let selling_point_check_dtos = sqlx::query_as!(
            SellingPointCheckDto,
            r#"
            select
                spc.id,
                spc.activity_id,
                spc.selling_point_id,
                sp.title as "selling_point_title!",
                sp.location as "selling_point_location: _",
                spc.product_id,
                p.title as "product_title!",
                p.image_url as "product_image_url!",
                p.is_disabled product_is_disabled,
                spc.quantity
            from
                selling_point_check spc inner join
                selling_point sp on spc.selling_point_id = sp.id inner join
                product p on spc.product_id = p.id
            where
                spc.activity_id in (
                    select 
                        id 
                    from
                        activity a 
                    where 
                        a.created_by = $1 and a.deleted_by is null
                    order by 
                        a.created_at desc
                    offset $2 limit $3
                )            
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

        Ok((
            PagedResult {
                total: count.count,
                data: activity,
            },
            selling_point_check_dtos,
        ))
    }
}
