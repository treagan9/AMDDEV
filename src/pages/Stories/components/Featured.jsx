// src/pages/Stories/components/Featured.jsx
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var STORIES = [
  {
    category: 'Preventive care',
    headline: 'He caught something my previous doctor missed for years',
    paragraphs: [
      'I\'d been seeing the same doctor for over a decade. Annual physicals, bloodwork, the usual. Everything always came back normal. When I switched to AnswersMD, Dr. Shapiro spent over an hour with me on my first visit. He actually listened. He asked questions no one had asked before.',
      'He noticed a pattern in my labs that had been slowly changing over three years. Nothing flagged as abnormal on any single test but the trend told a story. He ordered additional imaging and we found a small mass that turned out to be early-stage cancer.',
      'I had surgery two months later. No chemo, no radiation. Because we caught it early, my prognosis is excellent. I think about what would have happened if I\'d stayed in the old system getting my 10-minute annual checkups. I don\'t think anyone would have noticed until it was too late.'
    ],
    attribution: 'Michael T.',
    detail: 'Tampa member since 2025'
  },
  {
    category: 'Access and availability',
    headline: 'At 2am, I didn\'t have to make a decision alone',
    paragraphs: [
      'My daughter woke up in the middle of the night with a fever of 104. She was lethargic, not responding normally. Every parent knows that terror. Do I rush to the ER? Wait until morning? Give her Tylenol and hope?',
      'I texted Dr. Meriwether at 2:15am. He called me back within five minutes. He walked me through what to look for, asked specific questions about her symptoms and helped me understand what was likely happening. He stayed on the phone while I checked on her again.',
      'Based on what he heard, he was confident it was a viral infection that would resolve on its own. He told me exactly what warning signs would mean we needed to go to the ER and what would be okay to wait. He checked in again at 7am. By then her fever had broken.',
      'I didn\'t have to sit in an emergency room for six hours with a sick child. I didn\'t have to second-guess myself all night. I had a doctor who knew my daughter, who answered his phone and who gave me the guidance I needed when I needed it most.'
    ],
    attribution: 'Jennifer R.',
    detail: 'St. Petersburg member since 2025'
  },
  {
    category: 'Coordinated care',
    headline: 'For the first time, someone was actually managing my health',
    paragraphs: [
      'After my heart attack, I had a cardiologist, an endocrinologist for my diabetes, a nephrologist watching my kidneys and my regular doctor. None of them talked to each other. I was the one trying to keep track of which medication came from which doctor, which appointments were for what, whether the new prescription from one doctor would interact with something another prescribed.',
      'When I joined AnswersMD, everything changed. Dr. Shapiro became the central point for all of it. He coordinated with every specialist. He reviewed every medication. He caught a potential interaction that none of the specialists had noticed because none of them had the full picture.',
      'Now when I see a specialist, they send their notes to Dr. Shapiro. He calls me after every appointment to make sure I understand what happened and what it means. I finally feel like someone is actually managing my health instead of just treating individual problems.'
    ],
    attribution: 'Robert K.',
    detail: 'Boca Raton member since 2025'
  }
];

function StorySpread({ story, index }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var isEven = index % 2 === 0;

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg={isEven ? 'white' : 'brand.ivory'} ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 20 }}>
            <Box w={{ base: '100%', lg: '380px' }} flexShrink={0}>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={5}>{story.category}</Text>
              <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} fontStyle="italic" mb={8}>"{story.headline}"</Text>
              <Box display={{ base: 'none', lg: 'block' }}>
                <Box w="32px" h="2px" bg="brand.champagne" mb={4} />
                <Text fontSize="md" fontWeight={600} color="brand.slate">{story.attribution}</Text>
                <Text fontSize="md" color="brand.bodyLight">{story.detail}</Text>
              </Box>
            </Box>
            <Box flex={1}>
              {story.paragraphs.map(function (p, i) {
                return (
                  <Text key={i} fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={i < story.paragraphs.length - 1 ? 5 : 0}>{p}</Text>
                );
              })}
              <Box display={{ base: 'block', lg: 'none' }} mt={8}>
                <Box w="32px" h="2px" bg="brand.champagne" mb={4} />
                <Text fontSize="md" fontWeight={600} color="brand.slate">{story.attribution}</Text>
                <Text fontSize="md" color="brand.bodyLight">{story.detail}</Text>
              </Box>
            </Box>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  );
}

function Featured() {
  return (
    <Box>
      {STORIES.map(function (story, i) {
        return <StorySpread key={story.attribution} story={story} index={i} />;
      })}
    </Box>
  );
}

export default Featured;
