const fs = require('fs');
const path = require('path');
const SHOP = path.join(__dirname, '..', 'shop');

const INLINE_CHECKOUT = `<button id="btnOrderNow" class="btn-cart btn-order-now">⚡ اطلب الآن مباشرة</button>
    </div>

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

const STICKY_BAR = `\n<!-- Sticky Order Bar -->\n<div id="stickyOrderBar" class="sticky-order-bar">\n  <span class="price">$1,000</span>\n  <button class="btn-sticky btn-sticky-gold">⚡ اطلب الآن</button>\n  <a href="https://wa.me/201110760081" class="btn-sticky btn-sticky-wa" target="_blank">💬 واتساب</a>\n</div>\n`;

const files = fs.readdirSync(SHOP).filter(f => f.endsWith('.html') && !['index.html','checkout.html','order-success.html'].includes(f));

files.forEach(filename => {
  const fp = path.join(SHOP, filename);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // إضافة inline checkout إذا مش موجود
  if (!html.includes('id="inlineCheckout"')) {
    // استبدال زر checkout القديم
    html = html.replace(
      /<a href="[^"]*checkout\.html[^"]*"[^>]*>[\s\S]{0,50}اطلب الآن[\s\S]{0,10}<\/a>/,
      INLINE_CHECKOUT
    );
    changed = true;
  }

  // إضافة sticky bar إذا مش موجود
  if (!html.includes('stickyOrderBar')) {
    html = html.replace('<footer class="site-footer"', STICKY_BAR + '<footer class="site-footer"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log(`✅ ${filename}`);
  } else {
    console.log(`⏭️ ${filename} (لا يحتاج تحديث)`);
  }
});
