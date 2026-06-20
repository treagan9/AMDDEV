// src/pages/Team/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Physicians from './components/Physicians';
import Staff from './components/Staff';
import CTA from './components/CTA';

function Team() {
  return (
    <>
      <Helmet>
        <title>Our Team | AnswersMD&trade;</title>
        <meta name="description" content="Meet the physicians and staff behind AnswersMD. Board-certified doctors delivering personalized concierge medicine." />
      </Helmet>
      <Hero />
      <Physicians />
      <Staff />
      <CTA />
    </>
  );
}

export default Team;
