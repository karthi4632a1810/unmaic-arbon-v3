import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventStore } from "../../services/eventStore";
import type { EventDocument, EventSection } from "../../types/event";
import type { SectionCatalogItem } from "../../registry/sectionCatalog";
import { BuilderTopBar } from "./BuilderTopBar";
import { BuilderLeftPanel } from "./BuilderLeftPanel";
import { BuilderCanvas } from "./BuilderCanvas";
import { BuilderRightPanel } from "./BuilderRightPanel";

export const EventBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventDocument | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isSaving, setIsSaving] = useState(false);

  // Undo / Redo history stacks backed by refs for race-free consistency
  const historyRef = useRef<EventDocument[]>([]);
  const futureRef = useRef<EventDocument[]>([]);
  const currentEventRef = useRef<EventDocument | null>(null);

  // States to trigger UI updates for Undo / Redo buttons
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [undoToast, setUndoToast] = useState<string | null>(null);
  const toastTimerRef = useRef<any>(null);

  // Continuous typing/sliding session management
  const isSessionActiveRef = useRef<boolean>(false);
  const sessionTimerRef = useRef<any>(null);
  const autosaveTimerRef = useRef<any>(null);

  const updateUndoRedoAvailability = useCallback(() => {
    setCanUndo(historyRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, []);

  const showUndoToast = useCallback((msg: string) => {
    setUndoToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setUndoToast(null);
    }, 1400);
  }, []);

  // Initial load
  useEffect(() => {
    if (id) {
      const found = eventStore.getEventById(id) || eventStore.getEventBySlug(id);
      if (found) {
        const cloned = JSON.parse(JSON.stringify(found));
        setEvent(cloned);
        currentEventRef.current = cloned;
        historyRef.current = [];
        futureRef.current = [];
        isSessionActiveRef.current = false;
        updateUndoRedoAvailability();
      } else {
        navigate("/admin/events");
      }
    }
  }, [id, navigate, updateUndoRedoAvailability]);

  // Master updateEvent method: records history checkpoints and autosaves
  const updateEvent = useCallback(
    (nextEvent: EventDocument, options?: { immediate?: boolean }) => {
      const current = currentEventRef.current;
      if (!current) {
        const initial = JSON.parse(JSON.stringify(nextEvent));
        currentEventRef.current = initial;
        setEvent(initial);
        return;
      }

      const immediate = options?.immediate ?? false;

      if (immediate) {
        // Stop any running typing session
        if (sessionTimerRef.current) {
          clearTimeout(sessionTimerRef.current);
          sessionTimerRef.current = null;
        }
        isSessionActiveRef.current = false;

        // Snapshot current state to history (limit to last 50)
        historyRef.current = [
          ...historyRef.current.slice(-49),
          JSON.parse(JSON.stringify(current)),
        ];
        // Any new action clears the redo future branch
        futureRef.current = [];
      } else {
        // Continuous editing session (typing, dragging sliders)
        if (!isSessionActiveRef.current) {
          // Snapshot baseline before this burst of changes
          historyRef.current = [
            ...historyRef.current.slice(-49),
            JSON.parse(JSON.stringify(current)),
          ];
          futureRef.current = [];
          isSessionActiveRef.current = true;
        }

        // Reset session timeout (500ms after user stops typing, session closes)
        if (sessionTimerRef.current) {
          clearTimeout(sessionTimerRef.current);
        }
        sessionTimerRef.current = setTimeout(() => {
          isSessionActiveRef.current = false;
          sessionTimerRef.current = null;
        }, 500);
      }

      const nextCloned = JSON.parse(JSON.stringify(nextEvent));
      currentEventRef.current = nextCloned;
      setEvent(nextCloned);
      updateUndoRedoAvailability();

      // Debounced autosave
      setIsSaving(true);
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
      autosaveTimerRef.current = setTimeout(() => {
        eventStore.saveEvent(nextCloned);
        setIsSaving(false);
      }, 500);
    },
    [updateUndoRedoAvailability]
  );

  // Undo / Redo logic
  const handleUndo = useCallback(() => {
    // 1. Flush any active session
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    isSessionActiveRef.current = false;

    if (historyRef.current.length === 0 || !currentEventRef.current) return;

    // Pop the previous state
    const previous = historyRef.current.pop()!;

    // Push current state onto redo future stack
    futureRef.current = [
      JSON.parse(JSON.stringify(currentEventRef.current)),
      ...futureRef.current.slice(0, 49),
    ];

    currentEventRef.current = previous;
    setEvent(previous);
    updateUndoRedoAvailability();
    showUndoToast("Undo (Ctrl+Z)");

    // Autosave the reverted state
    setIsSaving(true);
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      eventStore.saveEvent(previous);
      setIsSaving(false);
    }, 400);
  }, [updateUndoRedoAvailability, showUndoToast]);

  const handleRedo = useCallback(() => {
    // 1. Flush any active session
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    isSessionActiveRef.current = false;

    if (futureRef.current.length === 0 || !currentEventRef.current) return;

    // Pop/shift next state from redo stack
    const next = futureRef.current.shift()!;

    // Push current state to history
    historyRef.current = [
      ...historyRef.current.slice(-49),
      JSON.parse(JSON.stringify(currentEventRef.current)),
    ];

    currentEventRef.current = next;
    setEvent(next);
    updateUndoRedoAvailability();
    showUndoToast("Redo (Ctrl+Y)");

    // Autosave the restored state
    setIsSaving(true);
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      eventStore.saveEvent(next);
      setIsSaving(false);
    }, 400);
  }, [updateUndoRedoAvailability, showUndoToast]);

  // Keyboard shortcut listener for Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y, Cmd+Z, Cmd+Shift+Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (!isCtrlOrCmd) return;

      const key = e.key.toLowerCase();

      // Undo: Ctrl+Z or Cmd+Z (without shift)
      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        handleUndo();
        return;
      }

      // Redo:
      // 1. Ctrl+Y or Cmd+Y (standard Windows/Linux redo)
      // 2. Ctrl+Shift+Z or Cmd+Shift+Z (macOS / standard alternative)
      if ((key === "y" && !e.shiftKey) || (key === "z" && e.shiftKey)) {
        e.preventDefault();
        e.stopPropagation();
        handleRedo();
        return;
      }
    };

    // Use capture phase so shortcuts work reliably across all focused elements
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [handleUndo, handleRedo]);

  // Auto-scroll canvas to selected or newly added section (placed unconditionally at top level)
  useEffect(() => {
    if (selectedSectionId) {
      const timer = setTimeout(() => {
        const target =
          document.getElementById(selectedSectionId) ||
          document.querySelector(`[data-section-id="${selectedSectionId}"]`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [selectedSectionId]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Section Add Handler with optional position and preset
  const handleAddSection = (
    catalogItem: SectionCatalogItem,
    insertIndex?: number,
    preset?: any
  ) => {
    const newSection: EventSection = {
      id: "sec_" + catalogItem.type + "_" + Date.now().toString(36),
      type: catalogItem.type,
      visible: true,
      anchorId: catalogItem.type,
      settings: preset?.settings || catalogItem.defaultSettings(),
      content: preset?.content || catalogItem.defaultContent(),
    };

    const nextSections = [...event.sections];
    if (typeof insertIndex === "number" && insertIndex >= 0 && insertIndex <= nextSections.length) {
      nextSections.splice(insertIndex, 0, newSection);
    } else {
      const selectedIndex = event.sections.findIndex((s) => s.id === selectedSectionId);
      if (selectedIndex >= 0) {
        nextSections.splice(selectedIndex + 1, 0, newSection);
      } else {
        nextSections.push(newSection);
      }
    }

    const nextEvent = {
      ...event,
      sections: nextSections,
    };
    updateEvent(nextEvent, { immediate: true });
    setSelectedSectionId(newSection.id);
  };

  // Section Reorder Drag-and-Drop Handler
  const handleReorderSections = (newSections: EventSection[]) => {
    updateEvent({ ...event, sections: newSections }, { immediate: true });
  };

  // Section Reorder Handlers (Buttons)
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...event.sections];
    const temp = newSections[index - 1];
    newSections[index - 1] = newSections[index];
    newSections[index] = temp;

    updateEvent({ ...event, sections: newSections }, { immediate: true });
  };

  const handleMoveDown = (index: number) => {
    if (index === event.sections.length - 1) return;
    const newSections = [...event.sections];
    const temp = newSections[index + 1];
    newSections[index + 1] = newSections[index];
    newSections[index] = temp;

    updateEvent({ ...event, sections: newSections }, { immediate: true });
  };

  const handleToggleVisibility = (sectionId: string) => {
    if (sectionId === "hero_med_1" || sectionId === "hero") {
      const updatedHero = {
        ...event.hero,
        visible: !event.hero?.visible,
      };
      updateEvent({ ...event, hero: updatedHero }, { immediate: true });
      return;
    }

    if (sectionId === "footer" || sectionId === "footer_settings") {
      const updatedFooter = {
        ...event.footer,
        visible: event.footer?.visible === false ? true : false,
      };
      updateEvent({ ...event, footer: updatedFooter }, { immediate: true });
      return;
    }

    if (sectionId === "header" || sectionId === "header_settings") {
      const updatedHeader = {
        ...event.header,
        visible: event.header?.visible === false ? true : false,
      };
      updateEvent({ ...event, header: updatedHeader }, { immediate: true });
      return;
    }

    const newSections = event.sections.map((s) =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    updateEvent({ ...event, sections: newSections }, { immediate: true });
  };

  const handleDuplicate = (sectionId: string) => {
    const sourceIndex = event.sections.findIndex((s) => s.id === sectionId);
    if (sourceIndex < 0) return;

    const source = event.sections[sourceIndex];
    const cloned: EventSection = {
      ...JSON.parse(JSON.stringify(source)),
      id: "sec_" + source.type + "_" + Date.now().toString(36),
      anchorId: source.anchorId ? `${source.anchorId}-copy` : undefined,
    };

    const newSections = [...event.sections];
    newSections.splice(sourceIndex + 1, 0, cloned);

    updateEvent({ ...event, sections: newSections }, { immediate: true });
    setSelectedSectionId(cloned.id);
  };

  const handleDelete = (sectionId: string) => {
    const newSections = event.sections.filter((s) => s.id !== sectionId);
    updateEvent({ ...event, sections: newSections }, { immediate: true });
    if (selectedSectionId === sectionId) {
      setSelectedSectionId("");
    }
  };

  const handleTogglePublish = () => {
    const toggled = eventStore.togglePublish(event.id);
    setEvent(toggled);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-100 overflow-hidden font-sans relative">
      {/* 1. Top Bar */}
      <BuilderTopBar
        event={event}
        onUpdateEventName={(name) => updateEvent({ ...event, name }, { immediate: true })}
        deviceMode={deviceMode}
        onChangeDeviceMode={setDeviceMode}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        isSaving={isSaving}
        onTogglePublish={handleTogglePublish}
      />

      {/* 2. 3-Panel Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: Library & Section Outline */}
        <BuilderLeftPanel
          event={event}
          sections={event.sections}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          onAddSection={handleAddSection}
          onReorderSections={handleReorderSections}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onToggleVisibility={handleToggleVisibility}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />

        {/* Center Panel: Live Page Canvas */}
        <BuilderCanvas
          event={event}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          deviceMode={deviceMode}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDuplicate={handleDuplicate}
          onToggleVisibility={handleToggleVisibility}
          onDelete={handleDelete}
        />

        {/* Right Panel: Contextual Properties Inspector */}
        <BuilderRightPanel
          event={event}
          selectedSectionId={selectedSectionId}
          onCloseSectionSettings={() => setSelectedSectionId("")}
          onUpdateEvent={updateEvent}
          onToggleVisibility={handleToggleVisibility}
        />
      </div>

      {/* Floating Undo / Redo Toast Indicator */}
      {undoToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2 bg-zinc-950/95 backdrop-blur-md text-white text-xs font-mono font-bold rounded-full shadow-2xl border border-zinc-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{undoToast}</span>
        </div>
      )}
    </div>
  );
};
