// src/admin/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  HStack,
  Text,
  Badge,
  Image,
  Tooltip
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase.jsx';
import useAuth from '../lib/useAuth.jsx';

function StatCard({ label, value, subtitle }) {
  return (
    <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }}>
      <Text fontSize="sm" fontWeight={600} color="#6B6560" letterSpacing="1px" textTransform="uppercase" mb={3}>{label}</Text>
      <Text fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="#2D2D2D" lineHeight={1}>{value}</Text>
      {subtitle && <Text fontSize="md" color="#9A9590" mt={2}>{subtitle}</Text>}
    </Box>
  );
}

function OnlineMember({ member }) {
  return (
    <Tooltip label={member.first_name + ' ' + member.last_name + ' \u00B7 @' + member.username + ' \u00B7 ' + member.role} bg="#2D2D2D" color="white" fontSize="sm" borderRadius="8px" px={4} py={2} hasArrow placement="bottom">
      <Box position="relative" cursor="default">
        <Flex w="44px" h="44px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" border="2px solid" borderColor="#E8E2D8">
          {member.avatar_url ? (
            <Image src={member.avatar_url} alt={member.first_name} objectFit="cover" w="100%" h="100%" />
          ) : (
            <Text fontSize="sm" fontWeight={600} color="#9A9590">{member.first_name[0]}{member.last_name[0]}</Text>
          )}
        </Flex>
        <Box position="absolute" bottom="1px" right="1px" w="12px" h="12px" borderRadius="full" bg="#22C55E" border="2.5px solid white" />
      </Box>
    </Tooltip>
  );
}

function Dashboard() {
  var [stats, setStats] = useState({ leads: 0, newLeads: 0, members: 0, submissions: 0 });
  var [recentLeads, setRecentLeads] = useState([]);
  var [onlineMembers, setOnlineMembers] = useState([]);
  var { teamMember } = useAuth();
  var navigate = useNavigate();

  useEffect(function () {
    fetchStats();
    fetchRecentLeads();
    fetchOnline();
    var interval = setInterval(fetchOnline, 30000);
    return function () { clearInterval(interval); };
  }, []);

  async function fetchStats() {
    var leadsResult = await supabase.from('leads').select('id', { count: 'exact', head: true });
    var newLeadsResult = await supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new');
    var membersResult = await supabase.from('members').select('id', { count: 'exact', head: true });
    var subsResult = await supabase.from('form_submissions').select('id', { count: 'exact', head: true });
    setStats({
      leads: leadsResult.count || 0,
      newLeads: newLeadsResult.count || 0,
      members: membersResult.count || 0,
      submissions: subsResult.count || 0
    });
  }

  async function fetchRecentLeads() {
    var result = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(10);
    setRecentLeads(result.data || []);
  }

  async function fetchOnline() {
    var fiveMinAgo = new Date(Date.now() - 300000).toISOString();
    var result = await supabase.from('team_members').select('*').gte('last_seen_at', fiveMinAgo).order('first_name');
    setOnlineMembers(result.data || []);
  }

  var statusColors = { new: 'green', contacted: 'blue', consultation_scheduled: 'purple', enrolled: 'orange', closed: 'gray' };

  return (
    <Box>
      {onlineMembers.length > 0 && (
        <Flex align="center" gap={4} mb={8} flexWrap="wrap">
          <HStack spacing={-2}>
            {onlineMembers.map(function (member) {
              return <OnlineMember key={member.id} member={member} />;
            })}
          </HStack>
          <Text fontSize="sm" color="#9A9590">{onlineMembers.length} online</Text>
        </Flex>
      )}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={10}>
        <StatCard label="Total leads" value={stats.leads} />
        <StatCard label="New leads" value={stats.newLeads} subtitle="Awaiting contact" />
        <StatCard label="Active patients" value={stats.members} />
        <StatCard label="Submissions" value={stats.submissions} />
      </SimpleGrid>

      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Box px={{ base: 5, md: 8 }} py={5} borderBottom="1px solid" borderColor="#E8E2D8">
          <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D">Recent leads</Text>
        </Box>
        <Box overflowX="auto">
          {recentLeads.length === 0 ? (
            <Box px={8} py={12} textAlign="center">
              <Text fontSize="md" color="#9A9590">No leads yet. Form submissions will appear here.</Text>
            </Box>
          ) : (
            <Box as="table" w="100%" fontSize="md">
              <Box as="thead">
                <Box as="tr" borderBottom="1px solid" borderColor="#E8E2D8">
                  <Box as="th" textAlign="left" px={{ base: 5, md: 8 }} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px">Name</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px" display={{ base: 'none', md: 'table-cell' }}>Location</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px" display={{ base: 'none', lg: 'table-cell' }}>Interest</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px">Status</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px" display={{ base: 'none', md: 'table-cell' }}>Date</Box>
                </Box>
              </Box>
              <Box as="tbody">
                {recentLeads.map(function (lead) {
                  return (
                    <Box as="tr" key={lead.id} borderBottom="1px solid" borderColor="#F0EDE8" _hover={{ bg: '#FAFAF7' }} cursor="pointer" onClick={function () { navigate('/answersmd-admin/leads/' + lead.id + '/'); }}>
                      <Box as="td" px={{ base: 5, md: 8 }} py={4} fontWeight={500} color="#2D2D2D">{lead.first_name} {lead.last_name}</Box>
                      <Box as="td" px={4} py={4} color="#6B6560" display={{ base: 'none', md: 'table-cell' }}>{lead.location || '\u2014'}</Box>
                      <Box as="td" px={4} py={4} color="#6B6560" display={{ base: 'none', lg: 'table-cell' }}>{lead.interest || '\u2014'}</Box>
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
