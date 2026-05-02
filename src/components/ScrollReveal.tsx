import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Delay (ms) before this block’s transition starts after it enters the viewport */
  delayMs?: number;
  rootMargin?: string;
  threshold?: number;
};

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  rootMargin = "0px 0px -8% 0px",
  threshold = 0.12,
  style,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin, threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion, rootMargin, threshold]);

  const visible = reduceMotion || revealed;

  return (
    <div
      ref={ref}
      className={[
        reduceMotion
          ? ""
          : "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform] motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...style,
        ...(visible && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
