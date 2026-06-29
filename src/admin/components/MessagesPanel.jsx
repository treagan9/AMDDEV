// src/admin/components/MessagesPanel.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Image
} from '@chakra-ui/react';
import { HiOutlineX, HiOutlineArrowLeft, HiOutlinePlus, HiOutlinePhotograph } from 'react-icons/hi';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';

function MessagesPanel({ onClose }) {
  var { teamMember } = useAuth();
  var [team, setTeam] = useState([]);
  var [selectedUser, setSelectedUser] = useState(null);
  var [messages, setMessages] = useState([]);
  var [newMessage, setNewMessage] = useState('');
  var [unreadCounts, setUnreadCounts] = useState({});
  var [uploading, setUploading] = useState(false);
  var messagesEndRef = useRef(null);
  var fileRef = useRef(null);

  useEffect(function () { fetchTeam(); fetchUnread(); var i = setInterval(function () { if (selectedUser) fetchConversation(selectedUser.id); fetchUnread(); }, 4000); return function () { clearInterval(i); }; }, [selectedUser]);
  useEffect(function () { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function fetchTeam() { var r = await supabase.from('team_members').select('*').neq('id', teamMember ? teamMember.id : '').order('first_name'); setTeam(r.data || []); }

  async function fetchUnread() {
    if (!teamMember) return;
    var r = await supabase.from('direct_messages').select('sender_id').eq('recipient_id', teamMember.id).is('read_at', null);
    var c = {};
    (r.data || []).forEach(function (m) { c[m.sender_id] = (c[m.sender_id] || 0) + 1; });
    setUnreadCounts(c);
  }

  async function fetchConversation(userId) {
    if (!teamMember) return;
    var r = await supabase.from('direct_messages').select('*').or('and(sender_id.eq.' + teamMember.id + ',recipient_id.eq.' + userId + '),and(sender_id.eq.' + userId + ',recipient_id.eq.' + teamMember.id + ')').order('created_at', { ascending: true });
    setMessages(r.data || []);
    await supabase.from('direct_messages').update({ read_at: new Date().toISOString() }).eq('sender_id', userId).eq('recipient_id', teamMember.id).is('read_at', null);
    fetchUnread();
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !teamMember) return;
    await supabase.from('direct_messages').insert({ sender_id: teamMember.id, recipient_id: selectedUser.id, body: newMessage.trim() });
    setNewMessage('');
    fetchConversation(selectedUser.id);
  }

  async function handleFileUpload(e) {
    var file = e.target.files[0];
    if (!file || !selectedUser || !teamMember) return;
    setUploading(true);
    try {
      var path = 'messages/' + teamMember.id + '/' + Date.now() + '-' + file.name;
      var uploadResult = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
      if (uploadResult.error) throw uploadResult.error;
      var urlResult = supabase.storage.from('avatars').getPublicUrl(path);
      var publicUrl = urlResult.data.publicUrl;
      var isImage = file.type.startsWith('image/');

      await supabase.from('direct_messages').insert({
        sender_id: teamMember.id,
        recipient_id: selectedUser.id,
        body: isImage ? '' : file.name,
        attachment_url: publicUrl,
        attachment_type: isImage ? 'image' : 'file',
        attachment_name: file.name
      });
      fetchConversation(selectedUser.id);
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  function isOnline(m) { if (!m.last_seen_at) return false; return (Date.now() - new Date(m.last_seen_at).getTime()) < 300000; }

  function formatTime(dateStr) {
    var d = new Date(dateStr);
    var now = new Date();
    var isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    var yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function getLastMessage(memberId) {
    return '';
  }

  return (
    <Box position="fixed" top={0} right={0} bottom={0} w={{ base: '100%', md: '400px' }} bg="white" borderLeft="1px solid" borderColor="#E8E2D8" zIndex={100} display="flex" flexDirection="column">
      {!selectedUser ? (
        <>
          <Flex align="center" justify="space-between" px={5} py={4} borderBottom="1px solid" borderColor="#E8E2D8">
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">Messages</Text>
            <Flex w="32px" h="32px" borderRadius="8px" align="center" justify="center" cursor="pointer" onClick={onClose} color="#6B6560" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
              <HiOutlineX size={18} />
            </Flex>
          </Flex>
          <VStack spacing={0} align="stretch" flex={1} overflowY="auto">
            {team.map(function (member) {
              var online = isOnline(member);
              var unread = unreadCounts[member.id] || 0;
              return (
                <Flex key={member.id} align="center" gap={3} px={5} py={4} cursor="pointer" _hover={{ bg: '#FAFAF7' }} transition="background 0.15s ease" onClick={function () { setSelectedUser(member); fetchConversation(member.id); }} borderBottom="1px solid" borderColor="#F0EDE8">
                  <Box position="relative" flexShrink={0}>
                    <Flex w="44px" h="44px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center">
                      {member.avatar_url ? <Image src={member.avatar_url} alt={member.first_name} objectFit="cover" w="100%" h="100%" /> : <Text fontSize="sm" fontWeight={600} color="#9A9590">{member.first_name[0]}{member.last_name[0]}</Text>}
                    </Flex>
                    {online && <Box position="absolute" bottom="1px" right="1px" w="11px" h="11px" borderRadius="full" bg="#22C55E" border="2px solid white" />}
                  </Box>
                  <Box flex={1} minW="0">
                    <Flex justify="space-between" align="baseline">
                      <Text fontSize="md" fontWeight={unread > 0 ? 700 : 500} color="#2D2D2D">{member.first_name} {member.last_name}</Text>
                    </Flex>
                    <Text fontSize="xs" color="#9A9590" noOfLines={1}>@{member.username}{member.title ? ' \u00B7 ' + member.title : ''}</Text>
                  </Box>
                  {unread > 0 && <Flex w="22px" h="22px" borderRadius="full" bg="#C4A265" align="center" justify="center" flexShrink={0}><Text fontSize="xs" fontWeight={700} color="white">{unread}</Text></Flex>}
                </Flex>
              );
            })}
          </VStack>
        </>
      ) : (
        <>
          <Flex align="center" gap={3} px={5} py={3} borderBottom="1px solid" borderColor="#E8E2D8">
            <Flex w="32px" h="32px" borderRadius="8px" align="center" justify="center" cursor="pointer" onClick={function () { setSelectedUser(null); }} color="#6B6560" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
              <HiOutlineArrowLeft size={18} />
            </Flex>
            <Box position="relative" flexShrink={0}>
              <Flex w="36px" h="36px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center">
                {selectedUser.avatar_url ? <Image src={selectedUser.avatar_url} alt={selectedUser.first_name} objectFit="cover" w="100%" h="100%" /> : <Text fontSize="xs" fontWeight={600} color="#9A9590">{selectedUser.first_name[0]}{selectedUser.last_name[0]}</Text>}
              </Flex>
              {isOnline(selectedUser) && <Box position="absolute" bottom="0" right="0" w="9px" h="9px" borderRadius="full" bg="#22C55E" border="2px solid white" />}
            </Box>
            <Box flex={1} minW="0">
              <Text fontSize="md" fontWeight={600} color="#2D2D2D">{selectedUser.first_name} {selectedUser.last_name}</Text>
              <Text fontSize="xs" color={isOnline(selectedUser) ? '#22C55E' : '#9A9590'}>{isOnline(selectedUser) ? 'Online' : selectedUser.email}</Text>
            </Box>
            <Flex w="32px" h="32px" borderRadius="8px" align="center" justify="center" cursor="pointer" onClick={onClose} color="#6B6560" _hover={{ bg: '#F0EDE8', color: '#2D2D2D' }} transition="all 0.15s ease">
              <HiOutlineX size={18} />
            </Flex>
          </Flex>

          <Box flex={1} overflowY="auto" px={4} py={4} bg="#FAFAF7">
            {messages.length === 0 ? (
              <Flex h="100%" align="center" justify="center" direction="column" gap={2}>
                <Flex w="48px" h="48px" borderRadius="full" bg="#E8E2D8" align="center" justify="center" mb={2}>
                  {selectedUser.avatar_url ? <Image src={selectedUser.avatar_url} alt={selectedUser.first_name} objectFit="cover" w="100%" h="100%" borderRadius="full" /> : <Text fontSize="md" fontWeight={600} color="#9A9590">{selectedUser.first_name[0]}{selectedUser.last_name[0]}</Text>}
                </Flex>
                <Text fontSize="sm" color="#9A9590" textAlign="center">Start a conversation with {selectedUser.first_name}</Text>
              </Flex>
            ) : (
              <VStack spacing={2} align="stretch">
                {messages.map(function (msg, i) {
                  var isMine = teamMember && msg.sender_id === teamMember.id;
                  var showTime = i === 0 || (new Date(msg.created_at).getTime() - new Date(messages[i - 1].created_at).getTime()) > 300000;

                  return (
                    <Box key={msg.id}>
                      {showTime && <Text fontSize="xs" color="#B5AD9E" textAlign="center" py={2}>{formatTime(msg.created_at)}</Text>}
                      <Flex justify={isMine ? 'flex-end' : 'flex-start'}>
                        <Box maxW="78%">
                          {msg.attachment_url && msg.attachment_type === 'image' && (
                            <Box borderRadius={isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px'} overflow="hidden" mb={msg.body ? 1 : 0}>
                              <Image src={msg.attachment_url} alt="Shared image" maxH="240px" objectFit="cover" w="100%" cursor="pointer" onClick={function () { window.open(msg.attachment_url, '_blank'); }} />
                            </Box>
                          )}
                          {msg.attachment_url && msg.attachment_type === 'file' && (
                            <Flex bg={isMine ? '#1B3A34' : 'white'} borderRadius={isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px'} px={4} py={3} align="center" gap={3} mb={msg.body ? 1 : 0} cursor="pointer" onClick={function () { window.open(msg.attachment_url, '_blank'); }} border={isMine ? 'none' : '1px solid'} borderColor="#E8E2D8">
                              <HiOutlinePhotograph size={20} color={isMine ? 'white' : '#6B6560'} />
                              <Text fontSize="sm" fontWeight={500} color={isMine ? 'white' : '#2D2D2D'} noOfLines={1}>{msg.attachment_name || 'File'}</Text>
                            </Flex>
                          )}
                          {msg.body && (
                            <Box bg={isMine ? '#1B3A34' : 'white'} color={isMine ? 'white' : '#2D2D2D'} px={4} py={2.5} borderRadius={isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px'} border={isMine ? 'none' : '1px solid'} borderColor="#E8E2D8">
                              <Text fontSize="md" lineHeight={1.5}>{msg.body}</Text>
                            </Box>
                          )}
                        </Box>
                      </Flex>
                    </Box>
                  );
                })}
                <Box ref={messagesEndRef} />
              </VStack>
            )}
          </Box>

          <Box px={3} py={3} bg="white" borderTop="1px solid" borderColor="#E8E2D8" mb={{ base: '72px', lg: 0 }}>
            <form onSubmit={sendMessage}>
              <Flex gap={2} align="center">
                <Flex w="40px" h="40px" borderRadius="full" align="center" justify="center" cursor="pointer" onClick={function () { fileRef.current.click(); }} color={uploading ? '#C4A265' : '#9A9590'} _hover={{ bg: '#F0EDE8', color: '#6B6560' }} transition="all 0.15s ease" flexShrink={0}>
                  <HiOutlinePlus size={20} />
                </Flex>
                <Input value={newMessage} onChange={function (e) { setNewMessage(e.target.value); }} placeholder={'Message ' + selectedUser.first_name + '...'} bg="#FAFAF7" border="1px solid" borderColor="#E8E2D8" borderRadius="full" h="42px" px={5} fontSize="md" _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#B5AD9E' }} />
                <Flex as="button" type="submit" w="40px" h="40px" borderRadius="full" bg={newMessage.trim() ? '#1B3A34' : 'transparent'} align="center" justify="center" flexShrink={0} cursor={newMessage.trim() ? 'pointer' : 'default'} transition="all 0.2s ease" _hover={newMessage.trim() ? { bg: '#234840' } : {}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={newMessage.trim() ? 'white' : '#B5AD9E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </Flex>
              </Flex>
            </form>
            <input ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileUpload} style={{ display: 'none' }} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default MessagesPanel;
