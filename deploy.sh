#!/bin/bash
set -e

if [ ! -f "package.json" ]; then
  echo "ERROR: package.json not found. Run this from ~/Desktop/AMDDEV"
  exit 1
fi

echo ""
echo "  AnswersMD - Services page rebuild"
echo "  ===================================="
echo ""
echo "  Writing 6 files..."
echo ""
mkdir -p "src/pages/Services"
echo "  -> src/pages/Services/index.jsx"
cat > "src/pages/Services/index.jsx" << 'AMDDEV_EOF_01'
// src/pages/Services/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ServicesList from './components/ServicesList';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

function Services() {
  return (
    <>
      <Helmet>
        <title>Our Approach | AnswersMD&trade;</title>
        <meta name="description" content="How AnswersMD delivers concierge medicine. Direct physician access, preventive care, house calls and more." />
      </Helmet>
      <Hero />
      <Stats />
      <ServicesList />
      <FAQ />
      <CTA />
    </>
  );
}

export default Services;
AMDDEV_EOF_01

mkdir -p "src/pages/Services/components"
echo "  -> src/pages/Services/components/CTA.jsx"
cat > "src/pages/Services/components/CTA.jsx" << 'AMDDEV_EOF_02'
// src/pages/Services/components/CTA.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

function CTA() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <VStack spacing={8} textAlign="center" maxW="800px" mx="auto">
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>Ready to experience the difference?</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8}>It starts with a conversation. No commitment, no pressure. Just an honest discussion about your health and whether AnswersMD is right for you.</Text>
            <Flex gap={4} direction={{ base: 'column', sm: 'row' }} w={{ base: '100%', sm: 'auto' }}>
              <Button as={Link} to="/contact/" variant="primary" size="lg" w={{ base: '100%', sm: 'auto' }}>Schedule a consultation</Button>
              <Button as={Link} to="/signup/" variant="secondary" size="lg" w={{ base: '100%', sm: 'auto' }}>Join now</Button>
            </Flex>
            <ChakraLink href="tel:8137273233" fontSize="md" color="brand.bodyLight" _hover={{ color: 'brand.champagne' }}>or call 813-727-3233</ChakraLink>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default CTA;
AMDDEV_EOF_02

mkdir -p "src/pages/Services/components"
echo "  -> src/pages/Services/components/FAQ.jsx"
cat > "src/pages/Services/components/FAQ.jsx" << 'AMDDEV_EOF_03'
// src/pages/Services/components/FAQ.jsx
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

var FAQS = [
  { q: 'What is concierge medicine?', a: 'Concierge medicine is a membership-based model where physicians limit their patient panel to provide more time, access and attention to each member. Instead of seeing 2,000 or more patients, our physicians care for a maximum of 300. This means same-day appointments, extended visits and direct communication with your doctor.' },
  { q: 'Do I still need health insurance?', a: 'Yes. Your AnswersMD membership covers primary care services, but health insurance is still important for hospitalizations, specialist visits, imaging, surgeries and other services outside of primary care. We work alongside your insurance, not in place of it.' },
  { q: 'How is this different from traditional primary care?', a: 'In traditional primary care, physicians manage panels of 2,000 to 3,000 patients. Appointments are rushed, wait times are long and access is limited. At AnswersMD, our physicians see a fraction of that volume. The result is longer visits, same-day availability, direct phone access and a physician who actually knows you.' },
  { q: 'What does the membership include?', a: 'Every membership includes 24/7 direct physician access, same-day appointments, comprehensive annual physicals, advanced lab panels, home and office visits, specialist coordination, travel medicine support, prescription management and personal health advocacy.' },
  { q: 'Can my whole family join?', a: 'Absolutely. We offer individual, couple and family memberships. Dr. Meriwether\'s dual board certification in Pediatrics and Internal Medicine means we can care for every member of your family from newborns to grandparents under one practice.' },
  { q: 'What happens if I need a specialist?', a: 'We coordinate everything. We identify the right specialist, share your records, communicate directly with their office and follow up on results. You never have to navigate the system alone.' },
  { q: 'How do I get started?', a: 'Start with a consultation. It\'s a pressure-free conversation where we learn about your health goals and you learn about our practice. If it\'s a good fit, enrollment takes minutes and your membership begins immediately.' }
];

function FAQItem({ q, a }) {
  var [open, setOpen] = useState(false);
  return (
    <Box borderBottom="1px solid" borderColor="brand.borderLight" py={6}>
      <Flex justify="space-between" align="center" cursor="pointer" onClick={function () { setOpen(!open); }} role="group">
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={600} color="brand.slate" pr={4} _groupHover={{ color: 'brand.champagne' }} transition="color 0.2s ease">{q}</Text>
        <Box flexShrink={0} color={open ? 'brand.champagne' : 'brand.bodyLight'}>
          {open ? <HiMinus size={20} /> : <HiPlus size={20} />}
        </Box>
      </Flex>
      <Collapse in={open}>
        <Text fontSize="md" color="brand.body" lineHeight={1.85} pt={5} pb={2}>{a}</Text>
      </Collapse>
    </Box>
  );
}

function FAQ() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 20 }} maxW="1100px" mx="auto">
            <Box w={{ base: '100%', lg: '340px' }} flexShrink={0}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Common questions</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>Frequently asked</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.8}>Everything you need to know about membership, coverage and how our practice works.</Text>
            </Box>
            <Box flex={1} borderTop="1px solid" borderColor="brand.borderLight">
              {FAQS.map(function (faq) {
                return <FAQItem key={faq.q} q={faq.q} a={faq.a} />;
              })}
            </Box>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default FAQ;
AMDDEV_EOF_03

mkdir -p "src/pages/Services/components"
echo "  -> src/pages/Services/components/Hero.jsx"
cat > "src/pages/Services/components/Hero.jsx" << 'AMDDEV_EOF_04'
// src/pages/Services/components/Hero.jsx
import {
  Box,
  Text,
  VStack,
  HStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

var MotionBox = motion(Box);
var MotionText = motion(Text);

function Hero() {
  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/services/hero-mobile.png" />
          <source media="(max-width: 991px)" srcSet="/services/hero-tablet.png" />
          <img
            src="/services/hero-desktop.png"
            alt="AnswersMD concierge medicine approach"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </picture>
      </Box>

      <Box position="absolute" top={0} left={0} right={0} h="180px" bg="linear-gradient(to bottom, rgba(250,250,247,0.85) 0%, rgba(250,250,247,0.4) 60%, transparent 100%)" zIndex={1} />
      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg={{ base: 'rgba(250,250,247,0.6)', md: 'rgba(250,250,247,0.45)' }} zIndex={1} />
      <Box position="absolute" bottom={0} left={0} right={0} h="200px" bg="linear-gradient(to top, rgba(250,250,247,0.9) 0%, transparent 100%)" zIndex={1} />

      <Box maxW="960px" mx="auto" px={{ base: 6, md: 4 }} textAlign="center" position="relative" zIndex={2}>
        <VStack spacing={7}>
          <MotionBox initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <HStack spacing={3} justify="center">
              <Box w="24px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">Our approach</Text>
              <Box w="24px" h="1px" bg="brand.champagne" />
            </HStack>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>
              Your doctor's cell phone number.
            </Text>
            <Text fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight={700} color="brand.champagne" lineHeight={1.08} mt={2}>
              Yes, really.
            </Text>
          </MotionBox>

          <MotionText fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            Healthcare built around access, time and a physician who actually knows your name.
          </MotionText>
        </VStack>
      </Box>
    </Box>
  );
}

export default Hero;
AMDDEV_EOF_04

mkdir -p "src/pages/Services/components"
echo "  -> src/pages/Services/components/ServicesList.jsx"
cat > "src/pages/Services/components/ServicesList.jsx" << 'AMDDEV_EOF_05'
// src/pages/Services/components/ServicesList.jsx
import {
  Box,
  Flex,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var SERVICES = [
  { title: 'Direct access', description: 'Your physician\'s personal cell phone number. Call, text or video chat whenever you need guidance. No answering services, no callbacks, no delays. When something comes up, you reach your doctor directly.', image: '/services/service-access.png' },
  { title: 'Preventive care', description: 'Annual executive physicals, advanced lab panels, cancer screenings and personalized wellness plans designed to catch problems before they start. We test beyond the standard panel because early detection changes outcomes.', image: '/services/service-preventive.png' },
  { title: 'House calls', description: 'We come to your home, office or wherever life takes you. Same quality of care without the waiting room. For busy professionals and families who need healthcare that fits their schedule, not the other way around.', image: '/services/service-housecalls.png' },
  { title: 'Executive health', description: 'Comprehensive health programs designed for professionals and leaders who need to perform at their best. Full diagnostics, longevity planning and ongoing optimization. A 3+ hour deep-dive into your complete health picture.', image: '/services/service-executive.png' },
  { title: 'Specialist coordination', description: 'We manage referrals, share records, follow up on results and ensure nothing falls through the cracks across your entire care team. You never navigate the system alone.', image: '/services/service-coordination.png' },
  { title: 'Travel medicine', description: 'Pre-travel consultations, vaccinations, health kits and 24/7 physician access while you\'re away. Your doctor travels with you. Whether it\'s a weekend trip or a month abroad, your care doesn\'t stop at the airport.', image: '/services/service-travel.png' }
];

function ServiceSpread({ title, description, image, index }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var isEven = index % 2 === 0;

  return (
    <Box ref={ref}>
      <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" overflow="hidden" role="group">
        <Box position="relative" pb={{ base: '66%', md: '42%' }}>
          <Image src={image} alt={title} objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" _groupHover={{ transform: 'scale(1.03)' }} fallback={<Box w="100%" h="100%" bg="brand.mist" />} />
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to top, rgba(27,58,52,0.7) 0%, rgba(27,58,52,0.1) 50%, transparent 100%)" />
        </Box>
      </MotionBox>
      <Box py={{ base: 12, md: 16 }} bg={isEven ? 'white' : 'brand.ivory'}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 16 }} maxW="1100px" mx={{ base: 0, lg: 'auto' }}>
              <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} w={{ base: '100%', md: '40%' }} flexShrink={0}>{title}</Text>
              <Text fontSize="md" color="brand.body" lineHeight={1.9} pt={{ base: 0, md: 2 }}>{description}</Text>
            </Flex>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

function ServicesList() {
  return (
    <Box>
      {SERVICES.map(function (svc, i) {
        return <ServiceSpread key={svc.title} {...svc} index={i} />;
      })}
    </Box>
  );
}

export default ServicesList;
AMDDEV_EOF_05

mkdir -p "src/pages/Services/components"
echo "  -> src/pages/Services/components/Stats.jsx"
cat > "src/pages/Services/components/Stats.jsx" << 'AMDDEV_EOF_06'
// src/pages/Services/components/Stats.jsx
import {
  Box,
  SimpleGrid,
  HStack,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STATS = [
  { value: '30-60', unit: 'min', label: 'Every appointment' },
  { value: '300', unit: 'max', label: 'Patients per physician' },
  { value: '24/7', unit: '', label: 'Direct physician access' }
];

function Stats() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.evergreen" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 4 }} maxW="900px" mx="auto" textAlign="center">
          {STATS.map(function (stat, i) {
            return (
              <MotionBox key={stat.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}>
                <HStack spacing={1} justify="center" mb={2}>
                  <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="white" lineHeight={1}>{stat.value}</Text>
                  {stat.unit && <Text fontSize="lg" color="brand.champagne" fontWeight={500}>{stat.unit}</Text>}
                </HStack>
                <Text fontSize="md" color="whiteAlpha.600">{stat.label}</Text>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Stats;
AMDDEV_EOF_06


rm -rf node_modules/.vite 2>/dev/null || true

echo ""
echo "  Done. Services page rebuilt with full-width editorial spreads."
echo ""
echo "  Verify:"
echo "    yarn dev"
echo "    Open http://localhost:5173/services/"
echo ""
echo "  Then commit:"
echo "    git add -A"
echo "    git commit -m \"Rebuild Services page with editorial spreads\""
echo "    git push"
echo ""