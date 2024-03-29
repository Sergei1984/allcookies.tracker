import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import * as urls from './urls';

// PAGES
import {
  AddUser,
  ProductsPage,
  ProfilePage,
  SellingPointsPage,
  // SettingsPage,
  UsersPage,
  AddSellingPointPage,
  AddProductPage,
  InvoicesPage,
  InvoicePage,
} from '../pages';
import Login from '../pages/login';
import useNotifier from '../hooks/useNotifier';

const AppRoutes = () => {
  useNotifier();
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
          <Route
            path={urls.AddSellingPointRoute}
            element={<AddSellingPointPage />}
          />
          <Route path={urls.ProfileRoute} element={<ProfilePage />} />
          <Route path={urls.UsersRoute} element={<UsersPage />} />
          {/*<Route path={urls.SettingsRoute} element={<SettingsPage />} />*/}
          <Route path={urls.AddUserRoute} element={<AddUser />} />
          <Route path={urls.AddProductRoute} element={<AddProductPage />} />
          <Route path={urls.InvoicesRoute} element={<InvoicesPage />} />
          <Route path={urls.InvoiceRoute.template} element={<InvoicePage />} />
          <Route path='*' element={<Navigate to={urls.ProductsRoute} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
