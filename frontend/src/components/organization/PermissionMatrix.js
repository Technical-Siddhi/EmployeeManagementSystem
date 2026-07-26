import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const PermissionMatrix = () => {
  const permissions = [
    { module: 'Employee Directory', admin: 'Full Access', hr: 'Full Access', manager: 'View Only', employee: 'No Access' },
    { module: 'Employee Profiles & Edit', admin: 'Full Access', hr: 'Full Access', manager: 'Team Members Only', employee: 'Own Profile' },
    { module: 'Salary & Compensation Band', admin: 'Full Access', hr: 'Full Access', manager: 'No Access', employee: 'Own Salary' },
    { module: 'Department & Team Management', admin: 'Full Access', hr: 'Manage Teams', manager: 'View Team', employee: 'No Access' },
    { module: 'Employee Reassignment & Transfer', admin: 'Full Access', hr: 'Full Access', manager: 'No Access', employee: 'No Access' },
    { module: 'Document Verification', admin: 'Full Access', hr: 'Full Access', manager: 'No Access', employee: 'Upload Only' },
    { module: 'Attendance & Clock-In Logs', admin: 'Full Access', hr: 'Full Access', manager: 'Team Logs', employee: 'Own Clock' },
    { module: 'Leave Request Approvals', admin: 'Full Access', hr: 'Full Access', manager: 'Team Approvals', employee: 'Apply Only' },
    { module: 'Analytics & Executive Reports', admin: 'Full Access', hr: 'Full Access', manager: 'Team Reports', employee: 'No Access' },
  ];

  const renderBadge = (status) => {
    if (status === 'Full Access') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Full Access
        </span>
      );
    }
    if (status === 'No Access') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <XCircle className="w-3.5 h-3.5" /> Denied
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Enterprise Role Permission Matrix</h3>
            <p className="text-xs text-slate-400">Granular access control policies enforced per client role</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20 font-bold">
          RBAC Policy Enforced
        </span>
      </div>

      <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase text-[11px] font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Module / Feature Area</th>
                <th className="px-6 py-4">👑 Admin</th>
                <th className="px-6 py-4">👔 HR Team</th>
                <th className="px-6 py-4">💼 Manager</th>
                <th className="px-6 py-4">👤 Employee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {permissions.map((row, idx) => (
                <tr key={row.module} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    {row.module}
                  </td>
                  <td className="px-6 py-4">{renderBadge(row.admin)}</td>
                  <td className="px-6 py-4">{renderBadge(row.hr)}</td>
                  <td className="px-6 py-4">{renderBadge(row.manager)}</td>
                  <td className="px-6 py-4">{renderBadge(row.employee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrix;
