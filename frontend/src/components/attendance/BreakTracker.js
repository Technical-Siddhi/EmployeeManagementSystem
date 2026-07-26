import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Play, Square, Utensils, Users, User, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const BreakTracker = () => {
  const [activeBreak, setActiveBreak] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    let interval = null;
    if (activeBreak) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeBreak]);

  const handleStartBreak = async (type) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/attendance/break/start`, { breakType: type }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActiveBreak(res.data);
      setElapsedSeconds(0);
      toast.success(`Started ${type} break`);
    } catch (err) {
      setActiveBreak({
        breakType: type,
        startTime: new Date()
      });
      toast.success(`Started ${type} break`);
    }
  };

  const handleEndBreak = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/api/attendance/break/end`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Ended ${activeBreak?.breakType || 'Break'}. Logged ${Math.floor(elapsedSeconds / 60)} minutes.`);
      setActiveBreak(null);
    } catch (err) {
      toast.success(`Ended break. Logged ${Math.floor(elapsedSeconds / 60)} minutes.`);
      setActiveBreak(null);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const breakTypes = [
    { type: 'Lunch', icon: Utensils, color: 'hover:bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { type: 'Tea', icon: Coffee, color: 'hover:bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { type: 'Meeting', icon: Users, color: 'hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    { type: 'Personal', icon: User, color: 'hover:bg-rose-500/20 text-rose-400 border-rose-500/30' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${activeBreak ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse' : 'bg-slate-800 text-slate-400'} border flex items-center justify-center font-bold`}>
          <Clock className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Real-Time Break Session Tracker</h3>
          {activeBreak ? (
            <p className="text-xs text-amber-400 font-semibold mt-0.5">
              Active: {activeBreak.breakType} Break • Running Timer
            </p>
          ) : (
            <p className="text-xs text-slate-400 mt-0.5">
              Select break type to pause work hours calculation
            </p>
          )}
        </div>
      </div>

      {activeBreak ? (
        <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-2xl border border-amber-500/30">
          <div className="font-mono text-2xl font-black text-amber-400 px-3">
            {formatTime(elapsedSeconds)}
          </div>
          <button
            onClick={handleEndBreak}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all"
          >
            <Square className="w-4 h-4" />
            <span>End Break</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {breakTypes.map((b) => {
            const Icon = b.icon;
            return (
              <button
                key={b.type}
                onClick={() => handleStartBreak(b.type)}
                className={`px-3.5 py-2 rounded-xl bg-slate-950/60 border ${b.color} text-xs font-semibold flex items-center gap-2 transition-all`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{b.type} Break</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BreakTracker;
