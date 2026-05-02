import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export type ImpactCounterProps = {
  end: number;
  /** Count from this whole number (inclusive); default 0 */
  start?: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places (e.g. for currency-style); default 0 for whole numbers */
  decimals?: number;
  /** Pad integer part with leading zeros (e.g. 2 → 01, 02) */
  minIntegerDigits?: number;
  durationMs?: number;
  className?: string;
};

export function ImpactCounter({
  end,
  start: startProp = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  minIntegerDigits,
  durationMs = 2000,
  className,
}: ImpactCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const start = Math.min(startProp, end);
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(() =>
    reduceMotion ? end : start,
  );

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(end);
      return;
    }
    setDisplay(start);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, end, start]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!active) return;

    const span = end - start;
    if (span <= 0) {
      setDisplay(end);
      return;
    }

    let startTs: number | null = null;
    let raf = 0;
    const easeOut = (t: number) => 1 - (1 - t) ** 3;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const p = Math.min(1, (ts - startTs) / durationMs);
      const eased = easeOut(p);
      const raw = start + eased * span;
      if (p >= 1) {
        setDisplay(end);
        return;
      }
      if (decimals > 0) {
        setDisplay(Number(raw.toFixed(decimals)));
      } else {
        setDisplay(Math.floor(raw));
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, start, end, decimals, durationMs, reduceMotion]);

  const rounded = Math.round(display);
  let text: string;
  if (decimals > 0) {
    text = display.toFixed(decimals);
  } else if (minIntegerDigits != null && minIntegerDigits > 0) {
    text = String(rounded).padStart(minIntegerDigits, "0");
  } else {
    text = String(rounded);
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
