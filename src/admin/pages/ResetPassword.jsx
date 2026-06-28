// src/admin/pages/ResetPassword.jsx
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
  h: '56px',
  px: 5,
  _placeholder: { color: '#9B9488' },
  _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

function ResetPassword() {
  var [password, setPassword] = useState('');
  var [confirm, setConfirm] = useState('');
  var [submitting, setSubmitting] = useState(false);
  var { updatePassword } = useAuth();
  var navigate = useNavigate();
  var toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: 'Passwords don\'t match', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    if (password.length < 8) {
      toast({ title: 'Password must be at least 8 characters', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    setSubmitting(true);
    try {
      await updatePassword(password);
      toast({ title: 'Password updated', description: 'You can now sign in with your new password.', status: 'success', duration: 4000, position: 'top' });
      navigate('/answersmd-admin/');
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
          <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Set new password</Text>
          <Text fontSize="md" color="#6B6560" mb={10} textAlign="center">Choose a strong password for your account</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>New password</Text>
                <Input type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} placeholder="Minimum 8 characters" required {...inputStyles} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Confirm password</Text>
                <Input type="password" value={confirm} onChange={function (e) { setConfirm(e.target.value); }} placeholder="Enter password again" required {...inputStyles} />
              </Box>
              <Box pt={2}>
                <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="56px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Updating...">Update password</Button>
              </Box>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default ResetPassword;
