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

function PromoBanner() {
  return (
    <Box bg="brand.evergreen" py={3}>
      <Flex
        maxW="98%"
        mx="auto"
        px={{ base: 4, md: 4 }}
        justify="center"
        align="center"
        gap={3}
      >
        <Box w="6px" h="6px" borderRadius="full" bg="#7EBF7A" flexShrink={0} />
        <Text fontSize="sm" color="whiteAlpha.800" fontWeight={500} textAlign="center">
          Limited availability. Enroll today.
        </Text>
        <ChakraLink
          as={Link}
          to="/signup/"
          display="flex"
          alignItems="center"
          gap={1}
          fontSize="sm"
          fontWeight={600}
          color="whiteAlpha.900"
          _hover={{ color: 'white' }}
          transition="color 0.2s ease"
          flexShrink={0}
        >
          Get started
          <Icon as={HiArrowRight} boxSize={4} />
        </ChakraLink>
      </Flex>
    </Box>
  );
}

export default PromoBanner;
