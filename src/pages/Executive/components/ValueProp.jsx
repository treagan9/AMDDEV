// src/pages/Executive/components/ValueProp.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STATS = [
  { value: '24/7', label: 'Direct physician access anywhere' },
  { value: 'Same day', label: 'Appointments guaranteed' },
  { value: '60 min', label: 'Extended visits, not rushed encounters' },
  { value: '100%', label: 'Care coordination across all providers' }
];

function ValueProp() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 14, lg: 20 }}>
            <Box flex={1}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>The business case</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={8}>Healthcare that protects your investment</Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={5}>You've invested millions in recruiting, developing and retaining top talent. But when your CEO needs to see a doctor, they're stuck in the same broken system as everyone else. Waiting weeks for appointments, sitting in crowded waiting rooms, getting 10 minutes with a physician who doesn't know them.</Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={10}>That's not just frustrating. It's a business risk.</Text>
              <Box borderLeft="3px solid" borderColor="brand.champagne" pl={{ base: 6, md: 10 }} py={2} mb={10}>
                <Text fontSize={{ base: 'lg', md: 'xl' }} fontFamily="heading" fontWeight={700} color="brand.slate" fontStyle="italic" lineHeight={1.6}>Concierge medicine ensures your most important people get immediate access to a physician who knows them, coordinates their care and catches problems before they become crises.</Text>
              </Box>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>We've caught early-stage cancers during routine executive physicals. We've prevented heart attacks by noticing subtle changes over time. We've kept executives healthy and performing because their doctor had time to actually care.</Text>
            </Box>
            <Box w={{ base: '100%', lg: '380px' }} flexShrink={0}>
              <SimpleGrid columns={2} spacing={4}>
                {STATS.map(function (stat, i) {
                  return (
                    <MotionBox key={stat.value} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} bg="brand.ivory" py={8} px={6} textAlign="center">
                      <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.evergreen" lineHeight={1} mb={3}>{stat.value}</Text>
                      <Text fontSize="md" color="brand.body" lineHeight={1.5}>{stat.label}</Text>
                    </MotionBox>
                  );
                })}
              </SimpleGrid>
            </Box>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default ValueProp;
