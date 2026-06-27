// src/pages/Stories/components/Stats.jsx
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STATS = [
  { value: '98%', label: 'Member retention rate year over year' },
  { value: '4.9', label: 'Average rating from member surveys' },
  { value: '<5 min', label: 'Average response time to messages' },
  { value: '45 min', label: 'Average appointment length' }
];

function Stats() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="brand.ivory" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">By the numbers</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={{ base: 10, md: 12 }} textAlign="center">Our members' experience</Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 6 }}>
              {STATS.map(function (stat, i) {
                return (
                  <MotionBox key={stat.value} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} textAlign="center">
                    <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1} mb={3}>{stat.value}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.5}>{stat.label}</Text>
                  </MotionBox>
                );
              })}
            </SimpleGrid>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Stats;
