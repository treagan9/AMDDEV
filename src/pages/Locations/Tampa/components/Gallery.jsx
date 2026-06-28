// src/pages/Locations/Tampa/components/Gallery.jsx
import {
  Box,
  Grid,
  GridItem,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
var ROW_1 = [
  '/locations/tampa-office-1.png',
  '/locations/tampa-office-2.png',
  '/locations/tampa-office-3.png'
];
 
var ROW_2 = [
  '/locations/tampa-office-4.png',
  '/locations/tampa-office-5.png',
  '/locations/tampa-office-6.png'
];
 
function GalleryImage({ src, delay, inView }) {
  return (
    <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: delay }} position="relative" overflow="hidden" role="group">
      <Box position="relative" pb="75%" overflow="hidden">
        <Image src={src} alt="AnswersMD Tampa" objectFit="cover" position="absolute" top={0} left={0} w="100%" h="100%" transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" _groupHover={{ transform: 'scale(1.04)' }} />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="rgba(27,58,52,0.06)" transition="background 0.4s ease" _groupHover={{ bg: 'rgba(27,58,52,0.12)' }} />
      </Box>
    </MotionBox>
  );
}
 
function Gallery() {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
 
  return (
    <Box ref={ref} bg="white">
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={0}>
        {ROW_1.map(function (src, i) {
          return <GridItem key={src}><GalleryImage src={src} delay={i * 0.1} inView={inView} /></GridItem>;
        })}
      </Grid>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={0}>
        {ROW_2.map(function (src, i) {
          return <GridItem key={src}><GalleryImage src={src} delay={0.3 + i * 0.1} inView={inView} /></GridItem>;
        })}
      </Grid>
    </Box>
  );
}
 
export default Gallery;
