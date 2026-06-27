// src/pages/Team/components/Physicians.jsx
import {
  Box,
  Flex,
  VStack,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var PHYSICIANS = [
  {
    name: 'Douglas Shapiro, DO',
    role: 'Founder and Lead Physician',
    credentials: 'Board Certified Family Medicine',
    location: 'Tampa, FL',
    photo: '/team/dr-doug-shapiro.png',
    bio: 'Dr. Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be. Personal, unhurried and built on real relationships. With over 6 years of experience in family medicine, he brings deep clinical expertise along with a genuine commitment to knowing each patient as an individual. Dr. Shapiro believes medicine works best when your doctor knows your story, not just your chart. That belief drives everything about how AnswersMD operates.'
  },
  {
    name: 'Drew Meriwether, MD',
    role: 'Pediatric and Internal Medicine',
    credentials: 'Board Certified Pediatrics and Internal Medicine',
    location: 'Tampa, FL',
    photo: '/team/dr-drew-meriwether.png',
    bio: 'A USF Health Clinician of the Year, Dr. Meriwether brings exceptional versatility with dual board certifications in Pediatrics and Internal Medicine. A rare combination that allows him to provide seamless care for entire families from newborns to grandparents. His training across both specialties means fewer referrals, better coordination and a physician who understands how a child\'s health history connects to their care as an adult.'
  },
  {
    name: "Divino D'Alessio Jr., MD",
    role: 'Sports and Family Medicine',
    credentials: 'Board Certified Family Medicine and Sports Medicine',
    location: 'Boca Raton, FL',
    photo: '/team/dr-divino-dalessio.png',
    bio: "Dr. D'Alessio brings board-certified Family Medicine paired with advanced Sports Medicine training. He has served as team physician for NCAA Division I athletes at Coastal Carolina University and provided sideline coverage for regional high school programs. His clinical focus includes diagnostic musculoskeletal ultrasound, ultrasound-guided procedures and concussion management. He delivers athletic-medicine precision to active adults, athletes and families who want evidence-based care centered on performance, prevention and long-term health."
  },
  {
    name: 'Ellen Howard, MD, MPH',
    role: 'Family and Preventive Medicine',
    credentials: 'Board Certified Family Medicine',
    location: 'St. Petersburg, FL',
    photo: '/team/dr-ellen-howard.png',
    bio: "Dr. Howard believes good medicine starts with knowing the person in front of you. A board-certified family physician with a Master's in Public Health, she brings a preventive, community-minded approach to concierge family medicine. She completed her residency in St. Petersburg and is proud to return to the community she considers home. Her clinical interests center on hormone therapy, weight management and GLP-1 therapy, and preventive lifestyle medicine."
  }
];

function PhysicianSpread({ physician, index }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var isEven = index % 2 === 0;

  return (
    <Box ref={ref} py={{ base: 'sectionMobile', md: 'section' }} bg={isEven ? 'white' : 'brand.ivory'}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Flex
            direction={{ base: 'column', lg: isEven ? 'row' : 'row-reverse' }}
            gap={{ base: 10, lg: 14 }}
            alignItems={{ base: 'stretch', lg: 'center' }}
          >
            <Box w={{ base: '100%', lg: '380px' }} flexShrink={0}>
              <Box position="relative" pb="130%" borderRadius="image" overflow="hidden" bg="brand.mist">
                <Image src={physician.photo} alt={physician.name} objectFit="cover" objectPosition="top" position="absolute" top={0} left={0} w="100%" h="100%" />
              </Box>
            </Box>
            <VStack align="flex-start" spacing={5} flex={1} py={{ base: 0, lg: 4 }}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{physician.role}</Text>
              <Text as="h2" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12}>{physician.name}</Text>
              <Text fontSize="md" fontWeight={500} color="brand.bodyLight">{physician.credentials}</Text>
              <Box w="32px" h="2px" bg="brand.champagne" my={1} />
              <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>{physician.bio}</Text>
              <Text fontSize="md" color="brand.champagne" fontWeight={500} pt={2}>{physician.location}</Text>
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
