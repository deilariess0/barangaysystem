import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { DashboardPage } from '../pages/DashboardPage';
import { ResidentsPage } from '../pages/ResidentsPage';
import { GenericPage } from '../pages/GenericPage';
import { CensusPage } from '../pages/CensusPage';

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/residents" element={<ResidentsPage />} />
        <Route path="/census" element={<CensusPage />} />
        
        {['households', 'certificates', 'requests', 'complaints', 'blotter', 'payments', 'announcements', 'events', 'reports', 'users', 'audit-logs', 'settings'].map(path => (
          <Route key={path} path={`/${path}`} element={<GenericPage section={path} />} />
        ))}
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}