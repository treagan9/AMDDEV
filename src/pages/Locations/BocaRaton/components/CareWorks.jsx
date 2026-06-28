// src/pages/Locations/BocaRaton/components/CareWorks.jsx
import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineHome, HiOutlineTruck, HiOutlineSparkles } from 'react-icons/hi';
 
var MotionBox = motion(Box);
 
var ITEMS = [
  { icon: HiOutlineHome, title: 'The office is always open to you', body: 'Walk in or set an appointment any time. Your physician is here when you need them.' },
  { icon: HiOutlineTruck, title: 'Or we come to you', body: 'House calls and visits at home, at work, or while you travel. Care meets you where you are.' },
  { icon: HiOutlineSparkles, title: 'Membership, not insurance headaches', body: 'One simple membership. No copays, no claims to chase, no surprise bills.' }
];
 
function CareWorks() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 10, md: 14 }} maxW="640px">
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>How care works here</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Healthcare on your schedule, not the system's</Text>
        </MotionBox>
 
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 12 }}>
          {ITEMS.map(function (item, i) {
            return (
              <MotionBox key={item.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}>
                <VStack align="flex-start" spacing={4}>
                  <Box w="48px" h="48px" borderRadius="full" bg="brand.ivory" display="flex" alignItems="center" justifyContent="center">
                    <Icon as={item.icon} boxSize={6} color="brand.champagne" />
                  </Box>
                  <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" lineHeight={1.25}>{item.title}</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.8}>{item.body}</Text>
                </VStack>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
 
export default CareWorks;
