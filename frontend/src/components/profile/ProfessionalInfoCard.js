import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Edit, Building2, MapPin, Mail, Calendar, UserCheck, Award, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfessionalInfoCard = ({ profile, onUpdateProfessional }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    officeLocation: profile.professionalInfo?.officeLocation || 'New York HQ',
    workEmail: profile.professionalInfo?.workEmail || profile.personalInfo?.email || '',
    totalExperience: profile.professionalInfo?.totalExperience || '3+ Years',
    confirmationDate: profile.confirmationDate ? new Date(profile.confirmationDate).toISOString().split('T')[0] : '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfessional({
      officeLocation: formData.officeLocation,
      workEmail: formData.workEmail,
      totalExperience: formData.totalExperience,
      confirmationDate: formData.confirmationDate,
    });
    setIsEditOpen(false);
    toast.success('Professional details updated');
  };

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            Professional Information
          </h2>
          <p className="text-xs text-slate-400">Workplace deployment and managerial metadata</p>
        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="btn-secondary text-xs px-3.5 py-1.5"
        >
          <Edit className="w-3.5 h-3.5" /> Edit Professional Info
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Employee ID</span>
          <p className="font-semibold text-indigo-400 font-mono">{profile.employeeId}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Department</span>
          <p className="font-semibold text-slate-200">{profile.department}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Designation</span>
          <p className="font-semibold text-slate-200">{profile.designation}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Team</span>
          <p className="font-semibold text-slate-200">{profile.team}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Reporting Manager</span>
          <p className="font-semibold text-slate-200 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> {profile.reportingManager || '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Office Location</span>
          <p className="font-semibold text-slate-200 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {profile.professionalInfo?.officeLocation || '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Employment Type</span>
          <p className="font-semibold text-emerald-400">{profile.employmentType}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Joining Date</span>
          <p className="font-semibold text-slate-200 font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            {profile.joiningDate ? new Date(profile.joiningDate).toLocaleDateString() : '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Confirmation Date</span>
          <p className="font-semibold text-slate-200 font-mono">
            {profile.confirmationDate ? new Date(profile.confirmationDate).toLocaleDateString() : 'Confirmed'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Work Email</span>
          <p className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" /> {profile.professionalInfo?.workEmail || profile.personalInfo?.email || '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Experience</span>
          <p className="font-semibold text-indigo-300 font-mono flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-400" /> {profile.professionalInfo?.totalExperience || '3+ Years'}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md bg-slate-900 border-slate-700 p-6 space-y-5 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Edit Professional Information</h3>
                <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Office Location</label>
                  <input
                    type="text"
                    value={formData.officeLocation}
                    onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Work Email</label>
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Total Experience</label>
                  <input
                    type="text"
                    value={formData.totalExperience}
                    onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Confirmation Date</label>
                  <input
                    type="date"
                    value={formData.confirmationDate}
                    onChange={(e) => setFormData({ ...formData, confirmationDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsEditOpen(false)} className="btn-secondary text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Save Changes
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

export default ProfessionalInfoCard;
