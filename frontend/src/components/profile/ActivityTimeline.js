import React from 'react';
import { Activity, CheckCircle2, UserCheck, Award, DollarSign, Calendar, FileText, Clock } from 'lucide-react';

const ActivityTimeline = ({ timeline = [] }) => {
  const defaultTimeline = [
    { id: 1, title: 'Joined AttendX System', description: 'Employee onboarded into system', date: '2023-01-15', icon: UserCheck, color: 'text-indigo-400' },
    { id: 2, title: 'Completed Probation', description: 'Passed probation evaluation with distinction', date: '2023-04-15', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 3, title: 'Promotion to Senior Lead', description: 'Promoted to Senior Lead Developer', date: '2023-07-01', icon: Award, color: 'text-amber-400' },
    { id: 4, title: 'Salary Structure Updated', description: 'Annual merit increment applied', date: '2024-01-01', icon: DollarSign, color: 'text-emerald-400' },
    { id: 5, title: 'Leave Application Approved', description: 'Annual vacation leave approved for 5 days', date: '2024-01-18', icon: Calendar, color: 'text-indigo-400' },
    { id: 6, title: 'Document Uploaded', description: 'Uploaded updated passport scan', date: '2024-02-05', icon: FileText, color: 'text-purple-400' },
    { id: 7, title: 'Attendance Log Corrected', description: 'Adjusted check-in time for remote work day', date: '2024-02-12', icon: Clock, color: 'text-slate-400' },
  ];

  const items = timeline.length > 0 ? timeline.map((item, idx) => ({
    id: idx,
    title: item.title,
    description: item.description,
    date: item.date ? new Date(item.date).toLocaleDateString() : 'Recent',
    icon: CheckCircle2,
    color: 'text-indigo-400'
  })) : defaultTimeline;

  return (
    <div className="glass-card space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          Enterprise Activity Timeline
        </h2>
        <p className="text-xs text-slate-400">Chronological history of major employee milestones and system logs</p>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {items.map((event) => {
          const IconComp = event.icon || CheckCircle2;
          return (
            <div key={event.id} className="relative flex items-start gap-4 group">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow">
                <IconComp className={`w-3.5 h-3.5 ${event.color}`} />
              </div>

              <div className="flex-1 p-3.5 rounded-xl bg-slate-800/30 border border-slate-800/80 group-hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-200 text-sm group-hover:text-indigo-300 transition-colors">
                    {event.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">{event.date}</span>
                </div>
                {event.description && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{event.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
