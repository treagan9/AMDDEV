// src/pages/Pricing/components/Plans.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Button
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
      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Membership tiers</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>Choose your membership</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
              <Box bg="white" borderRadius="card" py={{ base: 10, md: 14 }} px={{ base: 8, md: 10 }} h="100%">
                <Box w="32px" h="3px" bg="brand.champagne" mb={6} />
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Standard membership</Text>
                <Flex align="baseline" gap={3} mb={2}>
                  <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1}>$4,500</Text>
                  <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#D5D0C8" lineHeight={1}>$9,500</Text>
                </Flex>
                <Text fontSize="md" color="brand.bodyLight" mb={8}>per year, based on age</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>Everything you need from your primary care physician. 24/7 access, same-day appointments, comprehensive annual physicals and a doctor who knows you by name.</Text>
                <Button as={Link} to="/contact/" variant="primary" size="lg" w="100%">Get your quote</Button>
              </Box>
            </MotionBox>
            <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
              <Box bg="white" borderRadius="card" py={{ base: 10, md: 14 }} px={{ base: 8, md: 10 }} h="100%">
                <Box w="32px" h="3px" bg="brand.champagne" mb={6} />
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Junior membership</Text>
                <Flex align="baseline" gap={2} mb={2}>
                  <Text fontSize="md" color="brand.bodyLight">from</Text>
                  <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1}>$2,500</Text>
                </Flex>
                <Text fontSize="md" color="brand.bodyLight" mb={8}>per year, ages 12 to 35</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>The same exceptional care and direct access for younger members. Perfect for college students, young professionals and families with teens.</Text>
                <Button as={Link} to="/contact/" variant="secondary" size="lg" w="100%">Learn more</Button>
              </Box>
            </MotionBox>
          </SimpleGrid>

          <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }} mt={8} textAlign="center">
            <Text fontSize="md" color="brand.bodyLight">Exact pricing varies by age and location. We'll provide a personalized quote during your consultation.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={famRef}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={famInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Family care</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>Your whole family, one practice</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">When your family joins together, everyone benefits.</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
            {[
              { title: 'Couples', tag: 'Discounted rates', description: 'Spouses and partners receive reduced rates when enrolled together. Same level of care, same direct physician access.' },
              { title: 'Junior memberships', tag: 'Family pricing', description: 'Care for ages 12 to 35 with multi-member discounts. Coverage that grows with your family.' },
              { title: 'Extended family', tag: 'Custom packages', description: "Parents, grandparents, adult children. We'll build a plan that fits your entire family." }
            ].map(function (item, i) {
              return (
                <MotionBox key={item.title} initial={{ opacity: 0, y: 16 }} animate={famInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} bg="brand.ivory" borderRadius="card" py={{ base: 8, md: 10 }} px={{ base: 7, md: 8 }}>
                  <Box w="24px" h="3px" bg="brand.champagne" mb={5} />
                  <Text fontSize="xs" fontWeight={600} letterSpacing="1.5px" textTransform="uppercase" color="brand.champagne" mb={3}>{item.tag}</Text>
                  <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={4}>{item.title}</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.85}>{item.description}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

export default Plans;
