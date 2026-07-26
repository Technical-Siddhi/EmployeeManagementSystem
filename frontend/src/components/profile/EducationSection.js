import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Plus, Trash2, Edit, Award, X } from 'lucide-react';
import toast from 'react-hot-toast';

const EducationSection = ({ educationList = [], onAddEducation, onDeleteEducation }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    degree: '',
    institute: '',
    university: '',
    passingYear: new Date().getFullYear(),
    percentage: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.degree || !formData.institute || !formData.percentage) {
      toast.error('Please complete mandatory education fields');
      return;
    }
    onAddEducation(formData);
    setIsAddOpen(false);
    setFormData({ degree: '', institute: '', university: '', passingYear: new Date().getFullYear(), percentage: '' });
    toast.success('Education record added');
  };

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            Education Background
          </h2>
          <p className="text-xs text-slate-400">Academic degrees and institutional qualifications</p>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="btn-primary text-xs py-1.5 px-3.5">
          <Plus className="w-3.5 h-3.5" /> Add Education
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase">
              <th className="py-3 px-4">Degree</th>
              <th className="py-3 px-4">Institute / College</th>
              <th className="py-3 px-4">University</th>
              <th className="py-3 px-4">Passing Year</th>
              <th className="py-3 px-4">Score / CGPA</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-sm">
            {educationList.length > 0 ? (
              educationList.map((edu) => (
                <tr key={edu._id || edu.degree} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-200">{edu.degree}</td>
                  <td className="py-3.5 px-4 text-slate-300">{edu.institute}</td>
                  <td className="py-3.5 px-4 text-slate-400">{edu.university || '-'}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-300">{edu.passingYear}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-bold font-mono">
                      {edu.percentage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onDeleteEducation(edu._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all text-xs"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-xs text-slate-500">
                  No education records listed yet. Click "Add Education" above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
                <h3 className="text-lg font-bold text-slate-100">Add Education Record</h3>
                <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Degree / Qualification *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.S. in Computer Science"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Institute / College *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MIT"
                    value={formData.institute}
                    onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">University</label>
                    <input
                      type="text"
                      placeholder="e.g. MIT University"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Passing Year</label>
                    <input
                      type="number"
                      required
                      value={formData.passingYear}
                      onChange={(e) => setFormData({ ...formData, passingYear: parseInt(e.target.value) })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Percentage / CGPA *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3.9 GPA or 92%"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsAddOpen(false)} className="btn-secondary text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Add Record
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

export default EducationSection;
