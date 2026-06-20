// src/pages/FAQ/components/Questions.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Collapse
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiPlus, HiMinus } from 'react-icons/hi';

var MotionBox = motion(Box);

var CATEGORIES = [
  {
    title: 'About concierge medicine',
    questions: [
      { q: 'What is concierge medicine?', a: 'Concierge medicine is a membership-based approach to primary care that prioritizes the doctor-patient relationship. Instead of managing thousands of patients, concierge physicians limit their practice to a small number of members. At AnswersMD, this means you have direct access to your physician 24/7, unhurried visits that address all your concerns and a doctor who knows your complete health history and personal goals.' },
      { q: 'How is this different from traditional primary care?', a: 'Traditional primary care physicians often manage 2,000 to 3,000 patients, leading to rushed appointments, long wait times and difficulty reaching your doctor. At AnswersMD, we limit our practice so you get same-day appointments, 30 to 60 minute visits, direct phone and text access to your physician and comprehensive annual physicals.' },
      { q: 'Do I still need health insurance?', a: 'Yes, we recommend maintaining health insurance. Your AnswersMD membership covers your primary care relationship including unlimited visits, 24/7 access, annual physicals and care coordination. Health insurance is still important for hospital stays, specialist consultations, advanced imaging, prescription medications and major medical expenses. Think of your membership as an investment in exceptional primary care while insurance protects you from major medical costs.' }
    ]
  },
  {
    title: 'Membership and pricing',
    questions: [
      { q: 'How much does membership cost?', a: 'Annual membership fees vary based on age and are designed to reflect the level of care required at different life stages. Additional family members receive a 25% discount on their membership. There are no per-visit fees, copays or hidden charges for primary care services.' },
      { q: 'What is included in my membership?', a: 'Every membership includes 24/7 direct physician access, same-day appointment guarantee, comprehensive annual physicals, unlimited primary care visits, extended 30 to 60 minute appointments, home and office visits, hospital accompaniment and advocacy, specialist referral coordination, prescription management, travel medicine consultations, preventive health planning and advanced lab panels.' },
      { q: 'Can my family join?', a: 'Yes. We welcome families. Spouses, partners and children can be added to your membership at a 25% discount from the standard rate. Each family member receives the same level of personalized care and direct physician access. Dr. Meriwether\'s dual board certification in Pediatrics and Internal Medicine means we care for entire families from newborns to grandparents.' },
      { q: 'What is your cancellation policy?', a: 'You may cancel your membership for any reason by providing 30 days written notice. The first 90 days of membership are non-refundable as this period includes your comprehensive onboarding, initial assessments and the time invested in getting to know you and your health history. We\'ll ensure a smooth transition by coordinating with your new provider and transferring records promptly.' }
    ]
  },
  {
    title: 'Care and access',
    questions: [
      { q: 'How do I contact my physician?', a: 'As a member, you have your physician\'s direct cell phone number. You can reach them via phone call, text message, email, secure patient portal or video consultation. For non-urgent matters, expect a response within a few hours. For urgent concerns, your physician is available 24/7 including nights, weekends and holidays.' },
      { q: 'What if I have an emergency?', a: 'For life-threatening emergencies, always call 911 first. Once you\'re safe, contact your AnswersMD physician immediately. We will communicate directly with ER physicians on your behalf, ensure the hospital has your complete medical history, visit you in the hospital when possible, coordinate your care and discharge planning and follow up closely after you return home.' },
      { q: 'Do you offer telemedicine visits?', a: 'Yes. Video consultations are available anytime and are great for quick questions, follow-up appointments, reviewing test results, care while traveling and minor illness evaluation. When an in-person examination is needed, we\'ll schedule you for a same-day office visit.' },
      { q: 'What areas do you serve?', a: 'AnswersMD currently serves members throughout Florida with offices in Tampa, St. Petersburg and Boca Raton. Home visits are available within a reasonable distance of our office locations. Telemedicine services are available to members wherever they travel.' }
    ]
  },
  {
    title: 'Getting started',
    questions: [
      { q: 'How do I become a member?', a: 'Joining AnswersMD is simple. Complete our quick questionnaire which takes about 2 minutes online. Schedule an introductory call to meet your physician and ask questions. Then enroll and schedule your welcome visit. Most new members can be seen within 1 to 2 weeks of enrollment.' },
      { q: 'Are you accepting new members?', a: 'Yes, we are currently accepting new members in Tampa, St. Petersburg and Boca Raton. Because we intentionally limit our practice size to maintain exceptional care, availability can change. If you\'re interested in joining, we encourage you to reach out soon to ensure availability with your preferred physician.' },
      { q: 'Can I meet the doctor before joining?', a: 'Absolutely. We offer complimentary consultations with our physicians either by phone or in person so you can ask questions, learn about our approach and determine if AnswersMD is the right fit for you and your family. We believe the doctor-patient relationship is built on trust and compatibility.' }
    ]
  }
];

function FAQItem({ q, a }) {
  var [open, setOpen] = useState(false);
  return (
    <Box borderBottom="1px solid" borderColor="brand.borderLight" py={{ base: 5, md: 6 }}>
      <Flex justify="space-between" align="flex-start" cursor="pointer" onClick={function () { setOpen(!open); }} role="group" gap={6}>
        <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" lineHeight={1.2} _groupHover={{ color: 'brand.champagne' }} transition="color 0.2s ease">{q}</Text>
        <Flex w={{ base: '36px', md: '40px' }} h={{ base: '36px', md: '40px' }} borderRadius="full" border="1px solid" borderColor={open ? 'brand.champagne' : 'brand.borderLight'} align="center" justify="center" flexShrink={0} mt={0.5} transition="all 0.2s ease" _groupHover={{ borderColor: 'brand.champagne' }}>
          <Box color={open ? 'brand.champagne' : 'brand.bodyLight'}>{open ? <HiMinus size={16} /> : <HiPlus size={16} />}</Box>
        </Flex>
      </Flex>
      <Collapse in={open}>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.85} pt={5} pb={2} maxW="700px">{a}</Text>
      </Collapse>
    </Box>
  );
}

function Questions() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.02 });

  return (
    <Box ref={ref}>
      {CATEGORIES.map(function (cat, catIndex) {
        var isEven = catIndex % 2 === 0;
        return (
          <Box key={cat.title} py={{ base: 'sectionMobile', md: 'section' }} bg={isEven ? 'white' : 'brand.ivory'}>
            <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
              <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
                <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 20 }}>
                  <Box w={{ base: '100%', lg: '300px' }} flexShrink={0} position={{ base: 'relative', lg: 'sticky' }} top={{ lg: '140px' }} alignSelf="flex-start">
                    <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={3}>{cat.title}</Text>
                    <Text fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>{cat.questions.length} questions</Text>
                  </Box>
                  <Box flex={1} borderTop="1px solid" borderColor="brand.borderLight">
                    {cat.questions.map(function (faq) {
                      return <FAQItem key={faq.q} q={faq.q} a={faq.a} />;
                    })}
                  </Box>
                </Flex>
              </MotionBox>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default Questions;
