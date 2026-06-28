// src/pages/Services/components/Stats.jsx
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
var STATS = [
  { value: '30-60', unit: 'minutes', label: 'Every appointment, never rushed' },
  { value: '300', unit: 'patients max', label: 'Per physician, not thousands' },
  { value: '24/7', unit: 'always on', label: 'Direct access to your doctor' }
];
 
function Stats() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
 
  return (
    <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="brand.slate" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }} overflow="hidden">
            <Flex direction={{ base: 'column', md: 'row' }} align="stretch">
              {STATS.map(function (stat, i) {
                return (
                  <MotionBox
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.12 + i * 0.12 }}
                    flex={1}
                    textAlign={{ base: 'center', md: 'left' }}
                    px={{ base: 0, md: 10 }}
                    py={{ base: 8, md: 0 }}
                    borderTop={{ base: i === 0 ? 'none' : '1px solid', md: 'none' }}
                    borderLeft={{ base: 'none', md: i === 0 ? 'none' : '1px solid' }}
                    borderColor={{ base: 'whiteAlpha.200', md: 'whiteAlpha.200' }}
                  >
                    <Flex align="baseline" justify={{ base: 'center', md: 'flex-start' }} gap={2} mb={3}>
                      <Text fontFamily="heading" fontSize={{ base: '5xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="white" lineHeight={1}>{stat.value}</Text>
                      <Text fontSize={{ base: 'sm', md: 'md' }} color="brand.champagne" fontWeight={600}>{stat.unit}</Text>
                    </Flex>
                    <Text fontSize={{ base: 'md', md: 'md' }} color="whiteAlpha.700" lineHeight={1.6}>{stat.label}</Text>
                  </MotionBox>
                );
              })}
            </Flex>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
 
export default Stats;
