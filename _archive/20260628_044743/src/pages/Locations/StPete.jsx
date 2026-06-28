// src/pages/Locations/StPete.jsx
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
  { name: 'Drew Meriwether, MD', role: 'Pediatric & Internal Medicine', photo: '/team/dr-drew-meriwether.png', bio: 'A USF Health Clinician of the Year with dual board certifications in Pediatrics and Internal Medicine. Dr. Meriwether provides seamless care for entire families from newborns to grandparents.' },
  { name: 'Ellen Howard, MD, MPH', role: 'Family & Preventive Medicine', photo: '/team/dr-ellen-howard.png', bio: 'Board-certified family physician with a Master\'s in Public Health. She completed her residency in St. Petersburg and is proud to return to the community she considers home. Her interests center on hormone therapy, weight management and preventive lifestyle medicine.' }
];

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.png' },
  { name: 'Laura Gore', role: 'Nurse Manager', photo: '/team/laura-gore.png' },
  { name: 'Sarah Juarez', role: 'Medical Assistant', photo: '/team/sarah-juarez.png' }
];

function StPete() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>St. Petersburg | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD St. Petersburg. Concierge medicine in the heart of St. Pete with 24/7 direct physician access." />
      </Helmet>

      <Box position="relative" overflow="hidden" ref={heroRef}>
        <Box position="relative" pb={{ base: '75%', md: '50%', lg: '45%' }} overflow="hidden">
          <Image src="/locations/st-pete.png" alt="AnswersMD St. Petersburg" objectFit="cover" objectPosition="center 40%" position="absolute" top={0} left={0} w="100%" h="100%" />
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to bottom, rgba(27,58,52,0.08) 0%, rgba(27,58,52,0.55) 100%)" />
          <Box position="absolute" top={0} left={0} right={0} h="140px" bg="linear-gradient(to bottom, rgba(250,250,247,0.8) 0%, transparent 100%)" />
          <Box position="absolute" bottom={0} left={0} right={0} px={{ base: 6, md: 4 }} pb={{ base: 8, md: 14 }} maxW="98%" mx="auto">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Now Open</Text>
              <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="white" lineHeight={1.02}>St. Petersburg</Text>
            </MotionBox>
          </Box>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 14, lg: 20 }} maxW="1100px" mx="auto">
            <Box flex={1}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Life in St. Petersburg</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={8}>Where art, nature and life converge</Text>
              <VStack spacing={5} align="flex-start">
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>St. Petersburg isn't just a place to live. It's a place to thrive. With more sunny days than almost any city in America, world-renowned museums and some of the most beautiful beaches on the Gulf Coast, St. Pete has evolved into one of Florida's most desirable communities.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>St. Pete residents know what they want. Quality over quantity, experience over excess and authenticity over pretense. They choose restaurants where the chef knows their name. They invest in their community and their wellbeing.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.9}>Shouldn't your healthcare reflect those same values? At AnswersMD, we believe St. Pete deserves a medical practice that matches its character. Thoughtful, personal and genuinely invested in your life.</Text>
              </VStack>
            </Box>
            <Box w={{ base: '100%', lg: '260px' }} flexShrink={0} pt={{ base: 0, lg: 14 }}>
              <VStack align="flex-start" spacing={7}>
                <Box>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate" mb={1}>Location</Text>
                  <Text fontSize="sm" color="brand.body">By appointment only</Text>
                  <Text fontSize="sm" color="brand.body">St. Petersburg, FL</Text>
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
                  <ChakraLink href="mailto:stpete@answersmd.com" fontSize="sm" color="brand.champagne" _hover={{ color: 'brand.champagneDark' }}>stpete@answersmd.com</ChakraLink>
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
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={{ base: 12, md: 16 }} textAlign="center">Meet the St. Petersburg team</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 12, md: 10 }} maxW="900px" mx="auto" mb={{ base: 14, md: 18 }}>
            {PHYSICIANS.map(function (doc, i) {
              return (
                <MotionBox key={doc.name} initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }} textAlign="center">
                  <Box w={{ base: '150px', md: '160px' }} h={{ base: '150px', md: '160px' }} borderRadius="full" overflow="hidden" mx="auto" mb={5} border="3px solid" borderColor="brand.champagne">
                    <Image src={doc.photo} alt={doc.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                  </Box>
                  <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={1}>{doc.name}</Text>
                  <Text fontSize="xs" color="brand.champagne" fontWeight={500} mb={3}>{doc.role}</Text>
                  <Text fontSize="xs" color="brand.body" lineHeight={1.85}>{doc.bio}</Text>
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
              <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to join our St. Petersburg practice?</Text>
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

export default StPete;
