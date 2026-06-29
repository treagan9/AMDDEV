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

function DashIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>; }
function CalIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>; }
function PatIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function MktIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>; }
function ContentIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>; }
function DesignIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>; }
function DeployIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>; }
function SettingsIcon({ active }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>; }
function LogoutIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A9590" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>; }

var NAV = [
  { label: 'Dashboard', path: '/answersmd-admin/dashboard/', icon: DashIcon },
  { label: 'Calendar', path: '/answersmd-admin/calendar/', icon: CalIcon },
  { label: 'Patients', path: '/answersmd-admin/patients/', icon: PatIcon },
  { label: 'Marketing', path: '/answersmd-admin/marketing/', icon: MktIcon },
  { label: 'Content', path: '/answersmd-admin/content/', icon: ContentIcon },
  { label: 'Design', path: '/answersmd-admin/images/', icon: DesignIcon },
  { label: 'Deploy', path: '/answersmd-admin/deploy/', icon: DeployIcon },
  { label: 'Settings', path: '/answersmd-admin/settings/', icon: SettingsIcon }
];

function AdminSidebar({ onClose }) {
  var location = useLocation();
  var { signOut } = useAuth();

  return (
    <Box w="260px" bg="white" borderRight="1px solid" borderColor="#E8E2D8" minH="100vh" position={{ base: 'relative', lg: 'fixed' }} left={0} top={0} display="flex" flexDirection="column">
      <Flex align="center" justify="center" px={6} py={5} borderBottom="1px solid" borderColor="#E8E2D8">
        <ChakraLink as={Link} to="/" display="flex" alignItems="center">
          <Image src="/logo-dark.webp" alt="AnswersMD" h="42px" objectFit="contain" />
        </ChakraLink>
      </Flex>

      <VStack spacing={0.5} align="stretch" px={3} py={3} flex={1}>
        {NAV.map(function (item) {
          var isActive = location.pathname === item.path || (item.path !== '/answersmd-admin/dashboard/' && location.pathname.startsWith(item.path.slice(0, -1)));
          var Icon = item.icon;
          return (
            <ChakraLink key={item.path} as={Link} to={item.path} onClick={function () { if (onClose) onClose(); }} display="flex" alignItems="center" gap={3} px={4} py={2.5} borderRadius="8px" bg={isActive ? '#F0EDE8' : 'transparent'} color={isActive ? '#2D2D2D' : '#6B6560'} fontWeight={isActive ? 600 : 400} fontSize="sm" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
              <Icon active={isActive} />
              {item.label}
            </ChakraLink>
          );
        })}
      </VStack>

      <Box px={3} py={3} borderTop="1px solid" borderColor="#E8E2D8">
        <ChakraLink onClick={function () { signOut(); if (onClose) onClose(); }} display="flex" alignItems="center" gap={3} px={4} py={2.5} borderRadius="8px" color="#6B6560" fontSize="sm" cursor="pointer" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
          <LogoutIcon />
          Sign out
        </ChakraLink>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
