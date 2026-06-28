// src/pages/Services/components/CTA.jsx
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
          <Box position="relative" borderRadius={{ base: '24px', md: '32px' }} overflow="hidden">
            <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
              <picture>
                <source media="(max-width: 767px)" srcSet="/sections/cta-inner-banner-pad.webp" />
                <source media="(max-width: 991px)" srcSet="/sections/cta-inner-banner-pad.webp" />
                <img
                  src="/sections/cta-inner-banner.webp"
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
              </picture>
            </Box>
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="rgba(250,250,247,0.34)" zIndex={1} />
 
            <Box position="relative" zIndex={2} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }}>
              <Flex direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'stretch', lg: 'center' }} justifyContent="space-between" gap={{ base: 8, lg: 12 }}>
                <Box flex={1}>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Take the first step</Text>
                  <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={3}>Ready to experience the difference?</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.8}>It starts with a conversation. No commitment, no pressure.</Text>
                </Box>
                <VStack spacing={3} align={{ base: 'stretch', lg: 'stretch' }} w={{ base: '100%', lg: 'auto' }} flexShrink={0}>
                  <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule a consultation</Button>
                  <Button as={Link} to="/signup/" variant="secondary" size="lg">Join now</Button>
                  <ChakraLink href="tel:8137273233" fontSize="md" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease" textAlign="center" pt={1}>or call 813-727-3233</ChakraLink>
                </VStack>
              </Flex>
            </Box>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
 
export default CTA;
