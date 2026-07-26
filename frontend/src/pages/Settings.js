import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, Shield, Lock, Save, Camera, Bell, Building, Check, Key, Smartphone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../stores/useAuthStore';
import toast from 'react-hot-toast';

const Settings = () => {
  const activePage = 'settings';
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role) || 'Administrator';

  const [activeTab, setActiveTab] = useState('profile');

  const [profile, setProfile] = useState({
    name: user?.name || 'Administrator',
    email: user?.email || 'admin@attendx.com',
    department: 'Executive Management',
    phone: '+1 (555) 234-5678',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    leaveApprovals: true,
    dailySummary: false,
    securityLogs: true,
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile details saved successfully');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please complete all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Security password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activePage={activePage} />
      
      <main className="flex-1 ml-64 min-h-screen p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90 border-indigo-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Preferences</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              System & Account Settings
            </h1>
            <p className="text-sm text-slate-400 mt-1">Manage profile credentials, system security, and notification preferences</p>
          </div>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
          {[
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'security', label: 'Security & Auth', icon: Lock },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'organization', label: 'Organization', icon: Building },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* User Badge Card */}
            <div className="glass-card flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="relative group cursor-pointer">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-4xl shadow-xl shadow-indigo-500/20">
                  {profile.name.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-slate-950/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100">{profile.name}</h3>
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mt-1">{role}</p>
                <p className="text-xs text-slate-500 mt-0.5">{profile.email}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 w-full flex items-center justify-center gap-2">
                <span className="badge-emerald">
                  <Check className="w-3.5 h-3.5" /> Verified Account
                </span>
              </div>
            </div>

            {/* Profile Edit Form */}
            <div className="lg:col-span-2 glass-card space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-400" />
                  Personal Information
                </h3>
                <p className="text-xs text-slate-400">Update your account name, email, and contact numbers</p>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Department</label>
                    <input
                      type="text"
                      value={profile.department}
                      onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-slate-800">
                  <button type="submit" className="btn-primary text-sm">
                    <Save className="w-4 h-4" /> Save Profile Details
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl glass-card space-y-6"
          >
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                Change Password & Credentials
              </h3>
              <p className="text-xs text-slate-400">Ensure your password is long and uses complex characters</p>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm flex items-center gap-2">
                  <Key className="w-4 h-4" /> Update Security Key
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl glass-card space-y-6"
          >
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-400" />
                Notification Preferences
              </h3>
              <p className="text-xs text-slate-400">Configure automated email triggers and dashboard alerts</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailAlerts', title: 'Email Alerts for Absences', desc: 'Receive instant notification when an employee marks absent' },
                { key: 'leaveApprovals', title: 'Leave Application Pending Triggers', desc: 'Notify managers when new leave applications are submitted' },
                { key: 'dailySummary', title: 'Daily Automated Executive Digest', desc: 'Receive an automated end-of-day summary of daily attendance stats' },
                { key: 'securityLogs', title: 'Security & Sign-in Alerts', desc: 'Alert on unrecognized login attempts' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setNotifications({ ...notifications, [item.key]: !notifications[item.key] });
                      toast.success('Preference updated');
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition-all ${
                      notifications[item.key] ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      notifications[item.key] ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'organization' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl glass-card space-y-6"
          >
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-400" />
                Organization Details
              </h3>
              <p className="text-xs text-slate-400">System workspace metadata</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Company Name</span>
                <p className="font-bold text-slate-200">AttendX Enterprise Corp</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Timezone</span>
                <p className="font-bold text-slate-200">America/New_York (UTC-5)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Default Working Hours</span>
                <p className="font-bold text-slate-200">09:00 AM - 05:00 PM (8 hrs)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">System Version</span>
                <p className="font-bold text-indigo-400">v2.4.0-Production</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Settings;
