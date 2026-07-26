import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Calendar, CheckCircle2, XCircle, Plus, Clock, FileText, AlertCircle, X, Search, Check, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const LeaveManagement = () => {
  const activePage = 'leave';
  const [activeTab, setActiveTab] = useState('All');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'Rahul Sharma', avatar: 'RS', dept: 'Engineering', type: 'Sick Leave', startDate: '2024-01-15', endDate: '2024-01-17', duration: '3 Days', reason: 'High fever and medical rest advice', status: 'Pending' },
    { id: 2, name: 'Sara Johnson', avatar: 'SJ', dept: 'Design', type: 'Annual Vacation', startDate: '2024-01-20', endDate: '2024-01-25', duration: '6 Days', reason: 'Family trip', status: 'Approved' },
    { id: 3, name: 'Mike Chen', avatar: 'MC', dept: 'Engineering', type: 'Casual Leave', startDate: '2024-01-18', endDate: '2024-01-18', duration: '1 Day', reason: 'Personal errands', status: 'Rejected' },
    { id: 4, name: 'Priya Patel', avatar: 'PP', dept: 'Human Resources', type: 'Casual Leave', startDate: '2024-02-01', endDate: '2024-02-02', duration: '2 Days', reason: 'Attending family wedding', status: 'Pending' },
  ]);

  const [newLeave, setNewLeave] = useState({
    type: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason) {
      toast.error('Please complete all leave fields');
      return;
    }
    const created = {
      id: Date.now(),
      name: 'Current User',
      avatar: 'CU',
      dept: 'Engineering',
      type: newLeave.type,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      duration: 'Custom',
      reason: newLeave.reason,
      status: 'Pending'
    };
    setLeaveRequests([created, ...leaveRequests]);
    setIsApplyModalOpen(false);
    setNewLeave({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    toast.success('Leave request submitted for review!');
  };

  const updateStatus = (id, newStatus) => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (newStatus === 'Approved') toast.success('Leave application approved');
    if (newStatus === 'Rejected') toast.error('Leave application rejected');
  };

  const filteredRequests = leaveRequests.filter(req => {
    const matchesTab = activeTab === 'All' || req.status === activeTab;
    const matchesSearch = req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activePage={activePage} />
      
      <main className="flex-1 ml-64 min-h-screen p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90 border-indigo-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Time Off & Absences</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Leave Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">Review leave applications, track balances, and authorize approvals</p>
          </div>

          <button 
            onClick={() => setIsApplyModalOpen(true)}
            className="btn-primary text-sm shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            <span>Apply for Leave</span>
          </button>
        </div>

        {/* Leave Balance Quotas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-card bg-gradient-to-br from-indigo-950/30 to-slate-900 border-indigo-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Annual Vacation</span>
              <span className="text-xs text-slate-400">12 / 18 Days Left</span>
            </div>
            <p className="text-3xl font-extrabold text-slate-100">12 Days</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[66%]" />
            </div>
          </div>

          <div className="glass-card bg-gradient-to-br from-emerald-950/30 to-slate-900 border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Sick Leave</span>
              <span className="text-xs text-slate-400">7 / 10 Days Left</span>
            </div>
            <p className="text-3xl font-extrabold text-slate-100">7 Days</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[70%]" />
            </div>
          </div>

          <div className="glass-card bg-gradient-to-br from-amber-950/30 to-slate-900 border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Casual Leave</span>
              <span className="text-xs text-slate-400">4 / 6 Days Left</span>
            </div>
            <p className="text-3xl font-extrabold text-slate-100">4 Days</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[66%]" />
            </div>
          </div>
        </div>

        {/* Requests Table & Filter Tabs */}
        <div className="glass-card space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            {/* Status Tabs */}
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/80 rounded-xl p-1 text-xs">
              {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-4 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTab === status
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Employee</th>
                  <th className="py-3.5 px-4">Leave Type</th>
                  <th className="py-3.5 px-4">Duration & Dates</th>
                  <th className="py-3.5 px-4">Reason</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Approval Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                            {req.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">{req.name}</p>
                            <p className="text-xs text-slate-500">{req.dept}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-xs font-semibold">
                          {req.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="text-xs font-mono text-slate-200">{req.startDate} to {req.endDate}</p>
                        <p className="text-xs text-slate-400">{req.duration}</p>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-xs text-slate-300" title={req.reason}>
                        {req.reason}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={
                          req.status === 'Approved' ? 'badge-emerald' :
                          req.status === 'Pending' ? 'badge-amber' :
                          'badge-rose'
                        }>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => updateStatus(req.id, 'Approved')}
                            disabled={req.status === 'Approved'}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 disabled:opacity-40 transition-all text-xs font-semibold flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => updateStatus(req.id, 'Rejected')}
                            disabled={req.status === 'Rejected'}
                            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 disabled:opacity-40 transition-all text-xs font-semibold flex items-center gap-1"
                          >
                            <Ban className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                      No leave applications found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md bg-slate-900 border-slate-700/80 p-6 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-slate-100">Submit Leave Application</h3>
                <button 
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleApplyLeave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Leave Type</label>
                  <select
                    value={newLeave.type}
                    onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Annual Vacation">Annual Vacation</option>
                    <option value="Maternity / Paternity">Maternity / Paternity</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newLeave.startDate}
                      onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={newLeave.endDate}
                      onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Reason / Details</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Provide context for your leave request..."
                    value={newLeave.reason}
                    onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary text-sm"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveManagement;
