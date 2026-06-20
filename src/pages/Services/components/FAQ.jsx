// src/pages/Services/components/FAQ.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Collapse,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiPlus, HiMinus } from 'react-icons/hi';

var MotionBox = motion(Box);

var FAQS = [
  { q: 'What is concierge medicine?', a: 'Concierge medicine is a membership-based model where physicians limit their patient panel to provide more time, access and attention to each member. Instead of seeing 2,000 or more patients, our physicians care for a maximum of 300. This means same-day appointments, extended visits and direct communication with your doctor.' },
  { q: 'Do I still need health insurance?', a: 'Yes. Your AnswersMD membership covers primary care services, but health insurance is still important for hospitalizations, specialist visits, imaging, surgeries and other services outside of primary care. We work alongside your insurance, not in place of it.' },
  { q: 'How is this different from traditional primary care?', a: 'In traditional primary care, physicians manage panels of 2,000 to 3,000 patients. Appointments are rushed, wait times are long and access is limited. At AnswersMD, our physicians see a fraction of that volume. The result is longer visits, same-day availability, direct phone access and a physician who actually knows you.' },
  { q: 'What does the membership include?', a: 'Every membership includes 24/7 direct physician access, same-day appointments, comprehensive annual physicals, advanced lab panels, home and office visits, specialist coordination, travel medicine support, prescription management and personal health advocacy.' },
  { q: 'Can my whole family join?', a: 'Absolutely. We offer individual, couple and family memberships. Dr. Meriwether\'s dual board certification in Pediatrics and Internal Medicine means we can care for every member of your family from newborns to grandparents under one practice.' },
  { q: 'What happens if I need a specialist?', a: 'We coordinate everything. We identify the right specialist, share your records, communicate directly with their office and follow up on results. You never have to navigate the system alone.' },
  { q: 'How do I get started?', a: 'Start with a consultation. It\'s a pressure-free conversation where we learn about your health goals and you learn about our practice. If it\'s a good fit, enrollment takes minutes and your membership begins immediately.' }
];

function FAQItem({ q, a, index }) {
  var [open, setOpen] = useState(false);
  return (
    <MotionBox
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
      borderBottom="1px solid"
      borderColor="brand.borderLight"
      py={{ base: 6, md: 8 }}
    >
      <Flex
        justify="space-between"
        align="flex-start"
        cursor="pointer"
        onClick={function () { setOpen(!open); }}
        role="group"
        gap={6}
      >
        <Text
          fontFamily="heading"
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          fontWeight={700}
          color="brand.slate"
          lineHeight={1.2}
          _groupHover={{ color: 'brand.champagne' }}
          transition="color 0.2s ease"
        >
          {q}
        </Text>
        <Flex
          w={{ base: '36px', md: '44px' }}
          h={{ base: '36px', md: '44px' }}
          borderRadius="full"
          border="1px solid"
          borderColor={open ? 'brand.champagne' : 'brand.borderLight'}
          align="center"
          justify="center"
          flexShrink={0}
          mt={1}
          transition="all 0.2s ease"
          _groupHover={{ borderColor: 'brand.champagne' }}
        >
          <Box color={open ? 'brand.champagne' : 'brand.bodyLight'}>
            {open ? <HiMinus size={18} /> : <HiPlus size={18} />}
          </Box>
        </Flex>
      </Flex>
      <Collapse in={open}>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.85} pt={5} pb={2} maxW="640px">{a}</Text>
      </Collapse>
    </MotionBox>
  );
}

function FAQ() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 12, lg: 20 }}>
          <Box w={{ base: '100%', lg: '380px' }} flexShrink={0} position={{ base: 'relative', lg: 'sticky' }} top={{ lg: '140px' }} alignSelf="flex-start">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>Common questions</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={6}>Frequently asked</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.8} mb={8}>Everything you need to know about membership, coverage and how our practice works.</Text>
              <VStack align="flex-start" spacing={4}>
                <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule a consultation</Button>
                <ChakraLink href="tel:8137273233" fontSize="md" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }}>or call 813-727-3233</ChakraLink>
              </VStack>
            </MotionBox>
          </Box>
          <Box flex={1} borderTop="1px solid" borderColor="brand.borderLight">
            {FAQS.map(function (faq, i) {
              return <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />;
            })}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default FAQ;
