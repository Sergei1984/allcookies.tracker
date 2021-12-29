FROM rust:1-slim-buster as builder

WORKDIR /usr/src/app
COPY Cargo.toml .
COPY Cargo.lock .
COPY src/main.rs src/

RUN cargo fetch
 
COPY . .
ENV SQLX_OFFLINE=true
RUN cargo build --release --offline

RUN ls -1A
RUN ls -1A target/release/
RUN pwd

FROM debian:buster-slim

COPY --from=builder /usr/src/app/target/release/allcookies-tracker-backend /usr/app/allcookies-tracker-backend

ENTRYPOINT ["/usr/app/allcookies-tracker-backend"]