import {
  cacheBlobFromUrl,
  cacheManyFromUrls,
  deleteCachedBlob,
  getCachedBlob,
  mediaCacheKey,
} from "./mediaCache";

export function teamImageCacheKey(sourceUrl: string): string {
  return mediaCacheKey("team-image-v2", sourceUrl);
}

// Invalidate legacy cached entries in IndexedDB & localStorage
void (async () => {
  try {
    await deleteCachedBlob("team-image:/team/Rimi_Pathak.png");
    await deleteCachedBlob("team-image:/team/Rimi_Pathak_400.png");
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("rimi");
      localStorage.removeItem("Rimi_Pathak");
      localStorage.removeItem("team_photos");
    }
  } catch {}
})();

export async function getCachedTeamImage(sourceUrl: string): Promise<Blob | null> {
  return getCachedBlob(teamImageCacheKey(sourceUrl));
}

export async function cacheTeamImageFromUrl(sourceUrl: string): Promise<boolean> {
  return cacheBlobFromUrl(teamImageCacheKey(sourceUrl), sourceUrl);
}

export async function cacheTeamImagesFromUrls(sourceUrls: string[]): Promise<void> {
  const unique = [...new Set(sourceUrls)];
  await cacheManyFromUrls(
    unique.map((sourceUrl) => ({
      cacheKey: teamImageCacheKey(sourceUrl),
      sourceUrl,
    })),
  );
}
