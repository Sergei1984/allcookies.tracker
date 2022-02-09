import {FC} from "react";
import UserActivityTime from "./user-activity-time";
import Box from "@mui/material/Box";
import UserActivityProducts from "./user-activity-products";

const UserActivity: FC = () => {

  return (
      <Box sx={{
        px: '9px',
        py: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <UserActivityTime time={'2022-01-01 10:00'} text={'Начал день'} />
        <UserActivityTime time={'2022-01-01 12:00'} text={'Проверка ЧП ООО'} />
        <UserActivityProducts />
        <UserActivityTime time={'2022-01-01 14-00'} text={'Проверка ЧП2'} />
        <UserActivityProducts />
        <UserActivityTime time={'2022-01-01 17:00'} text={'Закончил день'} />
      </Box>
  )

}

export default UserActivity
