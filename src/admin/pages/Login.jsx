// src/admin/pages/Login.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Image,
  Link as ChakraLink,
  useToast
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

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

function Login() {
  var [identifier, setIdentifier] = useState('');
  var [password, setPassword] = useState('');
  var [showPassword, setShowPassword] = useState(false);
  var [submitting, setSubmitting] = useState(false);
  var { signIn } = useAuth();
  var navigate = useNavigate();
  var toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      var email = identifier;

      if (!identifier.includes('@')) {
        var result = await supabase.from('team_members').select('email').eq('username', identifier.toLowerCase()).single();
        if (result.error || !result.data) {
          toast({ title: 'Username not found', description: 'Check your username and try again.', status: 'error', duration: 4000, position: 'top' });
          setSubmitting(false);
          return;
        }
        email = result.data.email;
      }

      await signIn(email, password);
      navigate('/answersmd-admin/dashboard/');
    } catch (err) {
      toast({ title: 'Sign in failed', description: err.message || 'Check your credentials and try again.', status: 'error', duration: 4000, position: 'top' });
    }
    setSubmitting(false);
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#FAFAF7" px={{ base: 0, md: 6 }}>
      <Box w="100%" maxW={{ base: '100%', md: '480px' }}>
        <Flex justify="center" mb={{ base: 0, md: 10 }}>
          <ChakraLink as={Link} to="/">
            <Image src="/logo-dark.png" alt="AnswersMD" h={{ base: '36px', md: '48px' }} objectFit="contain" />
          </ChakraLink>
        </Flex>
        <Box bg={{ base: '#FAFAF7', md: 'white' }} borderRadius={{ base: '0', md: '24px' }} p={{ base: 6, md: 12 }} border={{ base: 'none', md: '1px solid' }} borderColor="#E8E2D8">
          <Box display={{ base: 'flex', md: 'none' }} justifyContent="center" mb={8}>
            <ChakraLink as={Link} to="/">
              <Image src="/logo-dark.png" alt="AnswersMD" h="36px" objectFit="contain" />
            </ChakraLink>
          </Box>
          <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Welcome back</Text>
          <Text fontSize="md" color="#6B6560" mb={10} textAlign="center">Sign in to your account</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Username or email</Text>
                <Input name="identifier" autoComplete="username" value={identifier} onChange={function (e) { setIdentifier(e.target.value); }} placeholder="Username or email" required {...inputStyles} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Password</Text>
                <InputGroup>
                  <Input name="password" autoComplete="current-password" type={showPassword ? 'text' : 'password'} value={password} onChange={function (e) { setPassword(e.target.value); }} placeholder="Enter your password" required bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" h="56px" px={5} pr={14} _placeholder={{ color: '#9B9488' }} _hover={{ borderColor: '#C4A265' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
                  <InputRightElement h="56px" w="50px">
                    <Box cursor="pointer" onClick={function () { setShowPassword(!showPassword); }} color="#9A9590" _hover={{ color: '#2D2D2D' }} transition="color 0.2s ease">
                      {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box pt={2}>
                <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="56px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Signing in...">Sign in</Button>
              </Box>
            </VStack>
          </form>
          <Flex justify="space-between" mt={8}>
            <ChakraLink as={Link} to="/answersmd-admin/forgot-password/" fontSize="md" color="#6B6560" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Forgot password?</ChakraLink>
            <ChakraLink as={Link} to="/answersmd-admin/request-account/" fontSize="md" color="#6B6560" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Request access</ChakraLink>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
