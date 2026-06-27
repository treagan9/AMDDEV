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
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
    <Flex minH="100vh" align="center" justify="center" bg="#FAFAF7" px={6}>
      <Box w="100%" maxW="400px">
        <Flex justify="center" mb={10}>
          <Image src="/logo-dark.png" alt="AnswersMD" h="40px" objectFit="contain" />
        </Flex>
        <Box bg="white" borderRadius="18px" p={{ base: 8, md: 10 }} border="1px solid" borderColor="#E8E2D8">
          <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="#2D2D2D" mb={2} textAlign="center">Set new password</Text>
          <Text fontSize="md" color="#6B6560" mb={8} textAlign="center">Choose a strong password for your account</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
              <Input type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} placeholder="New password" required {...inputStyles} />
              <Input type="password" value={confirm} onChange={function (e) { setConfirm(e.target.value); }} placeholder="Confirm password" required {...inputStyles} />
              <Button type="submit" bg="#1B3A34" color="white" borderRadius="8px" size="lg" fontSize="md" w="100%" h="54px" _hover={{ bg: '#234840' }} isLoading={submitting} loadingText="Updating...">Update password</Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default ResetPassword;
