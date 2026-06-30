// src/components/FooterSignup.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';

function FooterSignup() {
  var [email, setEmail] = useState('');
  var [firstName, setFirstName] = useState('');
  var [submitting, setSubmitting] = useState(false);
  var [submitted, setSubmitted] = useState(false);
  var toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      var result = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), first_name: firstName.trim(), source: 'footer' })
      });
      if (!result.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch (err) {
      toast({ title: 'Something went wrong. Please try again.', status: 'error', duration: 3000, position: 'top' });
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <Box bg="#F0EDE8" py={{ base: 16, md: 20 }}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }} textAlign="center">
          <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={3}>You are on the list.</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="#3D3832" lineHeight={1.8}>We will be in touch with updates and wellness insights.</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="#F0EDE8" py={{ base: 16, md: 20 }}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <Box maxW="720px" mx="auto">
          <Box textAlign="center" mb={{ base: 8, md: 10 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="#C4A265" mb={4}>Stay connected</Text>
            <Text fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="#2D2D2D" lineHeight={1.15} mb={4}>Wellness insights from our physicians</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="#3D3832" lineHeight={1.8}>Health tips, practice updates and membership availability delivered to your inbox.</Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <Flex display={{ base: 'none', md: 'flex' }} gap={3} maxW="600px" mx="auto">
              <Input
                value={firstName}
                onChange={function (e) { setFirstName(e.target.value); }}
                placeholder="First name"
                bg="white"
                border="1px solid"
                borderColor="#D5D0C8"
                borderRadius="8px"
                h="54px"
                px={5}
                fontSize="md"
                color="#2D2D2D"
                w="180px"
                flexShrink={0}
                _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }}
                _placeholder={{ color: '#B5AD9E' }}
              />
              <Input
                value={email}
                onChange={function (e) { setEmail(e.target.value); }}
                placeholder="Email address"
                type="email"
                required
                bg="white"
                border="1px solid"
                borderColor="#D5D0C8"
                borderRadius="8px"
                h="54px"
                px={5}
                fontSize="md"
                color="#2D2D2D"
                flex={1}
                _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }}
                _placeholder={{ color: '#B5AD9E' }}
              />
              <Button
                type="submit"
                bg="#1B3A34"
                color="white"
                borderRadius="8px"
                h="54px"
                px={8}
                fontSize="md"
                fontWeight={600}
                flexShrink={0}
                isLoading={submitting}
                loadingText="..."
                _hover={{ bg: '#234840', transform: 'translateY(-2px)', shadow: '0 8px 24px rgba(27, 58, 52, 0.2)' }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.3s ease"
              >Join</Button>
            </Flex>

            <Box display={{ base: 'block', md: 'none' }}>
              <Input
                value={firstName}
                onChange={function (e) { setFirstName(e.target.value); }}
                placeholder="First name"
                bg="white"
                border="1px solid"
                borderColor="#D5D0C8"
                borderRadius="8px"
                h="52px"
                px={5}
                fontSize="md"
                color="#2D2D2D"
                w="100%"
                mb={3}
                _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }}
                _placeholder={{ color: '#B5AD9E' }}
              />
              <Input
                value={email}
                onChange={function (e) { setEmail(e.target.value); }}
                placeholder="Email address"
                type="email"
                required
                bg="white"
                border="1px solid"
                borderColor="#D5D0C8"
                borderRadius="8px"
                h="52px"
                px={5}
                fontSize="md"
                color="#2D2D2D"
                w="100%"
                mb={3}
                _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }}
                _placeholder={{ color: '#B5AD9E' }}
              />
              <Button
                type="submit"
                bg="#1B3A34"
                color="white"
                borderRadius="8px"
                h="52px"
                w="100%"
                fontSize="md"
                fontWeight={600}
                isLoading={submitting}
                loadingText="..."
                _hover={{ bg: '#234840' }}
                transition="all 0.3s ease"
              >Join</Button>
            </Box>

            <Text fontSize="xs" color="#9A9590" mt={4} textAlign="center">No spam. Unsubscribe anytime.</Text>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default FooterSignup;
