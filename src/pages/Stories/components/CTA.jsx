// src/pages/Stories/components/CTA.jsx
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
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: '160px' }} bg="brand.ivory" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'stretch', lg: 'center' }} justifyContent="space-between" gap={{ base: 10, lg: 16 }}>
            <Box maxW={{ base: '100%', lg: '580px' }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Join them</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>Ready to experience the difference?</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.8}>Join the families who've made the switch to personalized care.</Text>
            </Box>
            <VStack spacing={4} align={{ base: 'stretch', lg: 'stretch' }} w={{ base: '100%', lg: 'auto' }} flexShrink={0}>
              <Button as={Link} to="/signup/" variant="primary" size="lg">Get started</Button>
              <Button as={Link} to="/contact/" variant="secondary" size="lg">Schedule a consultation</Button>
              <ChakraLink href="tel:8137273233" fontSize="md" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }} textAlign="center" pt={1}>or call 813-727-3233</ChakraLink>
            </VStack>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default CTA;
