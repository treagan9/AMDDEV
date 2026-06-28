// src/pages/Locations/Index/components/Hero.jsx
import {
  Box,
  VStack,
  HStack,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
function Hero() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box ref={ref} bg="brand.ivory" py={{ base: 'sectionMobile', md: 'section' }}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} maxW="720px">
          <HStack spacing={3} mb={5}>
            <Box w="24px" h="1px" bg="brand.champagne" />
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">Our locations</Text>
          </HStack>
          <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="brand.slate" lineHeight={1.05} mb={6}>Care across Florida, close to you</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px">From Tampa to St. Petersburg to Boca Raton, AnswersMD brings concierge medicine to your corner of the state. Visit us, or let us come to you.</Text>
        </MotionBox>
      </Box>
    </Box>
  );
}
 
export default Hero;
