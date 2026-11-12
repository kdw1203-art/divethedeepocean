const C='dtdo-c2b0310f';const SHELL=['/','/manifest.json','/assets/app.c2b0310f.css','/assets/app.c2b0310f.js','/assets/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 const data=/\.json$/.test(u.pathname)&&!/manifest/.test(u.pathname);
 if(data){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(h=>{const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r;});return h||f;})));}
 else{e.respondWith(fetch(e.request).then(r=>{if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));}return r;}).catch(()=>caches.match(e.request).then(h=>h||caches.match('index.html'))));}});
