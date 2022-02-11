import React, { CSSProperties, useCallback } from "react";
import "../../assets/styles/scss/drawer_bottom_title.scss";

import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

import LocalStorageService from "../../services/localStorage/localStorage.service";

interface DrawerBottomTitleProps {
  handleSignOut: () => void;
}

const DrawerBottomTitle = ({ handleSignOut }: DrawerBottomTitleProps) => {
  const user = LocalStorageService.getUser();

  return (
    <div className="profile-box">
      <div className="user">
        <p className="name">{user?.name}</p>
        <span className="position">{user?.account_role}</span>
      </div>
      <div className="buttons">
        <IconButton aria-label="delete" onClick={handleSignOut}>
          <LogoutIcon sx={{ color: "#42a6a6", opacity: 0.6 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default DrawerBottomTitle;
