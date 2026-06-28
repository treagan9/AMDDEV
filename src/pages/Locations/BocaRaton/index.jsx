// src/pages/Locations/BocaRaton/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import LifeIn from './components/LifeIn';
import CoverageMap from './components/CoverageMap';
import Team from './components/Team';
import CTA from './components/CTA';
 
function BocaRaton() {
  return (
    <>
      <Helmet>
        <title>Boca Raton | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD Boca Raton. Concierge medicine coming soon to South Florida and Palm Beach County. Join our waitlist." />
      </Helmet>
      <Hero />
      <LifeIn />
      <CoverageMap />
      <Team />
      <CTA />
    </>
  );
}
 
export default BocaRaton;
