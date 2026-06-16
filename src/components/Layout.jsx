// src/components/Layout.jsx
import { Box } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function ScrollToTop() {
  var { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <ScrollToTop />
      <Header />
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
