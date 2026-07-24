import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Clock, FileText, Calendar, Settings, LogOut } from 'lucide-react';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = ({ activePage }) => {
  const logout = useAuthStore((state) => state.logout);
  const role = useAuthStore((state) => state.role);
  const navigate = useNavigate();

  const menuItemsByRole = {
    admin: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
      { id: 'employees', icon: Users, label: 'Employees', path: '/admin/employees' },
      { id: 'attendance', icon: Clock, label: 'Attendance', path: '/admin/attendance' },
      { id: 'leave', icon: Calendar, label: 'Leave', path: '/admin/leave' },
      { id: 'reports', icon: FileText, label: 'Reports', path: '/admin/reports' },
      { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
    hr: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
      { id: 'employees', icon: Users, label: 'Employees', path: '/admin/employees' },
      // Attendance page exists in UI; permission enforcement will happen on API level for now.
      { id: 'leave', icon: Calendar, label: 'Leave', path: '/admin/leave' },
      { id: 'reports', icon: FileText, label: 'Reports', path: '/admin/reports' },
      { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
    employee: [
      { id: 'attendance', icon: Clock, label: 'Attendance', path: '/admin/attendance' },
      { id: 'leave', icon: Calendar, label: 'Leave', path: '/admin/leave' },
      { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
    ],
  };

  const menuItems = role ? menuItemsByRole[role] || [] : [];


  const Icon = ({ icon: IconComponent }) => <IconComponent className="w-5 h-5" />;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
className="fixed inset-y-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-2xl flex flex-col p-6 lg:translate-x-0 overflow-y-auto"
    >
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-slate-400 text-sm">Management Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-medium ${
              activePage === item.id
                ? 'bg-primary-500/20 hover:bg-primary-500/30'
                : 'hover:bg-slate-700/50'
            }`}
            onClick={() => navigate(item.path)}
          >
            <Icon icon={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-xl transition-all duration-200 font-medium"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </motion.aside>
  );
};

export default Sidebar;

