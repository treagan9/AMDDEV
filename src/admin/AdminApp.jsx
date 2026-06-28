// src/admin/AdminApp.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/useAuth.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RequestAccount from './pages/RequestAccount';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail';
import Intake from './pages/Intake';
import EmailComposer from './pages/EmailComposer';
import Images from './pages/Images';
import Deploy from './pages/Deploy';
import Settings from './pages/Settings';

function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        <Route path="/request-account/" element={<RequestAccount />} />
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/leads/" element={<Leads />} />
          <Route path="/leads/:id/" element={<LeadDetail />} />
          <Route path="/members/" element={<Members />} />
          <Route path="/members/:id/" element={<MemberDetail />} />
          <Route path="/intake/" element={<Intake />} />
          <Route path="/email/" element={<EmailComposer />} />
          <Route path="/images/" element={<Images />} />
          <Route path="/deploy/" element={<Deploy />} />
          <Route path="/settings/" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AdminApp;
