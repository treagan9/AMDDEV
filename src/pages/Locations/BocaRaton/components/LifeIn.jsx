// src/pages/Locations/BocaRaton/components/LifeIn.jsx
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
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Life in Boca Raton</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={8}>Where excellence is the standard in every aspect of life</Text>
          <VStack spacing={5} align="flex-start">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Boca Raton is a city that doesn't settle. From its pristine beaches to its championship golf courses, from its top-rated schools to its thriving business community, Boca has established itself as one of South Florida's most coveted addresses for those who expect the best.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Boca attracts a unique mix. Successful executives who could live anywhere but choose here, retirees who've earned the right to enjoy life on their terms and young families drawn by some of Florida's best schools and safest neighborhoods. What they share is a refusal to accept mediocrity.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>AnswersMD is bringing concierge medicine to Boca Raton because this community deserves healthcare that matches everything else about life here. Personal, exceptional and uncompromising.</Text>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}
 
export default LifeIn;
