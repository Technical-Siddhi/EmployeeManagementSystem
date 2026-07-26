import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-56 glass-card bg-slate-900/60 rounded-3xl p-6 relative flex flex-col justify-end">
        <div className="flex items-end gap-5">
          <div className="w-28 h-28 rounded-2xl bg-slate-800 border-4 border-slate-950 shrink-0" />
          <div className="space-y-2 w-full max-w-sm">
            <div className="h-6 bg-slate-800 rounded-lg w-3/4" />
            <div className="h-4 bg-slate-800/80 rounded-lg w-1/2" />
            <div className="h-3 bg-slate-800/50 rounded-lg w-2/3" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-72 glass-card bg-slate-900/60 rounded-3xl p-6 space-y-4">
          <div className="h-5 bg-slate-800 rounded w-1/3" />
          <div className="space-y-3">
            <div className="h-4 bg-slate-800/60 rounded w-full" />
            <div className="h-4 bg-slate-800/60 rounded w-5/6" />
            <div className="h-4 bg-slate-800/60 rounded w-4/6" />
          </div>
        </div>

        <div className="h-72 glass-card bg-slate-900/60 rounded-3xl p-6 space-y-4">
          <div className="h-5 bg-slate-800 rounded w-1/3" />
          <div className="space-y-3">
            <div className="h-4 bg-slate-800/60 rounded w-full" />
            <div className="h-4 bg-slate-800/60 rounded w-5/6" />
            <div className="h-4 bg-slate-800/60 rounded w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
