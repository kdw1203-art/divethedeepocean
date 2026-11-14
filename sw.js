const C='dtdo-723f3397';const SHELL=['/','/manifest.json','/assets/app.723f3397.css','/assets/app.723f3397.js','/assets/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 const data=/\.json$/.test(u.pathname)&&!/manifest/.test(u.pathname);
 if(data){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(h=>{const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r;});return h||f;})));}
 else{e.respondWith(fetch(e.request).then(r=>{if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));}return r;}).catch(()=>caches.match(e.request).then(h=>h||caches.match('index.html'))));}});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{};}catch(x){d={title:'Dive the deep ocean',body:e.data&&e.data.text()};}
 e.waitUntil(self.registration.showNotification(d.title||'Dive the deep ocean',{body:d.body||'',icon:'/assets/icon-192.png',badge:'/assets/icon-192.png',data:{link:d.link||'/'},tag:d.link||'dtdo'}));});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL(e.notification.data&&e.notification.data.link||'/',self.location.origin).href;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(ws=>{for(const w of ws){if(w.url.startsWith(self.location.origin)){w.focus();return w.navigate(u);}}return clients.openWindow(u);}));});
