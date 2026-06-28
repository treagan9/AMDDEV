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
var MotionText = motion(Text);

function Hero() {
  return (
    <Box
      position="relative"
      minH={{ base: '100vh', md: '92vh', lg: '100vh' }}
      display="flex"
      alignItems="flex-end"
      justifyContent={{ base: 'center', md: 'flex-start' }}
      overflow="hidden"
    >
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/home/what-to-expect-hero-mobile.webp" />
          <source media="(max-width: 991px)" srcSet="/home/what-to-expect-hero-ipad.webp" />
          <img
            src="/home/what-to-expect-hero-desktop.webp"
            alt="AnswersMD new patient family consultation"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </picture>
      </Box>

      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        top={0}
        right={0}
        w="70%"
        h="140px"
        bg="radial-gradient(ellipse 80% 100% at 75% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)"
        zIndex={1}
        pointerEvents="none"
      />

      <Box
        display={{ base: 'block', md: 'none' }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(to top, rgba(250,250,247,0.94) 0%, rgba(250,250,247,0.86) 30%, rgba(250,250,247,0.4) 52%, transparent 72%)"
        zIndex={1}
      />

      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(to top, rgba(250,250,247,0.92) 0%, rgba(250,250,247,0.78) 28%, rgba(250,250,247,0.32) 50%, transparent 68%)"
        zIndex={1}
      />

      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        bottom={0}
        left={0}
        w="55%"
        h="100%"
        bg="linear-gradient(to right, rgba(250,250,247,0.6) 0%, rgba(250,250,247,0.25) 50%, transparent 100%)"
        zIndex={1}
      />

      <Box
        maxW={{ base: '640px', lg: '70%' }}
        w="100%"
        mx="auto"
        px={{ base: 6, md: 4 }}
        pb={{ base: 16, md: 20, lg: 24 }}
        textAlign={{ base: 'center', md: 'left' }}
        position="relative"
        zIndex={2}
      >
        <VStack spacing={7} align={{ base: 'center', md: 'flex-start' }} maxW={{ md: '620px', lg: '680px' }} position="relative">
          <Box
            display={{ base: 'none', md: 'block' }}
            position="absolute"
            top="-8%"
            left="-6%"
            w="116%"
            h="120%"
            bg="radial-gradient(ellipse 70% 60% at 32% 50%, rgba(250,250,247,0.7) 0%, rgba(250,250,247,0.42) 45%, transparent 72%)"
            zIndex={-1}
            pointerEvents="none"
            sx={{ filter: 'blur(12px)' }}
          />

          <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <HStack spacing={3} justify={{ base: 'center', md: 'flex-start' }}>
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">New members</Text>
            </HStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05}>Care that knows</Text>
            <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.05}>your whole family.</Text>
          </MotionBox>

          <MotionText fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW={{ base: '520px', md: '440px' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            Your guide to joining AnswersMD, from your first consultation to comprehensive care for everyone you love.
          </MotionText>

          <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
              <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule a consultation</Button>
              <ChakraLink as={Link} to="/services/" fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
                Learn how it works
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
