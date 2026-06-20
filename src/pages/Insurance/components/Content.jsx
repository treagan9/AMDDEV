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

function BillingFAQItem({ q, a }) {
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

function Content() {
  var [shortRef, shortInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [coverRef, coverInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [recRef, recInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  var [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box>
      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={shortRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={shortInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} maxW="800px" mx="auto">
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={8}>The short answer</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={5}>Yes, you should keep your health insurance. Your AnswersMD membership covers your primary care relationship. The time, access and attention of your personal physician. Health insurance covers everything else. Hospitals, specialists, major procedures and catastrophic care.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>Think of it this way. Your membership ensures exceptional day-to-day care and a doctor who truly knows you. Insurance protects you from major medical expenses.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={coverRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={coverInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={{ base: 10, md: 14 }} textAlign="center">What's covered where</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} maxW="1000px" mx="auto">
              <Box bg="brand.evergreen" py={{ base: 10, md: 14 }} px={{ base: 8, md: 12 }} borderRadius={{ base: '18px 18px 0 0', md: '18px 0 0 18px' }}>
                <Text fontSize="md" fontWeight={700} color="white" mb={6} pb={4} borderBottom="1px solid" borderColor="whiteAlpha.200">Your membership covers</Text>
                <VStack align="flex-start" spacing={4}>
                  {MEMBERSHIP_COVERS.map(function (item) {
                    return (
                      <HStack key={item} spacing={3} align="flex-start">
                        <Box color="brand.champagne" mt={1} flexShrink={0}><HiCheck size={18} /></Box>
                        <Text fontSize="md" color="whiteAlpha.800" lineHeight={1.6}>{item}</Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Box>
              <Box bg="white" py={{ base: 10, md: 14 }} px={{ base: 8, md: 12 }} border="1px solid" borderColor="brand.borderLight" borderRadius={{ base: '0 0 18px 18px', md: '0 18px 18px 0' }} borderLeft={{ md: 'none' }}>
                <Text fontSize="md" fontWeight={700} color="brand.slate" mb={6} pb={4} borderBottom="1px solid" borderColor="brand.borderLight">Your insurance covers</Text>
                <VStack align="flex-start" spacing={4}>
                  {INSURANCE_COVERS.map(function (item) {
                    return (
                      <HStack key={item} spacing={3} align="flex-start">
                        <Box color="brand.champagne" mt={1} flexShrink={0}><HiCheck size={18} /></Box>
                        <Text fontSize="md" color="brand.body" lineHeight={1.6}>{item}</Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </Box>
            </SimpleGrid>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={whyRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={whyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} maxW="800px" mx="auto">
            <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={8}>Why you need both</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={5}>Many people wonder why they should pay for a membership when they already have insurance. The reality is that insurance is designed for major medical expenses, not for building a relationship with your doctor.</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={10}>Insurance-based primary care forces physicians to see 25 to 30 patients per day just to keep the lights on. That's why appointments are rushed, wait times are long and getting through to your doctor feels impossible.</Text>
            <Box borderLeft="3px solid" borderColor="brand.champagne" pl={{ base: 6, md: 10 }} py={2} mb={10}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontFamily="heading" fontWeight={700} color="brand.slate" fontStyle="italic" lineHeight={1.6}>Your membership buys you something insurance can't. Time, access and a physician who actually knows you.</Text>
            </Box>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>We've had members whose early-caught cancers, prevented heart attacks and properly diagnosed conditions were only possible because their doctor had the time to truly listen and investigate, not rush to the next patient.</Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={recRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={recInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 12, lg: 20 }} maxW="1100px" mx="auto">
              <Box flex={1}>
                <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={8}>Insurance recommendations</Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={5}>We recommend PPO plans as our top choice. PPO plans offer the most flexibility, allowing you to see any specialist without referrals and access care anywhere. When we coordinate your care with specialists or hospitals, a PPO ensures you have options.</Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>We're happy to discuss your specific situation and help you think through what makes sense for your family.</Text>
              </Box>
              <Box w={{ base: '100%', lg: '380px' }} flexShrink={0} pt={{ base: 0, lg: 4 }}>
                <Box bg="white" borderRadius="card" border="1px solid" borderColor="brand.borderLight" p={{ base: 8, md: 10 }}>
                  <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={5}>Important note</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.85}>We are unable to accept patients with HMO plans, Tricare Prime or Medicaid. These insurance types require that labs, imaging and specialist referrals go through specific networks and approval processes that we cannot accommodate as an out-of-network concierge practice.</Text>
                </Box>
              </Box>
            </Flex>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={faqRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 20 }} maxW="1100px" mx="auto">
              <Box w={{ base: '100%', lg: '300px' }} flexShrink={0} position={{ base: 'relative', lg: 'sticky' }} top={{ lg: '140px' }} alignSelf="flex-start">
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>Billing</Text>
                <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>Common questions</Text>
              </Box>
              <Box flex={1} borderTop="1px solid" borderColor="brand.borderLight">
                {BILLING_FAQS.map(function (faq) {
                  return <BillingFAQItem key={faq.q} q={faq.q} a={faq.a} />;
                })}
              </Box>
            </Flex>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

export default Content;
