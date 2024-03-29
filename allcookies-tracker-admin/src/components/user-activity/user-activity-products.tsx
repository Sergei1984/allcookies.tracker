import React, { FC } from 'react';
import Box from '@mui/material/Box';
import UserActivityProductsItem from './user-activity-products-item';
import { IUsersActivityDataProducts } from '../../store/users-activity/types';

interface UserActivityProductsProps {
  items: IUsersActivityDataProducts[];
}

const UserActivityProducts: FC<UserActivityProductsProps> = ({ items }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        mt: '8px',
        gap: '4px',
      }}
    >
      {items.map((item, index) => (
        <UserActivityProductsItem
          key={index}
          src={item.product.image_url}
          text={item.product.title}
          amount={item.quantity}
          order_quantity={item.order_quantity}
          remaining_quantity={item.remaining_quantity}
        />
      ))}
    </Box>
  );
};

export default UserActivityProducts;
