import React from 'react';

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm animate-pulse flex flex-col">
      {/* Thumbnail Skeleton */}
      <div className="w-full aspect-video bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Card Body Skeleton */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="h-4 bg-slate-200 rounded-md w-4/5" />
          <div className="h-3 bg-slate-100 rounded-md w-1/2" />
          <div className="h-5 bg-slate-100 rounded-md w-2/3 mt-2" />
          <div className="flex gap-1.5 pt-1">
            <div className="h-4 bg-slate-100 rounded w-12" />
            <div className="h-4 bg-slate-100 rounded w-16" />
            <div className="h-4 bg-slate-100 rounded w-14" />
          </div>
        </div>

        <div className="h-9 bg-slate-100 rounded-xl w-full" />
      </div>
    </div>
  );
}

export function VideoFeedSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="w-full aspect-video bg-slate-200 rounded-xl" />
          <div className="space-y-1.5">
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
            <div className="h-3 bg-slate-100 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
