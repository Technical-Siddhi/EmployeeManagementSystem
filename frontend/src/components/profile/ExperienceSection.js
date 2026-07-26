import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, Trash2, Calendar, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ExperienceSection = ({ experienceList = [], onAddExperience, onDeleteExperience }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role || !formData.startDate) {
      toast.error('Please complete mandatory work experience fields');
      return;
    }
    onAddExperience(formData);
    setIsAddOpen(false);
    setFormData({ company: '', role: '', startDate: '', endDate: '', responsibilities: '' });
    toast.success('Work experience record added');
  };

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Prior Work Experience
          </h2>
          <p className="text-xs text-slate-400">Previous corporate employment history & key roles</p>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="btn-primary text-xs py-1.5 px-3.5">
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experienceList.length > 0 ? (
          experienceList.map((exp) => (
            <div key={exp._id || exp.company} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-100 text-base">{exp.role}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {exp.company}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {new Date(exp.startDate).toLocaleDateString()} &ndash; {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
                {exp.responsibilities && (
                  <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                    {exp.responsibilities}
                  </p>
                )}
              </div>

              <button
                onClick={() => onDeleteExperience(exp._id)}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all text-xs shrink-0 self-end md:self-start"
                title="Delete Experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-xs text-slate-500">
            No work experience records added yet. Click "Add Experience" above.
          </p>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md bg-slate-900 border-slate-700 p-6 space-y-5 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Add Work Experience</h3>
                <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Job Title / Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Start Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Key Responsibilities</label>
                  <textarea
                    rows="3"
                    placeholder="Describe main projects, technologies, and achievements..."
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsAddOpen(false)} className="btn-secondary text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Add Experience
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

export default ExperienceSection;
