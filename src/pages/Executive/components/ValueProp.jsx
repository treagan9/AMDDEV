// src/pages/Executive/components/ValueProp.jsx
import {
  Box,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

function ValueProp() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={{ base: 8, md: 10 }}>Healthcare that protects your investment</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={6}>You've invested millions in recruiting, developing and retaining top talent. But when your CEO needs to see a doctor, they're stuck in the same broken system as everyone else. Waiting weeks for appointments, sitting in crowded waiting rooms, getting 10 minutes with a physician who doesn't know them.</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9} mb={{ base: 12, md: 16 }}>That's not just frustrating. It's a business risk.</Text>
          <Box borderLeft="3px solid" borderColor="brand.champagne" pl={{ base: 6, md: 10 }} py={2} mb={{ base: 12, md: 16 }}>
            <Text fontSize={{ base: 'lg', md: 'xl' }} fontFamily="heading" fontWeight={700} color="brand.slate" fontStyle="italic" lineHeight={1.6} mb={4}>Concierge medicine ensures your most important people get immediate access to a physician who knows them, coordinates their care and catches problems before they become crises.</Text>
            <Box w="24px" h="2px" bg="brand.champagne" />
          </Box>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>We've caught early-stage cancers during routine executive physicals. We've prevented heart attacks by noticing subtle changes over time. We've kept executives healthy and performing because their doctor had time to actually care.</Text>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default ValueProp;
