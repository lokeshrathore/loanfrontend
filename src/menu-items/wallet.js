// assets
import { IconCurrencyTenge, IconTransform, IconWallet } from '@tabler/icons';

// constant
const icons = {
  IconCurrencyTenge,
  IconTransform,
  IconWallet
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const wallets = {
  title: 'Wallets',
  type: 'admin',
  children: [
    {
      id: '17',
      title: 'Wallets',
      type: 'item',
      url: '/Wallets/walletList',
      icon: icons.IconWallet,
      breadcrumbs: false
    },
    {
      id: '18',
      title: 'Transfers',
      type: 'item',
      url: '/Wallets/transfers',
      icon: icons.IconTransform,
      breadcrumbs: false
    },
    {
      id: '19',
      title: 'Transactions',
      type: 'item',
      url: '/Wallets/transactions',
      icon: icons.IconCurrencyTenge,
      breadcrumbs: false
    }
  ]
};

export default wallets;
