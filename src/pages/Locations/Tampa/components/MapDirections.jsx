// src/pages/Locations/Tampa/components/MapDirections.jsx
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight } from 'react-icons/hi';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

var MotionBox = motion(Box);

var LAT = 27.9445;
var LNG = -82.5106;
var ADDRESS_QUERY = '4100 W Kennedy Blvd Tampa FL 33609';
var GOOGLE_DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(ADDRESS_QUERY);
var APPLE_DIRECTIONS = 'https://maps.apple.com/?daddr=' + encodeURIComponent(ADDRESS_QUERY);

var MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

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

function LiveMap() {
  var containerRef = useRef(null);
  var mapRef = useRef(null);
  var rafRef = useRef(null);
  var interactedRef = useRef(false);
  var [failed, setFailed] = useState(false);

  useEffect(function () {
    if (!MAPBOX_TOKEN) {
      setFailed(true);
      return;
    }
    if (!containerRef.current || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    var map;
    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        center: [LNG, LAT],
        zoom: 16.4,
        pitch: 68,
        bearing: -24,
        antialias: true,
        cooperativeGestures: true
      });
    } catch (e) {
      console.error('Mapbox GL failed to initialize:', e);
      setFailed(true);
      return;
    }

    mapRef.current = map;

    function stopOrbit() {
      interactedRef.current = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    map.on('dragstart', stopOrbit);
    map.on('zoomstart', function () {
      if (map.isMoving() && !rafRef.current) {
        return;
      }
    });
    map.on('mousedown', stopOrbit);
    map.on('touchstart', stopOrbit);
    map.on('wheel', stopOrbit);

    map.on('style.load', function () {
      try {
        map.setConfigProperty('basemap', 'lightPreset', 'dusk');
        map.setConfigProperty('basemap', 'theme', 'faded');
        map.setConfigProperty('basemap', 'showPointOfInterestLabels', false);
        map.setConfigProperty('basemap', 'showTransitLabels', false);
      } catch (e) {
        // best-effort on Standard style config
      }

      try {
        map.setFog({
          range: [1, 12],
          color: 'rgba(245, 242, 235, 0.9)',
          'high-color': 'rgba(220, 228, 235, 0.9)',
          'horizon-blend': 0.2,
          'space-color': 'rgba(235, 238, 242, 1)',
          'star-intensity': 0
        });
      } catch (e) {
        // fog is best-effort
      }

      var el = document.createElement('div');
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.background = '#C9A86A';
      el.style.border = '3px solid #ffffff';
      el.style.boxShadow = '0 6px 18px rgba(60,50,40,0.4)';

      new mapboxgl.Marker({ element: el })
        .setLngLat([LNG, LAT])
        .addTo(map);

      var startBearing = -24;
      function orbit() {
        if (interactedRef.current) {
          return;
        }
        startBearing += 0.06;
        map.setBearing(startBearing);
        rafRef.current = requestAnimationFrame(orbit);
      }
      rafRef.current = requestAnimationFrame(orbit);
    });

    map.on('error', function (e) {
      console.error('Mapbox GL error:', e && e.error ? e.error.message : e);
      setFailed(true);
    });

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');

    return function () {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      map.remove();
      mapRef.current = null;
    };
  }, []);

  if (failed) {
    return <PlaceholderMap />;
  }

  return (
    <Box
      ref={containerRef}
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      sx={{
        '.mapboxgl-ctrl-logo': { opacity: 0.5 },
        '.mapboxgl-ctrl-bottom-right': { zIndex: 1 },
        '.mapboxgl-ctrl-attrib': { fontSize: '10px', opacity: 0.7 }
      }}
    />
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

              <Box w={{ base: '100%', lg: '54%' }} position="relative" minH={{ base: '300px', md: '400px', lg: 'auto' }}>
                <LiveMap />
              </Box>
            </Flex>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default MapDirections;