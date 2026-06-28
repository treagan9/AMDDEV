// src/pages/Locations/StPete/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import LifeIn from './components/LifeIn';
import CoverageMap from './components/CoverageMap';
import Team from './components/Team';
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
      <Team />
      <CTA />
    </>
  );
}
 
export default StPete;
