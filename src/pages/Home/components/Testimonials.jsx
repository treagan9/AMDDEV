// src/pages/Home/components/Testimonials.jsx
import {
  Box,
  SimpleGrid,
  Flex,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var REVIEWS = [
  { quote: "For the first time in my life, I feel like my doctor actually knows me. The peace of mind that comes with having Dr. Shapiro's cell phone number is priceless.", name: 'Michael R.', since: 'Member since 2023' },
  { quote: "I was skeptical about concierge medicine until I experienced it. Now I can't imagine going back to traditional healthcare. Worth every penny.", name: 'Sarah K.', since: 'Member since 2024' },
  { quote: "When my daughter got sick on a Sunday evening, I texted Dr. Meriwether and had a video call within 10 minutes. That's the kind of care every family deserves.", name: 'Jennifer T.', since: 'Member since 2024' }
];

function Testimonials() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Patient stories</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>What our members say</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, md: 5 }} maxW={{ base: '100%', lg: '60%' }} mx="auto">
          {REVIEWS.map(function (review, i) {
            return (
              <MotionBox key={review.name} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} bg="white" borderRadius="card" py={{ base: 8, md: 10 }} px={{ base: 7, md: 8 }}>
                <Flex direction="column" justify="space-between" h="100%">
                  <Box mb={8}>
                    <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.champagne" lineHeight={1} mb={4}>"</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.85} fontStyle="italic">{review.quote}</Text>
                  </Box>
                  <Box>
                    <Box w="24px" h="2px" bg="brand.champagne" mb={3} />
                    <Text fontSize="md" fontWeight={600} color="brand.slate">{review.name}</Text>
                    <Text fontSize="sm" color="brand.bodyLight">{review.since}</Text>
                  </Box>
                </Flex>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Testimonials;
