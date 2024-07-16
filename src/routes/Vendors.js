import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Vendor = Loadable(lazy(() => import('views/Vendor')));
const Users = Loadable(lazy(() => import('views/Vendor/Users')));

// ==============================|| MAIN ROUTING ||============================== //

const Vendors = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Vendor />
    },
    {
      path: 'vendors',
      children: [
        {
          path: 'dashboard',
          element: <Vendor />
        }
      ]
    },
    {
      path: 'vendors',
      children: [
        {
          path: 'users',
          element: <Users />
        }
      ]
    }
  ]
};

export default Vendors;
