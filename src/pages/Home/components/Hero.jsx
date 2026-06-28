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

function Hero() {
  return (
    <Box position="relative" minH={{ base: '100svh', md: '100vh' }} overflow="hidden">
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/home/hero-mobile.webp" />
          <source media="(max-width: 991px)" srcSet="/home/hero-tablet.webp" />
          <img src="/home/hero-desktop.webp" alt="A patient in conversation with an AnswersMD physician" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </picture>
      </Box>

      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
        bg={{
          base: 'linear-gradient(to bottom, rgba(250,250,247,0.92) 0%, rgba(250,250,247,0.7) 32%, rgba(250,250,247,0.12) 58%, transparent 100%)',
          md: 'linear-gradient(to right, rgba(250,250,247,0.94) 0%, rgba(250,250,247,0.82) 30%, rgba(250,250,247,0.4) 52%, transparent 72%)'
        }}
      />

      <Box position="relative" zIndex={2} minH={{ base: '100svh', md: '100vh' }} maxW={{ base: '100%', md: '1280px' }} mx="auto" px={{ base: 6, md: 10, lg: 14 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={{ base: 'flex-start', md: 'center' }}
          alignItems="flex-start"
          textAlign="left"
          minH={{ base: '100svh', md: '100vh' }}
          pt={{ base: 28, md: 0 }}
          maxW={{ base: '100%', md: '50%', lg: '46%' }}
        >
          <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <HStack spacing={3} mb={6}>
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{HERO.label}</Text>
            </HStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05} whiteSpace="nowrap">{HERO.heading}</Text>
            <Text fontFamily="heading" fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.05}>{HERO.headingAccent}</Text>
          </MotionBox>

          <MotionText fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="460px" mt={6} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            {HERO.body}
          </MotionText>

          <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} mt={8} w={{ base: '100%', sm: 'auto' }}>
            <VStack spacing={4} align={{ base: 'stretch', sm: 'flex-start' }}>
              <Button as={Link} to={HERO.ctaLink} variant="primary" size="lg">{HERO.cta}</Button>
              {HERO.secondaryCta && (
                <ChakraLink as={Link} to={HERO.secondaryLink} fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" justifyContent={{ base: 'center', sm: 'flex-start' }} gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
                  {HERO.secondaryCta}
                  <Icon as={HiArrowRight} boxSize={4} />
                </ChakraLink>
              )}
            </VStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.85 }} mt={10}>
            <HStack spacing={5} divider={<Box w="3px" h="3px" borderRadius="full" bg="brand.champagne" />}>
              <ChakraLink as={Link} to="/location-tampa/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>Tampa</ChakraLink>
              <ChakraLink as={Link} to="/location-st-pete/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>St. Petersburg</ChakraLink>
              <ChakraLink as={Link} to="/location-boca-raton/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>Boca Raton</ChakraLink>
            </HStack>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;