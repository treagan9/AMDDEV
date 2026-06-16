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
  Divider
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
  { city: 'St. Pete', phone: '813-727-3233', tel: '8137273233', fax: '833-941-5028' },
  { city: 'Boca Raton', phone: '561-933-3333', tel: '5619333333', fax: '844-670-8963' }
];

function Footer() {
  return (
    <Box as="footer" bg="brand.evergreen" color="white">
      <Box maxW="98%" mx="auto" pt={20} pb={10} px={{ base: 6, md: 4 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12} mb={16}>
          <VStack align="flex-start" spacing={6}>
            <Image
              src="/logo-off-white.png"
              alt="AnswersMD"
              h="26px"
              objectFit="contain"
            />
            <Text fontSize="sm" color="whiteAlpha.500" lineHeight={1.8}>
              Concierge medicine, simplified. By limiting our patient panel, we give you what
              traditional medicine can't: direct access to your doctor via call, text or video,
              same-day appointments and visits that last as long as you need.
            </Text>
          </VStack>

          <VStack align="flex-start" spacing={4}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={1}>
              Quick links
            </Text>
            {QUICK_LINKS.map(function (link) {
              return (
                <ChakraLink key={link.path} as={Link} to={link.path} fontSize="sm" color="whiteAlpha.500" _hover={{ color: 'white' }} transition="color 0.2s ease">
                  {link.label}
                </ChakraLink>
              );
            })}
          </VStack>

          <VStack align="flex-start" spacing={4}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={1}>
              Company
            </Text>
            {COMPANY_LINKS.map(function (link) {
              return (
                <ChakraLink key={link.path} as={Link} to={link.path} fontSize="sm" color="whiteAlpha.500" _hover={{ color: 'white' }} transition="color 0.2s ease">
                  {link.label}
                </ChakraLink>
              );
            })}
          </VStack>

          <VStack align="flex-start" spacing={4}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={1}>
              Contact
            </Text>
            {LOCATIONS.map(function (loc) {
              return (
                <VStack key={loc.city} align="flex-start" spacing={1}>
                  <Text fontSize="xs" fontWeight={600} color="whiteAlpha.300" textTransform="uppercase" letterSpacing="1px">
                    {loc.city}
                  </Text>
                  <ChakraLink href={'tel:' + loc.tel} fontSize="sm" color="whiteAlpha.500" _hover={{ color: 'brand.champagne' }}>
                    {loc.phone}
                  </ChakraLink>
                </VStack>
              );
            })}
            <ChakraLink href="mailto:info@answersmd.com" fontSize="sm" color="whiteAlpha.500" _hover={{ color: 'brand.champagne' }} mt={2}>
              info@answersmd.com
            </ChakraLink>
          </VStack>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center" pt={8} flexDir={{ base: 'column', md: 'row' }} gap={4}>
          <Text fontSize="xs" color="whiteAlpha.300">
            &copy; {new Date().getFullYear()} AnswersMD. All rights reserved.
          </Text>
          <HStack spacing={6}>
            <ChakraLink as={Link} to="/privacy/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }}>
              Privacy
            </ChakraLink>
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
