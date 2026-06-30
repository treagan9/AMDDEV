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
      <Box bg="brand.mist" py={{ base: 14, md: 20 }}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }} textAlign="center">
          <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" mb={3}>You are on the list.</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.8}>We will be in touch with updates and wellness insights.</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="brand.mist" py={{ base: 14, md: 20 }}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <Box maxW={{ lg: '64%' }} mx="auto" textAlign={{ base: 'left', md: 'center' }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Stay connected</Text>
          <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={3}>Wellness insights from our physicians</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8} maxW="480px" mx={{ md: 'auto' }}>Health tips, practice updates and membership availability delivered to your inbox.</Text>

          <form onSubmit={handleSubmit}>
            <Flex gap={3} direction={{ base: 'column', sm: 'row' }} maxW="520px" mx={{ md: 'auto' }}>
              <Input value={firstName} onChange={function (e) { setFirstName(e.target.value); }} placeholder="First name" bg="white" border="1px solid" borderColor="brand.border" borderRadius="btn" h="52px" px={5} fontSize="md" _focus={{ borderColor: 'brand.champagne', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#B5AD9E' }} />
              <Input value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="Email address" type="email" required bg="white" border="1px solid" borderColor="brand.border" borderRadius="btn" h="52px" px={5} fontSize="md" flex={1.4} _focus={{ borderColor: 'brand.champagne', boxShadow: '0 0 0 1px #C4A265' }} _placeholder={{ color: '#B5AD9E' }} />
              <Button type="submit" variant="primary" h="52px" px={8} flexShrink={0} isLoading={submitting} loadingText="..." borderRadius="btn">Subscribe</Button>
            </Flex>
            <Text fontSize="xs" color="brand.warmGray" mt={3} textAlign={{ base: 'left', md: 'center' }}>No spam. Unsubscribe anytime.</Text>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default FooterSignup;
