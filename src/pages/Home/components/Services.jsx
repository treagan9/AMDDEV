// src/pages/Home/components/Services.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var SERVICES = [
  { title: '24/7 direct access', description: 'Reach your physician anytime via call, text or video. No answering services, no callbacks.' },
  { title: 'Preventive care', description: 'Comprehensive annual exams, advanced screenings and personalized wellness plans.' },
  { title: 'House calls', description: "When you can't come to us, we come to you. Your home, your office, wherever life takes you." },
  { title: 'Executive health', description: 'Premium 3+ hour physicals with advanced diagnostics and longevity planning.' }
];

function Services() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box ref={ref}>
      <Box display={{ base: 'block', lg: 'none' }}>
        <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" overflow="hidden">
          <Box position="relative" pb="75%">
            <Image src="/home/home-services-portrait.png" alt="AnswersMD concierge care" objectFit="cover" objectPosition="right center" position="absolute" top={0} left={0} w="100%" h="100%" fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">home-services-portrait.png (900x1200)</Text></Box>} />
          </Box>
        </MotionBox>
        <Box py={{ base: 'sectionMobile' }} bg="white" px={6}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>What we offer</Text>
            <Text as="h2" fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Comprehensive concierge care</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={10}>From preventive wellness to urgent needs, we're here for every aspect of your health.</Text>
            <VStack spacing={6} align="stretch" mb={10}>
              {SERVICES.map(function (svc, i) {
                return (
                  <MotionBox key={svc.title} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} borderLeft="3px solid" borderColor="brand.champagne" pl={5} py={1}>
                    <Text fontSize="lg" fontWeight={700} color="brand.slate" mb={2}>{svc.title}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.8}>{svc.description}</Text>
                  </MotionBox>
                );
              })}
            </VStack>
            <Button as={Link} to="/services/" variant="primary" size="lg" w="100%">View all services</Button>
          </MotionBox>
        </Box>
      </Box>

      <Flex display={{ base: 'none', lg: 'flex' }}>
        <Box w="50%" position="relative" overflow="hidden">
          <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="absolute" top={0} left={0} right={0} bottom={0}>
            <Image src="/home/home-services-portrait.png" alt="AnswersMD concierge care" objectFit="cover" objectPosition="center" w="100%" h="100%" fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">home-services-portrait.png (900x1200)</Text></Box>} />
          </MotionBox>
        </Box>
        <Flex w="50%" bg="white" alignItems="center" py={20} px={{ lg: 14, xl: 20 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} maxW="500px">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>What we offer</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ lg: '4xl', xl: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Comprehensive concierge care</Text>
            <Text fontSize={{ lg: 'md', xl: 'lg' }} color="brand.body" lineHeight={1.8} mb={12}>From preventive wellness to urgent needs, we're here for every aspect of your health.</Text>
            <VStack spacing={8} align="stretch" mb={12}>
              {SERVICES.map(function (svc, i) {
                return (
                  <MotionBox key={svc.title} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} borderLeft="3px solid" borderColor="brand.champagne" pl={6} py={1}>
                    <Text fontSize="lg" fontWeight={700} color="brand.slate" mb={2}>{svc.title}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.8}>{svc.description}</Text>
                  </MotionBox>
                );
              })}
            </VStack>
            <Button as={Link} to="/services/" variant="primary" size="lg">View all services</Button>
          </MotionBox>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Services;
