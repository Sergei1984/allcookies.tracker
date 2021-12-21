create table product (
    id bigserial constraint product_pk primary key,
    title text not null constraint product__title__unique unique,
    image text null,
    is_disabled bool not null default (false),
    created_by bigint not null constraint fk__product__created_by references user_account(id),
    created_at timestamp with time zone not null default(current_timestamp),
    modified_by bigint not null constraint fk__product__modified_by references user_account(id),
    modified_at timestamp with time zone not null default(current_timestamp),
    deleted_by bigint null constraint fk__product__deleted_by references user_account(id) default(null),
    deleted_at timestamp with time zone null default(null)
);
