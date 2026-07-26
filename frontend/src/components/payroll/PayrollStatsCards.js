import React from 'react';
import { DollarSign, Clock, TrendingUp, ShieldCheck, Gift, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const PayrollStatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Salary Paid',
      value: stats?.totalSalaryPaid ? `$${stats.totalSalaryPaid.toLocaleString()}` : '$219,200',
      subtext: 'Completed disbursement batches',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Processed'
    },
    {
      title: 'Pending Payroll',
      value: stats?.pendingPayrollAmount ? `$${stats.pendingPayrollAmount.toLocaleString()}` : '$115,800',
      subtext: 'Awaiting finance / admin signoff',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      badge: 'In Review'
    },
    {
      title: 'Average Employee Salary',
      value: stats?.averageSalary ? `$${stats.averageSalary.toLocaleString()}` : '$109,600',
      subtext: 'Mean annual compensation',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Benchmark'
    },
    {
      title: 'Bonus & Incentives Paid',
      value: stats?.totalBonusPaid ? `$${stats.totalBonusPaid.toLocaleString()}` : '$5,000',
      subtext: 'Performance & OKR rewards',
      icon: Gift,
      color: 'from-purple-500 to-pink-600',
      badge: 'Rewards'
    },
    {
      title: 'Total Statutory Tax',
      value: stats?.totalTaxDeducted ? `$${stats.totalTaxDeducted.toLocaleString()}` : '$9,000',
      subtext: 'Monthly TDS / Tax withheld',
      icon: ShieldCheck,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Statutory'
    },
    {
      title: 'Payslips Issued',
      value: stats?.totalPayrollProcessedCount || '4',
      subtext: 'Verified QR payslip records',
      icon: FileText,
      color: 'from-teal-500 to-emerald-600',
      badge: 'Audited'
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

export default PayrollStatsCards;
