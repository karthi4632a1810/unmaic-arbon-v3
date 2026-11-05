import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Copy,
  Check,
  QrCode,
  Sliders,
  Trash2,
  CopyCheck,
  Calendar,
  Eye,
} from "lucide-react";
import { eventStore } from "../../services/eventStore";
import type { EventDocument } from "../../types/event";
import { CreateEventModal } from "./CreateEventModal";
import { QrModal } from "../public/QrModal";

export const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [qrModalEvent, setQrModalEvent] = useState<{ url: string; name: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadEvents = () => {
    setEvents(eventStore.getEvents());
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleTogglePublish = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    eventStore.togglePublish(id);
    loadEvents();
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const cloned = eventStore.duplicateEvent(id);
    loadEvents();
    navigate(`/admin/events/${cloned.id}/builder`);
  };

  const handleDelete = (id: string) => {
    eventStore.deleteEvent(id);
    setDeleteConfirmId(null);
    loadEvents();
  };

  const handleCopyLink = (e: React.MouseEvent, slug: string, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/events/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.name.toLowerCase().includes(search.toLowerCase()) ||
      evt.slug.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "published"
        ? evt.published
        : !evt.published;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Events Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, manage, customize, and publish your dynamic event landing pages.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold font-mono text-xs sm:text-sm shadow-md transition active:scale-95 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              statusFilter === "all"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All ({events.length})
          </button>
          <button
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              statusFilter === "published"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Published ({events.filter((e) => e.published).length})
          </button>
          <button
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              statusFilter === "draft"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Drafts ({events.filter((e) => !e.published).length})
          </button>
        </div>
      </div>

      {/* Events List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          return (
            <div
              key={evt.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Event Card Header */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                      evt.published
                        ? "bg-zinc-900 text-white"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        evt.published ? "bg-white" : "bg-slate-400"
                      }`}
                    />
                    {evt.published ? "Published" : "Draft"}
                  </span>

                  <span className="text-[11px] text-slate-400 font-mono">
                    /events/{evt.slug}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-mono text-slate-900 group-hover:text-zinc-600 transition leading-snug line-clamp-2">
                  {evt.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {evt.startDate
                      ? new Date(evt.startDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Date TBD"}
                  </span>
                </div>

                {/* Metrics Pill */}
                {evt.analytics && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <div>
                      <span className="font-bold text-slate-900">
                        {evt.analytics.views || 0}
                      </span>{" "}
                      Views
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">
                        {evt.analytics.registrations || 0}
                      </span>{" "}
                      Registrations
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">
                        {evt.sections.length}
                      </span>{" "}
                      Sections
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/admin/events/${evt.id}/builder`}
                    className="px-3.5 py-1.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit Builder</span>
                  </Link>

                  <a
                    href={`/events/${evt.slug}?preview=true`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition cursor-pointer"
                    title="Live Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </a>

                  <button
                    onClick={(e) => handleCopyLink(e, evt.slug, evt.id)}
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition cursor-pointer"
                    title="Copy Public URL"
                  >
                    {copiedId === evt.id ? (
                      <Check className="w-4 h-4 text-zinc-900" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setQrModalEvent({
                        url: `${window.location.origin}/events/${evt.slug}`,
                        name: evt.name,
                      })
                    }
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition cursor-pointer"
                    title="View QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleTogglePublish(e, evt.id)}
                    className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg border border-slate-300 text-slate-800 bg-white hover:bg-slate-100 transition cursor-pointer"
                  >
                    {evt.published ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={(e) => handleDuplicate(e, evt.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-lg transition"
                    title="Duplicate Event"
                  >
                    <CopyCheck className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(evt.id)}
                    className="p-1.5 text-slate-400 hover:text-black hover:bg-zinc-100 rounded-lg transition cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No events found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {search
                ? `No events matched your search query "${search}".`
                : "Get started by creating your very first dynamic event landing page."}
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-bold font-mono transition shadow cursor-pointer"
            >
              + Create First Event
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center border border-slate-200 shadow-2xl font-mono">
            <div className="w-12 h-12 bg-zinc-100 text-black rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete this event?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              This action cannot be undone. The public URL will stop resolving immediately.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-zinc-800 shadow-sm cursor-pointer"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Creation Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          loadEvents();
        }}
      />

      {/* QR Modal */}
      {qrModalEvent && (
        <QrModal
          isOpen={true}
          onClose={() => setQrModalEvent(null)}
          eventUrl={qrModalEvent.url}
          eventName={qrModalEvent.name}
        />
      )}
    </div>
  );
};
