import React from 'react';
import { Search, Filter, LayoutGrid, List, Plus, AlertCircle, RefreshCw } from 'lucide-react';

const DocumentFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  expiryFilter,
  setExpiryFilter,
  viewMode,
  setViewMode,
  categories = [],
  userRole = 'admin',
  onOpenUpload,
  onOpenCategoryManager
}) => {
  return (
    <div className="glass-card p-4 space-y-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by document name, category, or uploader..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* View Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'table' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {userRole === 'admin' && (
            <button
              onClick={onOpenCategoryManager}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" /> Custom Category
            </button>
          )}

          {userRole !== 'manager' && (
            <button
              onClick={onOpenUpload}
              className="btn-primary text-xs py-2 px-4 whitespace-nowrap shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" /> Upload Document
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdowns & Pills */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/60 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
          <Filter className="w-3.5 h-3.5 text-indigo-400" /> Filters:
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Verification Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
        >
          <option value="All">All Verification Statuses</option>
          <option value="Verified">Verified Only</option>
          <option value="Pending">Pending Verification</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Expiry Status Filter */}
        <select
          value={expiryFilter}
          onChange={(e) => setExpiryFilter(e.target.value)}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
        >
          <option value="All">All Validity Statuses</option>
          <option value="expiring">Expiring Soon (Next 30 Days)</option>
          <option value="expired">Expired Documents</option>
        </select>

        {/* Reset Filters */}
        {(selectedCategory !== 'All' || selectedStatus !== 'All' || expiryFilter !== 'All' || searchQuery !== '') && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStatus('All');
              setExpiryFilter('All');
              setSearchQuery('');
            }}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 ml-auto"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentFilter;
