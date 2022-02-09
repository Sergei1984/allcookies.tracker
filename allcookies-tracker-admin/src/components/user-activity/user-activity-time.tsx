import {FC} from "react";
import {TimeIcon} from "../../assets/icons";
import {getDate} from "../../utils";
import Box from "@mui/material/Box";

type Props = {
  time: string,
  text: string
}

const UserActivityTime: FC<Props> = ({
                                              time,
                                              text
                                            }) => {

  return (
      <Box sx={{
        background: "rgba(66, 166, 166, 0.25);",
        width: 'max-content',
        borderRadius: '3px',
        pl: '10px',
        pr: '8px',
        py: '10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0.44,
        color: '#767676',
        gap: '9px',
      }}>
        <TimeIcon /> <span>{getDate(time, 'HH:mm')} {text}</span>
      </Box>
  )

}

export default UserActivityTime
