// src/admin/pages/Login.jsx
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
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../lib/useAuth.jsx';

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

function Login() {
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [submitting, setSubmitting] = useState(false);
  var { signIn } = useAuth();
  var navigate = useNavigate();
  var toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate('/answersmd-admin/dashboard/');
    } catch (err) {
      toast({ title: 'Sign in failed', description: err.message || 'Check your credentials and try again.', status: 'error', duration: 4000, position: 'top' });
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
          <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Welcome back</Text>
          <Text fontSize="md" color="#6B6560" mb={8} textAlign="center">Sign in to Pulse</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
              <Input name="email" type="email" value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="Email address" required {...inputStyles} />
              <Input name="password" type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} placeholder="Password" required {...inputStyles} />
              <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="54px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Signing in...">Sign in</Button>
            </VStack>
          </form>
          <Flex justify="space-between" mt={6}>
            <ChakraLink as={Link} to="/answersmd-admin/forgot-password/" fontSize="md" color="#6B6560" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Forgot password?</ChakraLink>
            <ChakraLink as={Link} to="/answersmd-admin/request-account/" fontSize="md" color="#6B6560" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Request access</ChakraLink>
          </Flex>
        </Box>
        <Text fontSize="sm" color="#9A9590" textAlign="center" mt={8}>AnswersMD Pulse</Text>
      </Box>
    </Flex>
  );
}

export default Login;
