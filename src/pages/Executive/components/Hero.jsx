// src/pages/Executive/components/Hero.jsx
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

function Hero() {
  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/executive/hero-mobile.png" />
          <source media="(max-width: 991px)" srcSet="/executive/hero-tablet.png" />
          <img
            src="/executive/hero-desktop.png"
            alt="AnswersMD executive health"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </picture>
      </Box>

      <Box position="absolute" top={0} left={0} right={0} h="180px" bg="linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)" zIndex={1} />
      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg={{ base: 'rgba(255,255,255,0.6)', md: 'rgba(255,255,255,0.45)' }} zIndex={1} />
      <Box position="absolute" bottom={0} left={0} right={0} h="200px" bg="linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%)" zIndex={1} />

      <Box maxW="960px" mx="auto" px={{ base: 6, md: 4 }} textAlign="center" position="relative" zIndex={2}>
        <VStack spacing={7}>
          <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <HStack spacing={3} justify="center">
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">Corporate programs</Text>
              <Box w="24px" h="1px" bg="brand.champagne" />
            </HStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05}>Protect your most</Text>
            <Text fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.05}>valuable asset.</Text>
          </MotionBox>

          <MotionText fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            Your executives and key employees drive your business. Their health shouldn't be left to chance or to a system that makes them wait weeks for care.
          </MotionText>

          <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <VStack spacing={4}>
              <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule a consultation</Button>
              <ChakraLink as={Link} to="/services/" fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
                View our services
                <Icon as={HiArrowRight} boxSize={4} />
              </ChakraLink>
            </VStack>
          </MotionBox>
        </VStack>
      </Box>
    </Box>
  );
}

export default Hero;
