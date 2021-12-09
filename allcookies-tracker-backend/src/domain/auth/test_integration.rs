#[cfg(test)]
mod integration_test {
    use crate::config::Config;
    use crate::domain::auth::contract::AuthRepository;
    use crate::domain::auth::persistent_auth_repository::PersistentAuthRepository;

    #[tokio::test]
    async fn persisten_auth_repo_should_find_user_by_login() {
        let pool = sqlx::PgPool::connect(&Config::connection_string())
            .await
            .unwrap();

        let repo = PersistentAuthRepository::new(&pool);

        let user = repo
            .find_account_by_login("seregat1984@gmail.com")
            .await
            .expect("No error due getting account by email");

        assert!(user.is_some(), "User must be found");
    }
}
