// src/pages/NewPatients/index.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlinePhone,
  HiOutlineClipboardCheck,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineDocumentText,
  HiOutlineChat,
  HiOutlineHome,
  HiOutlineCalendar,
  HiArrowRight
} from 'react-icons/hi';

var MotionBox = motion(Box);

var JOURNEY_STEPS = [
  { icon: HiOutlinePhone, title: 'Initial consultation', description: "A simple, pressure-free call. We'll learn about your health goals and answer every question you have." },
  { icon: HiOutlineUserGroup, title: 'Meet your doctor', description: "During your consultation, you'll meet the physician who will become your primary care provider. This is about fit, not formality." },
  { icon: HiOutlineClipboardCheck, title: 'Simple enrollment', description: "No mountains of paperwork. When you're ready, enrollment takes minutes and your membership begins immediately." },
  { icon: HiOutlineHeart, title: 'The deep-dive visit', description: "Your first extended visit is a comprehensive assessment. No rushing. We review everything: your complete history, lifestyle and health goals." }
];

var DEEP_DIVE_INCLUDES = [
  'Complete medical history review',
  'Comprehensive physical examination',
  'Personalized health risk assessment',
  'Advanced screening recommendations',
  'Custom health plan with milestones',
  'Lab work and diagnostics',
  'Lifestyle and nutrition discussion',
  'Specialist referrals if needed',
  'Goal setting and follow-up scheduling'
];

var LAB_PANELS = [
  { name: 'Complete Blood Count', description: 'Red cells, white cells, platelets, hemoglobin and hematocrit' },
  { name: 'Comprehensive Metabolic Panel', description: 'Liver function, kidney function, electrolytes and glucose' },
  { name: 'Advanced Lipid Panel', description: 'Beyond standard cholesterol to particle size and density profiles' },
  { name: 'Complete Thyroid Panel', description: 'TSH, Free T3, Free T4 and thyroid antibodies' },
  { name: 'Hemoglobin A1c', description: 'Average blood sugar, screening for pre-diabetes and diabetes' },
  { name: 'Inflammatory Markers', description: 'CRP, inflammation indicators linked to chronic disease risk' },
  { name: 'Vitamin & Mineral Panel', description: 'D, B12, iron, magnesium and other essential nutrients' },
  { name: 'Hormone Assessment', description: 'Testosterone, estrogen, cortisol and DHEA levels' },
  { name: 'Cancer Markers', description: 'PSA, CEA and other age-appropriate cancer screenings' }
];

var PREPARE_ITEMS = [
  { icon: HiOutlineDocumentText, title: 'Your medical records', description: "We'll request records from your previous providers, but bringing copies of recent labs, imaging and medication lists helps us start faster." },
  { icon: HiOutlineChat, title: 'Your questions', description: "Write them down. There's no time limit on our conversations, so bring everything you've been wanting to ask a doctor." },
  { icon: HiOutlineClipboardCheck, title: 'Your medications', description: 'A complete list of everything you take: prescriptions, supplements, vitamins. Photos of the bottles work great.' }
];

var ONGOING_ITEMS = [
  { icon: HiOutlinePhone, title: '24/7 direct access', description: "Your physician's cell phone number. Call, text or video whenever you need guidance." },
  { icon: HiOutlineCalendar, title: 'Same-day availability', description: "When something comes up, you're seen that day. No waiting weeks for an opening." },
  { icon: HiOutlineHome, title: 'House calls available', description: "We'll come to your home, office or wherever life takes you. Healthcare that fits your schedule." },
  { icon: HiOutlineUserGroup, title: 'Specialist coordination', description: 'We manage the referrals, share records and follow up to ensure nothing falls through the cracks.' }
];

function Section({ children, bg, ...props }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg={bg} ref={ref} {...props}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {children}
        </MotionBox>
      </Box>
    </Box>
  );
}

function NewPatients() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <Helmet>
        <title>What to Expect | AnswersMD&trade;</title>
        <meta name="description" content="Your guide to joining AnswersMD. From your first consultation to comprehensive care, here's how we do things differently." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={heroRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            textAlign="center"
            maxW="680px"
            mx="auto"
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>
              New members
            </Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>
              What to expect
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">
              Your guide to joining AnswersMD. From your first consultation to
              comprehensive care, here's how we do things differently.
            </Text>
          </MotionBox>
        </Box>
      </Box>

      <Section bg="white">
        <Box maxW="720px" mx="auto" textAlign="center">
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>
            Healthcare should never feel rushed
          </Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={6}>
            Most people have never experienced what a real doctor-patient relationship can be.
            Appointments that don't feel like you're against the clock. A physician who remembers
            not just your medical history, but your life. Someone who picks up the phone when you call.
          </Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={10}>
            At AnswersMD, we've built a practice around a simple belief: when your doctor has
            time to truly know you, everything changes. Problems get caught earlier. Care
            becomes proactive instead of reactive. And you finally have a partner, not just a
            provider, in your health.
          </Text>
          <Box
            bg="brand.ivory"
            borderLeft="3px solid"
            borderColor="brand.champagne"
            p={8}
            borderRadius="0 12px 12px 0"
            textAlign="left"
          >
            <Text fontSize="md" color="brand.slate" fontStyle="italic" lineHeight={1.85} mb={4}>
              "From the moment you join, you have a doctor with time for you. Not a call
              center, not a waiting list, not a runaround. A real person who knows your
              name and picks up the phone."
            </Text>
            <Text fontSize="sm" fontWeight={600} color="brand.champagne">
              Dr. Douglas Shapiro, Founder
            </Text>
          </Box>
        </Box>
      </Section>

      <Section bg="brand.mist">
        <Box maxW="720px" mx="auto" textAlign="center">
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>
            Your care, your comfort level
          </Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>
            Everything is on your terms
          </Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={8}>
            What follows is an overview of the comprehensive services we offer. But here's what matters: we
            tailor everything to you. Not every patient wants every test. Not everyone is comfortable with
            every procedure. We know that. Your visits, your services and your ongoing care are shaped by
            your needs, your preferences and your goals. We guide, we recommend and we're here when you need us.
            We're flexible, and we meet you where you are.
          </Text>
          <HStack spacing={3} justify="center" flexWrap="wrap">
            {['Tailored to you', 'No pressure', 'Your pace'].map(function (tag) {
              return (
                <Box key={tag} bg="white" px={5} py={2} borderRadius="btn" border="1px solid" borderColor="brand.borderLight">
                  <Text fontSize="sm" fontWeight={500} color="brand.slate">{tag}</Text>
                </Box>
              );
            })}
          </HStack>
        </Box>
      </Section>

      <Section bg="white">
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">
          Your journey
        </Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={12} textAlign="center">
          From first call to lifelong care
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} maxW="1000px" mx="auto">
          {JOURNEY_STEPS.map(function (step, i) {
            return (
              <VStack key={step.title} spacing={4} textAlign="center">
                <Flex w={14} h={14} bg="brand.champagneSoft" align="center" justify="center" borderRadius="full">
                  <Icon as={step.icon} boxSize={6} color="brand.champagne" />
                </Flex>
                <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate">{step.title}</Text>
                <Text fontSize="sm" color="brand.body" lineHeight={1.8}>{step.description}</Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Section>

      <Section bg="brand.ivory">
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 16 }} maxW="1000px" mx="auto">
          <Box flex={1}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>
              The welcome visit
            </Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>
              Your deep-dive: a comprehensive process that changes everything
            </Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={4}>
              The first comprehensive exam at AnswersMD isn't like anything you've experienced in
              traditional medicine. It's not a quick physical. It's not a checklist. It's a thoughtful,
              unhurried exploration of your complete health.
            </Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.85}>
              Your deep-dive is a multi-visit process. We start with an extended appointment,
              then we run advanced labs, review results together and build your personalized
              health roadmap. Every finding leads to a conversation, not just a note in a chart.
            </Text>
          </Box>
          <Box w={{ base: '100%', lg: '340px' }} flexShrink={0}>
            <Box bg="white" borderRadius="card" border="1px solid" borderColor="brand.borderLight" p={8}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>
                Your visit includes
              </Text>
              <VStack align="flex-start" spacing={3}>
                {DEEP_DIVE_INCLUDES.map(function (item) {
                  return (
                    <HStack key={item} spacing={3} align="flex-start">
                      <Box w="6px" h="6px" borderRadius="full" bg="brand.champagne" mt={2} flexShrink={0} />
                      <Text fontSize="sm" color="brand.body" lineHeight={1.6}>{item}</Text>
                    </HStack>
                  );
                })}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Section>

      <Section bg="brand.mist">
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">
          Comprehensive testing
        </Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={4} textAlign="center">
          We don't guess. We test.
        </Text>
        <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="600px" mx="auto" textAlign="center" mb={12}>
          Your welcome visit includes an extensive panel of laboratory tests that
          goes far beyond the standard annual physical. We're testing for patterns,
          not just problems.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} maxW="960px" mx="auto">
          {LAB_PANELS.map(function (panel) {
            return (
              <Box key={panel.name} bg="white" borderRadius="card" border="1px solid" borderColor="brand.borderLight" p={6}>
                <Text fontFamily="heading" fontSize="sm" fontWeight={700} color="brand.slate" mb={2}>
                  {panel.name}
                </Text>
                <Text fontSize="xs" color="brand.bodyLight" lineHeight={1.7}>
                  {panel.description}
                </Text>
              </Box>
            );
          })}
        </SimpleGrid>
        <Text fontSize="xs" color="brand.warmGrayLight" textAlign="center" mt={6}>
          Additional lab work as needed is provided at screening or subscription rates may be added
          based on your health history and risk factors.
        </Text>
      </Section>

      <Section bg="white">
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">
          Before your visit
        </Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={12} textAlign="center">
          How to prepare
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} maxW="900px" mx="auto">
          {PREPARE_ITEMS.map(function (item) {
            return (
              <VStack key={item.title} spacing={4} textAlign="center">
                <Flex w={14} h={14} bg="brand.champagneSoft" align="center" justify="center" borderRadius="full">
                  <Icon as={item.icon} boxSize={6} color="brand.champagne" />
                </Flex>
                <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate">{item.title}</Text>
                <Text fontSize="sm" color="brand.body" lineHeight={1.8}>{item.description}</Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Section>

      <Section bg="brand.ivory">
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">
          After your deep-dive
        </Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={4} textAlign="center">
          Ongoing care
        </Text>
        <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="560px" mx="auto" textAlign="center" mb={12}>
          The deep-dive visit is just the beginning. But the real value
          is what comes after: a physician who knows you, available
          whenever you need them.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} maxW="1000px" mx="auto">
          {ONGOING_ITEMS.map(function (item) {
            return (
              <VStack key={item.title} spacing={4} textAlign="center" p={6} bg="white" borderRadius="card" border="1px solid" borderColor="brand.borderLight">
                <Flex w={12} h={12} bg="brand.champagneSoft" align="center" justify="center" borderRadius="full">
                  <Icon as={item.icon} boxSize={5} color="brand.champagne" />
                </Flex>
                <Text fontFamily="heading" fontSize="sm" fontWeight={700} color="brand.slate">{item.title}</Text>
                <Text fontSize="xs" color="brand.body" lineHeight={1.8}>{item.description}</Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Section>

      <Section bg="brand.mist">
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
      </Section>
    </>
  );
}

export default NewPatients;
