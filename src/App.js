import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './views/pages/authentication/authenticationPage/LoginPage';
import RegistersPage from './views/pages/authentication/authenticationPage/RegistersPage';
// routing
import PageRoutes from 'routes';

// defaultTheme
import themes from 'themes';

import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Function to check token expiration
    const checkTokenExpiration = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
          if (decodedToken.exp < currentTime) {
            setIsTokenExpired(true);
            localStorage.removeItem('token');
          } else {
            setIsTokenExpired(false);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        setIsTokenExpired(true);
      }
    };

    // Check token expiration initially
    checkTokenExpiration();

    // Check token expiration every 15 minutes
    const interval = setInterval(checkTokenExpiration, 24 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [token]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <ToastContainer />
        <NavigationScroll>
          {isTokenExpired ? (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/register" element={<RegistersPage />} />
            </Routes>
          ) : (
            <>
              {user && (user.role === 'admin' || user?.role === 'Vendor') ? (
                <PageRoutes />
              ) : (
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                  <Route path="/register" element={<RegistersPage />} />
                </Routes>
              )}
            </>
          )}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
