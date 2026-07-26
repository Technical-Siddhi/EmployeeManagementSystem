import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit, Camera, ShieldCheck, UserX, Calendar, Building, Briefcase, Users, CheckCircle2, AlertCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileHeader = ({ profile, onUpdateHeader, onToggleStatus }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    designation: profile.designation || '',
    department: profile.department || '',
    team: profile.team || '',
    employmentType: profile.employmentType || 'Full-Time',
    reportingManager: profile.reportingManager || '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateHeader(formData);
    setIsEditModalOpen(false);
    toast.success('Profile Header updated');
  };

  const handleUploadPhoto = () => {
    toast.success('Photo upload dialog opened (Cloudinary integrated)');
  };

  const statusColor = profile.status === 'Active' ? 'badge-emerald' : profile.status === 'On Leave' ? 'badge-amber' : 'badge-rose';

  return (
    <div className="relative glass-card overflow-hidden p-0 border-indigo-500/20 shadow-2xl">
      {/* Cover Backdrop Banner */}
      <div className="h-40 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#6366f1_0,transparent_50%)] opacity-30" />
      </div>

      {/* Main Header Content */}
      <div className="p-6 md:p-8 pt-0 relative flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16">
        {/* Avatar & Key Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-5">
          <div className="relative group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 border-4 border-slate-950 flex items-center justify-center font-extrabold text-white text-4xl shadow-2xl overflow-hidden">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                (profile.personalInfo?.firstName?.charAt(0) || 'E') + (profile.personalInfo?.lastName?.charAt(0) || '')
              )}
            </div>
            <button
              onClick={handleUploadPhoto}
              className="absolute inset-0 bg-slate-950/70 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold gap-1.5 transition-all backdrop-blur-sm"
            >
              <Camera className="w-5 h-5" /> Upload
            </button>
          </div>

          <div className="space-y-1.5 pb-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
                {profile.personalInfo?.firstName} {profile.personalInfo?.lastName}
              </h1>
              <span className={statusColor}>{profile.status || 'Active'}</span>
            </div>

            <p className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> {profile.designation} &bull; <span className="text-slate-400">{profile.department}</span>
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
              <span className="flex items-center gap-1 font-mono text-slate-300">
                <strong>ID:</strong> {profile.employeeId}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" /> Team: <strong className="text-slate-200">{profile.team}</strong>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> Joined: <strong className="text-slate-200">{new Date(profile.joiningDate).toLocaleDateString()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap pt-2 md:pt-0">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="btn-secondary text-xs py-2 px-4 shadow"
          >
            <Edit className="w-3.5 h-3.5" /> Edit Profile Header
          </button>

          {profile.status === 'Active' ? (
            <button
              onClick={() => onToggleStatus('Inactive')}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <UserX className="w-3.5 h-3.5" /> Deactivate
            </button>
          ) : (
            <button
              onClick={() => onToggleStatus('Active')}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Activate
            </button>
          )}
        </div>
      </div>

      {/* Edit Header Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md bg-slate-900 border-slate-700 p-6 space-y-5 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Edit Profile Header Details</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Team</label>
                  <input
                    type="text"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn-secondary text-xs">
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

export default ProfileHeader;
