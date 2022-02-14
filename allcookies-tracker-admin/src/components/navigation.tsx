import React from "react";
import "../assets/styles/scss/navlink.scss";

import { NavLink } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import {
  ProductsRoute,
  ProfileRoute,
  SellingPointsRoute,
  // SettingsRoute,
  UsersRoute,
} from "../routes/urls";

import {
  ProductsIcon,
  SellingPointsIcon,
  ProfileIcon,
  UsersIcon,
  SettingsIcon,
} from "../assets/icons";

const Navigation = (): JSX.Element => {
  return (
    <List>
      <ListItem>
        <NavLink to={ProductsRoute}>
          {({ isActive }) => (
            <div className={isActive ? "navlink active" : "navlink"}>
              <ProductsIcon sx={{ color: "#42A6A6", opacity: 0.6 }} />
              <span>Продукты</span>
            </div>
          )}
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={SellingPointsRoute}>
          {({ isActive }) => (
            <div className={isActive ? "navlink active" : "navlink"}>
              <SellingPointsIcon sx={{ color: "#42A6A6", opacity: 0.6 }} />
              <span>Магазины</span>
            </div>
          )}
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={ProfileRoute}>
          {({ isActive }) => (
            <div className={isActive ? "navlink active" : "navlink"}>
              <ProfileIcon />
              <span>Профиль</span>
            </div>
          )}
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={UsersRoute}>
          {({ isActive }) => (
            <div className={isActive ? "navlink active" : "navlink"}>
              <UsersIcon />
              <span>Пользователи</span>
            </div>
          )}
        </NavLink>
      </ListItem>
      {/*<ListItem>*/}
      {/*  <NavLink to={SettingsRoute}>*/}
      {/*    {({ isActive }) => (*/}
      {/*      <div className={isActive ? "navlink active" : "navlink"}>*/}
      {/*        <SettingsIcon />*/}
      {/*        <span>Настройки</span>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </NavLink>*/}
      {/*</ListItem>*/}
    </List>
  );
};

export default Navigation;
