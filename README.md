# allcookies.tracker

## Backend

Backend written in rust

Useful commands:

- Run test: `env-cmd -f .env cargo test`
- Run server: `env-cmd -f .env cargo run`
- Migrate database (Need installation of `cargo install sqlx-cli`): `env-cmd -f .env sqlx migrate run`