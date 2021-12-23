#[cfg(test)]
mod integration_test {
    use crate::config::Config;
    use crate::domain::selling_points::repos::{
        PersistentSellingPointRepository, SellingPointRepository,
    };

    #[actix_rt::test]
    async fn persistent_selling_point_repo_should_select_point() {
        let pool = sqlx::PgPool::connect(&Config::connection_string())
            .await
            .unwrap();

        let repo = PersistentSellingPointRepository::new(&pool);
        let data = repo.get_all(0, 10).await.unwrap();

        assert_ne!(data.total, 0);
        assert_ne!(data.data.len(), 0);

        let first = data.data.get(0).unwrap();
        assert!(!first.title.is_empty());
    }
}
