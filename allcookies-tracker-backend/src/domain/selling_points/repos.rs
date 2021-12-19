use crate::domain::geo_primitives::LatLonPoint;
use crate::domain::NewSellingPoint;
use crate::domain::{PagedResult, SellingPoint};
use crate::AnError;
use crate::AppError;
use async_trait::async_trait;
use geo_types::Geometry;
use sqlx::PgPool;

#[async_trait]
pub trait SellingPointRepository {
    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn find(
        &self,
        search_by_name: Option<String>,
        location: Option<LatLonPoint>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<SellingPoint>, AnError>;

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AnError>;

    async fn create(
        &self,
        entity: NewSellingPoint,
        current_user_id: i64,
    ) -> Result<SellingPoint, AnError>;
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
    async fn find(
        &self,
        search_by_name: Option<String>,
        _location: Option<LatLonPoint>,
        skip: i64,
        take: i64,
    ) -> Result<PagedResult<SellingPoint>, AnError> {
        let title = search_by_name.map(|v| format!("{}%", v));

        let points = sqlx::query_as!(
            SellingPoint,
            r#"select id, title, description, address, location as "location!: _", created_by, created_at, modified_by, modified_at, deleted_by, deleted_at 
               from selling_point 
               where title like $3
               offset $1 limit $2"#,
            skip,
            take,
            title
        )
        .fetch_all(self.db)
        .await?;

        let count: i64 =
            sqlx::query_scalar("select count(1) from selling_point where title like $1")
                .bind(title)
                .fetch_one(self.db)
                .await?;

        Ok(PagedResult {
            total: count,
            data: points,
        })
    }

    async fn get_all(&self, skip: i64, take: i64) -> Result<PagedResult<SellingPoint>, AnError> {
        let points = sqlx::query_as!(
            SellingPoint,
            r#"select id, title, description, address, location as "location!: _", created_by, created_at, modified_by, modified_at, deleted_by, deleted_at from selling_point offset $1 limit $2"#,
            skip,
            take
        )
        .fetch_all(self.db)
        .await?;

        let count: i64 = sqlx::query_scalar("select count(1) from selling_point")
            .fetch_one(self.db)
            .await?;

        Ok(PagedResult {
            total: count,
            data: points,
        })
    }

    async fn get_one(&self, id: i64) -> Result<Option<SellingPoint>, AnError> {
        let point = sqlx::query_as!(
            SellingPoint,
            r#"select id, title, description, address, location as "location!: _", created_by, created_at, modified_by, modified_at, deleted_by, deleted_at 
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
        let p = Geometry::Point(geo_types::Point::new(
            entity.location.lon,
            entity.location.lat,
        ));

        let rec = sqlx::query!(
            r#"
            insert into selling_point(title, description, address, location, created_by, modified_by)
            values ($1, $2, $3, ST_GeomFromWKB($4, 4326), $5, $6)
            returning id
            "#,
            entity.title,
            entity.description,
            entity.address,
            geozero::wkb::Encode(p) as _,
            current_user_id,
            current_user_id
        ).fetch_one(self.db)
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
}
