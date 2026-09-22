import { Link, type LinkProps, useLocation } from "react-router-dom";
import { isSamePagePath, resolveLinkPath, scrollToPageTop } from "../lib/scrollToTop";
import { scrollToHash } from "../lib/scrollToHash";

function extractHash(to: LinkProps["to"]): string {
  if (typeof to === "string") {
    const idx = to.indexOf("#");
    return idx !== -1 ? to.slice(idx) : "";
  }
  if (typeof to === "object" && to && "hash" in to) {
    return to.hash || "";
  }
  return "";
}

/** In-app link that scrolls to target hash or top when clicked. */
export function ScrollLink({ to, onClick, ...props }: LinkProps) {
  const { pathname } = useLocation();
  const targetPath = resolveLinkPath(to);
  const targetHash = extractHash(to);

  return (
    <Link
      {...props}
      to={to}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (isSamePagePath(pathname, targetPath)) {
          event.preventDefault();
          if (targetHash) {
            if (window.location.hash !== targetHash) {
              window.history.pushState(null, "", `${targetPath}${targetHash}`);
            }
            void scrollToHash(targetHash, { smooth: true });
          } else {
            scrollToPageTop();
          }
        }
      }}
    />
  );
}

