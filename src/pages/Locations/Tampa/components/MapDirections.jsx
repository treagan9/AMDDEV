// src/pages/Locations/Tampa/components/MapDirections.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight } from 'react-icons/hi';

var MotionBox = motion(Box);

var LAT = 27.9445;
var LNG = -82.5106;
var ADDRESS_QUERY = '4100 W Kennedy Blvd Tampa FL 33609';
var GOOGLE_DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(ADDRESS_QUERY);
var APPLE_DIRECTIONS = 'https://maps.apple.com/?daddr=' + encodeURIComponent(ADDRESS_QUERY);

var MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
var MAPBOX_USERNAME = 'mapbox';
var MAPBOX_STYLE_ID = 'light-v11';

function buildMapUrl() {
  if (!MAPBOX_TOKEN) {
    return '';
  }
  var lng = LNG.toFixed(5);
  var lat = LAT.toFixed(5);
  var pin = 'pin-l+c9a86a(' + lng + ',' + lat + ')';
  var camera = lng + ',' + lat + ',14.5';
  var size = '900x760';
  return 'https://api.mapbox.com/styles/v1/' + MAPBOX_USERNAME + '/' + MAPBOX_STYLE_ID + '/static/' + pin + '/' + camera + '/' + size + '?access_token=' + MAPBOX_TOKEN;
}

function isAppleDevice() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  return /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
}

function PlaceholderMap() {
  return (
    <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="brand.mist" overflow="hidden">
      <Box position="absolute" top="-10%" left="-10%" w="120%" h="120%" opacity={0.5} sx={{ background: 'repeating-linear-gradient(0deg, rgba(60,55,45,0.06) 0px, rgba(60,55,45,0.06) 1px, transparent 1px, transparent 56px), repeating-linear-gradient(90deg, rgba(60,55,45,0.06) 0px, rgba(60,55,45,0.06) 1px, transparent 1px, transparent 56px)' }} />
      <Box position="absolute" top="44%" left="-5%" w="110%" h="22px" bg="rgba(201,168,106,0.18)" transform="rotate(-8deg)" />
      <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -100%)">
        <Box w="18px" h="18px" borderRadius="full" bg="brand.champagne" border="3px solid white" boxShadow="0 4px 14px rgba(60,50,40,0.25)" />
        <Box w="2px" h="14px" bg="brand.champagne" mx="auto" />
      </Box>
    </Box>
  );
}

function MapVisual() {
  var [failed, setFailed] = useState(false);
  var url = buildMapUrl();

  if (!url || failed) {
    return <PlaceholderMap />;
  }

  return (
    <>
      <PlaceholderMap />
      <Image
        src={url}
        alt="Map of AnswersMD Tampa at 4100 W Kennedy Blvd"
        objectFit="cover"
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        crossOrigin="anonymous"
        onLoad={function () {
          console.log('Mapbox static image loaded');
        }}
        onError={function () {
          console.error('Mapbox static image failed to load. URL (token hidden):', url.replace(MAPBOX_TOKEN, 'TOKEN_HIDDEN'));
          setFailed(true);
        }}
      />
    </>
  );
}

function MapDirections() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var apple = isAppleDevice();
  var primaryUrl = apple ? APPLE_DIRECTIONS : GOOGLE_DIRECTIONS;
  var primaryLabel = apple ? 'Directions in Apple Maps' : 'Directions in Google Maps';
  var secondaryUrl = apple ? GOOGLE_DIRECTIONS : APPLE_DIRECTIONS;
  var secondaryLabel = apple ? 'Google Maps' : 'Apple Maps';

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Box bg="white" borderRadius="card" overflow="hidden" boxShadow="0 8px 32px rgba(60,50,40,0.05)" border="1px solid" borderColor="rgba(60,50,40,0.06)">
            <Flex direction={{ base: 'column', lg: 'row' }}>
              <Box w={{ base: '100%', lg: '46%' }} p={{ base: 8, md: 12 }}>
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Visit us</Text>
                <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15} mb={8}>Right on West Kennedy</Text>

                <VStack align="flex-start" spacing={6} mb={9}>
                  <Box>
                    <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Address</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.6}>4100 W Kennedy Blvd</Text>
                    <Text fontSize="md" color="brand.body">Tampa, FL 33609</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Parking</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.6}>Complimentary on-site parking for members and guests.</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Hours</Text>
                    <Text fontSize="md" color="brand.body">Monday through Friday, 8am to 5pm</Text>
                    <Text fontSize="md" color="brand.champagne" fontWeight={500}>24/7 member access</Text>
                  </Box>
                </VStack>

                <VStack align="stretch" spacing={3} w={{ base: '100%', sm: 'auto' }}>
                  <Button as={ChakraLink} href={primaryUrl} isExternal variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} _hover={{ textDecoration: 'none' }}>{primaryLabel}</Button>
                  <ChakraLink href={secondaryUrl} isExternal fontSize="sm" fontWeight={500} color="brand.bodyLight" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease" textAlign={{ base: 'center', sm: 'left' }}>or open in {secondaryLabel}</ChakraLink>
                </VStack>
              </Box>

              <Box w={{ base: '100%', lg: '54%' }} position="relative" minH={{ base: '240px', md: '320px', lg: 'auto' }}>
                <ChakraLink href={primaryUrl} isExternal display="block" position="absolute" top={0} left={0} w="100%" h="100%" role="group" aria-label={'Open directions to ' + ADDRESS_QUERY}>
                  <MapVisual />
                  <Box position="absolute" bottom={4} right={4} bg="white" borderRadius="full" px={4} py={2} boxShadow="0 4px 14px rgba(60,50,40,0.12)" opacity={0.95} _groupHover={{ opacity: 1 }} transition="opacity 0.2s ease" zIndex={2}>
                    <HStack spacing={2}>
                      <Text fontSize="xs" fontWeight={600} color="brand.slate">Open in Maps</Text>
                      <Icon as={HiArrowRight} boxSize={3} color="brand.champagne" />
                    </HStack>
                  </Box>
                </ChakraLink>
              </Box>
            </Flex>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default MapDirections;