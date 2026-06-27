// src/pages/Privacy/index.jsx
import {
  Box,
  VStack,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

var MotionBox = motion(Box);

function SectionHeading({ children }) {
  return <Text as="h2" fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color="brand.slate" lineHeight={1.2} mt={10} mb={4}>{children}</Text>;
}

function SubHeading({ children }) {
  return <Text as="h3" fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="brand.slate" lineHeight={1.2} mt={8} mb={3}>{children}</Text>;
}

function Paragraph({ children }) {
  return <Text fontSize="md" color="brand.body" lineHeight={1.9} mb={4}>{children}</Text>;
}

function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | AnswersMD&trade;</title>
        <meta name="description" content="Learn how AnswersMD collects, uses and protects your information." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Legal</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>Privacy Policy</Text>
            <Text fontSize="md" color="brand.bodyLight" mb={2}>Last Updated: August 15, 2025</Text>
            <Box w="32px" h="2px" bg="brand.champagne" mb={10} />

            <Paragraph>Please read this Privacy Policy carefully to understand how we handle your information. If you do not agree to this Privacy Policy, please do not use the Site or the Services provided by us. This Privacy Policy is incorporated into our Terms of Service.</Paragraph>
            <Paragraph>AnswersMD Holdings, LLC and its affiliates ("we," "our," or "us") are committed to protecting your privacy. This Privacy Policy explains how we collect, use and share your information when interacting with our website (the "Site"). It also describes your rights and choices regarding your information.</Paragraph>

            <SectionHeading>Information We Collect</SectionHeading>
            <Paragraph>We collect personal information when you interact with us through the following activities.</Paragraph>

            <SubHeading>When You Request a Consultation</SubHeading>
            <Paragraph>We collect your name, email address, phone number and health-related questions. This information is used to schedule your consultation and understand your healthcare needs.</Paragraph>

            <SubHeading>When You Become a Member</SubHeading>
            <Paragraph>We collect medical history, treatment options, physician referrals, prescriptions, lab results or other related health information. We also collect insurance information, emergency contacts and log-in credentials if you create an account on the Site. This information is used to provide personalized medical care and maintain your health records.</Paragraph>

            <SubHeading>When You Contact Us</SubHeading>
            <Paragraph>We collect information you provide in emails, phone calls or other communications. This includes billing information such as credit or debit card number, verification number, expiration date and identity verification information collected by our payment processors on our behalf. We also collect information about your transactions with us, customer service interactions, user-generated content you post on our Site and any other information you choose to directly provide to us. This information is used to respond to your inquiries or feedback, improve our services and administer your account.</Paragraph>

            <SectionHeading>Information Collected Through Automated Means</SectionHeading>
            <Paragraph>We collect certain information about your use of the Site and the devices you use to access the Site. We may use a variety of technologies including cookies and similar tools to assist in collecting this information.</Paragraph>

            <SubHeading>Website Usage</SubHeading>
            <Paragraph>When you use our Site, we collect and analyze information such as your IP address, browser types, browser language, operating system, the state or country from which you accessed the Site, software and hardware attributes, referring and exit pages, platform type, the number of clicks, files you download, domain names, landing pages, pages viewed, the amount of time spent on particular pages, search terms, the date and time you used the Site, error logs and other similar information.</Paragraph>

            <SubHeading>Location Information</SubHeading>
            <Paragraph>When you use the Site, we and our service providers may automatically collect general location information from your computer or mobile device. We will ask permission before collecting your precise GPS location information. If you no longer wish for us to collect GPS location information, you may disable the location features on your device.</Paragraph>

            <SubHeading>Cookies and Similar Online Tools</SubHeading>
            <Paragraph>We use cookies, server logs, tags, tracking pixels and other similar tracking technologies to receive and store certain types of information whenever you interact with us or third parties that use our Site. You can change your settings to notify you when a cookie is being set or updated, or to block cookies altogether. Please consult the "Help" section of your browser for more information. Blocking or disabling cookies may limit access to certain features or offerings of our Site.</Paragraph>

            <SubHeading>Information From Other Sources</SubHeading>
            <Paragraph>We work closely with third parties including physicians, medical professionals and pharmacies with whom we partner to provide you with healthcare services, as well as analytics providers and search information providers. Such third parties will sometimes provide us with additional information about you.</Paragraph>

            <SectionHeading>How We Use Your Information</SectionHeading>
            <Paragraph>In connection with providing services through the Site, we may use your information to provide, improve and manage our medical services. We use your information to facilitate healthcare services, engage in internal research, communicate with you about the Site and services, provide technical support, verify your identity, administer your account, process payments, ensure content is presented effectively, measure advertising effectiveness, understand your interests and needs, comply with applicable laws and establish or defend our legal rights.</Paragraph>

            <SubHeading>Combined Information</SubHeading>
            <Paragraph>We may combine information collected through the Site with information received from other sources, both online and offline, and use such combined information in accordance with this Privacy Policy.</Paragraph>

            <SubHeading>Aggregated and De-Identified Data</SubHeading>
            <Paragraph>We may aggregate or de-identify any information collected through the Site so that such information can no longer be linked to you or your device. We may use this data for any purpose including research and marketing and may share such data with third parties.</Paragraph>

            <SectionHeading>Online Analytics and Advertising</SectionHeading>
            <Paragraph>We may use third-party web analytics services such as Google Analytics on our Site to collect and analyze usage information through cookies and similar tools. To prevent Google from using your information for analytics, you may install the Google Analytics Opt-out Browser Add-on.</Paragraph>
            <Paragraph>The Site may integrate third-party advertising technologies that use cookies and other technologies to deliver relevant content and advertising. If you are interested in more information about tailored advertising, you may visit the Network Advertising Initiative's Consumer Opt-Out link, the Digital Advertising Alliance's Consumer Opt-Out link or Your Online Choices.</Paragraph>
            <Paragraph>We do not currently recognize or respond to browser-initiated Do Not Track signals.</Paragraph>

            <SectionHeading>How We Share and Disclose Your Information</SectionHeading>
            <Paragraph>We may share information with our affiliated entities to deliver services, ensure consistency and enhance your experience. We share information with healthcare providers to schedule and fulfill appointments, provide healthcare services and for treatment, payment or healthcare operations purposes. We provide access to or share information with select third parties who perform services on our behalf including billing, marketing, analytics, customer service, data storage, payment processing and legal services.</Paragraph>
            <Paragraph>We may access, retain and disclose information if required by law or in good faith belief that such action is reasonably necessary to comply with legal process, enforce our Terms of Service, respond to claims, respond to customer service requests or protect rights, property or personal safety.</Paragraph>
            <Paragraph>In business transactions such as mergers or asset sales, user information may be among the transferred assets. Any information you post publicly through features of our Site is not confidential and may be used for any purpose.</Paragraph>

            <SectionHeading>Your Rights and Choices</SectionHeading>
            <Paragraph>You have the right to access, correct or delete your personal information. You may opt out of marketing communications, request a copy of your medical records and manage cookie preferences through your browser settings. Regardless of your request, we may still use and share certain information as permitted by this Privacy Policy or as required by applicable law.</Paragraph>

            <SectionHeading>Third Party Services</SectionHeading>
            <Paragraph>This Privacy Policy does not address the privacy practices of any third parties including the manufacturer of your computer, mobile device and other IT hardware and software, and any other third party mobile application, website or service to which our Site may contain a link. We urge you to read the privacy and security policies of these third parties.</Paragraph>

            <SectionHeading>How We Protect Your Information</SectionHeading>
            <Paragraph>We take a variety of technical and organizational security measures to protect your information. We use encryption technology such as Secure Sockets Layer (SSL) to protect your personal information during data transport. However, no method of transmission over the Internet is absolutely secure and we cannot guarantee the security of your information.</Paragraph>

            <SectionHeading>Protecting Children's Privacy</SectionHeading>
            <Paragraph>Our site is not intended for users under 18 years of age. We do not knowingly collect personal information from users under 18. If we learn we have collected information from a user under 18, we will delete that information. If you believe we might have information from a user under 18, please contact us.</Paragraph>

            <SectionHeading>Retention of Your Information</SectionHeading>
            <Paragraph>We keep your information for no longer than necessary for the purposes for which it is processed. The length of time depends on the purposes for which we collected and use it or as required to comply with applicable laws.</Paragraph>

            <SectionHeading>Revisions to Our Privacy Policy</SectionHeading>
            <Paragraph>We reserve the right to change this Privacy Policy at any time. We will make the revised Privacy Policy accessible through the Site. Your continued use of the Site or our services after such amendments will be deemed your acknowledgement of these changes.</Paragraph>

            <SectionHeading>Contact Us</SectionHeading>
            <Paragraph>If you have any questions or concerns regarding this Privacy Policy, please contact us.</Paragraph>
            <VStack align="flex-start" spacing={2} mt={4} mb={2}>
              <ChakraLink href="tel:8137273233" fontSize="md" fontWeight={600} color="brand.slate" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">813-727-3233</ChakraLink>
              <ChakraLink href="mailto:info@answersmd.com" fontSize="md" fontWeight={600} color="brand.slate" _hover={{ color: 'brand.champagne' }} transition="color 0.2s ease">info@answersmd.com</ChakraLink>
            </VStack>
            <Paragraph>Tampa: 4100 W. Kennedy Blvd, Tampa, FL 33609</Paragraph>
            <Paragraph>Boca Raton: 1801 S. Federal Hwy, Boca Raton, FL 33432</Paragraph>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}

export default Privacy;
