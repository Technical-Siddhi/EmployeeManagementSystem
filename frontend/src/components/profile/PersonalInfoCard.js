import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit, Mail, Phone, MapPin, Heart, ShieldAlert, Globe, Calendar, X } from 'lucide-react';
import toast from 'react-hot-toast';

const PersonalInfoCard = ({ personalInfo, onUpdatePersonal }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: personalInfo?.firstName || '',
    lastName: personalInfo?.lastName || '',
    gender: personalInfo?.gender || 'Male',
    dateOfBirth: personalInfo?.dateOfBirth ? new Date(personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
    phone: personalInfo?.phone || '',
    email: personalInfo?.email || '',
    currentAddress: personalInfo?.currentAddress || '',
    permanentAddress: personalInfo?.permanentAddress || '',
    nationality: personalInfo?.nationality || 'American',
    bloodGroup: personalInfo?.bloodGroup || 'O+',
    maritalStatus: personalInfo?.maritalStatus || 'Single',
    emergencyName: personalInfo?.emergencyContact?.name || '',
    emergencyPhone: personalInfo?.emergencyContact?.phone || '',
    emergencyRelationship: personalInfo?.emergencyContact?.relationship || '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    onUpdatePersonal({
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone,
      email: formData.email,
      currentAddress: formData.currentAddress,
      permanentAddress: formData.permanentAddress,
      nationality: formData.nationality,
      bloodGroup: formData.bloodGroup,
      maritalStatus: formData.maritalStatus,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relationship: formData.emergencyRelationship
      }
    });
    setIsEditOpen(false);
    toast.success('Personal Information updated');
  };

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            Personal Information
          </h2>
          <p className="text-xs text-slate-400">Demographics and emergency contact info</p>
        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="btn-secondary text-xs px-3.5 py-1.5"
        >
          <Edit className="w-3.5 h-3.5" /> Edit Personal Info
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">First Name</span>
          <p className="font-semibold text-slate-200">{personalInfo?.firstName || '-'}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Last Name</span>
          <p className="font-semibold text-slate-200">{personalInfo?.lastName || '-'}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Gender</span>
          <p className="font-semibold text-slate-200">{personalInfo?.gender || '-'}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Date of Birth</span>
          <p className="font-semibold text-slate-200 font-mono">
            {personalInfo?.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString() : '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Phone Number</span>
          <p className="font-semibold text-slate-200 font-mono flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-indigo-400" /> {personalInfo?.phone || '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Email</span>
          <p className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" /> {personalInfo?.email || '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Nationality</span>
          <p className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-400" /> {personalInfo?.nationality || '-'}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Blood Group</span>
          <p className="font-semibold text-rose-400">{personalInfo?.bloodGroup || '-'}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Marital Status</span>
          <p className="font-semibold text-slate-200">{personalInfo?.maritalStatus || '-'}</p>
        </div>

        <div className="space-y-1 md:col-span-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Current Address</span>
          <p className="font-semibold text-slate-300 flex items-start gap-1.5">
            <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> {personalInfo?.currentAddress || '-'}
          </p>
        </div>

        <div className="space-y-1 md:col-span-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Permanent Address</span>
          <p className="font-semibold text-slate-300 flex items-start gap-1.5">
            <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> {personalInfo?.permanentAddress || '-'}
          </p>
        </div>
      </div>

      {/* Emergency Contact Block */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-indigo-400" /> Emergency Contact
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400">Name:</span> <strong className="text-slate-200">{personalInfo?.emergencyContact?.name || '-'}</strong>
          </div>
          <div>
            <span className="text-slate-400">Phone:</span> <strong className="text-slate-200 font-mono">{personalInfo?.emergencyContact?.phone || '-'}</strong>
          </div>
          <div>
            <span className="text-slate-400">Relationship:</span> <strong className="text-indigo-400">{personalInfo?.emergencyContact?.relationship || '-'}</strong>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-2xl bg-slate-900 border-slate-700 p-6 space-y-5 my-8"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-slate-100">Edit Personal Information</h3>
                <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Blood Group</label>
                    <input
                      type="text"
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Marital Status</label>
                    <select
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Current Address</label>
                  <input
                    type="text"
                    value={formData.currentAddress}
                    onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase">Emergency Contact Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={formData.emergencyName}
                      onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                      className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Contact Phone"
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                      className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Relationship"
                      value={formData.emergencyRelationship}
                      onChange={(e) => setFormData({ ...formData, emergencyRelationship: e.target.value })}
                      className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
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

export default PersonalInfoCard;
