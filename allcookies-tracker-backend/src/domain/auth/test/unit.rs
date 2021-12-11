#[cfg(test)]
mod unit_test {
    use crate::domain::auth::contract::AuthRepository;
    use crate::domain::auth::svcs::AuthServiceImpl;
    use crate::domain::auth::contract::AuthService;
    use crate::domain::UserAccount;
    use crate::AnError;
    use async_trait::async_trait;

    #[actix_rt::test]
    async fn login_should_fail_for_empty_login() {
        let service = AuthServiceImpl::new(MockAuthRepository::new(None));

        let acc = service.login("", "1234").await;

        assert!(acc.is_err());
    }

    #[actix_rt::test]
    async fn login_should_fail_for_empty_password() {
        let service = AuthServiceImpl::new(MockAuthRepository::new(None));

        let acc = service.login("test", "1234").await;

        assert!(acc.is_err());
    }

    #[actix_rt::test]
    async fn login_should_fail_for_blocked_account() {
        let service = AuthServiceImpl::new(MockAuthRepository::new(Some(UserAccount {
            id: 1,
            account_role: "user".to_string(),
            is_blocked: true,
            name: "test user".to_string(),
            login: "test".to_string(),
            password_hash: "234234532".to_string(),
        })));

        let acc = service.login("test", "1234").await;

        assert!(acc.is_err());
    }

    #[actix_rt::test]
    async fn login_should_success_for_correct_password() {
        let service = AuthServiceImpl::new(MockAuthRepository::new(Some(UserAccount {
            id: 1,
            account_role: "user".to_string(),
            is_blocked: false,
            name: "test user".to_string(),
            login: "test".to_string(),
            password_hash: "$2a$11$OOnDtwxLZ4IDRc6EmUiPmuT1axjSQdo0Yk6ne5D.GFbHdBLMIct2O"
                .to_string(),
        })));

        let acc = service.login("test", "123456").await;

        assert!(acc.is_ok());
    }

    #[actix_rt::test]
    async fn login_should_fail_for_incorrect_password() {
        let service = AuthServiceImpl::new(MockAuthRepository::new(Some(UserAccount {
            id: 1,
            account_role: "user".to_string(),
            is_blocked: false,
            name: "test user".to_string(),
            login: "test".to_string(),
            password_hash: "$2a$11$OOnDtwxLZ4IDRc6EmUiPmuT1axjSQdo0Yk6ne5D.GFbHdBLMIct2O"
                .to_string(),
        })));

        let acc = service.login("test", "654321").await;

        assert!(acc.is_err());
    }

    struct MockAuthRepository {
        account: Option<UserAccount>,
    }

    impl MockAuthRepository {
        pub fn new(account: Option<UserAccount>) -> Self {
            MockAuthRepository { account: account }
        }
    }

    #[async_trait]
    impl AuthRepository for MockAuthRepository {
        async fn find_account_by_login(
            &self,
            _login: &str,
        ) -> Result<Option<UserAccount>, AnError> {
            Ok(self.account.clone())
        }
    }
}
