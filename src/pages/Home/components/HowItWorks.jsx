// src/pages/Home/components/HowItWorks.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight, HiArrowDown } from 'react-icons/hi';

var MotionBox = motion(Box);

var STEPS = [
  {
    number: '1',
    title: 'Schedule a consultation',
    description: 'Meet with our team to learn about membership and discuss your health goals.'
  },
  {
    number: '2',
    title: 'Complete onboarding',
    description: "We gather your medical history and establish a comprehensive health baseline."
  },
  {
    number: '3',
    title: 'Meet your physician',
    description: 'Your first extended visit is about getting to know you, not just reviewing a chart.'
  },
  {
    number: '4',
    title: 'Enjoy direct access',
    description: "Call, text or video chat your doctor whenever you need. We're always here."
  }
];

function StepCircle({ number, delay, inView }) {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: delay }}
    >
      <Flex
        w={{ base: '48px', md: '56px' }}
        h={{ base: '48px', md: '56px' }}
        borderRadius="full"
        border="2px solid"
        borderColor="brand.champagne"
        align="center"
        justify="center"
        bg="brand.champagneSoft"
        mx={{ base: 0, md: 'auto' }}
        mb={5}
      >
        <Text
          fontFamily="heading"
          fontSize={{ base: 'lg', md: 'xl' }}
          fontWeight={700}
          color="brand.champagne"
        >
          {number}
        </Text>
      </Flex>
    </MotionBox>
  );
}

function Arrow({ direction, delay, inView }) {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 0.35 } : {}}
      transition={{ duration: 0.4, delay: delay }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        as={direction === 'down' ? HiArrowDown : HiArrowRight}
        boxSize={5}
        color="brand.champagne"
      />
    </MotionBox>
  );
}

function DesktopSteps({ inView }) {
  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      align="flex-start"
      justify="center"
      gap={0}
    >
      {STEPS.map(function (step, i) {
        var baseDelay = 0.2 + i * 0.15;
        return (
          <Flex key={step.number} align="flex-start" flex={1}>
            <VStack spacing={0} flex={1} textAlign="center" px={4}>
              <StepCircle number={step.number} delay={baseDelay} inView={inView} />
              <MotionBox
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: baseDelay + 0.1 }}
              >
                <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={3}>
                  {step.title}
                </Text>
                <Text fontSize="sm" color="brand.body" lineHeight={1.8} maxW="220px" mx="auto">
                  {step.description}
                </Text>
              </MotionBox>
            </VStack>
            {i < STEPS.length - 1 && (
              <Box pt="26px" px={1} flexShrink={0}>
                <Arrow direction="right" delay={baseDelay + 0.08} inView={inView} />
              </Box>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}

function MobileSteps({ inView }) {
  return (
    <VStack
      display={{ base: 'flex', lg: 'none' }}
      spacing={0}
      align="stretch"
      position="relative"
      pl={8}
    >
      <Box
        position="absolute"
        left="23px"
        top="28px"
        bottom="28px"
        w="2px"
        bg="brand.champagneLine"
      />

      {STEPS.map(function (step, i) {
        var baseDelay = 0.2 + i * 0.12;
        return (
          <Flex key={step.number} align="flex-start" pb={i < STEPS.length - 1 ? 10 : 0}>
            <Box position="absolute" left={0}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: baseDelay }}
              >
                <Flex
                  w="48px"
                  h="48px"
                  borderRadius="full"
                  border="2px solid"
                  borderColor="brand.champagne"
                  align="center"
                  justify="center"
                  bg="white"
                  position="relative"
                  zIndex={1}
                >
                  <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.champagne">
                    {step.number}
                  </Text>
                </Flex>
              </MotionBox>
            </Box>
            <MotionBox
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: baseDelay + 0.1 }}
              pl={10}
              pt={1}
            >
              <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={2}>
                {step.title}
              </Text>
              <Text fontSize="sm" color="brand.body" lineHeight={1.8}>
                {step.description}
              </Text>
            </MotionBox>
          </Flex>
        );
      })}
    </VStack>
  );
}

function HowItWorks() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          textAlign="center"
          mb={{ base: 10, md: 14 }}
        >
          <Text
            fontSize="xs"
            fontWeight={600}
            letterSpacing="2px"
            textTransform="uppercase"
            color="brand.champagne"
            mb={4}
          >
            How it works
          </Text>
          <Text
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight={700}
            color="brand.slate"
            lineHeight={1.1}
            mb={4}
          >
            Getting started is simple
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="brand.body"
            lineHeight={1.8}
            maxW="560px"
            mx="auto"
          >
            Join our practice in four easy steps and experience healthcare transformed.
          </Text>
        </MotionBox>

        <DesktopSteps inView={inView} />
        <MobileSteps inView={inView} />
      </Box>
    </Box>
  );
}

export default HowItWorks;
