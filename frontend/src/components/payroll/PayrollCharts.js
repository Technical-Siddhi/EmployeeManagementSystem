import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';

const PayrollCharts = ({ monthlyTrend = [], departmentCost = [] }) => {
  const trendData = monthlyTrend.length ? monthlyTrend : [
    { month: 'Jan', cost: 195000 },
    { month: 'Feb', cost: 205000 },
    { month: 'Mar', cost: 219200 },
    { month: 'Apr (Est)', cost: 228000 }
  ];

  const deptData = departmentCost.length ? departmentCost : [
    { department: 'Engineering', total: 103400 },
    { department: 'HR Ops', total: 115800 },
    { department: 'Design', total: 65000 },
    { department: 'Sales', total: 72000 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trend Area Chart */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight">Monthly Disbursement Trend</h4>
          <p className="text-xs text-slate-400">Total net payroll expense trajectory ($)</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="payrollCostGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val) => [`$${val.toLocaleString()}`, 'Total Cost']}
              />
              <Area type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#payrollCostGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Distribution Bar Chart */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight">Department Payroll Breakdown</h4>
          <p className="text-xs text-slate-400">Salary allocation across organizational units ($)</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="department" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val) => [`$${val.toLocaleString()}`, 'Payroll Allocation']}
              />
              <Bar dataKey="total" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PayrollCharts;
