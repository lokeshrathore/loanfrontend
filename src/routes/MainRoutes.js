import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Borrowers = Loadable(lazy(() => import('views/Borrowers')));
const LoansTypes = Loadable(lazy(() => import('views/LoansTypes')));
const LoansAgreement = Loadable(lazy(() => import('views/LoansAgreement')));
const LoansSettlement = Loadable(lazy(() => import('views/LoansSettlement')));
const Wallets = Loadable(lazy(() => import('views/Wallets')));
const Transfer = Loadable(lazy(() => import('views/Transfer')));
const Transaction = Loadable(lazy(() => import('views/Transaction')));
const Loans = Loadable(lazy(() => import('views/Loans')));
const ActiveLoans = Loadable(lazy(() => import('views/ActiveLoans')));
const PendingLoans = Loadable(lazy(() => import('views/PendingLoans')));
const DeniedLoans = Loadable(lazy(() => import('views/DeniedLoans')));
const PartiallyPaidLoans = Loadable(lazy(() => import('views/PartiallyPaidLoans')));
const FullyPaidLoans = Loadable(lazy(() => import('views/FullyPaidLoans')));
const DefaultLoans = Loadable(lazy(() => import('views/DefaultLoans')));
const ExpensesCategories = Loadable(lazy(() => import('views/ExpensesCategories')));
const ExpansesList = Loadable(lazy(() => import('views/ExpansesList')));
const RepaymentsList = Loadable(lazy(() => import('views/RepaymentsList')));
const ManageUsers = Loadable(lazy(() => import('views/ManageUsers')));
const Roles = Loadable(lazy(() => import('views/Roles')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'customers',
      children: [
        {
          path: 'borrowers',
          element: <Borrowers />
        }
      ]
    },
    {
      path: 'loanAgreement',
      children: [
        {
          path: 'loanTypes',
          element: <LoansTypes />
        }
      ]
    },
    {
      path: 'loanAgreement',
      children: [
        {
          path: 'loanForms',
          element: <LoansAgreement />
        }
      ]
    },
    {
      path: 'loanAgreement',
      children: [
        {
          path: 'loanSettlement',
          element: <LoansSettlement />
        }
      ]
    },
    {
      path: 'Wallets',
      children: [
        {
          path: 'walletList',
          element: <Wallets />
        }
      ]
    },
    {
      path: 'Wallets',
      children: [
        {
          path: 'transfers',
          element: <Transfer />
        }
      ]
    },
    {
      path: 'Wallets',
      children: [
        {
          path: 'transactions',
          element: <Transaction />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'loanList',
          element: <Loans />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'pendingLoans',
          element: <PendingLoans />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'activeLoans',
          element: <ActiveLoans />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'deniedLoans',
          element: <DeniedLoans />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'partiallyPaidLoans',
          element: <PartiallyPaidLoans />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'fullyPaidLoans',
          element: <FullyPaidLoans />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'defaultedLoans',
          element: <DefaultLoans />
        }
      ]
    },
    {
      path: 'Expenses',
      children: [
        {
          path: 'expenseCategories',
          element: <ExpensesCategories />
        }
      ]
    },
    {
      path: 'Expenses',
      children: [
        {
          path: 'expensesList',
          element: <ExpansesList />
        }
      ]
    },
    {
      path: 'Repayments',
      children: [
        {
          path: 'repaymentList',
          element: <RepaymentsList />
        }
      ]
    },
    {
      path: 'UserManagement',
      children: [
        {
          path: 'roles',
          element: <Roles />
        }
      ]
    },
    {
      path: 'UserManagement',
      children: [
        {
          path: 'manageUsers',
          element: <ManageUsers />
        }
      ]
    }
  ]
};

export default MainRoutes;
