import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Users, Search, Plus, Edit, Trash2, LayoutGrid, List, UserCheck, UserX, Clock, Filter, X, Mail, Shield, Building2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Employees = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@company.com', role: 'Developer', dept: 'Engineering', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Sara Johnson', email: 'sara@company.com', role: 'Designer', dept: 'Design', status: 'Active', joinDate: '2023-03-20' },
    { id: 3, name: 'Mike Chen', email: 'mike@company.com', role: 'Manager', dept: 'Engineering', status: 'On Leave', joinDate: '2022-11-01' },
    { id: 4, name: 'Priya Patel', email: 'priya@company.com', role: 'HR Manager', dept: 'Human Resources', status: 'Active', joinDate: '2021-08-10' },
    { id: 5, name: 'John Doe', email: 'john@company.com', role: 'Backend Lead', dept: 'Engineering', status: 'Inactive', joinDate: '2022-04-05' },
    { id: 6, name: 'Emily Davis', email: 'emily@company.com', role: 'Marketing Specialist', dept: 'Marketing', status: 'Active', joinDate: '2023-06-12' },
  ]);

  const [newEmp, setNewEmp] = useState({ name: '', email: '', role: 'Developer', dept: 'Engineering' });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email) {
      toast.error('Please fill in required fields');
      return;
    }
    const created = {
      id: Date.now(),
      ...newEmp,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setEmployees([created, ...employees]);
    setIsAddModalOpen(false);
    setNewEmp({ name: '', email: '', role: 'Developer', dept: 'Engineering' });
    toast.success(`${created.name} added to employee directory!`);
  };

  const handleDelete = (e, id, name) => {
    e.stopPropagation();
    setEmployees(employees.filter(e => e.id !== id));
    toast.success(`Removed ${name}`);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalEmp = employees.length;
  const activeEmp = employees.filter(e => e.status === 'Active').length;
  const onLeaveEmp = employees.filter(e => e.status === 'On Leave').length;
  const inactiveEmp = employees.filter(e => e.status === 'Inactive').length;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activePage="employees" />
      
      <main className="flex-1 ml-64 min-h-screen p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90 border-indigo-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Directory Management</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Workforce Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">Click any employee row to open full Enterprise Profile (/admin/employees/:id)</p>
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary text-sm shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card bg-slate-900/60 border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Total Members</p>
              <p className="text-2xl font-bold text-slate-100 mt-1">{totalEmp}</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card bg-slate-900/60 border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Active Now</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{activeEmp}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card bg-slate-900/60 border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">On Leave</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{onLeaveEmp}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card bg-slate-900/60 border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Inactive</p>
              <p className="text-2xl font-bold text-rose-400 mt-1">{inactiveEmp}</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <UserX className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="glass-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Department Filter & Layout Switch */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/80 rounded-xl p-1 text-xs">
                {['All', 'Engineering', 'Design', 'Human Resources', 'Marketing'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedDept === dept
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {dept === 'Human Resources' ? 'HR' : dept}
                  </button>
                ))}
              </div>

              <div className="flex items-center bg-slate-800/60 border border-slate-700/80 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Directory Content: Table vs Grid */}
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Employee</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Joined Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm">
                  {filteredEmployees.map((emp) => (
                    <tr 
                      key={emp.id} 
                      onClick={() => navigate(`/admin/employees/${emp.id}`)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                              {emp.name} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {emp.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-xs font-medium">
                          {emp.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                        {emp.dept}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-xs font-mono">
                        {emp.joinDate}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={
                          emp.status === 'Active' ? 'badge-emerald' :
                          emp.status === 'On Leave' ? 'badge-amber' :
                          'badge-rose'
                        }>
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right space-x-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(`/admin/employees/${emp.id}`); }}
                          className="p-2 rounded-lg bg-slate-800/60 hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-400 border border-slate-700/60 transition-all"
                          title="View Profile"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, emp.id, emp.name)}
                          className="p-2 rounded-lg bg-slate-800/60 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-all"
                          title="Remove Employee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEmployees.map((emp) => (
                <motion.div
                  key={emp.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/admin/employees/${emp.id}`)}
                  className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all space-y-4 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                          {emp.name} <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                        </h4>
                        <p className="text-xs text-indigo-400 font-medium">{emp.role}</p>
                      </div>
                    </div>
                    <span className={
                      emp.status === 'Active' ? 'badge-emerald' :
                      emp.status === 'On Leave' ? 'badge-amber' :
                      'badge-rose'
                    }>
                      {emp.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-500" /> Email:</span>
                      <span className="text-slate-200 font-medium">{emp.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-slate-500" /> Dept:</span>
                      <span className="text-slate-200 font-medium">{emp.dept}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/admin/employees/${emp.id}`); }}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, emp.id, emp.name)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Employee Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md bg-slate-900 border-slate-700/80 p-6 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-slate-100">Add New Team Member</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Software Engineer"
                      value={newEmp.role}
                      onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Department</label>
                    <select
                      value={newEmp.dept}
                      onChange={(e) => setNewEmp({ ...newEmp, dept: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Human Resources">HR</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary text-sm"
                  >
                    Create Employee
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

export default Employees;
