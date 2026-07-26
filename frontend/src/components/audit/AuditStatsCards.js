import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Lock, FileText, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const AuditStatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Today's Activities",
      value: stats?.todayActivitiesCount || 148,
      subtext: 'System events recorded',
      icon: Activity,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Active Log'
    },
    {
      title: 'Failed Login Attempts',
      value: stats?.failedLoginsCount || 3,
      subtext: 'Untrusted IP / Password errors',
      icon: Lock,
      color: 'from-rose-500 to-pink-600',
      badge: 'Security Alert'
    },
    {
      title: 'Critical System Events',
      value: stats?.criticalEventsCount || 1,
      subtext: 'Privilege escalation / Lockouts',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-600',
      badge: 'High Priority'
    },
    {
      title: 'Payroll & Disbursal Logs',
      value: stats?.payrollGeneratedCount || 12,
      subtext: 'Batch calculations & payslips',
      icon: ShieldCheck,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Audited'
    },
    {
      title: 'Documents Uploaded',
      value: stats?.documentsUploadedCount || 28,
      subtext: 'Vault files & contracts',
      icon: FileText,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Vault Log'
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

export default AuditStatsCards;
