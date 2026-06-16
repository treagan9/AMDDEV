// src/pages/Home/components/CTA.jsx
import {
  Box,
  VStack,
  Text,
  Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeSection, { fadeUp } from '../../../components/shared/FadeSection';

var MotionBox = motion(Box);

function CTA() {
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <FadeSection>
          <MotionBox variants={fadeUp}>
            <VStack spacing={8} textAlign="center" maxW="600px" mx="auto">
              <Box w="40px" h="1px" bg="brand.champagne" />
              <Text
                fontFamily="heading"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                color="brand.slate"
                lineHeight={1.1}
              >
                Ready to Experience Healthcare Differently?
              </Text>
              <Text fontSize="lg" color="brand.warmGray" lineHeight={1.7}>
                Join AnswersMD today and discover what personalized medicine
                can do for you and your family.
              </Text>
              <Button as={Link} to="/signup/" variant="primary" size="lg">
                Schedule Your Consultation
              </Button>
            </VStack>
          </MotionBox>
        </FadeSection>
      </Box>
    </Box>
  );
}

export default CTA;
