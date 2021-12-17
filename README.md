# allcookies.tracker

## Backend

Backend written in rust

Useful commands:

- Run test: `env-cmd -f .env cargo test`
- Run server: `env-cmd -f .env cargo run`
- Migrate database (Need installation of `cargo install sqlx-cli`): `env-cmd -f .env sqlx migrate run`
- Generate sqlx-data.json for offline build (run after applying each migration): `env-cmd -f .env cargo sqlx prepare`

## Frontend

Frontend written on React Native

Useful commands

- Install all dependencies `yarn install`
- IOS - install pods `cd ios pod install cd..`
- Run IOS `yarn ios`
- Run Android `yarn android`
