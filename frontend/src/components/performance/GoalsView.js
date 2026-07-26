import React, { useState } from 'react';
import { Target, Plus, Edit2, Trash2, Calendar, User, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GoalsView = ({ goals, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGoals = goals.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.assignedEmployeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.goalType.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search goals by title, type, or assigned employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredGoals.length} OKR Goals
          </span>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Performance Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map((goal, idx) => (
          <motion.div
            key={goal._id || goal.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-200 shadow-xl space-y-4 relative group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {goal.goalType || 'Individual'}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(goal.priority)}`}>
                    {goal.priority || 'Medium'} Priority
                  </span>
                </div>

                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(goal)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(goal._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-2">{goal.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 min-h-[36px] mb-4">
                {goal.description || 'Quarterly strategic performance target.'}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Goal Progress</span>
                  <span className="font-mono font-bold text-emerald-400">{goal.progressPercentage || 0}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progressPercentage || 0}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs mt-4">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <User className="w-3 h-3 text-emerald-400" /> Assignee
                </p>
                <p className="font-semibold text-slate-200 truncate mt-0.5">{goal.assignedEmployeeName || 'Alex Rivera'}</p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-indigo-400" /> Due Date
                </p>
                <p className="font-semibold text-slate-200 truncate mt-0.5">
                  {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : 'Dec 31, 2026'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GoalsView;
