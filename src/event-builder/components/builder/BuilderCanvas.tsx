import React from "react";
import {
  ChevronUp,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Sliders,
} from "lucide-react";
import type { EventDocument } from "../../types/event";
import { DynamicEventRenderer } from "../public/DynamicEventRenderer";

interface BuilderCanvasProps {
  event: EventDocument;
  selectedSectionId?: string;
  onSelectSection: (id: string) => void;
  deviceMode: "desktop" | "tablet" | "mobile";
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDuplicate: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  event,
  selectedSectionId,
  onSelectSection,
  deviceMode,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}) => {
  // Device frame styles
  const viewportStyles = {
    desktop: "w-full max-w-none shadow-none",
    tablet: "w-[768px] max-w-full my-6 rounded-3xl shadow-2xl border-8 border-slate-800 overflow-hidden ring-1 ring-slate-900/10",
    mobile: "w-[375px] max-w-full my-6 rounded-[40px] shadow-2xl border-[10px] border-slate-800 overflow-hidden ring-1 ring-slate-900/10",
  };

  return (
    <div className="flex-1 bg-zinc-200/80 overflow-y-auto flex justify-center items-start p-2 sm:p-4 select-none">
      <div
        className={`bg-white transition-all duration-300 relative ${viewportStyles[deviceMode]}`}
      >
        {/* Render the actual event components */}
        <DynamicEventRenderer
          initialEvent={event}
          isBuilderMode={true}
          selectedSectionId={selectedSectionId}
          onSelectSectionId={onSelectSection}
          onToggleVisibility={onToggleVisibility}
        />

        {/* Floating Quick Action Overlay on the Selected Section */}
        {selectedSectionId && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/95 text-white px-4 py-2 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-3 duration-150">
            <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5 border-r border-zinc-800 pr-3">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span>Editing Section</span>
            </span>

            {/* If it's a section, footer, header or hero, allow toggling directly from bottom bar */}
            {(() => {
              if (selectedSectionId === "footer" || selectedSectionId === "footer_settings") {
                const isVisible = event.footer?.visible !== false;
                return (
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => onToggleVisibility("footer")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                        isVisible
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                          : "bg-white hover:bg-zinc-200 text-black border-white"
                      }`}
                      title={isVisible ? "Click to deactivate/hide footer" : "Click to activate/show footer"}
                    >
                      {isVisible ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-black" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                    <span className="text-zinc-400 font-mono text-[11px]">Footer</span>
                  </div>
                );
              }

              if (selectedSectionId === "header" || selectedSectionId === "header_settings") {
                const isVisible = event.header?.visible !== false;
                return (
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => onToggleVisibility("header")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                        isVisible
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                          : "bg-white hover:bg-zinc-200 text-black border-white"
                      }`}
                      title={isVisible ? "Click to deactivate/hide header" : "Click to activate/show header"}
                    >
                      {isVisible ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-black" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                    <span className="text-zinc-400 font-mono text-[11px]">Header</span>
                  </div>
                );
              }

              if (selectedSectionId === event.hero?.id || selectedSectionId === "hero_med_1" || selectedSectionId === "hero") {
                const isVisible = event.hero?.visible !== false;
                return (
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => onToggleVisibility(event.hero.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                        isVisible
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                          : "bg-white hover:bg-zinc-200 text-black border-white"
                      }`}
                      title={isVisible ? "Click to deactivate/hide hero" : "Click to activate/show hero"}
                    >
                      {isVisible ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-black" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                    <span className="text-zinc-400 font-mono text-[11px]">Hero Banner</span>
                  </div>
                );
              }

              const secIndex = event.sections.findIndex(
                (s) => s.id === selectedSectionId
              );
              if (secIndex < 0) return null;
              const sec = event.sections[secIndex];
              const isVisible = sec.visible !== false;

              return (
                <div className="flex items-center gap-2 text-xs">
                  {/* Status Toggle Button with clear badge */}
                  <button
                    onClick={() => onToggleVisibility(sec.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                      isVisible
                        ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                        : "bg-white hover:bg-zinc-200 text-black border-white"
                    }`}
                    title={isVisible ? "Click to deactivate/hide section" : "Click to activate/show section"}
                  >
                    {isVisible ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-black" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-0.5 border-l border-zinc-800 pl-2">
                    <button
                      onClick={() => onMoveUp(secIndex)}
                      disabled={secIndex === 0}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 transition cursor-pointer"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onMoveDown(secIndex)}
                      disabled={secIndex === event.sections.length - 1}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 transition cursor-pointer"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDuplicate(sec.id)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                      title="Duplicate Section"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(sec.id)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                      title="Delete Section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={() => onSelectSection("")}
              className="text-xs text-zinc-400 hover:text-white ml-2 pl-2 border-l border-zinc-800 font-semibold font-mono cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
