// src/admin/pages/Leads.jsx
import { useState, useEffect } from 'react';
import { Box, Flex, Text, Badge, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';

function Leads() {
  var [leads, setLeads] = useState([]);
  var [filter, setFilter] = useState('all');
  var [search, setSearch] = useState('');
  var navigate = useNavigate();

  useEffect(function () { fetchLeads(); }, [filter]);

  async function fetchLeads() {
    var query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    var result = await query;
    setLeads(result.data || []);
  }

  var statusColors = { new: 'green', contacted: 'blue', consultation_scheduled: 'purple', enrolled: 'orange', closed: 'gray' };
  var filters = ['all', 'new', 'contacted', 'consultation_scheduled', 'enrolled', 'closed'];
  var filtered = search ? leads.filter(function (l) { return (l.first_name + ' ' + l.last_name + ' ' + l.email).toLowerCase().includes(search.toLowerCase()); }) : leads;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D">Leads</Text>
        <Text fontSize="md" color="#9A9590">{filtered.length} total</Text>
      </Flex>
      <Flex gap={3} mb={6} flexWrap="wrap">
        {filters.map(function (f) {
          return <Button key={f} size="sm" borderRadius="8px" bg={filter === f ? '#2D2D2D' : 'white'} color={filter === f ? 'white' : '#6B6560'} border="1px solid" borderColor={filter === f ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setFilter(f); }} _hover={{ bg: filter === f ? '#2D2D2D' : '#F0EDE8' }} textTransform="capitalize">{f === 'all' ? 'All' : f.replace('_', ' ')}</Button>;
        })}
      </Flex>
      <Input placeholder="Search by name or email" value={search} onChange={function (e) { setSearch(e.target.value); }} bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" h="48px" mb={6} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Box overflowX="auto">
          <Box as="table" w="100%" fontSize="md">
            <Box as="thead"><Box as="tr" borderBottom="1px solid" borderColor="#E8E2D8">
              <Box as="th" textAlign="left" px={6} py={4} fontSize="sm" fontWeight={600} color="#6B6560">Name</Box>
              <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560">Email</Box>
              <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560">Phone</Box>
              <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560">Location</Box>
              <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560">Status</Box>
              <Box as="th" textAlign="left" px={4} py={4} fontSize="sm" fontWeight={600} color="#6B6560">Date</Box>
            </Box></Box>
            <Box as="tbody">
              {filtered.map(function (lead) {
                return (
                  <Box as="tr" key={lead.id} borderBottom="1px solid" borderColor="#F0EDE8" _hover={{ bg: '#FAFAF7' }} cursor="pointer" onClick={function () { navigate('/answersmd-admin/leads/' + lead.id + '/'); }}>
                    <Box as="td" px={6} py={4} fontWeight={500} color="#2D2D2D">{lead.first_name} {lead.last_name}</Box>
                    <Box as="td" px={4} py={4} color="#6B6560">{lead.email}</Box>
                    <Box as="td" px={4} py={4} color="#6B6560">{lead.phone}</Box>
                    <Box as="td" px={4} py={4} color="#6B6560">{lead.location || '—'}</Box>
                    <Box as="td" px={4} py={4}><Badge colorScheme={statusColors[lead.status] || 'gray'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{lead.status}</Badge></Box>
                    <Box as="td" px={4} py={4} color="#9A9590">{new Date(lead.created_at).toLocaleDateString()}</Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Leads;
