import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { authService } from "../../services/authService";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect to admin destination
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const from = (location.state as any)?.from?.pathname || "/admin/events";
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleQuickFill = () => {
    setUsername("admin");
    setPassword("admin@123");
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim()) {
      setErrorMessage("Please enter your admin username or email");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your admin password");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.login(username, password, rememberMe);

      if (result.success) {
        const from = (location.state as any)?.from?.pathname || "/admin/events";
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || "Invalid username or password");
      }
    } catch {
      setErrorMessage("An unexpected authentication error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 px-6 py-5 flex items-center justify-between border-b border-zinc-800/80 bg-black/40 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xs font-mono shadow-sm group-hover:scale-105 transition-transform">
            UC
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white font-mono block leading-none">
              UNMAI CARBON
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
              SOVEREIGN CLIMATE SUITE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
            SYSTEM STATUS: SECURE
          </span>
          <Link
            to="/events/extending-legacy-cdm-cers-webinar"
            className="ml-3 text-xs font-mono text-zinc-400 hover:text-white transition px-3 py-1 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-950"
          >
            Public Site →
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Card Title & Icon */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-6 h-6 text-zinc-200" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-mono">
              Admin Gateway
            </h1>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Sign in with institutional credentials to access the Event Builder & CMS studio.
            </p>
          </div>

          {/* Quick Credential Helper Pill */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 flex items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="text-zinc-500 block">DEMO CREDENTIALS:</span>
                <span className="font-bold text-white">admin</span> /{" "}
                <span className="font-bold text-white">admin@123</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white hover:text-black text-zinc-300 text-[10px] font-bold transition cursor-pointer border border-white/10 flex items-center gap-1 shrink-0"
              title="Autofill admin / admin@123"
            >
              <Sparkles className="w-3 h-3" />
              <span>Autofill</span>
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2.5 text-xs font-mono animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-zinc-400 mb-1.5">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-white placeholder-zinc-500 text-xs font-mono font-medium focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono font-bold uppercase text-zinc-400">
                  Password
                </label>
                <span className="text-[10px] font-mono text-zinc-500">Required</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-white placeholder-zinc-500 text-xs font-mono font-medium focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-200 transition cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-zinc-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-white accent-white cursor-pointer"
                />
                <span>Remember this workstation</span>
              </label>

              <span className="text-[10px] font-mono text-zinc-500">Session: 7 Days</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 active:scale-[0.99] text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Footnote */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>End-to-End Encrypted Admin Session</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 border-t border-zinc-900 bg-black/60 text-center text-xs font-mono text-zinc-500">
        © 2026 UNMAI Carbon Solutions Pte. Ltd. All rights reserved.
      </footer>
    </div>
  );
};
