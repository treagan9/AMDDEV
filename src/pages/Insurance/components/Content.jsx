// src/pages/Insurance/components/Content.jsx
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

var MEMBERSHIP_COVERS = [
  '24/7 direct physician access',
  'Unlimited office visits with no copays',
  'Same-day appointments',
  'Comprehensive annual physical',
  'Home and office visits',
  'Care coordination',
  'Basic lab panels with annual physical',
  'Telemedicine consultations'
];

var INSURANCE_COVERS = [
  'Hospital stays and ER visits',
  'Specialist consultations',
  'Surgeries and procedures',
  'Advanced imaging such as MRI and CT',
  'Specialty lab work',
  'Prescription medications',
  'Physical therapy',
  'Catastrophic care'
];

var BILLING_FAQS = [
  { q: 'Can I submit membership fees to insurance?', a: 'Concierge membership fees are generally not covered by health insurance. However, they may be eligible for payment through your Health Savings Account or Flexible Spending Account. Consult your plan administrator or tax advisor for specifics.' },
  { q: 'Do you bill insurance for any services?', a: 'We do not bill insurance for primary care services as those are covered by your membership. However, when we order labs, imaging or refer you to specialists, those providers will bill your insurance directly.' },
  { q: 'What if I don\'t have insurance?', a: 'While we strongly recommend maintaining health insurance for major medical expenses, your membership still provides exceptional primary care. We can help you find cost-effective options for labs, imaging and specialist care when needed.' },
  { q: 'How is membership billed?', a: 'Membership is billed annually at the start of your membership year. We accept all major credit cards and can provide documentation for HSA or FSA reimbursement if applicable.' },
  { q: 'Are there any additional fees?', a: 'Your membership covers all primary care services with no copays or per-visit fees. The only additional costs would be for services outside of primary care such as advanced labs, imaging and specialist visits which are billed through your insurance or paid directly to those providers.' }
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

function Content() {
  var [shortRef, shortInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [coverRef, coverInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [recRef, recInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box>
      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={shortRef}>
        <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={shortInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={{ base: 8, md: 10 }}>The short answer</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={6}>Yes, you should keep your health insurance. Your AnswersMD membership covers your primary care relationship. The time, access and attention of your personal physician. Health insurance covers everything else. Hospitals, specialists, major procedures and catastrophic care.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Think of it this way. Your membership ensures exceptional day-to-day care and a doctor who truly knows you. Insurance protects you from major medical expenses.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={coverRef}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={coverInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Coverage breakdown</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>What's covered where</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <MotionBox initial={{ opacity: 0, y: 16 }} animate={coverInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
              <Box bg="brand.mist" borderRadius="card" py={{ base: 10, md: 12 }} px={{ base: 8, md: 10 }} h="100%">
                <Box w="32px" h="3px" bg="brand.champagne" mb={6} />
                <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={6}>Your membership covers</Text>
                <VStack align="flex-start" spacing={4}>
                  {MEMBERSHIP_COVERS.map(function (item) {
                    return (
                      <HStack key={item} spacing={3} align="flex-start">
                        <Box color="brand.champagne" mt={0.5} flexShrink={0}><HiCheck size={16} /></Box>
                        <Text fontSize="md" color="brand.body" lineHeight={1.6}>{item}</Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Box>
            </MotionBox>
            <MotionBox initial={{ opacity: 0, y: 16 }} animate={coverInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
              <Box bg="brand.ivory" borderRadius="card" py={{ base: 10, md: 12 }} px={{ base: 8, md: 10 }} h="100%">
                <Box w="32px" h="3px" bg="#D5D0C8" mb={6} />
                <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" mb={6}>Your insurance covers</Text>
                <VStack align="flex-start" spacing={4}>
                  {INSURANCE_COVERS.map(function (item) {
                    return (
                      <HStack key={item} spacing={3} align="flex-start">
                        <Box color="#B5AD9E" mt={0.5} flexShrink={0}><HiCheck size={16} /></Box>
                        <Text fontSize="md" color="brand.body" lineHeight={1.6}>{item}</Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Box>
            </MotionBox>
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={whyRef}>
        <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={whyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={{ base: 8, md: 10 }}>Why you need both</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={6}>Many people wonder why they should pay for a membership when they already have insurance. The reality is that insurance is designed for major medical expenses, not for building a relationship with your doctor.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={{ base: 12, md: 16 }}>Insurance-based primary care forces physicians to see 25 to 30 patients per day just to keep the lights on. That's why appointments are rushed, wait times are long and getting through to your doctor feels impossible.</Text>
            <Box borderLeft="3px solid" borderColor="brand.champagne" pl={{ base: 6, md: 10 }} py={2} mb={{ base: 12, md: 16 }}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontFamily="heading" fontWeight={700} color="brand.slate" fontStyle="italic" lineHeight={1.6} mb={4}>Your membership buys you something insurance can't. Time, access and a physician who actually knows you.</Text>
              <Box w="24px" h="2px" bg="brand.champagne" />
            </Box>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>We've had members whose early-caught cancers, prevented heart attacks and properly diagnosed conditions were only possible because their doctor had the time to truly listen and investigate, not rush to the next patient.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: '120px' }} bg="white" ref={recRef}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={recInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Box bg="brand.mist" borderRadius={{ base: '24px', md: '32px' }} py={{ base: 12, md: 16 }} px={{ base: 8, md: 16 }}>
              <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 14 }} alignItems={{ base: 'stretch', lg: 'flex-start' }}>
                <Box flex={1}>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Our recommendation</Text>
                  <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Insurance recommendations</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.9} mb={5}>We recommend PPO plans as our top choice. PPO plans offer the most flexibility, allowing you to see any specialist without referrals and access care anywhere. When we coordinate your care with specialists or hospitals, a PPO ensures you have options.</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.9}>We're happy to discuss your specific situation and help you think through what makes sense for your family.</Text>
                </Box>
                <Box w={{ base: '100%', lg: '320px' }} flexShrink={0}>
                  <Box bg="white" borderRadius="card" py={8} px={8}>
                    <Box w="24px" h="3px" bg="brand.champagne" mb={5} />
                    <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={4}>Important note</Text>
                    <Text fontSize="md" color="brand.body" lineHeight={1.85}>We are unable to accept patients with HMO plans, Tricare Prime or Medicaid. These insurance types require that labs, imaging and specialist referrals go through specific networks and approval processes that we cannot accommodate as an out-of-network concierge practice.</Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={faqRef}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Billing</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>Common questions</Text>
          </MotionBox>
          <Box borderTop="1px solid" borderColor="#E8E2D8">
            {BILLING_FAQS.map(function (faq) {
              return <FAQItem key={faq.q} q={faq.q} a={faq.a} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Content;
