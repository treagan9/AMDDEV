// src/components/Header.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Button,
  Image
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';

var NAV_LINKS = [
  { label: 'Our Approach', path: '/services/' },
  { label: 'What to Expect', path: '/new-patients/' },
  { label: 'Our Team', path: '/team/' },
  { label: 'Contact', path: '/contact/' }
];

function Header() {
  var [scrolled, setScrolled] = useState(false);
  var [drawerOpen, setDrawerOpen] = useState(false);
  var location = useLocation();

  useEffect(function () {
    var handleScroll = function () { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return function () { window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(function () {
    setDrawerOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(function () {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return function () { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={101}
        bg={drawerOpen ? 'transparent' : scrolled ? 'rgba(255,255,255,0.92)' : 'transparent'}
        backdropFilter={drawerOpen ? 'none' : scrolled ? 'blur(20px)' : 'none'}
        borderBottom={drawerOpen ? 'none' : scrolled ? '1px solid' : '1px solid transparent'}
        borderColor={scrolled ? '#E8E2D8' : 'transparent'}
        transition="all 0.4s ease"
      >
        <Flex
          maxW="98%"
          mx="auto"
          align="center"
          justify="space-between"
          py={scrolled ? 3 : 5}
          px={{ base: 5, md: 0 }}
          transition="padding 0.4s ease"
        >
          <ChakraLink
            as={Link}
            to="/"
            _hover={{ opacity: 0.85 }}
            transition="opacity 0.3s ease"
            display="flex"
            alignItems="center"
            opacity={drawerOpen ? 0 : 1}
            pointerEvents={drawerOpen ? 'none' : 'auto'}
          >
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
                  {isActive && <Box position="absolute" bottom="-4px" left={0} right={0} h="2px" bg="brand.champagne" borderRadius="full" />}
                </ChakraLink>
              );
            })}
            <Button as={Link} to="/signup/" variant="primary" size="md">Join now</Button>
          </HStack>

          <Box
            display={{ base: 'flex', lg: 'none' }}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            w="44px"
            h="44px"
            cursor="pointer"
            onClick={toggleDrawer}
            position="relative"
          >
            <Box w="22px" h="2px" bg="brand.slate" borderRadius="full" transition="all 0.3s ease" transform={drawerOpen ? 'rotate(45deg) translateY(0px)' : 'translateY(-4px)'} position={drawerOpen ? 'absolute' : 'relative'} />
            <Box w="22px" h="2px" bg="brand.slate" borderRadius="full" transition="all 0.3s ease" opacity={drawerOpen ? 0 : 1} />
            <Box w="22px" h="2px" bg="brand.slate" borderRadius="full" transition="all 0.3s ease" transform={drawerOpen ? 'rotate(-45deg) translateY(0px)' : 'translateY(4px)'} position={drawerOpen ? 'absolute' : 'relative'} />
          </Box>
        </Flex>
      </Box>

      <MobileDrawer isOpen={drawerOpen} onClose={function () { setDrawerOpen(false); }} currentPath={location.pathname} />
    </>
  );
}

export default Header;
