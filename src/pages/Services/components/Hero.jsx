// src/pages/Services/components/Hero.jsx
import {
  Box,
  Text,
  VStack,
  HStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

var MotionBox = motion(Box);
var MotionText = motion(Text);

function Hero() {
  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/services/hero-mobile.png" />
          <source media="(max-width: 991px)" srcSet="/services/hero-tablet.png" />
          <img
            src="/services/hero-desktop.png"
            alt="AnswersMD concierge medicine approach"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </picture>
      </Box>

      <Box position="absolute" top={0} left={0} right={0} h="180px" bg="linear-gradient(to bottom, rgba(250,250,247,0.85) 0%, rgba(250,250,247,0.4) 60%, transparent 100%)" zIndex={1} />
      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg={{ base: 'rgba(250,250,247,0.6)', md: 'rgba(250,250,247,0.45)' }} zIndex={1} />
      <Box position="absolute" bottom={0} left={0} right={0} h="200px" bg="linear-gradient(to top, rgba(250,250,247,0.9) 0%, transparent 100%)" zIndex={1} />

      <Box maxW="960px" mx="auto" px={{ base: 6, md: 4 }} textAlign="center" position="relative" zIndex={2}>
        <VStack spacing={7}>
          <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <HStack spacing={3} justify="center">
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">
                Our approach
              </Text>
              <Box w="24px" h="1px" bg="brand.champagne" />
            </HStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>
              Your doctor's cell phone number.
            </Text>
            <Text fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.08} mt={2}>
              Yes, really.
            </Text>
          </MotionBox>

          <MotionText fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            Healthcare built around access, time and a physician who actually knows your name.
          </MotionText>
        </VStack>
      </Box>
    </Box>
  );
}

export default Hero;
