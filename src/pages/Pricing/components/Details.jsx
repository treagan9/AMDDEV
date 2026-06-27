// src/pages/Pricing/components/Details.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Collapse
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiPlus, HiMinus, HiCheck } from 'react-icons/hi';

var MotionBox = motion(Box);

var INCLUDED = [
  { title: '24/7 direct physician access', detail: "Your doctor's cell phone number for calls, texts and video" },
  { title: 'Same-day appointments', detail: "When you need to be seen, you're seen that day" },
  { title: 'Extended visits', detail: '30 to 60 minute appointments as standard' },
  { title: 'Comprehensive annual physical', detail: 'Thorough annual exam with routine lab panels included' },
  { title: 'House calls', detail: 'At home, at the office or wherever you need us' },
  { title: 'Care coordination', detail: 'We manage referrals, specialists, labs and imaging' },
  { title: 'Preventive health planning', detail: 'Personalized roadmap of screenings and wellness goals' },
  { title: 'Travel medicine', detail: "Pre-travel consultations and 24/7 access while you're away" }
];

var PRICING_FAQS = [
  { q: 'Why does pricing vary?', a: "Healthcare needs typically increase with age and operational costs differ by location. During your consultation, we'll provide a personalized quote based on your specific situation." },
  { q: 'Are there any additional fees?', a: 'Your membership covers all primary care with no copays or per-visit fees. Additional costs only apply to services outside primary care such as specialist visits, advanced labs and imaging which are typically covered by your health insurance.' },
  { q: 'Can I use my HSA or FSA?', a: 'Membership fees may be eligible for HSA or FSA payment. We provide documentation to support reimbursement. Consult your plan administrator or tax advisor for specifics.' },
  { q: 'What if I need to cancel?', a: 'You may cancel by providing 30 days written notice. The first 90 days are non-refundable as this period includes comprehensive onboarding and the investment in getting to know your complete health history.' },
  { q: 'Do you offer corporate rates?', a: 'Yes. We offer executive health programs and corporate wellness packages with volume pricing. Contact us to learn more about programs for your organization.' }
];

function FAQItem({ q, a }) {
  var [open, setOpen] = useState(false);
  return (
    <Box borderBottom="1px solid" borderColor="#E8E2D8" py={{ base: 6, md: 7 }}>
      <Flex justify="space-between" align="flex-start" cursor="pointer" onClick={function () { setOpen(!open); }} role="group" gap={6}>
        <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" lineHeight={1.2} _groupHover={{ color: 'brand.champagne' }} transition="color 0.2s ease">{q}</Text>
        <Flex w="36px" h="36px" borderRadius="full" border="1px solid" borderColor={open ? 'brand.champagne' : '#D5D0C8'} align="center" justify="center" flexShrink={0} mt={0.5} transition="all 0.2s ease" _groupHover={{ borderColor: 'brand.champagne' }}>
          <Box color={open ? 'brand.champagne' : 'brand.bodyLight'}>{open ? <HiMinus size={16} /> : <HiPlus size={16} />}</Box>
        </Flex>
      </Flex>
      <Collapse in={open}>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.85} pt={5} pb={2}>{a}</Text>
      </Collapse>
    </Box>
  );
}

function Details() {
  var [incRef, incInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var [payRef, payInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box>
      <Box py={{ base: 'sectionMobile', md: '120px' }} bg="brand.mist" ref={incRef}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={incInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Your membership</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>What's included</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">Every membership includes comprehensive primary care with no copays or per-visit fees.</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            {INCLUDED.map(function (item, i) {
              return (
                <MotionBox key={item.title} initial={{ opacity: 0, y: 12 }} animate={incInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }} bg="white" borderRadius="card" py={7} px={6}>
                  <HStack spacing={3} align="flex-start" mb={3}>
                    <Box color="brand.champagne" mt={0.5} flexShrink={0}><HiCheck size={16} /></Box>
                    <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate" lineHeight={1.3}>{item.title}</Text>
                  </HStack>
                  <Text fontSize="md" color="brand.body" lineHeight={1.8} pl={7}>{item.detail}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={payRef}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={payInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Box bg="brand.ivory" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }} textAlign="center">
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Flexible options</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>How payment works</Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} maxW="520px" mx="auto" mb={10}>Membership is billed annually at the start of your membership year. Your membership fee covers all primary care services. The only additional costs would be for services outside of primary care which are covered by your health insurance.</Text>
              <Flex gap={{ base: 6, md: 12 }} justify="center" flexWrap="wrap">
                {['Credit cards', 'HSA and FSA eligible', 'Secure payment'].map(function (method, i) {
                  return (
                    <MotionBox key={method} initial={{ opacity: 0, y: 10 }} animate={payInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}>
                      <VStack spacing={3}>
                        <Flex w="48px" h="48px" borderRadius="full" bg="white" border="1px solid" borderColor="#E8E2D8" align="center" justify="center">
                          <Box color="brand.champagne"><HiCheck size={18} /></Box>
                        </Flex>
                        <Text fontSize="md" fontWeight={500} color="brand.slate">{method}</Text>
                      </VStack>
                    </MotionBox>
                  );
                })}
              </Flex>
            </Box>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={faqRef}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Questions</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>Pricing questions</Text>
          </MotionBox>
          <Box borderTop="1px solid" borderColor="#E8E2D8">
            {PRICING_FAQS.map(function (faq) {
              return <FAQItem key={faq.q} q={faq.q} a={faq.a} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Details;
