// src/pages/Services/index.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Link as ChakraLink,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlinePhone,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiArrowRight
} from 'react-icons/hi';

var MotionBox = motion(Box);

var STATS = [
  { value: '30-60', label: 'Minutes per appointment', note: 'vs 7 min average' },
  { value: '300', label: 'Maximum patients per physician', note: 'vs 2,500 typical' },
  { value: '24/7', label: 'Direct physician access', note: 'Not an answering service' }
];

var SERVICES = [
  { icon: HiOutlinePhone, title: '24/7 Direct Access', description: 'Call, text or video chat your physician nights, weekends, holidays.' },
  { icon: HiOutlineHeart, title: 'Preventive Care', description: 'Comprehensive annual exams, advanced screenings and personalized health plans.' },
  { icon: HiOutlineHome, title: 'House Calls', description: "When you can't come to us, we come to you: at home, office or hotel." },
  { icon: HiOutlineCalendar, title: 'Same-Day Visits', description: 'Sick today? Same-day. Guaranteed same-day or next-day appointments.' },
  { icon: HiOutlineUserGroup, title: 'Care Coordination', description: 'We manage specialists, labs, imaging and hospital visits. No logistics for you.' },
  { icon: HiOutlineClipboardCheck, title: 'Whole Family Care', description: 'Pediatrics to geriatrics. We serve every generation under one roof.' }
];

var STEPS = [
  { number: '1', title: 'Comprehensive assessment', description: 'Extended intake visit reviewing your complete history, lifestyle and health goals.' },
  { number: '2', title: 'Personalized roadmap', description: 'Custom health plan with screenings, labs and milestones tailored to your risk profile.' },
  { number: '3', title: 'Ongoing coordination', description: 'We schedule, remind and follow up. Specialists, imaging, labs. We handle the logistics.' },
  { number: '4', title: 'Continuous optimization', description: 'Regular check-ins to adjust your plan as your health evolves. Nothing falls through the cracks.' }
];

var FAQS = [
  {
    question: 'What is concierge medicine?',
    answer: 'Concierge medicine is a membership-based approach to primary care that prioritizes the doctor-patient relationship. Instead of managing thousands of patients, concierge physicians limit their practice to a small number of members, allowing for longer appointments, same-day access and truly personalized care. At AnswersMD, this means you have direct access to your physician 24/7, unhurried visits that address all your concerns and a doctor who knows your complete health history and personal goals.'
  },
  {
    question: 'How is this different from traditional primary care?',
    answer: 'Traditional primary care physicians often manage 2,000 to 3,000 patients, leading to rushed 10 to 15 minute appointments, long wait times and difficulty reaching your doctor. At AnswersMD, we limit our practice to ensure same-day or next-day appointments, 30 to 60 minute visits as standard, direct phone, text and video access to your physician, no waiting rooms, comprehensive annual physicals lasting 2 to 3 hours and coordination of all specialist care.'
  },
  {
    question: 'Do I still need health insurance?',
    answer: 'Yes, we recommend maintaining health insurance. Your AnswersMD membership covers your primary care relationship: unlimited visits, 24/7 access, annual physicals and care coordination. Health insurance is still important for hospital stays, specialist consultations, lab work beyond routine panels, prescription medications and major medical expenses. Think of your membership as an investment in exceptional primary care while insurance protects you from major medical costs.'
  },
  {
    question: "What's included in my membership?",
    answer: 'Every AnswersMD membership includes 24/7 direct physician access via phone, text or video, same-day appointment guarantee, comprehensive 2 to 3 hour executive physical annually, unlimited primary care visits with no copays, extended 30 to 60 minute appointments, home and office visits when needed, hospital accompaniment and advocacy, specialist referral coordination, prescription management, travel medicine consultations, preventive health planning and basic lab panels included in your annual physical.'
  },
  {
    question: 'How much does membership cost?',
    answer: 'Annual membership fees vary based on age and are designed to reflect the level of care required at different life stages. Additional family members receive a discount on their membership. There are no per-visit fees, copays or hidden charges for primary care services. For current pricing details, please contact us directly or visit our membership page.'
  },
  {
    question: 'Can my family join?',
    answer: 'Yes. Spouses, partners and children can be added to your membership at a 25% discount from the standard rate. Each family member receives the same level of personalized care and direct physician access. We care for individuals aged 12 and above, making AnswersMD a true family practice for adolescents, adults and seniors.'
  },
  {
    question: 'How do I become a member?',
    answer: 'Joining AnswersMD is simple. Complete our quick questionnaire (about 2 minutes online), schedule an introductory call to meet your physician and ask questions, then enroll and schedule your welcome visit. Most new members can be seen within 1 to 2 weeks of enrollment.'
  }
];

function Services() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  var [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  var [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>Our Approach | AnswersMD&trade;</title>
        <meta name="description" content="Your doctor's cell phone number. Yes, really. Comprehensive concierge medical services with 24/7 direct access in Tampa, St. Petersburg and Boca Raton." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={heroRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            textAlign="center"
            maxW="760px"
            mx="auto"
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>
              What makes us different
            </Text>
            <Text
              as="h1"
              fontFamily="heading"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight={700}
              color="brand.slate"
              lineHeight={1.08}
              mb={6}
            >
              Your doctor's cell phone number.{' '}
              <Text as="span" color="brand.champagne">Yes, really.</Text>
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px" mx="auto">
              Not a call center. Not an answering service. Your physician's actual cell phone,
              for calls, texts and video whenever you need it.
            </Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.evergreen" ref={statsRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            textAlign="center"
            mb={{ base: 10, md: 14 }}
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={4}>
              Why it matters
            </Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="white" lineHeight={1.1} mb={4}>
              Proactive care saves lives
            </Text>
            <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.8} maxW="520px" mx="auto">
              We've caught cancers early. Prevented heart attacks. Identified issues that would
              have been missed in a 7-minute appointment.
            </Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} maxW="800px" mx="auto">
            {STATS.map(function (stat, i) {
              return (
                <MotionBox
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  textAlign="center"
                >
                  <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="white" lineHeight={1}>
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" fontWeight={500} color="whiteAlpha.800" mt={2}>{stat.label}</Text>
                  <Text fontSize="xs" color="whiteAlpha.400" mt={1}>{stat.note}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={stepsRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            textAlign="center"
            mb={{ base: 10, md: 14 }}
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>
              Proactive care
            </Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={4}>
              We manage your health so you don't have to
            </Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="560px" mx="auto">
              Most people only see a doctor when something's wrong. Our members follow a
              comprehensive health roadmap: screenings, labs, check-ins, all coordinated by us.
            </Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} maxW="1000px" mx="auto">
            {STEPS.map(function (step, i) {
              return (
                <MotionBox
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  textAlign="center"
                >
                  <Flex w={12} h={12} borderRadius="full" border="2px solid" borderColor="brand.champagne" bg="brand.champagneSoft" align="center" justify="center" mx="auto" mb={4}>
                    <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.champagne">{step.number}</Text>
                  </Flex>
                  <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>{step.title}</Text>
                  <Text fontSize="sm" color="brand.body" lineHeight={1.8}>{step.description}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={gridRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            textAlign="center"
            mb={{ base: 10, md: 14 }}
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>
              Everything included
            </Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={4}>
              Comprehensive care, no surprises
            </Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">
              Your membership covers all primary care services with no per-visit fees.
            </Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} maxW="960px" mx="auto">
            {SERVICES.map(function (service, i) {
              return (
                <MotionBox
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <VStack
                    spacing={4}
                    p={8}
                    bg="white"
                    borderRadius="card"
                    border="1px solid"
                    borderColor="brand.borderLight"
                    textAlign="center"
                    h="100%"
                    transition="all 0.3s ease"
                    _hover={{ transform: 'translateY(-3px)', shadow: '0 12px 32px rgba(27,58,52,0.06)' }}
                  >
                    <Flex w={12} h={12} bg="brand.champagneSoft" align="center" justify="center" borderRadius="full">
                      <Icon as={service.icon} boxSize={5} color="brand.champagne" />
                    </Flex>
                    <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate">{service.title}</Text>
                    <Text fontSize="sm" color="brand.body" lineHeight={1.8}>{service.description}</Text>
                  </VStack>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={faqRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            textAlign="center"
            mb={{ base: 10, md: 14 }}
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>
              Common questions
            </Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>
              Frequently asked questions
            </Text>
          </MotionBox>
          <Box maxW="720px" mx="auto">
            <Accordion allowToggle>
              {FAQS.map(function (faq, i) {
                return (
                  <AccordionItem key={i} border="none" mb={3}>
                    <AccordionButton
                      py={5}
                      px={6}
                      bg="brand.mist"
                      borderRadius="btn"
                      _hover={{ bg: 'brand.mist' }}
                      _expanded={{ bg: 'brand.mist', borderRadius: '8px 8px 0 0' }}
                    >
                      <Text flex={1} textAlign="left" fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate">
                        {faq.question}
                      </Text>
                      <AccordionIcon color="brand.champagne" />
                    </AccordionButton>
                    <AccordionPanel px={6} pb={5} bg="brand.mist" borderRadius="0 0 8px 8px">
                      <Text fontSize="sm" color="brand.body" lineHeight={1.85}>
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Box>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <VStack spacing={7} textAlign="center" maxW="600px" mx="auto">
            <Box w="32px" h="1px" bg="brand.champagne" />
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>
              Ready to experience the difference?
            </Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8}>
              It starts with a conversation. No commitment, no pressure. Just an honest
              discussion about your health and whether AnswersMD is right for you.
            </Text>
            <Button as={Link} to="/contact/" variant="primary" size="lg">
              Start your journey
            </Button>
            <HStack spacing={2}>
              <Text fontSize="sm" color="brand.bodyLight">Questions?</Text>
              <ChakraLink href="tel:8137273233" fontSize="sm" color="brand.champagne" _hover={{ color: 'brand.champagneDark' }}>
                813-727-3233
              </ChakraLink>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default Services;
