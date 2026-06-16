// src/pages/Home/components/Locations.jsx
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Icon
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlinePhone } from 'react-icons/hi';

var MotionBox = motion(Box);

var LOCATIONS = [
  {
    city: 'Tampa',
    subtitle: 'Flagship location',
    status: 'Now open',
    phone: '813-727-3233',
    tel: '8137273233',
    image: 'https://answersmd.com/images/tampa_suite.jpg',
    path: '/location-tampa/'
  },
  {
    city: 'St. Petersburg',
    subtitle: "St. Anthony's Hospital campus",
    status: 'Now open',
    phone: '813-727-3233',
    tel: '8137273233',
    image: 'https://answersmd.com/images/location_st_pete.jpg',
    path: '/location-st-pete/'
  },
  {
    city: 'Boca Raton',
    subtitle: 'Royal Palm Yacht Club area',
    status: 'Coming soon',
    phone: '561-933-3333',
    tel: '5619333333',
    image: 'https://answersmd.com/images/location_royal_palm.jpg',
    path: '/location-boca-raton/'
  }
];

function LocationCard({ city, subtitle, status, phone, tel, image, path, delay, inView }) {
  var navigate = useNavigate();

  function handleCardClick() {
    navigate(path);
  }

  function handlePhoneClick(e) {
    e.stopPropagation();
    window.location.href = 'tel:' + tel;
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Box
        overflow="hidden"
        borderRadius="card"
        bg="white"
        border="1px solid"
        borderColor="brand.borderLight"
        transition="all 0.4s ease"
        cursor="pointer"
        onClick={handleCardClick}
        role="group"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: '0 16px 40px rgba(27,58,52,0.08)',
          borderColor: 'brand.champagneLine'
        }}
      >
        <Box h={{ base: '200px', md: '240px' }} overflow="hidden" borderRadius="18px 18px 0 0">
          <Image
            src={image}
            alt={city + ' location'}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.6s ease"
            _groupHover={{ transform: 'scale(1.04)' }}
          />
        </Box>
        <Box p={6}>
          <Badge
            bg={status === 'Now open' ? 'brand.champagneSoft' : 'brand.mist'}
            color={status === 'Now open' ? 'brand.champagneDark' : 'brand.warmGrayLight'}
            fontSize="xs"
            fontWeight={600}
            letterSpacing="1px"
            textTransform="uppercase"
            px={3}
            py={1}
            borderRadius="btn"
            mb={3}
          >
            {status}
          </Badge>
          <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="brand.slate" mb={1}>
            {city}
          </Text>
          <Text fontSize="sm" color="brand.bodyLight" mb={3}>
            {subtitle}
          </Text>
          <HStack
            spacing={2}
            onClick={handlePhoneClick}
            cursor="pointer"
            _hover={{ '& > *': { color: 'brand.champagneDark' } }}
            transition="color 0.2s ease"
          >
            <Icon as={HiOutlinePhone} boxSize={4} color="brand.champagne" />
            <Text fontSize="sm" color="brand.champagne">
              {phone}
            </Text>
          </HStack>
        </Box>
      </Box>
    </MotionBox>
  );
}

function Locations() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          textAlign="center"
          mb={{ base: 10, md: 14 }}
        >
          <Text
            fontSize="xs"
            fontWeight={600}
            letterSpacing="2px"
            textTransform="uppercase"
            color="brand.champagne"
            mb={4}
          >
            Our locations
          </Text>
          <Text
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight={700}
            color="brand.slate"
            lineHeight={1.1}
            mb={4}
          >
            Find us near you
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="brand.body"
            lineHeight={1.8}
            maxW="560px"
            mx="auto"
          >
            Three Florida locations delivering the same exceptional concierge care.
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {LOCATIONS.map(function (loc, i) {
            return (
              <LocationCard
                key={loc.city}
                {...loc}
                delay={0.2 + i * 0.1}
                inView={inView}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Locations;
