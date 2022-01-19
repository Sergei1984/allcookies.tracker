import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import dashboard from "../../layouts/dashboard";
import {getAccessToken} from "../../services/localStorage/localStorage.service";

const PrivateRoute = () => {
  const token = getAccessToken();
  if (!token){
    return <Navigate to={"/signin"}/>
  }
  return <Outlet context={dashboard}/>
};

export default PrivateRoute;