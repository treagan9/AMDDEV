// src/pages/Services/index.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Collapse,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiPlus, HiMinus } from 'react-icons/hi';

var MotionBox = motion(Box);

var STATS = [
  { value: '30-60', unit: 'min', label: 'Every appointment' },
  { value: '300', unit: 'max', label: 'Patients per physician' },
  { value: '24/7', unit: '', label: 'Direct physician access' }
];

var SERVICES = [
  { title: 'Direct access', description: 'Your physician\'s personal cell phone number. Call, text or video chat whenever you need guidance. No answering services, no callbacks, no delays.' },
  { title: 'Preventive care', description: 'Annual executive physicals, advanced lab panels, cancer screenings and personalized wellness plans designed to catch problems before they start.' },
  { title: 'House calls', description: 'We come to your home, office or wherever life takes you. Same quality of care without the waiting room.' },
  { title: 'Executive health', description: 'Comprehensive health programs designed for professionals and leaders who need to perform at their best. Full diagnostics, longevity planning and ongoing optimization.' },
  { title: 'Specialist coordination', description: 'We manage referrals, share records, follow up on results and ensure nothing falls through the cracks across your entire care team.' },
  { title: 'Travel medicine', description: 'Pre-travel consultations, vaccinations, health kits and 24/7 physician access while you\'re away. Your doctor travels with you.' }
];

var FAQS = [
  { q: 'What is concierge medicine?', a: 'Concierge medicine is a membership-based model where physicians limit their patient panel to provide more time, access and attention to each member. Instead of seeing 2,000 or more patients, our physicians care for a maximum of 300. This means same-day appointments, extended visits and direct communication with your doctor.' },
  { q: 'Do I still need health insurance?', a: 'Yes. Your AnswersMD membership covers primary care services, but health insurance is still important for hospitalizations, specialist visits, imaging, surgeries and other services outside of primary care. We work alongside your insurance, not in place of it.' },
  { q: 'How is this different from traditional primary care?', a: 'In traditional primary care, physicians manage panels of 2,000 to 3,000 patients. Appointments are rushed, wait times are long and access is limited. At AnswersMD, our physicians see a fraction of that volume. The result is longer visits, same-day availability, direct phone access and a physician who actually knows you.' },
  { q: 'What does the membership include?', a: 'Every membership includes 24/7 direct physician access, same-day appointments, comprehensive annual physicals, advanced lab panels, home and office visits, specialist coordination, travel medicine support, prescription management and personal health advocacy.' },
  { q: 'Can my whole family join?', a: 'Absolutely. We offer individual, couple and family memberships. Dr. Meriwether\'s dual board certification in Pediatrics and Internal Medicine means we can care for every member of your family from newborns to grandparents under one practice.' },
  { q: 'What happens if I need a specialist?', a: 'We coordinate everything. We identify the right specialist, share your records, communicate directly with their office and follow up on results. You never have to navigate the system alone.' },
  { q: 'How do I get started?', a: 'Start with a consultation. It\'s a pressure-free conversation where we learn about your health goals and you learn about our practice. If it\'s a good fit, enrollment takes minutes and your membership begins immediately.' }
];

function FAQItem({ q, a }) {
  var [open, setOpen] = useState(false);
  return (
    <Box borderBottom="1px solid" borderColor="brand.borderLight" py={5}>
      <Flex
        justify="space-between"
        align="center"
        cursor="pointer"
        onClick={function () { setOpen(!open); }}
        role="group"
      >
        <Text fontSize="md" fontWeight={600} color="brand.slate" pr={4} _groupHover={{ color: 'brand.champagne' }} transition="color 0.2s ease">{q}</Text>
        <Box flexShrink={0} color={open ? 'brand.champagne' : 'brand.bodyLight'}>
          {open ? <HiMinus size={18} /> : <HiPlus size={18} />}
        </Box>
      </Flex>
      <Collapse in={open}>
        <Text fontSize="sm" color="brand.body" lineHeight={1.85} pt={4} pb={2}>{a}</Text>
      </Collapse>
    </Box>
  );
}

function Services() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  var [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  var [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>Our Approach | AnswersMD&trade;</title>
        <meta name="description" content="How AnswersMD delivers concierge medicine. Direct physician access, preventive care, house calls and more." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={heroRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} textAlign="center" maxW="680px" mx="auto">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Our approach</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>Your doctor's cell phone number. Yes, really.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">Healthcare built around access, time and a physician who actually knows your name.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.evergreen" ref={statsRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 4 }} maxW="800px" mx="auto" textAlign="center">
            {STATS.map(function (stat, i) {
              return (
                <MotionBox key={stat.label} initial={{ opacity: 0, y: 16 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}>
                  <HStack spacing={1} justify="center" mb={2}>
                    <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="white" lineHeight={1}>{stat.value}</Text>
                    {stat.unit && <Text fontSize="lg" color="brand.champagne" fontWeight={500}>{stat.unit}</Text>}
                  </HStack>
                  <Text fontSize="sm" color="whiteAlpha.700">{stat.label}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={servicesRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={servicesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>What we offer</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Proactive care, not reactive medicine</Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 10, md: 12 }} maxW="1000px" mx="auto">
            {SERVICES.map(function (svc, i) {
              return (
                <MotionBox key={svc.title} initial={{ opacity: 0, y: 16 }} animate={servicesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}>
                  <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={3}>{svc.title}</Text>
                  <Text fontSize="sm" color="brand.body" lineHeight={1.85}>{svc.description}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={faqRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Common questions</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={12} textAlign="center">Frequently asked</Text>
          </MotionBox>
          <Box maxW="700px" mx="auto" borderTop="1px solid" borderColor="brand.borderLight">
            {FAQS.map(function (faq) {
              return <FAQItem key={faq.q} q={faq.q} a={faq.a} />;
            })}
          </Box>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <VStack spacing={8} textAlign="center" maxW="560px" mx="auto" px={6}>
          <Box w="32px" h="1px" bg="brand.champagne" />
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to experience the difference?</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.8}>It starts with a conversation. No commitment, no pressure.</Text>
          <Flex gap={4} direction={{ base: 'column', sm: 'row' }} w={{ base: '100%', sm: 'auto' }}>
            <Button as={Link} to="/contact/" variant="primary" size="lg" w={{ base: '100%', sm: 'auto' }}>Schedule a consultation</Button>
            <Button as={Link} to="/signup/" variant="secondary" size="lg" w={{ base: '100%', sm: 'auto' }}>Join now</Button>
          </Flex>
        </VStack>
      </Box>
    </>
  );
}

export default Services;
