// src/admin/pages/Members.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Button,
  Badge,
  Image
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../lib/supabase.jsx';
import { HiOutlineUserAdd, HiOutlineSearch } from 'react-icons/hi';

var tierColors = { standard: 'blue', junior: 'green', executive: 'purple', corporate: 'orange' };
var statusColors = { active: 'green', paused: 'yellow', cancelled: 'gray' };

function Members() {
  var [members, setMembers] = useState([]);
  var [physicians, setPhysicians] = useState([]);
  var [filter, setFilter] = useState('all');
  var [search, setSearch] = useState('');
  var [loading, setLoading] = useState(true);
  var navigate = useNavigate();

  useEffect(function () { fetchMembers(); fetchPhysicians(); }, [filter]);

  async function fetchMembers() {
    var query = supabase.from('members').select('*').order('created_at', { ascending: false });
    if (filter === 'active') query = query.eq('status', 'active');
    if (filter === 'paused') query = query.eq('status', 'paused');
    if (filter === 'cancelled') query = query.eq('status', 'cancelled');
    var result = await query;
    setMembers(result.data || []);
    setLoading(false);
  }

  async function fetchPhysicians() {
    var result = await supabase.from('physicians').select('id, name');
    setPhysicians(result.data || []);
  }

  function getPhysicianName(id) {
    var doc = physicians.find(function (p) { return p.id === id; });
    return doc ? doc.name : '—';
  }

  var filters = ['all', 'active', 'paused', 'cancelled'];
  var filtered = search ? members.filter(function (m) {
    return (m.first_name + ' ' + m.last_name + ' ' + m.email).toLowerCase().includes(search.toLowerCase());
  }) : members;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={8} flexWrap="wrap" gap={4}>
        <Box>
          <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D">Patients</Text>
          <Text fontSize="md" color="#9A9590">{filtered.length} {filter === 'all' ? 'total' : filter}</Text>
        </Box>
        <Button as={Link} to="/answersmd-admin/intake/" bg="#1B3A34" color="white" borderRadius="8px" size="md" leftIcon={<HiOutlineUserAdd size={18} />} _hover={{ bg: '#234840' }}>New patient</Button>
      </Flex>

      <Flex gap={3} mb={6} flexWrap="wrap">
        {filters.map(function (f) {
          return <Button key={f} size="sm" borderRadius="8px" bg={filter === f ? '#2D2D2D' : 'white'} color={filter === f ? 'white' : '#6B6560'} border="1px solid" borderColor={filter === f ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setFilter(f); }} _hover={{ bg: filter === f ? '#2D2D2D' : '#F0EDE8' }} textTransform="capitalize">{f}</Button>;
        })}
      </Flex>

      <Flex align="center" gap={3} mb={6} bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" px={4}>
        <HiOutlineSearch size={18} color="#9A9590" />
        <Input placeholder="Search patients..." value={search} onChange={function (e) { setSearch(e.target.value); }} border="none" h="48px" fontSize="md" _focus={{ boxShadow: 'none' }} />
      </Flex>

      {loading ? (
        <Text color="#9A9590">Loading...</Text>
      ) : filtered.length === 0 ? (
        <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={12} textAlign="center">
          <Text fontSize="md" color="#9A9590" mb={4}>No patients yet.</Text>
          <Button as={Link} to="/answersmd-admin/intake/" size="sm" bg="#1B3A34" color="white" borderRadius="8px" _hover={{ bg: '#234840' }}>Add first patient</Button>
        </Box>
      ) : (
        <VStack spacing={3} align="stretch">
          {filtered.map(function (member) {
            return (
              <Box key={member.id} bg="white" borderRadius="14px" border="1px solid" borderColor="#E8E2D8" p={5} cursor="pointer" onClick={function () { navigate('/answersmd-admin/members/' + member.id + '/'); }} _hover={{ borderColor: '#C4A265', shadow: '0 2px 8px rgba(0,0,0,0.04)' }} transition="all 0.2s ease">
                <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
                  <Flex align="center" gap={4}>
                    <Flex w="44px" h="44px" borderRadius="full" bg="#F0EDE8" align="center" justify="center" flexShrink={0}>
                      <Text fontSize="md" fontWeight={600} color="#9A9590">{member.first_name[0]}{member.last_name[0]}</Text>
                    </Flex>
                    <Box>
                      <Text fontSize="md" fontWeight={600} color="#2D2D2D">{member.first_name} {member.last_name}</Text>
                      <Text fontSize="sm" color="#9A9590">{member.email || '—'} {member.phone ? ' · ' + member.phone : ''}</Text>
                    </Box>
                  </Flex>
                  <Flex gap={3} align="center" flexWrap="wrap">
                    <Text fontSize="sm" color="#6B6560" display={{ base: 'none', md: 'block' }}>{getPhysicianName(member.physician_id)}</Text>
                    {member.membership_tier && <Badge colorScheme={tierColors[member.membership_tier] || 'gray'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{member.membership_tier}</Badge>}
                    <Badge colorScheme={statusColors[member.status] || 'gray'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{member.status}</Badge>
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}

export default Members;
