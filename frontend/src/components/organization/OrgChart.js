import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Search, Mail, Building2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeNode = ({ node, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const matchesSearch = searchTerm && (
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-4 rounded-2xl border backdrop-blur-xl transition-all shadow-xl min-w-[260px] text-center relative ${
          matchesSearch
            ? 'bg-indigo-900/40 border-indigo-500 shadow-indigo-500/20 ring-2 ring-indigo-500'
            : 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/40'
        }`}
      >
        <div className="flex flex-col items-center space-y-2">
          {node.avatar ? (
            <img
              src={node.avatar}
              alt={node.name}
              className="w-12 h-12 rounded-full border-2 border-indigo-500/50 object-cover shadow-md"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {node.name.charAt(0)}
            </div>
          )}

          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">{node.name}</h4>
            <p className="text-xs font-semibold text-indigo-400">{node.title}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono border border-slate-700">
              {node.department || 'Executive'}
            </span>
          </div>
        </div>

        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shadow-md"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </motion.div>

      {/* Connecting Vertical Line */}
      {hasChildren && isExpanded && (
        <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-500/80 to-purple-500/80" />
      )}

      {/* Children Nodes Grid */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap justify-center gap-8 pt-2 relative"
          >
            {node.children.map((childNode) => (
              <TreeNode key={childNode.id} node={childNode} searchTerm={searchTerm} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OrgChart = ({ treeData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const defaultTree = treeData || {
    id: 'root-ceo',
    name: 'Victoria Vance',
    title: 'Chief Executive Officer',
    department: 'Executive Board',
    email: 'vance@attendx.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    children: [
      {
        id: 'vpe-1',
        name: 'Marcus Holloway',
        title: 'VP of Engineering',
        department: 'Engineering & Technology',
        email: 'marcus@attendx.com',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        children: [
          {
            id: 'em-1',
            name: 'Alex Rivera',
            title: 'Engineering Manager',
            department: 'Engineering & Technology',
            email: 'alex.rivera@attendx.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
            children: [
              {
                id: 'tl-1',
                name: 'Rahul Sharma',
                title: 'Senior Full Stack Lead',
                department: 'Frontend Architecture',
                email: 'rahul.sharma@attendx.com',
                children: [
                  { id: 'dev-1', name: 'Samantha Wu', title: 'Software Engineer', department: 'Frontend Architecture' },
                  { id: 'dev-2', name: 'David Miller', title: 'Junior UI Engineer', department: 'Frontend Architecture' }
                ]
              },
              {
                id: 'tl-2',
                name: 'Elena Rostova',
                title: 'Backend Tech Lead',
                department: 'Backend & Cloud APIs',
                children: [
                  { id: 'dev-3', name: 'Kevin Durant', title: 'DevOps Specialist', department: 'DevOps & Reliability' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'vphr-1',
        name: 'Sarah Connor',
        title: 'VP of Human Resources',
        department: 'Human Resources & Talent',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        children: [
          {
            id: 'hrm-1',
            name: 'Jessica Pearson',
            title: 'HR Manager',
            department: 'Human Resources & Talent',
            children: [
              { id: 'hre-1', name: 'Harvey Specter', title: 'Talent Acquisition Lead', department: 'Talent Acquisition' }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search employee in hierarchy tree..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 w-full sm:w-80 focus:outline-none focus:border-indigo-500"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear Search
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Click node arrows to expand / collapse hierarchy</span>
        </div>
      </div>

      {/* Org Tree Canvas */}
      <div className="p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 overflow-x-auto min-h-[500px] flex justify-center shadow-inner">
        <TreeNode node={defaultTree} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default OrgChart;
