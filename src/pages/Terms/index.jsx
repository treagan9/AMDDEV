// src/pages/Terms/index.jsx
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

function Paragraph({ children }) {
  return <Text fontSize="md" color="brand.body" lineHeight={1.9} mb={4}>{children}</Text>;
}

function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | AnswersMD&trade;</title>
        <meta name="description" content="Terms of Service for AnswersMD concierge medicine." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Legal</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>Terms of Service</Text>
            <Text fontSize="md" color="brand.bodyLight" mb={2}>Last Updated: October 14, 2025</Text>
            <Box w="32px" h="2px" bg="brand.champagne" mb={10} />

            <Paragraph>By accessing or using the Site or Services, you acknowledge that you have read, understood and agreed to be legally bound by and comply with these Terms of Service. If you do not or cannot agree with any part of these Terms of Service, you may not use the Site or any Services provided on or through the Site.</Paragraph>

            <SectionHeading>Introduction</SectionHeading>
            <Paragraph>These terms and conditions of service ("Terms of Service") describe your rights and responsibilities with regard to your use of the website at answersmd.com (the "Site") owned and controlled by AnswersMD Holdings, LLC and its affiliates ("we," "us" and "our"), as well as the concierge medical services ("Services") by licensed physicians available to users through the Site. The terms "you" and "your" means you and any other person accessing your account on the Site.</Paragraph>
            <Paragraph>Your access to and use of the Site and receipt of Services is subject to your acceptance of and compliance with these Terms of Service and all applicable laws and regulations. By clicking "accept" you acknowledge that you have read, understand and accept all terms and conditions contained in these Terms of Service and our Privacy Policy.</Paragraph>
            <Paragraph>The Site and Services are continually under development and we reserve the right to review or remove any part of these Terms of Service in our sole discretion at any time and without prior notice. Your continued use after a change has been posted constitutes your acceptance of the changes.</Paragraph>

            <SectionHeading>Availability</SectionHeading>
            <Paragraph>Our Services are currently only available to individuals located in the state of Florida. We provide concierge medical services through licensed physicians and other licensed medical professionals (the "Providers"). The Services include 24/7 Provider access via phone, text and video, same day and next day appointments with our Providers, comprehensive annual executive physicals and preventive care and wellness planning.</Paragraph>

            <SectionHeading>Eligibility</SectionHeading>
            <Paragraph>In order to qualify to use the Services, you must be 18 years or older to become a member and be located in the State of Florida, the only state where we currently provide Services. Membership is subject to availability and physician acceptance. We maintain a limited number of memberships to ensure quality care.</Paragraph>
            <Paragraph>You agree to pay our annual membership fees which are due upon enrollment. Fees are non-refundable except as otherwise provided by applicable law. Additional Services may incur separate charges. You agree to provide accurate and complete health information to our Providers, attend scheduled appointments or provide 24 hour advance notice for cancellations, treat our staff and Providers with respect, follow prescribed treatment plans and be legally bound by these Terms of Service.</Paragraph>
            <Paragraph>Satisfying the above requirements does not guarantee that you will receive Services from us. We reserve the right to change or include new requirements as deemed appropriate in our sole discretion.</Paragraph>

            <SectionHeading>Privacy Policy</SectionHeading>
            <Paragraph>We understand the importance of confidentiality and privacy regarding your health information. Please see our Privacy Policy available on the Site for a description of how we may collect and use your personal information. The Privacy Policy is incorporated into these Terms of Service by reference.</Paragraph>

            <SectionHeading>Consultative Service</SectionHeading>
            <Paragraph>In some cases, one of our Providers may use the Site to provide medical advice or treatment to you. A Provider consulting with you through the Site may not have the benefit of information that would be obtained by examining you in person. Therefore, the Provider may not be aware of facts or information that may affect his or her opinion regarding a potential diagnosis or treatment recommendation. We strongly encourage you to provide all relevant information and discuss any and all diagnosis and treatment options with your Provider.</Paragraph>
            <Paragraph>You agree and accept that any diagnosis you may receive from a Provider is limited and in some cases provisional. The healthcare services are not intended in all cases to replace a full medical evaluation or an in-person visit with a healthcare provider. A Provider acting through the Site may not have important information that is usually obtained through a physical examination, and the absence of a physical examination may affect the Provider's ability to diagnose any potential condition, disease or injury.</Paragraph>

            <SectionHeading>Prescriptions and Product Policy</SectionHeading>
            <Paragraph>If you receive a prescription as a result of the Services, you may select one of our partner pharmacies (the "Pharmacy Network") to ship your prescription. You give us consent to send and disclose to the Pharmacy Network all information provided by you, healthcare records and other applicable information so that you may
cat > src/pages/Terms/index.jsx << 'EOF'
// src/pages/Terms/index.jsx
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

function Paragraph({ children }) {
  return <Text fontSize="md" color="brand.body" lineHeight={1.9} mb={4}>{children}</Text>;
}

function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | AnswersMD&trade;</title>
        <meta name="description" content="Terms of Service for AnswersMD concierge medicine." />
      </Helmet>

      <Box pt={{ base: 32, md: 40 }} pb={{ base: 'sectionMobile', md: 'section' }} bg="white">
        <Box maxW={{ base: '98%', lg: '60%' }} mx="auto" px={{ base: 6, md: 4 }}>
          <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="2px" textTransform="uppercase" color="brand.champagne" mb={4}>Legal</Text>
            <Text as="h1" fontFamily="heading" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700} color="brand.slate" lineHeight={1.08} mb={4}>Terms of Service</Text>
            <Text fontSize="md" color="brand.bodyLight" mb={2}>Last Updated: October 14, 2025</Text>
            <Box w="32px" h="2px" bg="brand.champagne" mb={10} />

            <Paragraph>By accessing or using the Site or Services, you acknowledge that you have read, understood and agreed to be legally bound by and comply with these Terms of Service. If you do not or cannot agree with any part of these Terms of Service, you may not use the Site or any Services provided on or through the Site.</Paragraph>

            <SectionHeading>Introduction</SectionHeading>
            <Paragraph>These terms and conditions of service ("Terms of Service") describe your rights and responsibilities with regard to your use of the website at answersmd.com (the "Site") owned and controlled by AnswersMD Holdings, LLC and its affiliates ("we," "us" and "our"), as well as the concierge medical services ("Services") by licensed physicians available to users through the Site. The terms "you" and "your" means you and any other person accessing your account on the Site.</Paragraph>
            <Paragraph>Your access to and use of the Site and receipt of Services is subject to your acceptance of and compliance with these Terms of Service and all applicable laws and regulations. By clicking "accept" you acknowledge that you have read, understand and accept all terms and conditions contained in these Terms of Service and our Privacy Policy.</Paragraph>
            <Paragraph>The Site and Services are continually under development and we reserve the right to review or remove any part of these Terms of Service in our sole discretion at any time and without prior notice. Your continued use after a change has been posted constitutes your acceptance of the changes.</Paragraph>

            <SectionHeading>Availability</SectionHeading>
            <Paragraph>Our Services are currently only available to individuals located in the state of Florida. We provide concierge medical services through licensed physicians and other licensed medical professionals (the "Providers"). The Services include 24/7 Provider access via phone, text and video, same day and next day appointments with our Providers, comprehensive annual executive physicals and preventive care and wellness planning.</Paragraph>

            <SectionHeading>Eligibility</SectionHeading>
            <Paragraph>In order to qualify to use the Services, you must be 18 years or older to become a member and be located in the State of Florida, the only state where we currently provide Services. Membership is subject to availability and physician acceptance. We maintain a limited number of memberships to ensure quality care.</Paragraph>
            <Paragraph>You agree to pay our annual membership fees which are due upon enrollment. Fees are non-refundable except as otherwise provided by applicable law. Additional Services may incur separate charges. You agree to provide accurate and complete health information to our Providers, attend scheduled appointments or provide 24 hour advance notice for cancellations, treat our staff and Providers with respect, follow prescribed treatment plans and be legally bound by these Terms of Service.</Paragraph>
            <Paragraph>Satisfying the above requirements does not guarantee that you will receive Services from us. We reserve the right to change or include new requirements as deemed appropriate in our sole discretion.</Paragraph>

            <SectionHeading>Privacy Policy</SectionHeading>
            <Paragraph>We understand the importance of confidentiality and privacy regarding your health information. Please see our Privacy Policy available on the Site for a description of how we may collect and use your personal information. The Privacy Policy is incorporated into these Terms of Service by reference.</Paragraph>

            <SectionHeading>Consultative Service</SectionHeading>
            <Paragraph>In some cases, one of our Providers may use the Site to provide medical advice or treatment to you. A Provider consulting with you through the Site may not have the benefit of information that would be obtained by examining you in person. Therefore, the Provider may not be aware of facts or information that may affect his or her opinion regarding a potential diagnosis or treatment recommendation. We strongly encourage you to provide all relevant information and discuss any and all diagnosis and treatment options with your Provider.</Paragraph>
            <Paragraph>You agree and accept that any diagnosis you may receive from a Provider is limited and in some cases provisional. The healthcare services are not intended in all cases to replace a full medical evaluation or an in-person visit with a healthcare provider. A Provider acting through the Site may not have important information that is usually obtained through a physical examination, and the absence of a physical examination may affect the Provider's ability to diagnose any potential condition, disease or injury.</Paragraph>

            <SectionHeading>Prescriptions and Product Policy</SectionHeading>
            <Paragraph>If you receive a prescription as a result of the Services, you may select one of our partner pharmacies (the "Pharmacy Network") to ship your prescription. You give us consent to send and disclose to the Pharmacy Network all information provided by you, healthcare records and other applicable information so that you may receive pharmacy services.</Paragraph>
            <Paragraph>Neither we nor our Providers endorse any specific medication, pharmacy, product or device. Our Providers reserve the right to deny care for actual or potential misuse of the Services. You agree that any prescriptions acquired from our Providers will be solely for your personal use.</Paragraph>

            <SectionHeading>Payment</SectionHeading>
            <Paragraph>You agree to pay all fees due for services requested through the Site. By entering your payment information and submitting your request, you authorize us, our affiliates or our third-party payment processors to charge the amount due. You are responsible for all fees due to receive healthcare services and pharmacy services. Any services not made available through the Services are not included in the payments collected by us and you may be separately charged. We have no obligation to provide services unless and until full payment has been received.</Paragraph>

            <SectionHeading>Site Content</SectionHeading>
            <Paragraph>Except for specific communications received from our Providers, none of the content you receive through the Site should be considered medical advice.</Paragraph>

            <SectionHeading>Registration and User Accounts</SectionHeading>
            <Paragraph>You are obligated to register with us as a member in order to access the Services. You agree to provide information that is accurate, complete and correct and to accurately maintain and update any information about yourself. If you do not maintain such information, we have the right to suspend or terminate your account. You agree to notify us immediately of any unauthorized use of your username, password or any other breach of security.</Paragraph>
            <Paragraph>You agree to keep confidential your username and password and to exit from your account at the end of each session. You are responsible for all activities that occur under your account. You may not transfer or share your password with anyone or create more than one account.</Paragraph>

            <SectionHeading>Access Rights and Prohibited Use</SectionHeading>
            <Paragraph>Subject to your compliance with these Terms of Service, we grant you a personal, limited, revocable, non-exclusive and nontransferable right to view, download, access and use the Site solely for your personal and non-commercial use. We reserve the right to deny or suspend use of the Site or Services to anyone for any reason.</Paragraph>
            <Paragraph>You agree that you will not impersonate any person, use the Site to violate any law, reverse engineer any software, distribute viruses or harmful code, access or use the Site in any manner that infringes intellectual property rights, commercially exploit the Site, create competing products or services, take any action that could damage or interfere with the Site, or attempt to gain unauthorized access to any system.</Paragraph>

            <SectionHeading>Ownership of Site Content</SectionHeading>
            <Paragraph>We are the sole and exclusive owner of all right, title and interest in and to the Site and its content, features and functionality. You are not permitted to reproduce, publish, distribute, modify, create derivative works of, publicly display or exploit any material on our Site except as permitted through the Site according to these Terms of Service.</Paragraph>

            <SectionHeading>Use of Logos and Trademarks</SectionHeading>
            <Paragraph>Certain names, logos and other materials displayed on the Site may constitute trademarks, trade names, service marks or logos of us or our affiliates. You are not authorized to use any such marks without our express written permission.</Paragraph>

            <SectionHeading>Links to Third-Party Websites</SectionHeading>
            <Paragraph>The Site may contain hyperlinks or references to other websites operated by third parties. We are not responsible for the information, products or services described thereon. The inclusion of any link does not necessarily imply endorsement. Your use of these linked sites is at your own risk.</Paragraph>

            <SectionHeading>Termination</SectionHeading>
            <Paragraph>The Terms of Service will remain in full force and effect as long as you continue to access or use the Site or Services. You may terminate at any time by discontinuing use. We may terminate or suspend any rights granted by these Terms of Service with or without prior notice for any reason. After termination, we will have no further obligation to provide Services except to the extent we are obligated to provide access to your health records or continuing care under applicable legal, ethical and professional obligations.</Paragraph>

            <SectionHeading>Disclaimer of Warranties</SectionHeading>
            <Paragraph>The Site and any Services are provided on an "as is" and "as available" basis. We make no representations or warranties and expressly disclaim any and all warranties of any kind whether express or implied with respect to the Site and Services including but not limited to any representations or warranties with respect to merchantability, fitness for a particular purpose, non-infringement, title, availability, security, operability, accuracy of data, completeness, timeliness, functionality or reliability.</Paragraph>

            <SectionHeading>Limitation of Liability</SectionHeading>
            <Paragraph>To the extent permitted under applicable law, in no event will we be liable to you or to any party for any claims, liabilities, losses, costs or damages under any legal or equitable theory whether in tort, contract, warranty, statute or otherwise including but not limited to any indirect, incidental, special, consequential, punitive or exemplary damages including damages for loss of revenues, profits, goodwill, use or data, service interruption, computer or mobile phone damage or system failure. To the extent that we may not as a matter of applicable law disclaim any implied warranty or limit liabilities, the scope and duration of such warranty and the extent of our liability will be the minimum permitted under such applicable law.</Paragraph>

            <SectionHeading>Indemnification</SectionHeading>
            <Paragraph>You agree to indemnify, defend and hold harmless us, our affiliates and subsidiaries and their respective directors, officers, employees, contractors, licensors, suppliers, representatives, proprietors, partners, shareholders, servants, principals, agents, predecessors, successors, assigns, accountants and attorneys from and against any and all third-party suits, actions, claims, proceedings, damages, settlements, judgments, injuries, liabilities, obligations, losses, risks, costs and expenses relating to or arising from your use of materials or features on the Site in an unauthorized manner, fraud, violation of law, willful misconduct or any breach by you of these Terms of Service.</Paragraph>

            <SectionHeading>Governing Law and Dispute Resolution</SectionHeading>
            <Paragraph>These Terms of Service and your use of the Site shall be governed by the laws of the State of Florida without giving effect to the principles of conflict of laws. Any dispute arising under or relating to these Terms of Service will be resolved exclusively by final and binding arbitration in Hillsborough County, Florida under the rules of the American Arbitration Association, except that either party may bring a claim related to intellectual property rights or seek temporary and preliminary specific performance and injunctive relief in any court of competent jurisdiction.</Paragraph>

            <SectionHeading>Assignment</SectionHeading>
            <Paragraph>You may not assign any of your rights under these Terms of Service and any such attempt will be null and void. We may transfer all contractual rights and obligations pursuant to these Terms of Service if some or all of our business is transferred to another entity by way of merger, sale of assets or otherwise.</Paragraph>

            <SectionHeading>Contact Information</SectionHeading>
            <Paragraph>If you have any questions about these Terms of Service, please contact us.</Paragraph>
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

export default Terms;
