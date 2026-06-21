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
  Select,
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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    interest: '',
    message: '',
    website: ''
  });

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    if (name === 'phone') {
      value = formatPhone(value);
    }
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
        toast({
          title: 'Message sent',
          description: "We'll be in touch shortly.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
        setForm({ firstName: '', lastName: '', email: '', phone: '', location: '', interest: '', message: '', website: '' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or call us at 813-727-3233.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }

    setSubmitting(false);
  }

  var fieldStyles = {
    bg: 'transparent',
    border: 'none',
    borderBottom: '1.5px solid',
    borderColor: 'brand.borderLight',
    borderRadius: '0',
    fontSize: 'md',
    color: 'brand.slate',
    height: '52px',
    px: 0,
    _placeholder: { color: 'brand.warmGrayLight', fontWeight: 300 },
    _hover: { borderColor: 'brand.champagne' },
    _focus: { borderColor: 'brand.champagne', boxShadow: 'none' }
  };

  var selectStyles = {
    bg: 'transparent',
    border: 'none',
    borderBottom: '1.5px solid',
    borderColor: 'brand.borderLight',
    borderRadius: '0',
    fontSize: 'md',
    color: 'brand.slate',
    height: '52px',
    px: 0,
    _hover: { borderColor: 'brand.champagne' },
    _focus: { borderColor: 'brand.champagne', boxShadow: 'none' },
    sx: {
      '> option': { color: 'brand.slate', bg: 'white' },
      '&[value=""]': { color: 'brand.warmGrayLight', fontWeight: 300 }
    }
  };

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
            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 16, lg: 0 }} maxW="1200px" mx="auto">

              <Box flex={1} pr={{ base: 0, lg: 20 }} borderRight={{ base: 'none', lg: '1px solid' }} borderColor="brand.borderLight">
                <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" mb={4}>Let's start a conversation</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={14}>
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

              <Box flex={1.1} pl={{ base: 0, lg: 20 }}>
                <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={2}>Schedule a consultation</Text>
                <Text fontSize="md" color="brand.bodyLight" mb={12}>No commitment, no pressure</Text>

                <form onSubmit={handleSubmit}>
                  <VStack spacing={8} align="stretch">
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 8, sm: 6 }}>
                      <FormControl isRequired>
                        <FormLabel fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>First name</FormLabel>
                        <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" {...fieldStyles} />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>Last name</FormLabel>
                        <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" {...fieldStyles} />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl isRequired>
                      <FormLabel fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>Email address</FormLabel>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" {...fieldStyles} />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>Phone number</FormLabel>
                      <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" maxLength={16} {...fieldStyles} />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>Preferred location</FormLabel>
                      <Select name="location" value={form.location} onChange={handleChange} placeholder="Select a location" {...selectStyles}>
                        <option value="tampa">Tampa</option>
                        <option value="st-pete">St. Petersburg</option>
                        <option value="boca-raton">Boca Raton</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>I'm interested in</FormLabel>
                      <Select name="interest" value={form.interest} onChange={handleChange} placeholder="Select an option" {...selectStyles}>
                        <option value="individual">Individual Membership</option>
                        <option value="family">Family Membership</option>
                        <option value="corporate">Corporate Membership</option>
                        <option value="learn">Just Learning More</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>Message</FormLabel>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your healthcare needs..."
                        rows={3}
                        resize="vertical"
                        bg="transparent"
                        border="none"
                        borderBottom="1.5px solid"
                        borderColor="brand.borderLight"
                        borderRadius="0"
                        fontSize="md"
                        color="brand.slate"
                        px={0}
                        py={3}
                        _placeholder={{ color: 'brand.warmGrayLight', fontWeight: 300 }}
                        _hover={{ borderColor: 'brand.champagne' }}
                        _focus={{ borderColor: 'brand.champagne', boxShadow: 'none' }}
                      />
                    </FormControl>

                    <Box position="absolute" left="-9999px" aria-hidden="true">
                      <Input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                    </Box>

                    <Box pt={4}>
                      <Button
                        type="submit"
                        bg="brand.champagne"
                        color="white"
                        borderRadius="btn"
                        size="lg"
                        fontSize="md"
                        w="100%"
                        _hover={{ bg: 'brand.champagneDark', transform: 'translateY(-1px)', shadow: '0 6px 20px rgba(196,162,101,0.25)' }}
                        _active={{ transform: 'translateY(0)' }}
                        transition="all 0.3s ease"
                        isLoading={submitting}
                        loadingText="Sending..."
                      >
                        Submit inquiry
                      </Button>
                    </Box>
                  </VStack>
                </form>
              </Box>
            </Flex>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
