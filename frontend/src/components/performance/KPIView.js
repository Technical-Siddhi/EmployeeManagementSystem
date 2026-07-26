import React, { useState } from 'react';
import { Activity, Plus, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const KPIView = ({ kpis = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKPIs = kpis.filter(k => 
    k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search KPIs by metric or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            {filteredKPIs.length} Key Performance Indicators
          </span>
        </div>

        <button
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add KPI Metric</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKPIs.map((kpi, idx) => (
          <motion.div
            key={kpi._id || kpi.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{kpi.name}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                    {kpi.category}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                kpi.status === 'Exceeded' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              }`}>
                {kpi.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-2">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Current Value</p>
                <p className="text-2xl font-black text-white font-mono">{kpi.currentValue} {kpi.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Target Benchmark</p>
                <p className="text-sm font-bold text-slate-300 font-mono">{kpi.targetValue} {kpi.unit}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Assigned: <strong className="text-slate-200">{kpi.assignedEmployeeName}</strong></span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +4.2% YoY
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KPIView;
