// src/pages/Signup/index.jsx
import { useState, useRef } from 'react';
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
  { value: 'longevity', label: 'Preventive and longevity planning' },
  { value: 'coordination', label: 'Help coordinating specialists and hospitals' },
  { value: 'flexible', label: 'Care that fits my life' }
];

var AGE_OPTIONS = [
  { value: 'under35', label: '35 and under' },
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
  'Hospital and specialist coordination',
  'Travel medicine support',
  'Prescription management',
  'Home and office visits',
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
            bg={isCompleted ? 'brand.champagne' : isActive ? 'brand.champagne' : '#D5D0C8'}
            opacity={isCompleted ? 0.5 : 1}
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
      py={5}
      px={6}
      bg={selected ? 'brand.champagneSoft' : 'white'}
      border="1px solid"
      borderColor={selected ? 'brand.champagne' : '#D5D0C8'}
      borderRadius="btn"
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s ease"
      _hover={{ borderColor: 'brand.champagne' }}
    >
      <Flex
        w="22px"
        h="22px"
        borderRadius={multi ? '6px' : 'full'}
        border="2px solid"
        borderColor={selected ? 'brand.champagne' : '#D5D0C8'}
        bg={selected && multi ? 'brand.champagne' : 'transparent'}
        align="center"
        justify="center"
        flexShrink={0}
        transition="all 0.2s ease"
      >
        {selected && !multi && <Box w="10px" h="10px" borderRadius="full" bg="brand.champagne" />}
        {selected && multi && <Icon as={HiCheck} boxSize={3} color="white" />}
      </Flex>
      <Text fontSize="md" color="brand.slate" fontWeight={selected ? 600 : 400}>{label}</Text>
    </Flex>
  );
}

var inputProps = {
  bg: 'white',
  border: '1px solid',
  borderColor: '#D5D0C8',
  borderRadius: 'btn',
  fontSize: 'md',
  color: 'brand.slate',
  h: '54px',
  px: 4,
  _placeholder: { color: '#9B9488' },
  _hover: { borderColor: 'brand.champagne' },
  _focus: { borderColor: 'brand.champagne', boxShadow: '0 0 0 1px var(--chakra-colors-brand-champagne)' }
};

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

  function renderSlide() {
    switch (slide) {
      case 1:
        return (
          <VStack spacing={7} textAlign="center">
            <Box w="32px" h="2px" bg="brand.champagne" />
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>A few quick questions</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="400px">We'll use these to build your personalized AnswersMD membership. Takes about 2 minutes.</Text>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />}>Let's go</Button>
          </VStack>
        );
      case 2:
        return (
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>Let's start with you</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8}>We'll use this to personalize your membership details.</Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="100%" textAlign="left">
              <FormControl>
                <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>First name</FormLabel>
                <Input name="firstName" value={data.firstName} onChange={handleInput} placeholder="Jane" {...inputProps} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Last name</FormLabel>
                <Input name="lastName" value={data.lastName} onChange={handleInput} placeholder="Smith" {...inputProps} />
              </FormControl>
            </SimpleGrid>
            <VStack spacing={4} w="100%" textAlign="left">
              <FormControl>
                <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Email address</FormLabel>
                <Input name="email" type="email" value={data.email} onChange={handleInput} placeholder="jane@example.com" {...inputProps} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight={500} color="brand.slate" mb={2}>Phone number</FormLabel>
                <Input name="phone" type="tel" value={data.phone} onChange={handleInput} placeholder="(555) 123-4567" maxLength={16} {...inputProps} />
              </FormControl>
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!contactValid}>Next</Button>
          </VStack>
        );
      case 3:
        return (
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>Who would you like covered?</Text>
            <VStack spacing={3} w="100%">
              {[{ v: 'individual', l: 'Just me' }, { v: 'couple', l: 'Me and a spouse or partner' }, { v: 'family', l: 'Family including children' }].map(function (o) {
                return <OptionCard key={o.v} label={o.l} selected={data.coverage === o.v} onClick={function () { setSingle('coverage', o.v); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!data.coverage}>Next</Button>
          </VStack>
        );
      case 4:
        return (
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>Have you ever had a concierge doctor before?</Text>
            <VStack spacing={3} w="100%">
              {[{ v: 'current', l: 'Yes, I have one now' }, { v: 'past', l: 'Yes, I\'ve had one in the past' }, { v: 'first', l: 'No, this would be my first time' }].map(function (o) {
                return <OptionCard key={o.v} label={o.l} selected={data.experience === o.v} onClick={function () { setSingle('experience', o.v); }} />;
              })}
            </VStack>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!data.experience}>Next</Button>
          </VStack>
        );
      case 5:
        return (
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>Where have you received care in the last 12 months?</Text>
            <Text fontSize="md" color="brand.body">Select all that apply</Text>
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
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>How do you wish healthcare worked?</Text>
            <Text fontSize="md" color="brand.body">If everything went perfectly, what would it look like?</Text>
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
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>What matters most to you?</Text>
            <Text fontSize="md" color="brand.body">Choose what resonates</Text>
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
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>How old are you?</Text>
            <Text fontSize="md" color="brand.body">This helps us match you with the right level of care</Text>
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
          <VStack spacing={7} textAlign="center">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>
              {data.coverage === 'family' ? 'Tell us about your family' : 'Tell us about your spouse'}
            </Text>
            <Text fontSize="md" color="brand.body">Select their age range</Text>
            <VStack spacing={3} w="100%">
              {AGE_OPTIONS.map(function (o) {
                return <OptionCard key={o.value} label={o.label} selected={data.spouseAge === o.value} onClick={function () { setSingle('spouseAge', o.value); }} />;
              })}
            </VStack>
            {data.coverage === 'family' && (
              <Box w="100%" mt={4}>
                <Text fontSize="md" fontWeight={600} color="brand.slate" mb={4}>How many children will be covered?</Text>
                <VStack spacing={3} w="100%">
                  {[{ v: '1', l: '1 child' }, { v: '2', l: '2 children' }, { v: '3', l: '3 children' }, { v: '4+', l: '4+ children' }].map(function (o) {
                    return <OptionCard key={o.v} label={o.l} selected={data.childrenCount === o.v} onClick={function () { setSingle('childrenCount', o.v); }} />;
                  })}
                </VStack>
              </Box>
            )}
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />} isDisabled={!slide9Valid} mt={2}>Next</Button>
          </VStack>
        );
      case 10:
        return (
          <VStack spacing={7} textAlign="center" maxW="700px">
            <Text as="h1" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>What every membership includes</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} w="100%" textAlign="left">
              {INCLUDED_ITEMS.map(function (item) {
                return (
                  <HStack key={item} spacing={3} py={4} px={5} bg="white" border="1px solid" borderColor="#D5D0C8" borderRadius="btn">
                    <Box color="brand.champagne" flexShrink={0}><HiCheck size={18} /></Box>
                    <Text fontSize="md" color="brand.slate">{item}</Text>
                  </HStack>
                );
              })}
            </SimpleGrid>
            <Button onClick={goNext} variant="primary" size="lg" rightIcon={<Icon as={HiArrowRight} />}>See my membership</Button>
          </VStack>
        );
      case 11:
        return (
          <VStack spacing={7} textAlign="center">
            <Box w="32px" h="2px" bg="brand.champagne" />
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>Ready when you are</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8} maxW="400px">Memberships are limited so we can maintain exceptional access and care.</Text>
            <VStack spacing={4} w="100%" maxW="320px" pt={2}>
              <Button as={Link} to="/contact/" variant="primary" size="lg" w="100%" rightIcon={<Icon as={HiArrowRight} />}>Schedule a private call</Button>
              <Button as={Link} to="/contact/" variant="secondary" size="lg" w="100%">Have questions? We'll reach out</Button>
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
        borderColor="#D5D0C8"
        zIndex={100}
      >
        <Flex maxW="98%" mx="auto" px={{ base: 4, md: 4 }} py={4} justify="space-between" align="center">
          <Image src="/logo-dark.png" alt="AnswersMD" h={{ base: '32px', md: '42px' }} objectFit="contain" cursor="pointer" onClick={function () { navigate('/'); }} />
          <Text as={Link} to="/" fontSize="md" color="#9B9488" fontWeight={500} _hover={{ color: 'brand.slate' }} transition="color 0.2s ease">Exit</Text>
        </Flex>
        <Box pb={4}>
          <ProgressDots current={slide} total={TOTAL_SLIDES} />
        </Box>
      </Box>

      <Box
        minH="100vh"
        bg="brand.mist"
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
