import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Download, FileText, BarChart3, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const Reports = () => {
  const location = useLocation();
  const activePage = 'reports';
  const [dateRange, setDateRange] = useState('month');

  const monthlyData = [
    { name: 'Jan', present: 95, absent: 5 },
    { name: 'Feb', present: 92, absent: 8 },
    { name: 'Mar', present: 96, absent: 4 },
  ];

  const departmentData = [
    { name: 'Engineering', employees: 45, attendance: 93 },
    { name: 'Design', employees: 25, attendance: 91 },
    { name: 'HR', employees: 15, attendance: 95 },
    { name: 'Sales', employees: 35, attendance: 88 },
  ];

  const handleDownload = () => {
    // Mock CSV download
    const csv = 'Date,Present,Absent\nJan,95,5\nFeb,92,8';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance-report.csv';
    a.click();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage={activePage} />
      <div className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Reports & Analytics
              </h1>
              <p className="text-slate-500 mt-1">Download and analyze attendance data</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleDownload} className="btn-primary px-6 py-3 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download CSV
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary-500" />
                Monthly Attendance Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="present" stroke="#10b981" name="Present" />
                  <Line type="monotone" dataKey="absent" stroke="#ef4444" name="Absent" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-500" />
                Department Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#10b981" name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
