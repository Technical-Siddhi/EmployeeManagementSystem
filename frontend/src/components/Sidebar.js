import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Clock, FileText, Calendar, Settings, LogOut, Shield, Sparkles, Building2, TrendingUp, Bell, DollarSign, ShieldCheck, LifeBuoy } from 'lucide-react';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = ({ activePage }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const rawRole = useAuthStore((state) => state.role) || user?.role || 'admin';
  const role = rawRole.toString().toLowerCase().trim();
  const navigate = useNavigate();

  const menuItemsByRole = {
    admin: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
      { id: 'employees', icon: Users, label: 'Employees', path: '/admin/employees' },
      { id: 'organization', icon: Building2, label: 'Organization', path: '/admin/organization' },
      { id: 'performance', icon: TrendingUp, label: 'Performance', path: '/admin/performance' },
      { id: 'payroll', icon: DollarSign, label: 'Payroll', path: '/admin/payroll' },
      { id: 'notifications', icon: Bell, label: 'Notifications', path: '/admin/notifications' },
      { id: 'audit-logs', icon: ShieldCheck, label: 'Audit Logs', path: '/admin/audit-logs' },
      { id: 'helpdesk', icon: LifeBuoy, label: 'Help Desk', path: '/admin/helpdesk' },
      { id: 'ai-assistant', icon: Sparkles, label: 'AI Assistant', path: '/admin/ai-assistant' },
      { id: 'attendance', icon: Clock, label: 'Attendance', path: '/admin/attendance' },
      { id: 'leave', icon: Calendar, label: 'Leave Requests', path: '/admin/leave' },
      { id: 'reports', icon: FileText, label: 'Analytics & Reports', path: '/admin/reports' },
      { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
    hr: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/hr/dashboard' },
      { id: 'employees', icon: Users, label: 'Employees', path: '/admin/employees' },
      { id: 'organization', icon: Building2, label: 'Organization', path: '/admin/organization' },
      { id: 'performance', icon: TrendingUp, label: 'Performance', path: '/admin/performance' },
      { id: 'payroll', icon: DollarSign, label: 'Payroll', path: '/admin/payroll' },
      { id: 'notifications', icon: Bell, label: 'Notifications', path: '/admin/notifications' },
      { id: 'audit-logs', icon: ShieldCheck, label: 'Audit Logs', path: '/admin/audit-logs' },
      { id: 'helpdesk', icon: LifeBuoy, label: 'Help Desk', path: '/admin/helpdesk' },
      { id: 'ai-assistant', icon: Sparkles, label: 'AI Assistant', path: '/admin/ai-assistant' },
      { id: 'attendance', icon: Clock, label: 'Attendance', path: '/admin/attendance' },
      { id: 'leave', icon: Calendar, label: 'Leave Requests', path: '/admin/leave' },
      { id: 'reports', icon: FileText, label: 'Reports', path: '/admin/reports' },
      { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
    manager: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/manager/dashboard' },
      { id: 'employees', icon: Users, label: 'Team Members', path: '/admin/employees' },
      { id: 'performance', icon: TrendingUp, label: 'Performance', path: '/admin/performance' },
      { id: 'notifications', icon: Bell, label: 'Notifications', path: '/admin/notifications' },
      { id: 'helpdesk', icon: LifeBuoy, label: 'Help Desk', path: '/admin/helpdesk' },
      { id: 'ai-assistant', icon: Sparkles, label: 'AI Assistant', path: '/admin/ai-assistant' },
      { id: 'attendance', icon: Clock, label: 'Attendance', path: '/admin/attendance' },
      { id: 'leave', icon: Calendar, label: 'Leave Approvals', path: '/admin/leave' },
      { id: 'reports', icon: FileText, label: 'Reports', path: '/admin/reports' },
      { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
    employee: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/employee/dashboard' },
      { id: 'ai-assistant', icon: Sparkles, label: 'AI Assistant', path: '/admin/ai-assistant' },
      { id: 'helpdesk', icon: LifeBuoy, label: 'Help Desk', path: '/admin/helpdesk' },
      { id: 'payroll', icon: DollarSign, label: 'My Salary Slips', path: '/admin/payroll' },
      { id: 'notifications', icon: Bell, label: 'Notifications', path: '/admin/notifications' },
      { id: 'performance', icon: TrendingUp, label: 'Performance', path: '/admin/performance' },
      { id: 'attendance', icon: Clock, label: 'My Attendance', path: '/admin/attendance' },
      { id: 'leave', icon: Calendar, label: 'My Leave', path: '/admin/leave' },
      { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
  };

  const menuItems = menuItemsByRole[role] || menuItemsByRole.admin;

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <motion.aside 
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 200 }}
      className="fixed inset-y-0 left-0 z-50 w-64 h-screen bg-slate-900/90 backdrop-blur-2xl border-r border-slate-800/80 text-slate-100 flex flex-col justify-between p-5 select-none shadow-2xl overflow-y-auto"
    >
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/60">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              AttendX
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
              <Shield className="w-3 h-3 text-indigo-400" />
              <span className="capitalize">{role} Portal</span>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1.5">
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            Main Navigation
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`group relative w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full shadow-md shadow-indigo-500"
                  />
                )}
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'
                }`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer Card & Logout */}
      <div className="pt-4 border-t border-slate-800/60 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800/60">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || 'admin@attendx.com'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 transition-all duration-200 text-sm font-semibold active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
