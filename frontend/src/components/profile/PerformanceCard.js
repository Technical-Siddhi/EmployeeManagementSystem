import React from 'react';
import { Award, Star, TrendingUp, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PerformanceCard = ({ performance }) => {
  const rating = performance?.rating || 4.8;
  const attendanceScore = performance?.attendanceScore || 96;
  const punctualityScore = performance?.punctualityScore || 98;
  const managerFeedback = performance?.managerFeedback || 'Consistently delivers high-quality features with excellent team collaboration.';
  const promotionHistory = performance?.promotionHistory || [
    { title: 'Promoted to Senior Developer', date: '2023-07-01', details: 'Recognized for leading frontend architecture.' }
  ];

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            Performance & Appraisals
          </h2>
          <p className="text-xs text-slate-400">Quarterly rating, punctuality scores, and manager feedback</p>
        </div>

        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
          <span>{rating} / 5.0 Rating</span>
        </div>
      </div>

      {/* Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Attendance Compliance Score</span>
            <p className="text-2xl font-extrabold text-emerald-400 font-mono">{attendanceScore}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Punctuality Score</span>
            <p className="text-2xl font-extrabold text-indigo-400 font-mono">{punctualityScore}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Manager Feedback */}
      <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-indigo-400" /> Manager Feedback
        </h4>
        <p className="text-xs text-slate-300 italic leading-relaxed">
          "{managerFeedback}"
        </p>
      </div>

      {/* Promotion History */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase">Promotion & Growth History</h4>
        <div className="space-y-2">
          {promotionHistory.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-slate-200">{item.title}</p>
                  <p className="text-slate-400">{item.details}</p>
                </div>
              </div>
              <span className="font-mono text-slate-400 text-[11px]">{new Date(item.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
