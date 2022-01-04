use crate::domain::{Count, LatLonPoint, NewSellingPoint, PagedResult, SellingPoint};
use crate::{select_with_count, AnError, AppError};
use async_trait::async_trait;
use sqlx::prelude::*;
use sqlx::PgPool;

#[async_trait]
pub trait SellingPointRepository {
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AnError>;

    async fn find_active(
        &self,
        search_by_name: Option<String>,
        location: Option<LatLonPoint>,
        radius_meters: f64,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn create(
        &self,
        entity: NewSellingPoint,
        current_user_id: i64,
    ) -> Result<SellingPoint, AnError>;

    async fn update(&self, updated: SellingPoint, current_user_id: i64) -> Result<(), AnError>;

    async fn delete(&self, id: i64, current_user_id: i64) -> Result<(), AnError>;
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
    async fn find_active(
        &self,
        search_by_name: Option<String>,
        location: Option<LatLonPoint>,
        radius_meters: f64,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<SellingPoint>, AnError> {
        let title = search_by_name
            .map(|v| format!("%{}%", v.replace("%", "")))
            .unwrap_or(String::from("%"));

        let points = sqlx::query_as!(
            SellingPoint,
            r#"select 
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
               from selling_point 
               where 
                    title ilike $1::text 
                and is_disabled = false 
                and deleted_at is null 
                and ((st_distancesphere(location::geometry, $2)) < $3 or $2 is null)

               order by title
               offset $4::bigint limit $5::bigint"#,
            title,
            location as _,
            radius_meters,
            skip,
            take
        )
        .fetch_all(self.db)
        .await?;

        let count = sqlx::query_as!(
            Count,
            r#"select count(1) as "count!"
            from 
                selling_point 
            where 
                    title ilike $1 
                and is_disabled = false 
                and deleted_at is null
                and ((st_distancesphere(location::geometry, $2)) < $3 or $2 is null)"#,
            title,
            location as _,
            radius_meters
        )
        .fetch_one(self.db)
        .await?;

        Ok(PagedResult {
            total: count.count,
            data: points,
        })
    }

    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError> {
        let (points, count) = select_with_count!(
            SellingPoint,
            self.db,
            r#"select 
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
                    selling_point 
                offset $1 limit $2"#,
            skip,
            take
        )?;

        Ok(PagedResult {
            total: count,
            data: points,
        })
    }

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AnError> {
        let point = sqlx::query_as!(
            SellingPoint,
            r#"select 
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
               from selling_point where id = $1"#,
            id
        )
        .fetch_optional(self.db)
        .await?;

        if let Some(p) = point {
            Ok(Some(p))
        } else {
            Ok(None)
        }
    }

    async fn create(
        &self,
        entity: NewSellingPoint,
        current_user_id: i64,
    ) -> Result<SellingPoint, AnError> {
        let rec = sqlx::query!(
            r#"
            insert into selling_point(
                title, 
                description, 
                address, 
                location, 
                is_disabled, 
                created_by, 
                modified_by
            )
            values ($1, $2, $3, $4, $5, $6, $7)
            returning id
            "#,
            entity.title,
            entity.description,
            entity.address,
            entity.location as _,
            entity.is_disabled,
            current_user_id,
            current_user_id
        )
        .fetch_one(self.db)
        .await?;

        let new = self.get_one(rec.id).await?;

        match new {
            Some(e) => Ok(e),
            None => Err(AppError::new_an_err(
                "Not found",
                actix_web::http::StatusCode::from_u16(404).unwrap(),
            )),
        }
    }

    async fn update(&self, entity: SellingPoint, current_user_id: i64) -> Result<(), AnError> {
        let rec = sqlx::query!(
            r#"
            update selling_point
            set 
                title = $1,
                description = $2,
                address = $3,
                location = $4,
                is_disabled = $5,
                modified_by = $6,
                modified_at = current_timestamp
            where
                id = $7
            "#,
            entity.title,
            entity.description,
            entity.address,
            entity.location as _,
            entity.is_disabled,
            current_user_id,
            entity.id
        )
        .execute(self.db)
        .await?;

        if rec.rows_affected() != 1 {
            return Err(AppError::new_an_err(
                &format!("Can't update selling point with id {}", entity.id),
                actix_web::http::StatusCode::from_u16(400).unwrap(),
            ));
        }

        Ok(())
    }

    async fn delete(&self, id: i64, current_user_id: i64) -> Result<(), AnError> {
        let res = sqlx::query!(
            r#"
            update selling_point
            set 
                deleted_by = $2,
                deleted_at = current_timestamp
            where
                id = $1
            "#,
            id,
            current_user_id
        )
        .execute(self.db)
        .await?;

        if res.rows_affected() != 1 {
            return Err(AppError::new_an_err(
                &format!("Can't delete selling point with id {}", id),
                actix_web::http::StatusCode::from_u16(400).unwrap(),
            ));
        }

        Ok(())
    }
}
