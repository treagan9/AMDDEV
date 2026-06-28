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
import { HiOutlineHome, HiOutlineUsers, HiOutlineUserGroup, HiOutlineClipboardList, HiOutlinePhotograph, HiOutlineCog, HiOutlineLogout, HiOutlineCloudUpload, HiOutlineMail } from 'react-icons/hi';

var NAV_ITEMS = [
  { label: 'Dashboard', path: '/answersmd-admin/dashboard/', icon: HiOutlineHome },
  { label: 'Leads', path: '/answersmd-admin/leads/', icon: HiOutlineClipboardList },
  { label: 'Patients', path: '/answersmd-admin/members/', icon: HiOutlineUsers },
  { label: 'Intake', path: '/answersmd-admin/intake/', icon: HiOutlineUserGroup },
  { label: 'Email', path: '/answersmd-admin/email/', icon: HiOutlineMail },
  { label: 'Design', path: '/answersmd-admin/images/', icon: HiOutlinePhotograph },
  { label: 'Deploy', path: '/answersmd-admin/deploy/', icon: HiOutlineCloudUpload },
  { label: 'Settings', path: '/answersmd-admin/settings/', icon: HiOutlineCog }
];

function AdminSidebar({ onClose }) {
  var location = useLocation();
  var { signOut, teamMember } = useAuth();

  function handleNav() { if (onClose) onClose(); }

  return (
    <Box w="260px" bg="white" borderRight="1px solid" borderColor="#E8E2D8" minH="100vh" position={{ base: 'relative', lg: 'fixed' }} left={0} top={0} display="flex" flexDirection="column">
      <Flex align="center" px={6} py={6} borderBottom="1px solid" borderColor="#E8E2D8">
        <ChakraLink as={Link} to="/" display="flex" alignItems="center">
          <Image src="/logo-dark.png" alt="AnswersMD" h="28px" objectFit="contain" />
        </ChakraLink>
        <Text fontSize="xs" fontWeight={600} color="#C4A265" ml={3} letterSpacing="1px" textTransform="uppercase">Pulse</Text>
      </Flex>

      <VStack spacing={1} align="stretch" px={3} py={4} flex={1}>
        {NAV_ITEMS.map(function (item) {
          var isActive = location.pathname === item.path || (item.path !== '/answersmd-admin/dashboard/' && location.pathname.startsWith(item.path.slice(0, -1)));
          var Icon = item.icon;
          return (
            <ChakraLink key={item.path} as={Link} to={item.path} onClick={handleNav} display="flex" alignItems="center" gap={3} px={4} py={3} borderRadius="8px" bg={isActive ? '#F0EDE8' : 'transparent'} color={isActive ? '#2D2D2D' : '#6B6560'} fontWeight={isActive ? 600 : 400} fontSize="md" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
              <Icon size={20} />
              {item.label}
            </ChakraLink>
          );
        })}
      </VStack>

      <Box px={3} py={4} borderTop="1px solid" borderColor="#E8E2D8">
        {teamMember && (
          <Flex align="center" gap={3} px={4} mb={3}>
            <Flex w="32px" h="32px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" flexShrink={0}>
              {teamMember.avatar_url ? (
                <Image src={teamMember.avatar_url} alt={teamMember.first_name} objectFit="cover" w="100%" h="100%" />
              ) : (
                <Text fontSize="xs" fontWeight={600} color="#9A9590">{teamMember.first_name[0]}{teamMember.last_name[0]}</Text>
              )}
            </Flex>
            <Box>
              <Text fontSize="sm" fontWeight={500} color="#2D2D2D">{teamMember.first_name} {teamMember.last_name}</Text>
              <Text fontSize="xs" color="#9A9590">@{teamMember.username}</Text>
            </Box>
          </Flex>
        )}
        <ChakraLink onClick={function () { signOut(); if (onClose) onClose(); }} display="flex" alignItems="center" gap={3} px={4} py={3} borderRadius="8px" color="#6B6560" fontSize="md" cursor="pointer" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
          <HiOutlineLogout size={20} />
          Sign out
        </ChakraLink>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
