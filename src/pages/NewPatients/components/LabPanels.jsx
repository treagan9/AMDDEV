// src/pages/NewPatients/components/LabPanels.jsx
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var PANELS = [
  { name: 'Complete blood count', description: 'Red cells, white cells, platelets, hemoglobin and hematocrit' },
  { name: 'Comprehensive metabolic panel', description: 'Liver function, kidney function, electrolytes and glucose' },
  { name: 'Advanced lipid panel', description: 'Beyond standard cholesterol to particle size and density profiles' },
  { name: 'Complete thyroid panel', description: 'TSH, Free T3, Free T4 and thyroid antibodies' },
  { name: 'Hemoglobin A1c', description: 'Average blood sugar, screening for pre-diabetes and diabetes' },
  { name: 'Inflammatory markers', description: 'CRP and inflammation indicators linked to chronic disease risk' },
  { name: 'Vitamin and mineral panel', description: 'D, B12, iron, magnesium and other essential nutrients' },
  { name: 'Hormone assessment', description: 'Testosterone, estrogen, cortisol and DHEA levels' },
  { name: 'Cancer markers', description: 'PSA, CEA and other age-appropriate cancer screenings' }
];

function LabPanels() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white" ref={ref}>
      <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} mb={{ base: 10, md: 14 }}>
          <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Comprehensive testing</Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4} maxW="600px">We don't guess. We test.</Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.8} maxW="560px">Your welcome visit includes an extensive panel of laboratory tests that goes far beyond the standard annual physical.</Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={0}>
          {PANELS.map(function (panel, i) {
            var row = Math.floor(i / 3);
            var col = i % 3;
            return (
              <MotionBox
                key={panel.name}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                py={{ base: 6, md: 8 }}
                pr={{ base: 0, md: 8 }}
                pl={{ base: 0, md: col > 0 ? 8 : 0 }}
                borderTop={row > 0 || (row === 0 && col > 0) ? { base: '1px solid', md: row > 0 ? '1px solid' : 'none' } : 'none'}
                borderLeft={{ base: 'none', md: col > 0 ? '1px solid' : 'none' }}
                borderColor="brand.borderLight"
                borderTopColor={{ base: 'brand.borderLight', md: 'brand.borderLight' }}
              >
                <Box borderTop={{ base: 'none', md: row === 0 ? '3px solid' : 'none' }} borderColor="brand.champagne" pt={{ base: 0, md: row === 0 ? 6 : 0 }}>
                  <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="brand.slate" mb={3}>{panel.name}</Text>
                  <Text fontSize="md" color="brand.body" lineHeight={1.8}>{panel.description}</Text>
                </Box>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default LabPanels;
