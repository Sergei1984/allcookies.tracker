create table selling_point (
    id bigserial CONSTRAINT selling_point__pk PRIMARY KEY,
    title text not null constraint selling_point__title_uq unique,
    description text null,
    address text  null,
    location geometry(point) null,
    created_by bigint not null constraint fk__user_account__created_by references user_account(id),
    created_at timestamp with time zone not null,
    modified_by bigint not null constraint fk__user_account__modified_by references user_account(id),
    modified_at timestamp with time zone not null,
    deleted_by bigint null constraint fk__user_account__deleted_by references user_account(id),
    deleted_at timestamp with time zone null
);
