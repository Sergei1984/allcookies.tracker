import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  let token = true;
  return token ? <Route {...props} /> : <Navigate to="/login" />;
};
export default PrivateRoute;
