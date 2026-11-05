import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Award,
  User,
  Sparkles,
  Maximize2,
  X,
  Search,
  Palette,
  LayoutGrid,
  Type,
  MoveUp,
  MoveDown,
} from "lucide-react";
import type { SpeakersContent, SpeakerItem } from "../../../types/event";
import type { SectionPreset } from "../../../registry/sectionPresets";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { ImageUploadField } from "./ImageUploadField";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

interface SpeakersEditorProps {
  content: SpeakersContent;
  onChange: (updated: SpeakersContent) => void;
  presets?: SectionPreset[];
  onApplyPreset?: (preset: SectionPreset) => void;
}

export const SpeakersEditor: React.FC<SpeakersEditorProps> = ({
  content,
  onChange,
  presets = [],
  onApplyPreset,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "columns" | "dark" | "light">("all");

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleUpdate = (fields: Partial<SpeakersContent>) => {
    onChange({ ...content, ...fields });
  };

  const handleSpeakerChange = (idx: number, updates: Partial<SpeakerItem>) => {
    const list = [...(content.speakers || [])];
    list[idx] = { ...list[idx], ...updates };
    handleUpdate({ speakers: list });
  };

  const handleAddSpeaker = () => {
    const list = [
      ...(content.speakers || []),
      {
        id: "spk_" + Date.now().toString(36),
        name: "New Speaker Name",
        designation: "Consultant & Specialist",
        organization: "Hospital / University / Institution",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
        bio: "Specialist speaker with extensive policy, scientific, and industry experience.",
        featured: false,
        keynoteLabel: "Keynote",
      },
    ];
    handleUpdate({ speakers: list });
  };

  const handleRemoveSpeaker = (idx: number) => {
    const list = (content.speakers || []).filter((_, i) => i !== idx);
    handleUpdate({ speakers: list });
  };

  const handleMoveSpeaker = (idx: number, direction: "up" | "down") => {
    const list = [...(content.speakers || [])];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const [moved] = list.splice(idx, 1);
    list.splice(targetIdx, 0, moved);
    handleUpdate({ speakers: list });
  };

  // Determine current active columns
  const activeColumns: number =
    content.columns ||
    (content.layout === "1-column" || content.layout === "1-col"
      ? 1
      : content.layout === "2-column" || content.layout === "2-col"
      ? 2
      : content.layout === "4-column" || content.layout === "4-col"
      ? 4
      : 3);

  // Background color palette swatches
  const bgPalette = [
    { hex: "#000000", label: "Black" },
    { hex: "#09090b", label: "Zinc 950" },
    { hex: "#0f172a", label: "Slate 900" },
    { hex: "#022c22", label: "Forest" },
    { hex: "#030712", label: "Midnight" },
    { hex: "#ffffff", label: "Pure White" },
    { hex: "#f8fafc", label: "Slate 50" },
  ];

  // Filtered presets for modal
  const filteredPresets = presets.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase()));

    const pCardBg = p.content?.cardBackground || "dark";
    const pCols = p.content?.columns || 3;

    if (categoryFilter === "columns") return matchesSearch && (pCols === 1 || pCols === 2 || pCols === 4);
    if (categoryFilter === "dark") return matchesSearch && pCardBg !== "white";
    if (categoryFilter === "light") return matchesSearch && pCardBg === "white";
    return matchesSearch;
  });

  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-12 font-sans">
      {/* 1. QUICK TEMPLATES ACCORDION */}
      {presets.length > 0 && (
        <CollapsibleGroup
          title="Quick Templates"
          subtitle={`${presets.length} professionally designed presets`}
          icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
          badge={`${presets.length} PRESETS`}
          defaultOpen={false}
          headerAction={
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="p-1 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-md transition cursor-pointer"
              title="Expand template gallery"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-2">
            <p className="text-[11px] text-zinc-500 font-mono">
              Select a preset to apply layout columns, color schemes, and card aesthetics.
            </p>

            {/* Scrollable grid showing first 6 presets in 2 columns */}
            <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {presets.map((preset) => {
                const isLight = preset.content?.cardBackground === "white";
                const cols = preset.content?.columns || 3;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onApplyPreset && onApplyPreset(preset)}
                    className="group relative p-2.5 rounded-xl border text-left transition-all cursor-pointer shadow-2xs hover:shadow-sm border-zinc-200 bg-white hover:border-zinc-400"
                  >
                    {/* Visual miniature mockup */}
                    <div
                      className={`h-12 w-full rounded-lg mb-2 p-1.5 flex flex-col justify-between border ${
                        isLight
                          ? "bg-white border-zinc-200 text-zinc-800"
                          : "bg-zinc-950 border-zinc-800 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`h-1.5 rounded-full ${isLight ? "w-8 bg-zinc-400" : "w-8 bg-zinc-600"}`} />
                        <div className={`h-1.5 rounded-full ${isLight ? "w-3 bg-black" : "w-3 bg-emerald-500"}`} />
                      </div>
                      {/* Mini columns representation */}
                      <div className={`grid gap-1 ${cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
                        {Array.from({ length: cols }).map((_, cIdx) => (
                          <div
                            key={cIdx}
                            className={`h-3 rounded flex items-center justify-center font-mono text-[7px] font-bold ${
                              isLight ? "bg-zinc-100 text-zinc-700" : "bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            •
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[11px] text-zinc-900 truncate">
                        {preset.chipLabel || preset.name.split(" ")[0]}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 shrink-0">
                        {preset.badge || `${cols} Col`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-2 py-2 px-3 rounded-xl border border-zinc-200 hover:border-black bg-zinc-50 hover:bg-black hover:text-white text-zinc-800 font-mono text-[11px] font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs group"
            >
              <Maximize2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
              <span>View All {presets.length} Templates (Big Screen)</span>
            </button>
          </div>
        </CollapsibleGroup>
      )}

      {/* 2. SECTION TITLES & HEADINGS */}
      <CollapsibleGroup
        title="Titles & Headings"
        subtitle={content.heading || "Speakers Heading"}
        icon={<Type className="w-3.5 h-3.5 text-blue-500" />}
        badge="HEADINGS"
        defaultOpen={true}
      >
        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
            Top Eyebrow Badge (Optional)
          </span>
          <input
            type="text"
            value={content.badge || ""}
            onChange={(e) => handleUpdate({ badge: e.target.value })}
            placeholder="e.g. CONVENING FACULTY & ADVISORY COUNCIL"
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-semibold bg-white focus:outline-none focus:border-black font-mono"
          />
        </div>

        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
            Section Main Heading
          </span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => handleUpdate({ heading: e.target.value })}
            placeholder="e.g. Distinguished Climate Negotiators"
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
            Subtitle / Description
          </span>
          <AutoResizeTextarea
            minRows={2}
            value={content.subtitle || ""}
            onChange={(e) => handleUpdate({ subtitle: e.target.value })}
            placeholder="e.g. World-leading authorities guiding high-integrity Article 6 negotiations."
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>

      {/* 3. COLUMNS & LAYOUT (1 - 4 COLUMNS CUSTOMIZE) */}
      <CollapsibleGroup
        title="Grid Columns & Layout"
        subtitle={`${activeColumns} Column${activeColumns === 1 ? "" : "s"} Layout`}
        icon={<LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />}
        badge={`${activeColumns} COL`}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Desktop Grid Columns (1 - 4)
          </span>
          <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
            {[
              { id: 1, label: "1 Col", sub: "Solo / Feature" },
              { id: 2, label: "2 Col", sub: "Duo / Academic" },
              { id: 3, label: "3 Col", sub: "Triad / Standard" },
              { id: 4, label: "4 Col", sub: "Compact / Board" },
            ].map((col) => {
              const isSelected = activeColumns === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() =>
                    handleUpdate({
                      columns: col.id as any,
                      layout: `${col.id}-column` as any,
                    })
                  }
                  className={`py-2 px-1 rounded-xl border text-center font-bold transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? "bg-black text-white border-black shadow-xs ring-1 ring-black"
                      : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <span className="text-[12px] font-extrabold">{col.label}</span>
                  <span className={`text-[8px] font-normal leading-tight ${isSelected ? "text-zinc-300" : "text-zinc-400"}`}>
                    {col.sub}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-zinc-400 mt-1.5 font-mono">
            Automatically scales responsibly: 1 column on mobile, 2 on tablets, and {activeColumns} on desktops.
          </p>
        </div>

        {/* Card Style Variant */}
        <div className="pt-2.5 border-t border-zinc-100">
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Card Photo Style
          </span>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            {[
              { id: "card", label: "Square Cover Cover" },
              { id: "rounded-avatar", label: "Circular Avatar" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => handleUpdate({ cardStyle: st.id as any })}
                className={`py-1.5 rounded-lg border text-center font-bold transition cursor-pointer ${
                  (content.cardStyle || "card") === st.id
                    ? "bg-black text-white border-black shadow-2xs"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleGroup>

      {/* 4. COLORS & THEMING (Background, Card, Text) */}
      <CollapsibleGroup
        title="Colors & Theme Styling"
        subtitle={`Section: ${content.backgroundColor || "#000000"} • Cards: ${content.cardBackground || "dark"}`}
        icon={<Palette className="w-3.5 h-3.5 text-emerald-500" />}
        badge="COLORS"
        defaultOpen={false}
      >
        {/* Section Background Color */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
              Section Background Color
            </span>
            {content.backgroundColor && (
              <button
                type="button"
                onClick={() => handleUpdate({ backgroundColor: undefined })}
                className="text-[10px] font-mono text-zinc-400 hover:text-black underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {bgPalette.map((bg) => (
              <button
                key={bg.hex}
                type="button"
                onClick={() => handleUpdate({ backgroundColor: bg.hex })}
                style={{ backgroundColor: bg.hex }}
                className={`w-6 h-6 rounded-full border transition cursor-pointer ${
                  (content.backgroundColor || "#000000").toLowerCase() === bg.hex.toLowerCase()
                    ? "ring-2 ring-black scale-110 border-white shadow"
                    : "border-zinc-300 hover:scale-105"
                }`}
                title={bg.label}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white shadow-2xs">
            <input
              type="color"
              value={content.backgroundColor || "#000000"}
              onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
              className="w-6 h-6 rounded border-0 cursor-pointer p-0 shrink-0"
            />
            <input
              type="text"
              value={content.backgroundColor || "#000000"}
              onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
              placeholder="#000000"
              className="font-mono text-xs font-bold uppercase text-zinc-800 w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Card Theme Preset */}
        <div className="pt-2.5 border-t border-zinc-100 space-y-2">
          <span className="block text-[10px] text-zinc-500 font-mono font-semibold uppercase">
            Card Container Theme
          </span>
          <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
            {[
              { id: "dark", label: "Dark" },
              { id: "glass", label: "Glass" },
              { id: "white", label: "White" },
              { id: "custom", label: "Custom" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleUpdate({ cardBackground: t.id as any })}
                className={`py-1.5 rounded-lg border text-center font-bold transition cursor-pointer ${
                  (content.cardBackground || "dark") === t.id
                    ? "bg-black text-white border-black shadow-2xs"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {content.cardBackground === "custom" && (
            <div className="pt-1.5 space-y-2">
              <span className="block text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                Custom Card Hex Color
              </span>
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white shadow-2xs">
                <input
                  type="color"
                  value={content.customCardBgColor || "#18181b"}
                  onChange={(e) => handleUpdate({ customCardBgColor: e.target.value })}
                  className="w-6 h-6 rounded border-0 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={content.customCardBgColor || "#18181b"}
                  onChange={(e) => handleUpdate({ customCardBgColor: e.target.value })}
                  placeholder="#18181b"
                  className="font-mono text-xs font-bold uppercase text-zinc-800 w-full bg-transparent outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Card Border & Accent Color */}
        <div className="pt-2.5 border-t border-zinc-100 space-y-2">
          <span className="block text-[10px] text-zinc-500 font-mono font-semibold uppercase">
            Keynote Badge & Accent Color
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {["#ffffff", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899"].map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => handleUpdate({ accentColor: hex })}
                style={{ backgroundColor: hex }}
                className={`w-5 h-5 rounded-full border transition cursor-pointer ${
                  (content.accentColor || "#ffffff").toLowerCase() === hex.toLowerCase()
                    ? "ring-2 ring-black scale-110 border-white shadow"
                    : "border-zinc-300 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>
      </CollapsibleGroup>

      {/* 5. FACULTY & SPEAKERS PROFILES LIST */}
      <CollapsibleGroup
        title="Faculty & Speakers Profiles"
        subtitle={`${content.speakers?.length || 0} speaker profile${content.speakers?.length === 1 ? "" : "s"}`}
        icon={<User className="w-3.5 h-3.5 text-indigo-500" />}
        badge={`${content.speakers?.length || 0} PROFILES`}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={handleAddSpeaker}
            className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        }
      >
        <div className="space-y-3.5">
          {(!content.speakers || content.speakers.length === 0) && (
            <div className="text-center py-6 text-zinc-400 text-xs font-mono bg-zinc-50 border border-dashed border-zinc-200 rounded-xl">
              No faculty profiles yet. Click &quot;Add&quot; to insert a speaker.
            </div>
          )}

          {content.speakers?.map((spk, idx) => (
            <div
              key={spk.id || idx}
              className="p-3.5 bg-white rounded-xl border border-zinc-200 space-y-3 shadow-2xs"
            >
              {/* Card top toolbar: Speaker #, reorder arrows, delete */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="font-bold text-xs text-zinc-900 flex items-center gap-1.5 font-mono">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Speaker #{idx + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveSpeaker(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 text-zinc-400 hover:text-black disabled:opacity-30 disabled:hover:text-zinc-400 cursor-pointer"
                    title="Move up"
                  >
                    <MoveUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveSpeaker(idx, "down")}
                    disabled={idx === (content.speakers?.length || 0) - 1}
                    className="p-1 text-zinc-400 hover:text-black disabled:opacity-30 disabled:hover:text-zinc-400 cursor-pointer"
                    title="Move down"
                  >
                    <MoveDown className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpeaker(idx)}
                    className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer transition ml-1"
                    title="Remove speaker profile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                  Full Name & Title
                </span>
                <input
                  type="text"
                  placeholder="e.g. Dr. Axel Michaelowa"
                  value={spk.name}
                  onChange={(e) => handleSpeakerChange(idx, { name: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 font-bold focus:outline-none focus:border-black"
                />
              </div>

              {/* Designation & Organization */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                    Designation
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Senior Partner"
                    value={spk.designation || spk.role || ""}
                    onChange={(e) =>
                      handleSpeakerChange(idx, { designation: e.target.value, role: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black font-semibold"
                  />
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                    Organization
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Perspectives Climate"
                    value={spk.organization || ""}
                    onChange={(e) =>
                      handleSpeakerChange(idx, { organization: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Speaker Photo with ImageUploadField (Upload to PHP Backend / public folder) */}
              <div>
                <ImageUploadField
                  label="Speaker Photo"
                  value={spk.photo || spk.avatarUrl || ""}
                  onChange={(url) => handleSpeakerChange(idx, { photo: url, avatarUrl: url })}
                  folder="speakers"
                  placeholder="https://images.unsplash.com/photo-..."
                  aspectRatio="square"
                  helperText="Uploads to public/uploads/speakers via PHP"
                />
              </div>

              {/* Biography */}
              <div>
                <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                  Biography & Credentials
                </span>
                <AutoResizeTextarea
                  minRows={2}
                  placeholder="Brief biography and international credentials..."
                  value={spk.bio || ""}
                  onChange={(e) => handleSpeakerChange(idx, { bio: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black leading-relaxed"
                />
              </div>

              {/* Keynote / Featured Toggle & Editable Keynote Badge */}
              <div className="pt-2 border-t border-zinc-100 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 cursor-pointer font-mono text-[11px] font-bold text-zinc-800">
                    <input
                      type="checkbox"
                      checked={!!spk.featured}
                      onChange={(e) =>
                        handleSpeakerChange(idx, {
                          featured: e.target.checked,
                          keynoteLabel: spk.keynoteLabel || "Keynote",
                        })
                      }
                      className="rounded text-black accent-black cursor-pointer w-4 h-4"
                    />
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Keynote / Featured Speaker
                    </span>
                  </label>

                  {spk.featured && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold uppercase">
                      Badge Active
                    </span>
                  )}
                </div>

                {/* Editable Keynote Label Input (shown when featured is enabled) */}
                {spk.featured && (
                  <div className="pl-5.5 space-y-1">
                    <span className="block text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                      Keynote Badge Label (Editable)
                    </span>
                    <input
                      type="text"
                      value={spk.keynoteLabel || "Keynote"}
                      onChange={(e) =>
                        handleSpeakerChange(idx, { keynoteLabel: e.target.value })
                      }
                      placeholder="e.g. Keynote, Lead Keynote, Guest of Honor, Panel Chair"
                      className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-white font-mono font-bold text-zinc-900 focus:outline-none focus:border-black shadow-2xs"
                    />
                    <p className="text-[9px] text-zinc-400 font-mono">
                      This label appears on the top-left badge of the speaker card.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleGroup>

      {/* 6. BIG SCREEN TEMPLATE GALLERY MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-zinc-200 shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 leading-tight">
                    Speakers Layout & Template Gallery
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Choose from 1 to 4 responsive columns, light/dark themes, and card layouts.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter toolbar */}
            <div className="p-4 border-b border-zinc-200 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 font-mono text-xs">
                {[
                  { id: "all", label: "All Templates" },
                  { id: "columns", label: "1-4 Columns" },
                  { id: "dark", label: "Dark Themes" },
                  { id: "light", label: "Light Themes" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setCategoryFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition cursor-pointer shrink-0 ${
                      categoryFilter === f.id
                        ? "bg-black text-white border-black shadow-xs"
                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200 w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full text-xs font-mono bg-transparent outline-none text-zinc-800"
                />
              </div>
            </div>

            {/* 4-Column Big Screen Presets Grid */}
            <div className="p-5 flex-1 overflow-y-auto">
              {filteredPresets.length === 0 ? (
                <div className="text-center py-16 text-zinc-400 font-mono text-xs">
                  No templates match your search filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredPresets.map((preset) => {
                    const isLight = preset.content?.cardBackground === "white";
                    const cols = preset.content?.columns || 3;

                    return (
                      <div
                        key={preset.id}
                        className="group relative p-3.5 rounded-2xl border border-zinc-200 bg-white hover:border-black transition flex flex-col justify-between shadow-2xs hover:shadow-md"
                      >
                        <div>
                          {/* Mini visual mockup card */}
                          <div
                            className={`h-24 w-full rounded-xl mb-3 p-2 flex flex-col justify-between border ${
                              isLight
                                ? "bg-white border-zinc-200 text-zinc-800"
                                : "bg-zinc-950 border-zinc-800 text-zinc-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className={`h-2 rounded-full ${isLight ? "w-16 bg-zinc-300" : "w-16 bg-zinc-700"}`} />
                              <div className={`h-2 rounded-full ${isLight ? "w-6 bg-black" : "w-6 bg-emerald-500"}`} />
                            </div>

                            <div className={`grid gap-1.5 ${cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
                              {Array.from({ length: cols }).map((_, cIdx) => (
                                <div
                                  key={cIdx}
                                  className={`h-8 rounded-lg flex flex-col items-center justify-center p-1 font-mono text-[8px] font-bold ${
                                    isLight ? "bg-zinc-100 text-zinc-800 border border-zinc-200" : "bg-zinc-800 text-zinc-200 border border-zinc-700"
                                  }`}
                                >
                                  <div className="w-3 h-3 rounded-full bg-zinc-400/40 mb-0.5" />
                                  <div className="w-4 h-1 rounded bg-zinc-400/40" />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-1 mb-1">
                            <h4 className="font-extrabold text-xs text-zinc-900 leading-snug">
                              {preset.name}
                            </h4>
                          </div>

                          <p className="text-[11px] text-zinc-500 leading-relaxed mb-3 line-clamp-2">
                            {preset.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2 mt-auto">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-bold border border-zinc-200">
                            {preset.badge || `${cols} Columns`}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              if (onApplyPreset) onApplyPreset(preset);
                              setIsModalOpen(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-black hover:bg-zinc-800 text-white font-mono text-[10px] font-bold transition cursor-pointer shadow-2xs"
                          >
                            Apply Preset
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
