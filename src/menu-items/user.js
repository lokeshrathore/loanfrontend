// assets
import { IconUsers, IconBrowserCheck } from '@tabler/icons';

// constant
const icons = {
  IconUsers,
  IconBrowserCheck
};

// ==============================|| User Management List ||============================== //

const users = {
  title: 'User Management',
  type: 'admin',
  children: [
    {
      id: '15',
      title: 'Roles',
      type: 'item',
      url: '/UserManagement/roles',
      icon: icons.IconBrowserCheck,
      breadcrumbs: false
    },
    {
      id: '16',
      title: 'Manage Users',
      type: 'item',
      url: '/UserManagement/manageUsers',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default users;
