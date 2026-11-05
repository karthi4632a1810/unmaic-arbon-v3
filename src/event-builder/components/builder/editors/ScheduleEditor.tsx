import React, { useState } from "react";
import { Plus, Trash2, Calendar, Clock, Type } from "lucide-react";
import type { ScheduleContent, ScheduleDay, ScheduleItem } from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";

interface ScheduleEditorProps {
  content: ScheduleContent;
  onChange: (updated: ScheduleContent) => void;
}

export const ScheduleEditor: React.FC<ScheduleEditorProps> = ({
  content,
  onChange,
}) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const handleUpdate = (fields: Partial<ScheduleContent>) => {
    onChange({ ...content, ...fields });
  };

  const handleDayLabelChange = (dayIdx: number, updates: Partial<ScheduleDay>) => {
    const days = [...(content.days || [])];
    days[dayIdx] = { ...days[dayIdx], ...updates };
    handleUpdate({ days });
  };

  const handleAddDay = () => {
    const days = [...(content.days || [])];
    const newDayNum = days.length + 1;
    days.push({
      id: "day_" + Date.now().toString(36),
      dayNumber: newDayNum,
      dateLabel: `Day ${newDayNum}`,
      title: "Scientific Tracks & Sessions",
      items: [
        {
          id: "item_" + Date.now().toString(36),
          time: "09:00 AM - 10:30 AM",
          title: "Opening Plenary Session",
          speaker: "Keynote Faculty",
          room: "Main Auditorium",
          category: "Keynote",
        },
      ],
    });
    handleUpdate({ days });
    setSelectedDayIdx(days.length - 1);
  };

  const handleRemoveDay = (dayIdx: number) => {
    const days = (content.days || []).filter((_, i) => i !== dayIdx);
    handleUpdate({ days });
    setSelectedDayIdx(Math.max(0, dayIdx - 1));
  };

  const handleSessionChange = (
    dayIdx: number,
    itemIdx: number,
    updates: Partial<ScheduleItem>
  ) => {
    const days = [...(content.days || [])];
    const items = [...days[dayIdx].items];
    items[itemIdx] = { ...items[itemIdx], ...updates };
    days[dayIdx] = { ...days[dayIdx], items };
    handleUpdate({ days });
  };

  const handleAddSession = (dayIdx: number) => {
    const days = [...(content.days || [])];
    const items = [
      ...days[dayIdx].items,
      {
        id: "item_" + Date.now().toString(36),
        time: "11:00 AM - 12:30 PM",
        title: "Clinical Panel Discussion",
        speaker: "Panel Faculty",
        room: "Hall A",
        category: "Panel",
      },
    ];
    days[dayIdx] = { ...days[dayIdx], items };
    handleUpdate({ days });
  };

  const handleRemoveSession = (dayIdx: number, itemIdx: number) => {
    const days = [...(content.days || [])];
    const items = days[dayIdx].items.filter((_, i) => i !== itemIdx);
    days[dayIdx] = { ...days[dayIdx], items };
    handleUpdate({ days });
  };

  const activeDay = content.days?.[selectedDayIdx];

  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      {/* 1. SECTION TITLES */}
      <CollapsibleGroup
        title="Section Titles"
        subtitle={content.heading || "Schedule"}
        icon={<Type className="w-3.5 h-3.5 text-blue-500" />}
        badge="HEADINGS"
        defaultOpen={false}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Heading</span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => handleUpdate({ heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Subtitle</span>
          <input
            type="text"
            value={content.subtitle || ""}
            onChange={(e) => handleUpdate({ subtitle: e.target.value })}
            placeholder="Optional subtitle"
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>

      {/* 2. CONFERENCE DAYS */}
      <CollapsibleGroup
        title="Conference Days"
        subtitle={`${content.days?.length || 0} day track(s)`}
        icon={<Calendar className="w-3.5 h-3.5 text-indigo-500" />}
        badge={`${content.days?.length || 0} DAYS`}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={handleAddDay}
            className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add Day</span>
          </button>
        }
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5 font-mono">
            {content.days?.map((day, idx) => (
              <button
                key={day.id || idx}
                type="button"
                onClick={() => setSelectedDayIdx(idx)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                  selectedDayIdx === idx
                    ? "bg-black text-white shadow-2xs"
                    : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                Day {day.dayNumber || idx + 1}
              </button>
            ))}
          </div>

          {activeDay && (
            <div className="p-3 bg-white rounded-xl border border-zinc-200 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900 font-mono">
                  Day {activeDay.dayNumber || selectedDayIdx + 1} Details
                </span>
                {content.days.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDay(selectedDayIdx)}
                    className="text-zinc-500 hover:text-rose-600 text-[11px] font-semibold flex items-center gap-1 cursor-pointer font-mono transition"
                  >
                    <Trash2 className="w-3 h-3" /> Remove Day
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-[10px] text-zinc-500 font-mono mb-1">Date Label</span>
                  <input
                    type="text"
                    placeholder="Date (e.g. Wednesday, Oct 21)"
                    value={activeDay.dateLabel}
                    onChange={(e) =>
                      handleDayLabelChange(selectedDayIdx, { dateLabel: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 font-semibold focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 font-mono mb-1">Theme</span>
                  <input
                    type="text"
                    placeholder="Day Theme"
                    value={activeDay.title || ""}
                    onChange={(e) =>
                      handleDayLabelChange(selectedDayIdx, { title: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </CollapsibleGroup>

      {/* 3. SESSIONS IN SELECTED DAY */}
      {activeDay && (
        <CollapsibleGroup
          title={`Day ${activeDay.dayNumber || selectedDayIdx + 1} Sessions`}
          subtitle={`${activeDay.items?.length || 0} session item${activeDay.items?.length === 1 ? "" : "s"}`}
          icon={<Clock className="w-3.5 h-3.5 text-emerald-500" />}
          badge={`${activeDay.items?.length || 0} SESSIONS`}
          defaultOpen={true}
          headerAction={
            <button
              type="button"
              onClick={() => handleAddSession(selectedDayIdx)}
              className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          }
        >
          <div className="space-y-3">
            {(!activeDay.items || activeDay.items.length === 0) && (
              <div className="text-center py-4 text-zinc-400 text-xs font-mono">
                No sessions in Day {activeDay.dayNumber || selectedDayIdx + 1}. Click &quot;Add&quot; to insert one.
              </div>
            )}

            {activeDay.items?.map((item, itemIdx) => (
              <div
                key={item.id || itemIdx}
                className="p-3 bg-white rounded-xl border border-zinc-200 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-zinc-700 font-mono">
                    Session #{itemIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSession(selectedDayIdx, itemIdx)}
                    className="text-zinc-400 hover:text-rose-600 p-0.5 cursor-pointer transition"
                    title="Remove session"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Time (09:00 AM - 10:30 AM)"
                    value={item.time}
                    onChange={(e) =>
                      handleSessionChange(selectedDayIdx, itemIdx, {
                        time: e.target.value,
                      })
                    }
                    className="px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg font-mono font-semibold bg-zinc-50 focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Keynote)"
                    value={item.category || ""}
                    onChange={(e) =>
                      handleSessionChange(selectedDayIdx, itemIdx, {
                        category: e.target.value,
                      })
                    }
                    className="px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Session Title"
                  value={item.title}
                  onChange={(e) =>
                    handleSessionChange(selectedDayIdx, itemIdx, {
                      title: e.target.value,
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg font-bold bg-zinc-50 focus:outline-none focus:border-black"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Speaker / Faculty"
                    value={item.speaker || ""}
                    onChange={(e) =>
                      handleSessionChange(selectedDayIdx, itemIdx, {
                        speaker: e.target.value,
                      })
                    }
                    className="px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Room (Hall A)"
                    value={item.room || ""}
                    onChange={(e) =>
                      handleSessionChange(selectedDayIdx, itemIdx, {
                        room: e.target.value,
                      })
                    }
                    className="px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            ))}
          </div>
        </CollapsibleGroup>
      )}
    </div>
  );
};
