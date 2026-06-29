// src/admin/pages/Patients.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Button,
  Badge,
  Image,
  Select
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase.jsx';
import { HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi';

var statusColors = { new: 'green', contacted: 'blue', consultation_scheduled: 'purple', enrolled: 'orange', closed: 'gray', active: 'green', inactive: 'gray', paused: 'yellow' };

function Patients() {
  var [tab, setTab] = useState('leads');
  var [leads, setLeads] = useState([]);
  var [members, setMembers] = useState([]);
  var [search, setSearch] = useState('');
  var [statusFilter, setStatusFilter] = useState('all');
  var [loading, setLoading] = useState(true);
  var navigate = useNavigate();

  useEffect(function () { fetchData(); }, []);

  async function fetchData() {
    var leadsResult = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(leadsResult.data || []);
    var membersResult = await supabase.from('members').select('*').order('created_at', { ascending: false });
    setMembers(membersResult.data || []);
    setLoading(false);
  }

  function filterItems(items) {
    var filtered = items;
    if (search) {
      var s = search.toLowerCase();
      filtered = filtered.filter(function (item) {
        return (item.first_name + ' ' + item.last_name + ' ' + (item.email || '') + ' ' + (item.phone || '')).toLowerCase().includes(s);
      });
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(function (item) { return item.status === statusFilter; });
    }
    return filtered;
  }

  var currentItems = tab === 'leads' ? filterItems(leads) : filterItems(members);
  var leadStatuses = ['all', 'new', 'contacted', 'consultation_scheduled', 'enrolled', 'closed'];
  var memberStatuses = ['all', 'active', 'inactive', 'paused'];
  var statuses = tab === 'leads' ? leadStatuses : memberStatuses;

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={6} flexWrap="wrap" gap={3}>
        <Flex bg="white" borderRadius="10px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
          <Box px={5} py={2.5} cursor="pointer" bg={tab === 'leads' ? '#2D2D2D' : 'transparent'} color={tab === 'leads' ? 'white' : '#6B6560'} fontSize="sm" fontWeight={600} onClick={function () { setTab('leads'); setStatusFilter('all'); setSearch(''); }} transition="all 0.15s ease">
            Leads
            {leads.filter(function (l) { return l.status === 'new'; }).length > 0 && (
              <Badge ml={2} bg={tab === 'leads' ? 'whiteAlpha.300' : '#C4A265'} color="white" borderRadius="full" px={1.5} fontSize="10px">{leads.filter(function (l) { return l.status === 'new'; }).length}</Badge>
            )}
          </Box>
          <Box px={5} py={2.5} cursor="pointer" bg={tab === 'members' ? '#2D2D2D' : 'transparent'} color={tab === 'members' ? 'white' : '#6B6560'} fontSize="sm" fontWeight={600} onClick={function () { setTab('members'); setStatusFilter('all'); setSearch(''); }} transition="all 0.15s ease">
            Members
          </Box>
        </Flex>
        <Button onClick={function () { navigate('/answersmd-admin/patients/new/'); }} size="sm" bg="#1B3A34" color="white" borderRadius="8px" _hover={{ bg: '#234840' }} leftIcon={<HiOutlinePlus size={16} />} fontSize="sm">New patient</Button>
      </Flex>

      <Flex gap={3} mb={5} flexWrap="wrap">
        <Box position="relative" flex={1} minW="200px">
          <Box position="absolute" left={4} top="50%" transform="translateY(-50%)" color="#9A9590" zIndex={1}><HiOutlineSearch size={16} /></Box>
          <Input value={search} onChange={function (e) { setSearch(e.target.value); }} placeholder="Search by name, email or phone..." bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" h="42px" pl={10} pr={4} fontSize="sm" _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#B5AD9E' }} />
        </Box>
        <Select value={statusFilter} onChange={function (e) { setStatusFilter(e.target.value); }} bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" h="42px" fontSize="sm" w="auto" minW="140px">
          {statuses.map(function (s) {
            return <option key={s} value={s}>{s === 'all' ? 'All statuses' : s.replace(/_/g, ' ')}</option>;
          })}
        </Select>
      </Flex>

      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        {loading ? (
          <Box px={5} py={10} textAlign="center"><Text fontSize="sm" color="#9A9590">Loading...</Text></Box>
        ) : currentItems.length === 0 ? (
          <Box px={5} py={10} textAlign="center"><Text fontSize="sm" color="#9A9590">No {tab === 'leads' ? 'leads' : 'members'} found.</Text></Box>
        ) : (
          <VStack spacing={0} align="stretch">
            {currentItems.map(function (item) {
              var detailPath = tab === 'leads' ? '/answersmd-admin/patients/leads/' + item.id + '/' : '/answersmd-admin/patients/members/' + item.id + '/';
              return (
                <Flex key={item.id} align="center" justify="space-between" px={5} py={3.5} cursor="pointer" _hover={{ bg: '#FAFAF7' }} transition="background 0.15s ease" onClick={function () { navigate(detailPath); }} borderBottom="1px solid" borderColor="#F0EDE8">
                  <Box minW="0" flex={1}>
                    <Text fontSize="sm" fontWeight={500} color="#2D2D2D">{item.first_name} {item.last_name}</Text>
                    <Text fontSize="xs" color="#9A9590" noOfLines={1}>{item.email || item.phone || '\u2014'}{item.location ? ' \u00B7 ' + item.location : ''}</Text>
                  </Box>
                  <Flex align="center" gap={3} flexShrink={0}>
                    <Text fontSize="xs" color="#B5AD9E" display={{ base: 'none', md: 'block' }}>{new Date(item.created_at).toLocaleDateString()}</Text>
                    <Badge colorScheme={statusColors[item.status] || 'gray'} borderRadius="full" px={2} py={0.5} fontSize="10px" textTransform="capitalize">{(item.status || '').replace(/_/g, ' ')}</Badge>
                  </Flex>
                </Flex>
              );
            })}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default Patients;
