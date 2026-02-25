const CACHE_NAME = 'growth-assistant-v2';
// 定义需要离线缓存的资源（包括你的 CDN 链接）
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.staticfile.org/react/18.2.0/umd/react.production.min.js',
  'https://cdn.staticfile.org/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdn.staticfile.org/recharts/2.12.2/Recharts.min.js',
  'https://cdn.staticfile.org/babel-standalone/7.23.5/babel.min.js'
];

// 安装阶段：把资源存入手机本地缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 拦截请求：优先使用缓存，即使服务器挂了也能打开
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

});
