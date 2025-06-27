"use client";
import { useState } from "react";
import contohCerita from "@/data/contohCerita";

export default function useStoryGenerator() {
  const [genre, setGenre] = useState("");
  const [tema, setTema] = useState("");
  const [latar, setLatar] = useState("");
  const [cerita, setCerita] = useState("");
  const [judul, setJudul] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSample, setShowSample] = useState(false);

  const handleGenerate = async (
    genreInput: string,
    temaInput: string,
    latarInput: string
  ) => {
    console.log("Mulai generate cerita");
    setGenre(genreInput);
    setTema(temaInput);
    setLatar(latarInput);
    setLoading(true);
    setError(false);
    setShowSample(false);
    setCerita("");
    setJudul("");
    const prompt = `Buatkan cerita anak singkat dengan parameter berikut:\n- Genre: ${
      genreInput || "Petualangan"
    }\n- Tema: ${temaInput || "Persahabatan"}\n- Latar: ${
      latarInput || "Taman bermain"
    }\n\nGunakan bahasa yang mudah dipahami anak-anak, ceria, dan penuh imajinasi. Sertakan dialog lucu dan pesan moral.`;
    try {
      if (
        typeof window !== "undefined" &&
        window.puter &&
        window.puter.ai &&
        window.puter.ai.chat
      ) {
        let storyText = "";
        console.log("Memanggil window.puter.ai.chat...");
        const response = await window.puter.ai.chat(prompt, {
          model: "x-ai/grok-3-beta",
          stream: true,
        });
        console.log("Respons AI diterima:", response);
        if (
          typeof (
            response as unknown as {
              [Symbol.asyncIterator]: () => unknown;
            }
          )[Symbol.asyncIterator] === "function"
        ) {
          for await (const part of response as AsyncIterable<{
            text: string;
          }>) {
            storyText += part.text;
            setCerita(storyText);
            console.log("Streaming part:", part.text);
          }
        } else if ("text" in response) {
          storyText += (response as { text: string }).text;
          setCerita(storyText);
          console.log("Respons langsung:", storyText);
        }
        setJudul("Cerita Ajaibmu");
      } else {
        console.log("window.puter.ai.chat tidak tersedia");
        throw new Error("Puter.js tidak tersedia");
      }
    } catch (err) {
      console.log("Terjadi error:", err);
      setError(true);
      setShowSample(true);
    } finally {
      setLoading(false);
      console.log("Selesai generate cerita");
    }
  };

  const handleSample = (idx: number) => {
    setJudul(contohCerita[idx].judul);
    setGenre(contohCerita[idx].genre);
    setTema(contohCerita[idx].tema);
    setLatar(contohCerita[idx].latar);
    setCerita(contohCerita[idx].isi);
    setError(false);
    setShowSample(true);
  };

  const handleCopy = async () => {
    if (cerita && typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${judul}\n\n${cerita}`);
      } catch (err) {
        console.error("Gagal menyalin ke clipboard:", err);
        // Fallback untuk browser yang tidak mendukung clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = `${judul}\n\n${cerita}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    }
  };

  return {
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
  };
}
