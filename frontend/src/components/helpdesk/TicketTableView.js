import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, AlertCircle, Clock, CheckCircle2, User, MessageSquare, Star } from 'lucide-react';

const TicketTableView = ({
  tickets = [],
  search = '',
  setSearch,
  categoryFilter = 'All',
  setCategoryFilter,
  statusFilter = 'All',
  setStatusFilter,
  priorityFilter = 'All',
  setPriorityFilter,
  onCreateTicket,
  onSelectTicket,
  onOpenRating
}) => {
  const categories = ['All', 'IT Support', 'HR Support', 'Payroll', 'Attendance', 'Leave', 'Hardware', 'Software', 'Network', 'Facilities', 'General Inquiry', 'Other'];
  const statuses = ['All', 'Open', 'Assigned', 'In Progress', 'Waiting for Employee', 'Resolved', 'Closed', 'Reopened'];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-600/20 text-red-400 border-red-500/40 animate-pulse';
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'In Progress':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Resolved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Waiting for Employee':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Control Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tickets by ID, subject, employee or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {priorities.map(p => <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>)}
            </select>

            <button
              onClick={onCreateTicket}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Create Ticket</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Directory Table */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Subject & Category</th>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Assigned Agent</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No service desk tickets found.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <motion.tr
                    key={t._id || t.ticketId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-[11px] text-blue-400 font-bold">
                      {t.ticketId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-xs hover:text-blue-400 cursor-pointer" onClick={() => onSelectTicket(t)}>
                        {t.subject}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 inline-block mt-0.5">
                        {t.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{t.employeeName}</div>
                      <span className="text-[10px] text-slate-400">{t.department || 'Engineering'}</span>
                    </td>

                    <td className="px-6 py-4 font-mono text-[11px] text-slate-300">
                      {t.assignedAgent || 'Unassigned'}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getPriorityBadge(t.priority)}`}>
                        {t.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(t.status)}`}>
                        {t.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectTicket(t)}
                          className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 font-semibold transition-colors flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>View Ticket</span>
                        </button>
                        {t.status === 'Resolved' && (
                          <button
                            onClick={() => onOpenRating(t)}
                            className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                            title="Rate Ticket CSAT"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketTableView;
