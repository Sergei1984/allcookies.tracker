use crate::domain::{Activity, Count, LatLonPoint, PagedResult, SellingPoint};
use crate::{select_with_count, AnError};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, Transaction};

macro_rules! activity_info {
    ($db: expr, $where:expr, $($params:expr),*) => {
        {
            let selling_point_check_dtos = sqlx::query_as!(
                SellingPointCheckDto,
                r#"
                select
                    spc.id,
                    spc.activity_id,
                    spc.product_id,
                    p.title as "product_title!",
                    p.image_url as product_image_url,
                    p.is_disabled product_is_disabled,
                    spc.quantity
                from
                    selling_point_check spc inner join
                    product p on spc.product_id = p.id
                where
                    spc.activity_id in ( select id from activity "# +
                        $where +
                    " ) ",
                $($params,)*
            )
            .fetch_all($db)
            .await?;

            let selling_points = sqlx::query_as!(
                SellingPoint,
                r#"
                select
                    id, 
                    title, 
                    description, 
                    address, 
                    location as "location!: _", 
                    is_disabled, 
                    created_by, 
                    created_at, 
                    modified_by, 
                    modified_at, 
                    deleted_by, 
                    deleted_at 
                from
                    selling_point sp
                where
                    sp.id in (
                        select 
                            id 
                        from
                            activity "#  +
                            $where +
                            r#"                        
                    )            
                "#,
                $($params,)*
            )
            .fetch_all($db)
            .await?;

            (selling_point_check_dtos, selling_points)
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct SellingPointCheckDto {
    pub id: i64,
    pub activity_id: i64,
    pub product_id: i64,
    pub product_title: String,
    pub product_image_url: Option<String>,
    pub product_is_disabled: bool,
    pub quantity: i32,
}

#[async_trait::async_trait]
pub trait ActivityRepo {
    async fn get_latest_activity(
        &mut self,
        current_user_id: i64,
    ) -> Result<Option<Activity>, AnError>;

    async fn get_activity_by_id(&mut self, id: i64) -> Result<Option<Activity>, AnError>;

    async fn get_activity_info_by_id(
        &mut self,
        id: i64,
    ) -> Result<(Activity, Vec<SellingPointCheckDto>, Vec<SellingPoint>), AnError>;

    async fn get_my_activity(
        &mut self,
        current_user_id: i64,
        skip: i64,
        take: i64,
    ) -> Result<
        (
            PagedResult<Activity>,
            Vec<SellingPointCheckDto>,
            Vec<SellingPoint>,
        ),
        AnError,
    >;

    async fn create_activity(
        &mut self,
        activity_type: &str,
        at_time: DateTime<Utc>,
        location: Option<LatLonPoint>,
        selling_point_id: Option<i64>,
        current_user_id: i64,
    ) -> Result<i64, AnError>;
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
    async fn get_activity_by_id(&mut self, id: i64) -> Result<Option<Activity>, AnError> {
        let activity = sqlx::query_as!(
            Activity,
            r#"select
                id,
                activity_type,
                at,
                selling_point_id,
                location as "location!: _",
                amend_by_activity_id,
                created_by,
                created_at,
                deleted_by,
                deleted_at
            from
                activity
            where 
                id = $1
                "#,
            id,
        )
        .fetch_optional(&mut *self.db)
        .await?;

        Ok(activity)
    }

    async fn get_latest_activity(
        &mut self,
        current_user_id: i64,
    ) -> Result<Option<Activity>, AnError> {
        let activity = sqlx::query_as!(
            Activity,
            r#"select
                id,
                activity_type,
                at,
                selling_point_id,
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
        .fetch_optional(&mut *self.db)
        .await?;

        Ok(activity)
    }

    async fn get_my_activity(
        &mut self,
        current_user_id: i64,
        skip: i64,
        take: i64,
    ) -> Result<
        (
            PagedResult<Activity>,
            Vec<SellingPointCheckDto>,
            Vec<SellingPoint>,
        ),
        AnError,
    > {
        let (act, count) = select_with_count!(
            Activity,
            &mut *self.db,
            r#"select
                id,
                activity_type,
                at,
                location as "location!: _",
                selling_point_id,
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
        )?;

        let (point_checks, selling_points) = activity_info!(
            &mut *self.db,
            r#" where 
                    created_by = $1 and deleted_by is null
                order by 
                    created_at desc
                offset $2 limit $3 "#,
            current_user_id,
            skip,
            take
        );

        Ok((
            PagedResult {
                total: count,
                data: act,
            },
            point_checks,
            selling_points,
        ))
    }

    async fn get_activity_info_by_id(
        &mut self,
        id: i64,
    ) -> Result<(Activity, Vec<SellingPointCheckDto>, Vec<SellingPoint>), AnError> {
        let activity = sqlx::query_as!(
            Activity,
            r#"select
                id,
                activity_type,
                at,
                location as "location!: _",
                selling_point_id,
                amend_by_activity_id,
                created_by,
                created_at,
                deleted_by,
                deleted_at
            from
                activity
            where 
                id = $1
                "#,
            id
        )
        .fetch_one(&mut *self.db)
        .await?;

        let (point_check, selling_points) = activity_info!(&mut *self.db, "where id = $1", id);

        Ok((activity, point_check, selling_points))
    }

    async fn create_activity(
        &mut self,
        activity_type: &str,
        at_time: DateTime<Utc>,
        location: Option<LatLonPoint>,
        selling_point_id: Option<i64>,
        current_user_id: i64,
    ) -> Result<i64, AnError> {
        let res = sqlx::query!(
            r#"
            insert into activity(
                activity_type, 
                at, 
                location, 
                selling_point_id,
                created_by
            )
            values (                
                $1,
                $2,
                $3, 
                $4,
                $5
            )
            returning id
            "#,
            activity_type,
            at_time,
            location as _,
            selling_point_id,
            current_user_id
        )
        .fetch_one(&mut *self.db)
        .await?;

        Ok(res.id)
    }
}
