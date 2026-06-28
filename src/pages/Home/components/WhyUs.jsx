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
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>The difference</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={4}>Why our members stay</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">Once you experience healthcare without the waiting, the rushing and the runaround, it's hard to go back.</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} maxW={{ base: '100%', lg: '60%' }} mx="auto">
          {REASONS.map(function (reason, i) {
            return (
              <MotionBox
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                bg="white"
                borderRadius="card"
                borderWidth="1px"
                borderColor="rgba(60,50,40,0.07)"
                boxShadow="0 8px 32px rgba(60,50,40,0.05)"
                py={{ base: 8, md: 10 }}
                px={{ base: 7, md: 10 }}
                sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                _hover={{ transform: 'translateY(-4px)', boxShadow: '0 16px 44px rgba(60,50,40,0.09)' }}
              >
                <Box w="32px" h="3px" bg="brand.champagne" mb={6} />
                <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={4}>{reason.title}</Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.85}>{reason.description}</Text>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default WhyUs;