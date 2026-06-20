// src/pages/NewPatients/index.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var JOURNEY_STEPS = [
  { num: '01', title: 'Initial consultation', description: 'A simple conversation about your health goals. No pressure, no commitment. Just an honest discussion about whether AnswersMD is right for you.' },
  { num: '02', title: 'Meet your doctor', description: 'You\'ll meet the physician who will become your primary care provider. This is about fit, not formality.' },
  { num: '03', title: 'Simple enrollment', description: 'No mountains of paperwork. When you\'re ready, enrollment takes minutes and your membership begins immediately.' },
  { num: '04', title: 'The deep-dive visit', description: 'Your first extended visit is a comprehensive assessment. No rushing. We review everything and build your personalized health roadmap.' }
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
  { name: 'Complete blood count', description: 'Red cells, white cells, platelets, hemoglobin and hematocrit' },
  { name: 'Comprehensive metabolic panel', description: 'Liver function, kidney function, electrolytes and glucose' },
  { name: 'Advanced lipid panel', description: 'Beyond standard cholesterol to particle size and density profiles' },
  { name: 'Complete thyroid panel', description: 'TSH, Free T3, Free T4 and thyroid antibodies' },
  { name: 'Hemoglobin A1c', description: 'Average blood sugar, screening for pre-diabetes and diabetes' },
  { name: 'Inflammatory markers', description: 'CRP and inflammation indicators linked to chronic disease risk' },
  { name: 'Vitamin and mineral panel', description: 'D, B12, iron, magnesium and other essential nutrients' },
  { name: 'Hormone assessment', description: 'Testosterone, estrogen, cortisol and DHEA levels' },
  { name: 'Cancer markers', description: 'PSA, CEA and other age-appropriate cancer screenings' }
];

var PREPARE_ITEMS = [
  { title: 'Your medical records', description: 'We\'ll request records from your previous providers but bringing copies of recent labs, imaging and medication lists helps us start faster.' },
  { title: 'Your questions', description: 'Write them down. There\'s no time limit on our conversations so bring everything you\'ve been wanting to ask a doctor.' },
  { title: 'Your medications', description: 'A complete list of everything you take. Prescriptions, supplements, vitamins. Photos of the bottles work great.' }
];

var ONGOING_ITEMS = [
  { title: '24/7 direct access', description: 'Your physician\'s cell phone number. Call, text or video whenever you need guidance.' },
  { title: 'Same-day availability', description: 'When something comes up, you\'re seen that day. No waiting weeks for an opening.' },
  { title: 'House calls available', description: 'We\'ll come to your home, office or wherever life takes you.' },
  { title: 'Specialist coordination', description: 'We manage the referrals, share records and follow up to ensure nothing falls through.' }
];

function Section({ children, bg, refProp, inView }) {
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg={bg} ref={refProp}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          {children}
        </MotionBox>
      </Box>
    </Box>
  );
}

function NewPatients() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  var [editRef, editInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [comfortRef, comfortInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [journeyRef, journeyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [diveRef, diveInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [labRef, labInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [prepRef, prepInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [ongoingRef, ongoingInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>What to Expect | AnswersMD&trade;</title>
        <meta name="description" content="Your guide to joining AnswersMD. From your first consultation to comprehensive care." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={heroRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} textAlign="center" maxW="680px" mx="auto">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>New members</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>What to expect</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">Your guide to joining AnswersMD. From your first consultation to comprehensive care.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Section bg="white" refProp={editRef} inView={editInView}>
        <Box maxW="700px" mx="auto">
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>Healthcare should never feel rushed</Text>
          <VStack spacing={5} align="flex-start" mb={10}>
            <Text fontSize="md" color="brand.body" lineHeight={1.9}>Most people have never experienced what a real doctor-patient relationship can be. Appointments that don't feel like you're against the clock. A physician who remembers not just your medical history but your life. Someone who picks up the phone when you call.</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.9}>At AnswersMD, we've built a practice around a simple belief. When your doctor has time to truly know you, everything changes. Problems get caught earlier. Care becomes proactive instead of reactive. And you finally have a partner in your health.</Text>
          </VStack>
          <Box borderLeft="3px solid" borderColor="brand.champagne" pl={8} py={2}>
            <Text fontSize="md" color="brand.slate" fontStyle="italic" lineHeight={1.85} mb={3}>"From the moment you join, you have a doctor with time for you. Not a call center, not a waiting list, not a runaround. A real person who knows your name and picks up the phone."</Text>
            <Text fontSize="sm" fontWeight={600} color="brand.champagne">Dr. Douglas Shapiro, Founder</Text>
          </Box>
        </Box>
      </Section>

      <Section bg="brand.mist" refProp={comfortRef} inView={comfortInView}>
        <Box maxW="700px" mx="auto" textAlign="center">
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Your care, your comfort level</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>Everything is on your terms</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.9} mb={8}>We tailor everything to you. Not every patient wants every test. Not everyone is comfortable with every procedure. We know that. Your visits, your services and your ongoing care are shaped by your needs, your preferences and your goals.</Text>
          <HStack spacing={3} justify="center" flexWrap="wrap">
            {['Tailored to you', 'No pressure', 'Your pace'].map(function (tag) {
              return (
                <Box key={tag} bg="white" px={5} py={2} borderRadius="btn">
                  <Text fontSize="sm" fontWeight={500} color="brand.slate">{tag}</Text>
                </Box>
              );
            })}
          </HStack>
        </Box>
      </Section>

      <Section bg="white" refProp={journeyRef} inView={journeyInView}>
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Your journey</Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={12} textAlign="center">From first call to lifelong care</Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 10, md: 8 }} maxW="1000px" mx="auto">
          {JOURNEY_STEPS.map(function (step) {
            return (
              <Box key={step.num}>
                <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.champagne" lineHeight={1} mb={3}>{step.num}</Text>
                <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={3}>{step.title}</Text>
                <Text fontSize="sm" color="brand.body" lineHeight={1.85}>{step.description}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Section>

      <Section bg="brand.ivory" refProp={diveRef} inView={diveInView}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 16 }} maxW="1000px" mx="auto">
          <Box flex={1}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>The welcome visit</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>Your deep-dive</Text>
            <VStack spacing={4} align="flex-start">
              <Text fontSize="md" color="brand.body" lineHeight={1.9}>The first comprehensive exam at AnswersMD isn't like anything you've experienced in traditional medicine. It's not a quick physical. It's not a checklist. It's a thoughtful, unhurried exploration of your complete health.</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.9}>Your deep-dive is a multi-visit process. We start with an extended appointment, then we run advanced labs, review results together and build your personalized health roadmap.</Text>
            </VStack>
          </Box>
          <Box w={{ base: '100%', lg: '320px' }} flexShrink={0} pt={{ base: 0, lg: 10 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Your visit includes</Text>
            <VStack align="flex-start" spacing={3}>
              {DEEP_DIVE_INCLUDES.map(function (item) {
                return (
                  <HStack key={item} spacing={3} align="flex-start">
                    <Box w="5px" h="5px" borderRadius="full" bg="brand.champagne" mt={2} flexShrink={0} />
                    <Text fontSize="sm" color="brand.body" lineHeight={1.6}>{item}</Text>
                  </HStack>
                );
              })}
            </VStack>
          </Box>
        </Flex>
      </Section>

      <Section bg="white" refProp={labRef} inView={labInView}>
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Comprehensive testing</Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={4} textAlign="center">We don't guess. We test.</Text>
        <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="560px" mx="auto" textAlign="center" mb={12}>Your welcome visit includes an extensive panel of laboratory tests that goes far beyond the standard annual physical.</Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 10 }} maxW="900px" mx="auto">
          {LAB_PANELS.map(function (panel) {
            return (
              <Box key={panel.name}>
                <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={2}>{panel.name}</Text>
                <Text fontSize="xs" color="brand.body" lineHeight={1.75}>{panel.description}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Section>

      <Section bg="brand.mist" refProp={prepRef} inView={prepInView}>
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Before your visit</Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={12} textAlign="center">How to prepare</Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 12 }} maxW="900px" mx="auto">
          {PREPARE_ITEMS.map(function (item) {
            return (
              <Box key={item.title}>
                <Text fontSize="md" fontWeight={700} color="brand.slate" mb={3}>{item.title}</Text>
                <Text fontSize="sm" color="brand.body" lineHeight={1.85}>{item.description}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Section>

      <Section bg="brand.ivory" refProp={ongoingRef} inView={ongoingInView}>
        <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">After your deep-dive</Text>
        <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={4} textAlign="center">Ongoing care</Text>
        <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="520px" mx="auto" textAlign="center" mb={12}>The deep-dive visit is just the beginning. The real value is what comes after. A physician who knows you, available whenever you need them.</Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 8, md: 10 }} maxW="1000px" mx="auto">
          {ONGOING_ITEMS.map(function (item) {
            return (
              <Box key={item.title} textAlign="center">
                <Text fontSize="md" fontWeight={700} color="brand.slate" mb={3}>{item.title}</Text>
                <Text fontSize="sm" color="brand.body" lineHeight={1.85}>{item.description}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Section>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <VStack spacing={8} textAlign="center" maxW="560px" mx="auto" px={6}>
          <Box w="32px" h="1px" bg="brand.champagne" />
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to experience the difference?</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.8}>It starts with a conversation. No commitment, no pressure.</Text>
          <Flex gap={4} direction={{ base: 'column', sm: 'row' }} w={{ base: '100%', sm: 'auto' }}>
            <Button as={Link} to="/contact/" variant="primary" size="lg" w={{ base: '100%', sm: 'auto' }}>Schedule a consultation</Button>
            <Button as={Link} to="/signup/" variant="secondary" size="lg" w={{ base: '100%', sm: 'auto' }}>Join now</Button>
          </Flex>
          <ChakraLink href="tel:8137273233" fontSize="sm" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }}>or call 813-727-3233</ChakraLink>
        </VStack>
      </Box>
    </>
  );
}

export default NewPatients;
