// src/pages/Stories/components/Hero.jsx
import {
  Box,
  Text,
  Button,
  VStack,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

var MotionBox = motion(Box);

function Hero() {
  return (
    <Box pt={{ base: 36, md: 44 }} pb={{ base: 'sectionMobile', md: '140px' }} bg="white">
      <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 6, md: 4 }} textAlign="center">
        <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Patient stories</Text>
        </MotionBox>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05} mb={5}>What our members say</Text>
        </MotionBox>
        <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto" mb={10}>Real experiences from real patients. These are the moments that remind us why we do what we do.</Text>
        </MotionBox>
        <MotionBox initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <VStack spacing={4}>
            <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule a consultation</Button>
            <ChakraLink as={Link} to="/services/" fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
              Our approach
              <Icon as={HiArrowRight} boxSize={4} />
            </ChakraLink>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Hero;
