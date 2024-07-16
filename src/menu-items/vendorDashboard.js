// assets
import { IconUserExclamation } from '@tabler/icons';

// constant
const icons = {
  IconUserExclamation
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const vendorDashboard = {
  title: 'Dashboard-Menu',
  type: 'vendor',
  children: [
    {
      id: '01',
      title: 'Dashboard',
      type: 'item',
      url: '/vendors/dashboard',
      icon: icons.IconUserExclamation
      //   breadcrumbs: false
    }
  ]
};

export default vendorDashboard;
