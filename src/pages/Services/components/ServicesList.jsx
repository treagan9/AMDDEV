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
  { title: 'Direct access', description: 'Your physician\'s personal cell phone number. Call, text or video chat whenever you need guidance. No answering services, no callbacks, no delays. When something comes up, you reach your doctor directly.', image: '/services/service-access.png' },
  { title: 'Preventive care', description: 'Annual executive physicals, advanced lab panels, cancer screenings and personalized wellness plans designed to catch problems before they start. We test beyond the standard panel because early detection changes outcomes.', image: '/services/service-preventive.png' },
  { title: 'House calls', description: 'We come to your home, office or wherever life takes you. Same quality of care without the waiting room. For busy professionals and families who need healthcare that fits their schedule, not the other way around.', image: '/services/service-housecalls.png' },
  { title: 'Executive health', description: 'Comprehensive health programs designed for professionals and leaders who need to perform at their best. Full diagnostics, longevity planning and ongoing optimization. A 3+ hour deep-dive into your complete health picture.', image: '/services/service-executive.png' },
  { title: 'Specialist coordination', description: 'We manage referrals, share records, follow up on results and ensure nothing falls through the cracks across your entire care team. You never navigate the system alone.', image: '/services/service-coordination.png' },
  { title: 'Travel medicine', description: 'Pre-travel consultations, vaccinations, health kits and 24/7 physician access while you\'re away. Your doctor travels with you. Whether it\'s a weekend trip or a month abroad, your care doesn\'t stop at the airport.', image: '/services/service-travel.png' }
];

function ServiceSpread({ title, description, image, index }) {
  var [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var isEven = index % 2 === 0;

  return (
    <Box ref={ref}>
      <Box display={{ base: 'block', lg: 'none' }}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          position="relative"
          overflow="hidden"
          role="group"
        >
          <Box position="relative" pb="75%">
            <Image
              src={image}
              alt={title}
              objectFit="cover"
              objectPosition="center"
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              fallback={
                <Box w="100%" h="100%" bg="brand.mist" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="sm" color="brand.warmGrayLight">{image.split('/').pop()}</Text>
                </Box>
              }
            />
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="rgba(27,58,52,0.06)" />
          </Box>
        </MotionBox>
        <Box py={12} px={6} bg={isEven ? 'white' : 'brand.ivory'}>
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
            <Text fontFamily="heading" fontSize="2xl" fontWeight={700} color="brand.slate" lineHeight={1.12} mb={5}>{title}</Text>
            <Text fontSize="md" color="brand.body" lineHeight={1.9}>{description}</Text>
          </MotionBox>
        </Box>
      </Box>

      <Flex display={{ base: 'none', lg: 'flex' }} direction={isEven ? 'row' : 'row-reverse'}>
        <Box w="50%" position="relative" overflow="hidden" role="group">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            position="relative"
            pb="75%"
          >
            <Image
              src={image}
              alt={title}
              objectFit="cover"
              objectPosition="center"
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              _groupHover={{ transform: 'scale(1.04)' }}
              fallback={
                <Box w="100%" h="100%" bg="brand.mist" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="sm" color="brand.warmGrayLight">{image.split('/').pop()}</Text>
                </Box>
              }
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(27,58,52,0.06)"
              transition="background 0.4s ease"
              _groupHover={{ bg: 'rgba(27,58,52,0.12)' }}
            />
          </MotionBox>
        </Box>
        <Flex w="50%" bg={isEven ? 'white' : 'brand.ivory'} alignItems="center" px={{ lg: 14, xl: 20 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} maxW="480px">
            <Text fontFamily="heading" fontSize={{ lg: '3xl', xl: '4xl' }} fontWeight={700} color="brand.slate" lineHeight={1.12} mb={6}>{title}</Text>
            <Text fontSize="lg" color="brand.body" lineHeight={1.9}>{description}</Text>
          </MotionBox>
        </Flex>
      </Flex>
    </Box>
  );
}

function ServicesList() {
  return (
    <Box>
      {SERVICES.map(function (svc, i) {
        return <ServiceSpread key={svc.title} {...svc} index={i} />;
      })}
    </Box>
  );
}

export default ServicesList;
