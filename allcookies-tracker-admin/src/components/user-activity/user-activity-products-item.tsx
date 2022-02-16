import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface UserActivityProductsItemProps {
  src: string;
  text: string;
  amount: number;
  order_quantity: number;
  remaining_quantity: number;
}

const UserActivityProductsItem: FC<UserActivityProductsItemProps> = ({
  src,
  text,
  amount,
  order_quantity,
  remaining_quantity,
}) => {
  console.log(order_quantity, remaining_quantity);
  return (
    <Box
      sx={{
        background: '#ffffff',
        // width: 'calc(25% - 3px)',
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        // mx: '10px',
        // my: '8px',
        margin: '8px 8px 8px 0',
        borderRadius: '3px',
        border: '1px solid #D7D7D7',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <img
        src={src}
        alt='Image'
        style={{
          height: '65px',
          width: '65px',
          objectFit: 'contain',
          marginLeft: '8px',
          marginRight: '8px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid #D7D7D7',
        }}
      >
        <Box sx={{ width: '100%', borderBottom: '1px solid #D7D7D7' }}>
          <Typography
            sx={{
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '12px',
              lineHeight: '14px',
              letterSpacing: '-0.01em',
              color: '#161616',
            }}
          >
            {text}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '3px',
              borderRight: '1px solid #D7D7D7',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                color: '#4E4E4E',
                fontSize: '11px',
                lineHeight: '13px',
              }}
            >
              Сколько осталось
            </Typography>
            <Typography
              sx={{
                background: '#D1F3F3',
                borderRadius: '5px',
                height: '37px',
                ml: 'auto',
                minWidth: '31px',
                fontSize: '18px',
                textAlign: 'center',
                lineHeight: '37px',
                letterSpacing: '-0.01em',
                color: '#42A6A6',
              }}
            >
              {order_quantity}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '3px',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                color: '#4E4E4E',
                fontSize: '11px',
                lineHeight: '13px',
              }}
            >
              Сколько заказать
            </Typography>
            <Typography
              sx={{
                background: '#D1F3F3',
                borderRadius: '5px',
                height: '37px',
                ml: 'auto',
                minWidth: '31px',
                fontSize: '18px',
                textAlign: 'center',
                lineHeight: '37px',
                letterSpacing: '-0.01em',
                color: '#42A6A6',
              }}
            >
              {remaining_quantity}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Box
        sx={{
          background: '#C3E4E4',
          borderRadius: '5px',
          height: '37px',
          ml: 'auto',
          minWidth: '31px',
          px: '5px',
          fontSize: '18px',
          textAlign: 'center',
          lineHeight: '37px',
          letterSpacing: '-0.01em',
          color: '#767676',
        }}
      >
        {amount}
      </Box> */}
    </Box>
  );
};

export default UserActivityProductsItem;
