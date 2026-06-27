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
  { label: 'Insurance and Billing', path: '/insurance/' },
  { label: 'Executive Health', path: '/executive/' },
  { label: 'Pricing', path: '/pricing/' },
  { label: 'Patient Stories', path: '/stories/' }
];

var LOCATIONS = [
  { city: 'Tampa', phone: '813-727-3233', tel: '8137273233', fax: '833-941-5028' },
  { city: 'St. Petersburg', phone: '813-727-3233', tel: '8137273233', fax: '833-941-5028' },
  { city: 'Boca Raton', phone: '561-933-3333', tel: '5619333333', fax: '844-670-8963' }
];

function Footer() {
  return (
    <Box as="footer">
      <Box bg="white" display={{ base: 'none', lg: 'block' }} pt={6} pb={6}>
        <Box maxW="98%" mx="auto" px={4}>
          <Box bg="#2A2A2A" borderRadius="28px" px={16} pt={20} pb={12}>
            <Flex gap={20} mb={16}>
              <Box maxW="320px" flexShrink={0}>
                <Image src="/logo-off-white.png" alt="AnswersMD" h="42px" objectFit="contain" mb={6} />
                <Text fontSize="md" color="whiteAlpha.500" lineHeight={1.85} mb={8}>
                  Concierge medicine, simplified. Direct access to your doctor via call, text or video. Same-day appointments and visits that last as long as you need.
                </Text>
                <VStack align="flex-start" spacing={3}>
                  <ChakraLink href="mailto:info@answersmd.com" fontSize="md" fontWeight={500} color="whiteAlpha.700" _hover={{ color: 'white' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
                  <ChakraLink href="tel:8137273233" fontSize="md" fontWeight={500} color="whiteAlpha.700" _hover={{ color: 'white' }} transition="color 0.2s ease">813-727-3233</ChakraLink>
                </VStack>
              </Box>
              <SimpleGrid columns={3} spacing={16} flex={1}>
                <Box>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.400" mb={6}>Navigation</Text>
                  <VStack align="flex-start" spacing={4}>
                    {QUICK_LINKS.map(function (link) {
                      return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
                    })}
                  </VStack>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.400" mb={6}>Company</Text>
                  <VStack align="flex-start" spacing={4}>
                    {COMPANY_LINKS.map(function (link) {
                      return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
                    })}
                  </VStack>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.400" mb={6}>Locations</Text>
                  <VStack align="flex-start" spacing={5}>
                    {LOCATIONS.map(function (loc) {
                      return (
                        <Box key={loc.city}>
                          <Text fontSize="md" fontWeight={600} color="whiteAlpha.700" mb={1}>{loc.city}</Text>
                          <ChakraLink href={'tel:' + loc.tel} fontSize="md" color="whiteAlpha.500" _hover={{ color: 'white' }} transition="color 0.2s ease" display="block">{loc.phone}</ChakraLink>
                          <Text fontSize="xs" color="whiteAlpha.300" mt={1}>Fax {loc.fax}</Text>
                        </Box>
                      );
                    })}
                  </VStack>
                </Box>
              </SimpleGrid>
            </Flex>
            <Box h="1px" bg="whiteAlpha.100" mb={8} />
            <Flex justify="space-between" align="center">
              <Text fontSize="xs" color="whiteAlpha.300">&copy; {new Date().getFullYear()} AnswersMD&trade; All rights reserved.</Text>
              <HStack spacing={6}>
                <ChakraLink as={Link} to="/privacy/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }} transition="color 0.2s ease">Privacy</ChakraLink>
                <ChakraLink as={Link} to="/terms/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }} transition="color 0.2s ease">Terms of Service</ChakraLink>
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Box>

      <Box bg="#2A2A2A" display={{ base: 'block', lg: 'none' }} px={6} pt={14} pb={10}>
        <Box mb={10}>
          <Image src="/logo-off-white.png" alt="AnswersMD" h="36px" objectFit="contain" mb={6} />
          <Text fontSize="md" color="whiteAlpha.500" lineHeight={1.85} mb={8}>
            Concierge medicine, simplified. Direct access to your doctor via call, text or video. Same-day appointments and visits that last as long as you need.
          </Text>
          <VStack align="flex-start" spacing={3}>
            <ChakraLink href="mailto:info@answersmd.com" fontSize="md" fontWeight={500} color="whiteAlpha.700" _hover={{ color: 'white' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
          </VStack>
        </Box>
        <SimpleGrid columns={2} spacing={10} mb={10}>
          <Box>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.400" mb={6}>Navigation</Text>
            <VStack align="flex-start" spacing={4}>
              {QUICK_LINKS.map(function (link) {
                return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
              })}
            </VStack>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.400" mb={6}>Company</Text>
            <VStack align="flex-start" spacing={4}>
              {COMPANY_LINKS.map(function (link) {
                return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
              })}
            </VStack>
          </Box>
        </SimpleGrid>
        <Box mb={12}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.400" mb={6}>Locations</Text>
          <VStack align="flex-start" spacing={5}>
            {LOCATIONS.map(function (loc) {
              return (
                <Box key={loc.city}>
                  <Text fontSize="md" fontWeight={600} color="whiteAlpha.700" mb={1}>{loc.city}</Text>
                  <ChakraLink href={'tel:' + loc.tel} fontSize="md" color="whiteAlpha.500" _hover={{ color: 'white' }} transition="color 0.2s ease" display="block">{loc.phone}</ChakraLink>
                  <Text fontSize="xs" color="whiteAlpha.300" mt={1}>Fax {loc.fax}</Text>
                </Box>
              );
            })}
          </VStack>
        </Box>
        <Box h="1px" bg="whiteAlpha.100" mb={8} />
        <Flex direction="column" gap={4}>
          <Text fontSize="xs" color="whiteAlpha.300">&copy; {new Date().getFullYear()} AnswersMD&trade; All rights reserved.</Text>
          <HStack spacing={6}>
            <ChakraLink as={Link} to="/privacy/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }} transition="color 0.2s ease">Privacy</ChakraLink>
            <ChakraLink as={Link} to="/terms/" fontSize="xs" color="whiteAlpha.300" _hover={{ color: 'whiteAlpha.600' }} transition="color 0.2s ease">Terms of Service</ChakraLink>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
