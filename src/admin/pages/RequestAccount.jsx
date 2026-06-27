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
  h: '54px',
  px: 4,
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
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        reason: form.reason || null
      });
      if (result.error) throw result.error;
      setSubmitted(true);
    } catch (err) {
      toast({ title: 'Something went wrong', description: err.message || 'Please try again.', status: 'error', duration: 4000, position: 'top' });
    }
    setSubmitting(false);
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#FAFAF7" px={6}>
      <Box w="100%" maxW="400px">
        <Flex justify="center" mb={10}>
          <Image src="/logo-dark.png" alt="AnswersMD" h="40px" objectFit="contain" />
        </Flex>
        <Box bg="white" borderRadius="18px" p={{ base: 8, md: 10 }} border="1px solid" borderColor="#E8E2D8">
          {submitted ? (
            <VStack spacing={4} textAlign="center">
              <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="#2D2D2D">Request submitted</Text>
              <Text fontSize="md" color="#6B6560" lineHeight={1.8}>An admin will review your request and you'll receive an email when your account is ready.</Text>
              <ChakraLink as={Link} to="/answersmd-admin/" fontSize="md" color="#C4A265" fontWeight={600} mt={4}>Back to sign in</ChakraLink>
            </VStack>
          ) : (
            <>
              <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Request access</Text>
              <Text fontSize="md" color="#6B6560" mb={8} textAlign="center">Submit a request and an admin will set up your account</Text>
              <form onSubmit={handleSubmit}>
                <VStack spacing={5} align="stretch">
                  <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" required {...inputStyles} />
                  <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" required {...inputStyles} />
                  <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" required {...inputStyles} />
                  <Textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Why do you need access? (optional)" rows={3} resize="none" bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" py={4} px={4} _placeholder={{ color: '#9B9488' }} _hover={{ borderColor: '#C4A265' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
                  <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="54px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Submitting...">Submit request</Button>
                </VStack>
              </form>
              <Flex justify="center" mt={6}>
                <ChakraLink as={Link} to="/answersmd-admin/" fontSize="md" color="#6B6560" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Back to sign in</ChakraLink>
              </Flex>
            </>
          )}
        </Box>
        <Text fontSize="sm" color="#9A9590" textAlign="center" mt={8}>AnswersMD Pulse</Text>
      </Box>
    </Flex>
  );
}

export default RequestAccount;
