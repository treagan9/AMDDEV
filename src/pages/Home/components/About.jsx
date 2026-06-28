// src/pages/Home/components/About.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Image,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight } from 'react-icons/hi';
import usePageContent from '../../../admin/lib/usePageContent.jsx';

var MotionBox = motion(Box);

var TEAM = [
  { name: 'Sarah Juarez', role: 'Medical Assistant', photo: '/team/sarah-juarez.webp' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.webp' },
  { name: 'Laura Gore', role: 'Nurse Manager', photo: '/team/laura-gore.webp' },
  { name: 'Dr. Ellen Howard', role: 'Family and Preventive Medicine', photo: '/team/dr-ellen-howard.webp' },
  { name: 'Dr. Douglas Shapiro', role: 'Founder and Lead Physician', photo: '/team/dr-doug-shapiro.webp', featured: true },
  { name: 'Dr. Drew Meriwether', role: 'Pediatric and Internal Medicine', photo: '/team/dr-drew-meriwether.webp' },
  { name: "Dr. Divino D'Alessio Jr.", role: 'Sports and Family Medicine', photo: '/team/dr-divino-dalessio.webp' },
  { name: 'Jamie Barber', role: 'Director of Operations', photo: '/team/jamie-barber.webp' },
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.webp' }
];

var CENTER = 4;
var DEFAULT_ACTIVE = 4;

function getArcY(index) { return Math.pow(Math.abs(index - CENTER), 2) * 5; }
function getDelay(index) { return 0.25 + Math.abs(index - CENTER) * 0.07; }

var aboutDefaults = {
  heading: 'Healthcare built around you',
  body: 'Our membership-based practice limits enrollment so your physician has the time you deserve. Direct access via call, text or video. Same-day appointments. Visits that last as long as you need.',
  cta: 'Meet our team',
  ctaLink: '/team/',
  secondaryCta: 'Our approach',
  secondaryLink: '/services/'
};

function About() {
  var [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  var activeMember = TEAM[activeIndex];
  var c = usePageContent('home', 'about', aboutDefaults);

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref} overflow="hidden">
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <Flex justify="center" align="flex-start" gap={{ base: 2, md: 3, lg: 4 }} display={{ base: 'none', md: 'flex' }} pt={4}>
          {TEAM.map(function (member, i) {
            var isActive = activeIndex === i;
            var isFeaturedDefault = member.featured && activeIndex === DEFAULT_ACTIVE;
            var isHighlighted = isActive || isFeaturedDefault;
            var arcY = getArcY(i);
            var scale = isHighlighted ? 1 : 0.72;
            return (
              <MotionBox key={member.name} display="flex" flexDirection="column" alignItems="center" flexShrink={0} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: getDelay(i) }} style={{ marginTop: arcY }} onMouseEnter={function () { setActiveIndex(i); }} onMouseLeave={function () { setActiveIndex(DEFAULT_ACTIVE); }} cursor="pointer">
                <Box w={{ md: '120px', lg: '160px' }} h={{ md: '120px', lg: '160px' }} borderRadius="full" overflow="hidden" border={isHighlighted ? '3px solid' : '2px solid'} borderColor={isHighlighted ? 'brand.champagne' : '#D5D0C8'} transform={'scale(' + scale + ')'} transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" shadow={isHighlighted ? '0 12px 32px rgba(27,58,52,0.16)' : '0 4px 12px rgba(27,58,52,0.04)'} bg="brand.ivory">
                  <Image src={member.photo} alt={member.name} objectFit="cover" objectPosition="top" w="100%" h="100%" opacity={isHighlighted ? 1 : 0.7} transition="opacity 0.3s ease" />
                </Box>
              </MotionBox>
            );
          })}
        </Flex>

        <Flex justify="center" align="flex-end" gap={3} display={{ base: 'flex', md: 'none' }} pt={2} pb={2}>
          {[3, 4, 5].map(function (i) {
            var member = TEAM[i];
            var isCenter = i === 4;
            var isActive = activeIndex === i;
            return (
              <MotionBox key={member.name} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + Math.abs(i - 4) * 0.1 }} onClick={function () { setActiveIndex(i); }} cursor="pointer">
                <Box w={isCenter ? '120px' : '88px'} h={isCenter ? '120px' : '88px'} borderRadius="full" overflow="hidden" border={isCenter || isActive ? '3px solid' : '2px solid'} borderColor={isCenter || isActive ? 'brand.champagne' : '#D5D0C8'} transition="all 0.3s ease" bg="brand.ivory" mb={isCenter ? 0 : 2}>
                  <Image src={member.photo} alt={member.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                </Box>
              </MotionBox>
            );
          })}
        </Flex>

        <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }} textAlign="center" mt={{ base: 5, md: 6 }} mb={{ base: 10, md: 14 }} minH="56px">
          <AnimatePresence mode="wait">
            <MotionBox key={activeIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight={600} color="brand.slate">{activeMember.name}</Text>
              <Text fontSize="md" color="brand.champagne" fontWeight={500}>{activeMember.role}</Text>
            </MotionBox>
          </AnimatePresence>
        </MotionBox>

        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }}>
          <VStack spacing={5} textAlign="center" maxW="660px" mx="auto">
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.1}>{c.heading}</Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px">{c.body}</Text>
            <Flex gap={4} alignItems="center" flexWrap="wrap" justifyContent="center" mt={2}>
              <Button as={Link} to={c.ctaLink} variant="primary" size="lg">{c.cta}</Button>
              <Button as={Link} to={c.secondaryLink} variant="ghost" size="lg" rightIcon={<Icon as={HiArrowRight} />} color="brand.slate" fontWeight={600} _hover={{ color: 'brand.champagne' }}>{c.secondaryCta}</Button>
            </Flex>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default About;
