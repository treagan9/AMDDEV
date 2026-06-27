// src/pages/Team/components/Staff.jsx
import {
  Box,
  SimpleGrid,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.png', description: 'Lauren brings structure and heart to everything behind the scenes. She coordinates physician schedules, manages clinical workflows and ensures every operational detail aligns with the personalized care model our members expect.' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.png', description: 'Jamie oversees the operational infrastructure that allows AnswersMD to deliver exceptional care at scale. With a background in healthcare administration, she focuses on strategic growth initiatives and process optimization.' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.png', description: 'Emma is the first point of contact for our members and often sets the tone for their entire experience. She manages scheduling, coordinates referrals and handles the day-to-day communication that keeps our members cared for.' },
  { name: 'Laura Gore', role: 'Nurse Manager', photo: '/team/laura-gore.png', description: 'Laura leads the clinical side of every patient visit from rooming and vitals to in-office procedures and follow-up coordination. Her clinical experience and calm presence make her a steady anchor of the care team.' },
  { name: 'Sarah Juarez', role: 'Medical Assistant', photo: '/team/sarah-juarez.png', description: 'Sarah supports our physicians and nursing team across every part of the visit. She brings a friendly, attentive presence that helps every patient feel comfortable and heard.' }
];

function StaffMember({ member, delay, inView }) {
  return (
    <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: delay }} textAlign="center">
      <Box w={{ base: '120px', md: '140px' }} h={{ base: '120px', md: '140px' }} borderRadius="full" overflow="hidden" mx="auto" mb={6} border="2px solid" borderColor="#D5D0C8" bg="brand.ivory">
        <Image src={member.photo} alt={member.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
      </Box>
      <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" mb={1}>{member.name}</Text>
      <Text fontSize="md" color="brand.body" fontWeight={500} mb={4}>{member.role}</Text>
      <Text fontSize="md" color="brand.body" lineHeight={1.85}>{member.description}</Text>
    </MotionBox>
  );
}

function Staff() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 12, md: 16 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Behind the scenes</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>The people behind your care</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 12, md: 10 }} mb={{ base: 12, md: 14 }}>
          {STAFF.slice(0, 3).map(function (member, i) {
            return <StaffMember key={member.name} member={member} delay={0.2 + i * 0.1} inView={inView} />;
          })}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 12, md: 10 }} maxW={{ base: '100%', md: '66%' }} mx="auto">
          {STAFF.slice(3).map(function (member, i) {
            return <StaffMember key={member.name} member={member} delay={0.5 + i * 0.1} inView={inView} />;
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Staff;
