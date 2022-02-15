import React, {FC} from "react";
import Box from "@mui/material/Box";

interface UserActivityProductsItemProps {
  src: string,
  text: string,
  amount: number
}

const UserActivityProductsItem: FC<UserActivityProductsItemProps> = ({
                                                                       src,
                                                                       text,
                                                                       amount
                                                                     }) => {

  return (
      <Box sx={{
        background: "#E6E9F4",
        width: 'calc(25% - 3px)',
        display: 'flex',
        alignItems: 'center',
        px: '10px',
        py: '8px',
        borderRadius: '3px',
      }}
      >
        <img
            src={src}
            alt="Image"
            style={{
              height: "50px",
              width: "50px",
              objectFit: "contain",
              marginRight: "16px",
            }}
        />
        <span style={{flex: 1, marginRight: '10px'}}>{text}</span>
        <Box
            sx={{
              background: "#C3E4E4",
              borderRadius: "5px",
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
        >{amount}</Box>
      </Box>
  )

}

export default UserActivityProductsItem
