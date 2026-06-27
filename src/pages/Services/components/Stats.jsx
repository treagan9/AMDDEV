// src/pages/Services/components/Stats.jsx
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STATS = [
  { value: '30-60', unit: 'min', label: 'Every appointment' },
  { value: '300', unit: 'max', label: 'Patients per physician' },
  { value: '24/7', unit: '', label: 'Direct physician access' }
];

function Stats() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="brand.mist" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 8 }} textAlign="center">
              {STATS.map(function (stat, i) {
                return (
                  <MotionBox key={stat.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}>
                    <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1} mb={1}>{stat.value}</Text>
                    {stat.unit && <Text fontSize="md" color="brand.champagne" fontWeight={600} mb={2}>{stat.unit}</Text>}
                    {!stat.unit && <Box mb={2} />}
                    <Text fontSize="md" color="brand.body">{stat.label}</Text>
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
