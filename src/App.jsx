// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './pages/Services';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/team/" element={<Team />} />
        <Route path="/services/" element={<Services />} />
      </Route>
    </Routes>
  );
}

export default App;
