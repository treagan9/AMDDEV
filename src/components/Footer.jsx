// src/components/Footer.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
  { city: 'St. Petersburg', phone: '813-727-3233', tel: '8137273233', fax: '833-941-5028' },
  { city: 'Boca Raton', phone: '561-933-3333', tel: '5619333333', fax: '844-670-8963' }
];

function FooterHeading({ children }) {
  return (
    <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.400" mb={6}>
      {children}
    </Text>
  );
}

function Footer() {
  return (
    <Box as="footer" bg="#1C2926">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }} pt={{ base: 16, md: 24 }} pb={10}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 14, lg: 24 }} mb={{ base: 14, lg: 20 }}>
          <Box maxW={{ base: '100%', lg: '340px' }} flexShrink={0}>
            <Image src="/logo-off-white.png" alt="AnswersMD" h={{ base: '36px', md: '44px' }} objectFit="contain" mb={7} />
            <Text fontSize="md" color="whiteAlpha.400" lineHeight={1.85} mb={6}>
              Concierge medicine, simplified. By limiting our patient panel, we give you direct access to your doctor via call, text or video. Same-day appointments and visits that last as long as you need.
            </Text>
            <ChakraLink href="mailto:info@answersmd.com" fontSize="md" color="whiteAlpha.500" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
              info@answersmd.com
            </ChakraLink>
          </Box>

          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 10, md: 16 }} flex={1}>
            <Box>
              <FooterHeading>Quick links</FooterHeading>
              <VStack align="flex-start" spacing={4}>
                {QUICK_LINKS.map(function (link) {
                  return (
                    <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease">
                      {link.label}
                    </ChakraLink>
                  );
                })}
              </VStack>
            </Box>

            <Box>
              <FooterHeading>Company</FooterHeading>
              <VStack align="flex-start" spacing={4}>
                {COMPANY_LINKS.map(function (link) {
                  return (
                    <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease">
                      {link.label}
                    </ChakraLink>
                  );
                })}
              </VStack>
            </Box>

            <Box>
              <FooterHeading>Locations</FooterHeading>
              <VStack align="flex-start" spacing={6}>
                {LOCATIONS.map(function (loc) {
                  return (
                    <Box key={loc.city}>
                      <Text fontSize="md" fontWeight={600} color="whiteAlpha.700" mb={1}>{loc.city}</Text>
                      <ChakraLink href={'tel:' + loc.tel} fontSize="md" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease" display="block">
                        {loc.phone}
                      </ChakraLink>
                      <Text fontSize="xs" color="whiteAlpha.300" mt={1}>Fax {loc.fax}</Text>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          </SimpleGrid>
        </Flex>

        <Box h="1px" bg="whiteAlpha.100" mb={8} />

        <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={4}>
          <Text fontSize="xs" color="whiteAlpha.300">
            &copy; {new Date().getFullYear()} AnswersMD&trade; All rights reserved.
          </Text>
          <HStack spacing={6}>
            <ChakraLink as={Link} to="/privacy/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }}>Privacy</ChakraLink>
            <ChakraLink as={Link} to="/terms/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }}>Terms of Service</ChakraLink>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
