// src/admin/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Badge
} from '@chakra-ui/react';
import supabase from '../lib/supabase.jsx';

function StatCard({ label, value, subtitle }) {
  return (
    <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={8}>
      <Text fontSize="sm" fontWeight={600} color="#6B6560" letterSpacing="1px" textTransform="uppercase" mb={3}>{label}</Text>
      <Text fontFamily="heading" fontSize="4xl" fontWeight={700} color="#2D2D2D" lineHeight={1}>{value}</Text>
      {subtitle && <Text fontSize="md" color="#9A9590" mt={2}>{subtitle}</Text>}
    </Box>
  );
}

function Dashboard() {
  var [stats, setStats] = useState({ leads: 0, newLeads: 0, members: 0, submissions: 0 });
  var [recentLeads, setRecentLeads] = useState([]);

  useEffect(function () {
    fetchStats();
    fetchRecentLeads();
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

  var statusColors = { new: 'green', contacted: 'blue', consultation_scheduled: 'purple', enrolled: 'orange', closed: 'gray' };

  return (
    <Box>
      <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D" mb={8}>Dashboard</Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={10}>
        <StatCard label="Total leads" value={stats.leads} />
        <StatCard label="New leads" value={stats.newLeads} subtitle="Awaiting contact" />
        <StatCard label="Active members" value={stats.members} />
        <StatCard label="Form submissions" value={stats.submissions} />
      </SimpleGrid>

      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Box px={8} py={6} borderBottom="1px solid" borderColor="#E8E2D8">
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
                  <Box as="th" textAlign="left" px={8} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px">Name</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px">Location</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px">Interest</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px">Status</Box>
                  <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560" textTransform="uppercase" letterSpacing="0.5px">Date</Box>
                </Box>
              </Box>
              <Box as="tbody">
                {recentLeads.map(function (lead) {
                  return (
                    <Box as="tr" key={lead.id} borderBottom="1px solid" borderColor="#F0EDE8" _hover={{ bg: '#FAFAF7' }} cursor="pointer">
                      <Box as="td" px={8} py={4} fontWeight={500} color="#2D2D2D">{lead.first_name} {lead.last_name}</Box>
                      <Box as="td" px={4} py={4} color="#6B6560">{lead.location || '—'}</Box>
                      <Box as="td" px={4} py={4} color="#6B6560">{lead.interest || '—'}</Box>
                      <Box as="td" px={4} py={4}><Badge colorScheme={statusColors[lead.status] || 'gray'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{lead.status}</Badge></Box>
                      <Box as="td" px={4} py={4} color="#9A9590">{new Date(lead.created_at).toLocaleDateString()}</Box>
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
