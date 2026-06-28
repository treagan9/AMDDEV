// src/admin/components/AdminLayout.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  VStack,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineChatAlt2, HiOutlineArrowLeft } from 'react-icons/hi';
import AdminSidebar from './AdminSidebar';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';

function PulseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function MessagesPanel({ onClose }) {
  var { teamMember } = useAuth();
  var [team, setTeam] = useState([]);
  var [selectedUser, setSelectedUser] = useState(null);
  var [messages, setMessages] = useState([]);
  var [newMessage, setNewMessage] = useState('');
  var [unreadCounts, setUnreadCounts] = useState({});
  var messagesEndRef = useRef(null);

  useEffect(function () {
    fetchTeam();
    fetchUnread();
    var interval = setInterval(function () {
      if (selectedUser) fetchConversation(selectedUser.id);
      fetchUnread();
    }, 5000);
    return function () { clearInterval(interval); };
  }, [selectedUser]);

  useEffect(function () {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function fetchTeam() {
    var result = await supabase.from('team_members').select('*').neq('id', teamMember ? teamMember.id : '').order('first_name');
    setTeam(result.data || []);
  }

  async function fetchUnread() {
    if (!teamMember) return;
    var result = await supabase.from('direct_messages').select('sender_id').eq('recipient_id', teamMember.id).is('read_at', null);
    var counts = {};
    (result.data || []).forEach(function (m) {
      counts[m.sender_id] = (counts[m.sender_id] || 0) + 1;
    });
    setUnreadCounts(counts);
  }

  async function fetchConversation(userId) {
    if (!teamMember) return;
    var result = await supabase.from('direct_messages').select('*').or('and(sender_id.eq.' + teamMember.id + ',recipient_id.eq.' + userId + '),and(sender_id.eq.' + userId + ',recipient_id.eq.' + teamMember.id + ')').order('created_at', { ascending: true });
    setMessages(result.data || []);
    await supabase.from('direct_messages').update({ read_at: new Date().toISOString() }).eq('sender_id', userId).eq('recipient_id', teamMember.id).is('read_at', null);
    fetchUnread();
  }

  function selectUser(user) { setSelectedUser(user); fetchConversation(user.id); }

  async function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !teamMember) return;
    await supabase.from('direct_messages').insert({ sender_id: teamMember.id, recipient_id: selectedUser.id, body: newMessage.trim() });
    setNewMessage('');
    fetchConversation(selectedUser.id);
  }

  function isOnline(member) {
    if (!member.last_seen_at) return false;
    return (Date.now() - new Date(member.last_seen_at).getTime()) < 300000;
  }

  return (
    <Box position="fixed" top={0} right={0} bottom={0} w={{ base: '100%', md: '380px' }} bg="white" borderLeft="1px solid" borderColor="#E8E2D8" zIndex={100} display="flex" flexDirection="column">
      {!selectedUser ? (
        <>
          <Flex align="center" justify="space-between" px={5} py={4} borderBottom="1px solid" borderColor="#E8E2D8">
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">Messages</Text>
            <Box cursor="pointer" onClick={onClose} color="#6B6560" _hover={{ color: '#2D2D2D' }}><HiOutlineX size={20} /></Box>
          </Flex>
          <VStack spacing={0} align="stretch" flex={1} overflowY="auto">
            {team.map(function (member) {
              var online = isOnline(member);
              var unread = unreadCounts[member.id] || 0;
              return (
                <Flex key={member.id} align="center" gap={3} px={5} py={4} cursor="pointer" _hover={{ bg: '#FAFAF7' }} transition="background 0.15s ease" onClick={function () { selectUser(member); }} borderBottom="1px solid" borderColor="#F0EDE8">
                  <Box position="relative" flexShrink={0}>
                    <Flex w="40px" h="40px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center">
                      {member.avatar_url ? <Image src={member.avatar_url} alt={member.first_name} objectFit="cover" w="100%" h="100%" /> : <Text fontSize="sm" fontWeight={600} color="#9A9590">{member.first_name[0]}{member.last_name[0]}</Text>}
                    </Flex>
                    {online && <Box position="absolute" bottom="1px" right="1px" w="10px" h="10px" borderRadius="full" bg="#22C55E" border="2px solid white" />}
                  </Box>
                  <Box flex={1} minW="0">
                    <Text fontSize="md" fontWeight={unread > 0 ? 700 : 500} color="#2D2D2D">{member.first_name} {member.last_name}</Text>
                    <Text fontSize="xs" color="#9A9590">@{member.username}{member.title ? ' \u00B7 ' + member.title : ''}</Text>
                  </Box>
                  {unread > 0 && <Flex w="22px" h="22px" borderRadius="full" bg="#C4A265" align="center" justify="center" flexShrink={0}><Text fontSize="xs" fontWeight={700} color="white">{unread}</Text></Flex>}
                </Flex>
              );
            })}
          </VStack>
        </>
      ) : (
        <>
          <Flex align="center" gap={3} px={5} py={4} borderBottom="1px solid" borderColor="#E8E2D8">
            <Box cursor="pointer" onClick={function () { setSelectedUser(null); }} color="#6B6560" _hover={{ color: '#2D2D2D' }}><HiOutlineArrowLeft size={18} /></Box>
            <Box position="relative" flexShrink={0}>
              <Flex w="32px" h="32px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center">
                {selectedUser.avatar_url ? <Image src={selectedUser.avatar_url} alt={selectedUser.first_name} objectFit="cover" w="100%" h="100%" /> : <Text fontSize="xs" fontWeight={600} color="#9A9590">{selectedUser.first_name[0]}{selectedUser.last_name[0]}</Text>}
              </Flex>
              {isOnline(selectedUser) && <Box position="absolute" bottom="0" right="0" w="8px" h="8px" borderRadius="full" bg="#22C55E" border="2px solid white" />}
            </Box>
            <Box flex={1} minW="0">
              <Text fontSize="md" fontWeight={600} color="#2D2D2D">{selectedUser.first_name} {selectedUser.last_name}</Text>
              <Text fontSize="xs" color="#9A9590">{selectedUser.email}</Text>
            </Box>
            <Box cursor="pointer" onClick={onClose} color="#6B6560" _hover={{ color: '#2D2D2D' }}><HiOutlineX size={18} /></Box>
          </Flex>
          <Box flex={1} overflowY="auto" px={5} py={4}>
            {messages.length === 0 ? (
              <Flex h="100%" align="center" justify="center"><Text fontSize="sm" color="#9A9590" textAlign="center">No messages yet. Say hello to {selectedUser.first_name}.</Text></Flex>
            ) : (
              <VStack spacing={3} align="stretch">
                {messages.map(function (msg) {
                  var isMine = teamMember && msg.sender_id === teamMember.id;
                  return (
                    <Flex key={msg.id} justify={isMine ? 'flex-end' : 'flex-start'}>
                      <Box maxW="80%" bg={isMine ? '#1B3A34' : '#F0EDE8'} color={isMine ? 'white' : '#2D2D2D'} px={4} py={3} borderRadius={isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px'}>
                        <Text fontSize="md" lineHeight={1.5}>{msg.body}</Text>
                        <Text fontSize="xs" color={isMine ? 'whiteAlpha.600' : '#9A9590'} mt={1}>{new Date(msg.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Text>
                      </Box>
                    </Flex>
                  );
                })}
                <Box ref={messagesEndRef} />
              </VStack>
            )}
          </Box>
          <Box px={4} py={3} borderTop="1px solid" borderColor="#E8E2D8">
            <form onSubmit={sendMessage}>
              <Flex gap={2}>
                <Input value={newMessage} onChange={function (e) { setNewMessage(e.target.value); }} placeholder={'Message ' + selectedUser.first_name + '...'} bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="full" h="44px" px={5} fontSize="md" _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#9B9488' }} />
                <Flex as="button" type="submit" w="44px" h="44px" borderRadius="full" bg={newMessage.trim() ? '#1B3A34' : '#E8E2D8'} align="center" justify="center" flexShrink={0} cursor={newMessage.trim() ? 'pointer' : 'default'} transition="background 0.2s ease" _hover={newMessage.trim() ? { bg: '#234840' } : {}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={newMessage.trim() ? 'white' : '#9A9590'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </Flex>
              </Flex>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
}

var adminGlobalStyles = {
  '.admin-root select': {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    bg: '#FAFAF7',
    border: '1px solid #D5D0C8',
    borderRadius: '8px',
    h: '48px',
    fontSize: '16px',
    color: '#2D2D2D',
    pr: '40px',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239A9590\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    backgroundSize: '16px'
  }
};

function AdminLayout() {
  var [mobileOpen, setMobileOpen] = useState(false);
  var [messagesOpen, setMessagesOpen] = useState(false);
  var { teamMember } = useAuth();
  var [unreadTotal, setUnreadTotal] = useState(0);

  useEffect(function () {
    if (!teamMember) return;
    fetchUnreadTotal();
    var interval = setInterval(fetchUnreadTotal, 10000);
    return function () { clearInterval(interval); };
  }, [teamMember]);

  async function fetchUnreadTotal() {
    if (!teamMember) return;
    var result = await supabase.from('direct_messages').select('id', { count: 'exact', head: true }).eq('recipient_id', teamMember.id).is('read_at', null);
    setUnreadTotal(result.count || 0);
  }

  return (
    <Box className="admin-root" display="flex" minH="100vh" bg="#FAFAF7" sx={{
      '& select': {
        appearance: 'none !important',
        WebkitAppearance: 'none !important',
        paddingRight: '40px !important',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239A9590\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E") !important',
        backgroundRepeat: 'no-repeat !important',
        backgroundPosition: 'right 14px center !important',
        backgroundSize: '16px !important'
      },
      '& .chakra-select__icon-wrapper': {
        display: 'none !important'
      }
    }}>
      <Box display={{ base: 'none', lg: 'block' }}>
        <AdminSidebar onClose={function () {}} />
      </Box>

      {mobileOpen && <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(0,0,0,0.3)" zIndex={98} onClick={function () { setMobileOpen(false); }} />}
      <Box display={{ base: 'block', lg: 'none' }} position="fixed" top={0} left={0} bottom={0} w="280px" transform={mobileOpen ? 'translateX(0)' : 'translateX(-100%)'} transition="transform 0.3s ease" zIndex={99} bg="white">
        <AdminSidebar onClose={function () { setMobileOpen(false); }} />
      </Box>

      <Box flex={1} ml={{ base: 0, lg: '260px' }} minH="100vh" position="relative">
        <Flex display={{ base: 'flex', lg: 'none' }} align="center" justify="space-between" px={5} py={4} bg="white" borderBottom="1px solid" borderColor="#E8E2D8" position="sticky" top={0} zIndex={10}>
          <Image src="/logo-dark.png" alt="AnswersMD" h="24px" objectFit="contain" />
          <Flex align="center" gap={4}>
            <Box position="relative" cursor="pointer" onClick={function () { setMessagesOpen(!messagesOpen); }} color="#6B6560" _hover={{ color: '#2D2D2D' }}>
              <HiOutlineChatAlt2 size={22} />
              {unreadTotal > 0 && <Flex position="absolute" top="-4px" right="-6px" w="16px" h="16px" borderRadius="full" bg="#C4A265" align="center" justify="center"><Text fontSize="9px" fontWeight={700} color="white">{unreadTotal}</Text></Flex>}
            </Box>
            <Box cursor="pointer" onClick={function () { setMobileOpen(!mobileOpen); }} color="#2D2D2D">{mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}</Box>
          </Flex>
        </Flex>

        <Flex display={{ base: 'none', lg: 'flex' }} align="center" justify="flex-end" px={10} py={3} position="sticky" top={0} zIndex={10}>
          <Box position="relative" cursor="pointer" onClick={function () { setMessagesOpen(!messagesOpen); }} color="#9A9590" _hover={{ color: '#2D2D2D' }} transition="color 0.2s ease" p={2}>
            <HiOutlineChatAlt2 size={22} />
            {unreadTotal > 0 && <Flex position="absolute" top="0" right="0" w="18px" h="18px" borderRadius="full" bg="#C4A265" align="center" justify="center"><Text fontSize="10px" fontWeight={700} color="white">{unreadTotal}</Text></Flex>}
          </Box>
        </Flex>

        <Box px={{ base: 5, md: 10 }} pb={{ base: 5, md: 10 }} maxW="1200px">
          <Outlet />
        </Box>
        <Box px={{ base: 5, md: 10 }} py={6} borderTop="1px solid" borderColor="#E8E2D8" mt="auto">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={3} maxW="1200px">
            <Text fontSize="xs" color="#9A9590">AnswersMD</Text>
            <Text fontSize="xs" color="#9A9590">Need help? <ChakraLink href="mailto:admin@answersmd.com" color="#C4A265" _hover={{ color: '#A88B50' }}>admin@answersmd.com</ChakraLink></Text>
          </Flex>
        </Box>
        <Box position="fixed" bottom={5} right={5} color="#D5D0C8" opacity={0.6} _hover={{ opacity: 1, color: '#C4A265' }} transition="all 0.3s ease" cursor="default" zIndex={50}><PulseIcon /></Box>
      </Box>

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
