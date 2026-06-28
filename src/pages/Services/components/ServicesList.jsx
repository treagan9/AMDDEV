// src/pages/Services/components/ServicesList.jsx
import {
  Box,
  Flex,
  Text,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
 
var MotionBox = motion(Box);
 
var SERVICES = [
  { title: 'Direct access', description: 'Your physician\'s personal cell phone number. Call, text or video chat whenever you need guidance. No answering services, no callbacks, no delays. When something comes up, you reach your doctor directly.', image: '/services/direct-access.webp' },
  { title: 'Preventive care', description: 'Annual executive physicals, advanced lab panels, cancer screenings and personalized wellness plans designed to catch problems before they start. We test beyond the standard panel because early detection changes outcomes.', image: '/services/preventative-care.webp' },
  { title: 'House calls', description: 'We come to your home, office or wherever life takes you. Same quality of care without the waiting room. For busy professionals and families who need healthcare that fits their schedule, not the other way around.', image: '/services/house-calls.webp' },
  { title: 'Executive health', description: 'Comprehensive health programs designed for professionals and leaders who need to perform at their best. Full diagnostics, longevity planning and ongoing optimization. A 3+ hour deep-dive into your complete health picture.', image: '/services/executive-health.webp' },
  { title: 'Specialist coordination', description: 'We manage referrals, share records, follow up on results and ensure nothing falls through the cracks across your entire care team. You never navigate the system alone.', image: '/services/specialist-coordination.webp' },
  { title: 'Travel medicine', description: 'Pre-travel consultations, vaccinations, health kits and 24/7 physician access while you\'re away. Your doctor travels with you. Whether it\'s a weekend trip or a month abroad, your care doesn\'t stop at the airport.', image: '/services/travel.webp' }
];
 
function ServiceSpread({ title, description, image, index }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var isEven = index % 2 === 0;
 
  return (
    <Box ref={ref} w="100%" overflow="hidden">
      <Box display={{ base: 'block', lg: 'none' }}>
        <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" overflow="hidden">
          <Box position="relative" pb="75%">
            <Image src={image} alt={title} objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">{image.split('/').pop()}</Text></Box>} />
            <Box position="absolute" top={0} left={0} right={0} h="40%" bg="linear-gradient(to bottom, rgba(45,45,45,0.28) 0%, transparent 100%)" />
            <Box position="absolute" top={5} left={6}>
              <Text fontFamily="heading" fontSize="md" fontWeight={700} color="white" opacity={0.92}>{String(index + 1).padStart(2, '0')}</Text>
            </Box>
          </Box>
        </MotionBox>
        <Box py={10} px={6} bg="white">
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
            <Flex align="center" gap={3} mb={4}>
              <Box w="20px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{String(index + 1).padStart(2, '0')}</Text>
            </Flex>
            <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="brand.slate" lineHeight={1.12} mb={4}>{title}</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.9}>{description}</Text>
          </MotionBox>
        </Box>
      </Box>
 
      <Flex display={{ base: 'none', lg: 'flex' }} direction={isEven ? 'row' : 'row-reverse'} w="100%" overflow="hidden">
        <Box w="50%" overflow="hidden" position="relative" role="group">
          <MotionBox initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} position="relative" pb="72%">
            <Image src={image} alt={title} objectFit="cover" objectPosition="center" position="absolute" top={0} left={0} w="100%" h="100%" transition="transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)" _groupHover={{ transform: 'scale(1.04)' }} fallback={<Box w="100%" h="100%" bg="#E8E2D8" display="flex" alignItems="center" justifyContent="center"><Text fontSize="sm" color="#B5AD9E">{image.split('/').pop()}</Text></Box>} />
          </MotionBox>
        </Box>
        <Flex w="50%" bg={isEven ? 'white' : 'brand.ivory'} alignItems="center" px={{ lg: 14, xl: 20 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} maxW="480px">
            <Flex align="center" gap={3} mb={5}>
              <Box w="28px" h="1px" bg="brand.champagne" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{String(index + 1).padStart(2, '0')}</Text>
            </Flex>
            <Text fontFamily="heading" fontSize={{ lg: '3xl', xl: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={6}>{title}</Text>
            <Text fontSize={{ lg: 'md', xl: 'lg' }} color="brand.body" lineHeight={1.9}>{description}</Text>
          </MotionBox>
        </Flex>
      </Flex>
    </Box>
  );
}
 
function ServicesList() {
  return (
    <Box w="100%" overflow="hidden">
      {SERVICES.map(function (svc, i) {
        return <ServiceSpread key={svc.title} {...svc} index={i} />;
      })}
    </Box>
  );
}
 
export default ServicesList;
