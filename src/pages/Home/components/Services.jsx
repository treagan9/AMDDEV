// src/pages/Home/components/Services.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Button,
  Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

var MotionBox = motion(Box);

var SERVICES = [
  { title: '24/7 direct access', description: 'Reach your physician anytime via call, text or video. No answering services, no callbacks.' },
  { title: 'Preventive care', description: 'Comprehensive annual exams, advanced screenings and personalized wellness plans.' },
  { title: 'House calls', description: "When you can't come to us, we come to you. Your home, your office, wherever life takes you." },
  { title: 'Executive health', description: 'Premium 3+ hour physicals with advanced diagnostics and longevity planning.' }
];

function Services() {
  var [imgRef, imgInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  var [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box>
      <MotionBox
        ref={imgRef}
        initial={{ opacity: 0 }}
        animate={imgInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        position="relative"
        overflow="hidden"
        role="group"
      >
        <Box position="relative" pb="42%">
          <Image
            src="/home/home-services.png"
            alt="AnswersMD concierge care"
            objectFit="cover"
            objectPosition="center"
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            transition="transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            _groupHover={{ transform: 'scale(1.03)' }}
          />
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="linear-gradient(to top, rgba(27,58,52,0.7) 0%, rgba(27,58,52,0.1) 50%, transparent 100%)" />
        </Box>
      </MotionBox>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.evergreen" ref={contentRef}>
        <Box maxW="98%" mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={contentInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>What we offer</Text>
            <Text as="h2" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="white" lineHeight={1.08} mb={{ base: 8, md: 14 }}>Comprehensive concierge care</Text>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 20 }}>
              <Box w={{ base: '100%', lg: '340px' }} flexShrink={0}>
                <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.8} mb={8}>From preventive wellness to urgent needs, we're here for every aspect of your health.</Text>
                <Button as={Link} to="/services/" bg="transparent" color="white" border="1px solid" borderColor="whiteAlpha.300" borderRadius="btn" size="lg" fontSize="md" _hover={{ bg: 'whiteAlpha.100', borderColor: 'whiteAlpha.600' }} transition="all 0.3s ease">View all services</Button>
              </Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} flex={1}>
                {SERVICES.map(function (svc, i) {
                  var isTop = i < 2;
                  var isLeft = i % 2 === 0;
                  return (
                    <MotionBox
                      key={svc.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      py={7}
                      px={{ base: 0, md: 7 }}
                      borderLeft={{ base: 'none', md: isLeft ? 'none' : '1px solid' }}
                      borderTop={isTop ? 'none' : '1px solid'}
                      borderColor="whiteAlpha.150"
                    >
                      <Text fontSize="lg" fontWeight={700} color="white" mb={2}>{svc.title}</Text>
                      <Text fontSize="md" color="whiteAlpha.600" lineHeight={1.8}>{svc.description}</Text>
                    </MotionBox>
                  );
                })}
              </SimpleGrid>
            </Flex>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

export default Services;
