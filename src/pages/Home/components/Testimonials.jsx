// src/pages/Home/components/Testimonials.jsx
import {
  Box,
  SimpleGrid,
  Flex,
  HStack,
  Text,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiStar } from 'react-icons/hi';

var MotionBox = motion(Box);

var REVIEWS = [
  {
    quote: "For the first time in my life, I feel like my doctor actually knows me. The peace of mind that comes with having Dr. Shapiro's cell phone number is priceless.",
    name: 'Michael R.',
    initials: 'MR',
    since: '2023',
    stars: 5
  },
  {
    quote: "I was skeptical about concierge medicine until I experienced it. Now I can't imagine going back to traditional healthcare. Worth every penny.",
    name: 'Sarah K.',
    initials: 'SK',
    since: '2024',
    stars: 5
  },
  {
    quote: "When my daughter got sick on a Sunday evening, I texted Dr. Meriwether and had a video call within 10 minutes. That's the kind of care every family deserves.",
    name: 'Jennifer T.',
    initials: 'JT',
    since: '2024',
    stars: 5
  }
];

function Stars({ count }) {
  return (
    <HStack spacing={0.5}>
      {Array.from({ length: count }).map(function (_, i) {
        return <Icon key={i} as={HiStar} boxSize={4} color="brand.champagne" />;
      })}
    </HStack>
  );
}

function ReviewCard({ quote, name, initials, since, stars, delay, inView }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Flex
        direction="column"
        justify="space-between"
        p={{ base: 8, md: 10 }}
        bg="white"
        borderRadius="card"
        border="1px solid"
        borderColor="brand.borderLight"
        h="100%"
        transition="all 0.3s ease"
        _hover={{
          shadow: '0 8px 24px rgba(27,58,52,0.06)',
          borderColor: 'brand.champagneLine'
        }}
      >
        <Box mb={8}>
          <Stars count={stars} />
          <Text fontSize="md" color="brand.slate" lineHeight={1.85} mt={5}>
            "{quote}"
          </Text>
        </Box>
        <HStack spacing={3}>
          <Flex
            w="40px"
            h="40px"
            borderRadius="full"
            bg="brand.evergreen"
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Text fontSize="xs" fontWeight={600} color="white" letterSpacing="0.5px">
              {initials}
            </Text>
          </Flex>
          <Box>
            <Text fontSize="sm" fontWeight={600} color="brand.slate">
              {name}
            </Text>
            <Text fontSize="xs" color="brand.warmGrayLight" textTransform="uppercase" letterSpacing="0.5px">
              Member since {since}
            </Text>
          </Box>
        </HStack>
      </Flex>
    </MotionBox>
  );
}

function Testimonials() {
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
            Patient stories
          </Text>
          <Text
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight={700}
            color="brand.slate"
            lineHeight={1.1}
          >
            What our members say
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {REVIEWS.map(function (review, i) {
            return (
              <ReviewCard
                key={review.name}
                {...review}
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

export default Testimonials;
