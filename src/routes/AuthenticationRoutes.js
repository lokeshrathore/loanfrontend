import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option  routing
const AuthLoginPage = Loadable(lazy(() => import('views/pages/authentication/authenticationPage/LoginPage')));
const AuthRegisterPage = Loadable(lazy(() => import('views/pages/authentication/authenticationPage/RegistersPage')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLoginPage />
    },
    {
      path: '/register',
      element: <AuthRegisterPage />
    }
  ]
};

export default AuthenticationRoutes;
