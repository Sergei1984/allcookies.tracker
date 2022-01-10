use crate::features::SellingPointCheckPhotos;
use crate::features::{Activity, Count, LatLonPoint, PagedResult, SellingPoint};
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
                            selling_point_id
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

            let photos = sqlx::query_as!(
                SellingPointCheckPhotoInfo,
                r#"
                select
                    id, 
                    activity_id, 
                    at
                from
                    selling_point_check_photos
                where
                    activity_id in (
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

            let users = sqlx::query_as!(
                UserInfoRef,
                r#"
                select
                    id, 
                    login, 
                    name
                from
                    user_account
                where
                    id in (
                        select 
                            created_by
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

            ActivityExtraData {
                point_check: selling_point_check_dtos,
                selling_points: selling_points,
                photos: photos,
                users: users
            }
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SellingPointCheckDto {
    pub id: i64,
    pub activity_id: i64,
    pub product_id: i64,
    pub product_title: String,
    pub product_image_url: Option<String>,
    pub product_is_disabled: bool,
    pub quantity: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SellingPointCheckPhotoInfo {
    pub id: i64,
    pub activity_id: i64,
    pub at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserInfoRef {
    pub id: i64,
    pub login: String,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ActivityExtraData {
    pub point_check: Vec<SellingPointCheckDto>,
    pub selling_points: Vec<SellingPoint>,
    pub photos: Vec<SellingPointCheckPhotoInfo>,
    pub users: Vec<UserInfoRef>,
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
    ) -> Result<(Activity, ActivityExtraData), AnError>;

    async fn get_my_activity(
        &mut self,
        current_user_id: i64,
        skip: i64,
        take: i64,
    ) -> Result<(PagedResult<Activity>, ActivityExtraData), AnError>;

    async fn get_all_activity(
        &mut self,
        skip: i64,
        take: i64,
    ) -> Result<(PagedResult<Activity>, ActivityExtraData), AnError>;

    async fn create_activity(
        &mut self,
        activity_type: &str,
        at_time: DateTime<Utc>,
        location: Option<LatLonPoint>,
        selling_point_id: Option<i64>,
        current_user_id: i64,
    ) -> Result<i64, AnError>;

    async fn create_selling_point_check(
        &mut self,
        activity_id: i64,
        product_id: i64,
        quantity: i32,
    ) -> Result<(), AnError>;

    async fn create_photo(&mut self, activity_id: i64, photo_bytes: &[u8]) -> Result<(), AnError>;

    async fn get_photo(&mut self, activity_id: i64, photo_id: i64) -> Result<Vec<u8>, AnError>;
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
    ) -> Result<(PagedResult<Activity>, ActivityExtraData), AnError> {
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

        let extra = activity_info!(
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
            extra,
        ))
    }

    async fn get_all_activity(
        &mut self,
        skip: i64,
        take: i64,
    ) -> Result<(PagedResult<Activity>, ActivityExtraData), AnError> {
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
            order by 
                created_at desc
            offset $1 limit $2
                "#,
            skip,
            take
        )?;

        let extra = activity_info!(
            &mut *self.db,
            r#" order by 
                    created_at desc
                offset $1 limit $2 "#,
            skip,
            take
        );

        Ok((
            PagedResult {
                total: count,
                data: act,
            },
            extra,
        ))
    }

    async fn get_activity_info_by_id(
        &mut self,
        id: i64,
    ) -> Result<(Activity, ActivityExtraData), AnError> {
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

        let extra = activity_info!(&mut *self.db, "where id = $1", id);

        Ok((activity, extra))
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

    async fn create_selling_point_check(
        &mut self,
        activity_id: i64,
        product_id: i64,
        quantity: i32,
    ) -> Result<(), AnError> {
        let _ = sqlx::query!(
            r#"
            insert into selling_point_check(
                activity_id, 
                product_id,
                quantity
            )
            values (                
                $1,
                $2,
                $3
            )
            "#,
            activity_id,
            product_id,
            quantity
        )
        .execute(&mut *self.db)
        .await?;

        Ok(())
    }

    async fn create_photo(&mut self, activity_id: i64, photo_bytes: &[u8]) -> Result<(), AnError> {
        let _ = sqlx::query!(
            r#"
            insert into selling_point_check_photos(
                activity_id, 
                photo_data
            )
            values (                
                $1,
                $2
            )
            "#,
            activity_id,
            photo_bytes
        )
        .execute(&mut *self.db)
        .await?;

        Ok(())
    }

    async fn get_photo(&mut self, activity_id: i64, photo_id: i64) -> Result<Vec<u8>, AnError> {
        let photo = sqlx::query_as!(
            SellingPointCheckPhotos,
            r#"
            select 
                * 
            from 
                selling_point_check_photos
            where
                activity_id = $1 and id = $2
            "#,
            activity_id,
            photo_id
        )
        .fetch_one(&mut *self.db)
        .await?;

        Ok(photo.photo_data)
    }
}
