// src/pages/Pricing/components/Plans.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

function Plans() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var [famRef, famInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box>
      <Box py={{ base: 'sectionMobile', md: '160px' }} bg="brand.evergreen" ref={ref}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={0}>
              <Box flex={1} py={{ base: 10, md: 14 }} px={{ base: 0, md: 10, lg: 14 }} borderRight={{ base: 'none', lg: '1px solid' }} borderBottom={{ base: '1px solid', lg: 'none' }} borderColor="whiteAlpha.150" pb={{ base: 14, lg: 14 }}>
                <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={6}>Membership</Text>
                  <Flex align="baseline" gap={3} mb={2}>
                    <Text fontFamily="heading" fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="white" lineHeight={1}>$4,500</Text>
                    <Text fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="whiteAlpha.400" lineHeight={1}>$9,500</Text>
                  </Flex>
                  <Text fontSize="lg" color="whiteAlpha.500" mb={8}>per year, based on age</Text>
                  <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.8} mb={8} maxW="400px">Everything you need from your primary care physician. 24/7 access, same-day appointments, comprehensive annual physicals and a doctor who knows you by name.</Text>
                  <Button as={Link} to="/contact/" bg="white" color="brand.evergreen" borderRadius="btn" size="lg" fontSize="md" _hover={{ bg: 'brand.ivory', transform: 'translateY(-2px)', shadow: '0 8px 24px rgba(0,0,0,0.2)' }} transition="all 0.3s ease">Get your quote</Button>
                </MotionBox>
              </Box>
              <Flex flex={1} py={{ base: 10, md: 14 }} px={{ base: 0, md: 10, lg: 14 }} pt={{ base: 14, lg: 14 }} direction="column" justify="center">
                <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={6}>Junior membership</Text>
                  <Flex align="baseline" gap={2} mb={2}>
                    <Text fontSize="md" color="whiteAlpha.500">from</Text>
                    <Text fontFamily="heading" fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }} fontWeight={700} color="white" lineHeight={1}>$2,500</Text>
                  </Flex>
                  <Text fontSize="lg" color="whiteAlpha.500" mb={8}>per year, ages 12 to 35</Text>
                  <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.8} maxW="400px">The same exceptional care and direct access for younger members. Perfect for college students, young professionals and families with teens.</Text>
                </MotionBox>
              </Flex>
            </Flex>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={famRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={famInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Family care</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4} maxW="500px">Your whole family, one practice</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="500px">When your family joins together, everyone benefits.</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={0}>
            {[
              { title: 'Couples', tag: 'Discounted rates', description: 'Spouses and partners receive reduced rates when enrolled together. Same level of care, same direct physician access.' },
              { title: 'Junior memberships', tag: 'Family pricing', description: 'Care for ages 12 to 35 with multi-member discounts. Coverage that grows with your family.' },
              { title: 'Extended family', tag: 'Custom packages', description: 'Parents, grandparents, adult children. We\'ll build a plan that fits your entire family.' }
            ].map(function (item, i) {
              return (
                <MotionBox
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={famInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  py={{ base: 8, md: 10 }}
                  px={{ base: 0, md: 8 }}
                  borderLeft={{ base: 'none', md: i > 0 ? '1px solid' : 'none' }}
                  borderTop={{ base: i > 0 ? '1px solid' : 'none', md: 'none' }}
                  borderColor="brand.borderLight"
                >
                  <Box borderTop="3px solid" borderColor="brand.champagne" pt={6}>
                    <Text fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>{item.tag}</Text>
                    <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={4}>{item.title}</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.85}>{item.description}</Text>
                  </Box>
                </MotionBox>
              );
            })}
          </SimpleGrid>

          <MotionBox initial={{ opacity: 0 }} animate={famInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }} mt={12} textAlign="center">
            <Text fontSize="md" color="brand.bodyLight">Exact pricing varies by age and location. We'll provide a personalized quote during your consultation.</Text>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

export default Plans;
