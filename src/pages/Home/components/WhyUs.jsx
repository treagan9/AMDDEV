// src/pages/Home/components/WhyUs.jsx
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var REASONS = [
  { title: 'Same-day appointments', description: 'No more waiting weeks to see your doctor. We guarantee same-day or next-day availability for every member.' },
  { title: 'Direct communication', description: "Your doctor's personal cell phone number. Text, call or video chat anytime, day or night." },
  { title: 'Limited enrollment', description: 'We cap our patient panel to ensure quality time and attention with every member.' },
  { title: 'Extended visits', description: '30 to 60 minute appointments are standard. Your health deserves more than 7 minutes.' }
];

function WhyUs() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} textAlign="center" mb={{ base: 10, md: 14 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>The difference</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Why our members stay</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 12 }} maxW="900px" mx="auto">
          {REASONS.map(function (reason, i) {
            return (
              <MotionBox key={reason.title} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}>
                <Box borderTop="2px solid" borderColor="brand.champagne" pt={5}>
                  <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={3}>{reason.title}</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.85}>{reason.description}</Text>
                </Box>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default WhyUs;
