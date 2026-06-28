// src/pages/Locations/BocaRaton/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import LifeIn from './components/LifeIn';
import CoverageMap from './components/CoverageMap';
import CareWorks from './components/CareWorks';
import FAQ from './components/FAQ';
import Team from './components/Team';
import OtherLocations from './components/OtherLocations';
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
      <CareWorks />
      <FAQ />
      <Team />
      <OtherLocations />
      <CTA />
    </>
  );
}
 
export default BocaRaton;
