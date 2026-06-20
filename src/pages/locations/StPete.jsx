// src/pages/Locations/StPete.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Image,
  Button,
  Icon,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlinePhone, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';

var MotionBox = motion(Box);

var HIGHLIGHTS = [
  { label: 'Arts & Culture', detail: 'World-class museums, galleries & creative community' },
  { label: 'Sunshine Capital', detail: '361 days of sunshine & perfect beach weather' },
  { label: 'Tight-Knit Community', detail: 'Neighborhoods where people know your name' }
];

var PHYSICIANS = [
  { name: 'Dr. Douglas Shapiro, DO', role: 'Founder & Lead Physician', photo: '/team/dr-doug-shapiro.png', bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be: personal, unhurried and built on real relationships.' },
  { name: 'Dr. Drew Meriwether, MD', role: 'Pediatric & Internal Medicine', photo: '/team/dr-drew-meriwether.png', bio: 'A USF Health Clinician of the Year with dual board certifications, providing seamless care for entire families from newborns to grandparents.' },
  { name: 'Dr. Ellen Howard, MD, MPH', role: 'Family & Preventive Medicine', photo: '/team/dr-ellen-howard.png', bio: 'Board-certified family physician with a Master\'s in Public Health. She completed her residency in St. Petersburg and is proud to return to the community she considers home.' }
];

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.png' }
];

function StPete() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>St. Petersburg | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD St. Petersburg: concierge medicine in the heart of St. Pete with 24/7 direct physician access." />
      </Helmet>

      <Box position="relative" minH={{ base: '70vh', md: '80vh' }} display="flex" alignItems="flex-end" overflow="hidden" ref={heroRef}>
        <Image src="/locations/st-pete.png" alt="AnswersMD St. Petersburg" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to bottom, rgba(27,58,52,0.15) 0%, rgba(27,58,52,0.65) 100%)" />
        <Box position="absolute" top={0} left={0} right={0} h="120px" bg="linear-gradient(to bottom, rgba(250,250,247,0.7) 0%, transparent 100%)" />
        <Box maxW="98%" mx="auto" w="100%" px={{ base: 6, md: 4 }} pb={{ base: 12, md: 16 }} position="relative" zIndex={2}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Now Open</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl' }} fontWeight={700} color="white" lineHeight={1.05} mb={3}>St. Petersburg</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.800" maxW="500px">Bringing exceptional concierge medicine to the heart of St. Pete and the Tampa Bay area.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 16 }} maxW="1100px" mx="auto">
            <Box flex={1}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Life in St. Petersburg</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>The Sunshine City: where art, nature and life converge</Text>
              <VStack spacing={4} align="flex-start">
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>St. Petersburg isn't just a place to live. It's a place to thrive. With more sunny days than almost any city in America, world-renowned museums and some of the most beautiful beaches on the Gulf Coast, St. Pete has evolved into one of Florida's most desirable communities.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>St. Pete residents know what they want: quality over quantity, experience over excess and authenticity over pretense. They choose restaurants where the chef knows their name. They invest in their community and their wellbeing.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>Shouldn't your healthcare reflect those same values? At AnswersMD, we believe St. Pete deserves a medical practice that matches its character: thoughtful, personal and genuinely invested in your life.</Text>
              </VStack>
            </Box>
            <VStack spacing={4} w={{ base: '100%', lg: '300px' }} flexShrink={0}>
              {HIGHLIGHTS.map(function (h) {
                return (
                  <Box key={h.label} w="100%" p={6} bg="brand.ivory" borderRadius="card">
                    <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={1}>{h.label}</Text>
                    <Text fontSize="sm" color="brand.body">{h.detail}</Text>
                  </Box>
                );
              })}
            </VStack>
          </Flex>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} maxW="900px" mx="auto" mb={{ base: 16, md: 20 }}>
            <Box p={8} bg="white" borderRadius="card">
              <Icon as={HiOutlineLocationMarker} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Location</Text>
              <Text fontSize="sm" color="brand.body">By appointment only<br />St. Petersburg, FL</Text>
            </Box>
            <Box p={8} bg="white" borderRadius="card">
              <Icon as={HiOutlinePhone} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Contact</Text>
              <ChakraLink href="tel:8137273233" fontSize="sm" color="brand.body" display="block">813-727-3233</ChakraLink>
              <Text fontSize="xs" color="brand.bodyLight" mt={1}>Fax: 833-941-5028</Text>
              <ChakraLink href="mailto:stpete@answersmd.com" fontSize="sm" color="brand.champagne" display="block" mt={2}>stpete@answersmd.com</ChakraLink>
            </Box>
            <Box p={8} bg="white" borderRadius="card">
              <Icon as={HiOutlineClock} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Hours</Text>
              <Text fontSize="sm" color="brand.body">Monday to Friday: 8am to 5pm</Text>
              <Text fontSize="sm" color="brand.champagne" mt={1}>24/7 member access</Text>
            </Box>
          </SimpleGrid>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Your care team</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={4} textAlign="center">Meet the St. Petersburg team</Text>
          <Text fontSize="md" color="brand.body" textAlign="center" mb={12} maxW="500px" mx="auto">The physicians and staff dedicated to your care at our St. Pete location.</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="960px" mx="auto" mb={12}>
            {PHYSICIANS.map(function (doc) {
              return (
                <VStack key={doc.name} spacing={4} p={8} bg="white" borderRadius="card" border="1px solid" borderColor="brand.borderLight" textAlign="center">
                  <Box w="90px" h="90px" borderRadius="full" overflow="hidden" bg="brand.mist">
                    <Image src={doc.photo} alt={doc.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                  </Box>
                  <Box>
                    <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={1}>{doc.name}</Text>
                    <Text fontSize="xs" color="brand.champagne" fontWeight={500} mb={3}>{doc.role}</Text>
                    <Text fontSize="sm" color="brand.body" lineHeight={1.8}>{doc.bio}</Text>
                  </Box>
                </VStack>
              );
            })}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 3 }} spacing={8} maxW="400px" mx="auto">
            {STAFF.map(function (m) {
              return (
                <VStack key={m.name} spacing={2} textAlign="center">
                  <Box w="64px" h="64px" borderRadius="full" overflow="hidden" bg="brand.mist" border="2px solid" borderColor="brand.borderLight">
                    <Image src={m.photo} alt={m.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                  </Box>
                  <Text fontSize="xs" fontWeight={600} color="brand.slate">{m.name}</Text>
                  <Text fontSize="xs" color="brand.champagne">{m.role}</Text>
                </VStack>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist">
        <VStack spacing={7} textAlign="center" maxW="600px" mx="auto" px={6}>
          <Box w="32px" h="1px" bg="brand.champagne" />
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to join our St. Petersburg practice?</Text>
          <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule your consultation</Button>
        </VStack>
      </Box>
    </>
  );
}

export default StPete;
