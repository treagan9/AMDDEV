// src/pages/Services/components/Stats.jsx
import {
  Box,
  SimpleGrid,
  HStack,
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
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.evergreen" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 4 }} maxW="900px" mx="auto" textAlign="center">
          {STATS.map(function (stat, i) {
            return (
              <MotionBox key={stat.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}>
                <HStack spacing={1} justify="center" mb={2}>
                  <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="white" lineHeight={1}>{stat.value}</Text>
                  {stat.unit && <Text fontSize="lg" color="brand.champagne" fontWeight={500}>{stat.unit}</Text>}
                </HStack>
                <Text fontSize="md" color="whiteAlpha.600">{stat.label}</Text>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Stats;
