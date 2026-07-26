import React from 'react';
import { LifeBuoy, CheckCircle2, Clock, AlertTriangle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const HelpDeskStatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Open Tickets',
      value: stats?.openTicketsCount || 8,
      subtext: 'Active service requests',
      icon: LifeBuoy,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Active Queue'
    },
    {
      title: 'Resolved Today',
      value: stats?.resolvedTodayCount || 14,
      subtext: 'Closed / Solved cases',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Completed'
    },
    {
      title: 'Pending Employee Input',
      value: stats?.pendingTicketsCount || 3,
      subtext: 'Waiting for info',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      badge: 'Awaiting User'
    },
    {
      title: 'SLA Breaches',
      value: stats?.slaBreachesCount || 1,
      subtext: 'Overdue resolution targets',
      icon: AlertTriangle,
      color: 'from-rose-500 to-pink-600',
      badge: 'Action Needed'
    },
    {
      title: 'Customer Satisfaction',
      value: `${stats?.csatScore || 4.8} / 5.0 ⭐`,
      subtext: 'Average employee rating',
      icon: Star,
      color: 'from-cyan-500 to-blue-600',
      badge: 'CSAT High'
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

export default HelpDeskStatsCards;
