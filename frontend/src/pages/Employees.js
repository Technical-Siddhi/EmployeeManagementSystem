import React from 'react';
import Sidebar from '../components/Sidebar';
import { Users, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Employees = () => {
  const employees = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@company.com', role: 'Developer', dept: 'Engineering', status: 'Active' },
    { id: 2, name: 'Sara Johnson', email: 'sara@company.com', role: 'Designer', dept: 'Design', status: 'Active' },
    { id: 3, name: 'Mike Chen', email: 'mike@company.com', role: 'Manager', dept: 'Engineering', status: 'On Leave' },
    { id: 4, name: 'Priya Patel', email: 'priya@company.com', role: 'HR', dept: 'Human Resources', status: 'Active' },
    { id: 5, name: 'John Doe', email: 'john@company.com', role: 'Developer', dept: 'Engineering', status: 'Inactive' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage="employees" />
      <div className="flex-1 ml-64 lg:ml-64 min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Employees
              </h1>
              <p className="text-slate-500 mt-1">Manage your team members</p>
            </div>
            <button className="btn-primary px-8 py-3 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Employee
            </button>
          </div>

          <div className="glass-card">
            <div className="p-8 border-b border-slate-200 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all font-medium">
                Filters
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                            {employee.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.dept}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          employee.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3 p-2 hover:bg-primary-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Employees;

