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
import Calendar from './pages/Calendar';
import Patients from './pages/Patients';
import LeadDetail from './pages/LeadDetail';
import MemberDetail from './pages/MemberDetail';
import Intake from './pages/Intake';
import Marketing from './pages/Marketing';
import ContentEditor from './pages/ContentEditor';
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
          <Route path="/calendar/" element={<Calendar />} />
          <Route path="/patients/" element={<Patients />} />
          <Route path="/patients/leads/:id/" element={<LeadDetail />} />
          <Route path="/patients/members/:id/" element={<MemberDetail />} />
          <Route path="/patients/new/" element={<Intake />} />
          <Route path="/marketing/" element={<Marketing />} />
          <Route path="/content/" element={<ContentEditor />} />
          <Route path="/images/" element={<Images />} />
          <Route path="/deploy/" element={<Deploy />} />
          <Route path="/settings/" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AdminApp;
