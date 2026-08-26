const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SHOP = path.join(ROOT, 'shop');

// بيانات كل منتج
const PRODUCTS = {
  'social-media-ads.html': { id:'social-media-ads', name:'إعلانات السوشيال ميديا الاحترافية', price:1000 },
  'seo.html':              { id:'seo', name:'تحسين محركات البحث SEO الاحترافي', price:1000 },
  'website-design.html':   { id:'website-design', name:'تصميم المواقع الاحترافية', price:1000 },
  'ecommerce.html':        { id:'ecommerce', name:'تصميم المتاجر الإلكترونية الاحترافية', price:1000 },
  'social-management.html':{ id:'social-management', name:'إدارة حسابات السوشيال ميديا', price:1000 },
  'landing-page.html':     { id:'landing-page', name:'تصميم صفحات الهبوط Landing Page', price:1000 },
  'maps-alternative.html': { id:'maps-alternative', name:'بديل خرائط جوجل الاحترافي', price:1000 },
};

const INLINE_CHECKOUT = `
    <!-- INLINE CHECKOUT -->
    <div id="inlineCheckout" class="inline-checkout">
      <div class="inline-checkout-title">📋 إتمام الطلب</div>
      <form id="inlineOrderForm">
        <div class="ic-row">
          <div class="ic-form-group"><label>الاسم الكامل *</label><input type="text" id="icName" placeholder="محمد أحمد" required></div>
          <div class="ic-form-group"><label>البريد الإلكتروني *</label><input type="email" id="icEmail" placeholder="example@email.com" required></div>
        </div>
        <div class="ic-row">
          <div class="ic-form-group">
            <label>الدولة *</label>
            <select id="icCountry" required>
              <option value="">-- اختر دولتك --</option>
              <option value="SA">🇸🇦 السعودية</option>
              <option value="AE">🇦🇪 الإمارات</option>
              <option value="KW">🇰🇼 الكويت</option>
              <option value="QA">🇶🇦 قطر</option>
              <option value="BH">🇧🇭 البحرين</option>
              <option value="OM">🇴🇲 عُمان</option>
              <option value="EG">🇪🇬 مصر</option>
            </select>
          </div>
          <div class="ic-form-group"><label>المدينة *</label><select id="icCity" required><option value="">-- اختر المدينة --</option></select></div>
        </div>
        <div class="ic-form-group">
          <label>رقم الجوال *</label>
          <input type="tel" id="icPhone" placeholder="اختر الدولة أولاً" required>
          <span class="ic-phone-hint" id="icPhoneHint"></span>
        </div>
        <div class="ic-form-group"><label>اسم الشركة / النشاط</label><input type="text" id="icCompany" placeholder="شركة النجاح"></div>
        <div class="ic-form-group"><label>ملاحظات</label><textarea id="icNotes" rows="2" placeholder="أي تفاصيل إضافية..."></textarea></div>
        <div class="ic-form-group">
          <label>طريقة الدفع</label>
          <div class="ic-payment">
            <label class="ic-pay-opt"><input type="radio" name="icPayment" value="واتساب - تحويل بنكي" checked> 💬 واتساب</label>
            <label class="ic-pay-opt"><input type="radio" name="icPayment" value="فيزا / ماستركارد"> 💳 فيزا</label>
            <label class="ic-pay-opt"><input type="radio" name="icPayment" value="STC Pay"> 📱 STC Pay</label>
            <label class="ic-pay-opt"><input type="radio" name="icPayment" value="مدى"> 🏦 مدى</label>
          </div>
        </div>
        <button type="submit" class="ic-submit">✅ تأكيد الطلب عبر واتساب</button>
        <p class="ic-secure">🔒 بياناتك محمية — سيتم التواصل معك فور الإرسال</p>
      </form>
    </div>`;

const STICKY_BAR = `\n<!-- Sticky Order Bar (Mobile) -->\n<div id="stickyOrderBar" class="sticky-order-bar">\n  <span class="price">$1,000</span>\n  <button class="btn-sticky btn-sticky-gold">⚡ اطلب الآن</button>\n  <a href="https://wa.me/201110760081" class="btn-sticky btn-sticky-wa" target="_blank">💬 واتساب</a>\n</div>\n`;

let updated = 0;

Object.entries(PRODUCTS).forEach(([filename, product]) => {
  const filePath = path.join(SHOP, filename);
  if (!fs.existsSync(filePath)) { console.log(`⚠️ مش موجود: ${filename}`); return; }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. استبدال أزرار cart-actions بالنسخة الجديدة مع inline checkout
  const oldActionsRe = /<div class="cart-actions">[\s\S]*?<\/div>\s*<\/div>\s*<!-- معلومات/;
  // نبحث عن نهاية cart-actions بطريقة أبسط
  if (!html.includes('id="inlineCheckout"')) {
    // استبدال زر "اطلب الآن مباشرة" القديم بالزر الجديد + inline checkout
    html = html.replace(
      /<a href="[^"]*checkout[^"]*"[^>]*>[\s\S]*?اطلب الآن مباشرة[\s\S]*?<\/a>/,
      `<button id="btnOrderNow" class="btn-cart btn-order-now">⚡ اطلب الآن مباشرة</button>\n    </div>${INLINE_CHECKOUT}`
    );
    // إذا ما اشتغل، نحاول بطريقة ثانية
    if (!html.includes('id="inlineCheckout"')) {
      html = html.replace(
        '</div>\n\n<!-- تبويبات',
        `${INLINE_CHECKOUT}\n  </div>\n\n<!-- تبويبات`
      );
    }
  }

  // 2. إضافة sticky bar قبل <footer
  if (!html.includes('stickyOrderBar')) {
    html = html.replace('<footer class="site-footer"', STICKY_BAR + '<footer class="site-footer"');
  }

  // 3. تحديث initProductPage بالـ id الصحيح
  html = html.replace(
    /initProductPage\(\{[\s\S]*?\}\);/,
    `initProductPage({\n  id:'${product.id}',\n  name:'${product.name}',\n  price:${product.price},\n  url:window.location.href\n});`
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${filename}`);
  updated++;
});

// 4. تحديث shop/index.html - جعل البطاقات قابلة للنقر بالكامل
const indexPath = path.join(SHOP, 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  // إضافة shop-card-link داخل كل بطاقة إذا مش موجودة
  if (!html.includes('shop-card-link')) {
    // كل shop-card تحتوي على رابط في shop-card-btn، نضيف overlay link
    html = html.replace(
      /<div class="shop-card">/g,
      '<div class="shop-card" style="position:relative">'
    );
    // نحول shop-card-btn إلى anchor ونضيف overlay
    const cards = [
      { btn: 'href="/shop/google-ads.html"', overlay: '/shop/google-ads.html' },
      { btn: 'href="/shop/social-media-ads.html"', overlay: '/shop/social-media-ads.html' },
      { btn: 'href="/shop/seo.html"', overlay: '/shop/seo.html' },
      { btn: 'href="/shop/website-design.html"', overlay: '/shop/website-design.html' },
      { btn: 'href="/shop/ecommerce.html"', overlay: '/shop/ecommerce.html' },
      { btn: 'href="/shop/social-management.html"', overlay: '/shop/social-management.html' },
      { btn: 'href="/shop/landing-page.html"', overlay: '/shop/landing-page.html' },
      { btn: 'href="/shop/maps-alternative.html"', overlay: '/shop/maps-alternative.html' },
    ];
    // أضف CSS للـ overlay في <style> الموجود
    html = html.replace(
      '.shop-card:hover{',
      '.shop-card-overlay{position:absolute;inset:0;z-index:0;}\n.shop-card-btn,.shop-card-rating{position:relative;z-index:1;}\n.shop-card:hover{'
    );
    // أضف overlay link بعد كل <div class="shop-card"
    cards.forEach(({overlay}) => {
      const escaped = overlay.replace(/\//g, '\\/');
      html = html.replace(
        new RegExp(`(<div class="shop-card"[^>]*>)(?!\\s*<a class="shop-card-overlay")`),
        `$1\n      <a class="shop-card-overlay" href="${overlay}" aria-label="عرض المنتج"></a>`
      );
    });
  }
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`✅ shop/index.html (بطاقات قابلة للنقر)`);
}

console.log(`\n🎉 تم تحديث ${updated + 1} صفحة`);
