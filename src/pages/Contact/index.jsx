// src/pages/Contact/index.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Link as ChakraLink,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
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

function RadioOption({ label, selected, onClick }) {
  return (
    <Flex align="center" gap={3} cursor="pointer" onClick={onClick} py={1}>
      <Flex w="18px" h="18px" borderRadius="full" border="2px solid" borderColor={selected ? '#C4A265' : '#D5D0C8'} align="center" justify="center" flexShrink={0} transition="border-color 0.2s ease">
        {selected && <Box w="8px" h="8px" borderRadius="full" bg="#C4A265" />}
      </Flex>
      <Text fontSize="md" color={selected ? '#2D2D2D' : '#5C5650'} fontWeight={selected ? 600 : 400} transition="all 0.2s ease">{label}</Text>
    </Flex>
  );
}

function Contact() {
  var formLoadedAt = useRef(Date.now());
  var toast = useToast();
  var [submitting, setSubmitting] = useState(false);
  var [submitted, setSubmitted] = useState(false);
  var [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    location: '', interest: '', message: '', website: ''
  });

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    if (name === 'phone') value = formatPhone(value);
    setForm(function (prev) { return Object.assign({}, prev, { [name]: value }); });
  }

  function setField(key, value) {
    setForm(function (prev) { return Object.assign({}, prev, { [key]: value }); });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      var response = await fetch('/.netlify/functions/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({}, form, { formLoadedAt: formLoadedAt.current }))
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
        <Helmet><title>Thank You | AnswersMD&trade;</title></Helmet>
        <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory">
          <Box maxW="560px" mx="auto" px={6} textAlign="center">
            <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Flex w="64px" h="64px" borderRadius="full" bg="#F0EDE8" align="center" justify="center" mx="auto" mb={6}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </Flex>
              <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" lineHeight={1.15} mb={4}>We received your inquiry</Text>
              <Text fontSize="md" color="#3D3832" lineHeight={1.8} mb={2}>A member of our team will reach out within one business day to schedule your consultation.</Text>
              <Text fontSize="md" color="#3D3832" lineHeight={1.8}>In the meantime, feel free to call us directly.</Text>
              <Box mt={8}>
                <ChakraLink href="tel:8137273233" fontSize="lg" fontWeight={600} color="#2D2D2D" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">813-727-3233</ChakraLink>
              </Box>
            </MotionBox>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact | AnswersMD&trade;</title>
        <meta name="description" content="Contact AnswersMD to learn more about concierge medicine and schedule your consultation." />
      </Helmet>

      <Box bg="brand.ivory" pt={{ base: 28, md: 36 }} pb={{ base: 12, md: 16 }}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} maxW="640px">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="#C4A265" mb={4}>Get in touch</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="#2D2D2D" lineHeight={1.08} mb={4}>Let's start a conversation</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="#3D3832" lineHeight={1.8}>No commitment, no pressure. Just a chance to learn if concierge medicine is right for you.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box bg="white" py={{ base: 12, md: 16 }}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <form onSubmit={handleSubmit}>
              <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 16 }} maxW="1100px">

                <Box flex={1}>
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

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight={600} color="#2D2D2D" mb={2}>Email</FormLabel>
                        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" {...fieldStyles} />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight={600} color="#2D2D2D" mb={2}>Phone</FormLabel>
                        <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" maxLength={16} {...fieldStyles} />
                      </FormControl>
                    </SimpleGrid>

                    {/* Mobile: radios inline */}
                    <Box display={{ base: 'block', lg: 'none' }}>
                      <SimpleGrid columns={2} spacing={8}>
                        <Box>
                          <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={3}>Preferred location</Text>
                          <VStack spacing={2} align="flex-start">
                            <RadioOption label="Tampa" selected={form.location === 'tampa'} onClick={function () { setField('location', 'tampa'); }} />
                            <RadioOption label="St. Petersburg" selected={form.location === 'st-pete'} onClick={function () { setField('location', 'st-pete'); }} />
                            <RadioOption label="Boca Raton" selected={form.location === 'boca-raton'} onClick={function () { setField('location', 'boca-raton'); }} />
                          </VStack>
                        </Box>
                        <Box>
                          <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={3}>I'm interested in</Text>
                          <VStack spacing={2} align="flex-start">
                            <RadioOption label="Individual" selected={form.interest === 'individual'} onClick={function () { setField('interest', 'individual'); }} />
                            <RadioOption label="Family" selected={form.interest === 'family'} onClick={function () { setField('interest', 'family'); }} />
                            <RadioOption label="Corporate" selected={form.interest === 'corporate'} onClick={function () { setField('interest', 'corporate'); }} />
                            <RadioOption label="Learning more" selected={form.interest === 'learn'} onClick={function () { setField('interest', 'learn'); }} />
                          </VStack>
                        </Box>
                      </SimpleGrid>
                    </Box>

                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight={600} color="#2D2D2D" mb={2}>
                        Message
                        <Text as="span" fontWeight={400} color="#9A9590" ml={2}>(optional)</Text>
                      </FormLabel>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your healthcare needs..."
                        rows={4}
                        resize="vertical"
                        bg="white"
                        border="1px solid"
                        borderColor="#D5D0C8"
                        borderRadius="8px"
                        fontSize="md"
                        color="#2D2D2D"
                        py={3}
                        px={4}
                        _placeholder={{ color: '#B5AD9E' }}
                        _hover={{ borderColor: '#C4A265' }}
                        _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }}
                      />
                    </FormControl>

                    <Box position="absolute" left="-9999px" aria-hidden="true">
                      <Input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                    </Box>

                    <Box pt={2}>
                      <Button
                        type="submit"
                        bg="#1B3A34"
                        color="white"
                        borderRadius="8px"
                        size="lg"
                        fontSize="md"
                        fontWeight={600}
                        w={{ base: '100%', md: 'auto' }}
                        px={12}
                        h="54px"
                        isLoading={submitting}
                        loadingText="Sending..."
                        _hover={{ bg: '#234840', transform: 'translateY(-2px)', shadow: '0 8px 24px rgba(27, 58, 52, 0.2)' }}
                        _active={{ transform: 'translateY(0)' }}
                        transition="all 0.3s ease"
                      >Request a consultation</Button>
                    </Box>

                    <Text fontSize="xs" color="#9A9590">We respond within one business day. Your information is never shared.</Text>
                  </VStack>
                </Box>

                {/* Desktop sidebar */}
                <Box w="320px" flexShrink={0} display={{ base: 'none', lg: 'block' }} borderLeft="1px solid" borderColor="#E8E2D8" pl={10}>
                  <Box position="sticky" top="120px">
                    <Box mb={10}>
                      <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={4}>Preferred location</Text>
                      <VStack spacing={3} align="flex-start">
                        <RadioOption label="Tampa" selected={form.location === 'tampa'} onClick={function () { setField('location', 'tampa'); }} />
                        <RadioOption label="St. Petersburg" selected={form.location === 'st-pete'} onClick={function () { setField('location', 'st-pete'); }} />
                        <RadioOption label="Boca Raton" selected={form.location === 'boca-raton'} onClick={function () { setField('location', 'boca-raton'); }} />
                      </VStack>
                    </Box>

                    <Box mb={10}>
                      <Text fontSize="sm" fontWeight={600} color="#2D2D2D" mb={4}>I'm interested in</Text>
                      <VStack spacing={3} align="flex-start">
                        <RadioOption label="Individual membership" selected={form.interest === 'individual'} onClick={function () { setField('interest', 'individual'); }} />
                        <RadioOption label="Family membership" selected={form.interest === 'family'} onClick={function () { setField('interest', 'family'); }} />
                        <RadioOption label="Corporate program" selected={form.interest === 'corporate'} onClick={function () { setField('interest', 'corporate'); }} />
                        <RadioOption label="Just learning more" selected={form.interest === 'learn'} onClick={function () { setField('interest', 'learn'); }} />
                      </VStack>
                    </Box>

                    <Box w="32px" h="2px" bg="#E8E2D8" mb={5} />

                    <VStack align="flex-start" spacing={6}>
                      <Box>
                        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="#C4A265" mb={3}>Call us</Text>
                        <Box mb={3}>
                          <ChakraLink href="tel:8137273233" fontSize="md" fontWeight={600} color="#2D2D2D" _hover={{ color: '#C4A265' }} transition="color 0.2s ease" display="block">813-727-3233</ChakraLink>
                          <Text fontSize="xs" color="#9A9590" mt={1}>Tampa and St. Petersburg</Text>
                        </Box>
                        <Box>
                          <ChakraLink href="tel:5619333333" fontSize="md" fontWeight={600} color="#2D2D2D" _hover={{ color: '#C4A265' }} transition="color 0.2s ease" display="block">561-933-3333</ChakraLink>
                          <Text fontSize="xs" color="#9A9590" mt={1}>Boca Raton</Text>
                        </Box>
                      </Box>

                      <Box>
                        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="#C4A265" mb={3}>Email</Text>
                        <ChakraLink href="mailto:info@answersmd.com" fontSize="md" fontWeight={600} color="#2D2D2D" _hover={{ color: '#C4A265' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
                      </Box>

                      <Box>
                        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="#C4A265" mb={3}>Hours</Text>
                        <Text fontSize="sm" color="#2D2D2D" fontWeight={500}>24/7 member access</Text>
                        <Text fontSize="xs" color="#9A9590" mt={1}>Office Mon through Fri, 8am to 5pm</Text>
                      </Box>
                    </VStack>
                  </Box>
                </Box>

              </Flex>
            </form>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
