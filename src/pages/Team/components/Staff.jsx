// src/pages/Team/components/Staff.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STAFF = [
  { name: 'Lauren Shapiro', role: 'Chief of Staff', photo: '/team/lauren-shapiro.webp', description: 'Lauren brings structure and heart to everything behind the scenes. She coordinates physician schedules, manages clinical workflows and ensures every operational detail aligns with the personalized care model our members expect. Her attention to detail keeps the practice running at the highest level.' },
  { name: 'Jamie Barber, MBA', role: 'Director of Operations', photo: '/team/jamie-barber.webp', description: 'Jamie oversees the operational infrastructure that allows AnswersMD to deliver exceptional care at scale. With a background in healthcare administration, she focuses on strategic growth initiatives, process optimization and expanding our capacity to serve more families without compromising the concierge experience that defines us.' },
  { name: 'Emma Maddox', role: 'Patient Coordinator', photo: '/team/emma-maddox.webp', description: 'Emma is the first point of contact for our members and often sets the tone for their entire experience. She manages scheduling, coordinates referrals and handles the day-to-day communication that keeps our members informed and cared for. Her warmth and responsiveness reflect the standard we hold ourselves to.' },
  { name: 'Laura Gore', role: 'Nurse Manager', photo: '/team/laura-gore.webp', description: 'Laura leads the clinical side of every patient visit, from rooming and vitals to in-office procedures and follow-up coordination. She partners closely with our physicians to ensure care is delivered with the precision, warmth and attention to detail our members count on. Her clinical experience and calm presence make her a steady anchor of the care team.' },
  { name: 'Sarah Juarez', role: 'Medical Assistant', photo: '/team/sarah-juarez.webp', description: 'Sarah supports our physicians and nursing team across every part of the visit, from rooming and intake to point-of-care testing and procedure prep. She is often one of the first faces our members see and she brings a friendly, attentive presence that helps every patient feel comfortable and heard from the moment they walk in.' }
];

function StaffCard({ member, inView, delay }) {
  return (
    <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: delay }}>
      <Flex direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} align={{ base: 'flex-start', md: 'center' }}>
        <Box w={{ base: '80px', md: '160px' }} h={{ base: '80px', md: '160px' }} borderRadius="full" overflow="hidden" flexShrink={0} mb={{ base: 0, md: 6 }} border="2px solid" borderColor="#D5D0C8" bg="#F0EDE8">
          <Image src={member.photo} alt={member.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
        </Box>
        <Box textAlign={{ base: 'left', md: 'center' }}>
          <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" mb={1}>{member.name}</Text>
          <Text fontSize="sm" color="brand.champagne" fontWeight={600} mb={{ base: 3, md: 4 }}>{member.role}</Text>
          <Text fontSize="md" color="brand.body" lineHeight={1.85} display={{ base: 'none', md: 'block' }}>{member.description}</Text>
        </Box>
      </Flex>
      <Text fontSize="md" color="brand.body" lineHeight={1.85} display={{ base: 'block', md: 'none' }} mt={3}>{member.description}</Text>
    </MotionBox>
  );
}

function Staff() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} textAlign="center" mb={{ base: 12, md: 16 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Our team</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>The people behind your care</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="520px" mx="auto">Our dedicated staff ensures your experience with AnswersMD is seamless from start to finish.</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 10 }} mb={{ base: 10, md: 14 }}>
          {STAFF.slice(0, 3).map(function (member, i) {
            return <StaffCard key={member.name} member={member} inView={inView} delay={0.1 + i * 0.1} />;
          })}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 10 }} maxW={{ base: '100%', md: '66%' }} mx="auto">
          {STAFF.slice(3).map(function (member, i) {
            return <StaffCard key={member.name} member={member} inView={inView} delay={0.4 + i * 0.1} />;
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Staff;
