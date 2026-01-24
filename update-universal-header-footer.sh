#!/bin/bash

# سكريبت تحديث الهيدر والفوتر الثابت لجميع صفحات الموقع
# Universal Header & Footer Update Script

echo "🔧 بدء تحديث الهيدر والفوتر الثابت لجميع صفحات الموقع..."

# قائمة جميع الصفحات
all_pages=(
    # الصفحات الرئيسية
    "index.html"
    "sa.html"
    "ae.html"
    "kw.html"
    "qa.html"
    "bh.html"
    "om.html"
    "about.html"
    "contact.html"
    "privacy.html"
    "terms.html"
    "faq.html"
    
    # صفحات الخدمات
    "services/index.html"
    "services/google-ads.html"
    "services/seo.html"
    "services/social-media-ads.html"
    "services/website-design.html"
    "services/ecommerce.html"
    "services/social-management.html"
    "services/contracting-services.html"
    "services/gulf-cities.html"
    "services/safahat-al5dmat.html"
    
    # صفحات المدن
    "cities/riyadh-google-ads.html"
    "cities/jeddah-google-ads.html"
    "cities/dubai-digital-marketing.html"
    "cities/doha-digital-marketing.html"
    "cities/kuwait-digital-marketing.html"
    "cities/manama-digital-marketing.html"
    "cities/abudhabi-digital-marketing.html"
    "cities/dammam-google-ads.html"
    
    # المدونة والمقالات
    "blog/index.html"
    "blog/seo-service.html"
    "blog/google-ads-saudi-guide-2025.html"
    "blog/google-ads-uae-guide-2025.html"
    "blog/google-ads-kuwait-guide-2025.html"
    "blog/google-ads-qatar-guide-2025.html"
    "blog/google-ads-bahrain-guide-2025.html"
    "blog/google-ads-oman-guide-2025.html"
    "blog/tiktok-snapchat-gulf-marketing-2025.html"
    "blog/ecommerce-seo-gulf-optimization.html"
    
    # مقالات المدونة التفصيلية
    "blog/articles/index.html"
    "blog/articles/articles-detailed.html"
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
    
    # صفحات الأمثلة
    "examples/azl-khazanat-jeddah.html"
    "examples/naql-afsh-riyadh.html"
    "examples/pizza-restaurant-kuwait.html"
    "examples/salon-tajmeel-doha.html"
    "examples/siyanat-mukayifat-dubai.html"
    "examples/tandhif-manazil-dammam.html"
)

# دالة إضافة الهيدر والفوتر الثابت
add_universal_header_footer() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        echo "❌ الملف غير موجود: $file"
        return 1
    fi
    
    echo "⚡ تحديث: $file"
    
    # إضافة JavaScript للهيدر والفوتر الثابت
    if ! grep -q "universal-header-footer.js" "$file"; then
        # البحث عن مكان مناسب لإدراج السكريبت
        if grep -q "</body>" "$file"; then
            sed -i '/<\/body>/i\    <!-- Universal Header & Footer -->\n    <script src="/arabsad/assets/js/universal-header-footer.js"></script>' "$file"
        elif grep -q "</html>" "$file"; then
            sed -i '/<\/html>/i\    <!-- Universal Header & Footer -->\n    <script src="/arabsad/assets/js/universal-header-footer.js"></script>' "$file"
        fi
    fi
    
    # إزالة الهيدر والفوتر القديم إذا وجد
    if grep -q 'data-include.*header' "$file"; then
        sed -i '/data-include.*header/d' "$file"
    fi
    
    if grep -q 'data-include.*footer' "$file"; then
        sed -i '/data-include.*footer/d' "$file"
    fi
    
    # إضافة CSS للتأكد من عدم تداخل الهيدر الثابت
    if ! grep -q "body.*padding-top" "$file" && ! grep -q "main.*margin-top" "$file"; then
        if grep -q "<style>" "$file"; then
            sed -i '/<style>/a\        /* Universal Header Spacing */\n        body { padding-top: 80px; }\n        main { margin-top: 0; }' "$file"
        elif grep -q "</head>" "$file"; then
            sed -i '/<\/head>/i\    <style>\n        /* Universal Header Spacing */\n        body { padding-top: 80px; }\n        main { margin-top: 0; }\n    </style>' "$file"
        fi
    fi
    
    echo "✅ تم تحديث: $file"
}

# تحديث جميع الصفحات
echo "📄 تحديث جميع صفحات الموقع..."
updated_count=0
failed_count=0

for page in "${all_pages[@]}"; do
    if add_universal_header_footer "$page"; then
        ((updated_count++))
    else
        ((failed_count++))
    fi
done

echo ""
echo "🎉 تم الانتهاء من تحديث الهيدر والفوتر الثابت!"
echo ""
echo "📊 إحصائيات التحديث:"
echo "  ✅ تم تحديثها بنجاح: $updated_count صفحة"
echo "  ❌ فشل التحديث: $failed_count صفحة"
echo "  📄 إجمالي الصفحات: ${#all_pages[@]}"
echo ""
echo "🔧 الميزات المضافة:"
echo "  ✓ هيدر ثابت في أعلى الصفحة"
echo "  ✓ فوتر ثابت في أسفل الصفحة"
echo "  ✓ تحميل تلقائي للهيدر والفوتر"
echo "  ✓ تحديث الروابط النسبية تلقائياً"
echo "  ✓ تصميم متجاوب للجوال"
echo "  ✓ قائمة تنقل محسنة"
echo ""
echo "📱 ميزات الجوال:"
echo "  ✓ قائمة هامبرغر تفاعلية"
echo "  ✓ إغلاق تلقائي عند النقر خارج القائمة"
echo "  ✓ تصميم محسن للشاشات الصغيرة"
echo ""
echo "🎯 فوائد النظام:"
echo "  • توحيد التصميم عبر الموقع"
echo "  • سهولة التنقل من أي صفحة"
echo "  • تحسين تجربة المستخدم"
echo "  • تحديث مركزي للهيدر والفوتر"
echo "  • تحسين SEO بالروابط الداخلية"
echo ""
echo "💡 للتحقق من النتائج:"
echo "  1. افتح أي صفحة في الموقع"
echo "  2. تأكد من ظهور الهيدر في الأعلى"
echo "  3. تأكد من ظهور الفوتر في الأسفل"
echo "  4. جرب التنقل بين الصفحات"
echo "  5. اختبر القائمة على الجوال"
echo ""
echo "🚀 الهيدر والفوتر الثابت جاهز للعمل في جميع الصفحات!"