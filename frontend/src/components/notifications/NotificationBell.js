import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = ({ unreadCount = 0, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-md flex items-center justify-center"
      title="Notifications & Reminders"
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white font-mono shadow-md animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
