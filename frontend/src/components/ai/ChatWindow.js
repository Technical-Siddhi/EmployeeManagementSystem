import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, Trash2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import SuggestedPromptCards from './SuggestedPromptCards';
import TypingIndicator from './TypingIndicator';

const ChatWindow = ({ messages = [], isThinking, onSendMessage, onTriggerAction, onClearChat, onRegenerate }) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    onSendMessage(inputPrompt);
    setInputPrompt('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-950/40 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-2xl overflow-hidden">

      {/* Top Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>AttendX Intelligence Copilot</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v2.5 Enterprise
              </span>
            </h3>
            <p className="text-xs text-slate-400">Natural language database query & workforce automation agent</p>
          </div>
        </div>

        <button
          onClick={onClearChat}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto shadow-xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">How can I assist your workforce today?</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Ask questions about employee records, leaves, overtime, payroll batches, support tickets, or document expirations.
              </p>
            </div>

            <SuggestedPromptCards onSelectPrompt={(p) => onSendMessage(p)} />
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble
              key={msg.id || idx}
              message={msg}
              onRegenerate={idx === messages.length - 1 && msg.sender === 'ai' ? onRegenerate : null}
              onTriggerAction={onTriggerAction}
            />
          ))
        )}

        {isThinking && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Input Box */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/60">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Ask AI Assistant (e.g. 'Show employees on leave today', 'Payroll summary')..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isThinking}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Ask AI</span>
          </button>
        </form>
      </div>

    </div>
  );
};

export default ChatWindow;
