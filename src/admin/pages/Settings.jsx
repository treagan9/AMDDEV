// src/admin/pages/Settings.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Button,
  Image,
  Badge,
  useToast
} from '@chakra-ui/react';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

var inputStyles = {
  bg: 'white',
  border: '1px solid',
  borderColor: '#D5D0C8',
  borderRadius: '8px',
  fontSize: 'md',
  color: '#2D2D2D',
  h: '54px',
  px: 4,
  _placeholder: { color: '#9B9488' },
  _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

function Settings() {
  var { teamMember, updatePassword } = useAuth();
  var toast = useToast();
  var fileRef = useRef(null);

  var [newPassword, setNewPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [changingPassword, setChangingPassword] = useState(false);
  var [avatarUrl, setAvatarUrl] = useState(null);
  var [uploading, setUploading] = useState(false);
  var [members, setMembers] = useState([]);
  var [requests, setRequests] = useState([]);
  var [loaded, setLoaded] = useState(false);

  useEffect(function () {
    if (teamMember) {
      setAvatarUrl(teamMember.avatar_url || null);
    }
  }, [teamMember]);

  useEffect(function () {
    fetchTeam();
    fetchRequests();
  }, []);

  async function fetchTeam() {
    var result = await supabase.from('team_members').select('*').order('created_at');
    setMembers(result.data || []);
    setLoaded(true);
  }

  async function fetchRequests() {
    var result = await supabase.from('account_requests').select('*').order('created_at', { ascending: false });
    setRequests(result.data || []);
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast({ title: 'Password must be at least 8 characters', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: 'Passwords don\'t match', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    setChangingPassword(true);
    try {
      await updatePassword(newPassword);
      toast({ title: 'Password updated', status: 'success', duration: 3000, position: 'top' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setChangingPassword(false);
  }

  async function handleAvatarUpload(e) {
    var file = e.target.files[0];
    if (!file || !teamMember) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please select an image file', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    setUploading(true);
    try {
      var ext = file.name.split('.').pop().toLowerCase();
      var path = 'team/' + teamMember.id + '.' + ext;

      var removeResult = await supabase.storage.from('avatars').list('team');
      if (removeResult.data) {
        var existing = removeResult.data.filter(function (f) { return f.name.startsWith(teamMember.id); });
        if (existing.length > 0) {
          await supabase.storage.from('avatars').remove(existing.map(function (f) { return 'team/' + f.name; }));
        }
      }

      var uploadResult = await supabase.storage.from('avatars').upload(path, file, { upsert: true, cacheControl: '0' });
      if (uploadResult.error) throw uploadResult.error;

      var urlResult = supabase.storage.from('avatars').getPublicUrl(path);
      var publicUrl = urlResult.data.publicUrl + '?v=' + Date.now();

      var updateResult = await supabase.from('team_members').update({ avatar_url: publicUrl }).eq('id', teamMember.id);
      if (updateResult.error) throw updateResult.error;

      setAvatarUrl(publicUrl);
      fetchTeam();
      toast({ title: 'Avatar saved', status: 'success', duration: 3000, position: 'top' });
    } catch (err) {
      toast({ title: 'Upload failed', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function updateRequestStatus(requestId, status) {
    await supabase.from('account_requests').update({ status: status, reviewed_by: teamMember ? teamMember.id : null, reviewed_at: new Date().toISOString() }).eq('id', requestId);
    toast({ title: 'Request ' + status, status: 'success', duration: 2000, position: 'top' });
    fetchRequests();
  }

  if (!teamMember) return null;

  var pendingRequests = requests.filter(function (r) { return r.status === 'pending'; });
  var resolvedRequests = requests.filter(function (r) { return r.status !== 'pending'; });

  return (
    <Box>
      <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={8}>Settings</Text>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        <Box flex={1} minW="0">
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }} mb={8}>
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={6}>Profile</Text>
            <Flex gap={6} align="center" mb={8}>
              <Box position="relative" cursor="pointer" onClick={function () { fileRef.current.click(); }} role="group">
                <Flex w="80px" h="80px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" border="2px solid" borderColor="#D5D0C8" transition="border-color 0.2s ease" _groupHover={{ borderColor: '#C4A265' }}>
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt={teamMember.first_name} objectFit="cover" w="100%" h="100%" key={avatarUrl} />
                  ) : (
                    <Text fontSize="2xl" fontWeight={700} color="#9A9590">{teamMember.first_name[0]}{teamMember.last_name[0]}</Text>
                  )}
                </Flex>
                <Flex position="absolute" bottom={0} right={0} w="24px" h="24px" borderRadius="full" bg="#2D2D2D" align="center" justify="center" border="2px solid white">
                  <Text fontSize="xs" color="white" lineHeight={1}>+</Text>
                </Flex>
                <input ref={fileRef} type="file" accept="image/*" capture={false} onChange={handleAvatarUpload} style={{ display: 'none' }} />
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight={600} color="#2D2D2D">{teamMember.first_name} {teamMember.last_name}</Text>
                <Text fontSize="md" color="#6B6560">{teamMember.email}</Text>
                <Text fontSize="sm" color="#9A9590" mt={1}>@{teamMember.username} &middot; {teamMember.role}</Text>
              </Box>
            </Flex>
            {uploading && <Text fontSize="sm" color="#C4A265" mb={4}>Uploading avatar...</Text>}
            <Flex gap={6} flexWrap="wrap">
              <Box flex={1} minW="100px"><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Username</Text><Text fontSize="md" color="#2D2D2D">{teamMember.username}</Text></Box>
              <Box flex={1} minW="100px"><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Role</Text><Text fontSize="md" color="#2D2D2D" textTransform="capitalize">{teamMember.role}</Text></Box>
              <Box flex={1} minW="100px"><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Status</Text><Text fontSize="md" color="#2D2D2D" textTransform="capitalize">{teamMember.status}</Text></Box>
            </Flex>
          </Box>

          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }} mb={8}>
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={6}>Change password</Text>
            <form onSubmit={handlePasswordChange}>
              <VStack spacing={5} align="stretch" maxW="400px">
                <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>New password</Text><Input type="password" autoComplete="new-password" value={newPassword} onChange={function (e) { setNewPassword(e.target.value); }} placeholder="Minimum 8 characters" required {...inputStyles} /></Box>
                <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Confirm password</Text><Input type="password" autoComplete="new-password" value={confirmPassword} onChange={function (e) { setConfirmPassword(e.target.value); }} placeholder="Enter password again" required {...inputStyles} /></Box>
                <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" h="54px" _hover={{ bg: '#234840' }} isLoading={changingPassword} loadingText="Updating...">Update password</Button>
              </VStack>
            </form>
          </Box>

          {pendingRequests.length > 0 && (
            <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }} mb={8}>
              <Flex align="center" gap={3} mb={6}>
                <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D">Account requests</Text>
                <Badge bg="#C4A265" color="white" borderRadius="full" px={3} py={0.5} fontSize="xs">{pendingRequests.length}</Badge>
              </Flex>
              <VStack spacing={4} align="stretch">
                {pendingRequests.map(function (req) {
                  return (
                    <Flex key={req.id} bg="#FAFAF7" borderRadius="12px" p={5} justify="space-between" align="center" border="1px solid" borderColor="#E8E2D8" flexWrap="wrap" gap={3}>
                      <Box>
                        <Text fontSize="md" fontWeight={600} color="#2D2D2D">{req.first_name} {req.last_name}</Text>
                        <Text fontSize="sm" color="#6B6560">{req.email}</Text>
                        {req.reason && <Text fontSize="sm" color="#9A9590" mt={1}>{req.reason}</Text>}
                        <Text fontSize="xs" color="#9A9590" mt={1}>{new Date(req.created_at).toLocaleString()}</Text>
                      </Box>
                      <Flex gap={2}>
                        <Button onClick={function () { updateRequestStatus(req.id, 'approved'); }} size="sm" bg="#1B3A34" color="white" borderRadius="8px" leftIcon={<HiOutlineCheck size={14} />} _hover={{ bg: '#234840' }}>Approve</Button>
                        <Button onClick={function () { updateRequestStatus(req.id, 'denied'); }} size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" leftIcon={<HiOutlineX size={14} />} _hover={{ bg: '#F0EDE8' }}>Deny</Button>
                      </Flex>
                    </Flex>
                  );
                })}
              </VStack>
            </Box>
          )}

          {resolvedRequests.length > 0 && (
            <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }}>
              <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={6}>Past requests</Text>
              <VStack spacing={3} align="stretch">
                {resolvedRequests.slice(0, 10).map(function (req) {
                  return (
                    <Flex key={req.id} justify="space-between" align="center" py={3} borderBottom="1px solid" borderColor="#F0EDE8">
                      <Box><Text fontSize="md" fontWeight={500} color="#2D2D2D">{req.first_name} {req.last_name}</Text><Text fontSize="sm" color="#9A9590">{req.email} &middot; {new Date(req.created_at).toLocaleDateString()}</Text></Box>
                      <Badge colorScheme={req.status === 'approved' ? 'green' : 'red'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{req.status}</Badge>
                    </Flex>
                  );
                })}
              </VStack>
            </Box>
          )}
        </Box>

        <Box w={{ base: '100%', lg: '320px' }} flexShrink={0}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }}>
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={6}>Team members</Text>
            <VStack spacing={4} align="stretch">
              {members.map(function (m) {
                return (
                  <Flex key={m.id} gap={3} align="center">
                    <Flex w="40px" h="40px" borderRadius="full" overflow="hidden" bg="#F0EDE8" align="center" justify="center" flexShrink={0}>
                      {m.avatar_url ? (
                        <Image src={m.avatar_url} alt={m.first_name} objectFit="cover" w="100%" h="100%" />
                      ) : (
                        <Text fontSize="sm" fontWeight={600} color="#9A9590">{m.first_name[0]}{m.last_name[0]}</Text>
                      )}
                    </Flex>
                    <Box>
                      <Text fontSize="md" fontWeight={500} color="#2D2D2D">{m.first_name} {m.last_name}</Text>
                      <Text fontSize="sm" color="#9A9590">@{m.username} &middot; {m.role}</Text>
                    </Box>
                  </Flex>
                );
              })}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Settings;
