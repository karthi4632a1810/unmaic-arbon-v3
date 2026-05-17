import { cacheBlobFromUrl, getCachedBlob, mediaCacheKey } from "./mediaCache";

export function heroVideoCacheKey(sourceUrl: string): string {
  return mediaCacheKey("hero-background", sourceUrl);
}

export async function getCachedHeroVideo(sourceUrl: string): Promise<Blob | null> {
  return getCachedBlob(heroVideoCacheKey(sourceUrl));
}

export async function cacheHeroVideoFromUrl(sourceUrl: string): Promise<boolean> {
  return cacheBlobFromUrl(heroVideoCacheKey(sourceUrl), sourceUrl);
}
