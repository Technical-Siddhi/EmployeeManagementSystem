import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { motion } from 'framer-motion';

const PerformanceCharts = ({ stats }) => {
  const deptData = stats?.departmentComparison || [
    { department: 'Engineering', avgScore: 4.8 },
    { department: 'Design & UX', avgScore: 4.6 },
    { department: 'Sales', avgScore: 4.4 },
    { department: 'HR', avgScore: 4.7 },
    { department: 'Finance', avgScore: 4.5 }
  ];

  const trendData = stats?.monthlyTrend || [
    { month: 'Jan', rating: 4.4 },
    { month: 'Feb', rating: 4.5 },
    { month: 'Mar', rating: 4.7 },
    { month: 'Apr', rating: 4.8 }
  ];

  const distData = stats?.performanceDistribution || [
    { category: 'Exceeds (5★)', percentage: 40 },
    { category: 'Meets (4★)', percentage: 45 },
    { category: 'Needs Imp (3★)', percentage: 12 },
    { category: 'Unsatisfactory', percentage: 3 }
  ];

  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Department Comparison Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
      >
        <div>
          <h3 className="text-base font-bold text-white">Department Rating Comparison</h3>
          <p className="text-xs text-slate-400">Average evaluation score out of 5.0 per department</p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData}>
              <XAxis dataKey="department" stroke="#64748b" fontSize={11} />
              <YAxis domain={[0, 5]} stroke="#64748b" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Bar dataKey="avgScore" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Monthly Performance Trend Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
      >
        <div>
          <h3 className="text-base font-bold text-white">Monthly Rating Trend</h3>
          <p className="text-xs text-slate-400">Org-wide evaluation progress trajectory</p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis domain={[3.5, 5]} stroke="#64748b" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#34d399' }}
              />
              <Line type="monotone" dataKey="rating" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Rating Distribution Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
      >
        <div>
          <h3 className="text-base font-bold text-white">Performance Distribution</h3>
          <p className="text-xs text-slate-400">Workforce breakdown across evaluation tiers</p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="percentage"
              >
                {distData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceCharts;
