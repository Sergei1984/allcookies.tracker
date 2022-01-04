#[macro_export]
macro_rules! select_with_count {
        (
            $item_type: tt,
            $db: expr,
            $select: expr,
            $($params:expr),*
        ) => {
            {
                let items = sqlx::query_as!(
                    $item_type,
                    $select,
                    $($params,)*
                )
                .fetch_all($db)
                .await?;

                let select_count = crate::domain::sqlx_helper_macros::select_to_count($select);

                let count: Count  = sqlx::query_as(
                    &select_count                    
                )
                $(
                    .bind($params)
                )*
                .fetch_one($db)
                .await?;

                Ok::<(Vec<$item_type>, i64), AnError>((items, count.count))
            }
        };
    }

pub fn select_to_count(select: &str) -> String {
    let select_count_re = regex::Regex::new(r"(?si)^\s*(select).*(from.*)").unwrap();
    let mut select_count = String::from(select_count_re.replace(select, "$1 count(1) count $2"));

    let order_by_index = select_count.to_lowercase().rfind("order by");
    if let Some(index) = order_by_index {
        select_count = String::from(&select_count[0..index]);
    }
    let offset_index = select_count.to_lowercase().rfind("offset");
    if let Some(index) = offset_index {
        select_count = String::from(&select_count[0..index]);
    }

    String::from(select_count.trim())
}

#[cfg(test)]
mod unit_test {
    use crate::domain::sqlx_helper_macros::select_to_count;

    #[actix_rt::test]
    pub async fn select_with_order_by_should_be_replaced_with_count() {
        let cnt = select_to_count(
            r#"
         select 
            ac, 
            consd, 
            asd! 
            from activity where id = $1
            order by id, asd
            offset $2 limit $3"#,
        );
        assert_eq!("select count(1) count from activity where id = $1", cnt);
    }

    #[actix_rt::test]
    pub async fn select_with_offset_should_be_replaced_with_count() {
        let cnt = select_to_count(
            r#"
         select 
            ac, 
            consd, 
            asd! 
            from activity where id = $1
            offset $2 limit $3"#,
        );
        assert_eq!("select count(1) count from activity where id = $1", cnt);
    }
}
