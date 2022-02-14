use crate::features::activity::repo::ActivityExtraData;
use crate::features::{
    ActiveUserInfo, Activity, ActivityInfo, CloseDayActivityInfo, OpenDayActivityInfo, Photo,
    PhotoSigningInfo, ProductCheckInfo, ProductRef, SellingPointCheckActivityInfo, SellingPointRef,
    UserActivityRef,
};

pub fn to_activity_info<TUserInfo>(
    current_user: &TUserInfo,
    activity: Vec<Activity>,
    extra: ActivityExtraData,
) -> Vec<ActivityInfo>
where
    TUserInfo: ActiveUserInfo,
{
    activity
        .into_iter()
        .map(|i| {
            let user = extra.users.iter().find(|u| u.id == i.created_by).unwrap();
            match i.activity_type.as_str() {
                "open_day" => ActivityInfo::OpenDay(OpenDayActivityInfo {
                    id: i.id,
                    location: i.location,
                    time: i.created_at,
                    created: UserActivityRef {
                        id: i.created_by,
                        at: i.created_at,
                        login: user.login.clone(),
                        name: user.name.clone(),
                    },
                }),
                "close_day" => ActivityInfo::CloseDay(CloseDayActivityInfo {
                    id: i.id,
                    location: i.location,
                    time: i.created_at,
                    created: UserActivityRef {
                        id: i.created_by,
                        at: i.created_at,
                        login: user.login.clone(),
                        name: user.name.clone(),
                    },
                }),
                _ => {
                    let selling_point = extra
                        .selling_points
                        .iter()
                        .find(|sp| sp.id == i.selling_point_id.unwrap())
                        .unwrap();

                    ActivityInfo::SellingPointCheck(SellingPointCheckActivityInfo {
                        id: i.id,
                        location: i.location,
                        time: i.created_at,
                        created: UserActivityRef {
                            id: i.created_by,
                            at: i.created_at,
                            login: user.login.clone(),
                            name: user.name.clone(),
                        },
                        selling_point: SellingPointRef {
                            id: selling_point.id,
                            title: selling_point.title.clone(),
                            address: selling_point.address.clone(),
                            location: selling_point.location.clone(),
                        },
                        products: extra
                            .point_check
                            .iter()
                            .filter(|c| c.activity_id == i.id)
                            .map(|c| ProductCheckInfo {
                                product: ProductRef {
                                    id: c.product_id,
                                    title: c.product_title.clone(),
                                    image_url: c.product_image_url.clone(),
                                },
                                remaining_quantity: c.remaining_quantity,
                                order_quantity: c.order_quantity,
                            })
                            .collect(),
                        photos: extra
                            .photos
                            .iter()
                            .filter(|p| p.activity_id == i.id)
                            .map(|p| Photo {
                                id: p.id,
                                time: p.at,
                                url: {
                                    if current_user.is_admin() {
                                        format!(
                                            "/admin/activity/photo/{}",
                                            PhotoSigningInfo::to_jwt(p.id, i.id, current_user.id())
                                                .unwrap()
                                        )
                                    } else {
                                        format!(
                                            "/client/activity/photo/{}",
                                            PhotoSigningInfo::to_jwt(p.id, i.id, current_user.id())
                                                .unwrap()
                                        )
                                    }
                                },
                            })
                            .collect(),
                    })
                }
            }
        })
        .collect()
}
