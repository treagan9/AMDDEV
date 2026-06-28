// src/admin/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Badge,
  Image,
  Button
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../lib/supabase.jsx';
import useAuth from '../lib/useAuth.jsx';
import { HiOutlineMail, HiOutlineClipboardList, HiOutlineUsers, HiOutlineUserGroup } from 'react-icons/hi';

function StatCard({ label, value, subtitle, icon, path }) {
  var navigate = useNavigate();
  var Icon = icon;
  return (
    <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={6} cursor={path ? 'pointer' : 'default'} onClick={path ? function () { navigate(path); } : undefined} _hover={path ? { borderColor: '#C4A265', shadow: '0 2px 8px rgba(0,0,0,0.04)' } : {}} transition="all 0.2s ease">
      <Flex justify="space-between" align="flex-start" mb={3}>
        <Text fontSize="sm" fontWeight={600} color="#6B6560" letterSpacing="0.5px" textTransform="uppercase">{label}</Text>
        {Icon && <Box color="#D5D0C8"><Icon size={20} /></Box>}
      </Flex>
      <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D" lineHeight={1}>{value}</Text>
      {subtitle && <Text fontSize="sm" color="#9A9590" mt={2}>{subtitle}</Text>}
    </Box>
  );
}

function Dashboard() {
  var [stats, setStats] = useState({ leads: 0, newLeads: 0, members: 0, submissions: 0 });
  var [recentLeads, setRecentLeads] = useState([]);
  var [unreadCount, setUnreadCount] = useState(0);
  var { teamMember } = useAuth();
  var navigate = useNavigate();

  useEffect(function () {
    fetchStats();
    fetchRecentLeads();
    fetchUnread();
  }, [teamMember]);

  async function fetchStats() {
    var leadsResult = await supabase.from('leads').select('id', { count: 'exact', head: true });
    var newLeadsResult = await supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new');
    var membersResult = await supabase.from('members').select('id', { count: 'exact', head: true });
    var subsResult = await supabase.from('form_submissions').select('id', { count: 'exact', head: true });
    setStats({ leads: leadsResult.count || 0, newLeads: newLeadsResult.count || 0, members: membersResult.count || 0, submissions: subsResult.count || 0 });
  }

  async function fetchRecentLeads() {
    var result = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(8);
    setRecentLeads(result.data || []);
  }

  async function fetchUnread() {
    if (!teamMember) return;
    var result = await supabase.from('direct_messages').select('id', { count: 'exact', head: true }).eq('recipient_id', teamMember.id).is('read_at', null);
    setUnreadCount(result.count || 0);
  }

  var statusColors = { new: 'green', contacted: 'blue', consultation_scheduled: 'purple', enrolled: 'orange', closed: 'gray' };
  var greeting = 'Good morning';
  var hour = new Date().getHours();
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  if (hour >= 17) greeting = 'Good evening';

  return (
    <Box>
      {teamMember && (
        <Flex align="center" gap={4} mb={8}>
          <Flex w="52px" h="52px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" border="2px solid" borderColor="#E8E2D8" flexShrink={0}>
            {teamMember.avatar_url ? (
              <Image src={teamMember.avatar_url} alt={teamMember.first_name} objectFit="cover" w="100%" h="100%" />
            ) : (
              <Text fontSize="lg" fontWeight={700} color="#9A9590">{teamMember.first_name[0]}{teamMember.last_name[0]}</Text>
            )}
          </Flex>
          <Box>
            <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="#2D2D2D">{greeting}, {teamMember.first_name}</Text>
            <Text fontSize="sm" color="#9A9590">{teamMember.title || teamMember.role}</Text>
          </Box>
        </Flex>
      )}

      {(unreadCount > 0 || stats.newLeads > 0) && (
        <Flex gap={3} mb={8} flexWrap="wrap">
          {unreadCount > 0 && (
            <Flex align="center" gap={3} bg="white" borderRadius="12px" border="1px solid" borderColor="#E8E2D8" px={5} py={3}>
              <Flex w="8px" h="8px" borderRadius="full" bg="#C4A265" flexShrink={0} />
              <Text fontSize="sm" color="#2D2D2D">{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</Text>
            </Flex>
          )}
          {stats.newLeads > 0 && (
            <Flex align="center" gap={3} bg="white" borderRadius="12px" border="1px solid" borderColor="#E8E2D8" px={5} py={3} cursor="pointer" onClick={function () { navigate('/answersmd-admin/leads/'); }} _hover={{ borderColor: '#C4A265' }} transition="border-color 0.2s ease">
              <Flex w="8px" h="8px" borderRadius="full" bg="#22C55E" flexShrink={0} />
              <Text fontSize="sm" color="#2D2D2D">{stats.newLeads} new lead{stats.newLeads > 1 ? 's' : ''} awaiting contact</Text>
            </Flex>
          )}
        </Flex>
      )}

      <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={4} mb={8}>
        <StatCard label="Leads" value={stats.leads} icon={HiOutlineClipboardList} path="/answersmd-admin/leads/" />
        <StatCard label="New" value={stats.newLeads} subtitle="Awaiting contact" icon={HiOutlineClipboardList} path="/answersmd-admin/leads/" />
        <StatCard label="Patients" value={stats.members} icon={HiOutlineUsers} path="/answersmd-admin/members/" />
        <StatCard label="Submissions" value={stats.submissions} icon={HiOutlineUserGroup} />
      </SimpleGrid>

      <Flex gap={4} mb={8} flexWrap="wrap">
        <Button as={Link} to="/answersmd-admin/intake/" size="sm" bg="#1B3A34" color="white" borderRadius="8px" _hover={{ bg: '#234840' }} leftIcon={<HiOutlineUserGroup size={16} />}>New patient</Button>
        <Button as={Link} to="/answersmd-admin/email/" size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" _hover={{ bg: '#F0EDE8' }} leftIcon={<HiOutlineMail size={16} />}>Send email</Button>
      </Flex>

      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Flex px={6} py={5} borderBottom="1px solid" borderColor="#E8E2D8" align="center" justify="space-between">
          <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">Recent leads</Text>
          <Text as={Link} to="/answersmd-admin/leads/" fontSize="sm" color="#C4A265" fontWeight={500} _hover={{ color: '#A88B50' }}>View all</Text>
        </Flex>
        <Box overflowX="auto">
          {recentLeads.length === 0 ? (
            <Box px={6} py={12} textAlign="center">
              <Text fontSize="md" color="#9A9590">No leads yet. Form submissions will appear here.</Text>
            </Box>
          ) : (
            <Box as="table" w="100%" fontSize="md">
              <Box as="thead">
                <Box as="tr" borderBottom="1px solid" borderColor="#E8E2D8">
                  <Box as="th" textAlign="left" px={6} py={3} fontSize="xs" fontWeight={600} color="#9A9590" textTransform="uppercase" letterSpacing="0.5px">Name</Box>
                  <Box as="th" textAlign="left" px={4} py={3} fontSize="xs" fontWeight={600} color="#9A9590" textTransform="uppercase" letterSpacing="0.5px" display={{ base: 'none', md: 'table-cell' }}>Location</Box>
                  <Box as="th" textAlign="left" px={4} py={3} fontSize="xs" fontWeight={600} color="#9A9590" textTransform="uppercase" letterSpacing="0.5px">Status</Box>
                  <Box as="th" textAlign="left" px={4} py={3} fontSize="xs" fontWeight={600} color="#9A9590" textTransform="uppercase" letterSpacing="0.5px" display={{ base: 'none', md: 'table-cell' }}>Date</Box>
                </Box>
              </Box>
              <Box as="tbody">
                {recentLeads.map(function (lead) {
                  return (
                    <Box as="tr" key={lead.id} borderBottom="1px solid" borderColor="#F0EDE8" _hover={{ bg: '#FAFAF7' }} cursor="pointer" onClick={function () { navigate('/answersmd-admin/leads/' + lead.id + '/'); }}>
                      <Box as="td" px={6} py={4} fontWeight={500} color="#2D2D2D">{lead.first_name} {lead.last_name}</Box>
                      <Box as="td" px={4} py={4} color="#6B6560" display={{ base: 'none', md: 'table-cell' }}>{lead.location || '\u2014'}</Box>
                      <Box as="td" px={4} py={4}><Badge colorScheme={statusColors[lead.status] || 'gray'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{lead.status}</Badge></Box>
                      <Box as="td" px={4} py={4} color="#9A9590" display={{ base: 'none', md: 'table-cell' }}>{new Date(lead.created_at).toLocaleDateString()}</Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
