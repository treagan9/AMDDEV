// src/pages/Insurance/index.jsx
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Content from './components/Content';
import CTA from './components/CTA';

function Insurance() {
  return (
    <>
      <Helmet>
        <title>Insurance & Billing | AnswersMD&trade;</title>
        <meta name="description" content="Understanding how concierge medicine works with your health insurance. Learn what your AnswersMD membership covers." />
      </Helmet>
      <Hero />
      <Content />
      <CTA />
    </>
  );
}

export default Insurance;
