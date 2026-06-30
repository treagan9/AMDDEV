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
          toast({ title: 'Username not found', status: 'error', duration: 4000, position: 'top' });
          setSubmitting(false);
          return;
        }
        email = result.data.email;
      }
      await signIn(email, password);
      navigate('/answersmd-admin/dashboard/');
    } catch (err) {
      toast({ title: 'Check your credentials and try again.', status: 'error', duration: 4000, position: 'top' });
    }
    setSubmitting(false);
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#FAFAF7" px={6}>
      <Box w="100%" maxW="420px">
        <Flex justify="center" mb={10}>
          <ChakraLink as={Link} to="/">
            <Image src="/logo-dark.webp" alt="AnswersMD" h={{ base: '48px', md: '56px' }} objectFit="contain" />
          </ChakraLink>
        </Flex>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Input
              name="identifier"
              autoComplete="username"
              value={identifier}
              onChange={function (e) { setIdentifier(e.target.value); }}
              placeholder="Username or email"
              required
              bg="white"
              border="1px solid"
              borderColor="#D5D0C8"
              borderRadius="8px"
              fontSize="md"
              color="#2D2D2D"
              h="54px"
              px={5}
              _placeholder={{ color: '#B5AD9E' }}
              _hover={{ borderColor: '#C4A265' }}
              _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }}
            />
            <InputGroup>
              <Input
                name="password"
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={function (e) { setPassword(e.target.value); }}
                placeholder="Password"
                required
                bg="white"
                border="1px solid"
                borderColor="#D5D0C8"
                borderRadius="8px"
                fontSize="md"
                color="#2D2D2D"
                h="54px"
                px={5}
                pr={14}
                _placeholder={{ color: '#B5AD9E' }}
                _hover={{ borderColor: '#C4A265' }}
                _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }}
              />
              <InputRightElement h="54px" w="50px">
                <Box cursor="pointer" onClick={function () { setShowPassword(!showPassword); }} color="#9A9590" _hover={{ color: '#2D2D2D' }} transition="color 0.2s ease">
                  {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                </Box>
              </InputRightElement>
            </InputGroup>
            <Button
              type="submit"
              bg="#1B3A34"
              color="white"
              borderRadius="8px"
              fontSize="md"
              fontWeight={600}
              w="100%"
              h="54px"
              mt={2}
              isLoading={submitting}
              loadingText="Signing in..."
              _hover={{ bg: '#234840', transform: 'translateY(-2px)', shadow: '0 8px 24px rgba(27, 58, 52, 0.2)' }}
              _active={{ transform: 'translateY(0)' }}
              transition="all 0.3s ease"
            >Sign in</Button>
          </VStack>
        </form>

        <Flex justify="space-between" mt={6}>
          <ChakraLink as={Link} to="/answersmd-admin/forgot-password/" fontSize="sm" color="#9A9590" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Forgot password?</ChakraLink>
          <ChakraLink as={Link} to="/answersmd-admin/request-account/" fontSize="sm" color="#9A9590" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Request access</ChakraLink>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Login;
