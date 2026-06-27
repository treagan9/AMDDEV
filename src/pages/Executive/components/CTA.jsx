// src/pages/Executive/components/CTA.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

function CTA() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="brand.ivory" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'stretch', lg: 'center' }} justifyContent="space-between" gap={{ base: 8, lg: 12 }}>
              <Box flex={1}>
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Let's talk</Text>
                <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={3}>Build a program for your team</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={3}>Every organization is different. We'll work with you to create a corporate health program that fits your people and your budget.</Text>
                <ChakraLink href="mailto:corporate@answersmd.com" fontSize="md" color="brand.champagne" fontWeight={500} _hover={{ color: 'brand.champagneDark' }} transition="color 0.2s ease">corporate@answersmd.com</ChakraLink>
              </Box>
              <VStack spacing={3} align={{ base: 'stretch', lg: 'stretch' }} w={{ base: '100%', lg: 'auto' }} flexShrink={0}>
                <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule a consultation</Button>
                <Button as={Link} to="/signup/" variant="secondary" size="lg">Learn more</Button>
                <ChakraLink href="tel:8137273233" fontSize="md" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease" textAlign="center" pt={1}>or call 813-727-3233</ChakraLink>
              </VStack>
            </Flex>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default CTA;
