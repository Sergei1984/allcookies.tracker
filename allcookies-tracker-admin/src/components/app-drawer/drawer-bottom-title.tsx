import React, { CSSProperties } from "react";
import "../../assets/styles/scss/drawer_bottom_title.scss";

interface DrawerBottomTitleProps {}

const DrawerBottomTitle = ({}: DrawerBottomTitleProps) => {
  return (
    <div className="profile-box">
      <p className="name">Дмитрий Г.</p>
      <span className="position">Менеджер</span>
    </div>
  );
};

export default DrawerBottomTitle;
