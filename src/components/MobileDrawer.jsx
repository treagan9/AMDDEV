// src/components/MobileDrawer.jsx
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

var MotionBox = motion(Box);

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

var LOCATIONS = [
  { city: 'Tampa', status: 'Now open', path: '/location-tampa/' },
  { city: 'St. Petersburg', status: 'Now open', path: '/location-st-pete/' },
  { city: 'Boca Raton', status: 'Opening soon', path: '/location-boca-raton/' }
];

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function MobileDrawer({ isOpen, onClose, currentPath }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionBox
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(30,28,24,0.5)"
            zIndex={99}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <MotionBox
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            w="88%"
            maxW="400px"
            bg="white"
            zIndex={100}
            display="flex"
            flexDirection="column"
            overflowY="auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            boxShadow="-8px 0 40px rgba(30,28,24,0.18)"
          >
            <Flex align="center" px={7} pt={7} pb={6} borderBottom="1px solid" borderColor="#EDE8DE" flexShrink={0}>
              <ChakraLink as={Link} to="/" onClick={onClose}>
                <Image src="/logo-dark.webp" alt="AnswersMD" h="30px" objectFit="contain" />
              </ChakraLink>
            </Flex>

            <Box flex={1} px={7} py={8}>
              <VStack spacing={0} align="stretch" mb={8}>
                {PRIMARY_LINKS.map(function (link, i) {
                  var isActive = currentPath === link.path;
                  return (
                    <MotionBox
                      key={link.path}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.3 }}
                    >
                      <ChakraLink
                        as={Link}
                        to={link.path}
                        onClick={onClose}
                        fontFamily="heading"
                        fontSize="2xl"
                        fontWeight={700}
                        color={isActive ? 'brand.champagne' : 'brand.slate'}
                        py={2.5}
                        _hover={{ color: 'brand.champagne' }}
                        transition="color 0.2s ease"
                        display="block"
                      >
                        {link.label}
                      </ChakraLink>
                    </MotionBox>
                  );
                })}
              </VStack>

              <MotionBox
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.3 }}
                mb={9}
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
                transition={{ delay: 0.4, duration: 0.3 }}
                mb={9}
              >
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Our locations</Text>
                <VStack spacing={0} align="stretch">
                  {LOCATIONS.map(function (loc, i) {
                    var isActive = currentPath === loc.path;
                    return (
                      <ChakraLink
                        key={loc.path}
                        as={Link}
                        to={loc.path}
                        onClick={onClose}
                        py={3}
                        borderTop={i === 0 ? '1px solid' : 'none'}
                        borderBottom="1px solid"
                        borderColor="#EDE8DE"
                        _hover={{ '& .city': { color: 'brand.champagne' } }}
                        display="block"
                      >
                        <Flex align="center" justify="space-between">
                          <Text className="city" fontFamily="heading" fontSize="lg" fontWeight={700} color={isActive ? 'brand.champagne' : 'brand.slate'} transition="color 0.2s ease">{loc.city}</Text>
                          <Text fontSize="xs" fontWeight={600} letterSpacing="1px" textTransform="uppercase" color="brand.bodyLight">{loc.status}</Text>
                        </Flex>
                      </ChakraLink>
                    );
                  })}
                </VStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.46, duration: 0.3 }}
              >
                <Flex flexWrap="wrap" rowGap={3} columnGap={5}>
                  {SECONDARY_LINKS.map(function (link) {
                    var isActive = currentPath === link.path;
                    return (
                      <ChakraLink
                        key={link.path}
                        as={Link}
                        to={link.path}
                        onClick={onClose}
                        fontSize="sm"
                        fontWeight={500}
                        color={isActive ? 'brand.champagne' : 'brand.body'}
                        _hover={{ color: 'brand.champagne' }}
                        transition="color 0.2s ease"
                      >
                        {link.label}
                      </ChakraLink>
                    );
                  })}
                </Flex>
              </MotionBox>
            </Box>

            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52, duration: 0.3 }}
              px={7}
              py={7}
              bg="#F7F4EE"
              flexShrink={0}
            >
              <VStack align="stretch" spacing={4}>
                <ChakraLink href="mailto:info@answersmd.com" fontSize="md" fontWeight={500} color="brand.slate" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
                <Flex gap={8}>
                  <ChakraLink href="tel:8137273233" _hover={{ opacity: 0.8 }}>
                    <Text fontSize="xs" fontWeight={600} color="brand.bodyLight" letterSpacing="1px" textTransform="uppercase" mb={1}>Tampa</Text>
                    <Text fontSize="md" fontWeight={500} color="brand.slate">813-727-3233</Text>
                  </ChakraLink>
                  <ChakraLink href="tel:5619333333" _hover={{ opacity: 0.8 }}>
                    <Text fontSize="xs" fontWeight={600} color="brand.bodyLight" letterSpacing="1px" textTransform="uppercase" mb={1}>Boca Raton</Text>
                    <Text fontSize="md" fontWeight={500} color="brand.slate">561-933-3333</Text>
                  </ChakraLink>
                </Flex>
                <HStack spacing={5} pt={1}>
                  <ChakraLink href="https://www.facebook.com/61589476375367" target="_blank" rel="noopener noreferrer" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease"><FacebookIcon /></ChakraLink>
                  <ChakraLink href="https://www.instagram.com/answersmd/" target="_blank" rel="noopener noreferrer" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease"><InstagramIcon /></ChakraLink>
                  <ChakraLink href="#" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease"><LinkedInIcon /></ChakraLink>
                </HStack>
              </VStack>
            </MotionBox>
          </MotionBox>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileDrawer;