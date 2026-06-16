// src/components/Footer.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiOutlinePhone } from 'react-icons/hi';

var QUICK_LINKS = [
  { label: 'Our Approach', path: '/services/' },
  { label: 'What to Expect', path: '/new-patients/' },
  { label: 'Our Team', path: '/team/' },
  { label: 'Contact', path: '/contact/' },
  { label: 'Get Started', path: '/signup/' }
];

var COMPANY_LINKS = [
  { label: 'FAQ', path: '/faq/' },
  { label: 'Insurance & Billing', path: '/insurance/' },
  { label: 'Executive Health', path: '/executive/' },
  { label: 'Pricing', path: '/pricing/' },
  { label: 'Patient Stories', path: '/stories/' }
];

var LOCATIONS = [
  { city: 'Tampa', phone: '813-727-3233', tel: '8137273233', fax: '833-941-5028' },
  { city: 'St. Pete', phone: '813-727-3233', tel: '8137273233', fax: '833-941-5028' },
  { city: 'Boca Raton', phone: '561-933-3333', tel: '5619333333', fax: '844-670-8963' }
];

function FooterHeading({ children }) {
  return (
    <Text
      fontSize="11px"
      fontWeight={600}
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="whiteAlpha.400"
      mb={5}
    >
      {children}
    </Text>
  );
}

function Footer() {
  return (
    <Box as="footer" bg="#1C2926">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }} pt={{ base: 14, md: 20 }} pb={10}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 12, lg: 20 }}
          mb={{ base: 12, lg: 16 }}
        >
          <Box maxW={{ base: '100%', lg: '360px' }} flexShrink={0}>
            <Image
              src="/logo-off-white.png"
              alt="AnswersMD"
              h={{ base: '36px', md: '44px' }}
              objectFit="contain"
              mb={6}
            />
            <Text fontSize="sm" color="whiteAlpha.500" lineHeight={1.85} mb={5}>
              AnswersMD is concierge medicine, simplified. By limiting our patient panel, we give
              you direct access to your doctor via call, text or video. Same-day appointments
              and visits that last as long as you need.
            </Text>
            <ChakraLink
              href="mailto:info@answersmd.com"
              fontSize="sm"
              color="whiteAlpha.600"
              _hover={{ color: 'white' }}
              transition="color 0.2s ease"
            >
              info@answersmd.com
            </ChakraLink>
          </Box>

          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 8, md: 12 }} flex={1}>
            <Box>
              <FooterHeading>Quick Links</FooterHeading>
              <VStack align="flex-start" spacing={3}>
                {QUICK_LINKS.map(function (link) {
                  return (
                    <ChakraLink
                      key={link.path}
                      as={Link}
                      to={link.path}
                      fontSize="sm"
                      fontWeight={500}
                      color="whiteAlpha.600"
                      _hover={{ color: 'white' }}
                      transition="color 0.2s ease"
                    >
                      {link.label}
                    </ChakraLink>
                  );
                })}
              </VStack>
            </Box>

            <Box>
              <FooterHeading>Company</FooterHeading>
              <VStack align="flex-start" spacing={3}>
                {COMPANY_LINKS.map(function (link) {
                  return (
                    <ChakraLink
                      key={link.path}
                      as={Link}
                      to={link.path}
                      fontSize="sm"
                      fontWeight={500}
                      color="whiteAlpha.600"
                      _hover={{ color: 'white' }}
                      transition="color 0.2s ease"
                    >
                      {link.label}
                    </ChakraLink>
                  );
                })}
              </VStack>
            </Box>

            <Box>
              <FooterHeading>Contact</FooterHeading>
              <VStack align="flex-start" spacing={5}>
                {LOCATIONS.map(function (loc) {
                  return (
                    <VStack key={loc.city} align="flex-start" spacing={1}>
                      <Text fontSize="sm" fontWeight={600} color="whiteAlpha.700">
                        {loc.city}
                      </Text>
                      <HStack
                        as="a"
                        href={'tel:' + loc.tel}
                        spacing={1.5}
                        color="whiteAlpha.600"
                        _hover={{ color: 'white' }}
                        transition="color 0.2s ease"
                      >
                        <Icon as={HiOutlinePhone} boxSize={3.5} />
                        <Text fontSize="sm" fontWeight={500}>{loc.phone}</Text>
                      </HStack>
                      <Text fontSize="xs" color="whiteAlpha.300">Fax: {loc.fax}</Text>
                    </VStack>
                  );
                })}
              </VStack>
            </Box>
          </SimpleGrid>
        </Flex>

        <Box h="1px" bg="whiteAlpha.100" mb={8} />

        <Flex
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          flexDir={{ base: 'column', md: 'row' }}
          gap={4}
        >
          <Text fontSize="xs" color="whiteAlpha.300">
            &copy; {new Date().getFullYear()} AnswersMD&trade; &middot; All rights reserved
          </Text>
          <HStack spacing={4}>
            <ChakraLink as={Link} to="/privacy/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }}>
              Privacy
            </ChakraLink>
            <Text fontSize="xs" color="whiteAlpha.200">&middot;</Text>
            <ChakraLink as={Link} to="/terms/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }}>
              Terms of Service
            </ChakraLink>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
