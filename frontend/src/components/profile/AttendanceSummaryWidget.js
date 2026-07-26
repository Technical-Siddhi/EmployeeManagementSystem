import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, History, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceSummaryWidget = () => {
  const navigate = useNavigate();

  const mockMonthlyData = [
    { month: 'Jan', attendance: 95 },
    { month: 'Feb', month: 'Feb', attendance: 92 },
    { month: 'Mar', attendance: 97 },
    { month: 'Apr', attendance: 94 },
    { month: 'May', attendance: 98 },
    { month: 'Jun', attendance: 96 },
  ];

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Attendance Summary & Metrics
          </h2>
          <p className="text-xs text-slate-400">Punctuality metrics, working hour logs, and historical trends</p>
        </div>

        <button
          onClick={() => navigate('/admin/attendance')}
          className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
        >
          <History className="w-3.5 h-3.5" /> View Attendance History <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Attendance %</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">96.5%</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Present Days</span>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">22 Days</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Absent Days</span>
          <p className="text-2xl font-extrabold text-rose-400 font-mono">1 Day</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Late Days</span>
          <p className="text-2xl font-extrabold text-amber-400 font-mono">2 Days</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Avg Hours</span>
          <p className="text-2xl font-extrabold text-indigo-400 font-mono">8.4 hrs</p>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="pt-2 space-y-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase">Monthly Trend Graph</h4>
        <div className="h-44 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockMonthlyData}>
              <defs>
                <linearGradient id="attendanceColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[80, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#attendanceColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummaryWidget;
