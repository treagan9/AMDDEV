#!/bin/bash
set -e
echo ""
echo "  AnswersMD Dev - Signup Wizard"
echo "  ==============================="
echo ""
mkdir -p src/pages/Signup
echo "Writing files..."

mkdir -p "src"
echo "  -> src/App.jsx"
cat > "src/App.jsx" << 'AMD_EOF_01'
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './pages/Services';
import NewPatients from './pages/NewPatients';
import Contact from './pages/Contact';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/team/" element={<Team />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/new-patients/" element={<NewPatients />} />
        <Route path="/contact/" element={<Contact />} />
      </Route>
      <Route path="/signup/" element={<Signup />} />
    </Routes>
  );
}

export default App;
AMD_EOF_01

mkdir -p "src/pages/Signup"
echo "  -> src/pages/Signup/index.jsx"
cat > "src/pages/Signup/index.jsx" << 'AMD_EOF_02'
// src/pages/Signup/index.jsx
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Image,
  Icon
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiCheck } from 'react-icons/hi';

var MotionBox = motion(Box);

var TOTAL_SLIDES = 11;

var AGE_PRICING = {
  'under35': 5000,
  '36-45': 5500,
  '46-70': 6000,
  '71+': 7000
};

var CARE_OPTIONS = [
  { value: 'primary', label: 'Primary care doctor' },
  { value: 'urgent', label: 'Urgent care' },
  { value: 'er', label: 'Emergency room' },
  { value: 'hospital', label: 'Hospital admission' },
  { value: 'specialist', label: 'Specialist visits' },
  { value: 'telehealth', label: 'Telehealth' },
  { value: 'none', label: "I haven't needed care in the last year" }
];

var IDEAL_OPTIONS = [
  { value: 'fast', label: 'I want fast access when something comes up' },
  { value: 'preventive', label: 'I want preventive, proactive care' },
  { value: 'managed', label: 'I want someone managing the big picture' },
  { value: 'personal', label: 'I want a doctor who actually knows me' }
];

var PRIORITY_OPTIONS = [
  { value: 'same-day', label: 'Same-day appointments' },
  { value: 'direct', label: 'Direct access to my doctor' },
  { value: 'unrushed', label: 'Long, unrushed visits' },
  { value: 'longevity', label: 'Preventive & longevity planning' },
  { value: 'coordination', label: 'Help coordinating specialists & hospitals' },
  { value: 'flexible', label: 'Care that fits my life (home, office, travel)' }
];

var AGE_OPTIONS = [
  { value: 'under35', label: '35 & under' },
  { value: '36-45', label: '36 to 45' },
  { value: '46-70', label: '46 to 70' },
  { value: '71+', label: '71+' }
];

var INCLUDED_ITEMS = [
  '24/7 direct physician access',
  'Same-day appointment guarantee',
  '3+ hour executive physical',
  'Advanced preventive screenings',
  'Unlimited primary care visits',
  'Hospital & specialist coordination',
  'Travel medicine support',
  'Prescription management',
  'Home & office visits',
  'Personal health advocacy',
  'Comprehensive lab panels',
  'Longevity planning'
];

function formatPhone(value) {
  var digits = value.replace(/\D/g, '');
  if (digits.length > 10 && digits.charAt(0) === '1') digits = digits.substring(1);
  digits = digits.substring(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return '(' + digits;
  if (digits.length < 7) return '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
  return '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6);
}

function ProgressDots({ current, total }) {
  return (
    <HStack spacing={2} justify="center">
      {Array.from({ length: total }).map(function (_, i) {
        var step = i + 1;
        var isActive = step === current;
        var isCompleted = step < current;
        return (
          <Box
            key={i}
            w={isActive ? '24px' : '8px'}
            h="8px"
            borderRadius={isActive ? '4px' : 'full'}
            bg={isCompleted ? 'brand.evergreen' : isActive ? 'brand.champagne' : 'brand.border'}
            transition="all 0.3s ease"
          />
        );
      })}
    </HStack>
  );
}

function OptionCard({ label, selected, onClick, multi }) {
  return (
    <Flex
      align="center"
      gap={4}
      p={5}
      bg={selected ? 'brand.champagneSoft' : 'white'}
      border="2px solid"
      borderColor={selected ? 'brand.champagne' : 'brand.borderLight'}
      borderRadius="btn"
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s ease"
      _hover={{ borderColor: selected ? 'brand.champagne' : 'brand.border' }}
    >
      <Flex
        w="20px"
        h="20px"
        borderRadius={multi ? '4px' : 'full'}
        border="2px solid"
        borderColor={selected ? 'brand.champagne' : 'brand.border'}
        bg={selected && multi ? 'brand.champagne' : 'transparent'}
        align="center"
        justify="center"
        flexShrink={0}
        transition="all 0.2s ease"
      >
        {selected && !multi && (
          <Box w="10px" h="10px" borderRadius="full" bg="brand.champagne" />
        )}
        {selected && multi && (
          <Icon as={HiCheck} boxSize={3} color="white" />
        )}
      </Flex>
      <Text fontSize="md" color="brand.slate" fontWeight={selected ? 500 : 400}>
        {label}
      </Text>
    </Flex>
  );
}

function Signup() {
  var [slide, setSlide] = useState(1);
  var [data, setData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    coverage: null, experience: null, careHistory: [],
    ideal: null, priorities: [], age: null,
    spouseAge: null, childrenCount: null
  });
  var formLoadedAt = useRef(Date.now());
  var navigate = useNavigate();

  function goNext() {
    var next = slide + 1;
    if (next === 9 && data.coverage === 'individual') next = 10;
    if (next === 11) submitForm();
    setSlide(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setSingle(key, value) {
    setData(function (prev) { return Object.assign({}, prev, { [key]: value }); });
  }

  function toggleMulti(key, value) {
    setData(function (prev) {
      var arr = prev[key] || [];
      var exists = arr.indexOf(value) > -1;
      var next = exists ? arr.filter(function (v) { return v !== value; }) : arr.concat([value]);
      return Object.assign({}, prev, { [key]: next });
    });
  }

  function handleInput(e) {
    var name = e.target.name;
    var value = e.target.value;
    if (name === 'phone') value = formatPhone(value);
    setData(function (prev) { return Object.assign({}, prev, { [name]: value }); });
  }

  var contactValid = data.firstName.trim() && data.lastName.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.phone.replace(/\D/g, '').length === 10;

  var slide9Valid = data.coverage === 'family'
    ? data.spouseAge && data.childrenCount
    : data.spouseAge;

  async function submitForm() {
    var pPrice = AGE_PRICING[data.age] || 6000;
    var aPrice = 0;
    if (data.coverage !== 'individual' && data.spouseAge) {
      aPrice += Math.round((AGE_PRICING[data.spouseAge] || 6000) * 0.75);
    }
    if (data.coverage === 'family' && data.childrenCount) {
      var cc = data.childrenCount === '4+' ? 4 : parseInt(data.childrenCount);
      aPrice += cc * Math.round(AGE_PRICING['under35'] * 0.75);
    }
    var payload = {
      firstName: data.firstName, lastName: data.lastName,
      email: data.email, phone: data.phone,
      coverage: data.coverage, experience: data.experience,
      careHistory: data.careHistory, ideal: data.ideal,
      priorities: data.priorities, age: data.age,
      spouseAge: data.spouseAge, childrenCount: data.childrenCount,
      primaryPrice: pPrice, additionalPrice: aPrice,
      totalPrice: pPrice + aPrice,
      website: '', formLoadedAt: formLoadedAt.current
    };
    try {
      await fetch('/.netlify/functions/submit-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) { /* silent */ }
  }

  var inputStyles = {
    bg: 'white', border: '2px solid', borderColor: 'brand.borderLight',
    borderRadius: 'btn', fontSize: 'md', py: 6, px: 5, color: 'brand.slate',
    _placeholder: { color: 'brand.warmGrayLight' },
    _focus: { borderColor: 'brand.champagne', boxShadow: 'none' }
  };

  function renderSlide() {
    switch (slide) {
      case 1:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 1 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>A few quick questions</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8}>We'll use these to build your personalized AnswersMD membership. Takes about 2 minutes.</Text>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />}>Continue</Button>
          </VStack>
        );
      case 2:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 2 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Let's start with you</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8}>We'll use this to personalize your membership details.</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%" textAlign="left">
              <FormControl><FormLabel fontSize="sm" fontWeight={500} color="brand.body">First name</FormLabel><Input name="firstName" value={data.firstName} onChange={handleInput} placeholder="First name" {...inputStyles} /></FormControl>
              <FormControl><FormLabel fontSize="sm" fontWeight={500} color="brand.body">Last name</FormLabel><Input name="lastName" value={data.lastName} onChange={handleInput} placeholder="Last name" {...inputStyles} /></FormControl>
            </SimpleGrid>
            <VStack spacing={4} w="100%" textAlign="left">
              <FormControl><FormLabel fontSize="sm" fontWeight={500} color="brand.body">Email</FormLabel><Input name="email" type="email" value={data.email} onChange={handleInput} placeholder="you@example.com" {...inputStyles} /></FormControl>
              <FormControl><FormLabel fontSize="sm" fontWeight={500} color="brand.body">Phone</FormLabel><Input name="phone" type="tel" value={data.phone} onChange={handleInput} placeholder="(555) 123-4567" maxLength={16} {...inputStyles} /></FormControl>
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!contactValid}>Next</Button>
          </VStack>
        );
      case 3:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 3 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Who would you like covered?</Text>
            <VStack spacing={3} w="100%">
              {[{ v: 'individual', l: 'Just me' }, { v: 'couple', l: 'Me + a spouse or partner' }, { v: 'family', l: 'Family (includes children)' }].map(function (o) {
                return <OptionCard key={o.v} label={o.l} selected={data.coverage === o.v} onClick={function () { setSingle('coverage', o.v); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!data.coverage}>Next</Button>
          </VStack>
        );
      case 4:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 4 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Have you ever had a concierge doctor before?</Text>
            <VStack spacing={3} w="100%">
              {[{ v: 'current', l: 'Yes, I have one now' }, { v: 'past', l: "Yes, I've had one in the past" }, { v: 'first', l: 'No, this would be my first time' }].map(function (o) {
                return <OptionCard key={o.v} label={o.l} selected={data.experience === o.v} onClick={function () { setSingle('experience', o.v); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!data.experience}>Next</Button>
          </VStack>
        );
      case 5:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 5 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Where have you received care in the last 12 months?</Text>
            <Text fontSize="sm" color="brand.bodyLight">Select all that apply.</Text>
            <VStack spacing={3} w="100%">
              {CARE_OPTIONS.map(function (o) {
                return <OptionCard key={o.value} label={o.label} multi selected={data.careHistory.indexOf(o.value) > -1} onClick={function () { toggleMulti('careHistory', o.value); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={data.careHistory.length === 0}>Next</Button>
          </VStack>
        );
      case 6:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 6 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>How do you wish healthcare worked?</Text>
            <Text fontSize="sm" color="brand.bodyLight">If everything went perfectly, what would it look like?</Text>
            <VStack spacing={3} w="100%">
              {IDEAL_OPTIONS.map(function (o) {
                return <OptionCard key={o.value} label={o.label} selected={data.ideal === o.value} onClick={function () { setSingle('ideal', o.value); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!data.ideal}>Next</Button>
          </VStack>
        );
      case 7:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 7 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>What matters most to you?</Text>
            <Text fontSize="sm" color="brand.bodyLight">Choose what resonates. Don't overthink it.</Text>
            <VStack spacing={3} w="100%">
              {PRIORITY_OPTIONS.map(function (o) {
                return <OptionCard key={o.value} label={o.label} multi selected={data.priorities.indexOf(o.value) > -1} onClick={function () { toggleMulti('priorities', o.value); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={data.priorities.length === 0}>Next</Button>
          </VStack>
        );
      case 8:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 8 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>How old are you?</Text>
            <Text fontSize="sm" color="brand.bodyLight">This helps us match you with the right level of care.</Text>
            <VStack spacing={3} w="100%">
              {AGE_OPTIONS.map(function (o) {
                return <OptionCard key={o.value} label={o.label} selected={data.age === o.value} onClick={function () { setSingle('age', o.value); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!data.age}>Next</Button>
          </VStack>
        );
      case 9:
        return (
          <VStack spacing={6} textAlign="center">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 9 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>
              {data.coverage === 'family' ? 'Tell us about your family' : 'Tell us about your spouse'}
            </Text>
            <Text fontSize="sm" color="brand.bodyLight">Select their age range.</Text>
            <VStack spacing={3} w="100%">
              {AGE_OPTIONS.map(function (o) {
                return <OptionCard key={o.value} label={o.label} selected={data.spouseAge === o.value} onClick={function () { setSingle('spouseAge', o.value); }} />;
              })}
            </VStack>
            {data.coverage === 'family' && (
              <Box w="100%" mt={4}>
                <Text fontSize="md" color="brand.body" mb={4}>How many children will be covered?</Text>
                <VStack spacing={3} w="100%">
                  {[{ v: '1', l: '1 child' }, { v: '2', l: '2 children' }, { v: '3', l: '3 children' }, { v: '4+', l: '4+ children' }].map(function (o) {
                    return <OptionCard key={o.v} label={o.l} selected={data.childrenCount === o.v} onClick={function () { setSingle('childrenCount', o.v); }} />;
                  })}
                </VStack>
              </Box>
            )}
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!slide9Valid} mt={4}>Next</Button>
          </VStack>
        );
      case 10:
        return (
          <VStack spacing={6} textAlign="center" maxW="700px">
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.warmGrayLight">Step 10 of 11</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>What every AnswersMD membership includes</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} w="100%" textAlign="left">
              {INCLUDED_ITEMS.map(function (item) {
                return (
                  <HStack key={item} spacing={3} p={4} bg="white" borderRadius="btn">
                    <Icon as={HiCheck} boxSize={5} color="brand.champagne" flexShrink={0} />
                    <Text fontSize="sm" color="brand.slate">{item}</Text>
                  </HStack>
                );
              })}
            </SimpleGrid>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />}>See my membership</Button>
          </VStack>
        );
      case 11:
        return (
          <VStack spacing={6} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.15}>Ready when you are</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="400px">Memberships are limited so we can maintain exceptional access and care.</Text>
            <VStack spacing={3} w="100%" maxW="320px">
              <Button as={Link} to="/contact/" variant="primary" size="lg" w="100%" rightIcon={<Icon as={HiArrowRight} />}>
                Schedule a private call
              </Button>
              <Button as={Link} to="/contact/" variant="secondary" size="lg" w="100%">
                Have questions? We'll reach out
              </Button>
            </VStack>
          </VStack>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <Helmet>
        <title>Get Started | AnswersMD&trade;</title>
        <meta name="description" content="Build your personalized AnswersMD membership in just 2 minutes." />
      </Helmet>

      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="rgba(250,250,247,0.95)"
        backdropFilter="blur(10px)"
        borderBottom="1px solid"
        borderColor="brand.borderLight"
        zIndex={100}
      >
        <Flex maxW="98%" mx="auto" px={{ base: 4, md: 4 }} py={4} justify="space-between" align="center">
          <Image src="/logo-dark.png" alt="AnswersMD" h="24px" objectFit="contain" cursor="pointer" onClick={function () { navigate('/'); }} />
          <Text as={Link} to="/" fontSize="sm" color="brand.warmGrayLight" _hover={{ color: 'brand.slate' }}>Exit</Text>
        </Flex>
        <Box pb={4}>
          <ProgressDots current={slide} total={TOTAL_SLIDES} />
        </Box>
      </Box>

      <Box
        minH="100vh"
        bg="brand.ivory"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        pt={{ base: '140px', md: '160px' }}
        pb={16}
        px={{ base: 5, md: 6 }}
      >
        <Box w="100%" maxW="600px">
          <AnimatePresence mode="wait">
            <MotionBox
              key={slide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {renderSlide()}
            </MotionBox>
          </AnimatePresence>
        </Box>
      </Box>
    </>
  );
}

export default Signup;
AMD_EOF_02


echo ""
echo "  Done. 11-step signup wizard built."
echo "    - Progress dots, slide transitions"
echo "    - Contact, coverage, experience, care history"
echo "    - Ideal, priorities, age, family (conditional)"
echo "    - Whats included, final CTA"
echo "    - Submits to /.netlify/functions/submit-signup"
echo "    - Own header (no site nav), route: /signup/"
echo ""
echo "  Run: yarn dev"
echo ""