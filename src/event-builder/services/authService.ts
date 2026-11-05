/**
 * Authentication Service for UNMAI Carbon Admin Portal
 * 
 * Credentials:
 * Username: admin
 * Password: admin@123
 */

export interface AuthUser {
  username: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  rememberMe: boolean;
  expiresAt: number;
}

const AUTH_STORAGE_KEY = "unmai_admin_auth_v3";
const AUTH_EVENT_NAME = "unmai_auth_state_change";

class AuthService {
  private currentSession: AuthSession | null = null;

  constructor() {
    this.loadSession();
  }

  private loadSession(): void {
    if (typeof window === "undefined") return;

    try {
      // Check localStorage first, then sessionStorage
      const raw = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed: AuthSession = JSON.parse(raw);
        // Verify expiry
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          this.currentSession = parsed;
        } else {
          this.logout();
        }
      }
    } catch {
      this.currentSession = null;
    }
  }

  public isAuthenticated(): boolean {
    if (!this.currentSession) {
      this.loadSession();
    }
    return Boolean(this.currentSession && this.currentSession.expiresAt > Date.now());
  }

  public getCurrentUser(): AuthUser | null {
    if (!this.isAuthenticated()) return null;
    return this.currentSession ? this.currentSession.user : null;
  }

  public getToken(): string | null {
    if (!this.isAuthenticated()) return null;
    return this.currentSession ? this.currentSession.token : null;
  }

  public async login(
    usernameInput: string,
    passwordInput: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
    const username = usernameInput.trim();
    const password = passwordInput;

    const DEFAULT_USER: AuthUser = {
      username: "admin",
      name: "Institutional Administrator",
      email: "admin@unmaicarbon.earth",
      role: "Super Administrator",
      lastLogin: new Date().toISOString(),
    };

    // 1. Attempt PHP Backend Authentication
    try {
      const res = await fetch("/api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          username,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          const session: AuthSession = {
            token: data.token,
            user: data.user || DEFAULT_USER,
            rememberMe,
            expiresAt: Date.now() + (rememberMe ? 7 * 24 * 3600 * 1000 : 8 * 3600 * 1000),
          };
          this.saveSession(session, rememberMe);
          return { success: true, user: session.user };
        }
      } else {
        const data = await res.json().catch(() => null);
        return { success: false, error: data?.message || "Invalid username or password" };
      }
    } catch {
      // 2. Offline / Client-side fallback check
      const isUserMatch =
        username.toLowerCase() === "admin" ||
        username.toLowerCase() === "admin@unmaicarbon.earth" ||
        username.toLowerCase() === "admin@unmaicarbon.com";
      const isPassMatch = password === "admin@123";

      if (isUserMatch && isPassMatch) {
        const session: AuthSession = {
          token: "unmai_auth_local_" + Date.now().toString(36),
          user: DEFAULT_USER,
          rememberMe,
          expiresAt: Date.now() + (rememberMe ? 7 * 24 * 3600 * 1000 : 8 * 3600 * 1000),
        };
        this.saveSession(session, rememberMe);
        return { success: true, user: session.user };
      } else {
        return { success: false, error: "Invalid username or password" };
      }
    }

    return { success: false, error: "Invalid credentials" };
  }

  private saveSession(session: AuthSession, rememberMe: boolean): void {
    this.currentSession = session;
    if (typeof window === "undefined") return;

    const payload = JSON.stringify(session);
    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEY, payload);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, payload);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: session }));
  }

  public logout(): void {
    if (typeof window !== "undefined") {
      // Optional notification to backend
      fetch("/api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      }).catch(() => {});

      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      this.currentSession = null;
      window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: null }));
    }
  }

  public subscribe(callback: (session: AuthSession | null) => void): () => void {
    if (typeof window === "undefined") return () => {};

    const handler = (e: any) => {
      callback(e.detail || null);
    };

    window.addEventListener(AUTH_EVENT_NAME, handler);
    return () => window.removeEventListener(AUTH_EVENT_NAME, handler);
  }
}

export const authService = new AuthService();
