#[cfg(test)]
mod integration_test {
    use crate::config::Config;
    use crate::domain::authentication::contract::AuthRepository;
    use crate::domain::authentication::repos::PersistentAuthRepository;

    #[actix_rt::test]
    async fn persisten_auth_repo_should_find_user_by_login() {
        let pool = sqlx::PgPool::connect(&Config::connection_string())
            .await
            .unwrap();

        let repo = PersistentAuthRepository::new(&pool);

        let user = repo
            .find_account_by_login("seregat1984@gmail.com")
            .await
            .expect("No error due getting account by email");

        if let Some(user) = user {
            assert_eq!(user.login, "seregat1984@gmail.com");
            assert_eq!(user.name, "Serhii");
            assert_eq!(user.is_blocked, false);
            assert_eq!(user.account_role, "admin");
        } else {
            panic!("User must be found");
        }
    }
}
