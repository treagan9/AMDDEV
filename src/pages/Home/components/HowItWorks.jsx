// src/pages/Home/components/HowItWorks.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STEPS = [
  { num: '01', title: 'Schedule a consultation', description: 'Meet with our team to learn about membership and discuss your health goals.' },
  { num: '02', title: 'Complete onboarding', description: 'We gather your medical history and establish a comprehensive health baseline.' },
  { num: '03', title: 'Meet your physician', description: 'Your first extended visit is about getting to know you, not just reviewing a chart.' },
  { num: '04', title: 'Enjoy direct access', description: "Call, text or video chat your doctor whenever you need. We're always here." }
];

function HowItWorks() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 16 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>How it works</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={4}>Getting started is simple</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">Join our practice in four steps and experience healthcare transformed.</Text>
        </MotionBox>

        <SimpleGrid columns={4} spacing={{ md: 10, lg: 14 }} maxW={{ md: '90%', lg: '80%' }} mx="auto" display={{ base: 'none', md: 'grid' }}>
          {STEPS.map(function (step, i) {
            return (
              <MotionBox key={step.num} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} textAlign="center">
                <Text fontFamily="heading" fontSize={{ md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1} mb={5} opacity={0.7}>{step.num}</Text>
                <Text fontFamily="heading" fontSize={{ md: 'lg', lg: 'xl' }} fontWeight={700} color="brand.slate" mb={3}>{step.title}</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>{step.description}</Text>
              </MotionBox>
            );
          })}
        </SimpleGrid>

        <Box display={{ base: 'block', md: 'none' }}>
          {STEPS.map(function (step, i) {
            return (
              <MotionBox key={step.num} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }} py={6} borderTop={i === 0 ? '3px solid' : '1px solid'} borderColor={i === 0 ? 'brand.champagne' : '#D5D0C8'}>
                <Flex gap={5} align="flex-start">
                  <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.champagne" lineHeight={1} flexShrink={0} w="48px">{step.num}</Text>
                  <Box>
                    <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={2}>{step.title}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.85}>{step.description}</Text>
                  </Box>
                </Flex>
              </MotionBox>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default HowItWorks;
