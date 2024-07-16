// assets
import { IconChecklist, IconNotebook, IconClipboardTypography } from '@tabler/icons';

// constant
const icons = {
  IconChecklist,
  IconNotebook,

  IconClipboardTypography
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const form = {
  title: 'Loan Agreement Forms',
  type: 'admin',
  children: [
    {
      id: '04',
      title: 'Loan Types',
      type: 'item',
      url: 'loanAgreement/loanTypes',
      icon: icons.IconClipboardTypography,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Loan Agreement Forms',
      type: 'item',
      url: '/loanAgreement/loanForms',
      icon: icons.IconNotebook,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Loan Settlement Forms',
      type: 'item',
      url: '/loanAgreement/loanSettlement',
      icon: icons.IconChecklist,
      breadcrumbs: false
    }
  ]
};

export default form;
