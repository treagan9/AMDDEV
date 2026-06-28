// src/pages/Locations/Tampa/components/Hero.jsx
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
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight } from 'react-icons/hi';
 
var MotionBox = motion(Box);
 
var DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=4100+W+Kennedy+Blvd+Tampa+FL+33609';
 
function Hero() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box ref={ref} bg="white">
      <Flex direction={{ base: 'column', lg: 'row' }} minH={{ lg: '88vh' }}>
        <Box w={{ base: '100%', lg: '62%' }} position="relative" overflow="hidden">
          <Box position="relative" pb={{ base: '72%', md: '60%', lg: '0' }} h={{ lg: '100%' }} minH={{ lg: '88vh' }}>
            <Image src="/locations/tampa-office-main.png" alt="AnswersMD Tampa office" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" />
            <Box position="absolute" top={0} left={0} right={0} h="120px" bg="linear-gradient(to bottom, rgba(250,250,247,0.55) 0%, transparent 100%)" />
          </Box>
        </Box>
 
        <Flex w={{ base: '100%', lg: '38%' }} bg="brand.ivory" align="center" px={{ base: 7, md: 10, lg: 14 }} py={{ base: 12, lg: 0 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} w="100%">
            <HStack spacing={3} mb={5}>
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">Flagship location</Text>
            </HStack>
 
            <Text as="h1" fontFamily="heading" fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="brand.slate" lineHeight={1.0} mb={8}>Tampa</Text>
 
            <VStack align="flex-start" spacing={5} mb={9}>
              <Box>
                <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Address</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.6}>4100 W Kennedy Blvd</Text>
                <Text fontSize="md" color="brand.body">Tampa, FL 33609</Text>
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Phone</Text>
                <ChakraLink href="tel:8137273233" fontSize="md" color="brand.body" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">813-727-3233</ChakraLink>
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Hours</Text>
                <Text fontSize="md" color="brand.body">Monday through Friday, 8am to 5pm</Text>
                <Text fontSize="md" color="brand.champagne" fontWeight={500}>24/7 member access</Text>
              </Box>
            </VStack>
 
            <VStack align="stretch" spacing={3} w={{ base: '100%', lg: 'auto' }}>
              <Button as={ChakraLink} href={DIRECTIONS_URL} isExternal variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} _hover={{ textDecoration: 'none' }}>Get directions</Button>
              <Button as={Link} to="/signup/" variant="secondary" size="lg">Join now</Button>
            </VStack>
          </MotionBox>
        </Flex>
      </Flex>
    </Box>
  );
}
 
export default Hero;
