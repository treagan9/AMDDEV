// src/pages/Home/components/Locations.jsx
import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Image,
  Badge,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeSection, { fadeUp } from '../../../components/shared/FadeSection';
import SectionHeader from '../../../components/shared/SectionHeader';

var MotionBox = motion(Box);

var LOCATIONS = [
  {
    city: 'Tampa',
    subtitle: 'Flagship Location',
    status: 'Now Open',
    image: 'https://answersmd.com/images/tampa_suite.jpg',
    path: '/location-tampa/'
  },
  {
    city: 'St. Petersburg',
    subtitle: "St. Anthony's Hospital Campus",
    status: 'Now Open',
    image: 'https://answersmd.com/images/location_st_pete.jpg',
    path: '/location-st-pete/'
  },
  {
    city: 'Boca Raton',
    subtitle: 'Adjacent to Royal Palm Yacht Club',
    status: 'Coming Soon',
    image: 'https://answersmd.com/images/location_royal_palm.jpg',
    path: '/location-boca-raton/'
  }
];

function LocationCard({ city, subtitle, status, image, path }) {
  return (
    <MotionBox variants={fadeUp}>
      <ChakraLink as={Link} to={path} _hover={{ textDecoration: 'none' }}>
        <Box
          position="relative"
          overflow="hidden"
          bg="brand.mist"
          transition="all 0.4s ease"
          cursor="pointer"
          _hover={{
            transform: 'translateY(-6px)',
            shadow: '0 20px 40px rgba(27, 58, 52, 0.1)'
          }}
        >
          <Box h={{ base: '240px', md: '280px' }} overflow="hidden">
            <Image
              src={image}
              alt={city + ' location'}
              objectFit="cover"
              w="100%"
              h="100%"
              transition="transform 0.6s ease"
              _groupHover={{ transform: 'scale(1.05)' }}
            />
          </Box>
          <Box p={6} bg="white">
            <Badge
              bg={status === 'Now Open' ? 'brand.champagneSoft' : 'brand.mist'}
              color={status === 'Now Open' ? 'brand.champagneDark' : 'brand.warmGrayLight'}
              fontSize="xs"
              fontWeight={600}
              letterSpacing="1px"
              textTransform="uppercase"
              px={3}
              py={1}
              borderRadius="2px"
              mb={3}
            >
              {status}
            </Badge>
            <Text fontFamily="heading" fontSize="2xl" color="brand.slate" mb={1}>
              {city}
            </Text>
            <Text fontSize="sm" color="brand.warmGrayLight">
              {subtitle}
            </Text>
          </Box>
        </Box>
      </ChakraLink>
    </MotionBox>
  );
}

function Locations() {
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <FadeSection>
          <Box mb={16}>
            <SectionHeader
              eyebrow="Our Locations"
              heading="Find Us Near You"
              description="Three Florida locations delivering the same exceptional concierge care."
            />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {LOCATIONS.map(function (loc) {
              return <LocationCard key={loc.city} {...loc} />;
            })}
          </SimpleGrid>
        </FadeSection>
      </Box>
    </Box>
  );
}

export default Locations;
