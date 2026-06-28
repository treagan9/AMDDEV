// src/pages/Locations/Tampa.jsx
import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  Text,
  Image,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var ROW_1 = [
  '/locations/tampa-office-1.png',
  '/locations/tampa-office-2.png',
  '/locations/tampa-office-3.png'
];

var ROW_2 = [
  '/locations/tampa-office-4.png',
  '/locations/tampa-office-5.png',
  '/locations/tampa-office-6.png'
];

var PHYSICIANS = [
  { name: 'Douglas Shapiro, DO', role: 'Founder & Lead Physician', photo: '/team/dr-doug-shapiro.png', bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be. Personal, unhurried and built on real relationships. With over 6 years of experience in family medicine, he brings a genuine commitment to knowing each patient as an individual.' },
  { name: 'Drew Meriwether, MD', role: 'Pediatric & Internal Medicine', photo: '/team/dr-drew-meriwether.png', bio: 'A USF Health Clinician of the Year with dual board certifications in Pediatrics and Internal Medicine. Dr. Meriwether provides seamless care for entire families from newborns to grandparents.' }
];

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.png' },
  { name: 'Laura Gore', role: 'Nurse Manager', photo: '/team/laura-gore.png' },
  { name: 'Sarah Juarez', role: 'Medical Assistant', photo: '/team/sarah-juarez.png' }
];

function GalleryImage({ src, delay, inView }) {
  return (
    <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: delay }} position="relative" overflow="hidden" role="group">
      <Box position="relative" pb="75%" overflow="hidden">
        <Image src={src} alt="AnswersMD Tampa" objectFit="cover" position="absolute" top={0} left={0} w="100%" h="100%" transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" _groupHover={{ transform: 'scale(1.04)' }} />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="rgba(27,58,52,0.06)" transition="background 0.4s ease" _groupHover={{ bg: 'rgba(27,58,52,0.12)' }} />
      </Box>
    </MotionBox>
  );
}

function Tampa() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [galleryRef, galleryInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>Tampa | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD Tampa. Flagship concierge medicine location with 24/7 physician access in Tampa, Florida." />
      </Helmet>

      <Box position="relative" overflow="hidden" ref={heroRef}>
        <Box position="relative" pb={{ base: '75%', md: '50%', lg: '45%' }} overflow="hidden">
          <Image src="/locations/tampa-office-main.png" alt="AnswersMD Tampa" objectFit="cover" objectPosition="center 40%" position="absolute" top={0} left={0} w="100%" h="100%" />
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to bottom, rgba(27,58,52,0.08) 0%, rgba(27,58,52,0.55) 100%)" />
          <Box position="absolute" top={0} left={0} right={0} h="140px" bg="linear-gradient(to bottom, rgba(250,250,247,0.8) 0%, transparent 100%)" />
          <Box position="absolute" bottom={0} left={0} right={0} px={{ base: 6, md: 4 }} pb={{ base: 8, md: 14 }} maxW="98%" mx="auto">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Flagship Location</Text>
              <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="white" lineHeight={1.02}>Tampa</Text>
            </MotionBox>
          </Box>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 14, lg: 20 }} maxW="1100px" mx="auto">
            <Box flex={1}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Life in Tampa</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={8}>A city that moves and deserves healthcare that keeps up</Text>
              <VStack spacing={5} align="flex-start">
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>Tampa is a city of ambition. From the high-rises of downtown to the tree-lined streets of South Tampa, this is where entrepreneurs build companies, families put down roots and professionals balance demanding careers with the Florida lifestyle they came here for.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>Traditional healthcare wasn't built for how Tampa lives. Waiting three weeks for an appointment only to sit in a waiting room for seven minutes with a doctor who doesn't know your name isn't just inconvenient. It's unacceptable.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>Tampa deserves healthcare that matches its energy. Responsive, personal and designed for people who have things to do and places to be.</Text>
              </VStack>
            </Box>
            <Box w={{ base: '100%', lg: '260px' }} flexShrink={0} pt={{ base: 0, lg: 14 }}>
              <VStack align="flex-start" spacing={7}>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Address</Text>
                  <Text fontSize="sm" color="brand.body" lineHeight={1.7}>4100 W Kennedy Blvd</Text>
                  <Text fontSize="sm" color="brand.body">Tampa, FL 33609</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Phone</Text>
                  <ChakraLink href="tel:8137273233" fontSize="sm" color="brand.body" _hover={{ color: 'brand.champagne' }}>813-727-3233</ChakraLink>
                  <Text fontSize="xs" color="brand.bodyLight" mt={1}>Fax 833-941-5028</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Hours</Text>
                  <Text fontSize="sm" color="brand.body">Monday through Friday</Text>
                  <Text fontSize="sm" color="brand.body">8am to 5pm</Text>
                  <Text fontSize="sm" color="brand.champagne" mt={2}>24/7 member access</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Email</Text>
                  <ChakraLink href="mailto:tampa@answersmd.com" fontSize="sm" color="brand.champagne" _hover={{ color: 'brand.champagneDark' }}>tampa@answersmd.com</ChakraLink>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box ref={galleryRef}>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={0}>
          {ROW_1.map(function (src, i) {
            return <GridItem key={src}><GalleryImage src={src} delay={i * 0.1} inView={galleryInView} /></GridItem>;
          })}
        </Grid>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={0}>
          {ROW_2.map(function (src, i) {
            return <GridItem key={src}><GalleryImage src={src} delay={0.3 + i * 0.1} inView={galleryInView} /></GridItem>;
          })}
        </Grid>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={teamRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Your care team</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={{ base: 12, md: 16 }} textAlign="center">Meet the Tampa team</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 14, md: 16 }} maxW="800px" mx="auto" mb={{ base: 14, md: 18 }}>
            {PHYSICIANS.map(function (doc, i) {
              return (
                <MotionBox key={doc.name} initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }} textAlign="center">
                  <Box w={{ base: '180px', md: '200px' }} h={{ base: '180px', md: '200px' }} borderRadius="full" overflow="hidden" mx="auto" mb={6} border="3px solid" borderColor="brand.champagne">
                    <Image src={doc.photo} alt={doc.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                  </Box>
                  <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" mb={1}>{doc.name}</Text>
                  <Text fontSize="sm" color="brand.champagne" fontWeight={500} mb={4}>{doc.role}</Text>
                  <Text fontSize="sm" color="brand.body" lineHeight={1.85}>{doc.bio}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>

          <Box w="40px" h="1px" bg="brand.champagneLine" mx="auto" mb={10} />

          <Flex justify="center" gap={{ base: 6, md: 10 }} flexWrap="wrap">
            {STAFF.map(function (m, i) {
              return (
                <MotionBox key={m.name} initial={{ opacity: 0, y: 16 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }} textAlign="center" w={{ base: '70px', md: '90px' }}>
                  <Box w={{ base: '70px', md: '88px' }} h={{ base: '70px', md: '88px' }} borderRadius="full" overflow="hidden" mx="auto" mb={3} border="2px solid" borderColor="brand.borderLight">
                    <Image src={m.photo} alt={m.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                  </Box>
                  <Text fontSize="xs" fontWeight={600} color="brand.slate" lineHeight={1.3}>{m.name}</Text>
                  <Text fontSize="xs" color="brand.bodyLight" mt={1}>{m.role}</Text>
                </MotionBox>
              );
            })}
          </Flex>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ctaRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <VStack spacing={8} textAlign="center" maxW="560px" mx="auto">
              <Box w="32px" h="1px" bg="brand.champagne" />
              <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to join our Tampa practice?</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.8}>Whether you're ready to enroll or just want to learn more, we're here.</Text>
              <Flex gap={4} direction={{ base: 'column', sm: 'row' }} w={{ base: '100%', sm: 'auto' }}>
                <Button as={Link} to="/contact/" variant="primary" size="lg" w={{ base: '100%', sm: 'auto' }}>Schedule a consultation</Button>
                <Button as={Link} to="/signup/" variant="secondary" size="lg" w={{ base: '100%', sm: 'auto' }}>Join now</Button>
              </Flex>
              <ChakraLink href="tel:8137273233" fontSize="sm" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }}>or call 813-727-3233</ChakraLink>
            </VStack>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default Tampa;
