import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, DollarSign, LifeBuoy, Users, TrendingUp, FileText } from 'lucide-react';

const SuggestedPromptCards = ({ onSelectPrompt }) => {
  const prompts = [
    {
      title: 'Employees On Leave Today',
      prompt: 'Show employees on leave today',
      icon: Calendar,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'March Payroll Summary',
      prompt: 'Show payroll summary for March',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Overtime Worked Yesterday',
      prompt: 'Who worked overtime yesterday?',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Unresolved Support Tickets',
      prompt: 'Which employees have unresolved Help Desk tickets?',
      icon: LifeBuoy,
      color: 'from-rose-500 to-pink-600'
    },
    {
      title: 'New Hires This Month',
      prompt: 'How many employees joined this month?',
      icon: Users,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Expiring Vault Documents',
      prompt: 'List employees whose documents will expire in 30 days',
      icon: FileText,
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
      {prompts.map((p, idx) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.04 }}
            onClick={() => onSelectPrompt(p.prompt)}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl hover:border-indigo-500/50 hover:bg-slate-800/50 cursor-pointer transition-all shadow-md group flex items-center gap-3"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${p.color} p-0.5 flex items-center justify-center text-white shrink-0 shadow-md`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">{p.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-1">{p.prompt}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SuggestedPromptCards;
