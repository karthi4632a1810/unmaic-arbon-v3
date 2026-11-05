import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import * as Icons from "lucide-react";
import {
  Sparkles,
  Maximize2,
  X,
  Search,
  Check,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  Plus,
  Columns,
  Type,
} from "lucide-react";
import type {
  HighlightsContent,
  HighlightCard,
  EventSection,
} from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";
import {
  SECTION_PRESETS,
  type SectionPreset,
} from "../../../registry/sectionPresets";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

// Curated list of popular Lucide icons categorized for rich selection
const ICON_CATEGORIES: Record<string, string[]> = {
  popular: [
    "AlertCircle",
    "Globe",
    "TrendingUp",
    "Layers",
    "Shield",
    "Sparkles",
    "Star",
    "Award",
    "Zap",
    "Lightbulb",
    "CheckCircle2",
    "Clock",
    "Target",
    "Lock",
    "Cpu",
    "DollarSign",
  ],
  business: [
    "TrendingUp",
    "BarChart3",
    "LineChart",
    "PieChart",
    "DollarSign",
    "Wallet",
    "Briefcase",
    "Building2",
    "Landmark",
    "Scale",
    "FileText",
    "FileCheck",
    "ClipboardCheck",
    "Receipt",
    "Coins",
    "Handshake",
  ],
  tech: [
    "Layers",
    "Cpu",
    "Database",
    "Server",
    "Terminal",
    "Code2",
    "Network",
    "GitBranch",
    "Binary",
    "Key",
    "Lock",
    "ShieldAlert",
    "ShieldCheck",
    "Laptop",
    "Radio",
    "HardDrive",
  ],
  nature: [
    "Globe",
    "Globe2",
    "Leaf",
    "Sun",
    "Wind",
    "Droplets",
    "TreePine",
    "Recycle",
    "Footprints",
    "Sprout",
    "Mountain",
    "Waves",
    "Compass",
    "Flame",
  ],
  people: [
    "Users",
    "UserCheck",
    "Presentation",
    "Megaphone",
    "Calendar",
    "Clock",
    "Timer",
    "Video",
    "MessageSquare",
    "Mail",
    "Share2",
    "Rocket",
    "Award",
    "Heart",
  ],
  actions: [
    "ArrowRight",
    "ArrowUpRight",
    "ExternalLink",
    "Download",
    "Upload",
    "Search",
    "Check",
    "CheckCircle",
    "AlertTriangle",
    "Info",
    "RefreshCw",
    "Eye",
    "Activity",
    "Sliders",
  ],
};

const ALL_CURATED_ICONS: string[] = Array.from(
  new Set(Object.values(ICON_CATEGORIES).flat())
).sort();

interface HighlightsEditorProps {
  content: HighlightsContent;
  onChange: (updated: HighlightsContent) => void;
  presets?: SectionPreset[];
  onApplyPreset?: (preset: SectionPreset) => void;
  sections?: EventSection[];
}

export const HighlightsEditor: React.FC<HighlightsEditorProps> = ({
  content,
  onChange,
  presets = SECTION_PRESETS.highlights || [],
  onApplyPreset,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Icon Picker Modal state
  const [activeIconCardIndex, setActiveIconCardIndex] = useState<number | null>(null);
  const [iconSearchQuery, setIconSearchQuery] = useState("");
  const [iconCategoryFilter, setIconCategoryFilter] = useState("all");
  const [customIconInput, setCustomIconInput] = useState("");

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeIconCardIndex !== null) setActiveIconCardIndex(null);
        else if (isModalOpen) setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, activeIconCardIndex]);

  const cards = content.cards || [];
  const columns = Number(content.columns) || 3;
  const layoutStyle = content.layoutStyle || "cards";
  const iconStyle = content.iconStyle || "rounded";

  const handleUpdate = (fields: Partial<HighlightsContent>) => {
    onChange({ ...content, ...fields });
  };

  // --- Cards handling ---
  const handleCardChange = (idx: number, updates: Partial<HighlightCard>) => {
    const next = [...cards];
    next[idx] = { ...next[idx], ...updates };
    handleUpdate({ cards: next });
  };

  const handleAddCard = () => {
    const newCard: HighlightCard = {
      id: "hl_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 5),
      icon: "Sparkles",
      title: "New Highlight Feature",
      description: "Specific takeaway, architectural capability, or strategic mandate.",
      badge: `Item 0${cards.length + 1}`,
    };
    handleUpdate({ cards: [...cards, newCard] });
  };

  const handleDuplicateCard = (idx: number) => {
    const original = cards[idx];
    const duplicated: HighlightCard = {
      ...original,
      id: "hl_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 5),
      title: `${original.title} (Copy)`,
    };
    const next = [...cards];
    next.splice(idx + 1, 0, duplicated);
    handleUpdate({ cards: next });
  };

  const handleRemoveCard = (idx: number) => {
    handleUpdate({ cards: cards.filter((_, i) => i !== idx) });
  };

  const handleMoveCard = (from: number, to: number) => {
    if (to < 0 || to >= cards.length) return;
    const next = [...cards];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    handleUpdate({ cards: next });
  };

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      handleMoveCard(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // --- Preset Application ---
  const handleApplyFullPreset = (preset: SectionPreset) => {
    if (onApplyPreset) {
      onApplyPreset(preset);
    } else {
      onChange(preset.content);
    }
    setIsModalOpen(false);
  };

  const handleApplyStyleOnly = (preset: SectionPreset) => {
    const p = preset.content;
    handleUpdate({
      columns: p.columns || content.columns,
      layoutStyle: p.layoutStyle || content.layoutStyle,
      cardBackground: p.cardBackground || content.cardBackground,
      iconStyle: p.iconStyle || content.iconStyle,
      backgroundColor: p.backgroundColor || content.backgroundColor,
      contentAlignment: p.contentAlignment || content.contentAlignment,
      showCardNumbers: p.showCardNumbers ?? content.showCardNumbers,
    });
    setIsModalOpen(false);
  };

  // Background color palette swatches
  const bgPalette = [
    { hex: "transparent", label: "Default" },
    { hex: "#000000", label: "Pure Black" },
    { hex: "#09090b", label: "Zinc 950" },
    { hex: "#0f172a", label: "Slate 900" },
    { hex: "#0a192f", label: "Deep Navy" },
    { hex: "#064e3b", label: "Forest Dark" },
    { hex: "#18181b", label: "Charcoal" },
    { hex: "#ffffff", label: "Light White" },
  ];

  // Filtered presets for modal
  const filteredPresets = presets.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.chipLabel && p.chipLabel.toLowerCase().includes(searchQuery.toLowerCase()));

    const pCols = p.content?.columns;

    if (categoryFilter === "2-col") return matchesSearch && pCols === 2;
    if (categoryFilter === "3-col") return matchesSearch && pCols === 3;
    if (categoryFilter === "4-col") return matchesSearch && pCols === 4;
    if (categoryFilter === "1-col") return matchesSearch && pCols === 1;
    if (categoryFilter === "glass") return matchesSearch && p.content?.layoutStyle === "glass";
    if (categoryFilter === "light") return matchesSearch && p.content?.cardBackground === "white";
    return matchesSearch;
  });

  // Filtered icons for Icon Picker
  const filteredIcons = ALL_CURATED_ICONS.filter((iconName) => {
    const matchesSearch =
      !iconSearchQuery ||
      iconName.toLowerCase().includes(iconSearchQuery.toLowerCase());

    if (iconCategoryFilter === "all") return matchesSearch;
    const catList = ICON_CATEGORIES[iconCategoryFilter] || [];
    return matchesSearch && catList.includes(iconName);
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
              className="p-1 rounded-md text-zinc-500 hover:text-black hover:bg-zinc-100 transition cursor-pointer"
              title="Expand templates modal (Full Screen)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          }
        >
          {/* Scrollable grid showing presets with 2 columns */}
          <div className="max-h-[280px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => {
                const isCurrent =
                  content.heading === preset.content?.heading &&
                  content.columns === preset.content?.columns;
                const pCols = preset.content?.columns || 3;
                const isLight = preset.content?.cardBackground === "white";

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyFullPreset(preset)}
                    className={`group relative p-2.5 rounded-xl border text-left transition-all cursor-pointer shadow-2xs hover:shadow-sm ${
                      isCurrent
                        ? "border-black ring-2 ring-black bg-zinc-50"
                        : "border-zinc-200 bg-white hover:border-zinc-400"
                    }`}
                  >
                    {/* Visual miniature mockup */}
                    <div
                      className={`h-14 w-full rounded-lg mb-2 p-1.5 flex flex-col justify-between border ${
                        isLight
                          ? "bg-zinc-100 border-zinc-200 text-zinc-800"
                          : "bg-zinc-950 border-zinc-800 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`h-1.5 rounded-full ${
                            isLight ? "w-10 bg-zinc-400" : "w-10 bg-zinc-600"
                          }`}
                        />
                        <span className="text-[8px] font-mono opacity-60">
                          {pCols} Col
                        </span>
                      </div>

                      {/* Mini cards grid preview */}
                      <div
                        className={`grid gap-1 ${
                          pCols === 4
                            ? "grid-cols-4"
                            : pCols === 2
                            ? "grid-cols-2"
                            : pCols === 1
                            ? "grid-cols-1"
                            : "grid-cols-3"
                        }`}
                      >
                        {Array.from({ length: Math.min(pCols === 1 ? 2 : pCols, 4) }).map(
                          (_, i) => (
                            <div
                              key={i}
                              className={`h-5 rounded flex flex-col justify-center items-center px-0.5 border ${
                                isLight
                                  ? "bg-white border-zinc-200"
                                  : "bg-zinc-800/80 border-zinc-700/60"
                              }`}
                            >
                              <div
                                className={`w-2 h-1 rounded-full mb-0.5 ${
                                  isLight ? "bg-zinc-400" : "bg-zinc-500"
                                }`}
                              />
                              <div
                                className={`w-full h-0.5 rounded-full ${
                                  isLight ? "bg-zinc-300" : "bg-zinc-600"
                                }`}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[11px] text-zinc-900 truncate">
                        {preset.chipLabel || preset.name.split(" ")[0]}
                      </span>
                      {isCurrent && (
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 shrink-0">
                        {preset.badge || `${pCols} Col`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Browse All {presets.length} Templates (Modal)</span>
          </button>
        </CollapsibleGroup>
      )}

      {/* 2. COLUMNS CONTROL (1-4) & RESPONSIVE BEHAVIOR */}
      <CollapsibleGroup
        title="Columns & Layout Control"
        subtitle={`Desktop: ${columns} Col${columns > 1 ? "s" : ""} • Responsive mobile`}
        icon={<Columns className="w-3.5 h-3.5 text-blue-500" />}
        badge={`${columns} COLS`}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1.5">
            Desktop Column Layout (1 to 4)
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((col) => {
              const isActive = columns === col;
              return (
                <button
                  key={col}
                  type="button"
                  onClick={() => handleUpdate({ columns: col })}
                  className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                    isActive
                      ? "border-black bg-black text-white shadow-sm ring-1 ring-black"
                      : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-800"
                  }`}
                >
                  {/* Miniature column visual indicator */}
                  <div className="flex items-center gap-0.5 h-3.5">
                    {Array.from({ length: col }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-3.5 rounded-xs ${
                          isActive ? "bg-white" : "bg-zinc-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono font-bold text-[10px]">
                    {col} {col === 1 ? "Col" : "Cols"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Device Behavior Indicator */}
        <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1.5">
          <span className="block text-[10px] font-mono uppercase font-bold text-zinc-500 tracking-wider">
            Responsive Device Mapping
          </span>
          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
            <div className="p-1.5 bg-white rounded-lg border border-zinc-200 flex flex-col items-center text-center">
              <span className="text-zinc-400">Desktop</span>
              <span className="font-bold text-zinc-900">{columns} Columns</span>
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-zinc-200 flex flex-col items-center text-center">
              <span className="text-zinc-400">Tablet</span>
              <span className="font-bold text-zinc-900">
                {columns === 1 ? "1 Column" : "2 Columns"}
              </span>
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-zinc-200 flex flex-col items-center text-center">
              <span className="text-zinc-400">Mobile</span>
              <span className="font-bold text-zinc-900">1 Column</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 leading-normal">
            Cards automatically scale and collapse seamlessly as the screen width adapts between Desktop, Tablet, and Mobile.
          </p>
        </div>

        {/* Layout Aesthetic Style */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Card Aesthetic Style
          </span>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
            {[
              { id: "cards", label: "Standard" },
              { id: "glass", label: "Frosted Glass" },
              { id: "bordered", label: "Border Glow" },
              { id: "minimal", label: "Minimal" },
              { id: "numbered", label: "Numbered Steps" },
              { id: "bento", label: "Tech Bento" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => handleUpdate({ layoutStyle: st.id as any })}
                className={`py-1.5 px-1 rounded-lg border text-center font-bold transition cursor-pointer ${
                  layoutStyle === st.id
                    ? "border-black bg-zinc-900 text-white shadow-2xs"
                    : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Shape & Style */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Icon Badge Style
          </span>
          <div className="grid grid-cols-5 gap-1 font-mono text-[10px]">
            {[
              { id: "rounded", label: "Rounded" },
              { id: "circle", label: "Circle" },
              { id: "badge", label: "Compact" },
              { id: "glow", label: "Glow" },
              { id: "minimal", label: "Clean" },
            ].map((is) => (
              <button
                key={is.id}
                type="button"
                onClick={() => handleUpdate({ iconStyle: is.id as any })}
                className={`py-1.5 px-0.5 rounded-lg border text-center font-bold truncate transition cursor-pointer ${
                  iconStyle === is.id
                    ? "border-black bg-zinc-900 text-white shadow-2xs"
                    : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700"
                }`}
              >
                {is.label}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleGroup>

      {/* 3. SECTION HEADER CONTENT */}
      <CollapsibleGroup
        title="Section Heading & Typography"
        subtitle={content.heading || "Section Heading"}
        icon={<Type className="w-3.5 h-3.5 text-indigo-500" />}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Eyebrow Badge Tag (Optional)
          </span>
          <input
            type="text"
            placeholder="e.g. SESSION HIGHLIGHTS or KEY TAKEAWAYS"
            value={content.badge || ""}
            onChange={(e) => handleUpdate({ badge: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold bg-white focus:outline-none focus:border-black uppercase"
          />
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Section Main Heading
          </span>
          <input
            type="text"
            placeholder="e.g. What You Will Learn"
            value={content.heading}
            onChange={(e) => handleUpdate({ heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Subtitle / Tagline (Optional)
          </span>
          <AutoResizeTextarea
            minRows={2}
            placeholder="e.g. Critical insights and operational solutions..."
            value={content.subtitle || ""}
            onChange={(e) => handleUpdate({ subtitle: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        {/* Alignment */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Content Alignment
          </span>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => handleUpdate({ contentAlignment: "center" })}
              className={`py-1.5 rounded-lg border font-bold transition cursor-pointer ${
                content.contentAlignment !== "left"
                  ? "border-black bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              Center Aligned
            </button>
            <button
              type="button"
              onClick={() => handleUpdate({ contentAlignment: "left" })}
              className={`py-1.5 rounded-lg border font-bold transition cursor-pointer ${
                content.contentAlignment === "left"
                  ? "border-black bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              Left Aligned
            </button>
          </div>
        </div>

        {/* Theme & Background Color Swatches */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Section Background Theme
          </span>
          <div className="flex flex-wrap gap-1.5">
            {bgPalette.map((swatch) => {
              const isSelected =
                (swatch.hex === "transparent" && !content.backgroundColor) ||
                content.backgroundColor === swatch.hex;
              return (
                <button
                  key={swatch.hex}
                  type="button"
                  onClick={() =>
                    handleUpdate({
                      backgroundColor:
                        swatch.hex === "transparent" ? undefined : swatch.hex,
                      cardBackground:
                        swatch.hex === "#ffffff" ? "white" : "dark",
                    })
                  }
                  className={`w-6 h-6 rounded-full border transition-all cursor-pointer relative ${
                    isSelected
                      ? "ring-2 ring-black ring-offset-2 scale-110"
                      : "border-zinc-300 hover:scale-105"
                  }`}
                  style={{
                    backgroundColor:
                      swatch.hex === "transparent" ? "#000000" : swatch.hex,
                  }}
                  title={swatch.label}
                >
                  {isSelected && (
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-[10px] ${
                        swatch.hex === "#ffffff" ? "text-black" : "text-white"
                      }`}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </CollapsibleGroup>

      {/* 4. HIGHLIGHT CARDS (DRAG & DROP REORDERING + FULL EDITING) */}
      <CollapsibleGroup
        title="Highlight Cards"
        subtitle={`${cards.length} card highlight${cards.length === 1 ? "" : "s"}`}
        icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
        badge={`${cards.length} CARDS`}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={handleAddCard}
            className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        }
      >
        <div className="text-[11px] text-zinc-500 mb-2 flex items-center gap-1.5 bg-zinc-50 p-2 rounded-lg border border-zinc-200">
          <GripVertical className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span>
            Drag cards by the handle to reorder, or use the <strong>↑ ↓</strong> arrows.
          </span>
        </div>

        <div className="space-y-2.5">
          {cards.map((card, i) => {
            const LucideIcon = (Icons as any)[card.icon] || Icons.Sparkles;
            const isDragging = draggedIndex === i;
            const isDropTarget = dragOverIndex === i;

            return (
              <div
                key={card.id || `card_${i}`}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={(e) => handleDrop(e, i)}
                onDragEnd={handleDragEnd}
                className={`p-3 bg-white rounded-xl border transition-all duration-150 space-y-2.5 ${
                  isDragging
                    ? "opacity-30 scale-[0.98] border-indigo-400 ring-2 ring-indigo-400 bg-indigo-50/20"
                    : isDropTarget
                    ? "border-black ring-2 ring-black/10 bg-zinc-50"
                    : "border-zinc-200 shadow-2xs hover:border-zinc-300"
                }`}
              >
                {/* Top Card Bar */}
                <div className="flex items-center justify-between gap-1 border-b border-zinc-100 pb-2">
                  <div className="flex items-center gap-2">
                    {/* Drag Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-zinc-400 hover:text-black transition"
                      title="Drag to reorder card"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <span className="font-bold text-[11px] text-zinc-800 font-mono">
                      Card #{i + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Reorder Buttons */}
                    <button
                      type="button"
                      disabled={i === 0}
                      onClick={() => handleMoveCard(i, i - 1)}
                      className="p-1 rounded text-zinc-400 hover:text-black disabled:opacity-20 disabled:hover:text-zinc-400 transition cursor-pointer"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={i === cards.length - 1}
                      onClick={() => handleMoveCard(i, i + 1)}
                      className="p-1 rounded text-zinc-400 hover:text-black disabled:opacity-20 disabled:hover:text-zinc-400 transition cursor-pointer"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Duplicate */}
                    <button
                      type="button"
                      onClick={() => handleDuplicateCard(i)}
                      className="p-1 rounded text-zinc-400 hover:text-black transition cursor-pointer"
                      title="Duplicate Card"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => handleRemoveCard(i)}
                      className="p-1 rounded text-zinc-400 hover:text-rose-600 transition cursor-pointer"
                      title="Remove Card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Icon Selector Row */}
                <div>
                  <span className="block text-[10px] font-semibold text-zinc-500 mb-1">
                    Card Icon
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveIconCardIndex(i);
                        setIconSearchQuery("");
                        setIconCategoryFilter("all");
                        setCustomIconInput(card.icon || "");
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-black rounded-lg flex items-center justify-between gap-2 transition cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center shrink-0">
                          <LucideIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-zinc-900 truncate">
                          {card.icon || "Sparkles"}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 underline shrink-0">
                        Change Icon
                      </span>
                    </button>
                  </div>
                </div>

                {/* Card Title */}
                <div>
                  <span className="block text-[10px] font-semibold text-zinc-500 mb-1">
                    Card Title
                  </span>
                  <input
                    type="text"
                    placeholder="Card Title"
                    value={card.title}
                    onChange={(e) => handleCardChange(i, { title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 font-bold focus:outline-none focus:border-black"
                  />
                </div>

                {/* Card Description */}
                <div>
                  <span className="block text-[10px] font-semibold text-zinc-500 mb-1">
                    Card Description
                  </span>
                  <AutoResizeTextarea
                    minRows={2}
                    placeholder="Description text..."
                    value={card.description}
                    onChange={(e) => handleCardChange(i, { description: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black leading-relaxed"
                  />
                </div>

                {/* Optional Badge & Link in a 2-col row */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
                  <div>
                    <span className="block text-[10px] font-semibold text-zinc-500 mb-1">
                      Badge Tag (Optional)
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Mandate"
                      value={card.badge || ""}
                      onChange={(e) => handleCardChange(i, { badge: e.target.value })}
                      className="w-full px-2 py-1 text-[11px] border border-zinc-200 rounded-lg bg-zinc-50 font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-zinc-500 mb-1">
                      Action Link (Optional)
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. #registration"
                      value={card.linkUrl || ""}
                      onChange={(e) => handleCardChange(i, { linkUrl: e.target.value })}
                      className="w-full px-2 py-1 text-[11px] border border-zinc-200 rounded-lg bg-zinc-50 font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Add Card Button */}
        <button
          type="button"
          onClick={handleAddCard}
          className="w-full py-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs mt-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Another Highlight Card</span>
        </button>
      </CollapsibleGroup>

      {/* ========================================================================= */}
      {/* 5. FULL PRESETS MODAL (PORTAL)                                             */}
      {/* ========================================================================= */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 leading-tight">
                      Highlight Section Preset Templates
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Choose from {presets.length} curated multi-column layouts, styles, and templates.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search templates by name, column, or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:border-black"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {[
                    { id: "all", label: "All" },
                    { id: "2-col", label: "2 Columns" },
                    { id: "3-col", label: "3 Columns" },
                    { id: "4-col", label: "4 Columns" },
                    { id: "1-col", label: "1 Column" },
                    { id: "glass", label: "Glass" },
                    { id: "light", label: "Light" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCategoryFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer ${
                        categoryFilter === tab.id
                          ? "bg-black text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets Grid */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPresets.map((preset) => {
                  const pContent = preset.content;
                  const pCols = pContent?.columns || 3;
                  const isLight = pContent?.cardBackground === "white";
                  const isCurrent =
                    content.heading === pContent?.heading &&
                    content.columns === pContent?.columns;

                  return (
                    <div
                      key={preset.id}
                      className={`border rounded-2xl p-4 flex flex-col justify-between transition-all group ${
                        isCurrent
                          ? "border-black ring-2 ring-black bg-zinc-50"
                          : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md"
                      }`}
                    >
                      <div>
                        {/* Mockup Preview Box */}
                        <div
                          className={`h-24 w-full rounded-xl mb-3 p-2.5 flex flex-col justify-between border ${
                            isLight
                              ? "bg-zinc-100 border-zinc-200 text-zinc-800"
                              : "bg-zinc-950 border-zinc-800 text-zinc-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono uppercase tracking-wider font-bold opacity-60">
                              {pContent.badge || "HIGHLIGHTS"}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white border border-white/20">
                              {pCols} Cols
                            </span>
                          </div>

                          <div
                            className={`grid gap-1.5 ${
                              pCols === 4
                                ? "grid-cols-4"
                                : pCols === 2
                                ? "grid-cols-2"
                                : pCols === 1
                                ? "grid-cols-1"
                                : "grid-cols-3"
                            }`}
                          >
                            {Array.from({
                              length: Math.min(pCols === 1 ? 2 : pCols, 4),
                            }).map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-8 rounded-lg p-1 flex flex-col justify-between border ${
                                  isLight
                                    ? "bg-white border-zinc-200"
                                    : "bg-zinc-900 border-zinc-800"
                                }`}
                              >
                                <div
                                  className={`w-3 h-1.5 rounded-full ${
                                    isLight ? "bg-zinc-400" : "bg-zinc-500"
                                  }`}
                                />
                                <div
                                  className={`w-full h-1 rounded-full ${
                                    isLight ? "bg-zinc-300" : "bg-zinc-700"
                                  }`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Title and Badges */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="font-bold text-sm text-zinc-900 leading-snug">
                            {preset.name}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 shrink-0">
                            {preset.badge || `${pCols} Cols`}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                          {preset.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-100">
                        <button
                          type="button"
                          onClick={() => handleApplyStyleOnly(preset)}
                          className="py-1.5 px-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-[11px] font-bold font-mono transition cursor-pointer text-center"
                          title="Apply this layout style, colors, and columns without replacing your card text"
                        >
                          Style Only
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyFullPreset(preset)}
                          className="py-1.5 px-2 bg-black hover:bg-zinc-800 text-white rounded-lg text-[11px] font-bold font-mono transition cursor-pointer text-center"
                          title="Apply full template with cards, titles, and layout"
                        >
                          Apply All
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ========================================================================= */}
      {/* 6. ICON PICKER MODAL (PORTAL)                                              */}
      {/* ========================================================================= */}
      {activeIconCardIndex !== null &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
              {/* Modal Header */}
              <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 leading-tight">
                      Select Card #{activeIconCardIndex + 1} Icon
                    </h3>
                    <p className="text-[11px] text-zinc-500">
                      Search or select from 80+ categorized Lucide icons.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIconCardIndex(null)}
                  className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search & Filter */}
              <div className="p-3 border-b border-zinc-100 space-y-2">
                <div className="relative w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search icons (e.g. globe, alert, shield, leaf, dollar, lock...)"
                    value={iconSearchQuery}
                    onChange={(e) => setIconSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:border-black"
                    autoFocus
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
                  {[
                    { id: "all", label: "All Icons" },
                    { id: "popular", label: "Popular" },
                    { id: "business", label: "Business" },
                    { id: "tech", label: "Tech & Security" },
                    { id: "nature", label: "Environment" },
                    { id: "people", label: "People" },
                    { id: "actions", label: "Actions" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setIconCategoryFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition cursor-pointer ${
                        iconCategoryFilter === cat.id
                          ? "bg-black text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon Grid */}
              <div className="flex-1 overflow-y-auto p-4 max-h-[360px] custom-scrollbar">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {filteredIcons.map((name) => {
                    const CurrentIcon = (Icons as any)[name];
                    if (!CurrentIcon) return null;
                    const isSelected =
                      cards[activeIconCardIndex]?.icon === name;

                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          handleCardChange(activeIconCardIndex, { icon: name });
                          setActiveIconCardIndex(null);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                          isSelected
                            ? "border-black bg-zinc-900 text-white ring-2 ring-black"
                            : "border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50 text-zinc-800"
                        }`}
                        title={name}
                      >
                        <CurrentIcon className="w-5 h-5 shrink-0" />
                        <span className="text-[10px] font-mono truncate w-full text-center">
                          {name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {filteredIcons.length === 0 && (
                  <div className="py-8 text-center text-zinc-400">
                    <p className="text-xs">No matching icons found in library.</p>
                  </div>
                )}
              </div>

              {/* Custom Lucide Icon Input */}
              <div className="p-3 bg-zinc-50 border-t border-zinc-100 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-zinc-600 whitespace-nowrap">
                  Custom Icon:
                </span>
                <input
                  type="text"
                  placeholder="Type any Lucide name (e.g. Anchor, Award, Zap)..."
                  value={customIconInput}
                  onChange={(e) => setCustomIconInput(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-mono focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => {
                    const cleanName = customIconInput.trim();
                    if ((Icons as any)[cleanName]) {
                      handleCardChange(activeIconCardIndex, { icon: cleanName });
                      setActiveIconCardIndex(null);
                    } else {
                      alert(`Icon "${cleanName}" not found in lucide-react. Please check capitalization.`);
                    }
                  }}
                  className="px-3 py-1.5 bg-black hover:bg-zinc-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
