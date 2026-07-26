import React from 'react';
import { Plus, MessageSquare, Trash2, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ConversationSidebar = ({ sessions = [], currentSessionId, onSelectSession, onNewSession, onClearHistory }) => {
  return (
    <div className="w-64 bg-slate-900/80 border-r border-slate-800/80 backdrop-blur-xl p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-4">
        {/* New Chat Button */}
        <button
          onClick={onNewSession}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New AI Conversation</span>
        </button>

        {/* History List */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Chat History</span>
          <div className="space-y-1 mt-2">
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSession(s.id)}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center gap-2.5 truncate ${
                  currentSessionId === s.id
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/30 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">{s.title || 'Workforce Analytics Inquiry'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Button */}
      <button
        onClick={onClearHistory}
        className="w-full py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center justify-center gap-2"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Clear Conversations</span>
      </button>
    </div>
  );
};

export default ConversationSidebar;
