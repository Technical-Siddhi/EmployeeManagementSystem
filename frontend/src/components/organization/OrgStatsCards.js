import React from 'react';
import { Building2, Users, UserCheck, Layers, TrendingUp, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const OrgStatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Departments',
      value: stats?.totalDepartments || '5',
      subtext: 'Active Business Units',
      icon: Building2,
      color: 'from-indigo-500 to-blue-600',
      badge: 'Operational'
    },
    {
      title: 'Active Teams',
      value: stats?.totalTeams || '8',
      subtext: 'Cross-functional groups',
      icon: Layers,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Synced'
    },
    {
      title: 'Managers & Leads',
      value: stats?.totalManagers || '6',
      subtext: 'Supervisory Officers',
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Assigned'
    },
    {
      title: 'Total Employees',
      value: stats?.totalEmployees || '48',
      subtext: 'Active workforce headcount',
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      badge: 'Headcount'
    },
    {
      title: 'Avg Team Size',
      value: stats?.avgTeamSize || '6.0',
      subtext: 'Members per team',
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      badge: 'Balanced'
    },
    {
      title: 'Department Growth',
      value: stats?.departmentGrowth || '+12.5%',
      subtext: 'YoY Organizational expansion',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Quarterly'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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

export default OrgStatsCards;
