// src/pages/Home/components/Testimonials.jsx
import {
  Box,
  SimpleGrid,
  VStack,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import FadeSection, { fadeUp } from '../../../components/shared/FadeSection';
import SectionHeader from '../../../components/shared/SectionHeader';

var MotionBox = motion(Box);

var TESTIMONIALS = [
  {
    quote: "For the first time in my life, I feel like my doctor actually knows me. The peace of mind that comes with having Dr. Shapiro's cell phone number is priceless.",
    name: 'Michael R.',
    since: '2023'
  },
  {
    quote: "I was skeptical about concierge medicine until I experienced it. Now I can't imagine going back to traditional healthcare. Worth every penny.",
    name: 'Sarah K.',
    since: '2024'
  },
  {
    quote: "When my daughter got sick on a Sunday evening, I texted Dr. Meriwether and had a video call within 10 minutes. That's the kind of care every family deserves.",
    name: 'Jennifer T.',
    since: '2024'
  }
];

function Testimonials() {
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <FadeSection>
          <Box mb={16}>
            <SectionHeader
              eyebrow="Patient Stories"
              heading="What Our Members Say"
            />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {TESTIMONIALS.map(function (t) {
              return (
                <MotionBox key={t.name} variants={fadeUp}>
                  <VStack
                    align="flex-start"
                    p={{ base: 8, md: 10 }}
                    bg="white"
                    border="1px solid"
                    borderColor="brand.borderLight"
                    spacing={6}
                    h="100%"
                    position="relative"
                  >
                    <Text
                      fontFamily="heading"
                      fontSize="4xl"
                      color="brand.champagne"
                      opacity={0.2}
                      lineHeight={1}
                      position="absolute"
                      top={6}
                      left={8}
                    >
                      &ldquo;
                    </Text>
                    <Text
                      fontSize="md"
                      color="brand.warmGray"
                      lineHeight={1.8}
                      fontStyle="italic"
                      pt={6}
                    >
                      {t.quote}
                    </Text>
                    <Box w="24px" h="1px" bg="brand.champagneLine" />
                    <Box>
                      <Text fontSize="sm" fontWeight={600} color="brand.slate">
                        {t.name}
                      </Text>
                      <Text fontSize="xs" color="brand.warmGrayLight">
                        Member since {t.since}
                      </Text>
                    </Box>
                  </VStack>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </FadeSection>
      </Box>
    </Box>
  );
}

export default Testimonials;
