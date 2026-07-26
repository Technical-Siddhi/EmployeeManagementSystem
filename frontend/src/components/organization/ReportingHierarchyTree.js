import React, { useState } from 'react';
import { ArrowDown, Shield, User, Crown, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportingHierarchyTree = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('Alex Rivera');

  const hierarchyChain = [
    { level: 'Level 1: Executive Board', name: 'Victoria Vance', title: 'Chief Executive Officer', department: 'Executive', icon: Crown, color: 'from-amber-500 to-orange-600' },
    { level: 'Level 2: Vice President', name: 'Marcus Holloway', title: 'VP of Engineering', department: 'Engineering & Tech', icon: Shield, color: 'from-purple-500 to-indigo-600' },
    { level: 'Level 3: Department Manager', name: 'Alex Rivera', title: 'Engineering Manager', department: 'Engineering & Tech', icon: User, color: 'from-indigo-500 to-blue-600' },
    { level: 'Level 4: Team Lead', name: 'Rahul Sharma', title: 'Senior Tech Lead', department: 'Frontend Architecture', icon: Briefcase, color: 'from-cyan-500 to-teal-600' },
  ];

  return (
    <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Reporting Chain & Escalation Hierarchy</h3>
          <p className="text-xs text-slate-400">Vertical supervisory chain: Admin → Director → Manager → Employee</p>
        </div>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="Alex Rivera">Alex Rivera (Engineering Manager)</option>
          <option value="Rahul Sharma">Rahul Sharma (Tech Lead)</option>
          <option value="Samantha Wu">Samantha Wu (Software Engineer)</option>
        </select>
      </div>

      <div className="flex flex-col items-center max-w-xl mx-auto space-y-4 py-4">
        {hierarchyChain.map((item, idx) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.level}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white font-bold shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-indigo-400 font-medium">{item.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.level}</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-semibold">
                  {item.department}
                </span>
              </motion.div>

              {idx < hierarchyChain.length - 1 && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 shadow-md">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ReportingHierarchyTree;
