import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
  if (false) return <Navigate to={"/"}/>

  return <Outlet/>
};

export default PrivateRoute;