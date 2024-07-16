// assets
import { IconBrandCashapp } from '@tabler/icons';

// constant
const icons = {
  IconBrandCashapp
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const repayment = {
  title: 'Repayments',
  type: 'admin',
  children: [
    {
      id: '14',
      title: 'Repayments',
      type: 'item',
      url: '/Repayments/repaymentList',
      icon: icons.IconBrandCashapp,
      breadcrumbs: false
    }
  ]
};

export default repayment;
