"use client";
import { useState } from "react";

interface Props {
  onGenerate: (genre: string, tema: string, latar: string) => void;
  loading: boolean;
  error: boolean;
}

export default function StoryForm({ onGenerate, loading, error }: Props) {
  const [genre, setGenre] = useState("");
  const [tema, setTema] = useState("");
  const [latar, setLatar] = useState("");

  return (
    <section className="bg-white/90 rounded-2xl p-8 shadow-xl mb-8 backdrop-blur-md animate-fadeInUp">
      <div>
        <h3 className="text-xl font-bold text-center text-gray-700 mb-6 relative">
          🎭 Pilih Genre, Tema, dan Latar Cerita Kamu
          <span className="block w-12 h-1 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full mx-auto mt-3" />
        </h3>

        {/* Genre */}
        <div className="mb-6">
          <label
            htmlFor="genre"
            className="block font-semibold text-gray-700 mb-2"
          >
            📚 Genre
          </label>
          <textarea
            id="genre"
            placeholder="Petualangan, Fantasi..."
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full text-gray-700 px-4 py-3 border-2 bg-white border-indigo-100 rounded-lg text-base focus:outline-none focus:border-indigo-400 transition resize-none"
            rows={2}
          />
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {["Petualangan", "Fantasi", "Fiksi Ilmiah"].map((g) => (
              <span
                key={g}
                className="bg-indigo-100  text-indigo-700 px-3 py-1 rounded-full text-sm cursor-pointer border border-indigo-200 hover:bg-indigo-200"
                onClick={() => setGenre(g)}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Tema */}
        <div className="mb-6">
          <label
            htmlFor="tema"
            className="block font-semibold text-gray-700 mb-2"
          >
            🎯 Tema
          </label>
          <textarea
            id="tema"
            placeholder="Persahabatan, Keberanian, Penemuan..."
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full px-4  text-gray-700 py-3 border-2 bg-white border-indigo-100 rounded-lg text-base focus:outline-none focus:border-indigo-400 transition resize-none"
            rows={2}
          />
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {["Persahabatan", "Keberanian", "Penemuan"].map((t) => (
              <span
                key={t}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm cursor-pointer border border-indigo-200 hover:bg-indigo-200"
                onClick={() => setTema(t)}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Latar */}
        <div className="mb-10">
          <label
            htmlFor="latar"
            className="block font-semibold text-gray-700 mb-6"
          >
            🌍 Latar
          </label>
          <textarea
            id="latar"
            placeholder="Taman bermain, Istana ajaib....."
            value={latar}
            onChange={(e) => setLatar(e.target.value)}
            className="w-full  text-gray-700 px-4 py-3 border-2 bg-white border-indigo-100 rounded-lg text-base focus:outline-none focus:border-indigo-400 transition resize-none"
            rows={2}
          />
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {[
              "Taman bermain",
              "Istana ajaib",
              "Kota kecil",
              "Stasiun luar angkasa",
            ].map((l) => (
              <span
                key={l}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm cursor-pointer border border-indigo-200 hover:bg-indigo-200"
                onClick={() => setLatar(l)}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-3 font-semibold border-l-4 border-red-400">
            ⚠️ Maaf, layanan AI sedang bermasalah. Coba lagi nanti atau gunakan
            cerita contoh di bawah ini.
          </div>
        )}
        <button
          className={`w-full bg-gradient-to-r from-indigo-400 to-purple-600 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 shadow-lg transition hover:scale-[1.03] active:scale-95 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={() => onGenerate(genre, tema, latar)}
          disabled={loading}
        >
          {loading && (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          )}
          <span>{loading ? "Membuat Cerita..." : "✨ Buat Cerita Ajaib!"}</span>
        </button>
      </div>
    </section>
  );
}
