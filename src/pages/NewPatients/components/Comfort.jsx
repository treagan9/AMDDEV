// src/pages/NewPatients/components/Comfort.jsx
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var TAGS = ['Tailored to you', 'No pressure', 'Your pace'];

function Comfort() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="brand.mist" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Your care, your comfort level</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>Everything is on your terms</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={10} maxW="560px" mx="auto">
              We tailor everything to you. Not every patient wants every test. Not everyone is comfortable with every procedure. Your visits, your services and your ongoing care are shaped by your needs, your preferences and your goals.
            </Text>
            <Flex gap={3} justify="center" flexWrap="wrap">
              {TAGS.map(function (tag, i) {
                return (
                  <MotionBox key={tag} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}>
                    <Box bg="white" px={6} py={3} borderRadius="btn" border="1px solid" borderColor="#E8E2D8">
                      <Text fontSize="md" fontWeight={500} color="brand.slate">{tag}</Text>
                    </Box>
                  </MotionBox>
                );
              })}
            </Flex>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Comfort;
