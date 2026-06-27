// src/components/Layout.jsx
import { Box } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function ScrollToTop() {
  var location = useLocation();
  useEffect(function () {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function Layout() {
  return (
    <Box w="100%" maxW="100%" overflowX="hidden" position="relative">
      <ScrollToTop />
      <Header />
      <Box as="main" minH="100vh" w="100%" maxW="100%">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
