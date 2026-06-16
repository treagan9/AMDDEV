// src/pages/Team/index.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Button,
  Icon
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineLocationMarker, HiOutlineUserGroup, HiArrowRight } from 'react-icons/hi';

var MotionBox = motion(Box);

var PHYSICIANS = [
  {
    name: 'Douglas Shapiro, DO',
    displayName: 'Dr. Douglas Shapiro',
    subtitle: 'Founder & Lead Physician',
    credentials: 'DABFM',
    board: 'Board Certified Family Medicine',
    photo: '/team/dr-doug-shapiro.png',
    location: 'Tampa, FL',
    patients: 'Adults & Families',
    bio: 'Dr. Douglas Shapiro founded AnswersMD with a vision to deliver healthcare the way it should be: personal, unhurried and built on real relationships. With over 6 years of experience in family medicine, he brings deep clinical expertise along with a genuine commitment to knowing each patient as an individual. Dr. Shapiro believes medicine works best when your doctor knows your story, not just your chart. That belief drives everything about how AnswersMD operates.'
  },
  {
    name: 'Drew Meriwether, MD',
    displayName: 'Dr. Drew Meriwether',
    subtitle: 'Pediatric & Internal Medicine',
    credentials: 'FAAP, DABIM',
    board: 'Board Certified Pediatrics & Internal Medicine',
    photo: '/team/dr-drew-meriwether.png',
    location: 'Tampa, FL',
    patients: 'All Ages',
    bio: "Dr. Drew Meriwether, a USF Health Clinician of the Year, brings exceptional versatility with dual board certifications in Pediatrics and Internal Medicine, a rare combination that allows him to provide seamless care for entire families, from newborns to grandparents. His training across both specialties means fewer referrals, better coordination and a physician who understands how a child's health history connects to their care as an adult. Dr. Meriwether joined AnswersMD because he shares the same commitment to relationship-driven medicine."
  },
  {
    name: "Divino D'Alessio Jr., MD",
    displayName: "Dr. Divino D'Alessio Jr.",
    subtitle: 'Sports & Family Medicine',
    credentials: 'ABFM',
    board: 'Board Certified Family Medicine + Sports Medicine',
    photo: '/team/dr-divino-dalessio.png',
    location: 'Boca Raton, FL',
    patients: 'Active Adults & Athletes',
    bio: "Dr. Divino D'Alessio Jr. brings a rare combination to AnswersMD: board-certified Family Medicine paired with advanced Sports Medicine training. He has served as team physician for NCAA Division I athletes at Coastal Carolina University and provided sideline coverage for regional high school programs. His clinical focus includes diagnostic musculoskeletal ultrasound, ultrasound-guided procedures, concussion management and return-to-play protocols. At AnswersMD Boca Raton, he delivers that same athletic-medicine precision to active adults, athletes and families who want evidence-based care centered on performance, prevention and long-term health."
  },
  {
    name: 'Ellen Howard, MD, MPH',
    displayName: 'Dr. Ellen Howard',
    subtitle: 'Family & Preventive Medicine',
    credentials: 'ABFM, MPH',
    board: 'Board Certified Family Medicine',
    photo: '/team/dr-ellen-howard.png',
    location: 'St. Petersburg, FL',
    patients: 'Women, Men & Families',
    bio: "Dr. Ellen Howard believes good medicine starts with knowing the person in front of you. A board-certified family physician with a Master's in Public Health, she brings a preventive, community-minded approach to concierge family medicine. She completed her Family Medicine residency in St. Petersburg and is proud to return to the community she considers home. Her clinical interests center on hormone therapy, weight management and GLP-1 therapy, and preventive lifestyle medicine."
  }
];

var STAFF = [
  {
    name: 'Lauren Shapiro',
    title: 'Chief of Staff',
    photo: '/team/lauren-shapiro.png',
    description: 'Lauren brings structure and heart to everything behind the scenes. She coordinates physician schedules, manages clinical workflows and ensures every operational detail aligns with the personalized care model our members expect.'
  },
  {
    name: 'Jamie Barber, MBA',
    title: 'Director of Operations',
    photo: '/team/jamie-barber.png',
    description: 'Jamie oversees the operational infrastructure that allows AnswersMD to deliver exceptional care at scale. With a background in healthcare administration, she focuses on strategic growth initiatives and process optimization.'
  },
  {
    name: 'Emma Maddox',
    title: 'Patient Coordinator',
    photo: '/team/emma-maddox.png',
    description: 'Emma is the first point of contact for our members and often sets the tone for their entire experience. She manages scheduling, coordinates referrals and handles the day-to-day communication that keeps our members informed and cared for.'
  },
  {
    name: 'Laura Gore',
    title: 'Nurse Manager',
    photo: '/team/laura-gore.png',
    description: 'Laura leads the clinical side of every patient visit, from rooming and vitals to in-office procedures and follow-up coordination. Her clinical experience and calm presence make her a steady anchor of the AnswersMD care team.'
  },
  {
    name: 'Sarah Juarez',
    title: 'Medical Assistant',
    photo: '/team/sarah-juarez.png',
    description: "Sarah supports our physicians and nursing team across every part of the visit. She's often one of the first faces our members see and she brings a friendly, attentive presence that helps every patient feel comfortable and heard."
  }
];

function PhysicianCard({ physician, index }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  var isEven = index % 2 === 0;

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      py={{ base: 8, md: 12 }}
      borderBottom="1px solid"
      borderColor="brand.borderLight"
    >
      <Flex
        direction={{ base: 'column', lg: isEven ? 'row' : 'row-reverse' }}
        gap={{ base: 8, lg: 14 }}
        align="flex-start"
      >
        <Box
          w={{ base: '100%', lg: '340px' }}
          flexShrink={0}
        >
          <Box
            borderRadius="image"
            overflow="hidden"
            bg="brand.mist"
            h={{ base: '400px', md: '440px' }}
          >
            <Image
              src={physician.photo}
              alt={physician.displayName}
              objectFit="cover"
              objectPosition="top"
              w="100%"
              h="100%"
            />
          </Box>
        </Box>

        <VStack align="flex-start" spacing={5} flex={1} py={{ base: 0, lg: 4 }}>
          <Box>
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="2px"
              textTransform="uppercase"
              color="brand.champagne"
              mb={2}
            >
              {physician.subtitle}
            </Text>
            <Text
              as="h2"
              fontFamily="heading"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight={700}
              color="brand.slate"
              lineHeight={1.15}
            >
              {physician.name}
            </Text>
          </Box>

          <HStack spacing={2} flexWrap="wrap">
            <Badge
              bg="brand.champagneSoft"
              color="brand.champagneDark"
              fontSize="xs"
              fontWeight={600}
              px={3}
              py={1}
              borderRadius="btn"
              letterSpacing="0.5px"
            >
              {physician.board}
            </Badge>
          </HStack>

          <Text fontSize="md" color="brand.body" lineHeight={1.85}>
            {physician.bio}
          </Text>

          <HStack spacing={6} pt={2} flexWrap="wrap">
            <HStack spacing={2}>
              <Icon as={HiOutlineLocationMarker} boxSize={4} color="brand.champagne" />
              <Text fontSize="sm" color="brand.bodyLight">{physician.location}</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={HiOutlineUserGroup} boxSize={4} color="brand.champagne" />
              <Text fontSize="sm" color="brand.bodyLight">{physician.patients}</Text>
            </HStack>
          </HStack>
        </VStack>
      </Flex>
    </MotionBox>
  );
}

function StaffCard({ member, delay }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
      textAlign="center"
    >
      <Box
        w={{ base: '140px', md: '160px' }}
        h={{ base: '140px', md: '160px' }}
        borderRadius="full"
        overflow="hidden"
        mx="auto"
        mb={5}
        border="2px solid"
        borderColor="brand.borderLight"
        bg="brand.mist"
      >
        <Image
          src={member.photo}
          alt={member.name}
          objectFit="cover"
          objectPosition="top"
          w="100%"
          h="100%"
        />
      </Box>
      <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={1}>
        {member.name}
      </Text>
      <Text fontSize="sm" fontWeight={500} color="brand.champagne" mb={4}>
        {member.title}
      </Text>
      <Text fontSize="sm" color="brand.body" lineHeight={1.8} maxW="280px" mx="auto">
        {member.description}
      </Text>
    </MotionBox>
  );
}

function Team() {
  var [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <Helmet>
        <title>Our Team | AnswersMD</title>
        <meta name="description" content="Meet the physicians and staff behind AnswersMD. Board-certified doctors delivering personalized concierge medicine in Tampa, St. Petersburg and Boca Raton." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }} ref={heroRef}>
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            textAlign="center"
            maxW="720px"
            mx="auto"
          >
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="2px"
              textTransform="uppercase"
              color="brand.champagne"
              mb={5}
            >
              Our team
            </Text>
            <Text
              as="h1"
              fontFamily="heading"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight={700}
              color="brand.slate"
              lineHeight={1.08}
              mb={6}
            >
              Relationships built on trust, not time limits.
            </Text>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="brand.body"
              lineHeight={1.8}
              maxW="560px"
              mx="auto"
            >
              Our physicians chose concierge medicine to practice the way they always
              envisioned, with the time and attention your health deserves.
            </Text>
          </MotionBox>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <Text
            fontSize="xs"
            fontWeight={600}
            letterSpacing="2px"
            textTransform="uppercase"
            color="brand.champagne"
            mb={10}
            textAlign="center"
          >
            Our physicians
          </Text>
          <Box maxW="1100px" mx="auto">
            {PHYSICIANS.map(function (physician, i) {
              return (
                <PhysicianCard
                  key={physician.name}
                  physician={physician}
                  index={i}
                />
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <VStack spacing={4} textAlign="center" mb={{ base: 12, md: 16 }}>
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="2px"
              textTransform="uppercase"
              color="brand.champagne"
            >
              Our team
            </Text>
            <Text
              as="h2"
              fontFamily="heading"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight={700}
              color="brand.slate"
              lineHeight={1.1}
            >
              The people behind your care
            </Text>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="brand.body"
              lineHeight={1.8}
              maxW="560px"
            >
              Our dedicated staff ensures your experience with AnswersMD is seamless
              from start to finish.
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 12, md: 14 }}
            maxW="960px"
            mx="auto"
          >
            {STAFF.slice(0, 3).map(function (member, i) {
              return <StaffCard key={member.name} member={member} delay={0.1 + i * 0.1} />;
            })}
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 12, md: 14 }}
            maxW="640px"
            mx="auto"
            mt={{ base: 12, md: 14 }}
          >
            {STAFF.slice(3).map(function (member, i) {
              return <StaffCard key={member.name} member={member} delay={0.4 + i * 0.1} />;
            })}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <VStack spacing={7} textAlign="center" maxW="600px" mx="auto">
            <Box w="32px" h="1px" bg="brand.champagne" />
            <Text
              as="h2"
              fontFamily="heading"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight={700}
              color="brand.slate"
              lineHeight={1.1}
            >
              Ready to meet your care team?
            </Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.8}>
              Schedule a consultation to learn how AnswersMD can transform
              your healthcare experience.
            </Text>
            <Button as={Link} to="/contact/" variant="primary" size="lg">
              Schedule your consultation
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default Team;
