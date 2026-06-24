// src/pages/Executive/components/Hero.jsx
import { Box, Text, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

var MotionBox = motion(Box);
var MotionText = motion(Text);

function Hero() {
  return (
    <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="white">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} maxW="800px">
          <HStack spacing={3} mb={5}>
            <Box w="24px" h="1px" bg="brand.champagne" />
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">Corporate programs</Text>
          </HStack>
          <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>Protect your most valuable asset</Text>
          <MotionText fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="600px" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            Your executives and key employees drive your business. Their health shouldn't be left to chance or to a system that makes them wait weeks for care.
          </MotionText>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Hero;
