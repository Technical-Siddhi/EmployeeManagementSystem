import React from 'react';
import { X, Bell, CheckCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NotificationCard from './NotificationCard';

const NotificationDrawer = ({ isOpen, onClose, notifications = [], onMarkRead, onMarkAllRead, onArchive, onDelete }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Real-Time Alerts</h3>
                <p className="text-[11px] text-slate-400">Recent system notifications & reminders</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllRead}
                className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors text-xs font-semibold"
                title="Mark All as Read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 no-scrollbar">
            {notifications.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <Bell className="w-10 h-10 mx-auto stroke-1 opacity-50" />
                <p className="text-xs">No unread notifications right now</p>
              </div>
            ) : (
              notifications.slice(0, 8).map(notif => (
                <NotificationCard
                  key={notif._id}
                  notification={notif}
                  onMarkRead={onMarkRead}
                  onArchive={onArchive}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>

          {/* Footer Link */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                onClose();
                navigate('/admin/notifications');
              }}
              className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-purple-400 hover:text-white hover:bg-slate-800 flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Open Full Notification Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationDrawer;
