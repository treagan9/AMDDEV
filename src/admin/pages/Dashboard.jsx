// src/admin/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Image
} from '@chakra-ui/react';
import supabase from '../lib/supabase.jsx';
import useAuth from '../lib/useAuth.jsx';

function Dashboard() {
  var { teamMember } = useAuth();
  var [newLeadCount, setNewLeadCount] = useState(0);
  var [unreadCount, setUnreadCount] = useState(0);

  useEffect(function () {
    fetchCounts();
  }, [teamMember]);

  async function fetchCounts() {
    var leads = await supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new');
    setNewLeadCount(leads.count || 0);
    if (!teamMember) return;
    var msgs = await supabase.from('direct_messages').select('id', { count: 'exact', head: true }).eq('recipient_id', teamMember.id).is('read_at', null);
    setUnreadCount(msgs.count || 0);
  }

  var greeting = 'Good morning';
  var hour = new Date().getHours();
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  if (hour >= 17) greeting = 'Good evening';

  return (
    <Box>
      {teamMember && (
        <Flex align="center" gap={4}>
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
    </Box>
  );
}

export default Dashboard;
