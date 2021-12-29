FROM rust:1.57 as builder

WORKDIR /usr/src/
RUN cargo new app
COPY Cargo.toml /usr/src/app/
COPY Cargo.lock /usr/src/app/

WORKDIR /usr/src/app/
RUN cargo build --release

COPY . .
ENV SQLX_OFFLINE=true
RUN cargo build --release



FROM debian:buster-slim

COPY --from=builder /usr/src/app/target/release/allcookies-tracker-backend /usr/app/allcookies-tracker-backend

WORKDIR /usr/app/

CMD ["./allcookies-tracker-backend"]