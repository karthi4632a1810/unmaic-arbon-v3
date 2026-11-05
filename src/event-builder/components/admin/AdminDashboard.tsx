import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Eye,
  Ticket,
  TrendingUp,
  Plus,
  Sliders,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";
import { eventStore } from "../../services/eventStore";
import type { EventDocument } from "../../types/event";
import { CreateEventModal } from "./CreateEventModal";

export const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadData = () => {
    setEvents(eventStore.getEvents());
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalEvents = events.length;
  const publishedEvents = events.filter((e) => e.published).length;
  const totalViews = events.reduce((sum, e) => sum + (e.analytics?.views || 0), 0);
  const totalRegs = events.reduce(
    (sum, e) => sum + (e.analytics?.registrations || 0),
    0
  );

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/10 text-zinc-300 border border-white/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Event Management Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white leading-tight font-mono uppercase">
            UNMAI Event Builder
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
            Create high-converting, structured event landing pages matching UNMAI Carbon's institutional standard with instant publishing and live previews.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold font-mono text-xs sm:text-sm transition flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </button>
          <Link
            to="/admin/templates"
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-semibold text-xs sm:text-sm border border-white/15 transition flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Templates</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Total Events</div>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 mt-1">{totalEvents}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Published Live</div>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 mt-1">{publishedEvents}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Total Page Views</div>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 mt-1">{totalViews.toLocaleString()}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Registrations</div>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 mt-1">{totalRegs}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Events</h2>
            <p className="text-xs text-slate-500 mt-0.5">Quick access to all configured event landing pages</p>
          </div>
          <Link
            to="/admin/events"
            className="text-xs font-mono font-bold text-slate-900 hover:text-zinc-600 flex items-center gap-1 transition"
          >
            <span>View All ({totalEvents})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="py-3 px-6">Event Name</th>
                <th className="py-3 px-6">Public URL</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Views</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
              {events.slice(0, 5).map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <Link
                      to={`/admin/events/${evt.id}/builder`}
                      className="hover:text-zinc-600 transition"
                    >
                      {evt.name}
                    </Link>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-zinc-900 font-semibold">
                    <a
                      href={`/events/${evt.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>/events/{evt.slug}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase ${
                        evt.published
                          ? "bg-zinc-900 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          evt.published ? "bg-white" : "bg-slate-400"
                        }`}
                      />
                      {evt.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs font-mono">
                    {evt.startDate
                      ? new Date(evt.startDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "TBD"}
                  </td>
                  <td className="py-4 px-6 font-semibold font-mono text-slate-900">
                    {evt.analytics?.views || 0}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      to={`/admin/events/${evt.id}/builder`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer font-mono"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Edit</span>
                    </Link>
                    <a
                      href={`/events/${evt.slug}?preview=true`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-semibold transition cursor-pointer font-mono"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          loadData();
        }}
      />
    </div>
  );
};
