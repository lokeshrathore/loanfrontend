// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //
const MenuList = () => {
  const userRole = localStorage.getItem('userRole');
  const navItems = menuItem.admin.map((item) => {
    console.log("item.type = ",item.type);
    switch (item.type) {
      case 'admin':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Admin Menu Items Error
          </Typography>
        );
    }
  });

  const adminrle = menuItem.vendor.map((item) => {
    switch (item.type) {
      case 'vendor':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Vender Menu Items Error
          </Typography>
        );
    }
  });
  return (
    <>
      {userRole === "admin" && navItems}
      {userRole === "Vendor" && adminrle}
    </>
  );
};

export default MenuList;
