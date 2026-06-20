// src/pages/NewPatients/components/Editorial.jsx
import {
  Box,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

function Editorial() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box maxW="800px" mx="auto">
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={{ base: 8, md: 10 }}>
              Healthcare should never feel rushed
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={6}>
              Most people have never experienced what a real doctor-patient relationship can be. Appointments that don't feel like you're against the clock. A physician who remembers not just your medical history but your life. Someone who picks up the phone when you call.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={{ base: 12, md: 16 }}>
              At AnswersMD, we've built a practice around a simple belief. When your doctor has time to truly know you, everything changes. Problems get caught earlier. Care becomes proactive instead of reactive. And you finally have a partner in your health.
            </Text>
            <Box borderLeft="3px solid" borderColor="brand.champagne" pl={{ base: 6, md: 10 }} py={2}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="brand.slate" fontFamily="heading" fontWeight={700} fontStyle="italic" lineHeight={1.6} mb={5}>
                "From the moment you join, you have a doctor with time for you. Not a call center, not a waiting list, not a runaround. A real person who knows your name and picks up the phone."
              </Text>
              <Text fontSize="md" fontWeight={600} color="brand.champagne">Dr. Douglas Shapiro, Founder</Text>
            </Box>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Editorial;
