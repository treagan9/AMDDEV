// src/pages/Home/components/Services.jsx
import {
  Box,
  SimpleGrid,
  VStack,
  Flex,
  Text,
  Button,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlinePhone,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineClipboardCheck,
  HiArrowRight
} from 'react-icons/hi';

var MotionBox = motion(Box);

var SERVICES = [
  {
    icon: HiOutlinePhone,
    title: '24/7 Direct Access',
    description: 'Reach your physician anytime via call, text or video. No waiting rooms, no delays.'
  },
  {
    icon: HiOutlineHeart,
    title: 'Preventive Care',
    description: 'Comprehensive annual exams, advanced screenings and personalized wellness plans.'
  },
  {
    icon: HiOutlineHome,
    title: 'House Calls',
    description: "When you can't come to us, we come to you. Healthcare on your terms."
  },
  {
    icon: HiOutlineClipboardCheck,
    title: 'Executive Health',
    description: 'Premium 3+ hour physicals with advanced diagnostics and longevity planning.'
  }
];

function ServiceCard({ icon, title, description, delay }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
    >
      <VStack
        spacing={5}
        p={{ base: 8, md: 10 }}
        bg="white"
        borderRadius="card"
        border="1px solid"
        borderColor="brand.borderLight"
        textAlign="center"
        h="100%"
        transition="all 0.4s ease"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: '0 16px 40px rgba(27,58,52,0.06)',
          borderColor: 'brand.champagneLine'
        }}
      >
        <Flex
          w={14}
          h={14}
          bg="brand.champagneSoft"
          align="center"
          justify="center"
          borderRadius="full"
        >
          <Icon as={icon} boxSize={6} color="brand.champagne" />
        </Flex>
        <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="brand.slate">
          {title}
        </Text>
        <Text fontSize="sm" color="brand.body" lineHeight={1.8}>
          {description}
        </Text>
      </VStack>
    </MotionBox>
  );
}

function Services() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={ref}>
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
            What we offer
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
            Comprehensive concierge care
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="brand.body"
            lineHeight={1.8}
            maxW="560px"
            mx="auto"
          >
            From preventive wellness to urgent needs, we're here for every
            aspect of your health.
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
          {SERVICES.map(function (service, i) {
            return (
              <ServiceCard
                key={service.title}
                {...service}
                delay={0.2 + i * 0.08}
              />
            );
          })}
        </SimpleGrid>

        <Box textAlign="center" mt={10}>
          <Button
            as={Link}
            to="/services/"
            variant="ghost"
            rightIcon={<Icon as={HiArrowRight} />}
            color="brand.body"
            _hover={{ color: 'brand.evergreen' }}
          >
            View all services
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Services;
