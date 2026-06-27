// src/components/MobileDrawer.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

var MotionBox = motion(Box);
var MotionFlex = motion(Flex);

var PRIMARY_LINKS = [
  { label: 'Our Approach', path: '/services/' },
  { label: 'What to Expect', path: '/new-patients/' },
  { label: 'Our Team', path: '/team/' },
  { label: 'Contact', path: '/contact/' }
];

var SECONDARY_LINKS = [
  { label: 'FAQ', path: '/faq/' },
  { label: 'Pricing', path: '/pricing/' },
  { label: 'Insurance', path: '/insurance/' },
  { label: 'Executive Health', path: '/executive/' },
  { label: 'Patient Stories', path: '/stories/' }
];

function MobileDrawer({ isOpen, onClose, currentPath }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="white"
          zIndex={100}
          display="flex"
          flexDirection="column"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          overflowY="auto"
        >
          <Flex justify="center" pt={7} mb={2} flexShrink={0}>
            <ChakraLink as={Link} to="/" onClick={onClose}>
              <Image src="/logo-dark.png" alt="AnswersMD" h="32px" objectFit="contain" />
            </ChakraLink>
          </Flex>

          <Flex direction="column" justify="center" align="center" flex={1} px={8} py={6}>
            <VStack spacing={1} w="100%" mb={8}>
              {PRIMARY_LINKS.map(function (link, i) {
                var isActive = currentPath === link.path;
                return (
                  <MotionFlex
                    key={link.path}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                    w="100%"
                    justify="center"
                  >
                    <ChakraLink
                      as={Link}
                      to={link.path}
                      onClick={onClose}
                      fontFamily="heading"
                      fontSize="3xl"
                      fontWeight={700}
                      color={isActive ? 'brand.champagne' : 'brand.slate'}
                      py={3}
                      _hover={{ color: 'brand.champagne' }}
                      transition="color 0.2s ease"
                      textAlign="center"
                      display="block"
                      w="100%"
                    >
                      {link.label}
                    </ChakraLink>
                  </MotionFlex>
                );
              })}
            </VStack>

            <MotionBox
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.3 }}
              w="100%"
              maxW="280px"
              mb={10}
            >
              <Button
                as={Link}
                to="/signup/"
                onClick={onClose}
                variant="primary"
                size="lg"
                w="100%"
                fontSize="md"
              >
                Join now
              </Button>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              w="100%"
              maxW="280px"
            >
              <Box h="1px" bg="#E8E2D8" mb={6} />
              <Flex flexWrap="wrap" justify="center" gap={3} mb={6}>
                {SECONDARY_LINKS.map(function (link) {
                  var isActive = currentPath === link.path;
                  return (
                    <ChakraLink
                      key={link.path}
                      as={Link}
                      to={link.path}
                      onClick={onClose}
                      fontSize="md"
                      fontWeight={500}
                      color={isActive ? 'brand.champagne' : 'brand.body'}
                      _hover={{ color: 'brand.champagne' }}
                      transition="color 0.2s ease"
                      px={2}
                      py={1}
                    >
                      {link.label}
                    </ChakraLink>
                  );
                })}
              </Flex>
            </MotionBox>
          </Flex>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            px={8}
            pb={10}
            flexShrink={0}
          >
            <Box h="1px" bg="#E8E2D8" mb={6} />
            <Flex justify="center" gap={8} mb={4}>
              <ChakraLink href="tel:8137273233" textAlign="center" _hover={{ opacity: 0.8 }}>
                <Text fontSize="xs" fontWeight={600} color="#B5AD9E" letterSpacing="1px" textTransform="uppercase" mb={1}>Tampa</Text>
                <Text fontSize="md" fontWeight={500} color="brand.slate">813-727-3233</Text>
              </ChakraLink>
              <ChakraLink href="tel:5619333333" textAlign="center" _hover={{ opacity: 0.8 }}>
                <Text fontSize="xs" fontWeight={600} color="#B5AD9E" letterSpacing="1px" textTransform="uppercase" mb={1}>Boca Raton</Text>
                <Text fontSize="md" fontWeight={500} color="brand.slate">561-933-3333</Text>
              </ChakraLink>
            </Flex>
            <Flex justify="center">
              <ChakraLink href="mailto:info@answersmd.com" fontSize="md" color="brand.body" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
            </Flex>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}

export default MobileDrawer;
