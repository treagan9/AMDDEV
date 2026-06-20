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
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiPlus, HiMinus, HiCheck } from 'react-icons/hi';

var MotionBox = motion(Box);

var INCLUDED = [
  { title: '24/7 direct physician access', detail: 'Your doctor\'s cell phone number for calls, texts and video' },
  { title: 'Same-day appointments', detail: 'When you need to be seen, you\'re seen that day' },
  { title: 'Extended visits', detail: '30 to 60 minute appointments as standard' },
  { title: 'Comprehensive annual physical', detail: 'Thorough annual exam with routine lab panels included' },
  { title: 'House calls', detail: 'At home, at the office or wherever you need us' },
  { title: 'Care coordination', detail: 'We manage referrals, specialists, labs and imaging' },
  { title: 'Preventive health planning', detail: 'Personalized roadmap of screenings and wellness goals' },
  { title: 'Travel medicine', detail: 'Pre-travel consultations and 24/7 access while you\'re away' }
];

var PRICING_FAQS = [
  { q: 'Why does pricing vary?', a: 'Healthcare needs typically increase with age and operational costs differ by location. During your consultation, we\'ll provide a personalized quote based on your specific situation.' },
  { q: 'Are there any additional fees?', a: 'Your membership covers all primary care with no copays or per-visit fees. Additional costs only apply to services outside primary care such as specialist visits, advanced labs and imaging which are typically covered by your health insurance.' },
  { q: 'Can I use my HSA or FSA?', a: 'Membership fees may be eligible for HSA or FSA payment. We provide documentation to support reimbursement. Consult your plan administrator or tax advisor for specifics.' },
  { q: 'What if I need to cancel?', a: 'You may cancel by providing 30 days written notice. The first 90 days are non-refundable as this period includes comprehensive onboarding and the investment in getting to know your complete health history.' },
  { q: 'Do you offer corporate rates?', a: 'Yes. We offer executive health programs and corporate wellness packages with volume pricing. Contact us to learn more about programs for your organization.' }
];

function FAQItem({ q, a }) {
  var [open, setOpen] = useState(false);
  return (
    <Box borderBottom="1px solid" borderColor="brand.borderLight" py={{ base: 5, md: 6 }}>
      <Flex justify="space-between" align="flex-start" cursor="pointer" onClick={function () { setOpen(!open); }} role="group" gap={6}>
        <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" lineHeight={1.2} _groupHover={{ color: 'brand.champagne' }} transition="color 0.2s ease">{q}</Text>
        <Flex w="36px" h="36px" borderRadius="full" border="1px solid" borderColor={open ? 'brand.champagne' : 'brand.borderLight'} align="center" justify="center" flexShrink={0} mt={0.5} transition="all 0.2s ease" _groupHover={{ borderColor: 'brand.champagne' }}>
          <Box color={open ? 'brand.champagne' : 'brand.bodyLight'}>{open ? <HiMinus size={16} /> : <HiPlus size={16} />}</Box>
        </Flex>
      </Flex>
      <Collapse in={open}>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.85} pt={5} pb={2} maxW="640px">{a}</Text>
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
      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={incRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={incInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 20 }}>
              <Box maxW={{ base: '100%', lg: '340px' }} flexShrink={0} position={{ base: 'relative', lg: 'sticky' }} top={{ lg: '140px' }} alignSelf="flex-start">
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Your membership</Text>
                <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>What's included</Text>
                <Text fontSize="md" color="brand.body" lineHeight={1.8}>Every membership includes comprehensive primary care with no copays or per-visit fees.</Text>
              </Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} flex={1}>
                {INCLUDED.map(function (item, i) {
                  var isTop = i < 2;
                  var isLeft = i % 2 === 0;
                  return (
                    <MotionBox
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={incInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                      py={6}
                      px={{ base: 0, md: 6 }}
                      borderLeft={{ base: 'none', md: isLeft ? 'none' : '1px solid' }}
                      borderTop={isTop ? 'none' : '1px solid'}
                      borderColor="brand.borderLight"
                    >
                      <HStack spacing={3} align="flex-start" mb={2}>
                        <Box color="brand.champagne" mt={1} flexShrink={0}><HiCheck size={18} /></Box>
                        <Text fontFamily="heading" fontSize="md" fontWeight={700} color="brand.slate">{item.title}</Text>
                      </HStack>
                      <Text fontSize="md" color="brand.body" lineHeight={1.8} pl={7}>{item.detail}</Text>
                    </MotionBox>
                  );
                })}
              </SimpleGrid>
            </Flex>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={payRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={payInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} maxW="800px" mx="auto" textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Flexible options</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={8}>How payment works</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={5}>Membership is billed annually at the start of your membership year. We accept all major credit cards and can provide documentation for HSA or FSA reimbursement.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={12}>Your membership fee covers all primary care services. The only additional costs would be for services outside of primary care which are covered by your health insurance.</Text>
            <Flex gap={{ base: 8, md: 16 }} justify="center" flexWrap="wrap">
              {['Credit cards', 'HSA and FSA eligible', 'Secure payment'].map(function (method, i) {
                return (
                  <MotionBox key={method} initial={{ opacity: 0, y: 10 }} animate={payInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}>
                    <VStack spacing={2}>
                      <Box w="48px" h="48px" borderRadius="full" bg="brand.champagneSoft" display="flex" alignItems="center" justifyContent="center">
                        <Box color="brand.champagne"><HiCheck size={20} /></Box>
                      </Box>
                      <Text fontSize="md" fontWeight={500} color="brand.slate">{method}</Text>
                    </VStack>
                  </MotionBox>
                );
              })}
            </Flex>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={faqRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 20 }}>
              <Box w={{ base: '100%', lg: '300px' }} flexShrink={0} position={{ base: 'relative', lg: 'sticky' }} top={{ lg: '140px' }} alignSelf="flex-start">
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Questions</Text>
                <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>Pricing questions</Text>
              </Box>
              <Box flex={1} borderTop="1px solid" borderColor="brand.borderLight">
                {PRICING_FAQS.map(function (faq) {
                  return <FAQItem key={faq.q} q={faq.q} a={faq.a} />;
                })}
              </Box>
            </Flex>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

export default Details;
