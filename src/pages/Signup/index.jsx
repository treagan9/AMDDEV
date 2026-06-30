// src/pages/Signup/index.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Link as ChakraLink,
  Image,
  useToast
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

var MotionBox = motion(Box);

function formatPhone(value) {
  var digits = value.replace(/\D/g, '');
  if (digits.length > 10 && digits.charAt(0) === '1') digits = digits.substring(1);
  digits = digits.substring(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return '(' + digits;
  if (digits.length < 7) return '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
  return '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6);
}

var fieldStyles = {
  bg: 'white',
  border: '1px solid',
  borderColor: '#D5D0C8',
  borderRadius: '8px',
  fontSize: 'md',
  color: '#2D2D2D',
  h: '52px',
  px: 4,
  _placeholder: { color: '#B5AD9E' },
  _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

function MembershipOption({ label, description, selected, onClick }) {
  return (
    <Flex
      align="center"
      gap={4}
      py={5}
      px={5}
      bg={selected ? 'rgba(196, 162, 101, 0.06)' : 'white'}
      border="1px solid"
      borderColor={selected ? '#C4A265' : '#D5D0C8'}
      borderRadius="8px"
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s ease"
      _hover={{ borderColor: '#C4A265' }}
    >
      <Flex
        w="20px"
        h="20px"
        borderRadius="full"
        border="2px solid"
        borderColor={selected ? '#C4A265' : '#D5D0C8'}
        align="center"
        justify="center"
        flexShrink={0}
        transition="all 0.2s ease"
      >
        {selected && <Box w="10px" h="10px" borderRadius="full" bg="#C4A265" />}
      </Flex>
      <Box>
        <Text fontSize="md" color="#2D2D2D" fontWeight={selected ? 600 : 500}>{label}</Text>
        {description && <Text fontSize="sm" color="#9A9590" mt={0.5}>{description}</Text>}
      </Box>
    </Flex>
  );
}

function Signup() {
  var formLoadedAt = useRef(Date.now());
  var navigate = useNavigate();
  var toast = useToast();
  var [submitting, setSubmitting] = useState(false);
  var [submitted, setSubmitted] = useState(false);
  var [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    coverage: '', location: '', website: ''
  });

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    if (name === 'phone') value = formatPhone(value);
    setForm(function (prev) { return Object.assign({}, prev, { [name]: value }); });
  }

  function setCoverage(value) {
    setForm(function (prev) { return Object.assign({}, prev, { coverage: value }); });
  }

  function setLocation(value) {
    setForm(function (prev) { return Object.assign({}, prev, { location: value }); });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      var response = await fetch('/.netlify/functions/submit-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          coverage: form.coverage,
          location: form.location,
          website: form.website,
          formLoadedAt: formLoadedAt.current
        })
      });
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      toast({ title: 'Something went wrong', description: 'Please try again or call us at 813-727-3233.', status: 'error', duration: 5000, isClosable: true, position: 'top' });
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <>
        <Helmet><title>Welcome | AnswersMD&trade;</title></Helmet>
        <Box minH="100vh" bg="#FAFAF7" display="flex" alignItems="center" justifyContent="center" px={5}>
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} textAlign="center" maxW="520px">
            <Flex w="64px" h="64px" borderRadius="full" bg="#F0EDE8" align="center" justify="center" mx="auto" mb={6}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </Flex>
            <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" lineHeight={1.15} mb={4}>You're on your way</Text>
            <Text fontSize="md" color="#3D3832" lineHeight={1.8} mb={2}>Thank you, {form.firstName || 'there'}. A member of our team will reach out within one business day to schedule your consultation.</Text>
            <Text fontSize="md" color="#3D3832" lineHeight={1.8}>We look forward to welcoming you.</Text>
            <VStack spacing={3} mt={8}>
              <ChakraLink href="tel:8137273233" fontSize="lg" fontWeight={600} color="#2D2D2D" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">813-727-3233</ChakraLink>
              <ChakraLink as={Link} to="/" fontSize="md" fontWeight={500} color="#9A9590" _hover={{ color: '#2D2D2D' }} transition="color 0.2s ease">Back to AnswersMD</ChakraLink>
            </VStack>
          </MotionBox>
        </Box>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Join | AnswersMD&trade;</title>
        <meta name="description" content="Join AnswersMD concierge medicine. Direct access to your physician in Tampa, St. Petersburg and Boca Raton." />
      </Helmet>

      <Box minH="100vh" bg="#FAFAF7">
        {/* Header */}
        <Flex maxW="98%" mx="auto" px={{ base: 5, md: 4 }} py={5} justify="space-between" align="center">
          <ChakraLink as={Link} to="/">
            <Image src="/logo-dark.webp" alt="AnswersMD" h={{ base: '32px', md: '42px' }} objectFit="contain" />
          </ChakraLink>
          <ChakraLink as={Link} to="/" fontSize="sm" color="#9A9590" fontWeight={500} _hover={{ color: '#2D2D2D' }} transition="color 0.2s ease">Back to site</ChakraLink>
        </Flex>

        <Box maxW="560px" mx="auto" px={5} pt={{ base: 6, md: 12 }} pb={20}>
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            {/* Intro */}
            <Box textAlign="center" mb={{ base: 10, md: 12 }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="#C4A265" mb={4}>Become a member</Text>
              <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="#2D2D2D" lineHeight={1.08} mb={4}>Join AnswersMD</Text>
              <Text fontSize="md" color="#3D3832" lineHeight={1.8}>Tell us a little about yourself and we will reach out to schedule your complimentary consultation.</Text>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight={600} color="#2D2D2D" mb={2}>First name</FormLabel>
                    <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" {...fieldStyles} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight={600} color="#2D2D2D" mb={2}>Last name</FormLabel>
                    <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Smith" {...fieldStyles} />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight={600} color="#2D2D2D" mb={2}>Email</FormLabel>
                  <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" {...fieldStyles} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight={600} color="#2D2D2D" mb={2}>Phone</FormLabel>
                  <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" maxLength={16} {...fieldStyles} />
                </FormControl>

                {/* Membership type */}
                <Box>
                  <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={3}>Membership type</Text>
                  <VStack spacing={3}>
                    <MembershipOption label="Individual" description="Just me" selected={form.coverage === 'individual'} onClick={function () { setCoverage('individual'); }} />
                    <MembershipOption label="Couple" description="Me and a spouse or partner" selected={form.coverage === 'couple'} onClick={function () { setCoverage('couple'); }} />
                    <MembershipOption label="Family" description="Including children" selected={form.coverage === 'family'} onClick={function () { setCoverage('family'); }} />
                  </VStack>
                </Box>

                {/* Location */}
                <Box>
                  <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={3}>Preferred location</Text>
                  <SimpleGrid columns={3} spacing={3}>
                    {[{ v: 'tampa', l: 'Tampa' }, { v: 'st-pete', l: 'St. Pete' }, { v: 'boca-raton', l: 'Boca Raton' }].map(function (loc) {
                      var selected = form.location === loc.v;
                      return (
                        <Flex
                          key={loc.v}
                          align="center"
                          justify="center"
                          py={3}
                          bg={selected ? 'rgba(196, 162, 101, 0.06)' : 'white'}
                          border="1px solid"
                          borderColor={selected ? '#C4A265' : '#D5D0C8'}
                          borderRadius="8px"
                          cursor="pointer"
                          onClick={function () { setLocation(loc.v); }}
                          transition="all 0.2s ease"
                          _hover={{ borderColor: '#C4A265' }}
                        >
                          <Text fontSize="sm" fontWeight={selected ? 600 : 500} color={selected ? '#2D2D2D' : '#5C5650'}>{loc.l}</Text>
                        </Flex>
                      );
                    })}
                  </SimpleGrid>
                </Box>

                {/* Honeypot */}
                <Box position="absolute" left="-9999px" aria-hidden="true">
                  <Input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </Box>

                <Box pt={4}>
                  <Button
                    type="submit"
                    bg="#1B3A34"
                    color="white"
                    borderRadius="8px"
                    size="lg"
                    fontSize="md"
                    fontWeight={600}
                    w="100%"
                    h="54px"
                    isLoading={submitting}
                    loadingText="Submitting..."
                    _hover={{ bg: '#234840', transform: 'translateY(-2px)', shadow: '0 8px 24px rgba(27, 58, 52, 0.2)' }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.3s ease"
                  >Join AnswersMD</Button>
                </Box>

                <Text fontSize="xs" color="#9A9590" textAlign="center">We respond within one business day. Your information is never shared.</Text>

                <Text fontSize="sm" color="#9A9590" textAlign="center" pt={2}>
                  Have questions first?{' '}
                  <ChakraLink as={Link} to="/contact/" color="#2D2D2D" fontWeight={600} _hover={{ color: '#C4A265' }} transition="color 0.2s ease">Contact us</ChakraLink>
                </Text>

              </VStack>
            </form>

          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default Signup;
