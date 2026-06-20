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
    <Box ref={ref}>
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Box w={{ base: '100%', lg: '50%' }} position="relative" overflow="hidden" role="group">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            h={{ base: '0', lg: '100%' }}
            pb={{ base: '75%', lg: '0' }}
            position={{ base: 'relative', lg: 'absolute' }}
            top={0}
            left={0}
            right={0}
            bottom={0}
          >
            <Image
              src="/new-patients/deep-dive.png"
              alt="AnswersMD comprehensive exam"
              objectFit="cover"
              objectPosition="center"
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              _groupHover={{ transform: 'scale(1.04)' }}
              fallback={
                <Box w="100%" h="100%" bg="brand.mist" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="sm" color="brand.warmGrayLight">deep-dive.png</Text>
                </Box>
              }
            />
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="rgba(27,58,52,0.06)" transition="background 0.4s ease" _groupHover={{ bg: 'rgba(27,58,52,0.12)' }} />
          </MotionBox>
        </Box>
        <Flex w={{ base: '100%', lg: '50%' }} bg="brand.ivory" py={{ base: 14, md: 16, lg: 20 }} px={{ base: 6, md: 10, lg: 16 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>The welcome visit</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={6}>Your deep-dive</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.9} mb={10}>
              The first comprehensive exam at AnswersMD isn't like anything you've experienced in traditional medicine. It's not a quick physical. It's a thoughtful, unhurried exploration of your complete health.
            </Text>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Your visit includes</Text>
            <VStack align="flex-start" spacing={4}>
              {INCLUDES.map(function (item) {
                return (
                  <HStack key={item} spacing={4} align="flex-start">
                    <Box w="6px" h="6px" borderRadius="full" bg="brand.champagne" mt={2} flexShrink={0} />
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
