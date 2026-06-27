// src/admin/pages/ForgotPassword.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Button,
  Image,
  Link as ChakraLink,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useAuth from '../lib/useAuth';

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

function ForgotPassword() {
  var [email, setEmail] = useState('');
  var [sent, setSent] = useState(false);
  var [submitting, setSubmitting] = useState(false);
  var { resetPassword } = useAuth();
  var toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      toast({ title: 'Error', description: err.message || 'Something went wrong.', status: 'error', duration: 4000, position: 'top' });
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
          {sent ? (
            <VStack spacing={4} textAlign="center">
              <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="#2D2D2D">Check your email</Text>
              <Text fontSize="md" color="#6B6560" lineHeight={1.8}>We sent a password reset link to {email}. Click the link to set a new password.</Text>
              <ChakraLink as={Link} to="/answersmd-admin/" fontSize="md" color="#C4A265" fontWeight={600} mt={4}>Back to sign in</ChakraLink>
            </VStack>
          ) : (
            <>
              <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Reset password</Text>
              <Text fontSize="md" color="#6B6560" mb={8} textAlign="center">Enter your email and we'll send a reset link</Text>
              <form onSubmit={handleSubmit}>
                <VStack spacing={5} align="stretch">
                  <Input name="email" type="email" value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="Email address" required {...inputStyles} />
                  <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="54px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Sending...">Send reset link</Button>
                </VStack>
              </form>
              <Flex justify="center" mt={6}>
                <ChakraLink as={Link} to="/answersmd-admin/" fontSize="md" color="#6B6560" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Back to sign in</ChakraLink>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
