"use client";
import { useState } from "react";
import { track } from "@vercel/analytics";

interface Props {
  judul: string;
  cerita: string;
  onCopy: () => void;
  onNew: () => void;
  loading: boolean;
}

export default function StoryResult({
  judul,
  cerita,
  onCopy,
  onNew,
  loading,
}: Props) {
  const [copied, setCopied] = useState(false);
  if (!cerita) return null;
  const handleCopyClick = () => {
    // Track copy button click
    track("story_copy_clicked", {
      judul: judul || "default",
    });
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="bg-white/90 rounded-2xl p-8 shadow-xl mb-8 backdrop-blur-md animate-fadeInUp">
      <div className="flex items-center justify-between mb-6 border-b-2 border-indigo-600 pb-3">
        <h3 className="text-lg font-bold text-gray-700">
          📖 {judul || "Cerita Ajaibmu"}
        </h3>
      </div>
      <div className="whitespace-pre-line text-base text-gray-800">
        {cerita}
      </div>
      {!loading && cerita && (
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border-2 border-indigo-400 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-400 hover:text-white transition"
              onClick={handleCopyClick}
            >
              {copied ? "✅ Tersalin!" : "📋 Salin"}
            </button>
            <button
              className="px-3 py-1 border-2 border-indigo-400 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-400 hover:text-white transition"
              onClick={() => {
                // Track new story button click
                track("new_story_clicked");
                onNew();
              }}
            >
              🔄 Cerita Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
