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
import usePageContent from '../../../admin/lib/usePageContent.jsx';

var MotionBox = motion(Box);
var MotionText = motion(Text);

var defaults = {
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
  var c = usePageContent('home', 'hero', defaults);

  return (
    <Box position="relative" minH="100vh" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/home/hero-mobile.webp" />
          <source media="(max-width: 991px)" srcSet="/home/hero-tablet.webp" />
          <img src="/home/hero-desktop.webp" alt="AnswersMD concierge medicine" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </picture>
      </Box>

      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg={{ base: 'linear-gradient(to bottom, rgba(250,250,247,0.85) 0%, rgba(250,250,247,0.5) 40%, rgba(250,250,247,0.6) 72%, rgba(250,250,247,0.9) 100%)', md: 'linear-gradient(to bottom, rgba(250,250,247,0.78) 0%, rgba(250,250,247,0.34) 42%, rgba(250,250,247,0.5) 78%, rgba(250,250,247,0.88) 100%)' }} zIndex={1} />

      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="radial-gradient(ellipse 60% 48% at 50% 46%, rgba(250,250,247,0.66) 0%, rgba(250,250,247,0.32) 50%, transparent 75%)" zIndex={1} pointerEvents="none" sx={{ filter: 'blur(8px)' }} />

      <Box maxW="960px" mx="auto" px={{ base: 6, md: 4 }} textAlign="center" position="relative" zIndex={2}>
        <VStack spacing={7}>
          <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <HStack spacing={3} justify="center">
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{c.label}</Text>
              <Box w="24px" h="1px" bg="brand.champagne" />
            </HStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05}>{c.heading}</Text>
            <Text fontFamily="heading" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.05}>{c.headingAccent}</Text>
          </MotionBox>

          <MotionText fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            {c.body}
          </MotionText>

          <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <VStack spacing={4}>
              <Button as={Link} to={c.ctaLink} variant="primary" size="lg">{c.cta}</Button>
              {c.secondaryCta && (
                <ChakraLink as={Link} to={c.secondaryLink} fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
                  {c.secondaryCta}
                  <Icon as={HiArrowRight} boxSize={4} />
                </ChakraLink>
              )}
            </VStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.85 }} pt={4}>
            <HStack spacing={6} justify="center" divider={<Box w="4px" h="4px" borderRadius="full" bg="brand.champagne" />}>
              <ChakraLink as={Link} to="/location-tampa/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>Tampa</ChakraLink>
              <ChakraLink as={Link} to="/location-st-pete/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>St. Petersburg</ChakraLink>
              <ChakraLink as={Link} to="/location-boca-raton/" fontSize="xs" color="brand.body" fontWeight={500} letterSpacing="1px" _hover={{ color: 'brand.champagne' }}>Boca Raton</ChakraLink>
            </HStack>
          </MotionBox>
        </VStack>
      </Box>
    </Box>
  );
}

export default Hero;
