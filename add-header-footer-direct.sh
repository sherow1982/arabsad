#!/bin/bash

# سكريبت إضافة الهيدر والفوتر مباشرة في المقالات
# Direct Header & Footer Injection Script

echo "🔧 بدء إضافة الهيدر والفوتر مباشرة في جميع المقالات..."

# قائمة المقالات
articles=(
    "blog/articles/google-ads-comprehensive-guide.html"
    "blog/articles/seo-comprehensive-guide.html"
    "blog/articles/social-media-ads-comprehensive-guide.html"
    "blog/articles/website-design-comprehensive-guide.html"
    "blog/articles/ecommerce-comprehensive-guide.html"
    "blog/articles/facebook-ads.html"
    "blog/articles/instagram-ads.html"
    "blog/articles/snapchat-ads.html"
    "blog/articles/tiktok-ads.html"
    "blog/articles/youtube-ads.html"
    "blog/articles/google-search-ads.html"
    "blog/articles/google-display-ads.html"
    "blog/articles/google-shopping-ads.html"
    "blog/articles/social-media-management-guide.html"
)

# الهيدر HTML
header_html='    <!-- Header -->
    <header style="position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(10, 14, 39, 0.95); backdrop-filter: blur(10px); padding: 1rem; border-bottom: 1px solid rgba(255, 184, 0, 0.1);">
        <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <a href="/arabsad/" style="font-size: 1.5rem; font-weight: 800; color: #FFB800; text-decoration: none;">🌐 إعلانات العرب</a>
            
            <!-- Desktop Menu -->
            <nav class="desktop-menu" style="display: flex; align-items: center; gap: 1.5rem;">
                <a href="/arabsad/services/" style="color: #e8edf5; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">الخدمات</a>
                <a href="/arabsad/blog/" style="color: #e8edf5; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">المدونة</a>
                <a href="/arabsad/about.html" style="color: #e8edf5; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">من نحن</a>
                <a href="https://wa.me/201110760081?text=أريد+استشارة+مجانية" style="background: #FFB800; color: #000; padding: 0.7rem 1.2rem; border-radius: 25px; font-weight: 600; text-decoration: none; font-size: 0.9rem;">📞 استشارة فورية</a>
            </nav>
            
            <!-- Mobile Hamburger -->
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()" style="display: none; background: none; border: none; color: #FFB800; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">
                <span id="hamburger-icon">☰</span>
            </button>
        </div>
        
        <!-- Mobile Menu -->
        <nav id="mobile-menu" class="mobile-menu" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: rgba(10, 14, 39, 0.98); backdrop-filter: blur(15px); border-top: 1px solid rgba(255, 184, 0, 0.2); padding: 1rem;">
            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 1400px; margin: 0 auto;">
                <a href="/arabsad/services/" onclick="closeMobileMenu()" style="color: #e8edf5; text-decoration: none; font-weight: 500; padding: 0.8rem; border-radius: 8px; transition: all 0.3s ease; border: 1px solid transparent;">📋 الخدمات</a>
                <a href="/arabsad/blog/" onclick="closeMobileMenu()" style="color: #e8edf5; text-decoration: none; font-weight: 500; padding: 0.8rem; border-radius: 8px; transition: all 0.3s ease; border: 1px solid transparent;">📚 المدونة</a>
                <a href="/arabsad/about.html" onclick="closeMobileMenu()" style="color: #e8edf5; text-decoration: none; font-weight: 500; padding: 0.8rem; border-radius: 8px; transition: all 0.3s ease; border: 1px solid transparent;">🏢 من نحن</a>
                <a href="https://wa.me/201110760081?text=أريد+استشارة+مجانية" onclick="closeMobileMenu()" style="background: #FFB800; color: #000; padding: 1rem; border-radius: 8px; font-weight: 600; text-decoration: none; text-align: center; margin-top: 0.5rem;">📞 استشارة فورية</a>
            </div>
        </nav>
    </header>'

# الفوتر HTML
footer_html='    <!-- Footer -->
    <footer style="background: #1a1f3a; padding: 3rem 2rem 1.5rem; margin-top: 4rem;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
            <div>
                <h3 style="color: #FFB800; margin-bottom: 1rem;">🌐 إعلانات العرب</h3>
                <p style="color: #a8b3c1; margin-bottom: 1rem;">وكالة تسويق رقمي متخصصة في Google Ads وFacebook Ads وSEO</p>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://wa.me/201110760081" style="color: #a8b3c1; text-decoration: none; padding: 0.5rem; border-radius: 5px; transition: all 0.3s ease;">📱 واتساب</a>
                    <a href="mailto:info@arabsad.com" style="color: #a8b3c1; text-decoration: none; padding: 0.5rem; border-radius: 5px; transition: all 0.3s ease;">📧 إيميل</a>
                </div>
            </div>
            <div>
                <h4 style="color: #FFB800; margin-bottom: 1rem;">خدماتنا</h4>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/services/google-ads.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">إعلانات جوجل</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/services/social-media-ads.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">إعلانات السوشيال ميديا</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/services/seo.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">تحسين محركات البحث</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/services/social-management.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">إدارة وسائل التواصل</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/services/website-design.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">تصميم المواقع</a></li>
                </ul>
            </div>
            <div>
                <h4 style="color: #FFB800; margin-bottom: 1rem;">المدونة</h4>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/blog/" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">📚 جميع المقالات</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/blog/articles/google-ads-comprehensive-guide.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">دليل Google Ads</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/blog/articles/seo-comprehensive-guide.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">دليل SEO</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/blog/articles/social-media-ads-comprehensive-guide.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">إعلانات السوشيال</a></li>
                </ul>
            </div>
            <div>
                <h4 style="color: #FFB800; margin-bottom: 1rem;">الشركة</h4>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/about.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">🏢 من نحن</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/contact.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">📞 اتصل بنا</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/privacy.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">🔒 سياسة الخصوصية</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="/arabsad/terms.html" style="color: #a8b3c1; text-decoration: none; transition: color 0.3s ease;">📋 شروط الخدمة</a></li>
                </ul>
            </div>
        </div>
        <div style="border-top: 1px solid rgba(255, 184, 0, 0.2); margin-top: 2rem; padding-top: 1.5rem; text-align: center; color: #a8b3c1;">
            <p>&copy; 2026 إعلانات العرب - جميع الحقوق محفوظة</p>
            <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                <a href="/arabsad/privacy.html" style="color: #a8b3c1; text-decoration: none; font-size: 0.9rem;">سياسة الخصوصية</a>
                <a href="/arabsad/terms.html" style="color: #a8b3c1; text-decoration: none; font-size: 0.9rem;">شروط الخدمة</a>
                <a href="/arabsad/contact.html" style="color: #a8b3c1; text-decoration: none; font-size: 0.9rem;">اتصل بنا</a>
            </div>
            <p style="margin-top: 1rem;">📞 +201110760081 | 📧 info@arabsad.com</p>
        </div>
    </footer>'

# JavaScript للقائمة المتجاوبة
mobile_js='        // Mobile Menu Functions
        function toggleMobileMenu() {
            const menu = document.getElementById("mobile-menu");
            const icon = document.getElementById("hamburger-icon");
            
            if (menu.style.display === "none" || menu.style.display === "") {
                menu.style.display = "block";
                icon.textContent = "✕";
            } else {
                menu.style.display = "none";
                icon.textContent = "☰";
            }
        }

        function closeMobileMenu() {
            document.getElementById("mobile-menu").style.display = "none";
            document.getElementById("hamburger-icon").textContent = "☰";
        }

        // Close mobile menu when clicking outside
        document.addEventListener("click", function(event) {
            const menu = document.getElementById("mobile-menu");
            const btn = document.querySelector(".mobile-menu-btn");
            
            if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
                closeMobileMenu();
            }
        });
        
        // Mobile responsive styles
        const mobileStyles = `
            @media (max-width: 768px) {
                .desktop-menu { display: none !important; }
                .mobile-menu-btn { display: block !important; }
                .mobile-menu a:hover {
                    background: rgba(255, 184, 0, 0.1) !important;
                    border-color: rgba(255, 184, 0, 0.3) !important;
                    color: #FFB800 !important;
                }
            }
            @media (min-width: 769px) {
                .desktop-menu a:hover { color: #FFB800 !important; }
            }
        `;
        
        const styleSheet = document.createElement("style");
        styleSheet.textContent = mobileStyles;
        document.head.appendChild(styleSheet);'

# دالة إضافة الهيدر والفوتر
add_header_footer() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        echo "❌ الملف غير موجود: $file"
        return 1
    fi
    
    echo "⚡ تحديث: $file"
    
    # إضافة padding-top للـ body
    if ! grep -q "padding-top.*80px" "$file"; then
        sed -i 's/body {/body {\n            padding-top: 80px;/' "$file"
    fi
    
    # إضافة الهيدر بعد <body>
    if ! grep -q "إعلانات العرب" "$file"; then
        sed -i "/<body>/a\\$header_html" "$file"
    fi
    
    # إضافة الفوتر قبل </body>
    if ! grep -q "جميع الحقوق محفوظة" "$file"; then
        sed -i "/<\/body>/i\\$footer_html" "$file"
    fi
    
    # إضافة JavaScript للقائمة المتجاوبة
    if ! grep -q "toggleMobileMenu" "$file"; then
        sed -i "/window.addEventListener.*scroll/i\\$mobile_js" "$file"
    fi
    
    echo "✅ تم تحديث: $file"
}

# تحديث جميع المقالات
updated_count=0
failed_count=0

for article in "${articles[@]}"; do
    if add_header_footer "$article"; then
        ((updated_count++))
    else
        ((failed_count++))
    fi
done

echo ""
echo "🎉 تم الانتهاء من إضافة الهيدر والفوتر للمقالات!"
echo ""
echo "📊 إحصائيات التحديث:"
echo "  ✅ تم تحديثها بنجاح: $updated_count مقال"
echo "  ❌ فشل التحديث: $failed_count مقال"
echo "  📄 إجمالي المقالات: ${#articles[@]}"
echo ""
echo "🔧 الميزات المضافة:"
echo "  ✓ هيدر ثابت في أعلى كل مقال"
echo "  ✓ فوتر شامل في أسفل كل مقال"
echo "  ✓ قائمة تنقل متجاوبة للجوال"
echo "  ✓ روابط داخلية قوية"
echo "  ✓ تصميم موحد عبر الموقع"
echo ""
echo "🚀 الآن جميع المقالات لها هيدر وفوتر ثابت!"