import {FC, useEffect, useState} from "react";
import UserActivityTime from "./user-activity-time";
import Box from "@mui/material/Box";
import UserActivityProducts from "./user-activity-products";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../store/rootStore";
import {getUsersActivityThunk} from "../../store/users-activity/thunk/getUsersActivityThunk";
import {getDate} from "../../utils";
import {IUsersActivityData} from "../../store/users-activity/types";

type Props = {
  id: number,
  selectedDate: string
}

const UserActivity: FC<Props> = ({ id, selectedDate }) => {
  const dispatch = useDispatch();

  const {data} = useSelector((state: RootStore) => state.usersActivityStore);
  const [userActivity, setUserActivity] = useState<IUsersActivityData[]>([])

  useEffect(() => {
    dispatch(getUsersActivityThunk(selectedDate))
  }, [selectedDate])

  useEffect(() => {
    if (data && id) {
      setUserActivity(
          data
              .filter(item => item.created.id === id)
              .sort((a, b) => {
                return +getDate(a.time, 'X') - +getDate(b.time, 'X')
              })
      )
    }
  }, [data])

  return (
      <Box sx={{
        px: '9px',
        py: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {userActivity.length ?
            userActivity.map((item, index) => {
              if (item.activity_type === 'open_day' && index === 0) {
                return <UserActivityTime key={index} time={item.time} text={'Начал день'}/>
              }
              if (item.activity_type === 'point_check' && item.selling_point && item.products) {
                return (
                    <div key={index}>
                      <UserActivityTime time={item.time} text={item.selling_point.title}/>
                      <UserActivityProducts items={item.products}/>
                    </div>
                )
              }
              if (item.activity_type === 'close_day' && index === userActivity.length - 1) {
                return <UserActivityTime key={index} time={item.time} text={'Закончил день'}/>
              } else return null
            })
            :
            <h3>В этот день не работал</h3>
        }
      </Box>
  )

}

export default UserActivity
