// src/admin/pages/LeadDetail.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Text,
  Input,
  Textarea,
  Button,
  Badge,
  Select,
  useToast
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';
import { HiOutlineArrowLeft, HiOutlineUserAdd, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';

var statusColors = { new: 'green', contacted: 'blue', consultation_scheduled: 'purple', enrolled: 'orange', closed: 'gray' };
var statusOptions = ['new', 'contacted', 'consultation_scheduled', 'enrolled', 'closed'];

var selectStyles = {
  bg: '#FAFAF7',
  border: '1px solid',
  borderColor: '#D5D0C8',
  borderRadius: '8px',
  h: '48px',
  fontSize: 'md',
  color: '#2D2D2D',
  iconColor: '#9A9590',
  iconSize: '18px',
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' },
  _hover: { borderColor: '#C4A265' },
  sx: {
    '> option': { bg: 'white', color: '#2D2D2D' },
    paddingRight: '40px'
  }
};

function LeadDetail() {
  var { id } = useParams();
  var navigate = useNavigate();
  var toast = useToast();
  var { teamMember } = useAuth();

  var [lead, setLead] = useState(null);
  var [submission, setSubmission] = useState(null);
  var [physicians, setPhysicians] = useState([]);
  var [notes, setNotes] = useState('');
  var [saving, setSaving] = useState(false);
  var [converting, setConverting] = useState(false);
  var [loading, setLoading] = useState(true);

  useEffect(function () { fetchLead(); fetchPhysicians(); }, [id]);

  async function fetchLead() {
    var result = await supabase.from('leads').select('*').eq('id', id).single();
    if (result.data) {
      setLead(result.data);
      setNotes(result.data.notes || '');
    }
    var subResult = await supabase.from('form_submissions').select('*').eq('lead_id', id).order('created_at', { ascending: false }).limit(1);
    if (subResult.data && subResult.data.length > 0) setSubmission(subResult.data[0]);
    setLoading(false);
  }

  async function fetchPhysicians() {
    var result = await supabase.from('physicians').select('*').eq('status', 'active');
    setPhysicians(result.data || []);
  }

  async function updateField(field, value) {
    setSaving(true);
    var update = {};
    update[field] = value;
    await supabase.from('leads').update(update).eq('id', id);
    setLead(function (prev) { return Object.assign({}, prev, update); });
    await supabase.from('activity_log').insert({
      user_id: teamMember ? teamMember.id : null,
      action: 'lead_updated', entity_type: 'lead', entity_id: id,
      details: { field: field, value: value, updated_by: teamMember ? teamMember.first_name + ' ' + teamMember.last_name : 'Unknown' }
    });
    setSaving(false);
    toast({ title: 'Updated', status: 'success', duration: 2000, position: 'top' });
  }

  async function saveNotes() { await updateField('notes', notes); }

  async function convertToPatient() {
    setConverting(true);
    try {
      var result = await supabase.from('members').insert({
        lead_id: lead.id, first_name: lead.first_name, last_name: lead.last_name,
        email: lead.email, phone: lead.phone, location: lead.location,
        status: 'active', membership_start: new Date().toISOString().split('T')[0]
      }).select().single();
      if (result.error) throw result.error;
      await supabase.from('leads').update({ status: 'enrolled' }).eq('id', id);
      await supabase.from('activity_log').insert({
        user_id: teamMember ? teamMember.id : null,
        action: 'lead_converted', entity_type: 'member', entity_id: result.data.id,
        details: { lead_id: id, name: lead.first_name + ' ' + lead.last_name }
      });
      toast({ title: 'Converted to patient', description: 'Redirecting to patient profile...', status: 'success', duration: 3000, position: 'top' });
      setTimeout(function () { navigate('/answersmd-admin/members/' + result.data.id + '/'); }, 1500);
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setConverting(false);
  }

  if (loading) return <Box><Text color="#9A9590">Loading...</Text></Box>;
  if (!lead) return <Box><Text color="#9A9590">Lead not found.</Text></Box>;

  return (
    <Box>
      <Flex align="center" gap={4} mb={8} flexWrap="wrap">
        <Box cursor="pointer" onClick={function () { navigate('/answersmd-admin/patients/'); }} color="#6B6560" _hover={{ color: '#2D2D2D' }}>
          <HiOutlineArrowLeft size={20} />
        </Box>
        <Box flex={1} minW="0">
          <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D">{lead.first_name} {lead.last_name}</Text>
          <Text fontSize="md" color="#6B6560">Lead from {lead.source} form &middot; {new Date(lead.created_at).toLocaleDateString()}</Text>
        </Box>
        {lead.status !== 'enrolled' && (
          <Button onClick={convertToPatient} bg="#1B3A34" color="white" borderRadius="8px" size="md" leftIcon={<HiOutlineUserAdd size={18} />} _hover={{ bg: '#234840' }} isLoading={converting} loadingText="Converting..." flexShrink={0}>Convert to patient</Button>
        )}
      </Flex>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        <Box flex={1} minW="0">
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }} mb={6}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={6}>Contact information</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Email</Text><Flex align="center" gap={2}><HiOutlineMail size={16} color="#9A9590" /><Text fontSize="md" color="#2D2D2D">{lead.email || '\u2014'}</Text></Flex></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Phone</Text><Flex align="center" gap={2}><HiOutlinePhone size={16} color="#9A9590" /><Text fontSize="md" color="#2D2D2D">{lead.phone || '\u2014'}</Text></Flex></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Location</Text><Text fontSize="md" color="#2D2D2D">{lead.location || '\u2014'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Interest</Text><Text fontSize="md" color="#2D2D2D">{lead.interest || '\u2014'}</Text></Box>
            </SimpleGrid>
            {lead.message && (
              <Box mt={6}><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={2}>Message</Text><Box bg="#FAFAF7" borderRadius="8px" p={4} border="1px solid" borderColor="#E8E2D8"><Text fontSize="md" color="#2D2D2D" lineHeight={1.7}>{lead.message}</Text></Box></Box>
            )}
          </Box>

          {submission && (
            <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }} mb={6}>
              <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={2}>
                <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">Form snapshot</Text>
                <Text fontSize="sm" color="#9A9590">{new Date(submission.created_at).toLocaleString()}</Text>
              </Flex>
              <Box bg="#FAFAF7" borderRadius="8px" p={4} border="1px solid" borderColor="#E8E2D8" overflowX="auto">
                <Text as="pre" fontSize="sm" color="#2D2D2D" whiteSpace="pre-wrap" fontFamily="mono">{JSON.stringify(submission.raw_payload, null, 2)}</Text>
              </Box>
            </Box>
          )}

          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 8 }}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={4}>Notes</Text>
            <Textarea value={notes} onChange={function (e) { setNotes(e.target.value); }} placeholder="Add internal notes about this lead..." rows={5} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} mb={4} />
            <Button onClick={saveNotes} bg="#1B3A34" color="white" borderRadius="8px" size="md" _hover={{ bg: '#234840' }} isLoading={saving}>Save notes</Button>
          </Box>
        </Box>

        <Box w={{ base: '100%', lg: '300px' }} flexShrink={0}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={6} mb={6}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={4}>Status</Text>
            <Select value={lead.status} onChange={function (e) { updateField('status', e.target.value); }} {...selectStyles}>
              {statusOptions.map(function (s) {
                return <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>;
              })}
            </Select>
            <Box mt={4}><Badge colorScheme={statusColors[lead.status] || 'gray'} borderRadius="full" px={3} py={1} fontSize="sm" textTransform="capitalize">{lead.status.replace(/_/g, ' ')}</Badge></Box>
          </Box>

          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={6} mb={6}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={4}>Physician</Text>
            <Select value={lead.assigned_to || ''} onChange={function (e) { updateField('assigned_to', e.target.value || null); }} {...selectStyles}>
              <option value="">Unassigned</option>
              {physicians.map(function (doc) {
                return <option key={doc.id} value={doc.id}>{doc.name}</option>;
              })}
            </Select>
          </Box>

          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={6}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={4}>Quick actions</Text>
            <VStack spacing={3} align="stretch">
              {lead.email && <Button as="a" href={'mailto:' + lead.email} size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" leftIcon={<HiOutlineMail size={16} />} _hover={{ bg: '#F0EDE8' }}>Send email</Button>}
              {lead.phone && <Button as="a" href={'tel:' + lead.phone.replace(/\D/g, '')} size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" leftIcon={<HiOutlinePhone size={16} />} _hover={{ bg: '#F0EDE8' }}>Call</Button>}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default LeadDetail;
