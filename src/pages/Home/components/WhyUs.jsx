// src/pages/Home/components/WhyUs.jsx
import {
  Box,
  SimpleGrid,
  HStack,
  VStack,
  Text,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineChat,
  HiOutlineUserGroup,
  HiOutlineClock
} from 'react-icons/hi';
import FadeSection, { fadeUp } from '../../../components/shared/FadeSection';
import SectionHeader from '../../../components/shared/SectionHeader';

var MotionBox = motion(Box);

var REASONS = [
  {
    icon: HiOutlineCalendar,
    title: 'Same-Day Appointments',
    description: 'No more waiting weeks. We guarantee same-day or next-day availability for every member.'
  },
  {
    icon: HiOutlineChat,
    title: 'Direct Communication',
    description: "Your doctor's personal number. Text, call or video chat anytime, day or night."
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Limited Enrollment',
    description: 'We cap our patient panel to ensure quality time and attention with every member.'
  },
  {
    icon: HiOutlineClock,
    title: 'Extended Visits',
    description: '30-60 minute appointments are standard. Your health deserves more than 7 minutes.'
  }
];

function WhyUs() {
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.evergreen">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <FadeSection>
          <Box mb={16}>
            <SectionHeader
              eyebrow="The Difference"
              heading="Why Our Members Stay"
              light
            />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {REASONS.map(function (item) {
              return (
                <MotionBox key={item.title} variants={fadeUp}>
                  <HStack
                    align="flex-start"
                    spacing={6}
                    p={{ base: 6, md: 8 }}
                    bg="whiteAlpha.50"
                    borderRadius="2px"
                    transition="all 0.3s ease"
                    _hover={{ bg: 'whiteAlpha.100' }}
                  >
                    <Icon as={item.icon} boxSize={7} color="brand.champagne" mt={1} flexShrink={0} />
                    <VStack align="flex-start" spacing={2}>
                      <Text fontFamily="heading" fontSize="xl" color="white">
                        {item.title}
                      </Text>
                      <Text fontSize="sm" color="whiteAlpha.600" lineHeight={1.8}>
                        {item.description}
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </FadeSection>
      </Box>
    </Box>
  );
}

export default WhyUs;
