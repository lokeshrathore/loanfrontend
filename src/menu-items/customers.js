// assets
import { IconUserExclamation } from '@tabler/icons';

// constant
const icons = {
  IconUserExclamation
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const customer = {
  title: 'Customers',
  type: 'admin',
  children: [
    {
      id: '01',
      title: 'Borrowers',
      type: 'item',
      url: '/customers/borrowers',
      icon: icons.IconUserExclamation
      //   breadcrumbs: false
    }
  ]
};

export default customer;
