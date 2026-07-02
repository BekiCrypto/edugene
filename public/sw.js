/**
 * EduGene Service Worker — caches the app shell and Academy API responses for offline use.
 * Strategy:
 *   - App shell (HTML/JS/CSS): stale-while-revalidate
 *   - Academy API (non-auth): cache-first for offline persistence
 *   - Auth API & NextAuth: NEVER cache (always network-only)
 *   - Other requests: network-first, fallback to cache
 */

const CACHE_VERSION = "edugene-v2";
const APP_SHELL = ["/", "/logo.svg", "/manifest.json"];

// Paths that must NEVER be cached (auth, session, dynamic user data)
const NEVER_CACHE = [
  "/api/auth/",
  "/api/academy/progress",
  "/api/academy/achievements",
  "/api/academy/badges",
  "/api/academy/quests",
  "/api/academy/streak",
  "/api/academy/dashboard",
  "/api/academy/tts",
  "/api/academy/ai-tutor",
  "/api/academy/flashcards",
  "/api/academy/notes",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_VERSION)
            .map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // NEVER cache auth endpoints — always network-only
  if (NEVER_CACHE.some((p) => url.pathname.startsWith(p))) {
    return; // Let the browser handle it normally
  }

  // Academy API (content only): cache-first for offline use
  if (url.pathname.startsWith("/api/academy/")) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async (cache) => {
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((resp) => {
            if (resp.ok) cache.put(request, resp.clone());
            return resp;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // App shell: network-first (always get fresh HTML), fallback to cache for offline
  // This prevents stale auth pages from being served
  event.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      try {
        const resp = await fetch(request);
        if (resp.ok && (resp.type === "basic" || resp.type === "default")) {
          cache.put(request, resp.clone());
        }
        return resp;
      } catch {
        return (await cache.match(request)) || Response.error();
      }
    })
  );
});
