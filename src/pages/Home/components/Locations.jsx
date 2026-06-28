// src/pages/Home/components/Locations.jsx
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var LOCATIONS = [
  { city: 'Tampa', status: 'Now open', image: '/locations/tampa-office-main.webp', path: '/location-tampa/' },
  { city: 'St. Petersburg', status: 'Now open', image: '/locations/st-pete.webp', path: '/location-st-pete/' },
  { city: 'Boca Raton', status: 'Coming soon', image: '/locations/boca-main.webp', path: '/location-boca-raton/' }
];

function LocationSquare({ city, status, image, path, delay, inView }) {
  var navigate = useNavigate();

  return (
    <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: delay }} position="relative" cursor="pointer" onClick={function () { navigate(path); }} role="group" overflow="hidden">
      <Box position="relative" w="100%" pb="100%" overflow="hidden">
        <Image src={image} alt={city} objectFit="cover" position="absolute" top={0} left={0} w="100%" h="100%" transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" _groupHover={{ transform: 'scale(1.06)' }} />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to top, rgba(45,45,45,0.75) 0%, rgba(45,45,45,0.15) 50%, transparent 100%)" transition="opacity 0.4s ease" _groupHover={{ opacity: 0.95 }} />
        <Box position="absolute" bottom={0} left={0} right={0} p={{ base: 5, md: 8 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={2}>{status}</Text>
          <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="white" lineHeight={1.1}>{city}</Text>
        </Box>
      </Box>
    </MotionBox>
  );
}

function Locations() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box ref={ref} bg="white" py={{ base: 'sectionMobile', md: 'section' }}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 8, md: 12 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Our locations</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Find us in Florida</Text>
        </MotionBox>
      </Box>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 5 }} borderRadius="card" overflow="hidden">
          {LOCATIONS.map(function (loc, i) {
            return (
              <GridItem key={loc.city}>
                <LocationSquare {...loc} delay={0.1 + i * 0.15} inView={inView} />
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Locations;
