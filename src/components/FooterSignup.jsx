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
      if (!result.ok) throw new Error('Failed to subscribe');
      setSubmitted(true);
      setEmail('');
      setFirstName('');
    } catch (err) {
      toast({ title: 'Something went wrong', description: 'Please try again.', status: 'error', duration: 3000, position: 'top' });
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <Box bg="brand.ivory" py={{ base: 12, md: 16 }}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }} textAlign="center">
          <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={3}>You are on the list.</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.8}>We will be in touch with updates and wellness insights.</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="brand.ivory" py={{ base: 12, md: 16 }}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} justify="space-between" gap={{ base: 6, md: 12 }} maxW={{ lg: '70%' }} mx="auto">
          <Box flex={1}>
            <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={2}>Stay connected</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.7}>Health insights and practice updates from our physicians.</Text>
          </Box>
          <Box w={{ base: '100%', md: 'auto' }}>
            <form onSubmit={handleSubmit}>
              <Flex gap={2} direction={{ base: 'column', sm: 'row' }}>
                <Input value={firstName} onChange={function (e) { setFirstName(e.target.value); }} placeholder="First name" bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" h="48px" px={4} fontSize="md" w={{ base: '100%', sm: '140px' }} _focus={{ borderColor: 'brand.champagne', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#9B9488' }} />
                <Input value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="Email address" type="email" required bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" h="48px" px={4} fontSize="md" w={{ base: '100%', sm: '220px' }} _focus={{ borderColor: 'brand.champagne', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#9B9488' }} />
                <Button type="submit" variant="primary" size="lg" h="48px" px={8} flexShrink={0} isLoading={submitting} loadingText="...">Subscribe</Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default FooterSignup;
