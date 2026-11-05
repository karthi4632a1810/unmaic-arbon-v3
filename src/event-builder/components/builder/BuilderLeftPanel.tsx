import React, { useState } from "react";
import * as Icons from "lucide-react";
import {
  Plus,
  Layers,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  GripVertical,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SECTION_CATALOG, type SectionCatalogItem } from "../../registry/sectionCatalog";
import { SECTION_PRESETS, type SectionPreset } from "../../registry/sectionPresets";
import type { EventSection, EventDocument } from "../../types/event";

interface BuilderLeftPanelProps {
  event?: EventDocument;
  sections: EventSection[];
  selectedSectionId?: string;
  onSelectSection: (id: string) => void;
  onAddSection: (
    catalogItem: SectionCatalogItem,
    insertIndex?: number,
    preset?: SectionPreset
  ) => void;
  onReorderSections: (newSections: EventSection[]) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BuilderLeftPanel: React.FC<BuilderLeftPanelProps> = ({
  event,
  sections,
  selectedSectionId,
  onSelectSection,
  onAddSection,
  onReorderSections,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onDuplicate,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<"library" | "outline">("outline");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedCatalogType, setExpandedCatalogType] = useState<string | null>(null);

  // Drag and Drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingFromLibrary, setIsDraggingFromLibrary] = useState<boolean>(false);

  const categories = ["All", "Basic", "Event", "Content", "Conversion", "Media"];

  const filteredCatalog = SECTION_CATALOG.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 2800);
  };

  const handleCatalogAdd = (
    item: SectionCatalogItem,
    preset?: SectionPreset,
    insertIndex?: number
  ) => {
    onAddSection(item, insertIndex, preset);
    showToast(`Added ${preset?.name || item.name} to page`);
    setActiveTab("outline");
  };

  // Reorder Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", `${index}`);
    e.dataTransfer.effectAllowed = "move";
    setDraggedIndex(index);
    setIsDraggingFromLibrary(false);
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

    // Check if dropping a new item from library
    const libraryPayload = e.dataTransfer.getData("application/json");
    if (libraryPayload) {
      try {
        const parsed = JSON.parse(libraryPayload);
        const catalogItem = SECTION_CATALOG.find((c) => c.type === parsed.catalogType);
        if (catalogItem) {
          handleCatalogAdd(catalogItem, undefined, targetIndex);
          setDraggedIndex(null);
          setDragOverIndex(null);
          setIsDraggingFromLibrary(false);
          return;
        }
      } catch (err) {
        console.error("Failed to parse dropped library item", err);
      }
    }

    // Reordering existing sections
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      const updated = [...sections];
      const [movedItem] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, movedItem);
      onReorderSections(updated);
      showToast(`Reordered section to position ${targetIndex + 1}`);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDraggingFromLibrary(false);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDraggingFromLibrary(false);
  };

  // Dragging from Library catalog
  const handleLibraryDragStart = (e: React.DragEvent, item: SectionCatalogItem) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ catalogType: item.type })
    );
    e.dataTransfer.effectAllowed = "copyMove";
    setIsDraggingFromLibrary(true);
  };

  return (
    <aside className="w-84 bg-white border-r border-zinc-200 flex flex-col shrink-0 select-none z-20 h-full font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-black text-white px-3 py-2 text-xs font-mono flex items-center justify-between border-b border-zinc-800 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 truncate">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[10px] text-zinc-400 hover:text-white ml-2 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="p-3 border-b border-zinc-200 flex gap-1.5 bg-zinc-50">
        <button
          onClick={() => setActiveTab("outline")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 font-mono cursor-pointer ${
            activeTab === "outline"
              ? "bg-black text-white shadow-xs"
              : "text-zinc-600 hover:text-black hover:bg-zinc-200/60"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Outline ({sections.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("library")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 font-mono cursor-pointer ${
            activeTab === "library"
              ? "bg-black text-white shadow-xs"
              : "text-zinc-600 hover:text-black hover:bg-zinc-200/60"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Section</span>
        </button>
      </div>

      {/* TAB 1: OUTLINE WITH DRAG & DROP + INACTIVE/ACTIVE TOGGLE */}
      {activeTab === "outline" && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* Page Settings (Always Above Hero Banner) */}
          <div
            onClick={() => onSelectSection("")}
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition cursor-pointer select-none ${
              !selectedSectionId || selectedSectionId === "page_settings"
                ? "border-black bg-zinc-100 shadow-xs ring-1 ring-black"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <Icons.Sliders className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-zinc-900 block truncate">
                  Page Settings
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Background & Typography
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
              Page
            </span>
          </div>

          {/* Header (After Page Settings, above Hero Banner) */}
          <div
            onClick={() => onSelectSection("header")}
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition cursor-pointer select-none ${
              selectedSectionId === "header"
                ? "border-black bg-zinc-100 shadow-xs ring-1 ring-black"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <Icons.PanelTop className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-zinc-900 block truncate">
                  Header
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Layout, Sticky, Logo & CTA
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              {event?.header && (
                <button
                  type="button"
                  onClick={() => onToggleVisibility("header")}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition cursor-pointer shrink-0 border ${
                    event.header.visible !== false
                      ? "bg-zinc-100 hover:bg-zinc-200 text-black border-zinc-300"
                      : "bg-zinc-900 hover:bg-black text-zinc-300 border-zinc-800"
                  }`}
                  title={
                    event.header.visible !== false
                      ? "Click to deactivate/hide header"
                      : "Click to activate/show header"
                  }
                >
                  {event.header.visible !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-black" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-zinc-400" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>
              )}
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 border border-zinc-200">
                Header
              </span>
            </div>
          </div>

          {/* Fixed Hero Banner */}
          <div
            onClick={() => onSelectSection("hero_med_1")}
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition cursor-pointer select-none ${
              selectedSectionId === "hero_med_1" ||
              selectedSectionId?.startsWith("hero")
                ? "border-black bg-zinc-100 shadow-xs ring-1 ring-black"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <Icons.LayoutTemplate className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-zinc-900 block truncate">
                  Hero Banner
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Fixed Top Section
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              {event?.hero && (
                <button
                  type="button"
                  onClick={() => onToggleVisibility(event.hero.id)}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition cursor-pointer shrink-0 border ${
                    event.hero.visible !== false
                      ? "bg-zinc-100 hover:bg-zinc-200 text-black border-zinc-300"
                      : "bg-zinc-900 hover:bg-black text-zinc-300 border-zinc-800"
                  }`}
                  title={
                    event.hero.visible !== false
                      ? "Click to deactivate/hide hero"
                      : "Click to activate/show hero"
                  }
                >
                  {event.hero.visible !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-black" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-zinc-400" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>
              )}
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 border border-zinc-200">
                Fixed Top
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 pt-2 text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
            <span>Drag to Reorder</span>
            <span>{sections.length} Sections</span>
          </div>

          {/* Drop target at top of dynamic list */}
          {dragOverIndex === 0 && (
            <div className="h-1 bg-black rounded-full my-1 animate-pulse" />
          )}

          {/* Dynamic Section Items */}
          {sections.map((sec, idx) => {
            const catalogItem = SECTION_CATALOG.find((c) => c.type === sec.type);
            const LucideIcon = catalogItem
              ? (Icons as any)[catalogItem.icon] || Icons.Layers
              : Icons.Layers;
            const isSelected = selectedSectionId === sec.id;
            const isDraggingThis = draggedIndex === idx;

            return (
              <div key={sec.id} className="relative">
                {/* Drop Indicator Bar */}
                {dragOverIndex === idx && (
                  <div className="h-1 bg-black rounded-full my-1 animate-pulse" />
                )}

                <div
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onSelectSection(sec.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition cursor-pointer select-none group ${
                    isDraggingThis ? "opacity-30 scale-95" : ""
                  } ${
                    isSelected
                      ? "border-black bg-zinc-100 shadow-xs ring-1 ring-black"
                      : sec.visible === false
                      ? "border-zinc-200 bg-zinc-50/70 opacity-60"
                      : "border-zinc-200 bg-white hover:border-zinc-400"
                  }`}
                >
                  {/* Drag Handle & Info */}
                  <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                    <div
                      className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-zinc-400 hover:text-black rounded"
                      title="Drag to reorder"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GripVertical className="w-3.5 h-3.5" />
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                      <LucideIcon className="w-3.5 h-3.5" />
                    </div>

                    <div className="truncate flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-zinc-900 truncate">
                          {catalogItem?.name || sec.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono block truncate">
                        {catalogItem?.category || "Content"} Section
                      </span>
                    </div>
                  </div>

                  {/* Active / Inactive Status Toggle Pill */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisibility(sec.id);
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition cursor-pointer shrink-0 border ${
                      sec.visible !== false
                        ? "bg-zinc-100 hover:bg-zinc-200 text-black border-zinc-300"
                        : "bg-zinc-900 hover:bg-black text-zinc-300 border-zinc-800"
                    }`}
                    title={
                      sec.visible !== false
                        ? "Click to deactivate/hide section"
                        : "Click to activate/show section"
                    }
                  >
                    {sec.visible !== false ? (
                      <>
                        <Eye className="w-3 h-3 text-black" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 text-zinc-400" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>

                  {/* Move Up/Down & More Actions */}
                  <div
                    className="flex items-center gap-0.5 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onMoveUp(idx)}
                      disabled={idx === 0}
                      className="p-1 text-zinc-400 hover:text-black disabled:opacity-20 rounded hover:bg-zinc-200 transition cursor-pointer"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onMoveDown(idx)}
                      disabled={idx === sections.length - 1}
                      className="p-1 text-zinc-400 hover:text-black disabled:opacity-20 rounded hover:bg-zinc-200 transition cursor-pointer"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDuplicate(sec.id)}
                      className="p-1 text-zinc-400 hover:text-black rounded hover:bg-zinc-200 transition cursor-pointer"
                      title="Duplicate Section"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(sec.id)}
                      className="p-1 text-zinc-400 hover:text-black rounded hover:bg-zinc-200 transition cursor-pointer"
                      title="Delete Section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Visual Dropzone when dragging from library */}
          {isDraggingFromLibrary && (
            <div className="p-3 my-2 border-2 border-dashed border-black bg-zinc-100 rounded-xl text-center text-xs font-mono font-bold text-black animate-pulse">
              ↓ Drop here to insert into page
            </div>
          )}

          {/* Quick Add Section Button at bottom of Outline */}
          <button
            onClick={() => setActiveTab("library")}
            className="w-full mt-3 py-2.5 px-3 border border-dashed border-zinc-300 hover:border-black rounded-xl text-xs font-mono font-bold text-zinc-600 hover:text-black flex items-center justify-center gap-1.5 transition cursor-pointer bg-zinc-50/50 hover:bg-zinc-100"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Section</span>
          </button>

          {/* Footer (Fixed Bottom Section) */}
          <div
            onClick={() => onSelectSection("footer")}
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition cursor-pointer select-none mt-2 ${
              selectedSectionId === "footer" || selectedSectionId === "footer_settings"
                ? "border-black bg-zinc-100 shadow-xs ring-1 ring-black"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <Icons.PanelBottom className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-zinc-900 block truncate">
                  Footer
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Copyright, Links & Legal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onToggleVisibility("footer")}
                className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition cursor-pointer shrink-0 border ${
                  event?.footer?.visible !== false
                    ? "bg-zinc-100 hover:bg-zinc-200 text-black border-zinc-300"
                    : "bg-zinc-900 hover:bg-black text-zinc-300 border-zinc-800"
                }`}
                title={
                  event?.footer?.visible !== false
                    ? "Click to deactivate/hide footer"
                    : "Click to activate/show footer"
                }
              >
                {event?.footer?.visible !== false ? (
                  <>
                    <Eye className="w-3 h-3 text-black" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 text-zinc-400" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 border border-zinc-200">
                Fixed Bottom
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECTION CATALOG LIBRARY WITH SIMPLE TEMPLATES */}
      {activeTab === "library" && (
        <div className="flex-1 flex flex-col overflow-hidden font-sans">
          {/* Category Filter Pills */}
          <div className="px-3 pt-3 pb-2 flex flex-wrap gap-1 border-b border-zinc-200 bg-white">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="px-3 py-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
            <span>Click to Add or Drag into Position</span>
            <span>{filteredCatalog.length} Types</span>
          </div>

          {/* Catalog Items Grid */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {filteredCatalog.map((item) => {
              const LucideIcon = (Icons as any)[item.icon] || Icons.LayoutTemplate;
              const presets = SECTION_PRESETS[item.type] || [];
              const isExpanded = expandedCatalogType === item.type;

              return (
                <div
                  key={item.type}
                  draggable={true}
                  onDragStart={(e) => handleLibraryDragStart(e, item)}
                  className="rounded-2xl border border-zinc-200 bg-white hover:border-black transition-all duration-200 shadow-2xs hover:shadow-sm overflow-hidden"
                >
                  {/* Item Header Banner */}
                  <div className="p-3 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200">
                      <LucideIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-zinc-400 font-mono font-semibold uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-3 pb-3 pt-1 flex items-center gap-2 border-t border-zinc-100 bg-zinc-50/50">
                    <button
                      onClick={() => handleCatalogAdd(item)}
                      className="flex-1 py-1.5 px-3 bg-black hover:bg-zinc-800 text-white rounded-lg text-xs font-bold font-mono transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Section</span>
                    </button>

                    {presets.length > 0 && (
                      <button
                        onClick={() =>
                          setExpandedCatalogType(isExpanded ? null : item.type)
                        }
                        className={`py-1.5 px-2.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1 cursor-pointer border ${
                          isExpanded
                            ? "bg-zinc-200 text-black border-zinc-400"
                            : "bg-white text-zinc-700 hover:bg-zinc-100 border-zinc-200"
                        }`}
                        title="View Simple Templates"
                      >
                        <Sparkles className="w-3 h-3 text-black" />
                        <span className="text-[10px]">
                          {presets.length} Presets
                        </span>
                        <ChevronRight
                          className={`w-3 h-3 transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Expandable Simple Presets Drawer */}
                  {isExpanded && presets.length > 0 && (
                    <div className="p-2.5 bg-zinc-100 border-t border-zinc-200 space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block px-1">
                        Select a Minimal Template:
                      </span>
                      {presets.map((preset) => (
                        <div
                          key={preset.id}
                          onClick={() => handleCatalogAdd(item, preset)}
                          className="p-2 rounded-xl bg-white border border-zinc-200 hover:border-black transition cursor-pointer text-left shadow-2xs group"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-zinc-900 group-hover:text-black">
                              {preset.name}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold">
                              {preset.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight line-clamp-1">
                            {preset.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};
