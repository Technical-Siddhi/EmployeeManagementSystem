import React, { useState } from 'react';
import { X, Settings, Bell, Mail, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PreferenceModal = ({ isOpen, onClose, preferences, onSave }) => {
  const [formData, setFormData] = useState(preferences || {
    attendanceAlerts: true,
    leaveAlerts: true,
    performanceAlerts: true,
    announcementAlerts: true,
    payrollAlerts: true,
    emailNotifications: true,
    browserNotifications: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const toggleField = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Notification Preferences</h3>
                <p className="text-xs text-slate-400">Manage real-time alert channels & categories</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Alert Categories</h4>
              
              {[
                { key: 'attendanceAlerts', label: 'Attendance & Clock-In Alerts' },
                { key: 'leaveAlerts', label: 'Leave Request Status Updates' },
                { key: 'performanceAlerts', label: 'Performance Reviews & Goal Deadlines' },
                { key: 'announcementAlerts', label: 'Company Announcements & All-Hands' },
                { key: 'payrollAlerts', label: 'Payroll & Salary Adjustments' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                  <button
                    type="button"
                    onClick={() => toggleField(item.key)}
                    className={`w-11 h-6 rounded-full p-1 transition-colors ${
                      formData[item.key] ? 'bg-purple-600' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      formData[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Delivery Channels</h4>

              {[
                { key: 'emailNotifications', label: 'Email Digest Notifications', icon: Mail },
                { key: 'browserNotifications', label: 'Browser In-App Push Alerts', icon: Smartphone }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleField(item.key)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors ${
                        formData[item.key] ? 'bg-indigo-600' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        formData[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PreferenceModal;
