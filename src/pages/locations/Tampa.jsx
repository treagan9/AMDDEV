// src/pages/Locations/Tampa.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  HStack,
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
import { HiOutlinePhone, HiOutlineMail, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';

var MotionBox = motion(Box);

var HIGHLIGHTS = [
  { label: 'Business Hub', detail: 'Fortune 500 headquarters & thriving startup scene' },
  { label: 'Family Friendly', detail: 'Top schools, safe neighborhoods & year-round activities' },
  { label: 'Active Lifestyle', detail: 'Bayshore, beaches & 361 days of sunshine' }
];

var GALLERY = [
  { src: '/locations/tampa-office-1.png', span: { base: 1, md: 2 } },
  { src: '/locations/tampa-office-2.png', span: { base: 1, md: 1 } },
  { src: '/locations/tampa-office-3.png', span: { base: 1, md: 1 } },
  { src: '/locations/tampa-office-4.png', span: { base: 1, md: 2 } },
  { src: '/locations/tampa-office-5.png', span: { base: 1, md: 1 } },
  { src: '/locations/tampa-office-6.png', span: { base: 1, md: 1 } }
];

var PHYSICIANS = [
  { name: 'Dr. Douglas Shapiro, DO', role: 'Founder & Lead Physician', photo: '/team/dr-doug-shapiro.png', bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be: personal, unhurried and built on real relationships.' },
  { name: 'Dr. Drew Meriwether, MD', role: 'Pediatric & Internal Medicine', photo: '/team/dr-drew-meriwether.png', bio: 'A USF Health Clinician of the Year with dual board certifications, Dr. Meriwether provides seamless care for entire families from newborns to grandparents.' }
];

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.png' }
];

function Tampa() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [galleryRef, galleryInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <>
      <Helmet>
        <title>Tampa | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD Tampa: our flagship concierge medicine location serving the Tampa Bay area with personalized, 24/7 physician access." />
      </Helmet>

      <Box position="relative" minH={{ base: '70vh', md: '80vh' }} display="flex" alignItems="flex-end" overflow="hidden" ref={heroRef}>
        <Image src="/locations/tampa-office-main.png" alt="AnswersMD Tampa office" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to bottom, rgba(27,58,52,0.15) 0%, rgba(27,58,52,0.65) 100%)" />
        <Box position="absolute" top={0} left={0} right={0} h="120px" bg="linear-gradient(to bottom, rgba(250,250,247,0.7) 0%, transparent 100%)" />
        <Box maxW="98%" mx="auto" w="100%" px={{ base: 6, md: 4 }} pb={{ base: 12, md: 16 }} position="relative" zIndex={2}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Flagship Location</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl' }} fontWeight={700} color="white" lineHeight={1.05} mb={3}>Tampa</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.800" maxW="500px">Our flagship location serving the Tampa Bay area with personalized concierge medicine.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 16 }} maxW="1100px" mx="auto">
            <Box flex={1}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Life in Tampa</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={6}>A city that moves, and deserves healthcare that keeps up</Text>
              <VStack spacing={4} align="flex-start">
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>Tampa is a city of ambition. From the high-rises of downtown to the tree-lined streets of South Tampa, this is where entrepreneurs build companies, families put down roots and professionals balance demanding careers with the Florida lifestyle they came here for.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>But here's the challenge: traditional healthcare wasn't built for how Tampa lives. When you're managing a business, raising a family and trying to actually enjoy this incredible city, waiting three weeks for an appointment isn't just inconvenient. It's unacceptable.</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>That's why we built AnswersMD here. Tampa deserves healthcare that matches its energy: responsive, personal and designed for people who have things to do and places to be.</Text>
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

      <Box py={{ base: 10, md: 14 }} bg="brand.ivory" ref={galleryRef}>
        <Box maxW="98%" mx="auto" px={{ base: 4, md: 4 }}>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={3}>
            {GALLERY.map(function (img, i) {
              return (
                <GridItem key={i} colSpan={img.span}>
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={galleryInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    overflow="hidden"
                    borderRadius="image"
                    h={{ base: '260px', md: '340px' }}
                  >
                    <Image src={img.src} alt="AnswersMD Tampa" objectFit="cover" w="100%" h="100%" transition="transform 0.6s ease" _hover={{ transform: 'scale(1.03)' }} />
                  </MotionBox>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} maxW="900px" mx="auto">
            <Box p={8} bg="brand.ivory" borderRadius="card">
              <Icon as={HiOutlineLocationMarker} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Address</Text>
              <Text fontSize="sm" color="brand.body" lineHeight={1.7}>4100 W Kennedy Blvd<br />Tampa, FL 33609</Text>
            </Box>
            <Box p={8} bg="brand.ivory" borderRadius="card">
              <Icon as={HiOutlinePhone} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Contact</Text>
              <ChakraLink href="tel:8137273233" fontSize="sm" color="brand.body" display="block">813-727-3233</ChakraLink>
              <Text fontSize="xs" color="brand.bodyLight" mt={1}>Fax: 833-941-5028</Text>
              <ChakraLink href="mailto:tampa@answersmd.com" fontSize="sm" color="brand.champagne" display="block" mt={2}>tampa@answersmd.com</ChakraLink>
            </Box>
            <Box p={8} bg="brand.ivory" borderRadius="card">
              <Icon as={HiOutlineClock} boxSize={5} color="brand.champagne" mb={3} />
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" mb={2}>Hours</Text>
              <Text fontSize="sm" color="brand.body" lineHeight={1.7}>Monday to Friday: 8am to 5pm</Text>
              <Text fontSize="sm" color="brand.champagne" mt={1}>24/7 member access via phone/text</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Your care team</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={4} textAlign="center">Meet the Tampa team</Text>
          <Text fontSize="md" color="brand.body" textAlign="center" mb={12} maxW="500px" mx="auto">The physicians and staff dedicated to your care at our Tampa location.</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="900px" mx="auto" mb={12}>
            {PHYSICIANS.map(function (doc) {
              return (
                <Flex key={doc.name} direction={{ base: 'column', sm: 'row' }} gap={6} p={8} bg="white" borderRadius="card" border="1px solid" borderColor="brand.borderLight">
                  <Box w={{ base: '100px', sm: '100px' }} h={{ base: '100px', sm: '100px' }} borderRadius="full" overflow="hidden" flexShrink={0} bg="brand.mist">
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
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} maxW="600px" mx="auto">
            {STAFF.map(function (member) {
              return (
                <VStack key={member.name} spacing={3} textAlign="center">
                  <Box w="80px" h="80px" borderRadius="full" overflow="hidden" bg="brand.mist" border="2px solid" borderColor="brand.borderLight">
                    <Image src={member.photo} alt={member.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight={600} color="brand.slate">{member.name}</Text>
                    <Text fontSize="xs" color="brand.champagne">{member.role}</Text>
                  </Box>
                </VStack>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <VStack spacing={7} textAlign="center" maxW="600px" mx="auto">
            <Box w="32px" h="1px" bg="brand.champagne" />
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to join our Tampa practice?</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8}>Schedule a consultation to learn how AnswersMD can transform your healthcare experience.</Text>
            <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule your consultation</Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default Tampa;
