// src/pages/Stories/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Voices from './components/Voices';
import Stats from './components/Stats';
import CTA from './components/CTA';

function Stories() {
  return (
    <>
      <Helmet>
        <title>Patient Stories | AnswersMD&trade;</title>
        <meta name="description" content="Real stories from AnswersMD members about their experience with concierge medicine." />
      </Helmet>
      <Hero />
      <Featured />
      <Voices />
      <Stats />
      <CTA />
    </>
  );
}

export default Stories;
