import React, { useState, useEffect } from "react";
import { Download, Search, Ticket } from "lucide-react";
import { eventStore, type RegistrationRecord } from "../../services/eventStore";
import type { EventDocument } from "../../types/event";

export const RegistrationsPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [events, setEvents] = useState<EventDocument[]>([]);
  const [selectedEventSlug, setSelectedEventSlug] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRegistrations(eventStore.getRegistrations());
    setEvents(eventStore.getEvents());
  }, []);

  const filtered = registrations.filter((r) => {
    const matchesEvent =
      selectedEventSlug === "all" ? true : r.eventSlug === selectedEventSlug;
    const matchesSearch =
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      (r.organization || "").toLowerCase().includes(search.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ["ID", "Event", "Name", "Email", "Phone", "Organization", "Tier", "Price", "Date"];
    const rows = filtered.map((r) => [
      r.id,
      r.eventName,
      r.fullName,
      r.email,
      r.phone || "",
      r.organization || "",
      r.ticketTierName || "",
      r.ticketPrice || "",
      new Date(r.createdAt).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registrations_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Attendee Registrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track delegate sign-ups, ticket tier selections, and institutional registrations.
          </p>
        </div>

        {filtered.length > 0 && (
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Filter Event:</span>
          <select
            value={selectedEventSlug}
            onChange={(e) => setSelectedEventSlug(e.target.value)}
            className="w-full sm:w-64 p-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white outline-none"
          >
            <option value="all">All Events</option>
            {events.map((e) => (
              <option key={e.id} value={e.slug}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="py-3 px-6">Delegate Name</th>
                <th className="py-3 px-6">Event</th>
                <th className="py-3 px-6">Tier & Pass</th>
                <th className="py-3 px-6">Organization</th>
                <th className="py-3 px-6">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{r.fullName}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{r.email}</span>
                      {r.phone && <span>• {r.phone}</span>}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-900 max-w-xs truncate">
                    {r.eventName}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-zinc-100 text-zinc-900 border border-zinc-300">
                      {r.ticketTierName || "Standard Pass"}
                      {r.ticketPrice && ` (${r.ticketPrice})`}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {r.organization || "—"}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No registrations found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {search
                ? `No results matching "${search}".`
                : "Registrations submitted via event pages will appear here in real-time."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
