// src/pages/Team/components/Physicians.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight } from 'react-icons/hi';

var MotionBox = motion(Box);

var PHYSICIANS = [
  { name: 'Douglas Shapiro, DO', role: 'Founder and Lead Physician', credentials: 'Board Certified Family Medicine', location: 'Tampa, FL', photo: '/team/dr-doug-shapiro.webp', slug: 'dr-doug-shapiro', bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be. Personal, unhurried and built on real relationships. With over 6 years of experience in family medicine, he brings deep clinical expertise along with a genuine commitment to knowing each patient as an individual.' },
  { name: 'Drew Meriwether, MD', role: 'Pediatric and Internal Medicine', credentials: 'Board Certified Pediatrics and Internal Medicine', location: 'Tampa, FL', photo: '/team/dr-drew-meriwether.webp', slug: 'dr-drew-meriwether', bio: 'A USF Health Clinician of the Year, Dr. Meriwether brings exceptional versatility with dual board certifications in Pediatrics and Internal Medicine. A rare combination that allows him to provide seamless care for entire families from newborns to grandparents.' },
  { name: "Divino D'Alessio Jr., MD", role: 'Sports and Family Medicine', credentials: 'Board Certified Family Medicine and Sports Medicine', location: 'Boca Raton, FL', photo: '/team/dr-divino-dalessio.webp', slug: 'dr-divino-dalessio', bio: "Dr. D'Alessio brings board-certified Family Medicine paired with advanced Sports Medicine training. He has served as team physician for NCAA Division I athletes at Coastal Carolina University and provided sideline coverage for regional high school programs." },
  { name: 'Ellen Howard, MD, MPH', role: 'Family and Preventive Medicine', credentials: 'Board Certified Family Medicine', location: 'St. Petersburg, FL', photo: '/team/dr-ellen-howard.webp', slug: 'dr-ellen-howard', bio: "Dr. Howard believes good medicine starts with knowing the person in front of you. A board-certified family physician with a Master's in Public Health, she brings a preventive, community-minded approach to concierge family medicine." }
];

function PhysicianSpread({ physician, index }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var isEven = index % 2 === 0;

  return (
    <Box ref={ref} py={{ base: 'sectionMobile', md: 'section' }} bg={isEven ? 'white' : 'brand.ivory'}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
          <Flex direction={{ base: 'column', lg: isEven ? 'row' : 'row-reverse' }} gap={{ base: 8, lg: 14 }} alignItems={{ base: 'stretch', lg: 'center' }}>
            <Box w={{ base: '100%', lg: '380px' }} flexShrink={0}>
              <ChakraLink as={Link} to={'/team/' + physician.slug + '/'} display="block" role="group">
                <Box position="relative" pb="130%" borderRadius="image" overflow="hidden" bg="#F0EDE8" _groupHover={{ shadow: '0 16px 44px rgba(0,0,0,0.09)' }} transition="box-shadow 0.3s ease">
                  <Image src={physician.photo} alt={physician.name} objectFit="cover" objectPosition="top" position="absolute" top={0} left={0} w="100%" h="100%" transition="transform 0.6s ease" _groupHover={{ transform: 'scale(1.03)' }} />
                </Box>
              </ChakraLink>
            </Box>
            <VStack align="flex-start" spacing={5} flex={1} py={{ base: 0, lg: 4 }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="#C4A265">{physician.role}</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="#2D2D2D" lineHeight={1.12}>{physician.name}</Text>
              <Text fontSize="md" fontWeight={500} color="#5C5650">{physician.credentials}</Text>
              <Box w="32px" h="2px" bg="#C4A265" my={1} />
              <Text fontSize={{ base: 'md', md: 'lg' }} color="#3D3832" lineHeight={1.9}>{physician.bio}</Text>
              <Flex align="center" justify="space-between" w="100%" pt={2} flexWrap="wrap" gap={3}>
                <Text fontSize="md" color="#C4A265" fontWeight={500}>{physician.location}</Text>
                <ChakraLink as={Link} to={'/team/' + physician.slug + '/'} fontSize="sm" fontWeight={600} color="#2D2D2D" display="flex" alignItems="center" gap={2} _hover={{ color: '#C4A265' }} transition="color 0.2s ease">
                  Full profile
                  <Icon as={HiArrowRight} boxSize={4} />
                </ChakraLink>
              </Flex>
            </VStack>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  );
}

function Physicians() {
  return (
    <Box>
      {PHYSICIANS.map(function (doc, i) {
        return <PhysicianSpread key={doc.name} physician={doc} index={i} />;
      })}
    </Box>
  );
}

export default Physicians;
