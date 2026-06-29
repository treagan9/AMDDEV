// src/admin/pages/Marketing.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  Image,
  Badge,
  Select,
  useToast
} from '@chakra-ui/react';
import supabase from '../lib/supabase.jsx';
import useAuth from '../lib/useAuth.jsx';
import { HiOutlinePaperClip, HiOutlineEye, HiOutlinePaperAirplane } from 'react-icons/hi';

var inputStyles = {
  bg: 'white', border: '1px solid', borderColor: '#E8E2D8', borderRadius: '8px',
  fontSize: 'sm', color: '#2D2D2D', h: '42px', px: 4,
  _placeholder: { color: '#B5AD9E' }, _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

function Marketing() {
  var [subject, setSubject] = useState('');
  var [body, setBody] = useState('');
  var [recipient, setRecipient] = useState('all');
  var [attachment, setAttachment] = useState(null);
  var [attachmentUrl, setAttachmentUrl] = useState(null);
  var [uploading, setUploading] = useState(false);
  var [sending, setSending] = useState(false);
  var [preview, setPreview] = useState(false);
  var [members, setMembers] = useState([]);
  var [leads, setLeads] = useState([]);
  var [sentHistory, setSentHistory] = useState([]);
  var { teamMember } = useAuth();
  var toast = useToast();
  var fileRef = useRef(null);

  useEffect(function () {
    fetchRecipients();
    fetchHistory();
  }, []);

  async function fetchRecipients() {
    var m = await supabase.from('members').select('id, first_name, last_name, email').order('first_name');
    setMembers(m.data || []);
    var l = await supabase.from('leads').select('id, first_name, last_name, email').order('first_name');
    setLeads(l.data || []);
  }

  async function fetchHistory() {
    var r = await supabase.from('email_sends').select('*').order('created_at', { ascending: false }).limit(10);
    setSentHistory(r.data || []);
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

  async function handleSend() {
    if (!subject.trim() || !body.trim()) {
      toast({ title: 'Subject and body are required', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    setSending(true);
    try {
      var recipients = [];
      if (recipient === 'all') {
        recipients = members.filter(function (m) { return m.email; }).concat(leads.filter(function (l) { return l.email; }));
      } else if (recipient === 'members') {
        recipients = members.filter(function (m) { return m.email; });
      } else if (recipient === 'leads') {
        recipients = leads.filter(function (l) { return l.email; });
      } else {
        var found = members.find(function (m) { return m.id === recipient; }) || leads.find(function (l) { return l.id === recipient; });
        if (found && found.email) recipients = [found];
      }

      if (recipients.length === 0) {
        toast({ title: 'No recipients with email addresses', status: 'error', duration: 3000, position: 'top' });
        setSending(false);
        return;
      }

      for (var i = 0; i < recipients.length; i++) {
        var r = recipients[i];
        var personalBody = body.replace(/\{\{first_name\}\}/g, r.first_name || '');
        await fetch('/.netlify/functions/send-patient-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: r.email,
            subject: subject,
            body: personalBody,
            attachment_url: attachmentUrl || null,
            attachment_name: attachment || null
          })
        });

        await supabase.from('email_sends').insert({
          recipient_email: r.email,
          recipient_name: r.first_name + ' ' + r.last_name,
          subject: subject,
          body: personalBody,
          attachment_url: attachmentUrl || null,
          sent_by: teamMember ? teamMember.id : null
        });
      }

      toast({ title: 'Sent to ' + recipients.length + ' recipient' + (recipients.length > 1 ? 's' : ''), status: 'success', duration: 3000, position: 'top' });
      setSubject('');
      setBody('');
      setAttachment(null);
      setAttachmentUrl(null);
      setRecipient('all');
      fetchHistory();
    } catch (err) {
      toast({ title: 'Send failed', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setSending(false);
  }

  return (
    <Box>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        <Box flex={1} minW="0">
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
            <Box px={5} py={4} borderBottom="1px solid" borderColor="#E8E2D8">
              <Text fontSize="md" fontWeight={700} color="#2D2D2D">New campaign</Text>
            </Box>
            <Box px={5} py={5}>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="#6B6560" mb={2} letterSpacing="0.5px" textTransform="uppercase">To</Text>
                  <Select value={recipient} onChange={function (e) { setRecipient(e.target.value); }} bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" h="42px" fontSize="sm">
                    <option value="all">All contacts</option>
                    <option value="members">All members</option>
                    <option value="leads">All leads</option>
                    <optgroup label="Members">
                      {members.map(function (m) { return <option key={m.id} value={m.id}>{m.first_name} {m.last_name} ({m.email})</option>; })}
                    </optgroup>
                    <optgroup label="Leads">
                      {leads.map(function (l) { return <option key={l.id} value={l.id}>{l.first_name} {l.last_name} ({l.email})</option>; })}
                    </optgroup>
                  </Select>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="#6B6560" mb={2} letterSpacing="0.5px" textTransform="uppercase">Subject</Text>
                  <Input value={subject} onChange={function (e) { setSubject(e.target.value); }} placeholder="Email subject line..." {...inputStyles} />
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={600} color="#6B6560" mb={2} letterSpacing="0.5px" textTransform="uppercase">Body</Text>
                  <Text fontSize="xs" color="#B5AD9E" mb={2}>Use {'{{first_name}}'} to personalize</Text>
                  <Textarea value={body} onChange={function (e) { setBody(e.target.value); }} placeholder="Write your message..." rows={8} resize="vertical" bg="white" border="1px solid" borderColor="#E8E2D8" borderRadius="8px" fontSize="sm" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#B5AD9E' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
                </Box>
                <Flex align="center" gap={3} flexWrap="wrap">
                  <Button onClick={function () { fileRef.current.click(); }} size="sm" variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" _hover={{ bg: '#F0EDE8' }} leftIcon={<HiOutlinePaperClip size={14} />} fontSize="sm" isLoading={uploading} loadingText="Uploading...">Attach file</Button>
                  {attachment && (
                    <Flex align="center" gap={2} bg="#F0EDE8" borderRadius="6px" px={3} py={1.5}>
                      <Text fontSize="xs" color="#2D2D2D" fontWeight={500}>{attachment}</Text>
                      <Box cursor="pointer" onClick={function () { setAttachment(null); setAttachmentUrl(null); }} color="#9A9590" _hover={{ color: '#2D2D2D' }}>&times;</Box>
                    </Flex>
                  )}
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" onChange={handleAttachment} style={{ display: 'none' }} />
                </Flex>
                <Flex gap={3} pt={2}>
                  <Button onClick={handleSend} bg="#1B3A34" color="white" borderRadius="8px" size="md" fontSize="sm" _hover={{ bg: '#234840' }} isLoading={sending} loadingText="Sending..." flex={1}>Send campaign</Button>
                </Flex>
              </VStack>
            </Box>
          </Box>
        </Box>

        <Box w={{ base: '100%', lg: '300px' }} flexShrink={0}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
            <Box px={5} py={4} borderBottom="1px solid" borderColor="#E8E2D8">
              <Text fontSize="md" fontWeight={700} color="#2D2D2D">Recent sends</Text>
            </Box>
            {sentHistory.length === 0 ? (
              <Box px={5} py={8} textAlign="center"><Text fontSize="sm" color="#9A9590">No campaigns sent yet.</Text></Box>
            ) : (
              <VStack spacing={0} align="stretch">
                {sentHistory.map(function (send) {
                  return (
                    <Box key={send.id} px={5} py={3} borderBottom="1px solid" borderColor="#F0EDE8">
                      <Text fontSize="sm" fontWeight={500} color="#2D2D2D" noOfLines={1}>{send.subject}</Text>
                      <Text fontSize="xs" color="#9A9590">{send.recipient_name} &middot; {new Date(send.created_at).toLocaleDateString()}</Text>
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

export default Marketing;
