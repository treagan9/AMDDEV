// src/pages/Locations/Index/index.jsx
import SEO from '../../../components/shared/SEO';
import Hero from './components/Hero';
import LocationsGrid from './components/LocationsGrid';
import CareWorks from './components/CareWorks';
import CTA from './components/CTA';
 
function LocationsIndex() {
  return (
    <>
      <SEO route="/locations/" />
      <Hero />
      <LocationsGrid />
      <CareWorks />
      <CTA />
    </>
  );
}
 
export default LocationsIndex;
