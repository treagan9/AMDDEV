// src/pages/Locations/Tampa/components/FAQ.jsx
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
var QUESTIONS = [
  { q: 'Can I come into the office?', a: "Absolutely. You're welcome any time. Walk in or schedule an appointment whenever it suits you." },
  { q: 'Do you make house calls?', a: 'Yes. Your care team comes to you at home, at the office, or wherever life takes you.' },
  { q: 'How does insurance work?', a: 'AnswersMD is membership-based, so there are no claims to file or copays to track. We keep it simple and transparent.' },
  { q: 'How quickly can I be seen?', a: 'Same-day and next-day appointments are the norm, plus 24/7 direct access to your physician by call or text.' }
];
 
function FAQ() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory" ref={ref}>
      <Box maxW={{ base: '100%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 8, md: 12 }} maxW="640px">
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Good to know</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Questions, answered</Text>
        </MotionBox>
 
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} maxW="760px">
          <Accordion allowToggle>
            {QUESTIONS.map(function (item) {
              return (
                <AccordionItem key={item.q} border="none" borderBottom="1px solid" borderColor="brand.champagneLine">
                  <AccordionButton py={5} px={0} _hover={{ bg: 'transparent' }}>
                    <Box flex="1" textAlign="left">
                      <Text fontFamily="heading" fontSize={{ base: 'md', md: 'lg' }} fontWeight={700} color="brand.slate">{item.q}</Text>
                    </Box>
                    <AccordionIcon color="brand.champagne" />
                  </AccordionButton>
                  <AccordionPanel pb={5} px={0}>
                    <Text fontSize="md" color="brand.body" lineHeight={1.8}>{item.a}</Text>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </MotionBox>
      </Box>
    </Box>
  );
}
 
export default FAQ;
