import dashboard from './dashboard';
import customer from './customers';
import form from './loan_Forms';
import wallets from './wallet';
import loan from './loans';
import expense from './expenses';
import repayment from './repayments';
import users from './user';
import vendorDashboard from './vendorDashboard';
import vendorUser from './vendorUser';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  admin: [dashboard, customer, form, wallets, loan, expense, repayment, users],
  vendor: [vendorDashboard, vendorUser]
};

export default menuItems;
