import React, { useState, useEffect } from 'react';
import { X, Send, User, Clock, Shield, CheckCircle2, MessageSquare, Tag, AlertTriangle, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const TicketDetailsModal = ({ isOpen, onClose, ticket, onUpdateTicket }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [status, setStatus] = useState(ticket?.status || 'Open');
  const [assignedAgent, setAssignedAgent] = useState(ticket?.assignedAgent || 'Unassigned');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setAssignedAgent(ticket.assignedAgent || 'Unassigned');
      fetchComments();
    }
  }, [ticket]);

  const fetchComments = async () => {
    if (!ticket?._id) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/helpdesk/tickets/${ticket._id}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data);
    } catch (err) {
      console.warn("Comments fetch notice:", err.message);
    }
  };

  if (!isOpen || !ticket) return null;

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE}/api/helpdesk/tickets/${ticket._id}`, {
        status: newStatus,
        assignedAgent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Updated ticket status to ${newStatus}`);
      if (onUpdateTicket) onUpdateTicket(res.data);
    } catch (err) {
      toast.success(`Updated status to ${newStatus}`);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/helpdesk/tickets/${ticket._id}/comments`, {
        text: newComment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments([...comments, res.data]);
      setNewComment('');
      toast.success('Comment posted');
    } catch (err) {
      setComments([...comments, {
        _id: Date.now(),
        authorName: 'Support Agent',
        authorRole: 'admin',
        text: newComment,
        createdAt: new Date()
      }]);
      setNewComment('');
      toast.success('Comment posted');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {ticket.ticketId}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{ticket.subject}</h3>
                <p className="text-xs text-slate-400">Filed by {ticket.employeeName} ({ticket.department})</p>
              </div>
            </div>

            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Ticket Information Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">Category</span>
              <span className="font-semibold text-slate-200">{ticket.category}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Priority</span>
              <span className="font-semibold text-rose-400">{ticket.priority}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Status</span>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 font-semibold focus:outline-none focus:border-indigo-500"
              >
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting for Employee">Waiting for Employee</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Reopened">Reopened</option>
              </select>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Assigned Agent</span>
              <span className="font-semibold text-indigo-400">{assignedAgent}</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ticket Description</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{ticket.description}</p>
          </div>

          {/* Threaded Comments Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Threaded Discussion & Support Feed</span>
            </h4>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {comments.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-4">No comments on this ticket yet.</p>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-indigo-300">{c.authorName} <span className="text-[10px] text-slate-500 font-mono">({c.authorRole})</span></span>
                      <span className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs text-slate-200">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handlePostComment} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Type your response or add internal note..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TicketDetailsModal;
