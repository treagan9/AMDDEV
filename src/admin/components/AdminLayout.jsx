// src/admin/components/AdminLayout.jsx
import { useState } from 'react';
import { Box, Flex, Image, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import AdminSidebar from './AdminSidebar';

function PulseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function AdminLayout() {
  var [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box display="flex" minH="100vh" bg="#FAFAF7">
      <Box display={{ base: 'none', lg: 'block' }}>
        <AdminSidebar onClose={function () {}} />
      </Box>

      {mobileOpen && (
        <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(0,0,0,0.3)" zIndex={98} onClick={function () { setMobileOpen(false); }} />
      )}
      <Box
        display={{ base: 'block', lg: 'none' }}
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        w="280px"
        transform={mobileOpen ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.3s ease"
        zIndex={99}
        bg="white"
      >
        <AdminSidebar onClose={function () { setMobileOpen(false); }} />
      </Box>

      <Box flex={1} ml={{ base: 0, lg: '260px' }} minH="100vh" position="relative">
        <Flex display={{ base: 'flex', lg: 'none' }} align="center" justify="space-between" px={5} py={4} bg="white" borderBottom="1px solid" borderColor="#E8E2D8" position="sticky" top={0} zIndex={10}>
          <Image src="/logo-dark.png" alt="AnswersMD" h="24px" objectFit="contain" />
          <Box cursor="pointer" onClick={function () { setMobileOpen(!mobileOpen); }} color="#2D2D2D">
            {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </Box>
        </Flex>
        <Box p={{ base: 5, md: 10 }}>
          <Outlet />
        </Box>
        <Box px={{ base: 5, md: 10 }} py={6} borderTop="1px solid" borderColor="#E8E2D8" mt="auto">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
            <Text fontSize="xs" color="#9A9590">AnswersMD</Text>
            <Text fontSize="xs" color="#9A9590">Need help? <ChakraLink href="mailto:admin@answersmd.com" color="#C4A265" _hover={{ color: '#A88B50' }}>admin@answersmd.com</ChakraLink></Text>
          </Flex>
        </Box>

        <Box position="fixed" bottom={5} right={5} color="#D5D0C8" opacity={0.6} _hover={{ opacity: 1, color: '#C4A265' }} transition="all 0.3s ease" cursor="default">
          <PulseIcon />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
