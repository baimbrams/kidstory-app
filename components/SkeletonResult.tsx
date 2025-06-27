import React from "react";

export default function SkeletonResult() {
  return (
    <div className="bg-white/90 rounded-2xl p-8 shadow-xl mb-8 backdrop-blur-md animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}
