// src/pages/Home/components/PromoBanner.jsx
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import usePageContent from '../../../admin/lib/usePageContent.jsx';

var defaults = { text: 'Now accepting new members in Tampa, St. Petersburg and Boca Raton.' };

function PromoBanner() {
  var c = usePageContent('home', 'promo', defaults);

  return (
    <Box bg="brand.champagne" py={{ base: 2.5, md: 3 }}>
      <Flex maxW="98%" mx="auto" px={{ base: 4, md: 4 }} justify="center" align="center" gap={{ base: 2, md: 3 }}>
        <Box w="6px" h="6px" borderRadius="full" bg="white" flexShrink={0} display={{ base: 'none', md: 'block' }} />
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="white" fontWeight={500} textAlign="center" display={{ base: 'none', md: 'block' }}>{c.text}</Text>
        <Text fontSize="xs" color="white" fontWeight={500} textAlign="center" display={{ base: 'block', md: 'none' }}>Now accepting members</Text>
        <ChakraLink as={Link} to="/signup/" display="flex" alignItems="center" gap={1} fontSize={{ base: 'xs', md: 'sm' }} fontWeight={700} color="white" _hover={{ opacity: 0.85 }} transition="opacity 0.2s ease" flexShrink={0} ml={1}>
          Enroll
          <Icon as={HiArrowRight} boxSize={{ base: 3, md: 4 }} />
        </ChakraLink>
      </Flex>
    </Box>
  );
}

export default PromoBanner;
