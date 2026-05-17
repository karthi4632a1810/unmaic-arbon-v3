const DB_NAME = "namdu-v3-media";
const DB_VERSION = 1;
const STORE_NAME = "blobs";

type CachedBlobRecord = {
  blob: Blob;
  mimeType: string;
  cachedAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

function runTransaction<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode);
        const store = tx.objectStore(STORE_NAME);
        const request = run(store);

        request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"));
        request.onsuccess = () => resolve(request.result as T);

        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          reject(tx.error ?? new Error("IndexedDB transaction failed"));
          db.close();
        };
        tx.onabort = () => {
          reject(tx.error ?? new Error("IndexedDB transaction aborted"));
          db.close();
        };
      }),
  );
}

/** Cache key includes the asset URL so new builds invalidate old entries. */
export function heroVideoCacheKey(sourceUrl: string): string {
  return `hero-background:${sourceUrl}`;
}

export async function getCachedHeroVideo(sourceUrl: string): Promise<Blob | null> {
  try {
    const record = await runTransaction<CachedBlobRecord | undefined>("readonly", (store) =>
      store.get(heroVideoCacheKey(sourceUrl)),
    );
    return record?.blob ?? null;
  } catch {
    return null;
  }
}

export async function cacheHeroVideoFromUrl(sourceUrl: string): Promise<boolean> {
  try {
    const existing = await getCachedHeroVideo(sourceUrl);
    if (existing) return true;

    const response = await fetch(sourceUrl);
    if (!response.ok) return false;

    const blob = await response.blob();
    if (!blob.size) return false;

    await runTransaction<IDBValidKey>("readwrite", (store) =>
      store.put(
        {
          blob,
          mimeType: blob.type || "video/mp4",
          cachedAt: Date.now(),
        } satisfies CachedBlobRecord,
        heroVideoCacheKey(sourceUrl),
      ),
    );

    return true;
  } catch {
    return false;
  }
}
