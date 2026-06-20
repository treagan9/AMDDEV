// src/pages/Executive/components/Steps.jsx
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
  { title: 'Discovery call', description: 'We learn about your organization, who you want to cover and what matters most.' },
  { title: 'Custom proposal', description: 'We build a program tailored to your needs with transparent, straightforward pricing.' },
  { title: 'Onboarding', description: 'Each member gets a dedicated physician and comprehensive welcome visit.' },
  { title: 'Ongoing care', description: '24/7 access, proactive health management and a physician who knows your people.' }
];

function Steps() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: '160px' }} bg="brand.evergreen" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 12, lg: 20 }} alignItems={{ base: 'stretch', lg: 'flex-start' }}>
            <Box maxW={{ base: '100%', lg: '340px' }} flexShrink={0}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Getting started</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="white" lineHeight={1.12}>How corporate programs work</Text>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} flex={1}>
              {STEPS.map(function (step, i) {
                var isTop = i < 2;
                var isLeft = i % 2 === 0;
                return (
                  <MotionBox
                    key={step.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                    py={8}
                    px={{ base: 0, md: 8 }}
                    borderLeft={{ base: 'none', md: isLeft ? 'none' : '1px solid' }}
                    borderTop={isTop ? 'none' : '1px solid'}
                    borderColor="whiteAlpha.150"
                  >
                    <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.champagne" lineHeight={1} mb={4}>{'0' + (i + 1)}</Text>
                    <Text fontSize="lg" fontWeight={700} color="white" mb={3}>{step.title}</Text>
                    <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.85}>{step.description}</Text>
                  </MotionBox>
                );
              })}
            </SimpleGrid>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Steps;
