// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './pages/Services';
import NewPatients from './pages/NewPatients';
import Contact from './pages/Contact';
import Signup from './pages/Signup'
import FAQ from './pages/FAQ'
import FAQ from './pages/FAQ'
import Insurance from './pages/Insurance';
import Tampa from './pages/Locations/Tampa';
import StPete from './pages/Locations/StPete';
import BocaRaton from './pages/Locations/BocaRaton';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/team/" element={<Team />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/new-patients/" element={<NewPatients />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/faq/" element={<FAQ />} />
        <Route path="/faq/" element={<FAQ />} />
        <Route path="/insurance/" element={<Insurance />} />
        <Route path="/location-tampa/" element={<Tampa />} />
        <Route path="/location-st-pete/" element={<StPete />} />
        <Route path="/location-boca-raton/" element={<BocaRaton />} />
      </Route>
      <Route path="/signup/" element={<Signup />} />
    </Routes>
  );
}

export default App;
