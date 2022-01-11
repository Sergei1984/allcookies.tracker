import Login from '../containers/login/login';
import * as urls from './urls';

export const privateRoutes = [
    
]

export const routes = [
    {
        path: urls.LOGIN,
        exact: true,
        component: Login
    }
]