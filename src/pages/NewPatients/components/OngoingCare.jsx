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
    <Box py={{ base: 'sectionMobile', md: '160px' }} bg="brand.evergreen" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 20 }} alignItems={{ base: 'stretch', lg: 'center' }}>
            <Box maxW={{ base: '100%', lg: '380px' }} flexShrink={0}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>After your deep-dive</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="white" lineHeight={1.08} mb={4}>Ongoing care</Text>
              <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.8}>The deep-dive visit is just the beginning. The real value is what comes after. A physician who knows you, available whenever you need them.</Text>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} flex={1}>
              {ITEMS.map(function (item, i) {
                var isTop = i < 2;
                var isLeft = i % 2 === 0;
                return (
                  <MotionBox
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                    py={8}
                    px={{ base: 0, md: 8 }}
                    borderLeft={{ base: 'none', md: isLeft ? 'none' : '1px solid' }}
                    borderTop={isTop ? 'none' : '1px solid'}
                    borderColor="whiteAlpha.150"
                  >
                    <Text fontSize="lg" fontWeight={700} color="white" mb={3}>{item.title}</Text>
                    <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.8}>{item.description}</Text>
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

export default OngoingCare;
