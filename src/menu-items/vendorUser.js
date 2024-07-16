// assets
import { IconUserExclamation } from '@tabler/icons';

// constant
const icons = {
  IconUserExclamation
};

// ==============================|| Vendor User ||============================== //

const vendorUser = {
  title: 'User Management',
  type: 'vendor',
  children: [
    {
      id: '01',
      title: 'Manage Users',
      type: 'item',
      url: '/vendors/users',
      icon: icons.IconUserExclamation
      //   breadcrumbs: false
    }
  ]
};

export default vendorUser;
