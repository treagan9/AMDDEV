// src/pages/Locations/StPete/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import LifeIn from './components/LifeIn';
import CoverageMap from './components/CoverageMap';
import CareWorks from './components/CareWorks';
import FAQ from './components/FAQ';
import Team from './components/Team';
import OtherLocations from './components/OtherLocations';
import CTA from './components/CTA';
 
function StPete() {
  return (
    <>
      <Helmet>
        <title>St. Petersburg | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD St. Petersburg. Concierge medicine by appointment across St. Pete with 24/7 direct physician access." />
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
 
export default StPete;
