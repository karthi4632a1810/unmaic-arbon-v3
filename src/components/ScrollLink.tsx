import { Link, type LinkProps, useLocation } from "react-router-dom";
import { isSamePagePath, resolveLinkPath, scrollToPageTop } from "../lib/scrollToTop";

/** In-app link that scrolls to top when the target route is already active. */
export function ScrollLink({ to, onClick, ...props }: LinkProps) {
  const { pathname } = useLocation();
  const targetPath = resolveLinkPath(to);

  return (
    <Link
      {...props}
      to={to}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (isSamePagePath(pathname, targetPath)) {
          event.preventDefault();
          scrollToPageTop();
        }
      }}
    />
  );
}
