import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import * as urls from "./urls";

// PAGES
import {
  AddUser,
  ProductsPage,
  ProfilePage,
  SellingPointsPage,
  SettingsPage,
  UsersPage,
} from "../pages";
import Login from "../pages/login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path={urls.SignInRoute} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={urls.ProductsRoute} element={<ProductsPage />} />
          <Route
            path={urls.SellingPointsRoute}
            element={<SellingPointsPage />}
          />
          <Route path={urls.ProfileRoute} element={<ProfilePage />} />
          <Route path={urls.UsersRoute} element={<UsersPage />} />
          <Route path={urls.SettingsRoute} element={<SettingsPage />} />
          <Route path={urls.AddUserRoute} element={<AddUser />} />
        </Route>
        <Route path="*" element={<Navigate to={urls.ProductsRoute} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
