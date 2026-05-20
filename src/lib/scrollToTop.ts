export function scrollToPageTop() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  window.scrollTo({ top: 0, left: 0, behavior });
}

export function resolveLinkPath(to: string | { pathname?: string }): string {
  if (typeof to === "string") return to.split("#")[0] || "/";
  return to.pathname?.split("#")[0] || "/";
}

export function isSamePagePath(currentPath: string, targetPath: string): boolean {
  return currentPath === targetPath;
}
