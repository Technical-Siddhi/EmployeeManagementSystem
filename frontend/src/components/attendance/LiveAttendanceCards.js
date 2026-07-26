import React from 'react';
import { motion } from 'framer-motion';
import { Users, Coffee, Clock, Calendar, Laptop, ShieldCheck } from 'lucide-react';

const LiveAttendanceCards = ({ stats }) => {
  const cards = [
    {
      title: 'Employees Working',
      value: stats?.workingCount || 142,
      subtext: 'Active logged-in staff',
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Clocked In'
    },
    {
      title: 'Employees On Break',
      value: stats?.onBreakCount || 18,
      subtext: 'Lunch / Tea / Meeting',
      icon: Coffee,
      color: 'from-amber-500 to-orange-600',
      badge: 'Break Active'
    },
    {
      title: 'Late Arrivals Today',
      value: stats?.lateCount || 6,
      subtext: 'Past grace threshold',
      icon: Clock,
      color: 'from-rose-500 to-pink-600',
      badge: 'Late Alert'
    },
    {
      title: 'Employees On Leave',
      value: stats?.onLeaveCount || 12,
      subtext: 'Approved PTO / Sick leave',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-600',
      badge: 'On Leave'
    },
    {
      title: 'Remote / WFH Band',
      value: stats?.remoteCount || 34,
      subtext: 'GPS verified remote logs',
      icon: Laptop,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Remote'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl hover:border-slate-700/80 transition-all duration-200 shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${card.color} p-0.5 shadow-md flex items-center justify-center text-white`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {card.badge}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-1">{card.value}</h3>
              <p className="text-xs font-semibold text-slate-300">{card.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{card.subtext}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LiveAttendanceCards;
