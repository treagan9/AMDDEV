// src/pages/Locations/BocaRaton/components/Team.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
var PHYSICIANS = [
  { name: 'Douglas Shapiro, DO', role: 'Founder & Lead Physician', photo: '/team/dr-doug-shapiro.webp', bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be. Personal, unhurried and built on real relationships. With over 6 years of experience in family medicine, he brings a genuine commitment to knowing each patient as an individual.' },
  { name: "Divino D'Alessio Jr., MD", role: 'Sports & Family Medicine', photo: '/team/dr-divino-dalessio.webp', bio: "Board-certified Family Medicine paired with advanced Sports Medicine training including NCAA Division I team coverage and diagnostic musculoskeletal ultrasound. He cares for active adults, athletes and families who want evidence-based care focused on performance, prevention and safe return to activity." }
];
 
var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.webp' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.webp' }
];
 
function Team() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4} textAlign="center">Your care team</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1} mb={{ base: 12, md: 16 }} textAlign="center">Meet the Boca Raton team</Text>
        </MotionBox>
 
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 14, md: 16 }} maxW="800px" mx="auto" mb={{ base: 14, md: 18 }}>
          {PHYSICIANS.map(function (doc, i) {
            return (
              <MotionBox key={doc.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }} textAlign="center">
                <Box w={{ base: '180px', md: '200px' }} h={{ base: '180px', md: '200px' }} borderRadius="full" overflow="hidden" mx="auto" mb={6} border="3px solid" borderColor="brand.champagne">
                  <Image src={doc.photo} alt={doc.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                </Box>
                <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" mb={1}>{doc.name}</Text>
                <Text fontSize="sm" color="brand.champagne" fontWeight={500} mb={4}>{doc.role}</Text>
                <Text fontSize="sm" color="brand.body" lineHeight={1.85}>{doc.bio}</Text>
              </MotionBox>
            );
          })}
        </SimpleGrid>
 
        <Box w="40px" h="1px" bg="brand.champagneLine" mx="auto" mb={10} />
 
        <Flex justify="center" gap={{ base: 6, md: 10 }} flexWrap="wrap">
          {STAFF.map(function (m, i) {
            return (
              <MotionBox key={m.name} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }} textAlign="center" w={{ base: '70px', md: '90px' }}>
                <Box w={{ base: '70px', md: '88px' }} h={{ base: '70px', md: '88px' }} borderRadius="full" overflow="hidden" mx="auto" mb={3} border="2px solid" borderColor="brand.borderLight">
                  <Image src={m.photo} alt={m.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                </Box>
                <Text fontSize="xs" fontWeight={600} color="brand.slate" lineHeight={1.3}>{m.name}</Text>
                <Text fontSize="xs" color="brand.bodyLight" mt={1}>{m.role}</Text>
              </MotionBox>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
 
export default Team;
