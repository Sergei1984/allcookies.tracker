import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import DrawerHeader from "../components/app-drawer/drawer-header";
import Main from "../components/main";
import AppDrawer from "../components/app-drawer/app-drawer";
import AppBar from "../components/app-bar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LocalStorageService, {
  clearToken,
} from "../services/localStorage/localStorage.service";
import { SignInRoute } from "../routes/urls";
import { setUserAction } from "../store/auth/actions";

const drawerWidth = 240;

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps): JSX.Element => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    LocalStorageService.signOut();
    dispatch(setUserAction(false));
    navigate(SignInRoute);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} drawerwidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "#42A6A6" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        drawerwidth={drawerWidth}
        variant="persistent"
        anchor="left"
        isOpen={open}
        handleDrawerClose={handleDrawerClose}
        handleSignOut={handleSignOut}
      />
      <Main open={open} drawerwidth={drawerWidth}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default DashboardLayout;
