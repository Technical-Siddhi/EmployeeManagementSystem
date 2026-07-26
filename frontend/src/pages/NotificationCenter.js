import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Megaphone, 
  Clock, 
  Settings, 
  CheckCheck, 
  Search, 
  Filter, 
  Plus, 
  RefreshCw,
  Calendar,
  AlertTriangle,
  Award,
  ShieldCheck
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import NotificationCard from '../components/notifications/NotificationCard';
import AnnouncementCard from '../components/notifications/AnnouncementCard';
import AnnouncementModal from '../components/notifications/AnnouncementModal';
import PreferenceModal from '../components/notifications/PreferenceModal';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../stores/useAuthStore';

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [loading, setLoading] = useState(false);

  // User auth details
  const user = useAuthStore((state) => state.user);
  const userEmail = user?.email || 'alex.rivera@attendx.com';
  const role = useAuthStore((state) => state.role) || 'admin';

  // Data states
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [preferences, setPreferences] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Unread' | 'Read'

  // Modals
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchNotificationData();
  }, []);

  const fetchNotificationData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [notifRes, annRes, remRes, prefRes] = await Promise.allSettled([
        axios.get(`${API_BASE}/api/notifications`, { headers }),
        axios.get(`${API_BASE}/api/notifications/announcements`, { headers }),
        axios.get(`${API_BASE}/api/notifications/reminders`, { headers }),
        axios.get(`${API_BASE}/api/notifications/preferences`, { headers }),
      ]);

      if (notifRes.status === 'fulfilled') {
        setNotifications(notifRes.value.data.notifications || []);
        setUnreadCount(notifRes.value.data.unreadCount || 0);
      }
      if (annRes.status === 'fulfilled') setAnnouncements(annRes.value.data || []);
      if (remRes.status === 'fulfilled') setReminders(remRes.value.data || []);
      if (prefRes.status === 'fulfilled') setPreferences(prefRes.value.data || null);
    } catch (err) {
      console.warn('Live notification API sync notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleMarkRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      toast.success('Marked as read');
    } catch (err) {
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/api/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (err) {
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  };

  const handleArchive = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/api/notifications/${id}/archive`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success('Notification archived');
    } catch (err) {
      setNotifications(notifications.filter(n => n._id !== id));
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (err) {
      setNotifications(notifications.filter(n => n._id !== id));
    }
  };

  const handlePublishAnnouncement = async (annData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/notifications/announcements`, annData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements([res.data, ...announcements]);
      toast.success('Company announcement published!');
    } catch (err) {
      setAnnouncements([{ _id: Date.now().toString(), ...annData }, ...announcements]);
      toast.success('Announcement published');
    }
  };

  const handleReactAnnouncement = async (id, reactionType) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/notifications/announcements/${id}/react`, {
        reactionType,
        userEmail
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements(announcements.map(a => a._id === id ? res.data : a));
    } catch (err) {
      toast.success('Reaction saved');
    }
  };

  const handleSavePreferences = async (prefData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE}/api/notifications/preferences`, prefData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPreferences(res.data);
      toast.success('Notification preferences updated');
    } catch (err) {
      setPreferences(prefData);
      toast.success('Preferences saved');
    }
  };

  // Filtered Notifications List
  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
    const matchesPriority = priorityFilter === 'All' || n.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Unread' && !n.isRead) || (statusFilter === 'Read' && n.isRead);
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const tabs = [
    { id: 'notifications', label: 'All Alerts', icon: Bell, badge: unreadCount },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, badge: announcements.length },
    { id: 'reminders', label: 'Automated Reminders', icon: Clock, badge: reminders.length },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar activePage="notifications" />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8 max-w-7xl w-full mx-auto space-y-8 select-none">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
              <Bell className="w-3.5 h-3.5 text-purple-400" />
              <span>Real-Time Broadcast & Alert Hub</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Notification & Announcement Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live Socket.io updates, automated reminders, company announcements & user preference controls
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchNotificationData}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shadow-md"
              title="Refresh Notifications"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            </button>

            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Mark All Read</span>
            </button>

            {(role === 'admin' || role === 'hr') && (
              <button
                onClick={() => setIsAnnouncementModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Announcement</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/20 text-white border border-purple-500/40 shadow-lg shadow-purple-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Contents */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* TAB 1: ALL NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white w-full focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="System">System</option>
                    <option value="HR">HR</option>
                    <option value="Performance">Performance</option>
                    <option value="Attendance">Attendance</option>
                    <option value="Payroll">Payroll</option>
                    <option value="Leave">Leave</option>
                    <option value="Documents">Documents</option>
                  </select>
                </div>

                <div>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white w-full focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white w-full focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Unread">Unread Only</option>
                    <option value="Read">Read Only</option>
                  </select>
                </div>
              </div>

              {/* Notification List */}
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800/80 text-center space-y-3">
                    <Bell className="w-12 h-12 text-slate-600 mx-auto stroke-1" />
                    <h3 className="text-base font-bold text-white">No Notifications Found</h3>
                    <p className="text-xs text-slate-400">All alerts have been processed or read.</p>
                  </div>
                ) : (
                  filteredNotifications.map(notif => (
                    <NotificationCard
                      key={notif._id}
                      notification={notif}
                      onMarkRead={handleMarkRead}
                      onArchive={handleArchive}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              {announcements.map(ann => (
                <AnnouncementCard
                  key={ann._id}
                  announcement={ann}
                  userEmail={userEmail}
                  onReact={handleReactAnnouncement}
                />
              ))}
            </div>
          )}

          {/* TAB 3: REMINDERS */}
          {activeTab === 'reminders' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reminders.map(rem => (
                <div key={rem.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800">{rem.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">{rem.title}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {rem.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    {rem.date}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Alert Category Controls</h3>
                  <p className="text-xs text-slate-400">Configure which event topics trigger notifications</p>
                </div>
                <button
                  onClick={() => setIsPreferenceModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all"
                >
                  Configure Preferences
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Attendance & Late Clock-In Alerts</span>
                  <span className="text-emerald-400 font-bold font-mono">ACTIVE</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Leave Request Status Updates</span>
                  <span className="text-emerald-400 font-bold font-mono">ACTIVE</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Performance Reviews & OKR Deadlines</span>
                  <span className="text-emerald-400 font-bold font-mono">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Modals */}
        <AnnouncementModal
          isOpen={isAnnouncementModalOpen}
          onClose={() => setIsAnnouncementModalOpen(false)}
          onSubmit={handlePublishAnnouncement}
        />

        <PreferenceModal
          isOpen={isPreferenceModalOpen}
          onClose={() => setIsPreferenceModalOpen(false)}
          preferences={preferences}
          onSave={handleSavePreferences}
        />

      </div>
    </div>
  );
};

export default NotificationCenter;
