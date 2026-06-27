// src/pages/Executive/components/Benefits.jsx
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var BENEFITS = [
  { title: 'Reduced downtime', description: 'No more lost days waiting for appointments or sitting in urgent care. Your people get answers fast and stay productive.' },
  { title: 'Talent retention', description: 'Exceptional benefits differentiate you in competitive markets. Show your people you\'re invested in their wellbeing.' },
  { title: 'Risk mitigation', description: 'Proactive care catches problems early. Protect your investment in key personnel with physicians who know them.' },
  { title: 'Confidentiality', description: 'Executive health matters stay private. A dedicated physician relationship outside company insurance channels.' },
  { title: 'Travel support', description: 'Executives travel constantly. 24/7 access to their physician anywhere in the world via call, text or video.' },
  { title: 'Predictable costs', description: 'Annual membership pricing with no per-visit fees. Budget with confidence. No surprise healthcare costs.' }
];

function Benefits() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="brand.mist" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Why companies choose us</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4} textAlign="center">The organizational benefits</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="480px" mx="auto" textAlign="center" mb={{ base: 10, md: 12 }}>Healthcare as a strategic advantage, not just a line item in your benefits package.</Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {BENEFITS.map(function (benefit, i) {
                return (
                  <MotionBox key={benefit.title} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }} bg="white" borderRadius="card" py={8} px={7}>
                    <Box w="24px" h="3px" bg="brand.champagne" mb={5} />
                    <Text fontFamily="heading" fontSize={{ base: 'md', md: 'lg' }} fontWeight={700} color="brand.slate" mb={3}>{benefit.title}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.85}>{benefit.description}</Text>
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

export default Benefits;
