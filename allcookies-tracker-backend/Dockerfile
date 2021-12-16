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



FROM rust:1.57
ARG APP=/usr/app

EXPOSE 8088

ENV TZ=Etc/UTC \
    APP_USER=appuser

RUN groupadd $APP_USER \
    && useradd -g $APP_USER $APP_USER \
    && mkdir -p ${APP}

COPY --from=builder /usr/src/app/target/release/allcookies-tracker-backend ${APP}/allcookies-tracker-backend

RUN chown -R $APP_USER:$APP_USER ${APP}

USER $APP_USER
WORKDIR ${APP}

CMD ["./allcookies-tracker-backend"]