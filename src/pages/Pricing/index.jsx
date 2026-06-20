// src/pages/Pricing/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Plans from './components/Plans';
import Details from './components/Details';
import CTA from './components/CTA';

function Pricing() {
  return (
    <>
      <Helmet>
        <title>Membership & Pricing | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD concierge medicine membership pricing. Transparent pricing based on age with family options available." />
      </Helmet>
      <Hero />
      <Plans />
      <Details />
      <CTA />
    </>
  );
}

export default Pricing;
