create table activity (
    id bigserial primary key,
    activity_type varchar(20) not null check (activity_type in ('open_day', 'close_day', 'point_check')),
    location geometry(point, 4326) null,
    amend_by_activity_id bigint null references activity(id),
    created_by bigint not null references user_account(id),
    created_at timestamp with time zone not null default(current_timestamp),
    deleted_by bigint null references user_account(id) default(null),
    deleted_at timestamp with time zone null default(null)
);

create table selling_point_check (
    id bigserial primary key,
    activity_id bigint not null references activity(id),
    selling_point_id bigint not null references selling_point(id),
    product_id bigint not null references product(id),
    quantity int not null
);

create table selling_point_check_photos (
    id bigserial primary key,
    activity_id bigint not null references activity(id),
    selling_point_id bigint not null references selling_point(id),
    photo_data bytea not null
);