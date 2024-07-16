// assets
import { IconFileUpload, IconCashBanknote, IconNfc, IconCashOff, IconCash, IconCoins, IconBuildingBank } from '@tabler/icons';

// constant
const icons = {
  IconFileUpload,
  IconCashBanknote,
  IconNfc,
  IconCashOff,
  IconCash,
  IconCoins,
  IconBuildingBank
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const loan = {
  title: 'Loans',
  type: 'admin',
  children: [
    {
      id: '07',
      title: 'Loan',
      type: 'item',
      url: '/Loans/loanList',
      icon: icons.IconBuildingBank,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Pending Loans',
      type: 'item',
      url: '/Loans/pendingLoans',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Active Loans',
      type: 'item',
      url: '/Loans/activeLoans',
      icon: icons.IconCoins,
      breadcrumbs: false
    },

    {
      id: '10',
      title: 'Denied Loans',
      type: 'item',
      url: '/Loans/deniedLoans',
      icon: icons.IconCashOff,
      breadcrumbs: false
    },
    {
      id: '11',
      title: 'Partially Paid Loans',
      type: 'item',
      url: '/Loans/partiallyPaidLoans',
      icon: icons.IconCash,
      breadcrumbs: false
    },
    {
      id: '12',
      title: 'Fully Paid Loans',
      type: 'item',
      url: '/Loans/fullyPaidLoans',
      icon: icons.IconNfc,
      breadcrumbs: false
    },
    {
      id: '13',
      title: 'Defaulted Loans',
      type: 'item',
      url: '/Loans/defaultedLoans',
      icon: icons.IconCashBanknote,
      breadcrumbs: false
    }
  ]
};

export default loan;
