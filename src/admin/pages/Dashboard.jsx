// src/admin/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Badge,
  Image,
  Button
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../lib/supabase.jsx';
import useAuth from '../lib/useAuth.jsx';
import { HiOutlineMail, HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineUsers, HiOutlinePencilAlt, HiOutlinePhotograph, HiOutlineCloudUpload } from 'react-icons/hi';

function QuickLink({ label, path, icon, count }) {
  var navigate = useNavigate();
  var Icon = icon;
  return (
    <Flex align="center" gap={3} px={4} py={3} borderRadius="12px" cursor="pointer" onClick={function () { navigate(path); }} _hover={{ bg: '#F0EDE8' }} transition="background 0.15s ease">
      <Flex w="36px" h="36px" borderRadius="10px" bg="#F0EDE8" align="center" justify="center" flexShrink={0}>
        <Icon size={18} color="#6B6560" />
      </Flex>
      <Text fontSize="md" fontWeight={500} color="#2D2D2D" flex={1}>{label}</Text>
      {count > 0 && <Badge bg="#C4A265" color="white" borderRadius="full" px={2} py={0.5} fontSize="xs">{count}</Badge>}
    </Flex>
  );
}

function Dashboard() {
  var [recentLeads, setRecentLeads] = useState([]);
  var [newLeadCount, setNewLeadCount] = useState(0);
  var [unreadCount, setUnreadCount] = useState(0);
  var { teamMember } = useAuth();
  var navigate = useNavigate();

  useEffect(function () {
    fetchRecent();
    fetchCounts();
  }, [teamMember]);

  async function fetchRecent() {
    var result = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5);
    setRecentLeads(result.data || []);
  }

  async function fetchCounts() {
    var newLeads = await supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new');
    setNewLeadCount(newLeads.count || 0);
    if (!teamMember) return;
    var unread = await supabase.from('direct_messages').select('id', { count: 'exact', head: true }).eq('recipient_id', teamMember.id).is('read_at', null);
    setUnreadCount(unread.count || 0);
  }

  var greeting = 'Good morning';
  var hour = new Date().getHours();
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  if (hour >= 17) greeting = 'Good evening';

  var statusColors = { new: 'green', contacted: 'blue', consultation_scheduled: 'purple', enrolled: 'orange', closed: 'gray' };

  return (
    <Box>
      {teamMember && (
        <Flex align="center" gap={4} mb={10}>
          <Flex w="56px" h="56px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" border="2px solid" borderColor="#E8E2D8" flexShrink={0}>
            {teamMember.avatar_url ? (
              <Image src={teamMember.avatar_url} alt={teamMember.first_name} objectFit="cover" w="100%" h="100%" />
            ) : (
              <Text fontSize="lg" fontWeight={700} color="#9A9590">{teamMember.first_name[0]}{teamMember.last_name[0]}</Text>
            )}
          </Flex>
          <Box>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="#2D2D2D">{greeting}, {teamMember.first_name}</Text>
            <Text fontSize="sm" color="#9A9590">{teamMember.title || teamMember.role}</Text>
          </Box>
        </Flex>
      )}

      {(unreadCount > 0 || newLeadCount > 0) && (
        <Flex gap={3} mb={8} flexWrap="wrap">
          {unreadCount > 0 && (
            <Flex align="center" gap={3} bg="white" borderRadius="12px" border="1px solid" borderColor="#E8E2D8" px={4} py={2.5} cursor="pointer" _hover={{ borderColor: '#C4A265' }} transition="border-color 0.2s ease">
              <Flex w="6px" h="6px" borderRadius="full" bg="#C4A265" flexShrink={0} />
              <Text fontSize="sm" color="#2D2D2D">{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</Text>
            </Flex>
          )}
          {newLeadCount > 0 && (
            <Flex align="center" gap={3} bg="white" borderRadius="12px" border="1px solid" borderColor="#E8E2D8" px={4} py={2.5} cursor="pointer" onClick={function () { navigate('/answersmd-admin/leads/'); }} _hover={{ borderColor: '#C4A265' }} transition="border-color 0.2s ease">
              <Flex w="6px" h="6px" borderRadius="full" bg="#22C55E" flexShrink={0} />
              <Text fontSize="sm" color="#2D2D2D">{newLeadCount} new lead{newLeadCount > 1 ? 's' : ''}</Text>
            </Flex>
          )}
        </Flex>
      )}

      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        <Box flex={1} minW="0">
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
            <Flex px={5} py={4} borderBottom="1px solid" borderColor="#E8E2D8" align="center" justify="space-between">
              <Text fontSize="md" fontWeight={700} color="#2D2D2D">Recent leads</Text>
              <Text as={Link} to="/answersmd-admin/leads/" fontSize="sm" color="#C4A265" fontWeight={500} _hover={{ color: '#A88B50' }}>View all</Text>
            </Flex>
            {recentLeads.length === 0 ? (
              <Box px={5} py={10} textAlign="center">
                <Text fontSize="sm" color="#9A9590">No leads yet.</Text>
              </Box>
            ) : (
              <VStack spacing={0} align="stretch">
                {recentLeads.map(function (lead) {
                  return (
                    <Flex key={lead.id} align="center" justify="space-between" px={5} py={3.5} cursor="pointer" _hover={{ bg: '#FAFAF7' }} transition="background 0.15s ease" onClick={function () { navigate('/answersmd-admin/leads/' + lead.id + '/'); }} borderBottom="1px solid" borderColor="#F0EDE8">
                      <Box minW="0">
                        <Text fontSize="sm" fontWeight={500} color="#2D2D2D">{lead.first_name} {lead.last_name}</Text>
                        <Text fontSize="xs" color="#9A9590">{lead.email || lead.phone || '\u2014'}</Text>
                      </Box>
                      <Flex align="center" gap={3}>
                        <Text fontSize="xs" color="#B5AD9E" display={{ base: 'none', md: 'block' }}>{new Date(lead.created_at).toLocaleDateString()}</Text>
                        <Badge colorScheme={statusColors[lead.status] || 'gray'} borderRadius="full" px={2} py={0.5} fontSize="10px" textTransform="capitalize">{lead.status}</Badge>
                      </Flex>
                    </Flex>
                  );
                })}
              </VStack>
            )}
          </Box>
        </Box>

        <Box w={{ base: '100%', lg: '280px' }} flexShrink={0}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={4}>
            <Text fontSize="sm" fontWeight={600} color="#6B6560" px={4} mb={3} letterSpacing="0.5px" textTransform="uppercase">Quick access</Text>
            <VStack spacing={0} align="stretch">
              <QuickLink label="Leads" path="/answersmd-admin/leads/" icon={HiOutlineClipboardList} count={newLeadCount} />
              <QuickLink label="Patients" path="/answersmd-admin/members/" icon={HiOutlineUsers} />
              <QuickLink label="New patient" path="/answersmd-admin/intake/" icon={HiOutlineUserGroup} />
              <QuickLink label="Send email" path="/answersmd-admin/email/" icon={HiOutlineMail} />
              <QuickLink label="Content" path="/answersmd-admin/content/" icon={HiOutlinePencilAlt} />
              <QuickLink label="Design" path="/answersmd-admin/images/" icon={HiOutlinePhotograph} />
              <QuickLink label="Deploy" path="/answersmd-admin/deploy/" icon={HiOutlineCloudUpload} />
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;
