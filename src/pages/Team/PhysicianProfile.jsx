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
    credentialsFull: 'DABFM \u2014 Diplomate, American Board of Family Medicine',
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
    credentialsFull: 'FAAP, DABIM \u2014 Fellow, American Academy of Pediatrics; Diplomate, American Board of Internal Medicine',
    location: 'Tampa, FL',
    patients: 'All Ages (Pediatric to Adult)',
    experience: '12+ Years',
    photo: '/team/dr-drew-meriwether.webp',
    badges: [],
    bio: [
      'Dr. Drew Meriwether brings a unique dual expertise to AnswersMD, being board-certified in both pediatrics and internal medicine. This rare combination allows him to provide seamless care for entire families, from newborns to grandparents.',
      "Dr. Meriwether's approach combines the latest evidence-based medicine with genuine, compassionate care. He believes that understanding a patient's complete picture, their family, their lifestyle and their concerns, is essential to providing truly excellent healthcare."
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', 'Board Certified Pediatrics', 'Board Certified Internal Medicine', 'FAAP', 'DABIM', 'Florida Medical License'],
    specialties: ['Pediatric Primary Care', 'Adult Internal Medicine', 'Family Care (All Ages)', 'Preventive and Wellness Care', 'Childhood Development', 'Chronic Disease Management'],
    quote: "There's something special about caring for an entire family, from the newborn to the teenager to the parents to the grandparents. You understand the family dynamics, the medical history that spans generations and you can provide truly comprehensive care. That's what drew me to AnswersMD. It's medicine the way it should be.",
    meta: { title: 'Dr. Drew Meriwether, MD | AnswersMD', description: 'Meet Dr. Drew Meriwether, dual board certified in Pediatrics and Internal Medicine at AnswersMD in Tampa, FL.' }
  },
  'dr-divino-dalessio': {
    name: "Divino D'Alessio Jr., MD",
    shortName: "Dr. D'Alessio",
    title: 'Sports and Family Medicine',
    credentialsFull: 'ABFM \u2014 Diplomate, American Board of Family Medicine',
    location: 'Boca Raton, FL',
    patients: 'Adults, Adolescents and Athletes',
    experience: '3+ Years',
    photo: '/team/dr-divino-dalessio.webp',
    badges: [],
    bio: [
      "Dr. Divino D'Alessio Jr. blends comprehensive Family Medicine with advanced Sports Medicine training, providing patients with evidence-based care focused on performance, injury prevention and safe return to activity.",
      "Dr. D'Alessio has served as team physician for NCAA Division I athletes at Coastal Carolina University and provided sideline coverage for regional high school programs, combat sports, beach volleyball and surfing competitions. He brings that same athletic-medicine rigor to the daily care of weekend warriors and active families at AnswersMD Boca Raton."
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', 'Board Certified Family Medicine', 'Sports Medicine Training', 'ABFM', 'ACLS, BLS, PALS', 'Diagnostic MSK Ultrasound'],
    specialties: ['Sports Medicine', 'Musculoskeletal Ultrasound', 'Concussion Management', 'Performance Optimization', 'Preventive Care', 'Family Medicine'],
    quote: '',
    meta: { title: "Dr. Divino D'Alessio Jr., MD | AnswersMD", description: "Meet Dr. Divino D'Alessio Jr., board certified in Family and Sports Medicine at AnswersMD in Boca Raton, FL." }
  },
  'dr-ellen-howard': {
    name: 'Ellen Howard, MD, MPH',
    shortName: 'Dr. Howard',
    title: 'Family and Preventive Medicine',
    credentialsFull: 'ABFM \u2014 Diplomate, American Board of Family Medicine; Master of Public Health',
    location: 'St. Petersburg, FL',
    patients: 'Women, Men and Families (All Ages)',
    experience: '3+ Years',
    photo: '/team/dr-ellen-howard.webp',
    badges: [],
    bio: [
      "Dr. Ellen Howard believes good medicine starts with knowing the person in front of you. A board-certified family physician with a Master's in Public Health, she brings a preventive, community-minded approach to concierge family medicine.",
      'She completed her Family Medicine residency here in St. Petersburg and is proud to return to the community she considers home. Her clinical interests center on hormone therapy, weight management and GLP-1 therapy and preventive lifestyle medicine. A long-time yoga instructor who has worked with Division I athletes, Dr. Howard meets each patient where they are and builds trusted, individualized plans rooted in science, compassion and sustainable change.'
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', 'Master of Public Health (MPH)', 'Board Certified Family Medicine', 'ABFM', 'AAFP Member', 'The Menopause Society', 'NY and FL Medical Licenses'],
    specialties: ['Hormone Therapy', 'Weight Management and GLP-1 Therapy', 'Preventive and Lifestyle Medicine', 'Family Medicine (All Ages)', 'Office Procedures and Minor Surgery', 'Chronic Disease Management'],
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
