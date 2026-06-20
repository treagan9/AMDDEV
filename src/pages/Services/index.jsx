// src/pages/Services/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ServicesList from './components/ServicesList';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

function Services() {
  return (
    <>
      <Helmet>
        <title>Our Approach | AnswersMD&trade;</title>
        <meta name="description" content="How AnswersMD delivers concierge medicine. Direct physician access, preventive care, house calls and more." />
      </Helmet>
      <Hero />
      <Stats />
      <ServicesList />
      <FAQ />
      <CTA />
    </>
  );
}

export default Services;
