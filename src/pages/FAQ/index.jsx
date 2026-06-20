// src/pages/FAQ/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Questions from './components/Questions';
import CTA from './components/CTA';

function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ | AnswersMD&trade;</title>
        <meta name="description" content="Frequently asked questions about AnswersMD concierge medicine memberships." />
      </Helmet>
      <Hero />
      <Questions />
      <CTA />
    </>
  );
}

export default FAQ;
