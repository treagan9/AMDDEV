// src/pages/Home/components/CTA.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

function CTA() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          <VStack spacing={8} textAlign="center" maxW="600px" mx="auto">
            <Box w="32px" h="1px" bg="brand.champagne" />
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to meet your care team?</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8}>Schedule a consultation to learn how AnswersMD can transform your healthcare experience.</Text>
            <Flex gap={4} direction={{ base: 'column', sm: 'row' }} w={{ base: '100%', sm: 'auto' }}>
              <Button as={Link} to="/contact/" variant="primary" size="lg" w={{ base: '100%', sm: 'auto' }}>Schedule a consultation</Button>
              <Button as={Link} to="/signup/" variant="secondary" size="lg" w={{ base: '100%', sm: 'auto' }}>Join now</Button>
            </Flex>
            <ChakraLink href="tel:8137273233" fontSize="sm" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }}>or call 813-727-3233</ChakraLink>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default CTA;
