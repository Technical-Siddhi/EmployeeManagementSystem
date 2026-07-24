import React from 'react';
import Sidebar from '../components/Sidebar';
import { Users, Calendar, CheckCircle, XCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const LeaveManagement = () => {
  const location = useLocation();
  const activePage = 'leave';

  const leaveRequests = [
    { id: 1, name: 'Rahul Sharma', type: 'Sick Leave', dates: '2024-01-15 to 2024-01-17', status: 'Pending' },
    { id: 2, name: 'Sara Johnson', type: 'Vacation', dates: '2024-01-20 to 2024-01-25', status: 'Approved' },
    { id: 3, name: 'Mike Chen', type: 'Personal', dates: '2024-01-18', status: 'Rejected' },
  ];

  const approveLeave = (id) => {
    toast.success('Leave approved');
  };

  const rejectLeave = (id) => {
    toast.success('Leave rejected');
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Leave Management
              </h1>
              <p className="text-slate-500 mt-1">Review and approve leave requests</p>
            </div>
            <button className="btn-primary px-8 py-3 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Request
            </button>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{request.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{request.type}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{request.dates}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => approveLeave(request.id)}
                            className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button 
                            onClick={() => rejectLeave(request.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
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

export default LeaveManagement;
