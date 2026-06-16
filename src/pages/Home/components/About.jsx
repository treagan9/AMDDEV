// src/pages/Home/components/About.jsx
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Image,
  Icon,
  useBreakpointValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight } from 'react-icons/hi';

var MotionBox = motion(Box);

var TEAM = [
  { name: 'Sarah Juarez', role: 'Medical Assistant', photo: '/team/sarah-juarez.png' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.png' },
  { name: 'Laura Gore', role: 'Clinical Lead', photo: '/team/laura-gore.png' },
  { name: 'Dr. Ellen Howard, MD, MPH', role: 'Family & Preventive Medicine', photo: '/team/dr-ellen-howard.png' },
  { name: 'Dr. Douglas Shapiro, DO', role: 'Founder & Lead Physician', photo: '/team/dr-doug-shapiro.png', featured: true },
  { name: 'Dr. Drew Meriwether, MD', role: 'Pediatric & Internal Medicine', photo: '/team/dr-drew-meriwether.png' },
  { name: "Dr. Divino D'Alessio Jr., MD", role: 'Sports & Family Medicine', photo: '/team/dr-divino-dalessio.png' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png' },
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png' }
];

var CENTER = 4;
var DEFAULT_ACTIVE = 4;
var PHOTO_SIZE = { base: '84px', md: '130px', lg: '140px' };
var INACTIVE_SCALE = 0.72;

function getArcY(index) {
  var distance = Math.abs(index - CENTER);
  return Math.pow(distance, 2) * 5;
}

function getDelay(index) {
  return 0.25 + Math.abs(index - CENTER) * 0.07;
}

function About() {
  var [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  var scrollRef = useRef(null);
  var isDesktop = useBreakpointValue({ base: false, md: true });
  var activeMember = TEAM[activeIndex];

  useEffect(function () {
    if (scrollRef.current && !isDesktop) {
      var container = scrollRef.current;
      var scrollWidth = container.scrollWidth;
      var clientWidth = container.clientWidth;
      container.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, [isDesktop]);

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref} overflow="visible">
      <Box maxW="98%" mx="auto" px={{ base: 0, md: 4 }}>

        <Box
          ref={scrollRef}
          overflowX={{ base: 'auto', md: 'visible' }}
          overflowY="visible"
          pb={4}
          pt={{ base: 2, md: 4 }}
          px={{ base: 6, md: 0 }}
          sx={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none'
          }}
        >
          <Flex
            justify="center"
            align="flex-start"
            gap={{ base: 2, md: 3, lg: 4 }}
            minW={{ base: '820px', md: 'auto' }}
          >
            {TEAM.map(function (member, i) {
              var isActive = activeIndex === i;
              var isFeaturedDefault = member.featured && activeIndex === DEFAULT_ACTIVE;
              var isHighlighted = isActive || isFeaturedDefault;
              var arcY = isDesktop ? getArcY(i) : 0;
              var scale = isHighlighted ? 1 : INACTIVE_SCALE;

              return (
                <MotionBox
                  key={member.name}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  flexShrink={0}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: getDelay(i) }}
                  style={{ marginTop: arcY }}
                  onMouseEnter={function () { setActiveIndex(i); }}
                  onMouseLeave={function () { setActiveIndex(DEFAULT_ACTIVE); }}
                  onClick={function () { setActiveIndex(i); }}
                  cursor="pointer"
                >
                  <Box
                    w={PHOTO_SIZE}
                    h={PHOTO_SIZE}
                    borderRadius="full"
                    overflow="hidden"
                    border={isHighlighted ? '3px solid' : '2px solid'}
                    borderColor={isHighlighted ? 'brand.champagne' : 'brand.borderLight'}
                    transform={'scale(' + scale + ')'}
                    transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    shadow={isHighlighted ? '0 12px 32px rgba(27,58,52,0.16)' : '0 4px 12px rgba(27,58,52,0.04)'}
                    bg="brand.mist"
                  >
                    <Image
                      src={member.photo}
                      alt={member.name}
                      objectFit="cover"
                      objectPosition="top"
                      w="100%"
                      h="100%"
                      opacity={isHighlighted ? 1 : 0.75}
                      transition="opacity 0.3s ease"
                    />
                  </Box>
                </MotionBox>
              );
            })}
          </Flex>
        </Box>

        <MotionBox
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          textAlign="center"
          mt={{ base: 4, md: 6 }}
          mb={{ base: 10, md: 14 }}
          minH="56px"
          px={{ base: 6, md: 0 }}
        >
          <AnimatePresence mode="wait">
            <MotionBox
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={600} color="brand.slate">
                {activeMember.name}
              </Text>
              <Text fontSize="sm" color="brand.champagne" fontWeight={500}>
                {activeMember.role}
              </Text>
            </MotionBox>
          </AnimatePresence>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          px={{ base: 6, md: 0 }}
        >
          <VStack spacing={5} textAlign="center" maxW="660px" mx="auto">
            <Box w="32px" h="1px" bg="brand.champagne" />
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="2px"
              textTransform="uppercase"
              color="brand.champagne"
            >
              Your care team
            </Text>
            <Text
              as="h2"
              fontFamily="heading"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight={700}
              color="brand.slate"
              lineHeight={1.1}
            >
              Healthcare built around you
            </Text>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="brand.body"
              lineHeight={1.8}
              maxW="560px"
            >
              Our membership-based practice limits enrollment so your physician
              has the time you deserve. Direct access via call, text or video.
              Same-day appointments. Visits that last as long as you need.
            </Text>
            <Flex gap={6} alignItems="center" flexWrap="wrap" justifyContent="center" mt={2}>
              <Button as={Link} to="/team/" variant="primary">
                Meet our team
              </Button>
              <Button
                as={Link}
                to="/services/"
                variant="ghost"
                rightIcon={<Icon as={HiArrowRight} />}
                color="brand.body"
                _hover={{ color: 'brand.evergreen' }}
              >
                Our approach
              </Button>
            </Flex>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default About;
