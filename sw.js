const C='dtdo-8fa77fd8';const SHELL=['/','/manifest.json','/assets/app.8fa77fd8.css','/assets/app.8fa77fd8.js','/assets/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(/^\/api\//.test(u.pathname)||e.request.headers.has('range'))return; /* 외부 데이터 중계(/api) 응답 · 영상 부분 요청은 저장하지 않음: 포인트마다 ~1MB씩 쌓이던 것 */
 const fixed=/^\/assets\/(app|stk|en2)\.[0-9a-f]{8}\./.test(u.pathname); /* 이름에 버전이 붙은 파일은 저장본이 있으면 다시 묻지 않음 */
 const data=/\.json$/.test(u.pathname)&&!/manifest/.test(u.pathname);
 if(fixed||data){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(h=>{if(h&&fixed)return h;const f=fetch(e.request).then(r=>{if(r.ok&&r.status===200)c.put(e.request,r.clone()).catch(()=>{});return r;});if(h){f.catch(()=>{});return h;}return f;})));}
 else{e.respondWith(fetch(e.request).then(r=>{if(r.status===200){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k)).catch(()=>{});}return r;}).catch(()=>caches.match(e.request).then(h=>h||(e.request.mode==='navigate'?caches.match('/'):Response.error()))));}});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{};}catch(x){d={title:'Dive the deep ocean',body:e.data&&e.data.text()};}
 e.waitUntil(self.registration.showNotification(d.title||'Dive the deep ocean',{body:d.body||'',icon:'/assets/icon-192.png',badge:'/assets/icon-192.png',data:{link:d.link||'/'},tag:d.link||'dtdo'}));});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL(e.notification.data&&e.notification.data.link||'/',self.location.origin).href;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(ws=>{for(const w of ws){if(w.url.startsWith(self.location.origin)){w.focus();return w.navigate(u);}}return clients.openWindow(u);}));});
