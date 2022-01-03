alter table activity
    add at timestamp with time zone not null default (current_timestamp);

alter table selling_point_check_photos 
    add at timestamp with time zone not null default (current_timestamp);