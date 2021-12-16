FROM rust:1.57 as builder

WORKDIR /usr/src/
RUN cargo new app
COPY Cargo.toml /usr/src/app/
COPY Cargo.lock /usr/src/app/

WORKDIR /usr/src/app/
RUN cargo build

COPY . .
ENV SQLX_OFFLINE=true
RUN cargo build