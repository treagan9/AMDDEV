// src/admin/components/AdminLayout.jsx
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

function AdminLayout() {
  return (
    <Box display="flex" minH="100vh" bg="#FAFAF7">
      <AdminSidebar />
      <Box flex={1} ml="260px" p={{ base: 6, md: 10 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
