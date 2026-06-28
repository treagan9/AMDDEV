// src/pages/Locations/Tampa/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import LifeIn from './components/LifeIn';
import CareWorks from './components/CareWorks';
import MapDirections from './components/MapDirections';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Gallery from './components/Gallery';
import Team from './components/Team';
import OtherLocations from './components/OtherLocations';
import CTA from './components/CTA';
 
function Tampa() {
  return (
    <>
      <Helmet>
        <title>Tampa | AnswersMD&trade;</title>
        <meta name="description" content="AnswersMD Tampa. Flagship concierge medicine location with 24/7 physician access at 4100 W Kennedy Blvd, Tampa, Florida." />
      </Helmet>
      <Hero />
      <LifeIn />
      <CareWorks />
      <MapDirections />
      <Reviews />
      <FAQ />
      <Gallery />
      <Team />
      <OtherLocations />
      <CTA />
    </>
  );
}
 
export default Tampa;
