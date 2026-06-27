// src/pages/Executive/components/Programs.jsx
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCheck } from 'react-icons/hi';

var MotionBox = motion(Box);

var EXEC_FEATURES = [
  '24/7 direct physician access',
  'Comprehensive annual executive physical',
  'Priority scheduling and house calls',
  'Travel medicine and global support',
  'Complete confidentiality'
];

var CORP_FEATURES = [
  'Same-day appointments guaranteed',
  'Direct physician communication',
  'Extended appointments of 30 to 60 minutes',
  'Preventive care and wellness planning',
  'Appointments outside normal business hours',
  'Volume pricing available'
];

function Programs() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Our programs</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>Tailored to your organization</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">Whether you're covering your C-suite or extending benefits to key employees, we build programs that fit.</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <Box bg="white" borderRadius="card" py={{ base: 10, md: 14 }} px={{ base: 8, md: 10 }} h="100%">
              <Box w="32px" h="3px" bg="brand.champagne" mb={6} />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>For leadership</Text>
              <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={4}>Executive Health Program</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>Comprehensive concierge care for your C-suite and senior leadership. The people running your company deserve a physician who's as invested in their health as they are in your business.</Text>
              <VStack align="flex-start" spacing={4}>
                {EXEC_FEATURES.map(function (item) {
                  return (
                    <HStack key={item} spacing={3} align="flex-start">
                      <Box color="brand.champagne" mt={0.5} flexShrink={0}><HiCheck size={16} /></Box>
                      <Text fontSize="md" color="brand.body" lineHeight={1.6}>{item}</Text>
                    </HStack>
                  );
                })}
              </VStack>
            </Box>
          </MotionBox>
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
            <Box bg="white" borderRadius="card" py={{ base: 10, md: 14 }} px={{ base: 8, md: 10 }} h="100%">
              <Box w="32px" h="3px" bg="brand.champagne" mb={6} />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>For key employees</Text>
              <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={4}>Corporate Wellness Program</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>Extend concierge-level care to the employees who keep your business running. A powerful retention tool that shows your people you're invested in their wellbeing.</Text>
              <VStack align="flex-start" spacing={4}>
                {CORP_FEATURES.map(function (item) {
                  return (
                    <HStack key={item} spacing={3} align="flex-start">
                      <Box color="brand.champagne" mt={0.5} flexShrink={0}><HiCheck size={16} /></Box>
                      <Text fontSize="md" color="brand.body" lineHeight={1.6}>{item}</Text>
                    </HStack>
                  );
                })}
              </VStack>
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Programs;
