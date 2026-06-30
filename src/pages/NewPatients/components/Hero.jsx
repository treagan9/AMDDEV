// src/pages/NewPatients/components/Hero.jsx
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

var HERO = {
  label: 'New members',
  heading: 'Care that knows',
  headingAccent: 'your whole family.',
  body: 'Your guide to joining AnswersMD, from your first consultation to comprehensive care for everyone you love.',
  cta: 'Schedule a consultation',
  ctaLink: '/contact/',
  secondaryCta: 'Learn how it works',
  secondaryLink: '/services/'
};

function Hero() {
  return (
    <Box as="section">
      <Box display={{ base: 'none', md: 'block' }} position="relative" minH={{ md: '92vh', lg: '100vh' }} overflow="hidden">
        <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
          <picture>
            <source media="(max-width: 991px)" srcSet="/home/what-to-expect-hero-ipad.webp" />
            <img src="/home/what-to-expect-hero-desktop.webp" alt="AnswersMD new patient family consultation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </picture>
        </Box>

        <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={1} bg="linear-gradient(to top, rgba(250,250,247,0.92) 0%, rgba(250,250,247,0.78) 28%, rgba(250,250,247,0.32) 50%, transparent 68%)" />
        <Box position="absolute" bottom={0} left={0} w="55%" h="100%" zIndex={1} bg="linear-gradient(to right, rgba(250,250,247,0.6) 0%, rgba(250,250,247,0.25) 50%, transparent 100%)" />
        <Box position="absolute" top={0} right={0} w="70%" h="140px" zIndex={1} bg="radial-gradient(ellipse 80% 100% at 75% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)" pointerEvents="none" />

        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} position="relative" zIndex={2} minH={{ md: '92vh', lg: '100vh' }} maxW="70%" mx="auto" px={4} display="flex" alignItems="flex-end" pb={{ md: 20, lg: 24 }}>
          <VStack spacing={7} align="flex-start" maxW={{ md: '580px', lg: '640px' }} position="relative">
            <Box position="absolute" top="-8%" left="-6%" w="116%" h="120%" bg="radial-gradient(ellipse 70% 60% at 32% 50%, rgba(250,250,247,0.7) 0%, rgba(250,250,247,0.42) 45%, transparent 72%)" zIndex={-1} pointerEvents="none" sx={{ filter: 'blur(12px)' }} />

            <HStack spacing={3}>
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{HERO.label}</Text>
            </HStack>

            <Box>
              <Text as="h1" fontFamily="heading" fontSize={{ md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05}>{HERO.heading}</Text>
              <Text fontFamily="heading" fontSize={{ md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.05}>{HERO.headingAccent}</Text>
            </Box>

            <Text fontSize="lg" color="brand.body" lineHeight={1.8} maxW="440px">{HERO.body}</Text>

            <VStack spacing={4} align="flex-start">
              <Button as={Link} to={HERO.ctaLink} variant="primary" size="lg">{HERO.cta}</Button>
              <ChakraLink as={Link} to={HERO.secondaryLink} fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
                {HERO.secondaryCta}
                <Icon as={HiArrowRight} boxSize={4} />
              </ChakraLink>
            </VStack>
          </VStack>
        </MotionBox>
      </Box>

      <Box display={{ base: 'block', md: 'none' }} bg="brand.ivory">
        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Box position="relative" overflow="hidden">
            <Box sx={{ aspectRatio: '3 / 4' }}>
              <img src="/home/what-to-expect-hero-mobile.webp" alt="AnswersMD new patient consultation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </Box>
            <Box position="absolute" bottom={0} left={0} right={0} h="50%" bg="linear-gradient(to top, rgba(250,250,247,1) 0%, rgba(250,250,247,0.6) 50%, transparent 100%)" />
          </Box>

          <Box px={5} mt={-16} position="relative" zIndex={2} pb={16}>
            <Box w="32px" h="3px" bg="brand.champagne" borderRadius="full" mb={5} />

            <Text as="h1" fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.slate" lineHeight={1.08} mb={1}>{HERO.heading}</Text>
            <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.champagne" lineHeight={1.08} mb={5}>{HERO.headingAccent}</Text>

            <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>{HERO.body}</Text>

            <VStack spacing={4} align="stretch">
              <Button as={Link} to={HERO.ctaLink} variant="primary" size="lg">{HERO.cta}</Button>
              <ChakraLink as={Link} to={HERO.secondaryLink} fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" justifyContent="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
                {HERO.secondaryCta}
                <Icon as={HiArrowRight} boxSize={4} />
              </ChakraLink>
            </VStack>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Hero;
