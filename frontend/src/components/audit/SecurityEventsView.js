import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Lock, ShieldCheck, Check } from 'lucide-react';

const SecurityEventsView = ({ events = [] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Security Threats & Privilege Alerts</h3>
          <p className="text-xs text-slate-400">Monitoring failed logins, lockouts, password resets & role escalations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <motion.div
            key={evt._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-slate-900/80 border border-rose-500/20 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  evt.severity === 'Critical' || evt.severity === 'High'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {evt.severity || 'Medium'} Severity
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(evt.timestamp || evt.createdAt).toLocaleString()}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{evt.eventType}</h4>
                <p className="text-xs text-slate-300 mt-1">{evt.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-2xl border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">User Account</span>
                  <span className="text-slate-200 font-semibold">{evt.userEmail || 'admin@attendx.com'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">IP Origin</span>
                  <span className="text-rose-400 font-semibold">{evt.ipAddress || '45.132.18.99'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{evt.device || 'Untrusted Device'}</span>
              <button className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white font-semibold transition-colors flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Mark Resolved</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SecurityEventsView;
