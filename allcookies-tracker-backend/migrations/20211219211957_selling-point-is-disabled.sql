-- Add migration script here
alter table selling_point 
    add is_disabled bool not null default (false);