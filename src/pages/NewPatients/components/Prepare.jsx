// src/pages/NewPatients/components/Prepare.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var ITEMS = [
  { title: 'Your medical records', description: 'We\'ll request records from your previous providers but bringing copies of recent labs, imaging and medication lists helps us start faster.' },
  { title: 'Your questions', description: 'Write them down. There\'s no time limit on our conversations so bring everything you\'ve been wanting to ask a doctor.' },
  { title: 'Your medications', description: 'A complete list of everything you take. Prescriptions, supplements, vitamins. Photos of the bottles work great.' }
];

function Prepare() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box ref={ref} w="100%" overflow="hidden">
      <Box display={{ base: 'block', lg: 'none' }}>
        <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" overflow="hidden">
          <Box position="relative" pb="100%">
            <Image src="/new-patients/prepare-square.png" alt="Preparing for your visit" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">prepare-square.png (1200x1200)</Text></Box>} />
          </Box>
        </MotionBox>
        <Box py="sectionMobile" bg="white" px={6}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Before your visit</Text>
            <Text as="h2" fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>How to prepare</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={10}>A few simple things to bring along to make the most of your first visit.</Text>
            <VStack spacing={6} align="stretch">
              {ITEMS.map(function (item, i) {
                return (
                  <MotionBox key={item.title} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} borderLeft="3px solid" borderColor="brand.champagne" pl={5} py={1}>
                    <Text fontSize="lg" fontWeight={700} color="brand.slate" mb={2}>{item.title}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.8}>{item.description}</Text>
                  </MotionBox>
                );
              })}
            </VStack>
          </MotionBox>
        </Box>
      </Box>

      <Flex display={{ base: 'none', lg: 'flex' }} w="100%" overflow="hidden">
        <Flex w="50%" bg="white" alignItems="center" py={20} px={{ lg: 14, xl: 20 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} maxW="500px">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Before your visit</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ lg: '3xl', xl: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>How to prepare</Text>
            <Text fontSize={{ lg: 'md', xl: 'lg' }} color="brand.body" lineHeight={1.8} mb={12}>A few simple things to bring along to make the most of your first visit.</Text>
            <VStack spacing={8} align="stretch">
              {ITEMS.map(function (item, i) {
                return (
                  <MotionBox key={item.title} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} borderLeft="3px solid" borderColor="brand.champagne" pl={6} py={1}>
                    <Text fontSize="lg" fontWeight={700} color="brand.slate" mb={2}>{item.title}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.8}>{item.description}</Text>
                  </MotionBox>
                );
              })}
            </VStack>
          </MotionBox>
        </Flex>
        <Box w="50%" overflow="hidden">
          <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" pb="100%">
            <Image src="/new-patients/prepare-square.png" alt="Preparing for your visit" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">prepare-square.png (1200x1200)</Text></Box>} />
          </MotionBox>
        </Box>
      </Flex>
    </Box>
  );
}

export default Prepare;
