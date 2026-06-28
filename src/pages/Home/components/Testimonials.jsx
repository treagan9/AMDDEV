// src/pages/Home/components/Testimonials.jsx
import {
  Box,
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
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="#F2EDE3" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} align={{ base: 'flex-start', lg: 'center' }} gap={{ base: 10, lg: 16 }}>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            w={{ base: '100%', lg: '42%' }}
            flexShrink={0}
          >
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Patient stories</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={5}>What our members say</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="420px">Real stories from members who left the waiting rooms and the runaround behind.</Text>
          </MotionBox>

          <Box w={{ base: '100%', lg: '58%' }} minW={0} position="relative">
            <Flex
              display={{ base: 'none', lg: 'flex' }}
              gap={8}
              overflowX="auto"
              pb={4}
              sx={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {REVIEWS.map(function (review, i) {
                return (
                  <MotionBox
                    key={review.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                    flexShrink={0}
                    w="62%"
                    pl={6}
                    borderLeft="2px solid"
                    borderColor="brand.champagne"
                    sx={{ scrollSnapAlign: 'start' }}
                  >
                    <Text fontFamily="heading" fontSize="4xl" fontWeight={700} color="brand.champagne" lineHeight={1} mb={3}>&ldquo;</Text>
                    <Text fontSize="lg" color="brand.body" lineHeight={1.85} fontStyle="italic" mb={6}>{review.quote}</Text>
                    <Text fontSize="md" fontWeight={600} color="brand.slate">{review.name}</Text>
                    <Text fontSize="sm" color="brand.bodyLight">{review.since}</Text>
                  </MotionBox>
                );
              })}
              <Box flexShrink={0} w="2px" />
            </Flex>

            <Box display={{ base: 'block', lg: 'none' }}>
              {REVIEWS.map(function (review, i) {
                return (
                  <MotionBox
                    key={review.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    pl={5}
                    borderLeft="2px solid"
                    borderColor="brand.champagne"
                    mb={i === REVIEWS.length - 1 ? 0 : 8}
                  >
                    <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.champagne" lineHeight={1} mb={3}>&ldquo;</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.85} fontStyle="italic" mb={4}>{review.quote}</Text>
                    <Text fontSize="md" fontWeight={600} color="brand.slate">{review.name}</Text>
                    <Text fontSize="sm" color="brand.bodyLight">{review.since}</Text>
                  </MotionBox>
                );
              })}
            </Box>
          </Box>

        </Flex>
      </Box>
    </Box>
  );
}

export default Testimonials;