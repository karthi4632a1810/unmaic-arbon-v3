import React, { useState } from "react";
import {
  Search,
  Copy,
  Check,
  Trash2,
  Plus,
} from "lucide-react";
import type { MediaItem } from "../../types/event";

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "med_1",
    name: "UNMAI Carbon Global Keynote Auditorium",
    url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1600",
    sizeBytes: 1024 * 850,
    category: "backgrounds",
    createdAt: "2026-09-20T10:00:00Z",
  },
  {
    id: "med_2",
    name: "COP31 Carbon Markets Plenary Stage",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600",
    sizeBytes: 1024 * 720,
    category: "backgrounds",
    createdAt: "2026-09-21T11:00:00Z",
  },
  {
    id: "med_3",
    name: "Dr. Axel Michaelowa Portrait",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    sizeBytes: 1024 * 340,
    category: "speakers",
    createdAt: "2026-09-22T08:00:00Z",
  },
  {
    id: "med_4",
    name: "Dr. Ajay Mathur Portrait",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
    sizeBytes: 1024 * 290,
    category: "speakers",
    createdAt: "2026-09-22T09:00:00Z",
  },
  {
    id: "med_5",
    name: "Chintan Shah Portrait",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600",
    sizeBytes: 1024 * 290,
    category: "speakers",
    createdAt: "2026-09-22T09:30:00Z",
  },
  {
    id: "med_6",
    name: "UNMAI Carbon Institutional Logo",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400",
    sizeBytes: 1024 * 120,
    category: "logos",
    createdAt: "2026-09-24T12:00:00Z",
  },
];

export const MediaLibraryPage: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>(() => {
    try {
      const stored = localStorage.getItem("event_builder_media_v1");
      return stored ? JSON.parse(stored) : INITIAL_MEDIA;
    } catch {
      return INITIAL_MEDIA;
    }
  });

  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageName, setNewImageName] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Assets" },
    { id: "backgrounds", label: "Backgrounds" },
    { id: "speakers", label: "Speakers" },
    { id: "gallery", label: "Gallery" },
    { id: "logos", label: "Logos & Sponsors" },
  ];

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const next = media.filter((m) => m.id !== id);
    setMedia(next);
    localStorage.setItem("event_builder_media_v1", JSON.stringify(next));
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const newItem: MediaItem = {
      id: "med_" + Date.now().toString(36),
      name: newImageName.trim() || "Uploaded Asset",
      url: newImageUrl.trim(),
      sizeBytes: 1024 * 450,
      category: (category === "all" ? "backgrounds" : category) as any,
      createdAt: new Date().toISOString(),
    };

    const next = [newItem, ...media];
    setMedia(next);
    localStorage.setItem("event_builder_media_v1", JSON.stringify(next));
    setNewImageUrl("");
    setNewImageName("");
    setIsAddOpen(false);
  };

  const filtered = media.filter((item) => {
    const matchesCat = category === "all" ? true : item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Media Asset Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload, browse, and organize optimized images for heroes, speakers, sponsors, and galleries.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media URL</span>
        </button>
      </div>

      {/* Add Media Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add Media Image Asset</h3>
            <p className="text-xs text-slate-500 mb-4">Paste an image URL to add to your global library.</p>
            <form onSubmit={handleAddMedia} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Asset Name</label>
                <input
                  type="text"
                  placeholder="e.g. UNMAI Carbon Singapore Plenary Hall"
                  value={newImageName}
                  onChange={(e) => setNewImageName(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold bg-black hover:bg-zinc-800 text-white rounded-xl shadow-sm cursor-pointer"
                >
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                category === c.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs uppercase">
                {item.category}
              </span>
            </div>

            <div className="p-3.5">
              <h4 className="font-bold text-xs text-slate-900 truncate" title={item.name}>
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {(item.sizeBytes / 1024).toFixed(0)} KB • Web Optimized
              </p>

              <div className="flex items-center justify-between gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3 h-3 text-black" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedId === item.id ? "Copied" : "Copy URL"}</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg transition cursor-pointer"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
