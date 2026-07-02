/**
 * IndexedDB-backed offline content store.
 *
 * Usage:
 *   import { offlineStore } from "@/lib/offline-store";
 *   await offlineStore.saveBundle(bundle);              // save downloaded bundle
 *   const bundle = await offlineStore.getBundle(cId, g); // read offline bundle
 *   const status = await offlineStore.getStatus();       // { curricula: { [cId]: { [grade]: timestamp } } }
 *   await offlineStore.removeBundle(cId, g);             // delete one bundle
 *   await offlineStore.clear();                          // delete everything
 */

const DB_NAME = "academy-offline";
const DB_VERSION = 1;
const STORE_BUNDLES = "bundles"; // keyPath: [curriculumId, grade]

interface BundleRecord {
  curriculumId: string;
  grade: number;
  curriculumName: string;
  savedAt: number;
  sizeBytes: number;
  bundle: any;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB not available"));
  }
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_BUNDLES)) {
        const store = db.createObjectStore(STORE_BUNDLES, {
          keyPath: ["curriculumId", "grade"],
        });
        store.createIndex("curriculumId", "curriculumId", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function tx<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T> | Promise<T>
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE_BUNDLES, mode);
        const store = t.objectStore(STORE_BUNDLES);
        const result = fn(store);
        if (result instanceof Promise) {
          result.then(resolve, reject);
        } else {
          result.onsuccess = () => resolve(result.result);
          result.onerror = () => reject(result.error);
        }
      })
  );
}

export const offlineStore = {
  async saveBundle(bundle: any): Promise<void> {
    const rec: BundleRecord = {
      curriculumId: bundle.curriculum.id,
      grade: bundle.grade,
      curriculumName: bundle.curriculum.name,
      savedAt: Date.now(),
      sizeBytes: JSON.stringify(bundle).length,
      bundle,
    };
    await tx("readwrite", (store) => store.put(rec));
  },

  async getBundle(curriculumId: string, grade: number): Promise<any | null> {
    try {
      const rec = await tx<BundleRecord>("readonly", (store) =>
        store.get([curriculumId, grade])
      );
      return rec ? rec.bundle : null;
    } catch {
      return null;
    }
  },

  async getAll(): Promise<BundleRecord[]> {
    try {
      return await tx<BundleRecord[]>("readonly", (store) => store.getAll());
    } catch {
      return [];
    }
  },

  async removeBundle(curriculumId: string, grade: number): Promise<void> {
    await tx("readwrite", (store) => store.delete([curriculumId, grade]));
  },

  async clear(): Promise<void> {
    await tx("readwrite", (store) => store.clear());
  },

  async estimateStorage(): Promise<{ usage: number; quota: number } | null> {
    if (typeof navigator === "undefined" || !navigator.storage?.estimate) {
      return null;
    }
    const est = await navigator.storage.estimate();
    return { usage: est.usage ?? 0, quota: est.quota ?? 0 };
  },
};
