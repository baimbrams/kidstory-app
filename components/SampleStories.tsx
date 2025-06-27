import { track } from "@vercel/analytics";

interface Cerita {
  judul: string;
  genre: string;
  tema: string;
  latar: string;
  isi: string;
}
interface Props {
  show: boolean;
  contohCerita: Cerita[];
  onSample: (idx: number) => void;
}
export default function SampleStories({ show, contohCerita, onSample }: Props) {
  if (!show) return null;
  return (
    <section className="bg-indigo-50 rounded-xl p-6 mt-4 text-center">
      <p className="mb-3 font-semibold">Coba salah satu cerita contoh:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {contohCerita.map((c, i) => (
          <button
            key={i}
            className="bg-white border border-indigo-200 text-indigo-700 rounded-full px-4 py-2 text-sm font-semibold hover:bg-indigo-100 transition"
            onClick={() => {
              // Track sample story click
              track("sample_story_clicked", {
                judul: c.judul,
                genre: c.genre,
                index: i,
              });
              onSample(i);
            }}
          >
            {c.judul}
          </button>
        ))}
      </div>
    </section>
  );
}
