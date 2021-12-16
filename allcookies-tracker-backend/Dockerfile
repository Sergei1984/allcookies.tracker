FROM rust:1.57 as builder

WORKDIR /usr/src/app
COPY . .
RUN cargo install --path .
RUN export $(cat .env | xargs) && cargo build