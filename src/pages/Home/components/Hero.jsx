// src/pages/Home/components/Hero.jsx
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

var MotionBox = motion(Box);
var MotionText = motion(Text);

var HERO = {
  label: 'Now accepting members',
  heading: 'Concierge medicine.',
  headingAccent: 'Simplified.',
  body: 'Direct access to your physician whenever you need it. Personalized, accessible and designed around your life.',
  cta: 'Schedule a consultation',
  ctaLink: '/contact/',
  secondaryCta: 'Learn how it works',
  secondaryLink: '/services/'
};

function LocationRow({ center }) {
  return (
    <HStack spacing={5} justify={center ? 'center' : 'flex-start'} divider={<Box w="3px" h="3px" borderRadius="full" bg="brand.champagne" />}>
      <ChakraLink as={Link} to="/location-tampa/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>Tampa</ChakraLink>
      <ChakraLink as={Link} to="/location-st-pete/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>St. Petersburg</ChakraLink>
      <ChakraLink as={Link} to="/location-boca-raton/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>Boca Raton</ChakraLink>
    </HStack>
  );
}

function CtaGroup({ stretch }) {
  return (
    <VStack spacing={4} align={stretch ? 'stretch' : 'flex-start'} w={stretch ? '100%' : 'auto'}>
      <Button as={Link} to={HERO.ctaLink} variant="primary" size="lg">{HERO.cta}</Button>
      {HERO.secondaryCta && (
        <ChakraLink as={Link} to={HERO.secondaryLink} fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" justifyContent={stretch ? 'center' : 'flex-start'} gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
          {HERO.secondaryCta}
          <Icon as={HiArrowRight} boxSize={4} />
        </ChakraLink>
      )}
    </VStack>
  );
}

function Hero() {
  return (
    <Box as="section">
      <Box display={{ base: 'none', md: 'block' }} position="relative" minH="100vh" overflow="hidden">
        <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
          <picture>
            <source media="(max-width: 991px)" srcSet="/home/hero-tablet.webp" />
            <img src="/home/hero-desktop.webp" alt="A patient in conversation with an AnswersMD physician" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </picture>
        </Box>

        <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={1} bg="linear-gradient(to right, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.84) 30%, rgba(250,250,247,0.42) 52%, transparent 72%)" />

        <Box position="relative" zIndex={2} minH="100vh" maxW={{ md: '70%' }} mx="auto" px={{ md: 4 }}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" textAlign="left" minH="100vh" maxW={{ md: '58%', lg: '50%' }}>
            <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <HStack spacing={3} mb={6}>
                <Box w="24px" h="1px" bg="brand.champagne" />
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{HERO.label}</Text>
              </HStack>
            </MotionBox>

            <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
              <Text as="h1" fontFamily="heading" fontSize={{ md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05} whiteSpace="nowrap">{HERO.heading}</Text>
              <Text fontFamily="heading" fontSize={{ md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.05} letterSpacing="0.04em">{HERO.headingAccent}</Text>
            </MotionBox>

            <MotionText fontSize="lg" color="brand.body" lineHeight={1.8} maxW="460px" mt={6} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
              {HERO.body}
            </MotionText>

            <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} mt={8}>
              <CtaGroup stretch={false} />
            </MotionBox>

            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.85 }} mt={10}>
              <LocationRow center={false} />
            </MotionBox>
          </Box>
        </Box>
      </Box>

      <Box display={{ base: 'block', md: 'none' }} bg="brand.ivory" pt={20} pb={16}>
        <Box px={5}>
          <MotionBox initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} position="relative">
            <Box borderRadius="card" overflow="hidden" position="relative" w="100%" sx={{ aspectRatio: '4 / 5' }}>
              <img src="/home/hero-mobile.webp" alt="A patient in conversation with an AnswersMD physician" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%' }} />
            </Box>

            <MotionBox initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} mt={5} position="relative" zIndex={2}>
              <Text as="h1" fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.slate" lineHeight={1.05}>{HERO.heading}</Text>
              <Text fontFamily="heading" fontSize="4xl" fontWeight={700} color="brand.champagne" lineHeight={1.0} mt={1} letterSpacing="0.04em">{HERO.headingAccent}</Text>
            </MotionBox>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} mt={6}>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>{HERO.body}</Text>

            <CtaGroup stretch={true} />

            <Box mt={10} pt={8} borderTop="1px solid" borderColor="rgba(60,55,45,0.12)">
              <LocationRow center={true} />
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
