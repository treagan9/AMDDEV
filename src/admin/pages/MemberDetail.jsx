// src/admin/pages/MemberDetail.jsx
import { useState, useEffect, useRef } from 'react';
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
  Image,
  useToast,
  Collapse
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';
import { HiOutlineArrowLeft, HiOutlineMail, HiOutlinePhone, HiOutlineDocumentText, HiOutlineUpload, HiOutlineTrash, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

var tierColors = { standard: 'blue', junior: 'green', executive: 'purple', corporate: 'orange' };
var docCategories = ['lab_results', 'imaging', 'records', 'insurance', 'consent', 'other'];

function Section({ title, icon, children, defaultOpen }) {
  var [open, setOpen] = useState(defaultOpen !== false);
  var Icon = icon;
  return (
    <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" mb={5} overflow="hidden">
      <Flex align="center" justify="space-between" px={8} py={5} cursor="pointer" onClick={function () { setOpen(!open); }} _hover={{ bg: '#FAFAF7' }} transition="background 0.15s ease">
        <Flex align="center" gap={3}>
          {Icon && <Icon size={18} color="#6B6560" />}
          <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">{title}</Text>
        </Flex>
        <Box color="#9A9590">{open ? <HiOutlineChevronUp size={18} /> : <HiOutlineChevronDown size={18} />}</Box>
      </Flex>
      <Collapse in={open}>
        <Box px={8} pb={6}>{children}</Box>
      </Collapse>
    </Box>
  );
}

function MemberDetail() {
  var { id } = useParams();
  var navigate = useNavigate();
  var toast = useToast();
  var { teamMember } = useAuth();
  var fileRef = useRef(null);

  var [member, setMember] = useState(null);
  var [physicians, setPhysicians] = useState([]);
  var [documents, setDocuments] = useState([]);
  var [emails, setEmails] = useState([]);
  var [notes, setNotes] = useState('');
  var [saving, setSaving] = useState(false);
  var [uploading, setUploading] = useState(false);
  var [uploadCategory, setUploadCategory] = useState('lab_results');
  var [loading, setLoading] = useState(true);

  useEffect(function () { fetchAll(); }, [id]);

  async function fetchAll() {
    var memberResult = await supabase.from('members').select('*').eq('id', id).single();
    if (memberResult.data) {
      setMember(memberResult.data);
      setNotes(memberResult.data.notes || '');
    }
    var docResult = await supabase.from('patient_documents').select('*').eq('member_id', id).order('created_at', { ascending: false });
    setDocuments(docResult.data || []);
    var emailResult = await supabase.from('email_sends').select('*').eq('member_id', id).order('created_at', { ascending: false });
    setEmails(emailResult.data || []);
    var physResult = await supabase.from('physicians').select('*').eq('status', 'active');
    setPhysicians(physResult.data || []);
    setLoading(false);
  }

  async function updateField(field, value) {
    setSaving(true);
    var update = {};
    update[field] = value;
    await supabase.from('members').update(update).eq('id', id);
    setMember(function (prev) { return Object.assign({}, prev, update); });
    setSaving(false);
    toast({ title: 'Updated', status: 'success', duration: 2000, position: 'top' });
  }

  async function saveNotes() {
    await updateField('notes', notes);
  }

  async function handleDocUpload(e) {
    var file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      var path = id + '/' + Date.now() + '-' + file.name;
      var uploadResult = await supabase.storage.from('patient-documents').upload(path, file);
      if (uploadResult.error) throw uploadResult.error;
      var urlResult = supabase.storage.from('patient-documents').getPublicUrl(path);
      await supabase.from('patient_documents').insert({
        member_id: id, uploaded_by: teamMember ? teamMember.id : null,
        file_name: file.name, file_url: urlResult.data.publicUrl,
        file_type: file.type, file_size: file.size, category: uploadCategory
      });
      await supabase.from('activity_log').insert({
        user_id: teamMember ? teamMember.id : null,
        action: 'document_uploaded', entity_type: 'member', entity_id: id,
        details: { file_name: file.name, category: uploadCategory }
      });
      toast({ title: 'Document uploaded', status: 'success', duration: 3000, position: 'top' });
      fetchAll();
    } catch (err) {
      toast({ title: 'Upload failed', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setUploading(false);
  }

  async function deleteDocument(doc) {
    try {
      var path = doc.file_url.split('/patient-documents/')[1];
      if (path) await supabase.storage.from('patient-documents').remove([path]);
      await supabase.from('patient_documents').delete().eq('id', doc.id);
      toast({ title: 'Document deleted', status: 'success', duration: 2000, position: 'top' });
      fetchAll();
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
  }

  if (loading) return <Box><Text color="#9A9590">Loading...</Text></Box>;
  if (!member) return <Box><Text color="#9A9590">Patient not found.</Text></Box>;

  var physicianName = '—';
  var doc = physicians.find(function (p) { return p.id === member.physician_id; });
  if (doc) physicianName = doc.name;

  return (
    <Box>
      <Flex align="center" gap={4} mb={8} flexWrap="wrap">
        <Box cursor="pointer" onClick={function () { navigate('/answersmd-admin/members/'); }} color="#6B6560" _hover={{ color: '#2D2D2D' }}>
          <HiOutlineArrowLeft size={20} />
        </Box>
        <Flex align="center" gap={4} flex={1}>
          <Flex w="56px" h="56px" borderRadius="full" bg="#F0EDE8" align="center" justify="center" flexShrink={0}>
            <Text fontSize="xl" fontWeight={700} color="#9A9590">{member.first_name[0]}{member.last_name[0]}</Text>
          </Flex>
          <Box>
            <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D">{member.first_name} {member.last_name}</Text>
            <Flex gap={3} align="center" flexWrap="wrap">
              {member.membership_tier && <Badge colorScheme={tierColors[member.membership_tier] || 'gray'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{member.membership_tier}</Badge>}
              <Badge colorScheme={member.status === 'active' ? 'green' : 'gray'} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="capitalize">{member.status}</Badge>
              <Text fontSize="sm" color="#9A9590">{physicianName}</Text>
            </Flex>
          </Box>
        </Flex>
        <Flex gap={3}>
          {member.email && <Button as="a" href={'mailto:' + member.email} size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" leftIcon={<HiOutlineMail size={16} />} _hover={{ bg: '#F0EDE8' }}>Email</Button>}
          {member.phone && <Button as="a" href={'tel:' + member.phone.replace(/\D/g, '')} size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" leftIcon={<HiOutlinePhone size={16} />} _hover={{ bg: '#F0EDE8' }}>Call</Button>}
        </Flex>
      </Flex>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        <Box flex={1}>
          <Section title="Contact information" defaultOpen={true}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Email</Text><Text fontSize="md" color="#2D2D2D">{member.email || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Phone</Text><Text fontSize="md" color="#2D2D2D">{member.phone || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Date of birth</Text><Text fontSize="md" color="#2D2D2D">{member.date_of_birth || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Location</Text><Text fontSize="md" color="#2D2D2D">{member.location || '—'}</Text></Box>
              <Box gridColumn={{ md: 'span 2' }}><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Address</Text><Text fontSize="md" color="#2D2D2D">{member.address_line1 ? member.address_line1 + (member.address_line2 ? ', ' + member.address_line2 : '') + ', ' + (member.city || '') + ', ' + (member.state || '') + ' ' + (member.zip || '') : '—'}</Text></Box>
            </SimpleGrid>
          </Section>

          <Section title="Membership" defaultOpen={true}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              <Box>
                <Text fontSize="sm" fontWeight={600} color="#6B6560" mb={2}>Tier</Text>
                <Select value={member.membership_tier || ''} onChange={function (e) { updateField('membership_tier', e.target.value); }} bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" h="44px" fontSize="sm" _focus={{ borderColor: '#C4A265' }}>
                  <option value="">Not set</option>
                  <option value="standard">Standard</option>
                  <option value="junior">Junior</option>
                  <option value="executive">Executive</option>
                  <option value="corporate">Corporate</option>
                </Select>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} color="#6B6560" mb={2}>Status</Text>
                <Select value={member.status || 'active'} onChange={function (e) { updateField('status', e.target.value); }} bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" h="44px" fontSize="sm" _focus={{ borderColor: '#C4A265' }}>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={600} color="#6B6560" mb={2}>Physician</Text>
                <Select value={member.physician_id || ''} onChange={function (e) { updateField('physician_id', e.target.value || null); }} bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" h="44px" fontSize="sm" _focus={{ borderColor: '#C4A265' }}>
                  <option value="">Unassigned</option>
                  {physicians.map(function (p) { return <option key={p.id} value={p.id}>{p.name}</option>; })}
                </Select>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mt={5}>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Start date</Text><Text fontSize="md" color="#2D2D2D">{member.membership_start || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Renewal</Text><Text fontSize="md" color="#2D2D2D">{member.membership_renewal || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Annual fee</Text><Text fontSize="md" color="#2D2D2D">{member.annual_fee ? '$' + Number(member.annual_fee).toLocaleString() : '—'}</Text></Box>
            </SimpleGrid>
          </Section>

          <Section title="Insurance" defaultOpen={false}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Type</Text><Text fontSize="md" color="#2D2D2D">{member.insurance_type || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Carrier</Text><Text fontSize="md" color="#2D2D2D">{member.insurance_carrier || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Policy number</Text><Text fontSize="md" color="#2D2D2D">{member.insurance_policy_number || '—'}</Text></Box>
            </SimpleGrid>
          </Section>

          <Section title="Medical information" defaultOpen={false}>
            <SimpleGrid columns={1} spacing={4}>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Allergies</Text><Text fontSize="md" color="#2D2D2D">{member.allergies || 'None listed'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Current medications</Text><Text fontSize="md" color="#2D2D2D">{member.current_medications || 'None listed'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Medical conditions</Text><Text fontSize="md" color="#2D2D2D">{member.medical_conditions || 'None listed'}</Text></Box>
            </SimpleGrid>
          </Section>

          <Section title="Emergency contact" defaultOpen={false}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Name</Text><Text fontSize="md" color="#2D2D2D">{member.emergency_contact_name || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Phone</Text><Text fontSize="md" color="#2D2D2D">{member.emergency_contact_phone || '—'}</Text></Box>
              <Box><Text fontSize="sm" fontWeight={600} color="#6B6560" mb={1}>Relationship</Text><Text fontSize="md" color="#2D2D2D">{member.emergency_contact_relationship || '—'}</Text></Box>
            </SimpleGrid>
          </Section>

          <Section title="Documents" icon={HiOutlineDocumentText} defaultOpen={true}>
            <Flex gap={3} mb={5} flexWrap="wrap">
              <Select value={uploadCategory} onChange={function (e) { setUploadCategory(e.target.value); }} bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" h="40px" fontSize="sm" w="auto" _focus={{ borderColor: '#C4A265' }}>
                {docCategories.map(function (c) { return <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>; })}
              </Select>
              <Button onClick={function () { fileRef.current.click(); }} size="sm" bg="#1B3A34" color="white" borderRadius="8px" leftIcon={<HiOutlineUpload size={16} />} _hover={{ bg: '#234840' }} isLoading={uploading} loadingText="Uploading...">Upload document</Button>
              <input ref={fileRef} type="file" onChange={handleDocUpload} style={{ display: 'none' }} />
            </Flex>
            {documents.length === 0 ? (
              <Text fontSize="md" color="#9A9590">No documents yet.</Text>
            ) : (
              <VStack spacing={3} align="stretch">
                {documents.map(function (d) {
                  return (
                    <Flex key={d.id} bg="#FAFAF7" borderRadius="8px" p={4} justify="space-between" align="center" border="1px solid" borderColor="#E8E2D8">
                      <Flex align="center" gap={3}>
                        <HiOutlineDocumentText size={20} color="#6B6560" />
                        <Box>
                          <Text fontSize="md" fontWeight={500} color="#2D2D2D">{d.file_name}</Text>
                          <Text fontSize="xs" color="#9A9590">{d.category.replace(/_/g, ' ')} &middot; {new Date(d.created_at).toLocaleDateString()}</Text>
                        </Box>
                      </Flex>
                      <Flex gap={2}>
                        <Button as="a" href={d.file_url} target="_blank" size="xs" variant="outline" borderRadius="6px" borderColor="#E8E2D8" color="#6B6560" _hover={{ bg: '#F0EDE8' }}>View</Button>
                        <Button onClick={function () { deleteDocument(d); }} size="xs" variant="outline" borderRadius="6px" borderColor="#E8E2D8" color="#E53E3E" _hover={{ bg: '#FFF5F5' }}><HiOutlineTrash size={14} /></Button>
                      </Flex>
                    </Flex>
                  );
                })}
              </VStack>
            )}
          </Section>
        </Box>

        <Box w={{ base: '100%', lg: '320px' }} flexShrink={0}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={6} mb={5}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={4}>Notes</Text>
            <Textarea value={notes} onChange={function (e) { setNotes(e.target.value); }} placeholder="Internal notes..." rows={6} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} mb={4} />
            <Button onClick={saveNotes} bg="#1B3A34" color="white" borderRadius="8px" size="sm" w="100%" _hover={{ bg: '#234840' }} isLoading={saving}>Save notes</Button>
          </Box>

          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={6}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={4}>Email history</Text>
            {emails.length === 0 ? (
              <Text fontSize="md" color="#9A9590">No emails sent yet.</Text>
            ) : (
              <VStack spacing={3} align="stretch">
                {emails.slice(0, 10).map(function (e) {
                  return (
                    <Box key={e.id} borderBottom="1px solid" borderColor="#F0EDE8" pb={3}>
                      <Text fontSize="sm" fontWeight={500} color="#2D2D2D">{e.subject}</Text>
                      <Text fontSize="xs" color="#9A9590">{new Date(e.created_at).toLocaleString()}</Text>
                    </Box>
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

export default MemberDetail;
