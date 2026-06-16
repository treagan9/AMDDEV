// src/components/shared/SectionHeader.jsx
import { VStack, Text, Box, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { fadeUp } from './FadeSection';

var MotionBox = motion(Box);

function SectionHeader({ eyebrow, heading, description, align = 'center', light = false, line = false }) {
  return (
    <MotionBox variants={fadeUp}>
      <VStack
        spacing={4}
        textAlign={align}
        maxW={align === 'center' ? '680px' : 'none'}
        mx={align === 'center' ? 'auto' : 0}
        align={align === 'center' ? 'center' : 'flex-start'}
      >
        {line && (
          <Box w="40px" h="1px" bg={light ? 'brand.champagneLight' : 'brand.champagne'} mb={2} />
        )}
        {eyebrow && (
          <HStack spacing={3}>
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="3px"
              textTransform="uppercase"
              color={light ? 'brand.champagneLight' : 'brand.champagne'}
            >
              {eyebrow}
            </Text>
          </HStack>
        )}
        {heading && (
          <Text
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            color={light ? 'white' : 'brand.slate'}
            lineHeight={1.1}
          >
            {heading}
          </Text>
        )}
        {description && (
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={light ? 'whiteAlpha.700' : 'brand.warmGray'}
            lineHeight={1.7}
            maxW="560px"
            mt={1}
          >
            {description}
          </Text>
        )}
      </VStack>
    </MotionBox>
  );
}

export default SectionHeader;
