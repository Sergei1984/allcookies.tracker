CREATE TABLE user_account (
    id bigserial CONSTRAINT user_account__pk PRIMARY KEY,
    login text NOT NULL CONSTRAINT user_account__login__uniq UNIQUE,
    password_hash text NOT NULL,
    name text NOT NULL,
    is_blocked boolean NOT NULL DEFAULT (FALSE)
);

