import {FC, useState} from "react";
import {PhotosIcon, TimeIcon} from "../../assets/icons";
import {getDate} from "../../utils";
import Box from "@mui/material/Box";
import UserActivityPhotos from "./user-activity-photos";
import {IUsersActivityPhotos} from "../../store/users-activity/types";

interface UserActivityTimeProps {
  time: string,
  text: string,
  isPhotoExist?: boolean,
  photos?: IUsersActivityPhotos[]
}

const UserActivityTime: FC<UserActivityTimeProps> = ({
                                                       time,
                                                       text,
                                                       isPhotoExist = false,
                                                       photos
                                                     }) => {

  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState<boolean>(false)

  return (
      <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '8px'
          }}
      >
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
          <TimeIcon/> <span>{getDate(time, 'HH:mm')} {text}</span>
        </Box>
        {isPhotoExist && <Box
            sx={{
              background: "rgba(66, 166, 166, 0.25);",
              width: 'max-content',
              borderRadius: '3px',
              px: '10px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setIsPhotoDialogOpen ? setIsPhotoDialogOpen(true) : undefined}
        >
          <PhotosIcon/>
        </Box>}

        {photos && <UserActivityPhotos
            isPhotoDialogOpen={isPhotoDialogOpen}
            setIsPhotoDialogOpen={setIsPhotoDialogOpen}
            items={photos}
        />}
      </Box>
  )

}

export default UserActivityTime
