import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, ThumbsUp, Eye, FileText, ChevronRight } from 'lucide-react';

const KnowledgeBaseView = ({ articles = [], search = '', setSearch }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articles.filter(a => {
    if (!search) return true;
    const q = search.toLowerCase();
    return a.title?.toLowerCase().includes(q) || a.content?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Self-Service Knowledge Base</h3>
            <p className="text-xs text-slate-400">Search troubleshooting articles & enterprise policy guides before raising a ticket</p>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search KB articles by keywords (e.g., VPN, Payslip, PTO rollover)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Article Grid & Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Available Guides</h4>
          {filteredArticles.map((art) => (
            <motion.div
              key={art._id || art.title}
              onClick={() => setSelectedArticle(art)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedArticle?._id === art._id
                  ? 'bg-purple-600/20 border-purple-500/40 text-white shadow-lg'
                  : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-purple-400 border border-slate-800">
                  {art.category}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {art.views || 100}</span>
                  <span className="flex items-center gap-0.5"><ThumbsUp className="w-3 h-3 text-emerald-400" /> {art.helpfulCount || 45}</span>
                </div>
              </div>
              <h5 className="text-xs font-bold text-white mb-1 line-clamp-2">{art.title}</h5>
              <p className="text-[11px] text-slate-400 line-clamp-2">{art.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Selected Article Viewer */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          {selectedArticle ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-purple-400">{selectedArticle.category} Article</span>
                <span className="text-xs text-slate-400">Authored by {selectedArticle.author || 'Helpdesk Admin'}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{selectedArticle.title}</h3>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-3">
                <p>{selectedArticle.content}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
              <FileText className="w-12 h-12 mb-3 text-slate-700" />
              <p className="text-xs font-semibold text-slate-400">Select an article from the list to view instructions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
