// src/components/Header.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Link as ChakraLink,
  Button,
  IconButton,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';

var MotionBox = motion(Box);
var MotionFlex = motion(Flex);

var NAV_LINKS = [
  { label: 'Our Approach', path: '/services/' },
  { label: 'What to Expect', path: '/new-patients/' },
  { label: 'Our Team', path: '/team/' },
  { label: 'Contact', path: '/contact/' }
];

var LOCATIONS = [
  { city: 'Tampa', phone: '813-727-3233', tel: '8137273233' },
  { city: 'St. Petersburg', phone: '813-727-3233', tel: '8137273233' },
  { city: 'Boca Raton', phone: '561-933-3333', tel: '5619333333' }
];

function Header() {
  var [scrolled, setScrolled] = useState(false);
  var { isOpen, onToggle, onClose } = useDisclosure();
  var location = useLocation();

  useEffect(function () {
    var handleScroll = function () { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return function () { window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(function () {
    onClose();
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(function () {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return function () { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg={scrolled ? 'rgba(250, 250, 247, 0.92)' : 'transparent'}
        backdropFilter={scrolled ? 'blur(20px)' : 'none'}
        borderBottom={scrolled ? '1px solid' : '1px solid transparent'}
        borderColor={scrolled ? 'brand.borderLight' : 'transparent'}
        transition="all 0.4s ease"
      >
        <Flex
          maxW="98%"
          mx="auto"
          align="center"
          justify="space-between"
          py={scrolled ? 3 : 5}
          px={{ base: 3, md: 0 }}
          transition="padding 0.4s ease"
        >
          <ChakraLink as={Link} to="/" _hover={{ opacity: 0.85 }} transition="opacity 0.3s ease" display="flex" alignItems="center">
            <Image src="/logo-dark.png" alt="AnswersMD" h={{ base: '32px', md: '42px' }} objectFit="contain" />
          </ChakraLink>

          <HStack spacing={10} display={{ base: 'none', lg: 'flex' }} alignItems="center">
            {NAV_LINKS.map(function (link) {
              var isActive = location.pathname === link.path;
              return (
                <ChakraLink
                  key={link.path}
                  as={Link}
                  to={link.path}
                  fontSize="md"
                  fontWeight={isActive ? 600 : 400}
                  color={isActive ? 'brand.slate' : 'brand.body'}
                  _hover={{ color: 'brand.slate' }}
                  transition="color 0.2s ease"
                  position="relative"
                >
                  {link.label}
                  {isActive && (
                    <Box position="absolute" bottom="-4px" left={0} right={0} h="2px" bg="brand.champagne" borderRadius="full" />
                  )}
                </ChakraLink>
              );
            })}
            <Button as={Link} to="/signup/" variant="primary" size="md">
              Join now
            </Button>
          </HStack>

          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            icon={isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            variant="ghost"
            aria-label="Toggle menu"
            onClick={onToggle}
            color="brand.slate"
            size="lg"
            zIndex={101}
          />
        </Flex>
      </Box>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="brand.ivory"
            zIndex={99}
            display="flex"
            flexDirection="column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Flex justify="center" pt={7}>
              <Image src="/logo-dark.png" alt="AnswersMD" h="32px" />
            </Flex>

            <VStack spacing={0} justify="center" align="center" flex={1}>
              {NAV_LINKS.map(function (link, i) {
                var isActive = location.pathname === link.path;
                return (
                  <MotionFlex
                    key={link.path}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                    w="100%"
                    justify="center"
                  >
                    <ChakraLink
                      as={Link}
                      to={link.path}
                      fontFamily="heading"
                      fontSize="3xl"
                      fontWeight={700}
                      color={isActive ? 'brand.champagne' : 'brand.slate'}
                      py={5}
                      _hover={{ color: 'brand.champagne' }}
                      transition="color 0.2s ease"
                    >
                      {link.label}
                    </ChakraLink>
                  </MotionFlex>
                );
              })}
              <MotionBox
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                mt={8}
              >
                <Button as={Link} to="/signup/" variant="primary" size="lg" px={12}>
                  Join now
                </Button>
              </MotionBox>
            </VStack>

            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              pb={12}
              px={8}
            >
              <Box h="1px" bg="brand.borderLight" mb={8} />
              <HStack justify="center" spacing={10} flexWrap="wrap">
                {LOCATIONS.map(function (loc) {
                  return (
                    <ChakraLink key={loc.city} href={'tel:' + loc.tel} textAlign="center" _hover={{ '& > p:last-child': { color: 'brand.champagne' } }}>
                      <Text fontSize="xs" fontWeight={600} color="brand.warmGrayLight" letterSpacing="1.5px" textTransform="uppercase" mb={1}>{loc.city}</Text>
                      <Text fontSize="md" color="brand.body" transition="color 0.2s ease">{loc.phone}</Text>
                    </ChakraLink>
                  );
                })}
              </HStack>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
