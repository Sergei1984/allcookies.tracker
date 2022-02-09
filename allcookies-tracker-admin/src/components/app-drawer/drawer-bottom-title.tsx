import React, { CSSProperties, useCallback } from "react";
import "../../assets/styles/scss/drawer_bottom_title.scss";

import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

import LocalStorageService, {
  clearToken,
} from "../../services/localStorage/localStorage.service";
import { useNavigate } from "react-router-dom";
import { SignInRoute } from "../../routes/urls";

interface DrawerBottomTitleProps {}

const DrawerBottomTitle = ({}: DrawerBottomTitleProps) => {
  const navigate = useNavigate();
  const user = LocalStorageService.getUser();

  const handleSignOut = () => {
    clearToken();
    LocalStorageService.removeUser();
    navigate(SignInRoute);
  };
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
