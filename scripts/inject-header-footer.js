const fs = require('fs');
const path = require('path');

// ===== البانر العلوي =====
const TOP_BANNER = `<a href="/shop/" class="top-banner-link" aria-label="متجر إعلانات العرب">
<style>
.top-banner-link{display:block;width:100%;background:#0a0e27;line-height:0;border-bottom:1px solid rgba(255,184,0,.15);overflow:hidden}
.top-banner-link img{width:100%;height:auto;display:block;max-width:100%}
</style>
<img src="/assets/images/top-banner.png" alt="إعلانات العرب - وكالة تسويق رقمي خليجية" loading="eager" fetchpriority="high" width="1070" height="453">
</a>`;

// ===== الهيدر =====
const HEADER_HTML = `<header class="site-header" dir="rtl">
<style>
.site-header{position:sticky;top:0;z-index:999;background:#0a0e27;border-bottom:1px solid rgba(255,184,0,.22);font-family:Cairo,sans-serif}
.site-header .wrap{max-width:1200px;margin:auto;padding:10px 18px;display:flex;align-items:center;justify-content:space-between;gap:18px}
.site-header .brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;font-weight:900}
.site-header .brand img{width:44px;height:44px;border-radius:50%;object-fit:cover}
.site-header nav{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.site-header nav a{color:#e8edf5;text-decoration:none;font-weight:700;font-size:.9rem}
.site-header nav a.shop-link{color:#C9A227!important;font-weight:900}
.site-header .wa{background:#25D366;color:#fff!important;padding:8px 14px;border-radius:22px}
.site-header .mob-toggle{display:none;background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;padding:4px 8px}
@media(max-width:700px){
  .site-header .mob-toggle{display:block}
  .site-header nav{display:none;position:absolute;top:100%;right:0;left:0;background:#0a0e27;flex-direction:column;padding:16px 18px;gap:14px;border-bottom:1px solid rgba(255,184,0,.22)}
  .site-header nav.open{display:flex}
  .site-header .brand span{display:none}
}
</style>
<div class="wrap">
  <a class="brand" href="/">
    <img src="/assets/images/logo-arabsad.jpg" alt="شعار إعلانات العرب" width="44" height="44">
    <span>إعلانات العرب</span>
  </a>
  <button class="mob-toggle" aria-label="القائمة" onclick="this.nextElementSibling.classList.toggle('open');this.textContent=this.nextElementSibling.classList.contains('open')?'✕':'☰'">☰</button>
  <nav aria-label="التنقل الرئيسي">
    <a href="/">الرئيسية</a>
    <a href="/services/">الخدمات</a>
    <a href="/shop/" class="shop-link">🛒 المتجر</a>
    <a href="/blog/">المدونة</a>
    <a href="/about.html">من نحن</a>
    <a class="wa" href="https://wa.me/201110760081?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%B3%D9%88%D9%8A%D9%82%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer">واتساب</a>
  </nav>
</div>
</header>`;

// ===== الفوتر =====
const FOOTER_HTML = `<footer class="site-footer" dir="rtl">
<style>
.site-footer{background:#070b1e;color:#e8edf5;padding:40px 18px 24px;font-family:Cairo,sans-serif;text-align:center}
.site-footer .footer-logo img{width:58px;height:58px;border-radius:50%;object-fit:cover}
.site-footer .footer-name{margin:10px 0 4px;font-weight:900;font-size:1.1rem}
.site-footer .footer-desc{margin:0 0 18px;color:#a8b3c1;font-size:.9rem}
.site-footer .footer-nav{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 20px;margin-bottom:18px}
.site-footer .footer-nav a{color:#a8b3c1;text-decoration:none;font-size:.88rem;transition:color .2s}
.site-footer .footer-nav a:hover{color:#C9A227}
.site-footer .footer-nav a.shop-link{color:#C9A227;font-weight:800}
.site-footer .footer-wa{color:#25D366;text-decoration:none;font-weight:800;font-size:.95rem}
.site-footer .footer-feed{margin:10px 0 0;font-size:.75rem;color:#5a6478}
.site-footer .footer-feed a{color:#4a9eff;text-decoration:none}
.site-footer .footer-copy{margin:16px 0 0;font-size:.75rem;color:#3a4458;border-top:1px solid rgba(255,255,255,.05);padding-top:14px}
.site-footer .footer-address{display:block;margin:18px auto 0;max-width:560px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px 20px;font-style:normal;text-align:center}
.site-footer .footer-address-title{display:block;font-weight:800;color:#C9A227;margin-bottom:8px;font-size:.9rem}
.site-footer .footer-address span{display:block;color:#a8b3c1;font-size:.8rem;line-height:1.8}
.site-footer .footer-email{display:inline-block;margin-top:10px;color:#4a9eff;text-decoration:none;font-weight:700;font-size:.85rem}
.site-footer .footer-email:hover{text-decoration:underline}
.site-footer .footer-contact{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 28px;margin:14px 0 0}
.site-footer .footer-contact a{color:#a8b3c1;text-decoration:none;font-size:.85rem;display:flex;align-items:center;gap:6px;transition:color .2s}
.site-footer .footer-contact a:hover{color:#C9A227}
.site-footer .footer-map{margin:20px auto 0;max-width:600px;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.08)}
.site-footer .footer-map iframe{display:block;width:100%;height:260px;border:0}
</style>
<div class="footer-logo"><img src="/assets/images/logo-arabsad.jpg" alt="شعار إعلانات العرب" width="58" height="58"></div>
<p class="footer-name">إعلانات العرب</p>
<p class="footer-desc">حلول التسويق الرقمي والإعلانات الممولة للمتاجر والشركات في الخليج.</p>
<nav class="footer-nav" aria-label="روابط الفوتر">
  <a href="/">الرئيسية</a>
  <a href="/services/">الخدمات</a>
  <a href="/shop/" class="shop-link">🛒 المتجر</a>
  <a href="/blog/">المدونة</a>
  <a href="/about.html">من نحن</a>
  <a href="/contact.html">تواصل معنا</a>
  <a href="/privacy.html">الخصوصية</a>
</nav>
<p><a class="footer-wa" href="https://wa.me/201110760081?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%B3%D9%88%D9%8A%D9%82%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer">💬 تواصل عبر واتساب</a></p>
<p class="footer-feed">Google Merchant Feed: <a href="/shop/google-merchant-feed.xml" target="_blank">/shop/google-merchant-feed.xml</a></p>
<div class="footer-contact">
  <a href="https://wa.me/201110760081" target="_blank" rel="noopener noreferrer">💬 واتساب: +201110760081</a>
  <a href="tel:+201110760081">📞 +20 111 076 0081</a>
  <a href="mailto:info@storesads.shop">✉️ info@storesads.shop</a>
</div>
<address class="footer-address">
  <span class="footer-address-title">📍 عنوان المؤسسة</span>
  <span>مبنى 69، شقة 3، الحي الأول، المنطقة السادسة</span>
  <span>مدينة السادس من أكتوبر، الجيزة 12566 — جمهورية مصر العربية</span>
  <span>Building 69, Apt. 3, 1st Neighborhood, 6th District, 6th of October City, Giza 12566, Egypt</span>
</address>
<div class="footer-map">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.60544641916!2d30.924408099999994!3d29.938672299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145855f8808491f5%3A0xc71d9bdea768bf6e!2z2LTYsdmD2Kkg2KfYudmE2KfZhtin2Kog2KfZhNi52LHYqA!5e1!3m2!1sar!2seg!4v1787715724520!5m2!1sar!2seg" width="600" height="260" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="موقع مؤسسة إعلانات العرب على الخريطة"></iframe>
</div>
<p class="footer-copy">© 2025 مؤسسة إعلانات العرب — جميع الحقوق محفوظة</p>
</footer>`;

// ===== المجلدات المستهدفة =====
const ROOT = path.join(__dirname, '..');
const DIRS = [
  ROOT,
  path.join(ROOT, 'services'),
  path.join(ROOT, 'shop'),
  path.join(ROOT, 'blog'),
  path.join(ROOT, 'blog', 'articles'),
  path.join(ROOT, 'cities'),
  path.join(ROOT, 'examples'),
];

// ملفات نتجاهلها
const SKIP_FILES = ['shared-header.html', 'shared-footer.html', '404.html', '500.html'];

let updated = 0;
let skipped = 0;

function processFile(filePath) {
  const filename = path.basename(filePath);
  if (SKIP_FILES.includes(filename)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // تحديد prefix للمسارات النسبية حسب عمق الملف
  const rel = path.relative(ROOT, filePath);
  const depth = rel.split(path.sep).length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);

  // الهيدر المحلي (مسارات نسبية)
  const localBanner = TOP_BANNER
    .replace(/href="\//g, `href="${prefix || '/'}`)
    .replace(/src="\//g, `src="${prefix || '/'}`);
  const localHeader = (localBanner + HEADER_HTML)
    .replace(/href="\//g, `href="${prefix || '/'}`)
    .replace(/src="\//g, `src="${prefix || '/'}`);
  const localFooter = FOOTER_HTML
    .replace(/href="\//g, `href="${prefix || '/'}`)
    .replace(/src="\//g, `src="${prefix || '/'}`);

  // استبدال data-include للهيدر
  const headerIncludeRe = /<div[^>]+data-include="[^"]*shared-header\.html"[^>]*><\/div>/gi;
  // استبدال data-include للفوتر
  const footerIncludeRe = /<div[^>]+data-include="[^"]*shared-footer\.html"[^>]*><\/div>/gi;

  let changed = false;

  if (headerIncludeRe.test(html)) {
    html = html.replace(headerIncludeRe, localHeader);
    changed = true;
  }
  if (footerIncludeRe.test(html)) {
    html = html.replace(footerIncludeRe, localFooter);
    changed = true;
  }

  // استبدال الهيدر القديم (بدون بانر) بالبانر + الهيدر
  const existingHeaderRe = /(<header class="site-header"[\s\S]*?<\/header>)/gi;
  if (existingHeaderRe.test(html) && !html.includes('top-banner-link')) {
    html = html.replace(existingHeaderRe, localHeader);
    changed = true;
  }

  // استبدال الفوتر القديم الموجود مباشرة في الصفحات
  const existingFooterRe = /<footer class="site-footer"[\s\S]*?<\/footer>/gi;
  if (!changed && existingFooterRe.test(html)) {
    html = html.replace(existingFooterRe, localFooter);
    changed = true;
  }

  // إذا ما فيه data-include خالص، تحقق إذا فيه هيدر قديم أو مفيش هيدر
  if (!changed) {
    // إذا مفيش هيدر خالص، أضفه بعد <body>
    if (!html.includes('site-header') && html.includes('<body>')) {
      html = html.replace('<body>', `<body>\n${localHeader}`);
      changed = true;
    }
    // إذا مفيش فوتر خالص، أضفه قبل </body>
    if (!html.includes('site-footer') && html.includes('</body>')) {
      html = html.replace('</body>', `${localFooter}\n</body>`);
      changed = true;
    }
  }

  // ===== إصلاح روابط الواتساب المكسورة =====
  // استبدال href="#" على أزرار الواتساب
  html = html.replace(/href="#"([^>]*class="[^"]*(?:wa|whatsapp|cta-wa)[^"]*")/gi,
    'href="https://wa.me/201110760081"$1');
  html = html.replace(/(class="[^"]*(?:wa|whatsapp|cta-wa)[^"]*"[^>]*)href="#"/gi,
    '$1href="https://wa.me/201110760081"');
  // استبدال أي رابط wa.me بالرقم الصحيح
  html = html.replace(/https:\/\/wa\.me\/[0-9]+/g, 'https://wa.me/201110760081');
  // مارك التغيير دائماً لأن إصلاح الواتساب يجب أن يحفظ
  changed = true;

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ ${rel}`);
    updated++;
  } else {
    skipped++;
  }
}

DIRS.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .forEach(f => processFile(path.join(dir, f)));
});

console.log(`\n🎉 تم تحديث ${updated} صفحة | تجاهل ${skipped} صفحة`);
