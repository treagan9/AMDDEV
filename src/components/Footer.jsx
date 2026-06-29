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
import FooterSignup from './FooterSignup.jsx';

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

function PulseIcon({ size }) {
  return (
    <svg width={size || 14} height={size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function AIIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  );
}

function Footer() {
  return (
    <>
      <FooterSignup />
      <Box as="footer">
        <Box bg="white" display={{ base: 'none', lg: 'block' }} pt={6} pb={6}>
          <Box maxW="98%" mx="auto" px={4}>
            <Box bg="#2A2A2A" borderRadius="28px" px={16} pt={20} pb={12}>
              <Flex gap={20} mb={16}>
                <Box maxW="320px" flexShrink={0}>
                  <Image src="/answersmd-footer-white.webp" alt="AnswersMD" h="auto" w="280px" objectFit="contain" mb={6} />
                  <Text fontSize="md" color="whiteAlpha.700" lineHeight={1.85} mb={8}>
                    Concierge medicine, simplified. Direct access to your doctor via call, text or video. Same-day appointments and visits that last as long as you need.
                  </Text>
                  <VStack align="flex-start" spacing={3} mb={8}>
                    <ChakraLink href="mailto:info@answersmd.com" fontSize="md" fontWeight={500} color="whiteAlpha.800" _hover={{ color: 'white' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
                    <ChakraLink href="tel:8137273233" fontSize="md" fontWeight={500} color="whiteAlpha.800" _hover={{ color: 'white' }} transition="color 0.2s ease">813-727-3233</ChakraLink>
                  </VStack>
                  <HStack spacing={4}>
                    <ChakraLink href="https://www.facebook.com/61589476375367" target="_blank" rel="noopener noreferrer" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease"><FacebookIcon /></ChakraLink>
                    <ChakraLink href="https://www.instagram.com/answersmd/" target="_blank" rel="noopener noreferrer" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease"><InstagramIcon /></ChakraLink>
                    <ChakraLink href="#" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease"><LinkedInIcon /></ChakraLink>
                  </HStack>
                </Box>
                <SimpleGrid columns={3} spacing={16} flex={1}>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={6}>Navigation</Text>
                    <VStack align="flex-start" spacing={4}>
                      {QUICK_LINKS.map(function (link) {
                        return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.800" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
                      })}
                    </VStack>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={6}>Company</Text>
                    <VStack align="flex-start" spacing={4}>
                      {COMPANY_LINKS.map(function (link) {
                        return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.800" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
                      })}
                    </VStack>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={6}>Locations</Text>
                    <VStack align="flex-start" spacing={5}>
                      {LOCATIONS.map(function (loc) {
                        return (
                          <Box key={loc.city}>
                            <Text fontSize="md" fontWeight={600} color="whiteAlpha.800" mb={1}>{loc.city}</Text>
                            <ChakraLink href={'tel:' + loc.tel} fontSize="md" color="whiteAlpha.700" _hover={{ color: 'white' }} transition="color 0.2s ease" display="block">{loc.phone}</ChakraLink>
                            <Text fontSize="xs" color="whiteAlpha.400" mt={1}>Fax {loc.fax}</Text>
                          </Box>
                        );
                      })}
                    </VStack>
                  </Box>
                </SimpleGrid>
              </Flex>
              <Box h="1px" bg="whiteAlpha.150" mb={8} />
              <Flex justify="space-between" align="center">
                <Text fontSize="xs" color="whiteAlpha.400">&copy; {new Date().getFullYear()} AnswersMD&trade; All rights reserved.</Text>
                <HStack spacing={6}>
                  <ChakraLink as={Link} to="/privacy/" fontSize="xs" color="whiteAlpha.400" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">Privacy</ChakraLink>
                  <ChakraLink as={Link} to="/terms/" fontSize="xs" color="whiteAlpha.400" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">Terms of Service</ChakraLink>
                  <ChakraLink href="/sitemap.xml" fontSize="xs" color="whiteAlpha.400" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">Sitemap</ChakraLink>
                  <ChakraLink href="/llms.txt" display="flex" alignItems="center" gap={1.5} fontSize="xs" color="whiteAlpha.500" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">
                    <AIIcon />
                    llms.txt
                  </ChakraLink>
                  <ChakraLink as={Link} to="/answersmd-admin/" display="flex" alignItems="center" gap={1.5} fontSize="xs" color="whiteAlpha.700" fontWeight={500} _hover={{ color: 'white' }} transition="color 0.2s ease">
                    <PulseIcon size={13} />
                    Pulse
                  </ChakraLink>
                </HStack>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box bg="#2A2A2A" display={{ base: 'block', lg: 'none' }} px={6} pt={14} pb={10}>
          <Box mb={10}>
            <Image src="/answersmd-footer-white.webp" alt="AnswersMD" h="auto" w="240px" objectFit="contain" mb={6} />
            <Text fontSize="md" color="whiteAlpha.700" lineHeight={1.85} mb={8}>
              Concierge medicine, simplified. Direct access to your doctor via call, text or video. Same-day appointments and visits that last as long as you need.
            </Text>
            <VStack align="flex-start" spacing={3} mb={8}>
              <ChakraLink href="mailto:info@answersmd.com" fontSize="md" fontWeight={500} color="whiteAlpha.800" _hover={{ color: 'white' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
            </VStack>
            <HStack spacing={5}>
              <ChakraLink href="https://www.facebook.com/61589476375367" target="_blank" rel="noopener noreferrer" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease"><FacebookIcon /></ChakraLink>
              <ChakraLink href="https://www.instagram.com/answersmd/" target="_blank" rel="noopener noreferrer" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease"><InstagramIcon /></ChakraLink>
              <ChakraLink href="#" color="whiteAlpha.600" _hover={{ color: 'white' }} transition="color 0.2s ease"><LinkedInIcon /></ChakraLink>
            </HStack>
          </Box>
          <SimpleGrid columns={2} spacing={10} mb={10}>
            <Box>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={6}>Navigation</Text>
              <VStack align="flex-start" spacing={4}>
                {QUICK_LINKS.map(function (link) {
                  return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.800" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
                })}
              </VStack>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={6}>Company</Text>
              <VStack align="flex-start" spacing={4}>
                {COMPANY_LINKS.map(function (link) {
                  return <ChakraLink key={link.path} as={Link} to={link.path} fontSize="md" color="whiteAlpha.800" _hover={{ color: 'white' }} transition="color 0.2s ease">{link.label}</ChakraLink>;
                })}
              </VStack>
            </Box>
          </SimpleGrid>
          <Box mb={12}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="whiteAlpha.500" mb={6}>Locations</Text>
            <VStack align="flex-start" spacing={5}>
              {LOCATIONS.map(function (loc) {
                return (
                  <Box key={loc.city}>
                    <Text fontSize="md" fontWeight={600} color="whiteAlpha.800" mb={1}>{loc.city}</Text>
                    <ChakraLink href={'tel:' + loc.tel} fontSize="md" color="whiteAlpha.700" _hover={{ color: 'white' }} transition="color 0.2s ease" display="block">{loc.phone}</ChakraLink>
                    <Text fontSize="xs" color="whiteAlpha.400" mt={1}>Fax {loc.fax}</Text>
                  </Box>
                );
              })}
            </VStack>
          </Box>
          <Box h="1px" bg="whiteAlpha.150" mb={8} />
          <Flex direction="column" gap={4}>
            <Text fontSize="xs" color="whiteAlpha.400">&copy; {new Date().getFullYear()} AnswersMD&trade; All rights reserved.</Text>
            <HStack spacing={5} flexWrap="wrap">
              <ChakraLink as={Link} to="/privacy/" fontSize="xs" color="whiteAlpha.400" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">Privacy</ChakraLink>
              <ChakraLink as={Link} to="/terms/" fontSize="xs" color="whiteAlpha.400" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">Terms</ChakraLink>
              <ChakraLink href="/sitemap.xml" fontSize="xs" color="whiteAlpha.400" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">Sitemap</ChakraLink>
              <ChakraLink href="/llms.txt" display="flex" alignItems="center" gap={1.5} fontSize="xs" color="whiteAlpha.500" _hover={{ color: 'whiteAlpha.700' }} transition="color 0.2s ease">
                <AIIcon />
                llms.txt
              </ChakraLink>
              <ChakraLink as={Link} to="/answersmd-admin/" display="flex" alignItems="center" gap={1.5} fontSize="xs" color="whiteAlpha.700" fontWeight={500} _hover={{ color: 'white' }} transition="color 0.2s ease">
                <PulseIcon size={13} />
                Pulse
              </ChakraLink>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
