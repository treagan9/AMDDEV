// src/admin/pages/RequestAccount.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  Image,
  Link as ChakraLink,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase.jsx';

var inputStyles = {
  bg: 'white',
  border: '1px solid',
  borderColor: '#D5D0C8',
  borderRadius: '8px',
  fontSize: 'md',
  color: '#2D2D2D',
  h: '56px',
  px: 5,
  _placeholder: { color: '#9B9488' },
  _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

function RequestAccount() {
  var [form, setForm] = useState({ firstName: '', lastName: '', email: '', reason: '' });
  var [submitted, setSubmitted] = useState(false);
  var [submitting, setSubmitting] = useState(false);
  var toast = useToast();

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    setForm(function (prev) { return Object.assign({}, prev, { [name]: value }); });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      var result = await supabase.from('account_requests').insert({
        first_name: form.firstName, last_name: form.lastName,
        email: form.email, reason: form.reason || null
      });
      if (result.error) throw result.error;

      await fetch('/.netlify/functions/send-patient-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'admin@answersmd.com',
          subject: 'Account Request from ' + form.firstName + ' ' + form.lastName,
          html: '<!DOCTYPE html><html><head><meta charset="utf-8"></head>'
            + '<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">'
            + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:48px 16px;"><tr><td align="center">'
            + '<table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">'
            + '<tr><td align="center" style="padding-bottom:32px;"><img src="https://dev.answersmd.com/logo-dark.webp" alt="AnswersMD" height="36" /></td></tr>'
            + '<tr><td style="background:#FFFFFF;border-radius:18px;border:1px solid #E8E2D8;padding:40px;">'
            + '<p style="margin:0 0 4px;font-size:12px;color:#C4A265;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Account Request</p>'
            + '<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#2D2D2D;">' + form.firstName + ' ' + form.lastName + '</h1>'
            + '<table width="100%" cellpadding="0" cellspacing="0">'
            + '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#6B6560;font-size:13px;width:30%;">Email</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE8;color:#2D2D2D;font-weight:500;font-size:14px;"><a href="mailto:' + form.email + '" style="color:#C4A265;">' + form.email + '</a></td></tr>'
            + (form.reason ? '<tr><td style="padding:10px 0;color:#6B6560;font-size:13px;">Reason</td><td style="padding:10px 0;color:#2D2D2D;font-weight:500;font-size:14px;">' + form.reason + '</td></tr>' : '')
            + '</table>'
            + '<div style="margin-top:24px;"><a href="https://dev.answersmd.com/answersmd-admin/settings/" style="display:inline-block;background:#1B3A34;color:#FFFFFF;font-size:14px;font-weight:500;text-decoration:none;padding:12px 28px;border-radius:8px;">Review in Settings</a></div>'
            + '</td></tr>'
            + '<tr><td align="center" style="padding-top:32px;"><p style="margin:0;font-size:11px;color:#9A9590;">AnswersMD &middot; ' + new Date().toLocaleDateString() + '</p></td></tr>'
            + '</table></td></tr></table></body></html>'
        })
      });

      setSubmitted(true);
    } catch (err) {
      toast({ title: 'Something went wrong', description: err.message || 'Please try again.', status: 'error', duration: 4000, position: 'top' });
    }
    setSubmitting(false);
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#FAFAF7" px={{ base: 0, md: 6 }}>
      <Box w="100%" maxW={{ base: '100%', md: '480px' }}>
        <Flex justify="center" mb={{ base: 0, md: 10 }} display={{ base: 'none', md: 'flex' }}>
          <ChakraLink as={Link} to="/">
            <Image src="/logo-dark.webp" alt="AnswersMD" h="48px" objectFit="contain" />
          </ChakraLink>
        </Flex>
        <Box bg={{ base: '#FAFAF7', md: 'white' }} borderRadius={{ base: '0', md: '24px' }} p={{ base: 6, md: 12 }} border={{ base: 'none', md: '1px solid' }} borderColor="#E8E2D8">
          <Box display={{ base: 'flex', md: 'none' }} justifyContent="center" mb={8}>
            <ChakraLink as={Link} to="/">
              <Image src="/logo-dark.webp" alt="AnswersMD" h="36px" objectFit="contain" />
            </ChakraLink>
          </Box>
          {submitted ? (
            <VStack spacing={5} textAlign="center">
              <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D">Request submitted</Text>
              <Text fontSize="md" color="#6B6560" lineHeight={1.8}>An admin will review your request and you'll receive an email when your account is ready.</Text>
              <ChakraLink as={Link} to="/answersmd-admin/" fontSize="md" color="#C4A265" fontWeight={600} mt={4}>Back to sign in</ChakraLink>
            </VStack>
          ) : (
            <>
              <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Request access</Text>
              <Text fontSize="md" color="#6B6560" mb={10} textAlign="center">Submit a request and an admin will set up your account</Text>
              <form onSubmit={handleSubmit}>
                <VStack spacing={5} align="stretch">
                  <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                    <Box flex={1}>
                      <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>First name</Text>
                      <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" required {...inputStyles} />
                    </Box>
                    <Box flex={1}>
                      <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Last name</Text>
                      <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Smith" required {...inputStyles} />
                    </Box>
                  </Flex>
                  <Box>
                    <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Email</Text>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required {...inputStyles} />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Reason (optional)</Text>
                    <Textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Why do you need access?" rows={3} resize="none" bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" py={4} px={5} _placeholder={{ color: '#9B9488' }} _hover={{ borderColor: '#C4A265' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
                  </Box>
                  <Box pt={2}>
                    <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="56px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Submitting...">Submit request</Button>
                  </Box>
                </VStack>
              </form>
              <Flex justify="center" mt={8}>
                <ChakraLink as={Link} to="/answersmd-admin/" fontSize="md" color="#6B6560" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Back to sign in</ChakraLink>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default RequestAccount;
