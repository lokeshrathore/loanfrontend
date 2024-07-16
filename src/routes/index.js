import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import PageNotFoundRoutes from './PageNotFoundRoutes';

import Vendors from './Vendors';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes, PageNotFoundRoutes, Vendors]);
}
