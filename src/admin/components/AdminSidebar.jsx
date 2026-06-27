// src/admin/components/AdminSidebar.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../lib/useAuth.jsx';
import { HiOutlineHome, HiOutlineUsers, HiOutlineUserGroup, HiOutlineClipboardList, HiOutlinePhotograph, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';

var NAV_ITEMS = [
  { label: 'Dashboard', path: '/answersmd-admin/dashboard/', icon: HiOutlineHome },
  { label: 'Leads', path: '/answersmd-admin/leads/', icon: HiOutlineClipboardList },
  { label: 'Members', path: '/answersmd-admin/members/', icon: HiOutlineUsers },
  { label: 'Intake', path: '/answersmd-admin/intake/', icon: HiOutlineUserGroup },
  { label: 'Images', path: '/answersmd-admin/images/', icon: HiOutlinePhotograph },
  { label: 'Settings', path: '/answersmd-admin/settings/', icon: HiOutlineCog }
];

function AdminSidebar() {
  var location = useLocation();
  var { signOut, teamMember } = useAuth();

  return (
    <Box w="260px" bg="white" borderRight="1px solid" borderColor="#E8E2D8" minH="100vh" position="fixed" left={0} top={0} display="flex" flexDirection="column">
      <Flex align="center" px={6} py={6} borderBottom="1px solid" borderColor="#E8E2D8">
        <Image src="/logo-dark.png" alt="AnswersMD" h="28px" objectFit="contain" />
        <Text fontSize="xs" fontWeight={600} color="#C4A265" ml={3} letterSpacing="1px" textTransform="uppercase">Pulse</Text>
      </Flex>

      <VStack spacing={1} align="stretch" px={3} py={4} flex={1}>
        {NAV_ITEMS.map(function (item) {
          var isActive = location.pathname === item.path || location.pathname.startsWith(item.path.slice(0, -1) + '/');
          var Icon = item.icon;
          return (
            <ChakraLink key={item.path} as={Link} to={item.path} display="flex" alignItems="center" gap={3} px={4} py={3} borderRadius="8px" bg={isActive ? '#F0EDE8' : 'transparent'} color={isActive ? '#2D2D2D' : '#6B6560'} fontWeight={isActive ? 600 : 400} fontSize="md" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
              <Icon size={20} />
              {item.label}
            </ChakraLink>
          );
        })}
      </VStack>

      <Box px={3} py={4} borderTop="1px solid" borderColor="#E8E2D8">
        {teamMember && (
          <Text fontSize="sm" fontWeight={500} color="#2D2D2D" px={4} mb={3}>{teamMember.first_name} {teamMember.last_name}</Text>
        )}
        <ChakraLink onClick={signOut} display="flex" alignItems="center" gap={3} px={4} py={3} borderRadius="8px" color="#6B6560" fontSize="md" cursor="pointer" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
          <HiOutlineLogout size={20} />
          Sign out
        </ChakraLink>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
