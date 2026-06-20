// src/pages/Executive/components/Benefits.jsx
import {
  Box,
  Flex,
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
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 10, md: 14 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 4, lg: 20 }} alignItems={{ base: 'stretch', lg: 'flex-end' }}>
            <Box>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Why companies choose us</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>The organizational benefits</Text>
            </Box>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="400px" display={{ base: 'none', lg: 'block' }}>Healthcare as a strategic advantage, not just a line item in your benefits package.</Text>
          </Flex>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={0}>
          {BENEFITS.map(function (benefit, i) {
            var row = Math.floor(i / 3);
            var col = i % 3;
            return (
              <MotionBox
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                py={{ base: 8, md: 10 }}
                pr={{ base: 0, lg: col < 2 ? 10 : 0 }}
                pl={{ base: 0, lg: col > 0 ? 10 : 0 }}
                borderTop={{ base: i > 0 ? '1px solid' : 'none', lg: row > 0 ? '1px solid' : 'none' }}
                borderLeft={{ base: 'none', lg: col > 0 ? '1px solid' : 'none' }}
                borderColor="brand.borderLight"
              >
                <Box borderTop={{ base: 'none', lg: row === 0 ? '3px solid' : 'none' }} borderColor="brand.champagne" pt={{ base: 0, lg: row === 0 ? 8 : 0 }}>
                  <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" mb={4}>{benefit.title}</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.85}>{benefit.description}</Text>
                </Box>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Benefits;
