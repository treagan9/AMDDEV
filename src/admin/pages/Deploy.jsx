// src/admin/pages/Deploy.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Badge,
  useToast
} from '@chakra-ui/react';
import { HiOutlineCloudUpload, HiOutlineRefresh, HiOutlineCheck, HiOutlineX, HiOutlineClock } from 'react-icons/hi';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';

var statusColors = {
  ready: { bg: '#E6F4EA', color: '#1B7A3D', label: 'Published' },
  building: { bg: '#FFF3CD', color: '#856404', label: 'Building' },
  enqueued: { bg: '#FFF3CD', color: '#856404', label: 'Queued' },
  error: { bg: '#F8D7DA', color: '#721C24', label: 'Failed' },
  unknown: { bg: '#F0EDE8', color: '#6B6560', label: 'Unknown' }
};

function Deploy() {
  var [deploying, setDeploying] = useState(false);
  var [deployStatus, setDeployStatus] = useState(null);
  var [recentDeploys, setRecentDeploys] = useState([]);
  var [loading, setLoading] = useState(true);
  var [confirmOpen, setConfirmOpen] = useState(false);
  var { teamMember } = useAuth();
  var toast = useToast();

  var hookUrl = import.meta.env.VITE_NETLIFY_DEPLOY_HOOK || '';

  useEffect(function () {
    fetchDeploys();
    var interval = setInterval(fetchDeploys, 15000);
    return function () { clearInterval(interval); };
  }, []);

  async function fetchDeploys() {
    try {
      var result = await supabase.from('activity_log').select('*').eq('action', 'deploy_triggered').order('created_at', { ascending: false }).limit(10);
      setRecentDeploys(result.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function triggerDeploy() {
    if (!hookUrl) {
      toast({ title: 'Deploy hook not configured', description: 'Please contact admin@answersmd.com for setup.', status: 'error', duration: 5000, position: 'top' });
      return;
    }
    setDeploying(true);
    setConfirmOpen(false);
    try {
      var response = await fetch(hookUrl, { method: 'POST' });
      if (!response.ok) throw new Error('Deploy hook returned ' + response.status);

      await supabase.from('activity_log').insert({
        user_id: teamMember ? teamMember.id : null,
        action: 'deploy_triggered',
        entity_type: 'deploy',
        details: {
          triggered_by: teamMember ? teamMember.first_name + ' ' + teamMember.last_name : 'Unknown',
          username: teamMember ? teamMember.username : null,
          timestamp: new Date().toISOString()
        }
      });

      setDeployStatus('building');
      toast({ title: 'Deploy triggered', description: 'The site is building. This typically takes 1 to 2 minutes.', status: 'success', duration: 5000, position: 'top' });
      fetchDeploys();

      setTimeout(function () { setDeployStatus(null); setDeploying(false); }, 120000);
    } catch (err) {
      toast({ title: 'Deploy failed', description: err.message || 'Please try again or contact admin@answersmd.com.', status: 'error', duration: 5000, position: 'top' });
      setDeployStatus('error');
      setDeploying(false);
    }
  }

  var currentStatus = statusColors[deployStatus] || statusColors.unknown;

  return (
    <Box>
      <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D" mb={2}>Deploy</Text>
      <Text fontSize="md" color="#6B6560" mb={8}>Publish changes to the live site. This will rebuild and deploy the latest version.</Text>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        <Box flex={1}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={8} mb={8}>
            <Flex align="center" gap={3} mb={6}>
              <HiOutlineCloudUpload size={24} color="#2D2D2D" />
              <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D">Production deploy</Text>
            </Flex>

            {deployStatus && (
              <Box bg={currentStatus.bg} borderRadius="8px" px={5} py={4} mb={6}>
                <Flex align="center" gap={3}>
                  {deployStatus === 'building' && <HiOutlineClock size={20} color={currentStatus.color} />}
                  {deployStatus === 'error' && <HiOutlineX size={20} color={currentStatus.color} />}
                  <Box>
                    <Text fontSize="md" fontWeight={600} color={currentStatus.color}>{currentStatus.label}</Text>
                    <Text fontSize="sm" color={currentStatus.color} opacity={0.8}>
                      {deployStatus === 'building' ? 'The site is building. This typically takes 1 to 2 minutes.' : 'The deploy encountered an error. Please try again or contact admin@answersmd.com.'}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}

            {!confirmOpen ? (
              <Button onClick={function () { setConfirmOpen(true); }} bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="54px" _hover={{ bg: '#234840' }} isDisabled={deploying} leftIcon={<HiOutlineCloudUpload size={20} />}>
                {deploying ? 'Deploy in progress...' : 'Deploy to production'}
              </Button>
            ) : (
              <Box bg="#FAFAF7" borderRadius="8px" border="1px solid" borderColor="#E8E2D8" p={6}>
                <Text fontSize="md" fontWeight={600} color="#2D2D2D" mb={2}>Are you sure?</Text>
                <Text fontSize="md" color="#6B6560" mb={5}>This will rebuild and publish the live site. All visitors will see the updated version.</Text>
                <Flex gap={3}>
                  <Button onClick={triggerDeploy} bg="#1B3A34" color="white" borderRadius="8px" size="md" _hover={{ bg: '#234840' }} flex={1}>Yes, deploy now</Button>
                  <Button onClick={function () { setConfirmOpen(false); }} bg="white" color="#6B6560" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" size="md" _hover={{ bg: '#F0EDE8' }} flex={1}>Cancel</Button>
                </Flex>
              </Box>
            )}
          </Box>

          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={8}>
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={2}>Important</Text>
            <Text fontSize="md" color="#6B6560" lineHeight={1.8}>Deploying publishes all current changes to the live site. Make sure all image uploads and content updates are complete before deploying. If you encounter any issues, please contact <Text as="span" color="#C4A265" fontWeight={500}>admin@answersmd.com</Text> for assistance.</Text>
          </Box>
        </Box>

        <Box w={{ base: '100%', lg: '380px' }} flexShrink={0}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={8}>
            <Flex align="center" justify="space-between" mb={6}>
              <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D">Deploy history</Text>
              <Box cursor="pointer" onClick={fetchDeploys} color="#6B6560" _hover={{ color: '#2D2D2D' }} transition="color 0.2s ease">
                <HiOutlineRefresh size={18} />
              </Box>
            </Flex>
            {loading ? (
              <Text fontSize="md" color="#9A9590">Loading...</Text>
            ) : recentDeploys.length === 0 ? (
              <Text fontSize="md" color="#9A9590">No deploys yet.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {recentDeploys.map(function (deploy) {
                  var details = deploy.details || {};
                  return (
                    <Flex key={deploy.id} gap={3} align="flex-start">
                      <Flex w="32px" h="32px" borderRadius="full" bg="#E6F4EA" align="center" justify="center" flexShrink={0} mt={0.5}>
                        <HiOutlineCheck size={16} color="#1B7A3D" />
                      </Flex>
                      <Box>
                        <Text fontSize="md" fontWeight={500} color="#2D2D2D">{details.triggered_by || 'Unknown'}</Text>
                        <Text fontSize="sm" color="#9A9590">{new Date(deploy.created_at).toLocaleString()}</Text>
                      </Box>
                    </Flex>
                  );
                })}
              </VStack>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Deploy;