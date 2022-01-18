import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../containers/dashboard/dashboard";
import * as urls from "./urls";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

// PAGES
import {
  ProductsPage,
  SellingPointsPage,
  ProfilePage,
  UsersPage,
  SettingsPage,
} from "../pages";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path={urls.SignInRoute} element={<div>Login page</div>} />
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
