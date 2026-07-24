import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, FileText, LogOut } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname.split('/').pop() || 'dashboard';
  const [attendanceData, setAttendanceData] = useState([]);

  const stats = [
    { name: 'Total Employees', value: 120, color: 'bg-green-500', icon: Users },
    { name: 'Present Today', value: 85, color: 'bg-emerald-500', icon: Clock },
    { name: 'Absent Today', value: 35, color: 'bg-orange-500', icon: Users },
    { name: 'Late Arrivals', value: 5, color: 'bg-yellow-500', icon: Clock },
  ];

  const chartData = [
    { name: 'Mon', present: 95, absent: 5 },
    { name: 'Tue', present: 90, absent: 10 },
    { name: 'Wed', present: 88, absent: 12 },
    { name: 'Thu', present: 92, absent: 8 },
    { name: 'Fri', present: 94, absent: 6 },
  ];

  const tableData = [
    { id: 1, name: 'Rahul Sharma', inTime: '9:00 AM', outTime: '6:00 PM', status: 'Present' },
    { id: 2, name: 'Sara Johnson', inTime: '-', outTime: '-', status: 'Absent' },
    { id: 3, name: 'Mike Chen', inTime: '9:30 AM', outTime: '5:30 PM', status: 'Late' },
    { id: 4, name: 'Priya Patel', inTime: '8:45 AM', outTime: '5:45 PM', status: 'Present' },
  ];

  useEffect(() => {
    // Mock API call
    const fetchData = async () => {
      try {
        // const response = await api.get('/attendance');
        // setAttendanceData(response.data);
        setAttendanceData(tableData);
      } catch (error) {
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage={activePage} />
      <div className="flex-1 ml-64 lg:ml-64 min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h1>
              <p className="text-slate-500 mt-1">Welcome back, Admin!</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`${stat.color}/10 p-6 rounded-2xl glass-card border border-white/20 backdrop-blur-sm cursor-pointer group hover:${stat.color}/20 transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500 uppercase font-medium tracking-wide">{stat.name}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Attendance Trend Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-500" />
                Weekly Attendance Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={3} name="Present" />
                  <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={3} name="Absent" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Status Pie Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-500" />
                Today Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[{ name: 'Present', value: 85 }, { name: 'Absent', value: 15 }]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {stats.slice(1,3).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Attendance Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-8 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-primary-500" />
                Today's Attendance Report
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">In Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Out Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {attendanceData.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.inTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.outTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            row.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                            row.status === 'Absent' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3 p-2 hover:bg-primary-50 rounded transition-all">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-all">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

