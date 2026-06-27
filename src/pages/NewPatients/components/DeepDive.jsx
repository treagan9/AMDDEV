// src/pages/NewPatients/components/DeepDive.jsx
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCheck } from 'react-icons/hi';

var MotionBox = motion(Box);

var INCLUDES = [
  'Complete medical history review',
  'Comprehensive physical examination',
  'Personalized health risk assessment',
  'Advanced screening recommendations',
  'Custom health plan with milestones',
  'Lab work and diagnostics',
  'Lifestyle and nutrition discussion',
  'Specialist referrals if needed',
  'Goal setting and follow-up scheduling'
];

function DeepDive() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box ref={ref} w="100%" overflow="hidden">
      <Box display={{ base: 'block', lg: 'none' }}>
        <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" overflow="hidden">
          <Box position="relative" pb="75%">
            <Image src="/new-patients/deep-dive.png" alt="AnswersMD comprehensive exam" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">deep-dive.png (1200x900)</Text></Box>} />
          </Box>
        </MotionBox>
        <Box py="sectionMobile" bg="white" px={6}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>The welcome visit</Text>
            <Text as="h2" fontFamily="heading" fontSize="2xl" fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Your deep-dive</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.9} mb={10}>
              The first comprehensive exam at AnswersMD isn't like anything you've experienced in traditional medicine. It's not a quick physical. It's a thoughtful, unhurried exploration of your complete health.
            </Text>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Your visit includes</Text>
            <VStack align="flex-start" spacing={4}>
              {INCLUDES.map(function (item) {
                return (
                  <HStack key={item} spacing={3} align="flex-start">
                    <Box color="brand.champagne" mt={0.5} flexShrink={0}><HiCheck size={16} /></Box>
                    <Text fontSize="md" color="brand.body" lineHeight={1.6}>{item}</Text>
                  </HStack>
                );
              })}
            </VStack>
          </MotionBox>
        </Box>
      </Box>

      <Flex display={{ base: 'none', lg: 'flex' }} w="100%" overflow="hidden">
        <Box w="50%" overflow="hidden">
          <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" pb="100%">
            <Image src="/new-patients/deep-dive.png" alt="AnswersMD comprehensive exam" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">deep-dive.png (1200x900)</Text></Box>} />
          </MotionBox>
        </Box>
        <Flex w="50%" bg="white" alignItems="center" py={20} px={{ lg: 14, xl: 20 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} maxW="500px">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>The welcome visit</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ lg: '3xl', xl: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Your deep-dive</Text>
            <Text fontSize={{ lg: 'md', xl: 'lg' }} color="brand.body" lineHeight={1.9} mb={10}>
              The first comprehensive exam at AnswersMD isn't like anything you've experienced in traditional medicine. It's not a quick physical. It's a thoughtful, unhurried exploration of your complete health.
            </Text>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Your visit includes</Text>
            <VStack align="flex-start" spacing={3}>
              {INCLUDES.map(function (item) {
                return (
                  <HStack key={item} spacing={3} align="flex-start">
                    <Box color="brand.champagne" mt={0.5} flexShrink={0}><HiCheck size={16} /></Box>
                    <Text fontSize="md" color="brand.body" lineHeight={1.6}>{item}</Text>
                  </HStack>
                );
              })}
            </VStack>
          </MotionBox>
        </Flex>
      </Flex>
    </Box>
  );
}

export default DeepDive;
