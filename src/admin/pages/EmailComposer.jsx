// src/admin/pages/EmailComposer.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Text,
  Input,
  Textarea,
  Button,
  Select,
  Badge,
  useToast,
  Collapse
} from '@chakra-ui/react';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';
import { HiOutlineMail, HiOutlineEye, HiOutlinePaperAirplane, HiOutlineTemplate, HiOutlineUsers } from 'react-icons/hi';

var inputStyles = {
  bg: '#FAFAF7', border: '1px solid', borderColor: '#D5D0C8', borderRadius: '8px',
  fontSize: 'md', color: '#2D2D2D', h: '48px', px: 4,
  _placeholder: { color: '#9B9488' }, _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

var QUICK_TEMPLATES = [
  { name: 'Results ready', subject: 'Your results are ready', body: 'Hi {{first_name}},\n\nYour recent test results are now available. Everything looks great and we wanted to share the good news.\n\nIf you\'d like to review the details together, we\'re happy to schedule a quick call at your convenience.\n\nWarm regards,\nYour AnswersMD Care Team' },
  { name: 'Appointment reminder', subject: 'Upcoming appointment reminder', body: 'Hi {{first_name}},\n\nJust a friendly reminder about your upcoming appointment. We look forward to seeing you.\n\nIf you need to reschedule, just give us a call or text your physician directly.\n\nSee you soon,\nYour AnswersMD Care Team' },
  { name: 'Follow-up', subject: 'Checking in on you', body: 'Hi {{first_name}},\n\nWe wanted to follow up after your recent visit and see how you\'re feeling. Your health and comfort are always our priority.\n\nIf you have any questions or concerns, don\'t hesitate to reach out. We\'re here for you 24/7.\n\nTake care,\nYour AnswersMD Care Team' },
  { name: 'Welcome', subject: 'Welcome to AnswersMD', body: 'Hi {{first_name}},\n\nWelcome to the AnswersMD family. We\'re thrilled to have you as a member.\n\nYour physician is looking forward to getting to know you during your welcome visit. In the meantime, remember you have 24/7 direct access via call, text or video.\n\nWelcome aboard,\nYour AnswersMD Care Team' },
  { name: 'Annual physical', subject: 'Time for your annual physical', body: 'Hi {{first_name}},\n\nIt\'s been about a year since your last comprehensive physical and we\'d love to get your next one on the calendar.\n\nYour annual exam is one of the most valuable parts of your membership. We\'ll review everything, run updated labs and make sure you\'re on track with your health goals.\n\nGive us a call or text to schedule.\n\nTo your health,\nYour AnswersMD Care Team' }
];

function EmailComposer() {
  var toast = useToast();
  var { teamMember } = useAuth();

  var [mode, setMode] = useState('individual');
  var [members, setMembers] = useState([]);
  var [selectedMember, setSelectedMember] = useState('');
  var [subject, setSubject] = useState('');
  var [body, setBody] = useState('');
  var [sending, setSending] = useState(false);
  var [previewing, setPreviewing] = useState(false);
  var [search, setSearch] = useState('');

  useEffect(function () {
    supabase.from('members').select('id, first_name, last_name, email').eq('status', 'active').order('last_name').then(function (r) {
      setMembers(r.data || []);
    });
  }, []);

  function applyTemplate(template) {
    setSubject(template.subject);
    setBody(template.body);
  }

  function getPreviewHtml(recipientName) {
    var name = recipientName || 'there';
    var processedBody = body.replace(/\{\{first_name\}\}/g, name);
    return '<!DOCTYPE html><html><head><meta charset="utf-8"></head>'
      + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
      + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:48px 16px;"><tr><td align="center">'
      + '<table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">'
      + '<tr><td align="center" style="padding-bottom:32px;"><img src="https://dev.answersmd.com/logo-dark.png" alt="AnswersMD" height="36" /></td></tr>'
      + '<tr><td style="background:#FFFFFF;border-radius:18px;border:1px solid #E8E2D8;padding:40px;">'
      + '<div style="font-size:16px;color:#2D2D2D;line-height:1.7;white-space:pre-wrap;">' + processedBody.replace(/\n/g, '<br>') + '</div>'
      + '</td></tr>'
      + '<tr><td align="center" style="padding-top:32px;"><p style="margin:0 0 4px;font-size:12px;color:#9A9590;">AnswersMD</p><p style="margin:0;font-size:12px;color:#9A9590;">813-727-3233 &middot; info@answersmd.com</p></td></tr>'
      + '</table></td></tr></table></body></html>';
  }

  async function sendEmail() {
    if (!subject || !body) {
      toast({ title: 'Please fill in subject and message', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    setSending(true);
    try {
      var recipients = [];
      if (mode === 'individual') {
        var member = members.find(function (m) { return m.id === selectedMember; });
        if (!member) throw new Error('Please select a patient');
        recipients = [member];
      } else {
        recipients = members.filter(function (m) { return m.email; });
        if (recipients.length === 0) throw new Error('No patients with email addresses');
      }

      var batchId = mode === 'all' ? crypto.randomUUID() : null;

      for (var i = 0; i < recipients.length; i++) {
        var r = recipients[i];
        var html = getPreviewHtml(r.first_name);
        var processedSubject = subject.replace(/\{\{first_name\}\}/g, r.first_name);

        var response = await fetch('/.netlify/functions/send-patient-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: r.email, subject: processedSubject, html: html })
        });

        if (!response.ok) {
          console.error('Failed to send to ' + r.email);
        }

        await supabase.from('email_sends').insert({
          sent_by: teamMember ? teamMember.id : null,
          recipient_email: r.email, recipient_name: r.first_name + ' ' + r.last_name,
          member_id: r.id, subject: processedSubject, body_html: html,
          status: response.ok ? 'sent' : 'failed',
          is_bulk: mode === 'all', bulk_batch_id: batchId
        });
      }

      toast({ title: mode === 'all' ? 'Sent to ' + recipients.length + ' patients' : 'Email sent', status: 'success', duration: 4000, position: 'top' });
      setSubject('');
      setBody('');
      setSelectedMember('');
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setSending(false);
  }

  var filteredMembers = search ? members.filter(function (m) {
    return (m.first_name + ' ' + m.last_name + ' ' + m.email).toLowerCase().includes(search.toLowerCase());
  }) : members;

  return (
    <Box>
      <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D" mb={2}>Compose email</Text>
      <Text fontSize="md" color="#6B6560" mb={8}>Send branded emails to patients individually or in bulk.</Text>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        <Box flex={1}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={8} mb={6}>
            <Flex gap={3} mb={6}>
              <Button size="sm" borderRadius="8px" bg={mode === 'individual' ? '#2D2D2D' : 'white'} color={mode === 'individual' ? 'white' : '#6B6560'} border="1px solid" borderColor={mode === 'individual' ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setMode('individual'); }} leftIcon={<HiOutlineMail size={16} />} _hover={{ bg: mode === 'individual' ? '#2D2D2D' : '#F0EDE8' }}>Individual</Button>
              <Button size="sm" borderRadius="8px" bg={mode === 'all' ? '#2D2D2D' : 'white'} color={mode === 'all' ? 'white' : '#6B6560'} border="1px solid" borderColor={mode === 'all' ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setMode('all'); }} leftIcon={<HiOutlineUsers size={16} />} _hover={{ bg: mode === 'all' ? '#2D2D2D' : '#F0EDE8' }}>All patients</Button>
            </Flex>

            {mode === 'individual' && (
              <Box mb={6}>
                <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Send to</Text>
                <Select value={selectedMember} onChange={function (e) { setSelectedMember(e.target.value); }} {...inputStyles}>
                  <option value="">Select a patient</option>
                  {filteredMembers.map(function (m) {
                    return <option key={m.id} value={m.id}>{m.first_name} {m.last_name} ({m.email})</option>;
                  })}
                </Select>
              </Box>
            )}

            {mode === 'all' && (
              <Box mb={6} bg="#FFF8ED" borderRadius="8px" p={4} border="1px solid" borderColor="#E8DFC8">
                <Text fontSize="sm" fontWeight={500} color="#8A6D3B">This will send to all {members.filter(function (m) { return m.email; }).length} active patients with email addresses.</Text>
              </Box>
            )}

            <VStack spacing={5} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Subject</Text>
                <Input value={subject} onChange={function (e) { setSubject(e.target.value); }} placeholder="Email subject line" {...inputStyles} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Message</Text>
                <Text fontSize="xs" color="#9A9590" mb={2}>Use {'{{first_name}}'} to personalize</Text>
                <Textarea value={body} onChange={function (e) { setBody(e.target.value); }} placeholder="Write your message..." rows={12} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
              </Box>
            </VStack>

            <Flex gap={3} mt={6}>
              <Button onClick={function () { setPreviewing(!previewing); }} variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" leftIcon={<HiOutlineEye size={16} />} _hover={{ bg: '#F0EDE8' }}>{previewing ? 'Hide preview' : 'Preview'}</Button>
              <Button onClick={sendEmail} bg="#1B3A34" color="white" borderRadius="8px" leftIcon={<HiOutlinePaperAirplane size={16} />} _hover={{ bg: '#234840' }} isLoading={sending} loadingText="Sending..." flex={1}>
                {mode === 'all' ? 'Send to all patients' : 'Send email'}
              </Button>
            </Flex>
          </Box>

          <Collapse in={previewing}>
            <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={8}>
              <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mb={4}>Email preview</Text>
              <Box borderRadius="8px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
                <Box bg="#FAFAF7" px={4} py={3} borderBottom="1px solid" borderColor="#E8E2D8">
                  <Text fontSize="sm" color="#6B6560">Subject: <Text as="span" fontWeight={500} color="#2D2D2D">{subject || '(no subject)'}</Text></Text>
                </Box>
                <Box p={0} dangerouslySetInnerHTML={{ __html: getPreviewHtml('Jane') }} />
              </Box>
            </Box>
          </Collapse>
        </Box>

        <Box w={{ base: '100%', lg: '300px' }} flexShrink={0}>
          <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={6}>
            <Flex align="center" gap={2} mb={5}>
              <HiOutlineTemplate size={18} color="#6B6560" />
              <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">Quick templates</Text>
            </Flex>
            <VStack spacing={2} align="stretch">
              {QUICK_TEMPLATES.map(function (t) {
                return (
                  <Box key={t.name} px={4} py={3} borderRadius="8px" cursor="pointer" _hover={{ bg: '#F0EDE8' }} transition="background 0.15s ease" onClick={function () { applyTemplate(t); }}>
                    <Text fontSize="md" fontWeight={500} color="#2D2D2D">{t.name}</Text>
                    <Text fontSize="sm" color="#9A9590" noOfLines={1}>{t.subject}</Text>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default EmailComposer;
