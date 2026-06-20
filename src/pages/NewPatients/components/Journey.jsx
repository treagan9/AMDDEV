// src/pages/NewPatients/components/Journey.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STEPS = [
  { title: 'Initial consultation', description: 'A simple conversation about your health goals. No pressure, no commitment. Just an honest discussion about whether AnswersMD is right for you.' },
  { title: 'Meet your doctor', description: 'You\'ll meet the physician who will become your primary care provider. This is about fit, not formality.' },
  { title: 'Simple enrollment', description: 'No mountains of paperwork. When you\'re ready, enrollment takes minutes and your membership begins immediately.' },
  { title: 'The deep-dive visit', description: 'Your first extended visit is a comprehensive assessment. No rushing. We review everything and build your personalized health roadmap.' }
];

function Journey() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 10, md: 14 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Your journey</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} maxW="600px">From first call to lifelong care</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={0}>
          {STEPS.map(function (step, i) {
            return (
              <MotionBox
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                borderTop="3px solid"
                borderColor="brand.champagne"
                pt={6}
                pb={{ base: 8, md: 0 }}
                pr={{ base: 0, md: 8 }}
                mr={{ base: 0, md: i < 3 ? 0 : 0 }}
                borderRight={{ base: 'none', lg: i < 3 ? '1px solid' : 'none' }}
                borderRightColor="brand.borderLight"
                pl={{ base: 0, lg: i > 0 ? 8 : 0 }}
              >
                <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" mb={4}>{step.title}</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.85}>{step.description}</Text>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Journey;
