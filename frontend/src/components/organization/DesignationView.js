import React, { useState } from 'react';
import { Award, Plus, Edit2, Trash2, Shield, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const DesignationView = ({ designations, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDesigs = designations.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.level && d.level.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search designations by title, code or level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredDesigs.length} Designations
          </span>
        </div>

        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Designation</span>
        </button>
      </div>

      {/* Designations Table View */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase text-[11px] font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Title & Code</th>
                <th className="px-6 py-4">Hierarchy Level</th>
                <th className="px-6 py-4">Salary Band</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredDesigs.map((d) => (
                <tr key={d._id || d.code} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-100">{d.title}</p>
                        <p className="text-[10px] font-mono text-amber-400">{d.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-[11px]">
                      {d.level || 'L4 - Senior'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-400">
                    ${(d.salaryBand?.min || 60000).toLocaleString()} - ${(d.salaryBand?.max || 140000).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-400 max-w-xs truncate">
                    {d.description || 'Core engineering / corporate role'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(d)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(d._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DesignationView;
