import React from "react";

import { NavLink } from "react-router-dom";

import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  ProductsRoute,
  ProfileRoute,
  SellingPointsRoute,
  SettingsRoute,
  UsersRoute,
} from "../routes/urls";

const Navigation = (): JSX.Element => {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <NavLink to={ProductsRoute}>Продукты</NavLink>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <NavLink to={SellingPointsRoute}>Магазины</NavLink>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <NavLink to={ProfileRoute}>Профиль</NavLink>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <NavLink to={UsersRoute}>Пользователи</NavLink>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <NavLink to={SettingsRoute}>Настройки</NavLink>
      </ListItem>
    </List>
  );
};

export default Navigation;
