import { cacheBlobFromUrl, cacheManyFromUrls, getCachedBlob, mediaCacheKey } from "./mediaCache";

export function teamImageCacheKey(sourceUrl: string): string {
  return mediaCacheKey("team-image", sourceUrl);
}

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
