import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, AlertTriangle, Info, AlertOctagon, Clock, 
  Check, Archive, Trash2, Shield, Award, Calendar, FileText, DollarSign, UserCheck 
} from 'lucide-react';

const NotificationCard = ({ notification, onMarkRead, onArchive, onDelete }) => {
  const getTypeConfig = (type) => {
    switch (type) {
      case 'Success':
        return { icon: CheckCircle2, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' };
      case 'Warning':
        return { icon: AlertTriangle, bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' };
      case 'Error':
        return { icon: AlertOctagon, bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' };
      case 'Reminder':
        return { icon: Clock, bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' };
      default:
        return { icon: Info, bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' };
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Medium':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const config = getTypeConfig(notification.type);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={`p-4 rounded-2xl bg-slate-900/80 border backdrop-blur-xl transition-all duration-200 shadow-lg flex items-start gap-4 ${
        notification.isRead ? 'border-slate-800/60 opacity-85' : 'border-emerald-500/40 bg-slate-900/95 shadow-emerald-500/5'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl ${config.bg} ${config.border} border flex items-center justify-center ${config.text} shrink-0 mt-0.5`}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(notification.priority)}`}>
              {notification.priority || 'Medium'}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {notification.category || 'System'}
            </span>
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Unread" />
            )}
          </div>

          <span className="text-[10px] text-slate-500 font-mono">
            {notification.createdAt ? new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
          </span>
        </div>

        <h4 className="text-sm font-bold text-white tracking-tight">{notification.title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed">{notification.description}</p>

        <div className="flex items-center justify-end gap-2 pt-2 text-xs">
          {!notification.isRead && (
            <button
              onClick={() => onMarkRead(notification._id)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] font-medium flex items-center gap-1 transition-colors"
            >
              <Check className="w-3 h-3" /> Mark Read
            </button>
          )}

          <button
            onClick={() => onArchive(notification._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Archive"
          >
            <Archive className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onDelete(notification._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
