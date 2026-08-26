const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// ===== إصلاح البانر =====
const OLD_BANNER_RE = /<a[^>]+class="top-banner-link"[\s\S]*?<\/a>/g;

const NEW_BANNER = `<a href="/shop/" class="top-banner-link" aria-label="متجر إعلانات العرب" target="_blank"><style>.top-banner-link{display:block;width:100%;background:#0a0e27;line-height:0;border-bottom:1px solid rgba(255,184,0,.15)}.top-banner-link img{width:100%;height:auto;display:block}</style><img src="/assets/images/top-banner.png" alt="إعلانات العرب" loading="eager" fetchpriority="high" width="1070" height="453"></a>`;

// ===== الأقسام =====
const DIRS = [
  ROOT,
  path.join(ROOT,'services'),
  path.join(ROOT,'shop'),
  path.join(ROOT,'blog'),
  path.join(ROOT,'blog','articles'),
  path.join(ROOT,'cities'),
  path.join(ROOT,'examples'),
];

const SKIP = ['shared-header.html','shared-footer.html','404.html','500.html'];

let bannerFixed = 0;

DIRS.forEach(dir => {
  if(!fs.existsSync(dir)) return;
  fs.readdirSync(dir).filter(f=>f.endsWith('.html')&&!SKIP.includes(f)).forEach(f=>{
    const fp = path.join(dir,f);
    let html = fs.readFileSync(fp,'utf8');
    const rel = path.relative(ROOT,fp);
    const depth = rel.split(path.sep).length - 1;
    const prefix = depth===0 ? '' : '../'.repeat(depth);

    // إصلاح البانر — استبدال أي نسخة قديمة
    if(html.includes('top-banner-link')){
      const localBanner = NEW_BANNER
        .replace(/href="\//g, `href="${prefix||'/'}`)
        .replace(/src="\//g, `src="${prefix||'/'}`);
      html = html.replace(OLD_BANNER_RE, localBanner);
      fs.writeFileSync(fp, html, 'utf8');
      console.log(`🖼️  ${rel}`);
      bannerFixed++;
    }
  });
});

console.log(`\n✅ بانر: ${bannerFixed} صفحة`);

// ===== إصلاح بطاقات المتجر =====
const shopIndex = path.join(ROOT,'shop','index.html');
let shopHtml = fs.readFileSync(shopIndex,'utf8');

// استبدال كل shop-card بنسخة قابلة للنقر بالكامل
// نبحث عن كل بطاقة ونضيف position:relative + overlay link
shopHtml = shopHtml.replace(
  /<div class="shop-card"(\s*style="[^"]*")?>/g,
  '<div class="shop-card" style="position:relative;cursor:pointer">'
);

// نحول shop-card-btn من <a> عادي إلى overlay + زر
// نضيف CSS للـ overlay
if(!shopHtml.includes('shop-card-overlay-css')){
  shopHtml = shopHtml.replace(
    '</style>',
    `.shop-card-overlay{position:absolute;inset:0;z-index:0;display:block}
.shop-card-body,.shop-card-img,.shop-card-badge,.shop-card-btn,.shop-card-rating{position:relative;z-index:1}
/* id للـ style tag */
</style>`
  );
}

// لكل بطاقة، نستخرج href من shop-card-btn ونضيف overlay
const cardLinks = [
  ['/shop/google-ads.html', 'إدارة حملات Google Ads'],
  ['/shop/social-media-ads.html', 'إعلانات السوشيال ميديا'],
  ['/shop/seo.html', 'تحسين محركات البحث'],
  ['/shop/website-design.html', 'تصميم المواقع'],
  ['/shop/ecommerce.html', 'المتاجر الإلكترونية'],
  ['/shop/social-management.html', 'إدارة السوشيال ميديا'],
  ['/shop/landing-page.html', 'صفحات الهبوط'],
  ['/shop/maps-alternative.html', 'بديل خرائط جوجل'],
];

cardLinks.forEach(([href, label])=>{
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  // أضف overlay قبل shop-card-img مباشرة لكل بطاقة تحتوي على هذا الرابط
  shopHtml = shopHtml.replace(
    new RegExp(`(position:relative;cursor:pointer">)(?!\\s*<a class="shop-card-overlay")([\\s\\S]{0,50}${escapedHref.replace(/\//g,'\\/')}[\\s\\S]{0,200}?<div class="shop-card-img">)`,''),
    `$1\n      <a class="shop-card-overlay" href="${href}" target="_blank" aria-label="${label}"></a>$2`
  );
});

fs.writeFileSync(shopIndex, shopHtml, 'utf8');
console.log('🛒 shop/index.html — بطاقات قابلة للنقر بالكامل');
