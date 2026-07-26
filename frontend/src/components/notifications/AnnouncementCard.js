import React from 'react';
import { motion } from 'framer-motion';
import { Pin, Megaphone, ThumbsUp, Heart, Award, Calendar, User } from 'lucide-react';

const AnnouncementCard = ({ announcement, userEmail, onReact }) => {
  const thumbsUpCount = announcement.reactions?.thumbsUp?.length || 0;
  const heartCount = announcement.reactions?.heart?.length || 0;
  const applaudCount = announcement.reactions?.applaud?.length || 0;

  const hasThumbsUp = announcement.reactions?.thumbsUp?.includes(userEmail);
  const hasHeart = announcement.reactions?.heart?.includes(userEmail);
  const hasApplaud = announcement.reactions?.applaud?.includes(userEmail);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-3xl bg-slate-900/80 border backdrop-blur-xl transition-all duration-200 shadow-xl space-y-4 relative ${
        announcement.pinned ? 'border-amber-500/40 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900' : 'border-slate-800/80'
      }`}
    >
      {announcement.pinned && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
          <Pin className="w-3 h-3 fill-amber-400" /> Pinned Announcement
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 flex items-center justify-center text-white shadow-md">
          <Megaphone className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {announcement.category || 'Company'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Audience: {announcement.audience || 'All Employees'}
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-1">{announcement.title}</h3>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
        {announcement.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>Published by <strong className="text-slate-200">{announcement.publishedBy}</strong></span>
        </div>

        {/* Reaction Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onReact(announcement._id, 'thumbsUp')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              hasThumbsUp
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            👍 <span className="font-mono">{thumbsUpCount}</span>
          </button>

          <button
            onClick={() => onReact(announcement._id, 'heart')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              hasHeart
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            ❤️ <span className="font-mono">{heartCount}</span>
          </button>

          <button
            onClick={() => onReact(announcement._id, 'applaud')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              hasApplaud
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            👏 <span className="font-mono">{applaudCount}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnnouncementCard;
