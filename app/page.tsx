"use client";

import useStoryGenerator from "@/data/useStoryGenerator";
import StoryForm from "@/components/StoryForm";
import StoryResult from "@/components/StoryResult";
import SampleStories from "@/components/SampleStories";
import Stars from "@/components/Stars";
import ClientOnly from "@/components/ClientOnly";
import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (
          prompt: string,
          options: { model: string; stream?: boolean }
        ) =>
          | Promise<AsyncIterable<{ text: string }>>
          | Promise<{ text: string }>;
      };
    };
  }
}

export default function Home() {
  const {
    genre,
    tema,
    latar,
    cerita,
    judul,
    loading,
    error,
    showSample,
    handleGenerate,
    handleSample,
    handleCopy,
    contohCerita,
  } = useStoryGenerator();

  const [showForm, setShowForm] = useState(true);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-black via-indigo-900 to-black overflow-x-hidden">
      <ClientOnly>
        <Script src="https://js.puter.com/v2/" strategy="afterInteractive" />
      </ClientOnly>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 -z-10" />
      <div className="fixed inset-0 z-0 pointer-events-none" id="stars"></div>
      <main className="max-w-2xl mx-auto py-8 px-2 relative z-10">
        <Stars />
        <header className="text-center mb-10 animate-fadeInDown">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow mb-2 ">
            <span className="inline-block animate-wobble">✨</span> Pembuat
            Cerita Ajaib
          </h1>
          <p className="text-3xl text-white/90 drop-shadow">
            Buat cerita seru Kamu!
          </p>
        </header>
        {showForm && (
          <StoryForm
            onGenerate={(g, t, l) => {
              handleGenerate(g, t, l);
              setShowForm(false);
            }}
            loading={loading}
            error={error}
          />
        )}
        {!showForm && (
          <StoryResult
            judul={judul}
            cerita={cerita}
            onCopy={handleCopy}
            onNew={() => {
              setShowForm(true);
            }}
            loading={loading}
          />
        )}
        <SampleStories
          show={showSample}
          contohCerita={contohCerita}
          onSample={handleSample}
        />
      </main>
    </div>
  );
}
