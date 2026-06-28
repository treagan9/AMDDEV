// src/pages/Locations/BocaRaton/components/Hero.jsx
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
 
function Hero() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box ref={ref} bg="white">
      <Flex direction={{ base: 'column', lg: 'row' }} minH={{ lg: '88vh' }}>
        <Box w={{ base: '100%', lg: '62%' }} position="relative" overflow="hidden">
          <Box position="relative" pb={{ base: '72%', md: '60%', lg: '0' }} h={{ lg: '100%' }} minH={{ lg: '88vh' }}>
            <Image src="/locations/boca-main.webp" alt="AnswersMD Boca Raton" objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" />
            <Box position="absolute" top={0} left={0} right={0} h="120px" bg="linear-gradient(to bottom, rgba(250,250,247,0.55) 0%, transparent 100%)" />
          </Box>
        </Box>
 
        <Flex w={{ base: '100%', lg: '38%' }} bg="brand.ivory" align="center" px={{ base: 7, md: 10, lg: 14 }} py={{ base: 12, lg: 0 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} w="100%">
            <HStack spacing={3} mb={5}>
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">Opening soon</Text>
            </HStack>
 
            <Text as="h1" fontFamily="heading" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.04} mb={6}>Boca Raton</Text>
 
            <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>Concierge medicine is coming to Palm Beach County. Join the waitlist to be first through the door.</Text>
 
            <VStack align="flex-start" spacing={5} mb={9}>
              <Box>
                <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Future home</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.6}>1801 S Federal Hwy</Text>
                <Text fontSize="md" color="brand.body">Boca Raton, FL 33432</Text>
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight={700} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight" mb={1}>Phone</Text>
                <ChakraLink href="tel:5619333333" fontSize="md" color="brand.body" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">561-933-3333</ChakraLink>
              </Box>
            </VStack>
 
            <VStack align="stretch" spacing={3} w={{ base: '100%', lg: 'auto' }}>
              <Button as={Link} to="/contact/" variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />}>Join the waitlist</Button>
              <Button as={Link} to="/signup/" variant="secondary" size="lg">Learn more</Button>
            </VStack>
          </MotionBox>
        </Flex>
      </Flex>
    </Box>
  );
}
 
export default Hero;
