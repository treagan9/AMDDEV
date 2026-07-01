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
    credentialsFull: 'DABFM',
    location: 'Tampa, FL',
    patients: 'Adults and Families',
    experience: '6+ Years',
    photo: '/team/dr-doug-shapiro.webp',
    badges: [
      { image: '/team/shapiro-top-docs-tampa-2024.webp', label: 'Top Docs Tampa 2024' },
      { image: '/team/shapiro-top-docs-tampa-2025.webp', label: 'Top Docs Tampa 2025' },
      { image: '/team/shapiro-badge.webp', label: 'Board Certified' }
    ],
    intro: 'Dr. Douglas Shapiro founded AnswersMD to practice medicine the way it should be. Fewer patients, deeper relationships and the time to do both justice.',
    story: [
      'The conviction behind it is simple. A physician can only know a patient as well as their schedule allows, so he intentionally limited his panel, gave members his direct cell number and built the entire practice around that kind of access. The result is concierge care where being genuinely known by your doctor is the standard, not a privilege reserved for the few.',
      'After earning his medical degree from Lincoln Memorial University\'s DeBusk College of Osteopathic Medicine and completing residency at the University of South Carolina School of Medicine Greenville, Dr. Shapiro returned to Florida with that vision intact. What began on West Kennedy Boulevard has grown into a flagship practice in the heart of Tampa\'s Hyde Park at 2330 W. Horatio Street, a calm and elegant space designed to feel more like a retreat than a clinic. This marks his third straight year as a Top Doctor, honored by his peers in the Tampa Bay medical community.',
      'The model is deliberately small and unmistakably personal. Members reach him directly, without portals or hold music. Appointments run as long as they need to. Care includes comprehensive executive physicals, advanced early-detection testing, real-time coordination with specialists and, when it matters, house calls. The aim never changes. To help each patient live a longer and healthier life by getting ahead of problems instead of reacting to them.',
      'That standard is now bigger than one office. With practices in Tampa, St. Petersburg and Boca Raton, Dr. Shapiro hand-selects physicians who share his values. Discretion, dedication and the rare ability to make a patient feel genuinely known. He continues to welcome a limited number of new members to the practice he built.'
    ],
    education: [
      { label: 'Residency', value: 'University of South Carolina School of Medicine, Greenville' },
      { label: 'Medical School', value: 'Lincoln Memorial University, DeBusk College of Osteopathic Medicine' },
      { label: 'University', value: 'Lynn University' }
    ],
    certifications: ['Doctor of Osteopathic Medicine (DO)', 'Board Certified Family Medicine', 'DABFM', 'Top Docs Tampa 2024 and 2025', 'Florida Medical License'],
    specialties: ['Comprehensive Primary Care', 'Preventive Medicine', 'Chronic Disease Management', 'Cardiovascular Health', 'Weight Management', 'House Calls'],
    quote: "My patients know they can reach me because I take their care personally. That's the trust I work to earn every day.",
    meta: {
      title: 'Dr. Douglas Shapiro \u2022 AnswersMD',
      description: 'Dr. Douglas Shapiro founded AnswersMD to practice medicine the way it should be. Board certified family medicine in Tampa, FL.',
      image: 'https://dev.answersmd.com/social/team.png'
    }
  },
  'dr-drew-meriwether': {
    name: 'Drew Meriwether, MD',
    shortName: 'Dr. Meriwether',
    title: 'Pediatric and Internal Medicine',
    credentialsFull: 'FAAP, DABIM',
    location: 'Tampa, FL',
    patients: 'All Ages',
    experience: '12+ Years',
    photo: '/team/dr-drew-meriwether.webp',
    badges: [],
    intro: 'Dr. Drew Meriwether is the kind of physician you see when nothing is wrong and you intend to keep it that way.',
    story: [
      'As a double board-certified physician with an educator\'s instinct for making the complex clear, he practices proactively. Fine-tuning how his patients feel and perform today while helping them understand how to stay a step ahead of anything that could slow them down.',
      'Dr. Meriwether earned his undergraduate degree at the University of Southern Mississippi and his medical degree at the University of South Alabama, then completed his residency at the University of South Florida where he stayed on as an assistant professor. He later worked as a hospitalist at Tampa General Hospital, managing complex cases across cardiology, pulmonology and hematology. That hospital-tested judgment now anchors his practice, where the same rigor goes toward preventing crises rather than treating them after the fact. His recent recognition as USF Health Clinician of the Year came from the colleagues who watched him work.',
      'That depth pays off daily. Fewer referrals, tighter coordination and a physician who connects the dots across your labs, history and risks.',
      'His care plans are grounded in evidence and built around what each patient actually wants, whether that is more energy, sharper focus, better sleep or stronger physical performance. Comprehensive executive physicals and advanced testing give him a clear baseline and a small panel means he has the time to refine the plan and keep you performing at your best.',
      'At AnswersMD\'s Hyde Park flagship, Dr. Meriwether is welcoming a select group of new patients who want more than a doctor for emergencies. A partner invested in keeping them vital for decades to come.'
    ],
    education: [
      { label: 'Residency', value: 'University of South Florida' },
      { label: 'Medical School', value: 'University of South Alabama' },
      { label: 'University', value: 'University of Southern Mississippi' }
    ],
    certifications: ['Doctor of Medicine (MD)', 'Board Certified Pediatrics', 'Board Certified Internal Medicine', 'FAAP', 'DABIM', 'USF Health Clinician of the Year', 'Florida Medical License'],
    specialties: ['Pediatric Primary Care', 'Adult Internal Medicine', 'Family Care for All Ages', 'Preventive and Wellness Care', 'Childhood Development', 'Chronic Disease Management'],
    quote: "Concierge medicine allows me to focus on prevention, individualized care and truly knowing my patients. By keeping my panel intentionally small, I can be thoughtful, responsive and proactive. I see myself as a long-term partner in my patients' health, not just someone they see when something goes wrong.",
    meta: {
      title: 'Dr. Drew Meriwether \u2022 AnswersMD',
      description: 'Dr. Drew Meriwether brings dual board certifications in Pediatrics and Internal Medicine to AnswersMD in Tampa, FL. USF Health Clinician of the Year.',
      image: 'https://dev.answersmd.com/social/team.png'
    }
  },
  'dr-divino-dalessio': {
    name: "Divino D'Alessio Jr., MD",
    shortName: "Dr. D'Alessio",
    title: 'Sports and Family Medicine',
    credentialsFull: 'ABFM',
    location: 'Boca Raton, FL',
    patients: 'Adults, Adolescents and Athletes',
    experience: '3+ Years',
    photo: '/team/dr-divino-dalessio.webp',
    badges: [],
    intro: "Dr. Divino D'Alessio Jr. blends comprehensive Family Medicine with advanced Sports Medicine training, providing patients with evidence-based care focused on performance, injury prevention and safe return to activity.",
    story: [
      "Dr. D'Alessio has served as team physician for NCAA Division I athletes at Coastal Carolina University and provided sideline coverage for regional high school programs, combat sports, beach volleyball and surfing competitions. He brings that same athletic-medicine rigor to the daily care of weekend warriors and active families at AnswersMD Boca Raton.",
      'His clinical focus includes diagnostic musculoskeletal ultrasound, ultrasound-guided procedures and concussion management. He delivers athletic-medicine precision to active adults, athletes and families who want evidence-based care centered on performance, prevention and long-term health.',
      "For patients across Boca Raton and South Florida, Dr. D'Alessio offers a practice built on accessibility, thoroughness and the kind of sports-medicine expertise that was once reserved for professional athletes. He is now welcoming new members who want a physician invested in helping them move better, recover faster and stay ahead of injury."
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', 'Board Certified Family Medicine', 'Sports Medicine Training', 'ABFM', 'ACLS, BLS, PALS', 'Diagnostic MSK Ultrasound'],
    specialties: ['Sports Medicine', 'Musculoskeletal Ultrasound', 'Concussion Management', 'Performance Optimization', 'Preventive Care', 'Family Medicine'],
    quote: '',
    meta: {
      title: "Dr. Divino D'Alessio \u2022 AnswersMD",
      description: "Dr. Divino D'Alessio Jr. brings board certified Family and Sports Medicine to AnswersMD in Boca Raton, FL. Former NCAA Division I team physician.",
      image: 'https://dev.answersmd.com/social/team.png'
    }
  },
  'dr-ellen-howard': {
    name: 'Ellen Howard, MD, MPH',
    shortName: 'Dr. Howard',
    title: 'Family and Preventive Medicine',
    credentialsFull: 'ABFM, MPH',
    location: 'St. Petersburg, FL',
    patients: 'Women, Men and Families',
    experience: '3+ Years',
    photo: '/team/dr-ellen-howard.webp',
    badges: [],
    intro: 'Dr. Ellen Howard practices the kind of medicine that has become rare. Personal, preventive and built around helping you feel your best for years to come.',
    story: [
      'As a board-certified family physician, she returned to St. Petersburg, where she trained and now calls home, to open a concierge practice with the time to know her patients, not just treat them.',
      'Her connection to St. Pete is personal. Dr. Howard completed her Family Medicine residency here and chose to build her practice in the city that shaped her as a doctor. She is not passing through. She is invested in the people she treats and she cares for women, men and families at every stage of life.',
      'Her focus is on helping patients optimize how they feel and function day to day. She brings particular depth to hormone therapy, medical weight management and GLP-1 care, along with the preventive medicine that keeps small issues from becoming serious ones.',
      'She meets patients where they are and listens before she prescribes, building plans around the goals that matter most to them. Whether that is more energy, steadier weight, balanced hormones or simply staying well. Her style is practical and personal. Clear, science-based plans that fit into real life and hold up over the long run.',
      'That kind of care depends on time, which is exactly what the concierge model gives her. With a deliberately small panel and direct access between visits, Dr. Howard can work from the full picture. Your labs, your history, your goals. She can adjust the plan as your life changes rather than rushing you through a brief visit.',
      'For patients across St. Petersburg and Tampa Bay, Dr. Howard offers a rare blend of clinical rigor, modern preventive care and genuine warmth. She is now accepting a limited number of new members who want a physician truly invested in their long-term health and in this community for the long term.'
    ],
    education: [],
    certifications: ['Doctor of Medicine (MD)', 'Master of Public Health (MPH)', 'Board Certified Family Medicine', 'ABFM', 'AAFP Member', 'The Menopause Society', 'NY and FL Medical Licenses'],
    specialties: ['Hormone Therapy', 'Weight Management and GLP-1 Therapy', 'Preventive and Lifestyle Medicine', 'Family Medicine for All Ages', 'Office Procedures and Minor Surgery', 'Chronic Disease Management'],
    quote: '',
    meta: {
      title: 'Dr. Ellen Howard \u2022 AnswersMD',
      description: 'Dr. Ellen Howard brings board certified family medicine and a preventive approach to AnswersMD in St. Petersburg, FL. Hormone therapy, GLP-1 and lifestyle medicine.',
      image: 'https://dev.answersmd.com/social/team.png'
    }
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
        <meta property="og:title" content={doc.meta.title} />
        <meta property="og:description" content={doc.meta.description} />
        <meta property="og:image" content={doc.meta.image} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={doc.meta.title} />
        <meta name="twitter:description" content={doc.meta.description} />
        <meta name="twitter:image" content={doc.meta.image} />
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
                  <Flex gap={4} mt={5} display={{ base: 'none', lg: 'flex' }}>
                    {doc.badges.map(function (badge) {
                      return <Image key={badge.label} src={badge.image} alt={badge.label} w="68px" h="68px" objectFit="contain" />;
                    })}
                  </Flex>
                )}
              </Box>

              <VStack align="flex-start" spacing={5} flex={1} py={{ base: 8, lg: 6 }}>
                <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne">{doc.title}</Text>
                <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08}>{doc.name}</Text>
                <Text fontSize="md" color="brand.bodyLight" fontWeight={500}>{doc.credentialsFull}</Text>

                {doc.badges.length > 0 && (
                  <Flex gap={4} display={{ base: 'flex', lg: 'none' }}>
                    {doc.badges.map(function (badge) {
                      return <Image key={badge.label} src={badge.image} alt={badge.label} w="56px" h="56px" objectFit="contain" />;
                    })}
                  </Flex>
                )}

                <Box w="32px" h="2px" bg="brand.champagne" />

                <Text fontSize={{ base: 'lg', md: 'xl' }} color="brand.slate" fontWeight={600} lineHeight={1.5}>{doc.intro}</Text>

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
        <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 5, md: 4 }}>
          <VStack spacing={5} align="flex-start">
            {doc.story.map(function (p, i) {
              return <Text key={i} fontSize={{ base: 'md', md: 'lg' }} color="brand.body" lineHeight={1.9}>{p}</Text>;
            })}
          </VStack>
        </Box>
      </Box>

      <Box py={{ base: 'sectionMobile', md: 'section' }} bg="brand.ivory">
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
        <Box py={{ base: 'sectionMobile', md: 'section' }} bg="white">
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
