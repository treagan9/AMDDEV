// src/pages/Locations/Tampa/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import LifeIn from './components/LifeIn';
import MapDirections from './components/MapDirections';
import Gallery from './components/Gallery';
import Team from './components/Team';
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
      <MapDirections />
      <Gallery />
      <Team />
      <CTA />
    </>
  );
}
 
export default Tampa;
