import React, { useState } from "react";
import { RefreshCw, Shield, Database, Check, Server } from "lucide-react";
import { eventStore } from "../../services/eventStore";

export const AdminSettingsPage: React.FC = () => {
  const [resetDone, setResetDone] = useState(false);

  const handleResetSeeds = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the event data? This will restore the official 'Extending the Utility of Legacy UNFCCC CDM CERs' event."
      )
    ) {
      eventStore.resetToSeeds();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 3000);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Settings & Platform Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure global application defaults, API connections, and seed state.
        </p>
      </div>

      {/* Platform Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Event Builder Architecture</h3>
            <p className="text-xs text-slate-500">Production-Ready Template-Driven Dynamic CMS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-700">
          <div>
            <span className="font-semibold text-slate-500 block">Dynamic Route URL:</span>
            <span className="font-mono text-zinc-900 font-bold">/events/:eventSlug</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">Preview Route URL:</span>
            <span className="font-mono text-zinc-900 font-bold">/events/:eventSlug?preview=true</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">Schema Version:</span>
            <span className="font-mono text-slate-900 font-bold">v1.2 (Structured Predefined Sections)</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">Autosave Status:</span>
            <span className="text-zinc-900 font-bold flex items-center gap-1 font-mono">
              <Check className="w-3.5 h-3.5" /> Active (Debounced 600ms)
            </span>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Roles & Permissions (RBAC)</h3>
            <p className="text-xs text-slate-500">Built-in permission levels</p>
          </div>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="font-bold text-slate-900">Super Admin:</span> Full control over system, database seeding, templates, and publishing.
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-black text-white font-mono">
              Active Session
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="font-bold text-slate-900">Event Admin:</span> Create, edit, and publish events.
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-700 font-mono">
              Enabled
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="font-bold text-slate-900">Editor:</span> Edit event content and media; cannot unpublish or delete.
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-700 font-mono">
              Enabled
            </span>
          </div>
        </div>
      </div>

      {/* Reset Seed Data */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Seed Data Management</h3>
            <p className="text-xs text-slate-500">Restore factory sample events anytime</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          Resetting will restore the official pre-configured event: <code className="font-mono text-black font-bold">/events/extending-legacy-cdm-cers-webinar</code> (Extending the Utility of Legacy UNFCCC CDM CERs).
        </p>

        <button
          onClick={handleResetSeeds}
          className="px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm cursor-pointer font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${resetDone ? "animate-spin" : ""}`} />
          <span>{resetDone ? "Seeds Restored Successfully!" : "Restore Default Seed Events"}</span>
        </button>
      </div>
    </div>
  );
};
