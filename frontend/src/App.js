import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Landing from "./pages/Landing";

import AdminDashboard from "./pages/AdminDashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import LeaveManagement from "./pages/LeaveManagement";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import EmployeeProfile from "./pages/EmployeeProfile";
import OrganizationManagement from "./pages/OrganizationManagement";
import PerformanceManagement from "./pages/PerformanceManagement";
import NotificationCenter from "./pages/NotificationCenter";
import PayrollManagement from "./pages/PayrollManagement";
import AuditLogs from "./pages/AuditLogs";
import HelpDeskManagement from "./pages/HelpDeskManagement";
import AIAssistant from "./pages/AIAssistant";

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/" element={<Landing />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute roles={['admin','hr']}>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/:id"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <EmployeeProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/:id/documents"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <EmployeeProfile defaultTab="documents" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute roles={['admin','employee','hr']}>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leave"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <LeaveManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute roles={['admin','hr']}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <Settings />
              </ProtectedRoute>
            }
          />



          <Route
            path="/admin/organization"
            element={
              <ProtectedRoute roles={['admin','hr']}>
                <OrganizationManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/performance"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <PerformanceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <NotificationCenter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payroll"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <PayrollManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <ProtectedRoute roles={['admin','hr']}>
                <AuditLogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/helpdesk"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <HelpDeskManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ai-assistant"
            element={
              <ProtectedRoute roles={['admin','hr','employee']}>
                <AIAssistant />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


