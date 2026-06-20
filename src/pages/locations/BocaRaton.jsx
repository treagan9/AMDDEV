// src/pages/Locations/BocaRaton.jsx
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
  { label: 'Luxury Living', detail: 'World-class resorts, golf & waterfront estates' },
  { label: 'Top-Rated Schools', detail: 'A+ schools & Florida Atlantic University' },
  { label: 'Business Center', detail: 'Corporate headquarters & professional community' }
];

var PHYSICIANS = [
  { name: 'Dr. Douglas Shapiro, DO', role: 'Founder & Lead Physician', photo: '/team/dr-doug-shapiro.png', bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be: personal, unhurried and built on real relationships.' },
  { name: "Dr. Divino D'Alessio Jr., MD", role: 'Sports & Family Medicine', photo: '/team/dr-divino-dalessio.png', bio: "Board-certified Family Medicine paired with advanced Sports Medicine training. He cares for active adults, athletes and families who want evidence-based care focused on performance, prevention and safe return to activity." }
];

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png' }
];

function BocaRaton() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>Boca Raton | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD Boca Raton: expanding concierge medicine to South Florida and Palm Beach County. Join our waitlist." />
      </Helmet>

      <Box position="relative" minH={{ base: '70vh', md: '80vh' }} display="flex" alignItems="flex-end" overflow="hidden" ref={heroRef}>
        <Image src="/locations/boca-main.png" alt="AnswersMD Boca Raton" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to bottom, rgba(27,58,52,0.15) 0%, rgba(27,58,52,0.65) 100%)" />
        <Box position="absolute" top={0} left={0} right={0} h="120px" bg="linear-gradient(to bottom, rgba(250,250,247,0.7) 0%, transparent 100%)" />
        <Box maxW="98%" mx="auto" w="100%" px={{ base: 6, md: 4 }} pb={{ base: 12, md: 16 }} position="relative" zIndex={2}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Coming Soon</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl' }} fontWeight={700} color="white" lineHeight={1.05} mb={3}>Boca Raton</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.800" maxW="500px">Expanding to South Florida to bring exceptional concierge medicine to Palm Beach County.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 16 }} maxW="1100px" mx="auto">
            <Box flex={1}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Life in Boca Raton</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>Where excellence is the standard, in every aspect of life</Text>
              <VStack spacing={4} align="flex-start">
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>Boca Raton is a city that doesn't settle. From its pristine beaches to its championship golf courses, from its top-rated schools to its thriving business community, Boca has established itself as one of South Florida's most coveted addresses for those who expect the best.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>Boca attracts a unique mix: successful executives who could live anywhere but choose here, retirees who've earned the right to enjoy life on their terms and young families drawn by some of Florida's best schools and safest neighborhoods.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>AnswersMD is bringing concierge medicine to Boca Raton because this community deserves healthcare that matches everything else about life here: personal, exceptional and uncompromising.</Text>
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
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Address</Text>
              <Text fontSize="sm" color="brand.body">1801 S Federal Hwy<br />Boca Raton, FL 33432</Text>
            </Box>
            <Box p={8} bg="white" borderRadius="card">
              <Icon as={HiOutlinePhone} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Contact</Text>
              <ChakraLink href="tel:5619333333" fontSize="sm" color="brand.body" display="block">561-933-3333</ChakraLink>
              <Text fontSize="xs" color="brand.bodyLight" mt={1}>Fax: 844-670-8963</Text>
              <ChakraLink href="mailto:bocaraton@answersmd.com" fontSize="sm" color="brand.champagne" display="block" mt={2}>bocaraton@answersmd.com</ChakraLink>
            </Box>
            <Box p={8} bg="white" borderRadius="card">
              <Icon as={HiOutlineClock} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Hours</Text>
              <Text fontSize="sm" color="brand.body">Monday to Friday: 8am to 5pm</Text>
              <Text fontSize="sm" color="brand.champagne" mt={1}>24/7 member access</Text>
            </Box>
          </SimpleGrid>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Your care team</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={12} textAlign="center">Meet the Boca Raton team</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="800px" mx="auto" mb={12}>
            {PHYSICIANS.map(function (doc) {
              return (
                <Flex key={doc.name} direction={{ base: 'column', sm: 'row' }} gap={6} p={8} bg="white" borderRadius="card" border="1px solid" borderColor="brand.borderLight">
                  <Box w="100px" h="100px" borderRadius="full" overflow="hidden" flexShrink={0} bg="brand.mist">
                    <Image src={doc.photo} alt={doc.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                  </Box>
                  <Box>
                    <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={1}>{doc.name}</Text>
                    <Text fontSize="sm" color="brand.champagne" fontWeight={500} mb={3}>{doc.role}</Text>
                    <Text fontSize="sm" color="brand.body" lineHeight={1.8}>{doc.bio}</Text>
                  </Box>
                </Flex>
              );
            })}
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={8} maxW="300px" mx="auto">
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
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Interested in our Boca Raton location?</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.8}>Join our waitlist to be notified when we open and secure your membership.</Text>
          <Button as={Link} to="/contact/" variant="primary" size="lg">Join the waitlist</Button>
        </VStack>
      </Box>
    </>
  );
}

export default BocaRaton;
