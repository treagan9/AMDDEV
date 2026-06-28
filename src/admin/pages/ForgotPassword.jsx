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
import useAuth from '../lib/useAuth.jsx';

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
          {sent ? (
            <VStack spacing={5} textAlign="center">
              <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D">Check your email</Text>
              <Text fontSize="md" color="#6B6560" lineHeight={1.8}>We sent a password reset link to {email}. Click the link to set a new password.</Text>
              <ChakraLink as={Link} to="/answersmd-admin/" fontSize="md" color="#C4A265" fontWeight={600} mt={4}>Back to sign in</ChakraLink>
            </VStack>
          ) : (
            <>
              <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Reset password</Text>
              <Text fontSize="md" color="#6B6560" mb={10} textAlign="center">Enter your email and we'll send a reset link</Text>
              <form onSubmit={handleSubmit}>
                <VStack spacing={5} align="stretch">
                  <Box>
                    <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Email</Text>
                    <Input name="email" type="email" value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="you@example.com" required {...inputStyles} />
                  </Box>
                  <Box pt={2}>
                    <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="56px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Sending...">Send reset link</Button>
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

export default ForgotPassword;
