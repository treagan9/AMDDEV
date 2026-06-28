// src/pages/Locations/BocaRaton/components/CareWorks.jsx
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
var CONTENT = {
  label: 'How care works',
  heading: 'Concierge care, on your terms',
  body: 'Walk in, book any time, or have your physician come to you. One simple membership with direct access and none of the insurance headaches.',
  reviews: [
    { quote: 'We joined the waitlist the day we heard. Concierge care that matches the standard we expect everywhere else in life.', name: 'Thomas W.', since: 'Founding member' },
    { quote: 'Knowing my physician is a text away, wherever I am, is exactly the peace of mind I was looking for.', name: 'Elena R.', since: 'Founding member' },
    { quote: 'One membership, real access, no insurance maze. This is the way medicine should have always worked.', name: 'James H.', since: 'Founding member' }
  ]
};
 
function CareWorks() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var reviews = CONTENT.reviews;
 
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="#F2EDE3" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} align={{ base: 'flex-start', lg: 'center' }} gap={{ base: 10, lg: 16 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} w={{ base: '100%', lg: '42%' }} flexShrink={0}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>{CONTENT.label}</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={5}>{CONTENT.heading}</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="420px">{CONTENT.body}</Text>
          </MotionBox>
 
          <Box w={{ base: '100%', lg: '58%' }} minW={0} position="relative">
            <Flex display={{ base: 'none', lg: 'flex' }} gap={8} overflowX="auto" pb={4} sx={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' }, WebkitOverflowScrolling: 'touch' }}>
              {reviews.map(function (review, i) {
                return (
                  <MotionBox key={review.name} initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }} flexShrink={0} w="62%" pl={6} borderLeft="2px solid" borderColor="brand.champagne" sx={{ scrollSnapAlign: 'start' }}>
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
              {reviews.map(function (review, i) {
                return (
                  <MotionBox key={review.name} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }} pl={5} borderLeft="2px solid" borderColor="brand.champagne" mb={i === reviews.length - 1 ? 0 : 8}>
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
 
export default CareWorks;
