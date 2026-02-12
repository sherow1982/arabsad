const fs = require('fs');
const path = require('path');

// Header نظيف
const header = `<header style="position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(10, 14, 39, 0.95); backdrop-filter: blur(10px); padding: 1rem; border-bottom: 1px solid rgba(255, 184, 0, 0.1);">
    <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <a href="/" style="font-size: 1.5rem; font-weight: 800; color: #FFB800; text-decoration: none;">🌐 إعلانات العرب</a>
        <nav style="display: flex; align-items: center; gap: 1.5rem;">
            <a href="/services/" style="color: #e8edf5; text-decoration: none; font-weight: 500;">الخدمات</a>
            <a href="/blog/" style="color: #e8edf5; text-decoration: none; font-weight: 500;">المدونة</a>
            <a href="/about.html" style="color: #e8edf5; text-decoration: none; font-weight: 500;">من نحن</a>
            <a href="/contact.html" style="color: #e8edf5; text-decoration: none; font-weight: 500;">اتصل بنا</a>
            <a href="https://wa.me/201110760081" style="background: #FFB800; color: #000; padding: 0.7rem 1.2rem; border-radius: 25px; font-weight: 600; text-decoration: none;">📞 واتساب</a>
        </nav>
    </div>
</header>
<style>body { padding-top: 80px; }</style>`;

// Footer نظيف
const footer = `<footer style="background: #1a1f3a; padding: 3rem 2rem 1.5rem; margin-top: 4rem;">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div>
            <h3 style="color: #FFB800; margin-bottom: 1rem;">🌐 إعلانات العرب</h3>
            <p style="color: #a8b3c1;">وكالة تسويق رقمي متخصصة في الخليج العربي</p>
        </div>
        <div>
            <h4 style="color: #FFB800; margin-bottom: 1rem;">خدماتنا</h4>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem;"><a href="/services/google-ads.html" style="color: #a8b3c1; text-decoration: none;">إعلانات جوجل</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="/services/seo.html" style="color: #a8b3c1; text-decoration: none;">SEO</a></li>
                <li style="margin-bottom: 0.5rem;"><a href="/services/social-media-ads.html" style="color: #a8b3c1; text-decoration: none;">السوشيال ميديا</a></li>
            </ul>
        </div>
        <div>
            <h4 style="color: #FFB800; margin-bottom: 1rem;">تواصل معنا</h4>
            <p style="color: #a8b3c1;">📞 +201110760081</p>
            <p style="color: #a8b3c1;">📧 sherow1982@gmail.com</p>
        </div>
    </div>
    <div style="border-top: 1px solid rgba(255, 184, 0, 0.2); margin-top: 2rem; padding-top: 1.5rem; text-align: center; color: #a8b3c1;">
        <p>&copy; 2026 إعلانات العرب - جميع الحقوق محفوظة</p>
    </div>
</footer>`;

fs.writeFileSync(path.join(__dirname, '../shared-header.html'), header, 'utf8');
fs.writeFileSync(path.join(__dirname, '../shared-footer.html'), footer, 'utf8');

console.log('✅ تم إصلاح الهيدر والفوتر');
