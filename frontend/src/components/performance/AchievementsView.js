import React, { useState } from 'react';
import { Award, Plus, Sparkles, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const AchievementsView = ({ achievements = [], badges = [], onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const defaultBadges = [
    { badgeName: 'Top Performer', icon: '🏆', description: 'Consistently rated in top 5% of workforce' },
    { badgeName: 'Perfect Attendance', icon: '⭐', description: '100% on-time attendance recorded' },
    { badgeName: 'Fast Learner', icon: '🚀', description: 'Mastered technical architecture stack in 30 days' },
    { badgeName: 'Goal Crusher', icon: '🎯', description: 'Achieved 100% of quarterly OKRs' },
    { badgeName: 'Team Player', icon: '🤝', description: 'Cross-functional collaboration excellence' }
  ];

  const activeBadges = badges.length > 0 ? badges : defaultBadges;

  return (
    <div className="space-y-8">
      {/* Gamified Badges Showcase */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gamified Recognition Badges</h3>
              <p className="text-xs text-slate-400">Automated badges unlocked by employee milestones</p>
            </div>
          </div>

          <button
            onClick={onAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Award Badge / Honor</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {activeBadges.map((badge, idx) => (
            <motion.div
              key={badge.badgeName + idx}
              whileHover={{ scale: 1.04 }}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2 relative shadow-lg group hover:border-amber-500/40 transition-all"
            >
              <div className="text-3xl mb-1">{badge.icon || '🏆'}</div>
              <h4 className="text-xs font-bold text-white">{badge.badgeName}</h4>
              <p className="text-[10px] text-slate-400 leading-tight">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements Timeline Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Honors & Employee of the Month Wall
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach._id || ach.title + idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 flex items-center justify-center text-2xl shadow-md shrink-0">
                {ach.badgeIcon || '🏆'}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {ach.category || 'Recognition'}
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight">{ach.title}</h4>
                <p className="text-xs text-indigo-400 font-semibold">{ach.employeeName}</p>
                <p className="text-xs text-slate-400 pt-1">{ach.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsView;
