// src/pages/Locations/BocaRaton.jsx
import {
  Box,
  Flex,
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

var PHYSICIANS = [
  { name: 'Douglas Shapiro, DO', role: 'Founder & Lead Physician', photo: '/team/dr-doug-shapiro.png', bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be. Personal, unhurried and built on real relationships. With over 6 years of experience in family medicine, he brings a genuine commitment to knowing each patient as an individual.' },
  { name: "Divino D'Alessio Jr., MD", role: 'Sports & Family Medicine', photo: '/team/dr-divino-dalessio.png', bio: "Board-certified Family Medicine paired with advanced Sports Medicine training including NCAA Division I team coverage and diagnostic musculoskeletal ultrasound. He cares for active adults, athletes and families who want evidence-based care focused on performance, prevention and safe return to activity." }
];

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png' }
];

function BocaRaton() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>Boca Raton | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD Boca Raton. Expanding concierge medicine to South Florida and Palm Beach County. Join our waitlist." />
      </Helmet>

      <Box position="relative" overflow="hidden" ref={heroRef}>
        <Box position="relative" pb={{ base: '75%', md: '50%', lg: '45%' }} overflow="hidden">
          <Image src="/locations/boca-main.png" alt="AnswersMD Boca Raton" objectFit="cover" objectPosition="center 40%" position="absolute" top={0} left={0} w="100%" h="100%" />
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to bottom, rgba(27,58,52,0.08) 0%, rgba(27,58,52,0.55) 100%)" />
          <Box position="absolute" top={0} left={0} right={0} h="140px" bg="linear-gradient(to bottom, rgba(250,250,247,0.8) 0%, transparent 100%)" />
          <Box position="absolute" bottom={0} left={0} right={0} px={{ base: 6, md: 4 }} pb={{ base: 8, md: 14 }} maxW="98%" mx="auto">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Coming Soon</Text>
              <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="white" lineHeight={1.02}>Boca Raton</Text>
            </MotionBox>
          </Box>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 14, lg: 20 }} maxW="1100px" mx="auto">
            <Box flex={1}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Life in Boca Raton</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={8}>Where excellence is the standard in every aspect of life</Text>
              <VStack spacing={5} align="flex-start">
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>Boca Raton is a city that doesn't settle. From its pristine beaches to its championship golf courses, from its top-rated schools to its thriving business community, Boca has established itself as one of South Florida's most coveted addresses for those who expect the best.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>Boca attracts a unique mix. Successful executives who could live anywhere but choose here, retirees who've earned the right to enjoy life on their terms and young families drawn by some of Florida's best schools and safest neighborhoods. What they share is a refusal to accept mediocrity.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>AnswersMD is bringing concierge medicine to Boca Raton because this community deserves healthcare that matches everything else about life here. Personal, exceptional and uncompromising.</Text>
              </VStack>
            </Box>
            <Box w={{ base: '100%', lg: '260px' }} flexShrink={0} pt={{ base: 0, lg: 14 }}>
              <VStack align="flex-start" spacing={7}>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Address</Text>
                  <Text fontSize="sm" color="brand.body">1801 S Federal Hwy</Text>
                  <Text fontSize="sm" color="brand.body">Boca Raton, FL 33432</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Phone</Text>
                  <ChakraLink href="tel:5619333333" fontSize="sm" color="brand.body" _hover={{ color: 'brand.champagne' }}>561-933-3333</ChakraLink>
                  <Text fontSize="xs" color="brand.bodyLight" mt={1}>Fax 844-670-8963</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Hours</Text>
                  <Text fontSize="sm" color="brand.body">Monday through Friday</Text>
                  <Text fontSize="sm" color="brand.body">8am to 5pm</Text>
                  <Text fontSize="sm" color="brand.champagne" mt={2}>24/7 member access</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Email</Text>
                  <ChakraLink href="mailto:bocaraton@answersmd.com" fontSize="sm" color="brand.champagne" _hover={{ color: 'brand.champagneDark' }}>bocaraton@answersmd.com</ChakraLink>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={teamRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Your care team</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={{ base: 12, md: 16 }} textAlign="center">Meet the Boca Raton team</Text>
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

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ctaRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <VStack spacing={8} textAlign="center" maxW="560px" mx="auto">
              <Box w="32px" h="1px" bg="brand.champagne" />
              <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Interested in our Boca Raton location?</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.8}>Join our waitlist to be notified when we open and secure your membership.</Text>
              <Flex gap={4} direction={{ base: 'column', sm: 'row' }} w={{ base: '100%', sm: 'auto' }}>
                <Button as={Link} to="/contact/" variant="primary" size="lg" w={{ base: '100%', sm: 'auto' }}>Join the waitlist</Button>
                <Button as={Link} to="/signup/" variant="secondary" size="lg" w={{ base: '100%', sm: 'auto' }}>Learn more</Button>
              </Flex>
              <ChakraLink href="tel:5619333333" fontSize="sm" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }}>or call 561-933-3333</ChakraLink>
            </VStack>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default BocaRaton;
