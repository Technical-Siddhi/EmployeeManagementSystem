import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, Users, DollarSign, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const DepartmentView = ({ departments, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepts = departments.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search departments by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredDepts.length} Departments
          </span>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept, idx) => (
          <motion.div
            key={dept._id || dept.code}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-200 shadow-xl space-y-4 relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md flex items-center justify-center text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">{dept.name}</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {dept.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3 h-3 text-slate-500" />
                    {dept.businessUnit || 'Corporate Unit'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(dept)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(dept._id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 min-h-[36px]">
              {dept.description || 'Core organizational business unit responsible for strategic execution.'}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Dept Head</p>
                <p className="font-semibold text-slate-200 truncate mt-0.5">{dept.headName || 'Alex Rivera'}</p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Annual Budget</p>
                <p className="font-semibold text-emerald-400 mt-0.5">${(dept.budget || 500000).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentView;
