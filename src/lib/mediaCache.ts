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

export function mediaCacheKey(prefix: string, sourceUrl: string): string {
  return `${prefix}:${sourceUrl}`;
}

export async function getCachedBlob(cacheKey: string): Promise<Blob | null> {
  try {
    const record = await runTransaction<CachedBlobRecord | undefined>("readonly", (store) =>
      store.get(cacheKey),
    );
    return record?.blob ?? null;
  } catch {
    return null;
  }
}

export async function cacheBlobFromUrl(cacheKey: string, sourceUrl: string): Promise<boolean> {
  try {
    const existing = await getCachedBlob(cacheKey);
    if (existing) return true;

    const response = await fetch(sourceUrl);
    if (!response.ok) return false;

    const blob = await response.blob();
    if (!blob.size) return false;

    await runTransaction<IDBValidKey>("readwrite", (store) =>
      store.put(
        {
          blob,
          mimeType: blob.type || "application/octet-stream",
          cachedAt: Date.now(),
        } satisfies CachedBlobRecord,
        cacheKey,
      ),
    );

    return true;
  } catch {
    return false;
  }
}

export async function cacheManyFromUrls(
  entries: { cacheKey: string; sourceUrl: string }[],
): Promise<void> {
  await Promise.all(entries.map(({ cacheKey, sourceUrl }) => cacheBlobFromUrl(cacheKey, sourceUrl)));
}
