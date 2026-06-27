// src/pages/NewPatients/components/OngoingCare.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var ITEMS = [
  { title: '24/7 direct access', description: 'Your physician\'s cell phone number. Call, text or video whenever you need guidance.' },
  { title: 'Same-day availability', description: 'When something comes up, you\'re seen that day. No waiting weeks for an opening.' },
  { title: 'House calls available', description: 'We\'ll come to your home, office or wherever life takes you. Healthcare on your schedule.' },
  { title: 'Specialist coordination', description: 'We manage the referrals, share records and follow up to ensure nothing falls through.' }
];

function OngoingCare() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: '120px' }} bg="brand.ivory" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="white" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 14 }} alignItems={{ base: 'stretch', lg: 'flex-start' }}>
              <Box maxW={{ base: '100%', lg: '280px' }} flexShrink={0}>
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>After your deep-dive</Text>
                <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>Ongoing care</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.8}>The deep-dive visit is just the beginning. The real value is what comes after.</Text>
              </Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }} flex={1}>
                {ITEMS.map(function (item, i) {
                  return (
                    <MotionBox key={item.title} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }} bg="brand.ivory" borderRadius="card" py={7} px={7}>
                      <Box w="24px" h="3px" bg="brand.champagne" mb={4} />
                      <Text fontSize="lg" fontWeight={700} color="brand.slate" mb={2}>{item.title}</Text>
                      <Text fontSize="md" color="brand.body" lineHeight={1.8}>{item.description}</Text>
                    </MotionBox>
                  );
                })}
              </SimpleGrid>
            </Flex>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default OngoingCare;
