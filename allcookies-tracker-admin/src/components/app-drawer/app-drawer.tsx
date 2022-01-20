import * as React from "react";

import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import logos from "../../assets/svg/logo.svg";

import DrawerBottomTitle from "./drawer-bottom-title";
import DrawerHeader from "./drawer-header";
import Navigation from "../navigation";

interface AppDrawerProps extends DrawerProps {
  isOpen: boolean;
  drawerwidth: number;
  handleDrawerClose: () => void;
}

const AppDrawer = ({
  isOpen,
  drawerwidth,
  handleDrawerClose,
}: AppDrawerProps) => {
  return (
    <Drawer
      sx={{
        width: drawerwidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerwidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={isOpen}
    >
      <DrawerHeader
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 5px 0 10px",
          height: "92px",
        }}
      >
        <img src={logos} alt="" height="68px" width="98px" />
        <IconButton onClick={handleDrawerClose}>
          <MenuOpenIcon sx={{ color: "#42A6A6", opacity: 0.5 }} />
        </IconButton>
      </DrawerHeader>
      <Divider variant="middle" />
      <Navigation />
      <DrawerBottomTitle />
    </Drawer>
  );
};

export default AppDrawer;
