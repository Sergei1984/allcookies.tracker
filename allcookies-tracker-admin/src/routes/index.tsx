import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import * as urls from "./urls";

// PAGES
import Login from "../pages/login";
import {
  ProductsPage,
  ProfilePage,
  SellingPointsPage,
  SettingsPage,
  UsersPage,
} from "../pages";

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
        </Route>
        <Route path="*" element={<Navigate to={urls.ProductsRoute} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
