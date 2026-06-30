// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './pages/Services';
import NewPatients from './pages/NewPatients';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import FAQ from './pages/FAQ';
import Insurance from './pages/Insurance';
import Executive from './pages/Executive';
import Pricing from './pages/Pricing';
import Stories from './pages/Stories';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import LocationsIndex from './pages/Locations/Index';
import PhysicianProfile from './pages/Team/PhysicianProfile';
import Tampa from './pages/Locations/Tampa';
import StPete from './pages/Locations/StPete';
import BocaRaton from './pages/Locations/BocaRaton';
import AdminApp from './admin/AdminApp';
 
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/team/" element={<Team />} />
        <Route path="/team/:slug/" element={<PhysicianProfile />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/new-patients/" element={<NewPatients />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/faq/" element={<FAQ />} />
        <Route path="/insurance/" element={<Insurance />} />
        <Route path="/executive/" element={<Executive />} />
        <Route path="/pricing/" element={<Pricing />} />
        <Route path="/stories/" element={<Stories />} />
        <Route path="/privacy/" element={<Privacy />} />
        <Route path="/terms/" element={<Terms />} />
        <Route path="/locations/" element={<LocationsIndex />} />
        <Route path="/location-tampa/" element={<Tampa />} />
        <Route path="/location-st-pete/" element={<StPete />} />
        <Route path="/location-boca-raton/" element={<BocaRaton />} />
        <Route path="/signup/" element={<Signup />} />
      </Route>
      <Route path="/answersmd-admin/*" element={<AdminApp />} />
    </Routes>
  );
}
 
export default App;
