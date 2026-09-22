/**
 * Bulletproof hash scrolling utility for UNMAI Carbon.
 * Resolves section IDs, handles aliases, accounts for fixed header offsets,
 * and retries across React hydration, mounting, and dynamic layout shifts.
 */

// Aliases that point to the homepage counter section
const COUNTER_ALIASES = new Set([
  "counter",
  "countdown",
  "cdm-counter",
  "cdm-countdown",
  "cdm",
  "timer",
]);

/**
 * Resolves an element corresponding to a hash or section ID.
 */
export function getElementByHash(rawHash: string): HTMLElement | null {
  if (!rawHash) return null;
  const id = decodeURIComponent(rawHash).replace(/^#/, "").trim().toLowerCase();
  if (!id) return null;

  // 1. Direct ID match (case-preserving first, then lowercase)
  const exact = document.getElementById(id) || document.getElementById(rawHash.replace(/^#/, "").trim());
  if (exact) return exact;

  // 2. Check for counter section aliases
  if (COUNTER_ALIASES.has(id)) {
    const counterEl =
      document.getElementById("counter") ||
      document.querySelector<HTMLElement>('[data-section="counter"]');
    if (counterEl) return counterEl;
  }

  // 3. Fallback to querySelector by ID, name or data-section attribute
  const fallback =
    document.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"]`) ||
    document.querySelector<HTMLElement>(`[name="${CSS.escape(id)}"]`) ||
    document.querySelector<HTMLElement>(`[data-section="${CSS.escape(id)}"]`);

  return fallback;
}

/**
 * Calculates the current sticky/fixed header offset dynamically.
 */
export function getHeaderOffset(): number {
  const header = document.querySelector<HTMLElement>("header");
  if (!header) return 80;
  const rect = header.getBoundingClientRect();
  // Provide comfortable breathing room below the floating nav
  return Math.max(70, Math.round(rect.height + 20));
}

interface ScrollOptions {
  smooth?: boolean;
  maxRetries?: number;
  onComplete?: () => void;
}

/**
 * Scrolls to the given hash with layout shift stabilization and retry polling.
 * Returns a promise resolving to true if target element was scrolled to.
 */
export function scrollToHash(hash: string, options: ScrollOptions = {}): Promise<boolean> {
  const { smooth = true, maxRetries = 15, onComplete } = options;

  return new Promise((resolve) => {
    let attempt = 0;
    let userInterrupted = false;

    // Abort automatic positioning if the user manually starts scrolling or interacting
    const onUserInteraction = () => {
      userInterrupted = true;
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("wheel", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };

    window.addEventListener("wheel", onUserInteraction, { passive: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true });
    window.addEventListener("pointerdown", onUserInteraction, { passive: true });
    window.addEventListener("keydown", onUserInteraction, { passive: true });

    const executeScroll = () => {
      if (userInterrupted) {
        cleanup();
        resolve(false);
        return;
      }

      const el = getElementByHash(hash);

      if (el) {
        const headerOffset = getHeaderOffset();
        const targetY = Math.max(0, window.scrollY + el.getBoundingClientRect().top - headerOffset);

        window.scrollTo({
          top: targetY,
          behavior: smooth ? "smooth" : "auto",
        });

        // Stabilizer: hero videos, fonts, and responsive margins (like syncHeroMargin)
        // may shift layout during the first 1000ms. Keep verifying and snap if shifted.
        let stabilizationChecks = 0;
        const interval = setInterval(() => {
          if (userInterrupted || stabilizationChecks >= 5) {
            clearInterval(interval);
            cleanup();
            onComplete?.();
            resolve(true);
            return;
          }

          stabilizationChecks++;
          const currentHeaderOffset = getHeaderOffset();
          const currentTop = el.getBoundingClientRect().top;
          const drift = Math.abs(currentTop - currentHeaderOffset);

          // If the element has shifted by more than 16px due to late layout changes
          if (drift > 16) {
            const correctedY = Math.max(
              0,
              window.scrollY + currentTop - currentHeaderOffset
            );
            window.scrollTo({
              top: correctedY,
              behavior: "smooth",
            });
          }
        }, 200);

        return;
      }

      attempt++;
      if (attempt < maxRetries) {
        // Staggered polling: fast initially (40ms), then 100ms
        const delay = attempt < 5 ? 40 : 100;
        setTimeout(executeScroll, delay);
      } else {
        cleanup();
        resolve(false);
      }
    };

    // Trigger on next animation frame to ensure current render pass has committed
    requestAnimationFrame(executeScroll);
  });
}
