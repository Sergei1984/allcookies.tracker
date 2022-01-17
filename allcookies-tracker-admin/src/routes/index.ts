import Login from '../containers/login/login';
import * as urls from './urls';
import Dashboard from "../containers/dashboard/dashboard";


export const privateRoutes = [
  {
      path: urls.DASHBOARD,
      exact: true,
      component: Dashboard
  }
]

export const routes = [
    {
        path: urls.LOGIN,
        exact: true,
        component: Login
    }
]