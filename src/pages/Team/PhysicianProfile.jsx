// src/pages/Team/PhysicianProfile.jsx
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Text,
  Image,
  Button,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import CTA from '../Home/components/CTA';

var MotionBox = motion(Box);

var PHYSICIANS = {
  'dr-doug-shapiro': {
    name: 'Douglas Shapiro, DO',
    shortName: 'Dr. Shapiro',
    title: 'Founder and Lead Physician',
    credentialsFull: 'Diplomate, American Board of Family Medicine',
    location: 'Tampa, FL',
    patients: 'Adults and Families',
    experience: '6+ Years',
    photo: '/team/dr-doug-shapiro.webp',
    badges: [
      { image: '/team/shapiro-top-docs-tampa-2024.webp', label: 'Top Docs Tampa 2024' },
      { image: '/team/shapiro-top-docs-tampa-2025.webp', label: 'Top Docs Tampa 2025' },
      { image: '/team/shapiro-badge.webp', label: 'Board Certified' }
    ],
    bio: [
      'Dr. Douglas Shapiro founded AnswersMD with a vision of returning to the roots of medicine, where doctors truly know their patients and have the time to provide exceptional, personalized care.',
      'With over 6 years of experience in family medicine, Dr. Shapiro has seen firsthand how the traditional healthcare system fails patients. Rushed appointments, impersonal care and weeks-long waits became the norm. AnswersMD is his answer to that broken system.'
    ],
    education: [
      { label: 'Residency', value: 'University of South Carolina, Greenville' },
      { label: 'Medical School', value: 'Lincoln Memorial University, DeBusk College of Osteopathic Medicine' },
      { label: 'University', value: 'Lynn University' }
    ],
    certifications: ['Doctor of Osteopathic Medicine (DO)', 'Board Certified Family Medicine', 'DABFM', 'Florida Medical License'],
    specialties: ['Comprehensive Primary Care', 'Preventive Medicine', 'Chronic Disease Management', 'Cardiovascular Health', 'Weight Management', 'House Calls'],
    quote: "I became a doctor to help people, to really know my patients, understand their lives and be there when they need me. Concierge medicine allows me to practice the way medicine should be practiced. When you call, I answer. When you need me, I'm there. That's not revolutionary. That's just good medicine.",
    meta: { title: 'Dr. Douglas Shapiro, DO | AnswersMD', description: 'Meet Dr. Douglas Shapiro, founder and lead physician at AnswersMD. Board certified family medicine physician providing concierge care in Tampa, FL.' }
  },
  'dr-drew-meriwether': {
    name: 'Drew Meriwether, MD',
    shortName: 'Dr. Meriwether',
    title: 'Pediatric and Internal Medicine',
    credentialsFull: 'Board Certified Pediatrics and Internal Medicine',
    location: 'Tampa, FL',
    patients: 'All Ages',
    experience: 'USF Health Clinician of the Year',
    photo: '/team/dr-drew-meriwether.webp',
    badges: [],
    bio: [
      'A USF Health Clinician of the Year, Dr. Meriwether brings exceptional versatility with dual board certifications in Pediatrics and Internal Medicine. A rare combination that allows him to provide seamless care for entire families from newborns to grandparents.',
      "His training across both specialties means fewer referrals, better coordination and a physician who understands how a child's health history connects to their care as an adult."
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', 'Board Certified Pediatrics', 'Board Certified Internal Medicine', 'Florida Medical License'],
    specialties: ['Pediatric Care', 'Internal Medicine', 'Family Health Coordination', 'Preventive Wellness', 'Chronic Disease Management'],
    quote: '',
    meta: { title: 'Dr. Drew Meriwether, MD | AnswersMD', description: 'Meet Dr. Drew Meriwether, dual board certified in Pediatrics and Internal Medicine at AnswersMD in Tampa, FL.' }
  },
  'dr-divino-dalessio': {
    name: "Divino D'Alessio Jr., MD",
    shortName: "Dr. D'Alessio",
    title: 'Sports and Family Medicine',
    credentialsFull: 'Board Certified Family Medicine and Sports Medicine',
    location: 'Boca Raton, FL',
    patients: 'Athletes and Families',
    experience: 'NCAA Division I Team Physician',
    photo: '/team/dr-divino-dalessio.webp',
    badges: [],
    bio: [
      "Dr. D'Alessio brings board-certified Family Medicine paired with advanced Sports Medicine training. He has served as team physician for NCAA Division I athletes at Coastal Carolina University and provided sideline coverage for regional high school programs.",
      'His clinical focus includes diagnostic musculoskeletal ultrasound, ultrasound-guided procedures and concussion management. He delivers athletic-medicine precision to active adults, athletes and families who want evidence-based care centered on performance, prevention and long-term health.'
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', 'Board Certified Family Medicine', 'Board Certified Sports Medicine', 'Florida Medical License'],
    specialties: ['Sports Medicine', 'Musculoskeletal Ultrasound', 'Concussion Management', 'Performance Optimization', 'Preventive Care', 'Family Medicine'],
    quote: '',
    meta: { title: "Dr. Divino D'Alessio Jr., MD | AnswersMD", description: "Meet Dr. Divino D'Alessio Jr., board certified in Family and Sports Medicine at AnswersMD in Boca Raton, FL." }
  },
  'dr-ellen-howard': {
    name: 'Ellen Howard, MD, MPH',
    shortName: 'Dr. Howard',
    title: 'Family and Preventive Medicine',
    credentialsFull: 'Board Certified Family Medicine',
    location: 'St. Petersburg, FL',
    patients: 'Adults and Families',
    experience: "Master's in Public Health",
    photo: '/team/dr-ellen-howard.webp',
    badges: [],
    bio: [
      "Dr. Howard believes good medicine starts with knowing the person in front of you. A board-certified family physician with a Master's in Public Health, she brings a preventive, community-minded approach to concierge family medicine.",
      'She completed her residency in St. Petersburg and is proud to return to the community she considers home. Her clinical interests center on hormone therapy, weight management and GLP-1 therapy and preventive lifestyle medicine.'
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', "Master's in Public Health (MPH)", 'Board Certified Family Medicine', 'Florida Medical License'],
    specialties: ['Hormone Therapy', 'Weight Management', 'GLP-1 Therapy', 'Preventive Lifestyle Medicine', 'Community Health', 'Family Medicine'],
    quote: '',
    meta: { title: 'Dr. Ellen Howard, MD, MPH | AnswersMD', description: 'Meet Dr. Ellen Howard, board certified family physician with an MPH at AnswersMD in St. Petersburg, FL.' }
  }
};

function PhysicianProfile() {
  var params = useParams();
  var doc = PHYSICIANS[params.slug];

  if (!doc) return <Navigate to="/team/" replace />;

  return (
    <>
      <Helmet>
        <title>{doc.meta.title}</title>
        <meta name="description" content={doc.meta.description} />
      </Helmet>

      {/* Hero */}
      <Box bg="brand.ivory" pt={{ base: 24, md: 32 }}>
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 5, md: 4 }}>
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 0, lg: 14 }}>
              <Box w={{ base: '100%', lg: '400px' }} flexShrink={0}>
                <Box borderRadius="image" overflow="hidden" bg="#F0EDE8" sx={{ aspectRatio: { base: '4 / 5', lg: '3 / 4' } }}>
                  <Image src={doc.photo} alt={doc.name} objectFit="cover" objectPosition="top" w="100%" h="100%" />
                </Box>
                {doc.badges.length > 0 && (
                  <Flex gap={3} mt={5} display={{ base: 'none', lg: 'flex' }}>
                    {doc.badges.map(function (badge) {
                      return <Box key={badge.label} w="72px" h="72px" borderRadius="12px" overflow="hidden" border="1px solid" borderColor="#E8E2D8" bg="white"><Image src={badge.image} alt={badge.label} objectFit="contain" w="100%" h="100%" p={1} /></Box>;
                    })}
                  </Flex>
                )}
              </Box>

              <VStack align="flex-start" spacing={5} flex={1} py={{ base: 8, lg: 6 }}>
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{doc.title}</Text>
                <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>{doc.name}</Text>
                <Text fontSize="md" color="brand.bodyLight" fontWeight={500}>{doc.credentialsFull}</Text>

                {doc.badges.length > 0 && (
                  <Flex gap={3} display={{ base: 'flex', lg: 'none' }}>
                    {doc.badges.map(function (badge) {
                      return <Box key={badge.label} w="64px" h="64px" borderRadius="10px" overflow="hidden" border="1px solid" borderColor="#E8E2D8" bg="white"><Image src={badge.image} alt={badge.label} objectFit="contain" w="100%" h="100%" p={1} /></Box>;
                    })}
                  </Flex>
                )}

                <Box w="32px" h="2px" bg="brand.champagne" />

                {doc.bio.map(function (p, i) {
                  return <Text key={i} fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.85}>{p}</Text>;
                })}

                <Text fontSize="md" color="brand.champagne" fontWeight={500} pt={1}>{doc.location} &middot; {doc.patients} &middot; {doc.experience}</Text>

                <Flex gap={4} align="center" flexWrap="wrap" pt={2}>
                  <Button as={Link} to="/contact/" variant="primary" size="lg">Schedule a consultation</Button>
                  <ChakraLink as={Link} to="/services/" fontSize="md" fontWeight={600} color="brand.slate" display="flex" alignItems="center" gap={2} _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">
                    Our services
                    <Icon as={HiArrowRight} boxSize={4} />
                  </ChakraLink>
                </Flex>
              </VStack>
            </Flex>
          </MotionBox>
        </Box>
      </Box>

      {/* Credentials and Specialties */}
      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW={{ base: '98%', lg: '70%' }} mx="auto" px={{ base: 5, md: 4 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 12, md: 16 }}>
            <Box>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={6}>Credentials</Text>
              <VStack spacing={3} align="flex-start" mb={doc.education.length > 0 ? 10 : 0}>
                {doc.certifications.map(function (cert) {
                  return (
                    <Flex key={cert} align="center" gap={3}>
                      <Flex w="6px" h="6px" borderRadius="full" bg="brand.champagne" flexShrink={0} />
                      <Text fontSize="md" color="brand.body">{cert}</Text>
                    </Flex>
                  );
                })}
              </VStack>
              {doc.education.length > 0 && (
                <Box>
                  <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={6}>Education</Text>
                  <VStack spacing={4} align="flex-start">
                    {doc.education.map(function (edu) {
                      return (
                        <Box key={edu.label}>
                          <Text fontSize="sm" fontWeight={600} color="brand.slate">{edu.label}</Text>
                          <Text fontSize="md" color="brand.bodyLight">{edu.value}</Text>
                        </Box>
                      );
                    })}
                  </VStack>
                </Box>
              )}
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={6}>Clinical focus</Text>
              <VStack spacing={3} align="flex-start">
                {doc.specialties.map(function (spec) {
                  return (
                    <Flex key={spec} align="center" gap={3}>
                      <Flex w="6px" h="6px" borderRadius="full" bg="brand.champagne" flexShrink={0} />
                      <Text fontSize="md" color="brand.body">{spec}</Text>
                    </Flex>
                  );
                })}
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Quote */}
      {doc.quote && (
        <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory">
          <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 5, md: 4 }} textAlign="center">
            <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight={700} color="brand.champagne" lineHeight={1} mb={6}>&ldquo;</Text>
            <Text fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" lineHeight={1.6} fontStyle="italic" mb={6}>{doc.quote}</Text>
            <Box w="32px" h="2px" bg="brand.champagne" mx="auto" mb={4} />
            <Text fontSize="md" fontWeight={600} color="brand.slate">{doc.shortName}</Text>
          </Box>
        </Box>
      )}

      <CTA />
    </>
  );
}

export default PhysicianProfile;
