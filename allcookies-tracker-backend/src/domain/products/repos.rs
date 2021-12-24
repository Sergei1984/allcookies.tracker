use crate::domain::Count;
use crate::domain::{NewProduct, PagedResult, Product};
use crate::{AnError, AppError};
use async_trait::async_trait;
use sqlx::PgPool;

#[async_trait]
pub trait ProductRepository {
    async fn get_all(
        &self,
        title: Option<String>,
        is_disabled: Option<bool>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Product>, AnError>;

    async fn get_one(&self, id: i64) -> Result<Option<Product>, AnError>;

    async fn create(&self, entity: &NewProduct, current_user_id: i64) -> Result<Product, AnError>;

    async fn update(&self, updated: &Product, current_user_id: i64) -> Result<(), AnError>;

    async fn delete(&self, id: i64, current_user_id: i64) -> Result<(), AnError>;
}

#[derive(Debug)]
pub struct PersistentProductRepository<'a> {
    db: &'a PgPool,
}

impl<'a> PersistentProductRepository<'a> {
    pub fn new(db: &'a PgPool) -> Self {
        PersistentProductRepository { db: db }
    }
}

#[async_trait]
impl<'a> ProductRepository for PersistentProductRepository<'a> {
    async fn get_all(
        &self,
        title: Option<String>,
        is_disabled: Option<bool>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<Product>, AnError> {
        let title_filter = title.map(|v| {
            if v.is_empty() {
                String::from("%")
            } else {
                format!("%{}%", v)
            }
        });

        let products = sqlx::query_as!(
            Product,
            r#"
            select 
                id, 
                title, 
                image_url,
                is_disabled, 
                created_by, 
                created_at, 
                modified_by, 
                modified_at, 
                deleted_by, 
                deleted_at 
            from 
                product 
            where
                    (title ilike $1 or $1 is null)
                and (is_disabled = $2 or $2 is null)
            offset $3 limit $4"#,
            title_filter,
            is_disabled,
            skip,
            take
        )
        .fetch_all(self.db)
        .await?;

        let count = sqlx::query_as!(
            Count,
            r#"
            select
                count(1) as "count!"
            from
                product
            where
                    (title ilike $1 or $1 is null)
                and (is_disabled = $2 or $2 is null)
            "#,
            title_filter,
            is_disabled
        )
        .fetch_one(self.db)
        .await?;

        Ok(PagedResult {
            total: count.count,
            data: products,
        })
    }

    async fn get_one(&self, id: i64) -> Result<Option<Product>, AnError> {
        let product = sqlx::query_as!(
            Product,
            r#"select 
                    id, 
                    title, 
                    image_url, 
                    is_disabled, 
                    created_by, 
                    created_at, 
                    modified_by, 
                    modified_at, 
                    deleted_by, 
                    deleted_at
               from 
                    product where id = $1"#,
            id
        )
        .fetch_optional(self.db)
        .await?;

        if let Some(p) = product {
            Ok(Some(p))
        } else {
            Ok(None)
        }
    }

    async fn create(&self, entity: &NewProduct, current_user_id: i64) -> Result<Product, AnError> {
        let rec = sqlx::query!(
            r#"
                insert into product(title, image_url, is_disabled, created_by, modified_by)
                values ($1, $2, $3, $4, $4)
                returning id
                "#,
            entity.title,
            entity.image_url,
            entity.is_disabled,
            current_user_id
        )
        .fetch_one(self.db)
        .await?;

        let new = self.get_one(rec.id).await?;

        match new {
            Some(e) => Ok(e),
            None => Err(Box::new(AppError::not_found_err())),
        }
    }

    async fn update(&self, entity: &Product, current_user_id: i64) -> Result<(), AnError> {
        let rec = sqlx::query!(
            r#"
            update product
            set
                title = $1,
                image_url = $2,
                is_disabled = $3,
                modified_by = $4,
                modified_at = current_timestamp
            where
                id = $5
            "#,
            entity.title,
            entity.image_url,
            entity.is_disabled,
            current_user_id,
            entity.id
        )
        .execute(self.db)
        .await?;

        // if rec.rows_affected() != 1 {
        //     return Err(AppError::new_an_err(
        //         &format!("Can't update product with id {}", entity.id),
        //         actix_web::http::StatusCode::from_u16(400).unwrap(),
        //     ));
        // }

        Ok(())
    }

    async fn delete(&self, id: i64, current_user_id: i64) -> Result<(), AnError> {
        let res = sqlx::query!(
            r#"
            update product
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

        // if res.rows_affected() != 1 {
        //     return Err(AppError::new_an_err(
        //         &format!("Can't delete product with id {}", id),
        //         actix_web::http::StatusCode::from_u16(400).unwrap(),
        //     ));
        // }

        Ok(())
    }
}
