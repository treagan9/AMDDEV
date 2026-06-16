// src/pages/Home/index.jsx
import { Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import PromoBanner from './components/PromoBanner';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Locations from './components/Locations';
import CTA from './components/CTA';

function Home() {
  return (
    <>
      <Helmet>
        <title>AnswersMD | Concierge Medicine. Simplified.</title>
        <meta name="description" content="Direct access to your physician whenever you need it. Personalized, accessible and designed around your life. Tampa, St. Petersburg and Boca Raton." />
      </Helmet>
      <Box>
        <Hero />
        <PromoBanner />
        <About />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <Locations />
        <CTA />
      </Box>
    </>
  );
}

export default Home;
