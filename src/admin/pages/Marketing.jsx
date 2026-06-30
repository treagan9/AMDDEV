// src/admin/pages/Marketing.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Text,
  Input,
  Textarea,
  Button,
  Badge,
  Select,
  Image,
  Checkbox,
  useToast
} from '@chakra-ui/react';
import supabase from '../lib/supabase.jsx';
import useAuth from '../lib/useAuth.jsx';
import TEMPLATES from '../lib/emailTemplates.js';
import { HiOutlinePaperClip, HiOutlineEye, HiOutlineArrowLeft, HiOutlineX, HiOutlineSearch, HiOutlineTrash, HiOutlinePencil, HiOutlineCheck } from 'react-icons/hi';

var inputStyles = {
  bg: 'white', border: '1px solid', borderColor: '#E8E2D8', borderRadius: '8px',
  fontSize: 'sm', color: '#2D2D2D', h: '42px', px: 4,
  _placeholder: { color: '#B5AD9E' }, _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

function TemplateCard({ template, onClick }) {
  return (
    <Box bg="white" borderRadius="14px" border="1px solid" borderColor="#E8E2D8" p={5} cursor="pointer" onClick={onClick} _hover={{ borderColor: '#C4A265', shadow: '0 4px 16px rgba(0,0,0,0.06)' }} transition="all 0.2s ease">
      <Flex align="center" gap={3} mb={3}>
        <Flex w="32px" h="32px" borderRadius="8px" bg={template.color + '14'} align="center" justify="center" flexShrink={0}>
          <Box w="10px" h="10px" borderRadius="full" bg={template.color} />
        </Flex>
        <Badge bg="#F0EDE8" color="#6B6560" borderRadius="full" px={2} py={0.5} fontSize="10px">{template.category}</Badge>
      </Flex>
      <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={1}>{template.name}</Text>
      <Text fontSize="xs" color="#9A9590" lineHeight={1.5}>{template.description}</Text>
    </Box>
  );
}

function PreviewModal({ subject, body, attachmentName, onClose, onSend, sending }) {
  var previewBody = body.replace(/\{\{first_name\}\}/g, 'Sarah').replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  return (
    <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(0,0,0,0.5)" zIndex={200} display="flex" alignItems="center" justifyContent="center" px={4}>
      <Box bg="#FAFAF7" borderRadius="18px" maxW="640px" w="100%" maxH="90vh" overflow="auto">
        <Flex align="center" justify="space-between" px={5} py={4} borderBottom="1px solid" borderColor="#E8E2D8" position="sticky" top={0} bg="#FAFAF7" zIndex={1} borderRadius="18px 18px 0 0">
          <Text fontSize="md" fontWeight={700} color="#2D2D2D">Preview</Text>
          <Flex gap={2}>
            <Button onClick={onSend} size="sm" bg="#1B3A34" color="white" borderRadius="8px" _hover={{ bg: '#234840' }} isLoading={sending} loadingText="Sending..." fontSize="sm">Send campaign</Button>
            <Flex w="32px" h="32px" borderRadius="8px" align="center" justify="center" cursor="pointer" onClick={onClose} color="#6B6560" _hover={{ bg: '#E8E2D8' }}><HiOutlineX size={18} /></Flex>
          </Flex>
        </Flex>
        <Box px={5} py={4}>
          <Text fontSize="xs" color="#9A9590" mb={1}>Subject</Text>
          <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={5}>{subject}</Text>
          <Box borderRadius="12px" overflow="hidden" border="1px solid" borderColor="#E8E2D8">
            <Image src="/social/home.png" alt="AnswersMD" w="100%" />
            <Box bg="white" px={{ base: 5, md: 8 }} py={8}>
              <Box fontSize="md" color="#3D3832" lineHeight={1.8} dangerouslySetInnerHTML={{ __html: previewBody }} />
              {attachmentName && (
                <Flex mt={5} bg="#FAFAF7" borderRadius="8px" border="1px solid" borderColor="#E8E2D8" px={4} py={3} align="center" gap={2}>
                  <Text fontSize="xs" color="#2D2D2D" fontWeight={500}>{'\uD83D\uDCCE'} {attachmentName}</Text>
                </Flex>
              )}
            </Box>
            <Box bg="#2A2A2A" px={{ base: 5, md: 8 }} py={6} borderRadius="0 0 12px 12px">
              <Text fontSize="xs" color="whiteAlpha.700" mb={1}>AnswersMD - Concierge Medicine, Simplified.</Text>
              <Text fontSize="xs" color="whiteAlpha.500">Tampa - St. Petersburg - Boca Raton</Text>
              <Text fontSize="xs" color="whiteAlpha.400" mt={3} textDecoration="underline">Unsubscribe</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function EditableRow({ item, type, onSave, onDelete }) {
  var [editing, setEditing] = useState(false);
  var [firstName, setFirstName] = useState(item.first_name || '');
  var [email, setEmail] = useState(item.email || '');

  function handleSave() {
    onSave(item.id, { first_name: firstName.trim(), email: email.trim().toLowerCase() });
    setEditing(false);
  }

  if (editing) {
    return (
      <Flex align="center" gap={2} px={5} py={3} borderBottom="1px solid" borderColor="#F0EDE8" bg="#FAFAF7">
        <Input value={firstName} onChange={function (e) { setFirstName(e.target.value); }} placeholder="Name" bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="6px" h="36px" px={3} fontSize="sm" w="140px" flexShrink={0} />
        <Input value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="Email" bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="6px" h="36px" px={3} fontSize="sm" flex={1} />
        <Flex gap={1}>
          <Flex w="32px" h="32px" borderRadius="6px" align="center" justify="center" cursor="pointer" onClick={handleSave} color="#22C55E" _hover={{ bg: '#F0EDE8' }}><HiOutlineCheck size={16} /></Flex>
          <Flex w="32px" h="32px" borderRadius="6px" align="center" justify="center" cursor="pointer" onClick={function () { setEditing(false); }} color="#9A9590" _hover={{ bg: '#F0EDE8' }}><HiOutlineX size={16} /></Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex align="center" gap={3} px={5} py={3} borderBottom="1px solid" borderColor="#F0EDE8" _hover={{ bg: '#FAFAF7' }} transition="background 0.15s ease">
      <Box flex={1} minW="0">
        <Text fontSize="sm" fontWeight={500} color="#2D2D2D">{item.first_name || '\u2014'}{type === 'lead' && item.last_name ? ' ' + item.last_name : ''}</Text>
        <Text fontSize="xs" color="#9A9590" noOfLines={1}>{item.email}{item.source ? ' \u00B7 ' + item.source : ''}</Text>
      </Box>
      <Text fontSize="xs" color="#B5AD9E" display={{ base: 'none', md: 'block' }}>{new Date(item.created_at || item.subscribed_at).toLocaleDateString()}</Text>
      <Flex gap={1}>
        <Flex w="28px" h="28px" borderRadius="6px" align="center" justify="center" cursor="pointer" onClick={function () { setEditing(true); }} color="#9A9590" _hover={{ bg: '#F0EDE8', color: '#6B6560' }} transition="all 0.15s ease"><HiOutlinePencil size={14} /></Flex>
        <Flex w="28px" h="28px" borderRadius="6px" align="center" justify="center" cursor="pointer" onClick={function () { onDelete(item.id); }} color="#9A9590" _hover={{ bg: '#F0EDE8', color: '#E85D5D' }} transition="all 0.15s ease"><HiOutlineTrash size={14} /></Flex>
      </Flex>
    </Flex>
  );
}

function Marketing() {
  var [view, setView] = useState('grid');
  var [activeTemplate, setActiveTemplate] = useState(null);
  var [subject, setSubject] = useState('');
  var [body, setBody] = useState('');
  var [recipient, setRecipient] = useState('all');
  var [attachment, setAttachment] = useState(null);
  var [attachmentUrl, setAttachmentUrl] = useState(null);
  var [uploading, setUploading] = useState(false);
  var [sending, setSending] = useState(false);
  var [showPreview, setShowPreview] = useState(false);
  var [members, setMembers] = useState([]);
  var [leads, setLeads] = useState([]);
  var [subscribers, setSubscribers] = useState([]);
  var [campaigns, setCampaigns] = useState([]);
  var [tab, setTab] = useState('templates');
  var [listSearch, setListSearch] = useState('');
  var { teamMember } = useAuth();
  var toast = useToast();
  var fileRef = useRef(null);

  useEffect(function () { fetchData(); }, []);

  async function fetchData() {
    var m = await supabase.from('members').select('id, first_name, last_name, email, created_at').order('first_name');
    setMembers(m.data || []);
    var l = await supabase.from('leads').select('id, first_name, last_name, email, source, created_at').order('created_at', { ascending: false });
    setLeads(l.data || []);
    var s = await supabase.from('email_subscribers').select('*').is('unsubscribed_at', null).order('created_at', { ascending: false });
    setSubscribers(s.data || []);
    var c = await supabase.from('email_campaigns').select('*').order('created_at', { ascending: false }).limit(20);
    setCampaigns(c.data || []);
  }

  function selectTemplate(template) {
    setActiveTemplate(template);
    supabase.from('email_templates').select('*').eq('slug', template.slug).single().then(function (result) {
      if (result.data && result.data.subject_default) {
        setSubject(result.data.subject_default);
        setBody(result.data.body_default);
      } else {
        setSubject(template.subjectDefault || '');
        setBody(template.bodyDefault || '');
      }
    });
    setView('compose');
  }

  function resetComposer() {
    setView('grid');
    setActiveTemplate(null);
    setSubject('');
    setBody('');
    setAttachment(null);
    setAttachmentUrl(null);
    setRecipient('all');
  }

  async function handleAttachment(e) {
    var file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      var path = 'marketing/' + Date.now() + '-' + file.name;
      var result = await supabase.storage.from('site-images').upload(path, file, { upsert: true });
      if (result.error) throw result.error;
      var url = supabase.storage.from('site-images').getPublicUrl(path);
      setAttachment(file.name);
      setAttachmentUrl(url.data.publicUrl);
    } catch (err) {
      toast({ title: 'Upload failed', description: err.message, status: 'error', duration: 3000, position: 'top' });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function saveSubscriber(id, updates) {
    await supabase.from('email_subscribers').update(updates).eq('id', id);
    toast({ title: 'Updated', status: 'success', duration: 2000, position: 'top' });
    fetchData();
  }

  async function deleteSubscriber(id) {
    await supabase.from('email_subscribers').update({ unsubscribed_at: new Date().toISOString() }).eq('id', id);
    toast({ title: 'Removed', status: 'success', duration: 2000, position: 'top' });
    fetchData();
  }

  async function saveLead(id, updates) {
    await supabase.from('leads').update(updates).eq('id', id);
    toast({ title: 'Updated', status: 'success', duration: 2000, position: 'top' });
    fetchData();
  }

  async function deleteLead(id) {
    await supabase.from('leads').delete().eq('id', id);
    toast({ title: 'Deleted', status: 'success', duration: 2000, position: 'top' });
    fetchData();
  }

  function filterList(items) {
    if (!listSearch) return items;
    var s = listSearch.toLowerCase();
    return items.filter(function (item) {
      return ((item.first_name || '') + ' ' + (item.last_name || '') + ' ' + (item.email || '')).toLowerCase().includes(s);
    });
  }

  function getRecipients() {
    var all = [];
    var seen = {};
    function addUnique(list) {
      list.forEach(function (item) {
        if (item.email && !seen[item.email.toLowerCase()]) {
          seen[item.email.toLowerCase()] = true;
          all.push(item);
        }
      });
    }
    if (recipient === 'all') {
      addUnique(members);
      addUnique(leads);
      addUnique(subscribers.map(function (s) { return { email: s.email, first_name: s.first_name, last_name: '' }; }));
    } else if (recipient === 'members') {
      addUnique(members);
    } else if (recipient === 'leads') {
      addUnique(leads);
    } else if (recipient === 'subscribers') {
      addUnique(subscribers.map(function (s) { return { email: s.email, first_name: s.first_name, last_name: '' }; }));
    } else {
      var found = members.find(function (m) { return m.id === recipient; }) || leads.find(function (l) { return l.id === recipient; });
      if (found) all.push(found);
    }
    return all;
  }

  async function handleSend() {
    if (!subject.trim() || !body.trim()) {
      toast({ title: 'Subject and body are required', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    var recipients = getRecipients();
    if (recipients.length === 0) {
      toast({ title: 'No recipients found', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    setSending(true);
    try {
      var campaignResult = await supabase.from('email_campaigns').insert({
        template_slug: activeTemplate ? activeTemplate.slug : null,
        subject: subject, body: body, attachment_url: attachmentUrl, attachment_name: attachment,
        audience: recipient, sent_by: teamMember ? teamMember.id : null,
        sent_at: new Date().toISOString(), recipient_count: recipients.length, status: 'sent'
      }).select().single();
      var campaignId = campaignResult.data ? campaignResult.data.id : null;

      for (var i = 0; i < recipients.length; i++) {
        var r = recipients[i];
        var personalBody = body.replace(/\{\{first_name\}\}/g, r.first_name || 'there');
        var subResult = await supabase.from('email_subscribers').select('unsubscribe_token').eq('email', r.email.toLowerCase()).single();
        var unsubUrl = subResult.data ? 'https://dev.answersmd.com/.netlify/functions/unsubscribe?token=' + subResult.data.unsubscribe_token : '';

        await fetch('/.netlify/functions/send-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: r.email, subject: subject, body: personalBody, attachment_url: attachmentUrl, attachment_name: attachment, unsubscribe_url: unsubUrl })
        });
        await supabase.from('email_sends').insert({
          recipient_email: r.email, recipient_name: (r.first_name || '') + ' ' + (r.last_name || ''),
          subject: subject, body: personalBody, attachment_url: attachmentUrl,
          sent_by: teamMember ? teamMember.id : null, campaign_id: campaignId
        });
      }

      toast({ title: 'Sent to ' + recipients.length + ' recipient' + (recipients.length > 1 ? 's' : ''), status: 'success', duration: 4000, position: 'top' });
      setShowPreview(false);
      resetComposer();
      fetchData();
    } catch (err) {
      toast({ title: 'Send failed', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setSending(false);
  }

  var recipientCount = getRecipients().length;
  var filteredSubscribers = filterList(subscribers);
  var filteredLeads = filterList(leads.filter(function (l) { return l.email; }));

  return (
    <Box>
      {view === 'grid' && (
        <>
          <Flex bg="white" borderRadius="10px" border="1px solid" borderColor="#E8E2D8" overflow="hidden" mb={6} w="fit-content" flexWrap="wrap">
            {['templates', 'subscribers', 'leads', 'sent'].map(function (t) {
              var isActive = tab === t;
              var label = t.charAt(0).toUpperCase() + t.slice(1);
              var count = t === 'subscribers' ? subscribers.length : t === 'leads' ? leads.filter(function (l) { return l.email; }).length : t === 'sent' ? campaigns.length : 0;
              return (
                <Box key={t} px={{ base: 4, md: 5 }} py={2.5} cursor="pointer" bg={isActive ? '#2D2D2D' : 'transparent'} color={isActive ? 'white' : '#6B6560'} fontSize="sm" fontWeight={600} onClick={function () { setTab(t); setListSearch(''); }} transition="all 0.15s ease">
                  {label}
                  {count > 0 && <Badge ml={2} bg={isActive ? 'whiteAlpha.300' : '#E8E2D8'} color={isActive ? 'white' : '#9A9590'} borderRadius="full" px={1.5} fontSize="10px">{count}</Badge>}
                </Box>
              );
            })}
          </Flex>

          {tab === 'templates' && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {TEMPLATES.map(function (t) {
                return <TemplateCard key={t.slug} template={t} onClick={function () { selectTemplate(t); }} />;
              })}
            </SimpleGrid>
          )}

          {tab === 'subscribers' && (
            <Box>
              <Flex gap={3} mb={4} flexWrap="wrap">
                <Box position="relative" flex={1} minW="200px">
                  <Box position="absolute" left={4} top="50%" transform="translateY(-50%)" color="#9A9590" zIndex={1}><HiOutlineSearch size={16} /></Box>
                  <Input value={listSearch} onChange={function (e) { setListSearch(e.target.value); }} placeholder="Search subscribers..." bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" h="42px" pl={10} pr={4} fontSize="sm" _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#B5AD9E' }} />
                </Box>
                <Text fontSize="sm" color="#9A9590" alignSelf="center">{filteredSubscribers.length} subscriber{filteredSubscribers.length !== 1 ? 's' : ''}</Text>
              </Flex>
              <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
                {filteredSubscribers.length === 0 ? (
                  <Box px={5} py={10} textAlign="center"><Text fontSize="sm" color="#9A9590">No subscribers yet. They will appear here when people join from the footer.</Text></Box>
                ) : (
                  <VStack spacing={0} align="stretch">
                    {filteredSubscribers.map(function (sub) {
                      return <EditableRow key={sub.id} item={sub} type="subscriber" onSave={saveSubscriber} onDelete={deleteSubscriber} />;
                    })}
                  </VStack>
                )}
              </Box>
            </Box>
          )}

          {tab === 'leads' && (
            <Box>
              <Flex gap={3} mb={4} flexWrap="wrap">
                <Box position="relative" flex={1} minW="200px">
                  <Box position="absolute" left={4} top="50%" transform="translateY(-50%)" color="#9A9590" zIndex={1}><HiOutlineSearch size={16} /></Box>
                  <Input value={listSearch} onChange={function (e) { setListSearch(e.target.value); }} placeholder="Search leads..." bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" h="42px" pl={10} pr={4} fontSize="sm" _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#B5AD9E' }} />
                </Box>
                <Text fontSize="sm" color="#9A9590" alignSelf="center">{filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''} with email</Text>
              </Flex>
              <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
                {filteredLeads.length === 0 ? (
                  <Box px={5} py={10} textAlign="center"><Text fontSize="sm" color="#9A9590">No leads with email addresses yet.</Text></Box>
                ) : (
                  <VStack spacing={0} align="stretch">
                    {filteredLeads.map(function (lead) {
                      return <EditableRow key={lead.id} item={lead} type="lead" onSave={saveLead} onDelete={deleteLead} />;
                    })}
                  </VStack>
                )}
              </Box>
            </Box>
          )}

          {tab === 'sent' && (
            <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
              {campaigns.length === 0 ? (
                <Box px={5} py={10} textAlign="center"><Text fontSize="sm" color="#9A9590">No campaigns sent yet.</Text></Box>
              ) : (
                <VStack spacing={0} align="stretch">
                  {campaigns.map(function (c) {
                    return (
                      <Flex key={c.id} align="center" justify="space-between" px={5} py={4} borderBottom="1px solid" borderColor="#F0EDE8">
                        <Box minW="0" flex={1}>
                          <Text fontSize="sm" fontWeight={500} color="#2D2D2D" noOfLines={1}>{c.subject}</Text>
                          <Text fontSize="xs" color="#9A9590">{c.recipient_count} recipient{c.recipient_count > 1 ? 's' : ''} &middot; {c.audience} &middot; {new Date(c.sent_at || c.created_at).toLocaleDateString()}</Text>
                        </Box>
                        <Badge colorScheme={c.status === 'sent' ? 'green' : 'gray'} borderRadius="full" px={2} py={0.5} fontSize="10px" textTransform="capitalize">{c.status}</Badge>
                      </Flex>
                    );
                  })}
                </VStack>
              )}
            </Box>
          )}
        </>
      )}

      {view === 'compose' && (
        <Box>
          <Flex align="center" gap={3} mb={6}>
            <Flex w="32px" h="32px" borderRadius="8px" align="center" justify="center" cursor="pointer" onClick={resetComposer} color="#6B6560" _hover={{ bg: '#F0EDE8' }}><HiOutlineArrowLeft size={18} /></Flex>
            {activeTemplate && <Text fontSize="md" fontWeight={600} color="#2D2D2D">{activeTemplate.name}</Text>}
          </Flex>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
            <Box flex={1} minW="0">
              <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={5}>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="#6B6560" mb={2} letterSpacing="0.5px" textTransform="uppercase">To</Text>
                    <Select value={recipient} onChange={function (e) { setRecipient(e.target.value); }} bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" h="42px" fontSize="sm">
                      <option value="all">All contacts ({members.length + leads.length + subscribers.length})</option>
                      <option value="members">Members ({members.length})</option>
                      <option value="leads">Leads ({leads.length})</option>
                      <option value="subscribers">Subscribers ({subscribers.length})</option>
                      <optgroup label="Individual members">{members.map(function (m) { return <option key={m.id} value={m.id}>{m.first_name} {m.last_name}</option>; })}</optgroup>
                      <optgroup label="Individual leads">{leads.map(function (l) { return <option key={l.id} value={l.id}>{l.first_name} {l.last_name}</option>; })}</optgroup>
                    </Select>
                    <Text fontSize="xs" color="#B5AD9E" mt={1}>{recipientCount} recipient{recipientCount !== 1 ? 's' : ''}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="#6B6560" mb={2} letterSpacing="0.5px" textTransform="uppercase">Subject</Text>
                    <Input value={subject} onChange={function (e) { setSubject(e.target.value); }} placeholder="Email subject..." {...inputStyles} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} color="#6B6560" mb={2} letterSpacing="0.5px" textTransform="uppercase">Body</Text>
                    <Textarea value={body} onChange={function (e) { setBody(e.target.value); }} rows={12} resize="vertical" bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" fontSize="sm" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#B5AD9E' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
                    <Text fontSize="xs" color="#B5AD9E" mt={1}>{'{{first_name}}'} will be replaced with each recipient's name</Text>
                  </Box>
                  <Flex align="center" gap={3} flexWrap="wrap">
                    <Button onClick={function () { fileRef.current.click(); }} size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" _hover={{ bg: '#F0EDE8' }} leftIcon={<HiOutlinePaperClip size={14} />} fontSize="sm" isLoading={uploading}>Attach</Button>
                    {attachment && (
                      <Flex align="center" gap={2} bg="#F0EDE8" borderRadius="6px" px={3} py={1.5}>
                        <Text fontSize="xs" color="#2D2D2D" fontWeight={500}>{attachment}</Text>
                        <Box cursor="pointer" onClick={function () { setAttachment(null); setAttachmentUrl(null); }} color="#9A9590" _hover={{ color: '#2D2D2D' }} fontSize="sm">&times;</Box>
                      </Flex>
                    )}
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" onChange={handleAttachment} style={{ display: 'none' }} />
                  </Flex>
                  <Flex gap={3} pt={2}>
                    <Button onClick={function () { setShowPreview(true); }} size="md" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" _hover={{ bg: '#F0EDE8' }} leftIcon={<HiOutlineEye size={16} />} fontSize="sm" flex={1}>Preview</Button>
                    <Button onClick={handleSend} size="md" bg="#1B3A34" color="white" borderRadius="8px" _hover={{ bg: '#234840' }} isLoading={sending} loadingText="Sending..." fontSize="sm" flex={1}>Send</Button>
                  </Flex>
                </VStack>
              </Box>
            </Box>
            <Box w={{ base: '100%', lg: '260px' }} flexShrink={0}>
              <Box bg="white" borderRadius="14px" border="1px solid" borderColor="#E8E2D8" p={5}>
                <Text fontSize="xs" fontWeight={600} color="#6B6560" mb={3} letterSpacing="0.5px" textTransform="uppercase">Template info</Text>
                {activeTemplate && (
                  <VStack spacing={3} align="stretch">
                    <Flex align="center" gap={2}>
                      <Box w="8px" h="8px" borderRadius="full" bg={activeTemplate.color} />
                      <Text fontSize="sm" fontWeight={500} color="#2D2D2D">{activeTemplate.name}</Text>
                    </Flex>
                    <Text fontSize="xs" color="#9A9590" lineHeight={1.5}>{activeTemplate.description}</Text>
                    <Badge bg="#F0EDE8" color="#6B6560" borderRadius="full" px={2} py={0.5} fontSize="10px" w="fit-content">{activeTemplate.category}</Badge>
                  </VStack>
                )}
              </Box>
            </Box>
          </Flex>
        </Box>
      )}

      {showPreview && (
        <PreviewModal subject={subject} body={body} attachmentName={attachment} onClose={function () { setShowPreview(false); }} onSend={handleSend} sending={sending} />
      )}
    </Box>
  );
}

export default Marketing;
