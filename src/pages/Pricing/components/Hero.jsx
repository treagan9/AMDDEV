// src/pages/Pricing/components/Hero.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
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
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Membership</Text>
        </MotionBox>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05} mb={5}>Simple, transparent pricing</Text>
        </MotionBox>
        <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto" mb={10}>No hidden fees. No surprise charges. Just exceptional primary care at a straightforward annual rate.</Text>
        </MotionBox>
        <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <Flex align="center" justify="center" gap={4} mb={3}>
            <Text fontFamily="heading" fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="brand.slate" lineHeight={1}>$4,500</Text>
            <Text fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="#D5D0C8" lineHeight={1}>$9,500</Text>
          </Flex>
          <Text fontSize="lg" color="brand.bodyLight" mb={10}>per year, based on age</Text>
        </MotionBox>
        <MotionBox initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }}>
          <VStack spacing={4}>
            <Button as={Link} to="/contact/" variant="primary" size="lg">Get your personalized quote</Button>
            <ChakraLink as={Link} to="/new-patients/" fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
              What to expect
              <Icon as={HiArrowRight} boxSize={4} />
            </ChakraLink>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Hero;
