import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, CheckCircle2, AlertTriangle, Lock, FileText, User } from 'lucide-react';

const AuditTimelineView = ({ logs = [] }) => {
  const [range, setRange] = useState('7days');

  const ranges = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: 'custom', label: 'Custom Range' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-3xl border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">System Activity Timeline</h3>
            <p className="text-xs text-slate-400">Chronological history of administrative & security actions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                range === r.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-800 space-y-6 my-4">
        {logs.map((log, idx) => (
          <motion.div
            key={log._id || idx}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-900 shadow-md ${
              log.status === 'Success' ? 'bg-emerald-400' :
              log.status === 'Failed' ? 'bg-rose-500' :
              log.status === 'Warning' ? 'bg-amber-400' : 'bg-red-600 animate-ping'
            }`} />

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg hover:border-slate-700/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{log.action}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-indigo-400 border border-slate-800">
                    {log.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{log.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span>User: {log.employeeName} ({log.role})</span>
                  <span>•</span>
                  <span>IP: {log.ipAddress}</span>
                </div>
              </div>

              <div className="text-right font-mono text-[11px] text-slate-400 shrink-0">
                <div>{new Date(log.timestamp || log.createdAt).toLocaleDateString()}</div>
                <div className="text-slate-500">{new Date(log.timestamp || log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AuditTimelineView;
