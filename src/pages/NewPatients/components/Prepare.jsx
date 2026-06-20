// src/pages/NewPatients/components/Prepare.jsx
import {
  Box,
  SimpleGrid,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var ITEMS = [
  { title: 'Your medical records', description: 'We\'ll request records from your previous providers but bringing copies of recent labs, imaging and medication lists helps us start faster.' },
  { title: 'Your questions', description: 'Write them down. There\'s no time limit on our conversations so bring everything you\'ve been wanting to ask a doctor.' },
  { title: 'Your medications', description: 'A complete list of everything you take. Prescriptions, supplements, vitamins. Photos of the bottles work great.' }
];

function Prepare() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box ref={ref}>
      <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" overflow="hidden" role="group">
        <Box position="relative" pb={{ base: '50%', md: '30%' }}>
          <Image
            src="/new-patients/prepare.png"
            alt="Preparing for your visit"
            objectFit="cover"
            objectPosition="center"
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            _groupHover={{ transform: 'scale(1.03)' }}
            fallback={
              <Box w="100%" h="100%" bg="brand.mist" display="flex" alignItems="center" justifyContent="center">
                <Text fontSize="sm" color="brand.warmGrayLight">prepare.png (1200x500 wide banner)</Text>
              </Box>
            }
          />
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to top, rgba(27,58,52,0.7) 0%, rgba(27,58,52,0.1) 50%, transparent 100%)" />
        </Box>
      </MotionBox>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.mist">
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} mb={{ base: 10, md: 14 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Before your visit</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>How to prepare</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 10 }}>
            {ITEMS.map(function (item, i) {
              return (
                <MotionBox
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  borderLeft="3px solid"
                  borderColor="brand.champagne"
                  pl={{ base: 5, md: 7 }}
                  py={2}
                >
                  <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" mb={4}>{item.title}</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.85}>{item.description}</Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

export default Prepare;
