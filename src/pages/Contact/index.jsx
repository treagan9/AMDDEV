// src/pages/Contact/index.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
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
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

function formatPhone(value) {
  var digits = value.replace(/\D/g, '');
  if (digits.length > 10 && digits.charAt(0) === '1') {
    digits = digits.substring(1);
  }
  digits = digits.substring(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return '(' + digits;
  if (digits.length < 7) return '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
  return '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6);
}

function Contact() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var formLoadedAt = useRef(Date.now());
  var toast = useToast();
  var [submitting, setSubmitting] = useState(false);
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
        toast({ title: 'Message sent', description: "We'll be in touch shortly.", status: 'success', duration: 5000, isClosable: true, position: 'top' });
        setForm({ firstName: '', lastName: '', email: '', phone: '', location: '', interest: '', message: '', website: '' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      toast({ title: 'Something went wrong', description: 'Please try again or call us at 813-727-3233.', status: 'error', duration: 5000, isClosable: true, position: 'top' });
    }
    setSubmitting(false);
  }

  var inputProps = {
    bg: 'white',
    border: '1px solid',
    borderColor: '#D5D0C8',
    borderRadius: 'btn',
    fontSize: 'md',
    color: 'brand.slate',
    h: '54px',
    px: 4,
    _placeholder: { color: '#9B9488' },
    _hover: { borderColor: 'brand.champagne' },
    _focus: { borderColor: 'brand.champagne', boxShadow: '0 0 0 1px var(--chakra-colors-brand-champagne)' }
  };

  function CustomSelect({ name, value, onChange, placeholder, children }) {
    return (
      <Box position="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            height: '54px',
            padding: '0 40px 0 16px',
            fontSize: '1.0625rem',
            color: value ? '#2D2D2D' : '#9B9488',
            backgroundColor: 'white',
            border: '1px solid #D5D0C8',
            borderRadius: '8px',
            appearance: 'none',
            WebkitAppearance: 'none',
            outline: 'none',
            cursor: 'pointer'
          }}
          onFocus={function (e) { e.target.style.borderColor = '#C4A265'; e.target.style.boxShadow = '0 0 0 1px #C4A265'; }}
          onBlur={function (e) { e.target.style.borderColor = '#D5D0C8'; e.target.style.boxShadow = 'none'; }}
        >
          <option value="" disabled>{placeholder}</option>
          {children}
        </select>
        <Box position="absolute" right="16px" top="50%" transform="translateY(-50%)" pointerEvents="none" color="#9B9488">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact | AnswersMD&trade;</title>
        <meta name="description" content="Contact AnswersMD to learn more about concierge medicine and schedule your consultation." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} maxW="800px">
            <HStack spacing={3} mb={5}>
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">Get in touch</Text>
            </HStack>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>Contact us</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px">
              Ready to experience healthcare differently? Schedule your consultation or reach out with any questions.
            </Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={ref}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={0} maxW="1200px" mx="auto">
              <Box pr={{ base: 0, lg: 16 }} pb={{ base: 16, lg: 0 }} borderRight={{ base: 'none', lg: '1px solid' }} borderBottom={{ base: '1px solid', lg: 'none' }} borderColor="brand.borderLight">
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Reach out directly</Text>
                <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Let's start a conversation</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={12}>
                  Whether you're ready to become a member or simply want to learn more, we're here to help.
                </Text>
                <VStack align="flex-start" spacing={10}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Phone</Text>
                    <Box mb={4}>
                      <ChakraLink href="tel:8137273233" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={600} color="brand.slate" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease" display="block">813-727-3233</ChakraLink>
                      <Text fontSize="md" color="brand.bodyLight" mt={1}>Tampa and St. Petersburg</Text>
                    </Box>
                    <Box>
                      <ChakraLink href="tel:5619333333" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={600} color="brand.slate" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease" display="block">561-933-3333</ChakraLink>
                      <Text fontSize="md" color="brand.bodyLight" mt={1}>Boca Raton</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Email</Text>
                    <ChakraLink href="mailto:info@answersmd.com" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={600} color="brand.slate" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
                  </Box>
                  <SimpleGrid columns={2} spacing={8}>
                    <Box>
                      <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Locations</Text>
                      <Text fontSize="md" color="brand.slate" fontWeight={500} lineHeight={1.8}>Tampa</Text>
                      <Text fontSize="md" color="brand.slate" fontWeight={500} lineHeight={1.8}>St. Petersburg</Text>
                      <Text fontSize="md" color="brand.slate" fontWeight={500} lineHeight={1.8}>Boca Raton</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Hours</Text>
                      <Text fontSize="md" color="brand.slate" fontWeight={500}>24/7 member access</Text>
                      <Text fontSize="md" color="brand.bodyLight" mt={1}>Office Mon through Fri</Text>
                      <Text fontSize="md" color="brand.bodyLight">8am to 5pm</Text>
                    </Box>
                  </SimpleGrid>
                </VStack>
              </Box>
              <Box pl={{ base: 0, lg: 16 }} pt={{ base: 16, lg: 0 }}>
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Schedule online</Text>
                <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Request a consultation</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={12}>No commitment, no pressure. Fill out the form below and we'll be in touch shortly.</Text>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                      <FormControl isRequired>
                        <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>First name</FormLabel>
                        <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" {...inputProps} />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Last name</FormLabel>
                        <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Smith" {...inputProps} />
                      </FormControl>
                    </SimpleGrid>
                    <FormControl isRequired>
                      <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Email address</FormLabel>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" {...inputProps} />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Phone number</FormLabel>
                      <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" maxLength={16} {...inputProps} />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Preferred location</FormLabel>
                      <CustomSelect name="location" value={form.location} onChange={handleChange} placeholder="Select a location">
                        <option value="tampa">Tampa</option>
                        <option value="st-pete">St. Petersburg</option>
                        <option value="boca-raton">Boca Raton</option>
                      </CustomSelect>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>I'm interested in</FormLabel>
                      <CustomSelect name="interest" value={form.interest} onChange={handleChange} placeholder="Select an option">
                        <option value="individual">Individual Membership</option>
                        <option value="family">Family Membership</option>
                        <option value="corporate">Corporate Membership</option>
                        <option value="learn">Just Learning More</option>
                      </CustomSelect>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Message</FormLabel>
                      <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your healthcare needs..." rows={4} resize="vertical" bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="btn" fontSize="md" color="brand.slate" py={4} px={4} _placeholder={{ color: '#9B9488' }} _hover={{ borderColor: 'brand.champagne' }} _focus={{ borderColor: 'brand.champagne', boxShadow: '0 0 0 1px var(--chakra-colors-brand-champagne)' }} />
                    </FormControl>
                    <Box position="absolute" left="-9999px" aria-hidden="true">
                      <Input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                    </Box>
                    <Box pt={2}>
                      <Button type="submit" variant="primary" size="lg" w="100%" isLoading={submitting} loadingText="Sending...">Submit inquiry</Button>
                    </Box>
                  </VStack>
                </form>
              </Box>
            </SimpleGrid>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
