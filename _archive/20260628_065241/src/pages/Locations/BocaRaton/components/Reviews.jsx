// src/pages/Locations/BocaRaton/components/Reviews.jsx
import {
  Box,
  SimpleGrid,
  HStack,
  VStack,
  Text,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiStar } from 'react-icons/hi';
 
var MotionBox = motion(Box);
 
var REVIEWS = [
  { name: 'Sarah M.', text: 'I texted my doctor on a Sunday and had an answer in minutes. I have never had healthcare feel this personal.' },
  { name: 'David R.', text: 'No waiting rooms, no rushing. They actually know me and my history. Worth every penny.' },
  { name: 'Jennifer L.', text: 'They came to my home when I was too sick to move. This is what medicine should feel like.' }
];
 
function Stars() {
  return (
    <HStack spacing={1} mb={4}>
      {[0, 1, 2, 3, 4].map(function (i) {
        return <Icon key={i} as={HiStar} boxSize={4} color="brand.champagne" />;
      })}
    </HStack>
  );
}
 
function Reviews() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 10, md: 14 }} maxW="640px">
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>In our members' words</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>The kind of care people talk about</Text>
        </MotionBox>
 
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, md: 6 }}>
          {REVIEWS.map(function (r, i) {
            return (
              <MotionBox key={r.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }} bg="brand.ivory" borderRadius="card" p={{ base: 7, md: 8 }}>
                <VStack align="flex-start" spacing={0}>
                  <Stars />
                  <Text fontSize="md" color="brand.body" lineHeight={1.85} mb={5} fontStyle="italic">{r.text}</Text>
                  <Text fontSize="sm" fontWeight={700} color="brand.slate">{r.name}</Text>
                </VStack>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
 
export default Reviews;
