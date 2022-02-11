import Box from "@mui/material/Box";
import {Dispatch, FC, SetStateAction} from "react";
import {Fade} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import {IUsersActivityPhotos} from "../../store/users-activity/types";
import {Pagination} from 'swiper';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {SliderArrowIcon} from "../../assets/icons";
import {getDate} from "../../utils";
import {config} from "../../config/config";
import classes from '../../assets/styles/scss/addUser.module.scss'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface IUserActivityPhotosProps {
  isPhotoDialogOpen: boolean
  setIsPhotoDialogOpen: Dispatch<SetStateAction<boolean>>
  items: IUsersActivityPhotos[]
}

const UserActivityPhotos: FC<IUserActivityPhotosProps> = ({
                                                            isPhotoDialogOpen,
                                                            setIsPhotoDialogOpen,
                                                            items
                                                          }) => {

  const handleClose = () => {
    setIsPhotoDialogOpen(false);
  };

  const SwiperPagination = () => {
    const swiper = useSwiper();

    return (
        <>
          <button
              className={classes.swiperBtnNext}
              onClick={() => swiper.slideNext()}
          >
            <SliderArrowIcon/>
          </button>
          <button
              className={classes.swiperBtnPrev}
              onClick={() => swiper.slidePrev()}
          >
            <SliderArrowIcon/>
          </button>
        </>
    );
  }

  return (
      <>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isPhotoDialogOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
          <Fade in={isPhotoDialogOpen}>

            <Box className={classes.swiperWrapper}>
              <Swiper
                  modules={[Pagination]}
                  pagination={{clickable: true}}
                  slidesPerView={1}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
              >
                {items.map(({id, time, url}) =>
                    <SwiperSlide
                        key={id}
                        className={classes.swiperSlide}>
                      <Box className={classes.swiperSlideInner}>
                        <img
                            className={classes.swiperSlideImg}
                            src={config.BASE_URL + url}
                            alt={getDate(time, 'DD.MM.YYYY HH:mm')}
                        />
                      </Box>
                    </SwiperSlide>
                )}

                {items.length > 1 && <SwiperPagination />}

              </Swiper>
            </Box>
          </Fade>
        </Modal>
      </>
  );
}

export default UserActivityPhotos
