import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check, Sparkles, RefreshCw, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageBubble = ({ message, onRegenerate, onTriggerAction }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    toast.success('Copied response to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 my-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 ${
        isUser
          ? 'bg-gradient-to-tr from-blue-600 to-indigo-600'
          : 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-2xl space-y-2 ${isUser ? 'items-end' : ''}`}>
        <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xl border backdrop-blur-xl ${
          isUser
            ? 'bg-indigo-600 text-white border-indigo-500/40 rounded-tr-none'
            : 'bg-slate-900/90 text-slate-200 border-slate-800/80 rounded-tl-none font-sans'
        }`}>
          {/* Simple Markdown Parser Representation */}
          <div className="prose prose-invert max-w-none text-xs whitespace-pre-wrap">
            {message.text}
          </div>

          {/* Action Confirmation Button if suggested */}
          {message.actionSuggested && (
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-3 bg-indigo-500/10 p-3 rounded-xl border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Suggested Action: {message.actionSuggested.type}</span>
              </div>
              <button
                onClick={() => onTriggerAction(message.actionSuggested)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-[11px] shadow-md transition-all whitespace-nowrap"
              >
                Execute Action
              </button>
            </div>
          )}
        </div>

        {/* Message Control Bar for AI */}
        {!isUser && (
          <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500 font-mono">
            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>•</span>
            <button onClick={handleCopy} className="hover:text-slate-300 flex items-center gap-1 transition-colors">
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            {onRegenerate && (
              <>
                <span>•</span>
                <button onClick={onRegenerate} className="hover:text-slate-300 flex items-center gap-1 transition-colors">
                  <RefreshCw className="w-3 h-3" />
                  <span>Regenerate</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
