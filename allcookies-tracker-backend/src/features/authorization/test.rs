#[cfg(test)]
mod unit_test {
    use crate::features::authorization::CurrentUser;

    #[actix_rt::test]
    async fn current_user_should_produce_correct_token() {
        let cu = CurrentUser {
            id: 123,
            email: "test@test.com".to_owned(),
            name: "test".to_owned(),
            account_role: "admin".to_owned(),
            iss: "issuer".to_owned(),
            sub: "sub".to_owned(),
            exp: 123434345345
        };

        let jwt = cu.to_jwt();

        assert_ne!(jwt.is_empty(), true);
    }

    #[actix_rt::test]
    async fn token_should_be_correctly_generated_and_parsed() {
        let cu = CurrentUser {
            id: 123,
            email: "test@test.com".to_owned(),
            name: "test".to_owned(),
            account_role: "admin".to_owned(),
            iss: "issuer".to_owned(),
            sub: "sub".to_owned(),
            exp: 123434345345
        };

        let jwt = cu.to_jwt();

        assert_ne!(jwt.is_empty(), true);

        let claims = CurrentUser::from_jwt(jwt).unwrap();

        assert_eq!(cu.id, claims.id);
        assert_eq!(cu.email, claims.email);
        assert_eq!(cu.name, claims.name);
        assert_eq!(cu.account_role, claims.account_role);
        assert_eq!(cu.iss, claims.iss);
        assert_eq!(cu.sub, claims.sub);
        assert_eq!(cu.exp, claims.exp);
    }
}
