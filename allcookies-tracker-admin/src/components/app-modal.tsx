import React, { ReactNode } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal, { ModalProps } from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #D0D0D0;",
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

interface AppModalProps {
  open: boolean;
  children: ReactNode;
  handleClose: () => void;
}

const AppModal = ({
  open,
  handleClose,
  children,
}: AppModalProps): JSX.Element => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AppModal;
