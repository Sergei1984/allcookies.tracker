import React, { CSSProperties } from "react";
import "../../assets/styles/scss/drawer_bottom_title.scss";
import LocalStorageService from "../../services/localStorage/localStorage.service";

interface DrawerBottomTitleProps {}

const DrawerBottomTitle = ({}: DrawerBottomTitleProps) => {
  const user = LocalStorageService.getUser();
  return (
    <div className="profile-box">
      <p className="name">{user?.name}</p>
      <span className="position">{user?.account_role}</span>
    </div>
  );
};

export default DrawerBottomTitle;
