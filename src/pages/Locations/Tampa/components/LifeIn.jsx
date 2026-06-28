// src/pages/Locations/Tampa/components/LifeIn.jsx
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
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Life in Tampa</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={8}>A city that moves, and deserves healthcare that keeps up</Text>
          <VStack spacing={5} align="flex-start">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Tampa is a city of ambition. From the high-rises of downtown to the tree-lined streets of South Tampa, this is where entrepreneurs build companies, families put down roots and professionals balance demanding careers with the Florida lifestyle they came here for.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Traditional healthcare wasn't built for how Tampa lives. Waiting three weeks for an appointment only to sit in a waiting room for seven minutes with a doctor who doesn't know your name isn't just inconvenient. It's unacceptable.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Tampa deserves healthcare that matches its energy. Responsive, personal and designed for people who have things to do and places to be.</Text>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}
 
export default LifeIn;
