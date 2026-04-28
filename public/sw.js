self.addEventListener("install", (e) => {
  e.waitUntil(caches.open("health-os-v1").then((c) => c.addAll(["/", "/index.html"])));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

self.addEventListener("push", (e) => {
  const d = e.data?.json() ?? {};
  self.registration.showNotification(d.title || "HEALTH_OS ALERT", {
    body: d.body || "System notification",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: d.tag || "default",
  });
});
