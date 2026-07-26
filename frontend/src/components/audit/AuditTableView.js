import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Shield, AlertTriangle, CheckCircle2, XCircle, Info, Download, Trash2 } from 'lucide-react';

const AuditTableView = ({
  logs = [],
  search = '',
  setSearch,
  category = 'All',
  setCategory,
  statusFilter = 'All',
  setStatusFilter,
  onExport,
  onOpenRetention
}) => {
  const categories = [
    'All',
    'Authentication',
    'Employee',
    'Attendance',
    'Leave',
    'Payroll',
    'Documents',
    'Performance',
    'Organization',
    'Notifications',
    'Settings',
    'Security',
    'System'
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Failed':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Critical':
        return 'bg-red-600/20 text-red-400 border-red-500/40 animate-pulse';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by action, user, IP address, role, department..."
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
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>

            <button
              onClick={onExport}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenRetention}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Trash2 className="w-4 h-4 text-slate-400" />
              <span>Retention</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Log ID</th>
                <th className="px-6 py-4">Action & Category</th>
                <th className="px-6 py-4">User & Role</th>
                <th className="px-6 py-4">IP & Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No matching audit logs found. Try adjusting your search filters.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <motion.tr
                    key={log._id || log.logId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-[11px] text-indigo-400 font-bold">
                      {log.logId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-xs">{log.action}</div>
                      <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 inline-block mt-0.5">
                        {log.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{log.employeeName}</div>
                      <span className="text-[10px] text-slate-400 capitalize">{log.role || 'user'} • {log.department || 'General'}</span>
                    </td>

                    <td className="px-6 py-4 font-mono text-[11px]">
                      <div className="text-slate-300">{log.ipAddress || '192.168.1.1'}</div>
                      <span className="text-[10px] text-slate-500 font-sans">{log.location || 'HQ Office'}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(log.status)}`}>
                        {log.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                      {new Date(log.timestamp || log.createdAt).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </td>

                    <td className="px-6 py-4 text-slate-300 max-w-xs truncate" title={log.description}>
                      {log.description}
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

export default AuditTableView;
