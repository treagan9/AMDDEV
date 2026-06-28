// src/pages/Locations/StPete/components/LifeIn.jsx
import {
  Box,
  Text,
  VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
function LifeIn() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} maxW="760px">
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Life in St. Petersburg</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={8}>Where art, nature and life converge</Text>
          <VStack spacing={5} align="flex-start">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>St. Petersburg isn't just a place to live. It's a place to thrive. With more sunny days than almost any city in America, world-renowned museums and some of the most beautiful beaches on the Gulf Coast, St. Pete has evolved into one of Florida's most desirable communities.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>St. Pete residents know what they want. Quality over quantity, experience over excess and authenticity over pretense. They choose restaurants where the chef knows their name. They invest in their community and their wellbeing.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Shouldn't your healthcare reflect those same values? At AnswersMD, we believe St. Pete deserves a medical practice that matches its character. Thoughtful, personal and genuinely invested in your life.</Text>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}
 
export default LifeIn;
