import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, UserCheck, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamView = ({ teams, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.departmentName && t.departmentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search teams or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredTeams.length} Teams
          </span>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team, idx) => (
          <motion.div
            key={team._id || team.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-200 shadow-xl space-y-4 relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center text-white">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{team.name}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {team.departmentName || team.departmentId?.name || 'Engineering & Tech'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(team)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(team._id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-purple-400" /> Team Lead
                </p>
                <p className="font-semibold text-slate-200 truncate mt-0.5">{team.teamLeadName || 'Rahul Sharma'}</p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <Users className="w-3 h-3 text-indigo-400" /> Members
                </p>
                <p className="font-semibold text-indigo-300 mt-0.5">{team.members?.length || 6} Active</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamView;
