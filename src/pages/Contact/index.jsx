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
  Icon,
  Link as ChakraLink,
  useToast
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock
} from 'react-icons/hi';

var MotionBox = motion(Box);

var CONTACT_ITEMS = [
  { icon: HiOutlinePhone, label: 'Phone', value: '813-727-3233', href: 'tel:8137273233' },
  { icon: HiOutlineMail, label: 'Email', value: 'info@answersmd.com', href: 'mailto:info@answersmd.com' },
  { icon: HiOutlineLocationMarker, label: 'Locations', value: 'Tampa, St. Petersburg, Boca Raton', href: null },
  { icon: HiOutlineClock, label: 'Hours', value: 'Members: 24/7 Access\nOffice: Mon-Fri, 8am-5pm', href: null }
];

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
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  var [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
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

  var inputStyles = {
    bg: 'white',
    border: '1px solid',
    borderColor: 'brand.border',
    borderRadius: 'btn',
    fontSize: 'sm',
    py: 6,
    px: 4,
    color: 'brand.slate',
    _placeholder: { color: 'brand.warmGrayLight' },
    _hover: { borderColor: 'brand.bodyLight' },
    _focus: { borderColor: 'brand.champagne', boxShadow: '0 0 0 1px var(--chakra-colors-brand-champagne)' }
  };

  return (
    <>
      <Helmet>
        <title>Contact | AnswersMD&trade;</title>
        <meta name="description" content="Contact AnswersMD to learn more about concierge medicine and schedule your consultation." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 12, md: 16 }} bg="brand.evergreen" ref={heroRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            textAlign="center"
            maxW="600px"
            mx="auto"
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={5}>
              Get in touch
            </Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl' }} fontWeight={700} color="white" lineHeight={1.08} mb={4}>
              Contact us
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.700" lineHeight={1.8}>
              Ready to experience healthcare differently? Schedule your consultation
              or reach out with any questions.
            </Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={formRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Flex
              direction={{ base: 'column', lg: 'row-reverse' }}
              gap={{ base: 12, lg: 16 }}
              maxW="1100px"
              mx="auto"
            >
              <Box flex={{ base: '1', lg: '1.2' }}>
                <Box
                  bg="white"
                  borderRadius="card"
                  border="1px solid"
                  borderColor="brand.borderLight"
                  p={{ base: 6, md: 10 }}
                >
                  <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={8}>
                    Schedule a consultation
                  </Text>

                  <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
                      <SimpleGrid columns={2} spacing={4} w="100%">
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight={500} color="brand.body" mb={2}>First name</FormLabel>
                          <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" {...inputStyles} />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel fontSize="sm" fontWeight={500} color="brand.body" mb={2}>Last name</FormLabel>
                          <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" {...inputStyles} />
                        </FormControl>
                      </SimpleGrid>

                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight={500} color="brand.body" mb={2}>Email address</FormLabel>
                        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" {...inputStyles} />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight={500} color="brand.body" mb={2}>Phone number</FormLabel>
                        <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" maxLength={16} {...inputStyles} />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight={500} color="brand.body" mb={2}>Preferred location</FormLabel>
                        <Select name="location" value={form.location} onChange={handleChange} placeholder="Select a location" {...inputStyles}>
                          <option value="tampa">Tampa</option>
                          <option value="st-pete">St. Petersburg</option>
                          <option value="boca-raton">Boca Raton</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight={500} color="brand.body" mb={2}>I'm interested in</FormLabel>
                        <Select name="interest" value={form.interest} onChange={handleChange} placeholder="Select an option" {...inputStyles}>
                          <option value="individual">Individual Membership</option>
                          <option value="family">Family Membership</option>
                          <option value="corporate">Corporate Membership</option>
                          <option value="learn">Just Learning More</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight={500} color="brand.body" mb={2}>Message</FormLabel>
                        <Textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your healthcare needs..."
                          rows={4}
                          resize="vertical"
                          {...inputStyles}
                        />
                      </FormControl>

                      <Box position="absolute" left="-9999px" aria-hidden="true">
                        <Input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                      </Box>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        w="100%"
                        isLoading={submitting}
                        loadingText="Sending..."
                        mt={2}
                      >
                        Submit inquiry
                      </Button>
                    </VStack>
                  </form>
                </Box>
              </Box>

              <Box flex={1}>
                <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" mb={4}>
                  Let's start a conversation
                </Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={10}>
                  We'd love to hear from you. Whether you're ready to become a member or
                  simply want to learn more about concierge medicine, we're here to help.
                </Text>

                <VStack align="flex-start" spacing={8}>
                  {CONTACT_ITEMS.map(function (item) {
                    var content = (
                      <HStack spacing={4} align="flex-start">
                        <Flex w={11} h={11} bg="brand.champagneSoft" align="center" justify="center" borderRadius="full" flexShrink={0} mt={0.5}>
                          <Icon as={item.icon} boxSize={5} color="brand.champagne" />
                        </Flex>
                        <Box>
                          <Text fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.warmGrayLight" mb={1}>
                            {item.label}
                          </Text>
                          {item.value.split('\n').map(function (line, i) {
                            return (
                              <Text key={i} fontSize="md" fontWeight={500} color="brand.slate" lineHeight={1.6}>
                                {line}
                              </Text>
                            );
                          })}
                        </Box>
                      </HStack>
                    );

                    if (item.href) {
                      return (
                        <ChakraLink
                          key={item.label}
                          href={item.href}
                          _hover={{ textDecoration: 'none', opacity: 0.8 }}
                          transition="opacity 0.2s ease"
                        >
                          {content}
                        </ChakraLink>
                      );
                    }
                    return <Box key={item.label}>{content}</Box>;
                  })}
                </VStack>
              </Box>
            </Flex>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
