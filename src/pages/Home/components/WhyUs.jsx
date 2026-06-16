// src/pages/Home/components/WhyUs.jsx
import {
  Box,
  SimpleGrid,
  HStack,
  VStack,
  Flex,
  Text,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineClock,
  HiOutlineChat,
  HiOutlineUserGroup,
  HiOutlineCalendar
} from 'react-icons/hi';

var MotionBox = motion(Box);

var REASONS = [
  {
    icon: HiOutlineCalendar,
    title: 'Same-day appointments',
    description: 'No more waiting weeks to see your doctor. We guarantee same-day or next-day appointments.'
  },
  {
    icon: HiOutlineChat,
    title: 'Direct communication',
    description: "Your doctor's personal cell phone number. Text, call or video chat anytime."
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Limited enrollment',
    description: 'We cap our patient panel to ensure quality time with every member.'
  },
  {
    icon: HiOutlineClock,
    title: 'Extended visits',
    description: '30 to 60 minute appointments are standard. Your health deserves more than 7 minutes.'
  }
];

function ReasonCard({ icon, title, description, delay, inView }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
    >
      <HStack
        align="flex-start"
        spacing={5}
        p={{ base: 6, md: 8 }}
      >
        <Flex
          w={12}
          h={12}
          bg="brand.champagneSoft"
          align="center"
          justify="center"
          borderRadius="full"
          flexShrink={0}
        >
          <Icon as={icon} boxSize={5} color="brand.champagne" />
        </Flex>
        <VStack align="flex-start" spacing={2}>
          <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate">
            {title}
          </Text>
          <Text fontSize="sm" color="brand.body" lineHeight={1.8}>
            {description}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
}

function WhyUs() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          textAlign="center"
          mb={{ base: 8, md: 12 }}
        >
          <Text
            fontSize="xs"
            fontWeight={600}
            letterSpacing="2px"
            textTransform="uppercase"
            color="brand.champagne"
            mb={4}
          >
            The difference
          </Text>
          <Text
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight={700}
            color="brand.slate"
            lineHeight={1.1}
          >
            Why our members love us
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} maxW="960px" mx="auto">
          {REASONS.map(function (reason, i) {
            return (
              <ReasonCard
                key={reason.title}
                {...reason}
                delay={0.2 + i * 0.1}
                inView={inView}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default WhyUs;
