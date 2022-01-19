import React from "react";

import { NavLink } from "react-router-dom";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
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
