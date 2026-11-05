import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  LayoutTemplate,
  Image,
  Ticket,
  Settings,
  ExternalLink,
  Sparkles,
  LogOut,
} from "lucide-react";
import { authService } from "../../services/authService";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login", { replace: true });
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "All Events", href: "/admin/events", icon: Calendar },
    { label: "Templates", href: "/admin/templates", icon: LayoutTemplate },
    { label: "Media Library", href: "/admin/media", icon: Image },
    { label: "Registrations", href: "/admin/registrations", icon: Ticket },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-sm shadow-md font-mono">
                UC
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-white leading-none font-mono">
                  UNMAI CMS
                </div>
                <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                  Event Builder Studio
                </div>
              </div>
            </Link>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/20">
              ENTERPRISE
            </span>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1">
            <div className="px-3 pt-3 pb-1 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
              Manage
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-semibold transition ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Public site link */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/events/extending-legacy-cdm-cers-webinar"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-medium transition"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>View Live Event</span>
            </span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>

          <Link
            to="/"
            className="block text-center text-xs text-zinc-400 hover:text-white transition font-mono"
          >
            ← Back to UNMAI Carbon Home
          </Link>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center font-bold font-mono text-white text-xs shrink-0">
                AD
              </div>
              <div className="truncate">
                <div className="font-semibold text-zinc-200 truncate font-mono text-[11px]">
                  {currentUser?.name || "Administrator"}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono truncate">
                  {currentUser?.email || "admin@unmaicarbon.earth"}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-zinc-800/60 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition cursor-pointer shrink-0"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
};
