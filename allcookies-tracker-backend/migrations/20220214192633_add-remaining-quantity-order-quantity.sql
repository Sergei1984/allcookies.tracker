alter table selling_point_check
 rename quantity to remaining_quantity;

alter table selling_point_check
    add order_quantity integer not null default (0);