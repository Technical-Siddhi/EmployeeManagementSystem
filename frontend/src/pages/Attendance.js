import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const Attendance = () => {
  const location = useLocation();
  const activePage = 'attendance';

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');

  const attendanceData = [
    { id: 1, name: 'Rahul Sharma', status: 'Present', inTime: '9:00 AM', outTime: '6:00 PM' },
    { id: 2, name: 'Sara Johnson', status: 'Absent', inTime: '-', outTime: '-' },
    { id: 3, name: 'Mike Chen', status: 'Late', inTime: '9:30 AM', outTime: '5:30 PM' },
  ];

  const filteredData = attendanceData.filter((emp) => 
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const markAttendance = (id, status) => {
    toast.success(`${status} marked for employee ${id}`);
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
                Attendance
              </h1>
              <p className="text-slate-500">Daily attendance management</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="p-8 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">In Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Out Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredData.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{emp.name}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          emp.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                          emp.status === 'Absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{emp.inTime}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{emp.outTime}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => markAttendance(emp.id, 'Present')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => markAttendance(emp.id, 'Absent')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Attendance;
