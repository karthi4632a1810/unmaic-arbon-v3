import { useEffect, useState } from "react";
import { cacheTeamImageFromUrl, getCachedTeamImage } from "../lib/teamImageCache";

/**
 * Serves a team image from IndexedDB when cached; otherwise uses the bundled URL
 * and persists the blob for the next visit.
 */
export function useCachedImageUrl(sourceUrl: string | undefined) {
  const [displayUrl, setDisplayUrl] = useState<string | undefined>(sourceUrl);

  useEffect(() => {
    if (!sourceUrl) {
      setDisplayUrl(undefined);
      return;
    }

    let objectUrl: string | null = null;
    let cancelled = false;

    const syncFromCache = async () => {
      const cached = await getCachedTeamImage(sourceUrl);
      if (cancelled) return;

      if (cached) {
        objectUrl = URL.createObjectURL(cached);
        setDisplayUrl(objectUrl);
        return;
      }

      setDisplayUrl(sourceUrl);

      const stored = await cacheTeamImageFromUrl(sourceUrl);
      if (cancelled || !stored) return;

      const blob = await getCachedTeamImage(sourceUrl);
      if (cancelled || !blob) return;

      objectUrl = URL.createObjectURL(blob);
      setDisplayUrl(objectUrl);
    };

    void syncFromCache();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [sourceUrl]);

  return displayUrl;
}
