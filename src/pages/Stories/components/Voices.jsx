// src/pages/Stories/components/Voices.jsx
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var TESTIMONIALS = [
  { quote: 'I never realized how broken my healthcare was until I experienced what it\'s supposed to be like. Same-day appointments, a doctor who remembers me, actual time to talk. This is how medicine should work.', name: 'Sarah L.', since: 'Member since 2025' },
  { quote: 'As a business owner, my time is valuable. Waiting three weeks for an appointment or sitting in a waiting room for an hour isn\'t an option. With AnswersMD, I\'m seen when I need to be seen.', name: 'David M.', since: 'Member since 2025' },
  { quote: 'Having our whole family with one doctor who knows all of us has been incredible. He knows our history, our genetics, our concerns. It\'s not just healthcare. It\'s a relationship.', name: 'Amanda M.', since: 'Member since 2025' },
  { quote: 'I travel constantly for work. Knowing I can text my doctor from anywhere in the world and get a real answer within minutes gives me peace of mind I never had before.', name: 'James W.', since: 'Member since 2025' },
  { quote: 'My mother is 82 and has multiple health issues. Dr. Shapiro has made house calls, coordinated all her specialists and treats her with such dignity. We couldn\'t manage her care without him.', name: 'Lisa H.', since: 'Member since 2025' },
  { quote: 'The annual physical alone is worth the membership. It\'s thorough in a way I\'ve never experienced. My doctor spends real time with me, explains everything and follows up on every detail.', name: 'Chris P.', since: 'Member since 2025' }
];

function Voices() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist" ref={ref}>
      <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} textAlign="center" mb={{ base: 10, md: 14 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Member voices</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>More from our members</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {TESTIMONIALS.map(function (t, i) {
            return (
              <MotionBox key={t.name} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }} bg="white" py={{ base: 8, md: 10 }} px={{ base: 7, md: 8 }} borderRadius="card" display="flex" flexDirection="column" justifyContent="space-between">
                <Box mb={8}>
                  <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="brand.champagne" lineHeight={1} mb={4}>"</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.85} fontStyle="italic">{t.quote}</Text>
                </Box>
                <Box>
                  <Box w="24px" h="2px" bg="brand.champagne" mb={3} />
                  <Text fontSize="md" fontWeight={600} color="brand.slate">{t.name}</Text>
                  <Text fontSize="sm" color="brand.bodyLight">{t.since}</Text>
                </Box>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Voices;
