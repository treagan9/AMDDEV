#!/bin/bash
set -e

echo ""
echo "  AnswersMD Dev - Location Pages"
echo "  ================================"
echo ""

mkdir -p src/pages/Locations
mkdir -p src/pages/Home/components

echo "Writing files..."

mkdir -p "src"
echo "  -> src/App.jsx"
cat > "src/App.jsx" << 'AMD_EOF_01'
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './pages/Services';
import NewPatients from './pages/NewPatients';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Tampa from './pages/Locations/Tampa';
import StPete from './pages/Locations/StPete';
import BocaRaton from './pages/Locations/BocaRaton';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/team/" element={<Team />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/new-patients/" element={<NewPatients />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/location-tampa/" element={<Tampa />} />
        <Route path="/location-st-pete/" element={<StPete />} />
        <Route path="/location-boca-raton/" element={<BocaRaton />} />
      </Route>
      <Route path="/signup/" element={<Signup />} />
    </Routes>
  );
}

export default App;
AMD_EOF_01

mkdir -p "src/pages/Home/components"
echo "  -> src/pages/Home/components/Locations.jsx"
cat > "src/pages/Home/components/Locations.jsx" << 'AMD_EOF_02'
// src/pages/Home/components/Locations.jsx
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Icon
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlinePhone } from 'react-icons/hi';

var MotionBox = motion(Box);

var LOCATIONS = [
  {
    city: 'Tampa',
    subtitle: 'Flagship location',
    status: 'Now open',
    phone: '813-727-3233',
    tel: '8137273233',
    image: '/locations/tampa-office-main.png',
    path: '/location-tampa/'
  },
  {
    city: 'St. Petersburg',
    subtitle: "St. Anthony's Hospital campus",
    status: 'Now open',
    phone: '813-727-3233',
    tel: '8137273233',
    image: '/locations/st-pete.png',
    path: '/location-st-pete/'
  },
  {
    city: 'Boca Raton',
    subtitle: 'Royal Palm Yacht Club area',
    status: 'Coming soon',
    phone: '561-933-3333',
    tel: '5619333333',
    image: '/locations/boca-main.png',
    path: '/location-boca-raton/'
  }
];

function LocationCard({ city, subtitle, status, phone, tel, image, path, delay, inView }) {
  var navigate = useNavigate();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Box
        overflow="hidden"
        borderRadius="card"
        bg="white"
        border="1px solid"
        borderColor="brand.borderLight"
        transition="all 0.4s ease"
        cursor="pointer"
        onClick={function () { navigate(path); }}
        role="group"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: '0 16px 40px rgba(27,58,52,0.08)',
          borderColor: 'brand.champagneLine'
        }}
      >
        <Box h={{ base: '240px', md: '280px' }} overflow="hidden" borderRadius="18px 18px 0 0">
          <Image
            src={image}
            alt={city + ' location'}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.6s ease"
            _groupHover={{ transform: 'scale(1.04)' }}
          />
        </Box>
        <Box p={6}>
          <Badge
            bg={status === 'Now open' ? 'brand.champagneSoft' : 'brand.mist'}
            color={status === 'Now open' ? 'brand.champagneDark' : 'brand.warmGrayLight'}
            fontSize="xs"
            fontWeight={600}
            letterSpacing="1px"
            textTransform="uppercase"
            px={3}
            py={1}
            borderRadius="btn"
            mb={3}
          >
            {status}
          </Badge>
          <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="brand.slate" mb={1}>
            {city}
          </Text>
          <Text fontSize="sm" color="brand.bodyLight" mb={3}>
            {subtitle}
          </Text>
          <HStack
            spacing={2}
            onClick={function (e) { e.stopPropagation(); window.location.href = 'tel:' + tel; }}
            cursor="pointer"
            _hover={{ '& > *': { color: 'brand.champagneDark' } }}
          >
            <Icon as={HiOutlinePhone} boxSize={4} color="brand.champagne" />
            <Text fontSize="sm" color="brand.champagne">{phone}</Text>
          </HStack>
        </Box>
      </Box>
    </MotionBox>
  );
}

function Locations() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          textAlign="center"
          mb={{ base: 10, md: 14 }}
        >
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Our locations</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={4}>Find us near you</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px" mx="auto">Three Florida locations delivering the same exceptional concierge care.</Text>
        </MotionBox>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {LOCATIONS.map(function (loc, i) {
            return <LocationCard key={loc.city} {...loc} delay={0.2 + i * 0.1} inView={inView} />;
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Locations;
AMD_EOF_02

mkdir -p "src/pages/Locations"
echo "  -> src/pages/Locations/BocaRaton.jsx"
cat > "src/pages/Locations/BocaRaton.jsx" << 'AMD_EOF_03'
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
AMD_EOF_03

mkdir -p "src/pages/Locations"
echo "  -> src/pages/Locations/StPete.jsx"
cat > "src/pages/Locations/StPete.jsx" << 'AMD_EOF_04'
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
AMD_EOF_04

mkdir -p "src/pages/Locations"
echo "  -> src/pages/Locations/Tampa.jsx"
cat > "src/pages/Locations/Tampa.jsx" << 'AMD_EOF_05'
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
AMD_EOF_05


echo ""
echo "  Done. 3 location pages + updated home locations."
echo "    /location-tampa/ (gallery with 6 office images)"
echo "    /location-st-pete/"
echo "    /location-boca-raton/ (coming soon + waitlist)"
echo "    Home locations now use local images"
echo ""
echo "  Run: yarn dev"
echo ""