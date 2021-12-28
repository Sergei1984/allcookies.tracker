alter table activity
add selling_point_id bigint null references selling_point(id);

alter table selling_point_check
    drop column  selling_point_id;

alter table selling_point_check_photos
        drop column  selling_point_id;
