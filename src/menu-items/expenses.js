// assets
import { IconBriefcase, IconCategory } from '@tabler/icons';

// constant
const icons = {
  IconBriefcase,
  IconCategory
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const expense = {
  title: 'Expenses',
  type: 'admin',
  children: [
    {
      id: '02',
      title: 'Expense Categories',
      type: 'item',
      url: '/Expenses/expenseCategories',
      icon: icons.IconCategory,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Expenses',
      type: 'item',
      url: '/Expenses/expensesList',
      icon: icons.IconBriefcase,
      breadcrumbs: false
    }
  ]
};

export default expense;
