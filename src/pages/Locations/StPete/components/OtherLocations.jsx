// src/pages/Locations/StPete/components/OtherLocations.jsx
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  HStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
var OTHERS = [
  { city: 'Tampa', status: 'Now open', path: '/location-tampa/', image: '/locations/tampa-office-main.webp', teaser: 'Our flagship on West Kennedy' },
  { city: 'Boca Raton', status: 'Opening soon', path: '/location-boca-raton/', image: '/locations/boca-main.webp', teaser: 'Coming soon to Palm Beach County' }
];
 
function LocationCard({ city, status, path, image, teaser, delay, inView }) {
  var navigate = useNavigate();
 
  return (
    <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: delay }} position="relative" cursor="pointer" onClick={function () { navigate(path); }} role="group" overflow="hidden" borderRadius="card">
      <Box position="relative" w="100%" pb="62%" overflow="hidden">
        <Image src={image} alt={city} objectFit="cover" position="absolute" top={0} left={0} w="100%" h="100%" transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" _groupHover={{ transform: 'scale(1.05)' }} />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to top, rgba(45,45,45,0.78) 0%, rgba(45,45,45,0.1) 55%, transparent 100%)" />
        <Box position="absolute" bottom={0} left={0} right={0} p={{ base: 5, md: 6 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={2}>{status}</Text>
          <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="white" lineHeight={1.1} mb={1}>{city}</Text>
          <Text fontSize="sm" color="rgba(255,255,255,0.85)">{teaser}</Text>
        </Box>
      </Box>
    </MotionBox>
  );
}
 
function OtherLocations() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 8, md: 12 }}>
          <HStack spacing={3} mb={4}>
            <Box w="24px" h="1px" bg="brand.champagne" />
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">More AnswersMD</Text>
          </HStack>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Our other locations</Text>
        </MotionBox>
 
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, md: 6 }}>
          {OTHERS.map(function (loc, i) {
            return <LocationCard key={loc.city} {...loc} delay={0.15 + i * 0.12} inView={inView} />;
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
 
export default OtherLocations;
