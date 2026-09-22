import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "../lib/scrollToHash";
import { scrollToPageTop } from "../lib/scrollToTop";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If URL contains a section hash (e.g. #counter), scroll to that section
    if (hash) {
      void scrollToHash(hash, { smooth: true });
      return;
    }

    // Check if window.location.hash has a hash that React Router might not have processed yet
    if (window.location.hash) {
      void scrollToHash(window.location.hash, { smooth: true });
      return;
    }

    // Otherwise scroll to top on page route change
    scrollToPageTop();
  }, [pathname, hash]);

  // Handle in-page hash changes (e.g. clicking anchor tags or browser back/forward between hashes)
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        void scrollToHash(window.location.hash, { smooth: true });
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}

