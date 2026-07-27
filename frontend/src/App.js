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

import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from './components/ProtectedRoute';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'dummy_client_id.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100">
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/" element={<Landing />} />

          {/* Role-Specific Dashboards */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/dashboard"
            element={
              <ProtectedRoute allowedRoles={['HR', 'hr', 'Admin', 'admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Manager', 'manager', 'Admin', 'admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin', 'HR', 'hr', 'Manager', 'manager']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Module Routes */}
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager']}>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/:id"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <EmployeeProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/:id/documents"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <EmployeeProfile defaultTab="documents" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leave"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <LeaveManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager']}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/organization"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr']}>
                <OrganizationManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/performance"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <PerformanceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <NotificationCenter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payroll"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <PayrollManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr']}>
                <AuditLogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/helpdesk"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <HelpDeskManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ai-assistant"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'admin', 'HR', 'hr', 'Manager', 'manager', 'Employee', 'employee']}>
                <AIAssistant />
              </ProtectedRoute>
            }
          />

          {/* Employee Route Aliases */}
          <Route
            path="/employee/attendance"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin']}>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/leave"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin']}>
                <LeaveManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/settings"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin']}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/performance"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin']}>
                <PerformanceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/notifications"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin']}>
                <NotificationCenter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/helpdesk"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin']}>
                <HelpDeskManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/ai-assistant"
            element={
              <ProtectedRoute allowedRoles={['Employee', 'employee', 'Admin', 'admin']}>
                <AIAssistant />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;


