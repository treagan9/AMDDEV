// src/pages/Executive/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import Programs from './components/Programs';
import Benefits from './components/Benefits';
import Steps from './components/Steps';
import CTA from './components/CTA';

function Executive() {
  return (
    <>
      <Helmet>
        <title>Executive & Corporate Health | AnswersMD&trade;</title>
        <meta name="description" content="Executive health programs and corporate concierge medicine. 24/7 physician access for C-suite and key employees." />
      </Helmet>
      <Hero />
      <ValueProp />
      <Programs />
      <Benefits />
      <Steps />
      <CTA />
    </>
  );
}

export default Executive;
