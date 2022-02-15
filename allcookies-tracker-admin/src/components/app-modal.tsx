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
  title: string;
  children: ReactNode;
  handleClose: () => void;
}

const AppModal = ({
  open,
  title,
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AppModal;
