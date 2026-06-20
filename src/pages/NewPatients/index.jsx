// src/pages/NewPatients/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Editorial from './components/Editorial';
import Comfort from './components/Comfort';
import Journey from './components/Journey';
import DeepDive from './components/DeepDive';
import LabPanels from './components/LabPanels';
import Prepare from './components/Prepare';
import OngoingCare from './components/OngoingCare';
import CTA from './components/CTA';

function NewPatients() {
  return (
    <>
      <Helmet>
        <title>What to Expect | AnswersMD&trade;</title>
        <meta name="description" content="Your guide to joining AnswersMD. From your first consultation to comprehensive care." />
      </Helmet>
      <Hero />
      <Editorial />
      <Comfort />
      <Journey />
      <DeepDive />
      <LabPanels />
      <Prepare />
      <OngoingCare />
      <CTA />
    </>
  );
}

export default NewPatients;
