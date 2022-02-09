import React, {FC} from "react";
import {TimeIcon} from "../../assets/icons";
import {getDate} from "../../utils";
import Box from "@mui/material/Box";
import UserActivityProductsItem from "./user-activity-products-item";

type Props = {

}

const UserActivityProducts: FC<Props> = ({

                                            }) => {

  return (
      <Box sx={{
        borderRadius: '3px',
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}>
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={1} />
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={2} />
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={2} />
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={2} />
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={2} />
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={2} />
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={2} />
        <UserActivityProductsItem src={'https://allcookies.in.ua/data/products/7.png'} text={'Печенье “Печевасик”'} amount={2} />
      </Box>
  )

}

export default UserActivityProducts
