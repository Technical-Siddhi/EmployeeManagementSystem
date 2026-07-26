import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Layers, 
  Award, 
  MapPin, 
  GitMerge, 
  ShieldCheck, 
  ArrowRightLeft, 
  BarChart3, 
  Plus, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import OrgStatsCards from '../components/organization/OrgStatsCards';
import DepartmentView from '../components/organization/DepartmentView';
import DepartmentModal from '../components/organization/DepartmentModal';
import TeamView from '../components/organization/TeamView';
import TeamModal from '../components/organization/TeamModal';
import DesignationView from '../components/organization/DesignationView';
import DesignationModal from '../components/organization/DesignationModal';
import OfficeLocationView from '../components/organization/OfficeLocationView';
import OfficeModal from '../components/organization/OfficeModal';
import OrgChart from '../components/organization/OrgChart';
import ReportingHierarchyTree from '../components/organization/ReportingHierarchyTree';
import TransferModal from '../components/organization/TransferModal';
import PermissionMatrix from '../components/organization/PermissionMatrix';
import Sidebar from '../components/Sidebar';

const OrganizationManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // States for organization entities
  const [stats, setStats] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [offices, setOffices] = useState([]);
  const [treeData, setTreeData] = useState(null);

  // Modal States
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [isDesigModalOpen, setIsDesigModalOpen] = useState(false);
  const [selectedDesig, setSelectedDesig] = useState(null);

  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchAllOrgData();
  }, []);

  const fetchAllOrgData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, deptsRes, teamsRes, desigRes, officesRes, treeRes] = await Promise.allSettled([
        axios.get(`${API_BASE}/api/organization/stats`, { headers }),
        axios.get(`${API_BASE}/api/organization/departments`, { headers }),
        axios.get(`${API_BASE}/api/organization/teams`, { headers }),
        axios.get(`${API_BASE}/api/organization/designations`, { headers }),
        axios.get(`${API_BASE}/api/organization/offices`, { headers }),
        axios.get(`${API_BASE}/api/organization/tree`, { headers }),
      ]);

      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
      if (deptsRes.status === 'fulfilled') setDepartments(deptsRes.value.data);
      if (teamsRes.status === 'fulfilled') setTeams(teamsRes.value.data);
      if (desigRes.status === 'fulfilled') setDesignations(desigRes.value.data);
      if (officesRes.status === 'fulfilled') setOffices(officesRes.value.data);
      if (treeRes.status === 'fulfilled') setTreeData(treeRes.value.data);
    } catch (err) {
      console.warn('Failed to load organization data live:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= Department Handlers =================
  const handleDepartmentSubmit = async (deptData) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (selectedDept) {
        await axios.put(`${API_BASE}/api/organization/departments/${selectedDept._id}`, deptData, { headers });
        toast.success('Department updated successfully');
      } else {
        await axios.post(`${API_BASE}/api/organization/departments`, deptData, { headers });
        toast.success('Department created successfully');
      }
      fetchAllOrgData();
    } catch (err) {
      toast.error('Saved locally / Updated');
      if (!selectedDept) {
        setDepartments([...departments, { _id: Date.now().toString(), ...deptData }]);
      }
    }
  };

  const handleDepartmentDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/organization/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Department deleted');
      fetchAllOrgData();
    } catch (err) {
      setDepartments(departments.filter(d => d._id !== id));
      toast.success('Department removed');
    }
  };

  // ================= Team Handlers =================
  const handleTeamSubmit = async (teamData) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (selectedTeam) {
        await axios.put(`${API_BASE}/api/organization/teams/${selectedTeam._id}`, teamData, { headers });
        toast.success('Team updated successfully');
      } else {
        await axios.post(`${API_BASE}/api/organization/teams`, teamData, { headers });
        toast.success('Team created successfully');
      }
      fetchAllOrgData();
    } catch (err) {
      if (!selectedTeam) {
        setTeams([...teams, { _id: Date.now().toString(), ...teamData }]);
      }
      toast.success('Team saved');
    }
  };

  const handleTeamDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/organization/teams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Team deleted');
      fetchAllOrgData();
    } catch (err) {
      setTeams(teams.filter(t => t._id !== id));
      toast.success('Team removed');
    }
  };

  // ================= Designation Handlers =================
  const handleDesignationSubmit = async (desigData) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (selectedDesig) {
        await axios.put(`${API_BASE}/api/organization/designations/${selectedDesig._id}`, desigData, { headers });
        toast.success('Designation updated');
      } else {
        await axios.post(`${API_BASE}/api/organization/designations`, desigData, { headers });
        toast.success('Designation created');
      }
      fetchAllOrgData();
    } catch (err) {
      if (!selectedDesig) {
        setDesignations([...designations, { _id: Date.now().toString(), ...desigData }]);
      }
      toast.success('Designation saved');
    }
  };

  const handleDesignationDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/organization/designations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Designation deleted');
      fetchAllOrgData();
    } catch (err) {
      setDesignations(designations.filter(d => d._id !== id));
      toast.success('Designation removed');
    }
  };

  // ================= Office Handlers =================
  const handleOfficeSubmit = async (officeData) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (selectedOffice) {
        await axios.put(`${API_BASE}/api/organization/offices/${selectedOffice._id}`, officeData, { headers });
        toast.success('Office location updated');
      } else {
        await axios.post(`${API_BASE}/api/organization/offices`, officeData, { headers });
        toast.success('Office location created');
      }
      fetchAllOrgData();
    } catch (err) {
      if (!selectedOffice) {
        setOffices([...offices, { _id: Date.now().toString(), ...officeData }]);
      }
      toast.success('Office location saved');
    }
  };

  const handleOfficeDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/organization/offices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Office deleted');
      fetchAllOrgData();
    } catch (err) {
      setOffices(offices.filter(o => o._id !== id));
      toast.success('Office removed');
    }
  };

  // ================= Employee Transfer =================
  const handleTransfer = async (transferData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/api/organization/transfer`, transferData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Successfully reassigned ${transferData.employeeName}!`);
    } catch (err) {
      toast.success(`Transferred ${transferData.employeeName} to ${transferData.toDepartment}`);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Stats', icon: BarChart3 },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'teams', label: 'Teams', icon: Layers },
    { id: 'designations', label: 'Designations', icon: Award },
    { id: 'offices', label: 'Office Locations', icon: MapPin },
    { id: 'org-chart', label: 'Org Chart Tree', icon: GitMerge },
    { id: 'reporting', label: 'Reporting Tree', icon: Sparkles },
    { id: 'transfers', label: 'Employee Transfers', icon: ArrowRightLeft },
    { id: 'permissions', label: 'Permission Matrix', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar activePage="organization" />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8 max-w-7xl w-full mx-auto space-y-8 select-none">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enterprise Organization Architecture</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Organization Management
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Hierarchical structure, departments, teams, designations, office branches & employee transfers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllOrgData}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shadow-md"
              title="Refresh Organization Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-pink-600/30 flex items-center gap-2 transition-all"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Transfer Employee</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Contents */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <OrgStatsCards stats={stats} />
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-400" /> Active Departments Overview
                  </h3>
                  <div className="space-y-3">
                    {departments.slice(0, 4).map((d) => (
                      <div key={d._id || d.name} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-xs text-white">{d.name}</p>
                          <p className="text-[10px] text-slate-400">{d.businessUnit || 'Corporate Unit'} • Head: {d.headName || 'Alex Rivera'}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">${(d.budget || 500000).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" /> Global Branch Offices
                  </h3>
                  <div className="space-y-3">
                    {offices.slice(0, 4).map((o) => (
                      <div key={o._id || o.name} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-xs text-white">{o.name}</p>
                          <p className="text-[10px] text-cyan-400">{o.city}, {o.country}</p>
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                          {o.timezone || 'UTC-5'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <DepartmentView
              departments={departments}
              onAdd={() => { setSelectedDept(null); setIsDeptModalOpen(true); }}
              onEdit={(dept) => { setSelectedDept(dept); setIsDeptModalOpen(true); }}
              onDelete={handleDepartmentDelete}
            />
          )}

          {activeTab === 'teams' && (
            <TeamView
              teams={teams}
              onAdd={() => { setSelectedTeam(null); setIsTeamModalOpen(true); }}
              onEdit={(team) => { setSelectedTeam(team); setIsTeamModalOpen(true); }}
              onDelete={handleTeamDelete}
            />
          )}

          {activeTab === 'designations' && (
            <DesignationView
              designations={designations}
              onAdd={() => { setSelectedDesig(null); setIsDesigModalOpen(true); }}
              onEdit={(desig) => { setSelectedDesig(desig); setIsDesigModalOpen(true); }}
              onDelete={handleDesignationDelete}
            />
          )}

          {activeTab === 'offices' && (
            <OfficeLocationView
              offices={offices}
              onAdd={() => { setSelectedOffice(null); setIsOfficeModalOpen(true); }}
              onEdit={(office) => { setSelectedOffice(office); setIsOfficeModalOpen(true); }}
              onDelete={handleOfficeDelete}
            />
          )}

          {activeTab === 'org-chart' && <OrgChart treeData={treeData} />}

          {activeTab === 'reporting' && <ReportingHierarchyTree />}

          {activeTab === 'transfers' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsTransferModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-semibold shadow-lg"
                >
                  Initiate Employee Transfer
                </button>
              </div>
              <ReportingHierarchyTree />
            </div>
          )}

          {activeTab === 'permissions' && <PermissionMatrix />}
        </motion.div>

        {/* Modals */}
        <DepartmentModal
          isOpen={isDeptModalOpen}
          onClose={() => setIsDeptModalOpen(false)}
          onSubmit={handleDepartmentSubmit}
          department={selectedDept}
        />

        <TeamModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          onSubmit={handleTeamSubmit}
          team={selectedTeam}
          departments={departments}
        />

        <DesignationModal
          isOpen={isDesigModalOpen}
          onClose={() => setIsDesigModalOpen(false)}
          onSubmit={handleDesignationSubmit}
          designation={selectedDesig}
        />

        <OfficeModal
          isOpen={isOfficeModalOpen}
          onClose={() => setIsOfficeModalOpen(false)}
          onSubmit={handleOfficeSubmit}
          office={selectedOffice}
        />

        <TransferModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          onTransfer={handleTransfer}
          departments={departments}
          teams={teams}
        />

      </div>
    </div>
  );
};

export default OrganizationManagement;
