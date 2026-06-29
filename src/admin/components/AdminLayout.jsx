// src/admin/components/AdminLayout.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Tooltip,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import AdminSidebar from './AdminSidebar';
import MessagesPanel from './MessagesPanel';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';

function PulseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function HomeIcon({ active }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>; }
function LeadsIcon({ active }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="13" y2="15" /></svg>; }
function PatientsIcon({ active }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function EmailIcon({ active }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>; }
function MoreIcon({ active }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#2D2D2D' : '#9A9590'} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>; }

function MoreMenu({ onClose, onNavigate }) {
  var items = [
    { label: 'Intake', path: '/answersmd-admin/intake/' },
    { label: 'Content', path: '/answersmd-admin/content/' },
    { label: 'Design', path: '/answersmd-admin/images/' },
    { label: 'Deploy', path: '/answersmd-admin/deploy/' },
    { label: 'Settings', path: '/answersmd-admin/settings/' }
  ];
  return (
    <>
      <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(0,0,0,0.2)" zIndex={89} onClick={onClose} />
      <Box position="fixed" bottom="72px" right={4} bg="white" borderRadius="16px" border="1px solid" borderColor="#E8E2D8" shadow="0 8px 32px rgba(0,0,0,0.12)" zIndex={90} overflow="hidden" w="200px">
        {items.map(function (item, i) {
          return <Box key={item.path} px={5} py={3.5} cursor="pointer" _hover={{ bg: '#FAFAF7' }} transition="background 0.15s ease" onClick={function () { onNavigate(item.path); onClose(); }} borderBottom={i < items.length - 1 ? '1px solid' : 'none'} borderColor="#F0EDE8"><Text fontSize="md" fontWeight={500} color="#2D2D2D">{item.label}</Text></Box>;
        })}
      </Box>
    </>
  );
}

var MOBILE_NAV = [
  { path: '/answersmd-admin/dashboard/', icon: HomeIcon, match: 'dashboard' },
  { path: '/answersmd-admin/leads/', icon: LeadsIcon, match: 'leads' },
  { path: '/answersmd-admin/members/', icon: PatientsIcon, match: 'members' },
  { path: '/answersmd-admin/email/', icon: EmailIcon, match: 'email' },
  { path: 'more', icon: MoreIcon, match: 'more' }
];

function AdminLayout() {
  var [messagesOpen, setMessagesOpen] = useState(false);
  var [moreOpen, setMoreOpen] = useState(false);
  var { teamMember } = useAuth();
  var [unreadTotal, setUnreadTotal] = useState(0);
  var [onlineMembers, setOnlineMembers] = useState([]);
  var location = useLocation();
  var navigate = useNavigate();

  useEffect(function () {
    if (!teamMember) return;
    fetchUnreadTotal();
    fetchOnline();
    var interval = setInterval(function () { fetchUnreadTotal(); fetchOnline(); }, 15000);
    return function () { clearInterval(interval); };
  }, [teamMember]);

  async function fetchUnreadTotal() { if (!teamMember) return; var r = await supabase.from('direct_messages').select('id', { count: 'exact', head: true }).eq('recipient_id', teamMember.id).is('read_at', null); setUnreadTotal(r.count || 0); }
  async function fetchOnline() { var ago = new Date(Date.now() - 300000).toISOString(); var r = await supabase.from('team_members').select('*').gte('last_seen_at', ago).order('first_name'); setOnlineMembers(r.data || []); }

  function getActiveTab() {
    var p = location.pathname;
    if (p.includes('/dashboard')) return 'dashboard';
    if (p.includes('/leads')) return 'leads';
    if (p.includes('/members')) return 'members';
    if (p.includes('/email')) return 'email';
    return 'more';
  }

  var activeTab = getActiveTab();

  return (
    <Box className="admin-root" display="flex" minH="100vh" bg="#FAFAF7" sx={{
      '& select': { appearance: 'none !important', WebkitAppearance: 'none !important', paddingRight: '40px !important', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239A9590\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E") !important', backgroundRepeat: 'no-repeat !important', backgroundPosition: 'right 14px center !important', backgroundSize: '16px !important' },
      '& .chakra-select__icon-wrapper': { display: 'none !important' }
    }}>
      <Box display={{ base: 'none', lg: 'block' }}>
        <AdminSidebar onClose={function () {}} />
      </Box>

      <Flex flex={1} ml={{ base: 0, lg: '260px' }} direction="column" minH="100vh">
        <Flex display={{ base: 'flex', lg: 'none' }} align="center" justify="space-between" px={5} py={3} bg="white" position="sticky" top={0} zIndex={10}>
          <Image src="/logo-dark.webp" alt="AnswersMD" h="28px" objectFit="contain" />
          <Flex align="center" gap={3}>
            {onlineMembers.length > 0 && (
              <HStack spacing={-1}>
                {onlineMembers.slice(0, 4).map(function (m) {
                  var isSelf = teamMember && m.id === teamMember.id;
                  return (
                    <Tooltip key={m.id} label={m.first_name + ' ' + m.last_name + (isSelf ? ' (you)' : '')} bg="#2D2D2D" color="white" fontSize="xs" borderRadius="6px" px={3} py={1.5} hasArrow placement="bottom">
                      <Box position="relative">
                        <Flex w="26px" h="26px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" border="2px solid white">
                          {m.avatar_url ? <Image src={m.avatar_url} alt={m.first_name} objectFit="cover" w="100%" h="100%" /> : <Text fontSize="8px" fontWeight={600} color="#9A9590">{m.first_name[0]}{m.last_name[0]}</Text>}
                        </Flex>
                        <Box position="absolute" bottom="-1px" right="-1px" w="8px" h="8px" borderRadius="full" bg="#22C55E" border="1.5px solid white" />
                      </Box>
                    </Tooltip>
                  );
                })}
              </HStack>
            )}
            <Box position="relative" cursor="pointer" onClick={function () { setMessagesOpen(!messagesOpen); }} color="#6B6560" _hover={{ color: '#2D2D2D' }}>
              <HiOutlineChatAlt2 size={22} />
              {unreadTotal > 0 && <Flex position="absolute" top="-4px" right="-6px" w="16px" h="16px" borderRadius="full" bg="#C4A265" align="center" justify="center"><Text fontSize="9px" fontWeight={700} color="white">{unreadTotal}</Text></Flex>}
            </Box>
          </Flex>
        </Flex>

        <Flex display={{ base: 'none', lg: 'flex' }} align="center" justify="flex-end" gap={3} px={10} py={3} bg="transparent" position="sticky" top={0} zIndex={10}>
          {onlineMembers.length > 0 && (
            <HStack spacing={-2}>
              {onlineMembers.map(function (m) {
                var isSelf = teamMember && m.id === teamMember.id;
                return (
                  <Tooltip key={m.id} label={m.first_name + ' ' + m.last_name + (m.title ? ' \u00B7 ' + m.title : '') + (isSelf ? ' (you)' : '')} bg="#2D2D2D" color="white" fontSize="xs" borderRadius="6px" px={3} py={1.5} hasArrow placement="bottom">
                    <Box position="relative">
                      <Flex w="30px" h="30px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" border={isSelf ? '2px solid' : '2px solid'} borderColor={isSelf ? '#C4A265' : 'white'}>
                        {m.avatar_url ? <Image src={m.avatar_url} alt={m.first_name} objectFit="cover" w="100%" h="100%" /> : <Text fontSize="10px" fontWeight={600} color="#9A9590">{m.first_name[0]}{m.last_name[0]}</Text>}
                      </Flex>
                      <Box position="absolute" bottom="-1px" right="-1px" w="8px" h="8px" borderRadius="full" bg="#22C55E" border="2px solid #FAFAF7" />
                    </Box>
                  </Tooltip>
                );
              })}
            </HStack>
          )}
          <Box position="relative" cursor="pointer" onClick={function () { setMessagesOpen(!messagesOpen); }} color="#9A9590" _hover={{ color: '#2D2D2D' }} transition="color 0.2s ease" p={1}>
            <HiOutlineChatAlt2 size={20} />
            {unreadTotal > 0 && <Flex position="absolute" top="-2px" right="-4px" w="16px" h="16px" borderRadius="full" bg="#C4A265" align="center" justify="center"><Text fontSize="9px" fontWeight={700} color="white">{unreadTotal}</Text></Flex>}
          </Box>
        </Flex>

        <Box flex={1} px={{ base: 4, md: 10 }} py={{ base: 4, md: 8 }} pb={{ base: '88px', lg: 8 }} maxW="1200px">
          <Outlet />
        </Box>

        <Box display={{ base: 'none', lg: 'block' }} px={10} py={5}>
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={3} maxW="1200px">
            <Text fontSize="xs" color="#B5AD9E">AnswersMD</Text>
            <Text fontSize="xs" color="#B5AD9E">Need help? <ChakraLink href="mailto:admin@answersmd.com" color="#C4A265" _hover={{ color: '#A88B50' }}>admin@answersmd.com</ChakraLink></Text>
          </Flex>
        </Box>

        <Box display={{ base: 'block', lg: 'none' }} position="fixed" bottom={0} left={0} right={0} zIndex={80}>
          <Box bg="white" borderTop="1px solid" borderColor="#E8E2D8" px={2} pt={2} pb="env(safe-area-inset-bottom, 8px)">
            <Flex justify="space-around" align="center">
              {MOBILE_NAV.map(function (item) {
                var isActive = activeTab === item.match;
                var Icon = item.icon;
                return (
                  <Flex key={item.match} w="52px" h="44px" align="center" justify="center" borderRadius="12px" bg={isActive ? '#F0EDE8' : 'transparent'} cursor="pointer" transition="all 0.2s ease" onClick={function () {
                    if (item.path === 'more') { setMoreOpen(!moreOpen); }
                    else { navigate(item.path); setMoreOpen(false); }
                  }}>
                    <Icon active={isActive} />
                  </Flex>
                );
              })}
            </Flex>
          </Box>
          {moreOpen && <MoreMenu onClose={function () { setMoreOpen(false); }} onNavigate={navigate} />}
        </Box>

        <Box display={{ base: 'none', lg: 'block' }} position="fixed" bottom={5} right={5} color="#D5D0C8" opacity={0.5} _hover={{ opacity: 1, color: '#C4A265' }} transition="all 0.3s ease" cursor="default" zIndex={50}><PulseIcon /></Box>
      </Flex>

      {messagesOpen && (
        <>
          <Box display={{ base: 'none', md: 'block' }} position="fixed" top={0} left={0} right={0} bottom={0} zIndex={99} onClick={function () { setMessagesOpen(false); }} />
          <MessagesPanel onClose={function () { setMessagesOpen(false); fetchUnreadTotal(); }} />
        </>
      )}
    </Box>
  );
}

export default AdminLayout;
