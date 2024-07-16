import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// Page Not Found   routing
const PageNotFound = Loadable(lazy(() => import('views/PageNotFound')));

// ==============================|| PAGE NOT FOUND ROUTING ||============================== //

const PageNotFoundRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '*',
      element: <PageNotFound />
    }
  ]
};

export default PageNotFoundRoutes;
