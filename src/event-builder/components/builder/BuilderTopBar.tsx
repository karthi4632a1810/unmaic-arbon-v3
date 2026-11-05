import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Check,
  Eye,
  Send,
} from "lucide-react";
import type { EventDocument } from "../../types/event";

interface BuilderTopBarProps {
  event: EventDocument;
  onUpdateEventName: (name: string) => void;
  deviceMode: "desktop" | "tablet" | "mobile";
  onChangeDeviceMode: (mode: "desktop" | "tablet" | "mobile") => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isSaving: boolean;
  onTogglePublish: () => void;
}

export const BuilderTopBar: React.FC<BuilderTopBarProps> = ({
  event,
  onUpdateEventName,
  deviceMode,
  onChangeDeviceMode,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isSaving,
  onTogglePublish,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(event.name);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (titleInput.trim()) {
      onUpdateEventName(titleInput.trim());
    } else {
      setTitleInput(event.name);
    }
  };

  return (
    <header className="h-16 bg-slate-900 text-white border-b border-slate-800 px-4 flex items-center justify-between z-40 shrink-0 select-none">
      {/* Left: Back & Event Title */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/events"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Back to All Events"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="h-5 w-px bg-slate-800" />

        <div>
          {isEditingTitle ? (
            <input
              type="text"
              autoFocus
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleSubmit();
                if (e.key === "Escape") {
                  setTitleInput(event.name);
                  setIsEditingTitle(false);
                }
              }}
              className="bg-slate-800 text-white text-sm font-bold px-2 py-1 rounded-md outline-none border border-white max-w-xs font-mono"
            />
          ) : (
            <button
              onClick={() => {
                setTitleInput(event.name);
                setIsEditingTitle(true);
              }}
              className="text-sm font-bold text-slate-100 hover:text-white flex items-center gap-1.5 transition text-left font-mono"
              title="Click to rename event"
            >
              <span className="truncate max-w-[200px] sm:max-w-xs">{event.name}</span>
              <span className="text-[10px] text-zinc-400 font-normal underline">edit</span>
            </button>
          )}
          <div className="text-[11px] text-zinc-400 flex items-center gap-2 font-mono">
            <span>/events/{event.slug}</span>
            <span className="text-zinc-600">•</span>
            {isSaving ? (
              <span className="text-zinc-300 font-medium">Saving changes...</span>
            ) : (
              <span className="text-white font-medium flex items-center gap-1">
                <Check className="w-3 h-3 text-white" /> Saved
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center: Device Viewport Switcher */}
      <div className="hidden md:flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
        <button
          onClick={() => onChangeDeviceMode("desktop")}
          className={`p-2 rounded-lg transition cursor-pointer ${
            deviceMode === "desktop"
              ? "bg-white text-black shadow-xs"
              : "text-zinc-400 hover:text-white"
          }`}
          title="Desktop View (100%)"
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => onChangeDeviceMode("tablet")}
          className={`p-2 rounded-lg transition cursor-pointer ${
            deviceMode === "tablet"
              ? "bg-white text-black shadow-xs"
              : "text-zinc-400 hover:text-white"
          }`}
          title="Tablet View (768px)"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => onChangeDeviceMode("mobile")}
          className={`p-2 rounded-lg transition cursor-pointer ${
            deviceMode === "mobile"
              ? "bg-white text-black shadow-xs"
              : "text-zinc-400 hover:text-white"
          }`}
          title="Mobile View (375px)"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Undo/Redo, Live Preview & Publish */}
      <div className="flex items-center gap-2 sm:gap-3 font-mono">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-2 rounded-lg transition ${
              canUndo
                ? "text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                : "text-zinc-600 cursor-not-allowed"
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-2 rounded-lg transition ${
              canRedo
                ? "text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                : "text-zinc-600 cursor-not-allowed"
            }`}
            title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

        {/* Live Preview Button */}
        <a
          href={`/events/${event.slug}?preview=true`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Preview</span>
        </a>

        {/* Publish Button */}
        <button
          onClick={onTogglePublish}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md active:scale-95 cursor-pointer ${
            event.published
              ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
              : "bg-white hover:bg-zinc-200 text-black"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>{event.published ? "Unpublish" : "Publish Event"}</span>
        </button>
      </div>
    </header>
  );
};
