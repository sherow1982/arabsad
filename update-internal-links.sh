#!/bin/bash

# نص تحديث الروابط الداخلية لجميع صفحات الموقع
# Internal Links Update Script for ArabSad Website

echo "🔗 بدء تحديث نظام الباك لنك الداخلي..."

# قائمة الصفحات المطلوب تحديثها
pages=(
    "services/google-ads.html"
    "services/seo.html"
    "services/social-media-ads.html"
    "services/website-design.html"
    "services/ecommerce.html"
    "services/social-management.html"
    "sa.html"
    "ae.html"
    "kw.html"
    "qa.html"
    "bh.html"
    "om.html"
    "cities/riyadh-google-ads.html"
    "cities/jeddah-google-ads.html"
    "cities/dubai-digital-marketing.html"
    "cities/doha-digital-marketing.html"
    "cities/kuwait-digital-marketing.html"
    "cities/manama-digital-marketing.html"
    "blog/index.html"
)

# إضافة نظام الباك لنك لكل صفحة
for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "⚡ تحديث: $page"
        
        # البحث عن موقع إدراج السكريبت
        if grep -q "assets/js/final-optimizer.js" "$page"; then
            # إضافة السكريبت بعد final-optimizer.js
            sed -i '/assets\/js\/final-optimizer.js/a\    <!-- Internal Linking System -->\n    <script src="/arabsad/assets/js/internal-linking.js"></script>' "$page"
        elif grep -q "</body>" "$page"; then
            # إضافة السكريبت قبل إغلاق body
            sed -i '/<\/body>/i\    <!-- Internal Linking System -->\n    <script src="/arabsad/assets/js/internal-linking.js"></script>' "$page"
        fi
        
        echo "✅ تم تحديث: $page"
    else
        echo "❌ الملف غير موجود: $page"
    fi
done

echo "🎉 تم الانتهاء من تحديث نظام الباك لنك الداخلي!"
echo "📊 تم تحديث ${#pages[@]} صفحة"
echo ""
echo "🔍 الميزات المضافة:"
echo "  ✓ ربط تلقائي للكلمات المفتاحية"
echo "  ✓ قسم الصفحات ذات الصلة"
echo "  ✓ مسار التنقل (Breadcrumbs)"
echo "  ✓ تتبع النقرات الداخلية"
echo "  ✓ تحسين SEO وتوزيع Link Juice"
echo ""
echo "📈 النتائج المتوقعة:"
echo "  • تحسين ترتيب الصفحات في محركات البحث"
echo "  • زيادة وقت البقاء في الموقع"
echo "  • تحسين تجربة المستخدم"
echo "  • توزيع أفضل لقوة الروابط"