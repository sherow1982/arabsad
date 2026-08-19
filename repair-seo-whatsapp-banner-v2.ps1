[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$ErrorActionPreference = 'Stop'
$Utf8Bom = [System.Text.UTF8Encoding]::new($true)
$Root = (Get-Location).Path
$ArticleDir = Join-Path $Root 'blog\articles'
$Site = 'https://storesads.shop'
$WhatsApp = '201110760081'
$Banner = '/assets/images/site-banner-arabsad.jpg'
$Logo = '/assets/images/logo-arabsad.jpg'

function Write-Utf8Bom {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, $Utf8Bom)
}

function Add-ArticleDepth {
    param([string]$Html, [string]$Keyword)

    if ($Html -match 'data-seo-depth="v2"') { return $Html }

    $Message = [System.Uri]::EscapeDataString("أريد استشارة حول $Keyword")
    $Cta = '<a class="wa-cta" href="https://wa.me/{0}?text={1}" target="_blank" rel="noopener noreferrer">💬 تحدث مع خبير عبر واتساب</a>' -f $WhatsApp, $Message

    $Extra = @"
<section class="seo-depth" data-seo-depth="v2">
<h2>كيف تتعامل مع $Keyword بطريقة عملية؟</h2>
<p>النجاح لا يبدأ بزيادة الميزانية مباشرة، بل بتحديد هدف واضح مثل المبيعات أو الرسائل أو طلبات عرض السعر. عندما يكون الهدف محدداً يمكن اختيار المنصة والرسالة وطريقة القياس بدقة أكبر.</p>
$Cta
<h3>ابدأ بالعرض والجمهور</h3>
<p>اكتب عرضاً محدداً يوضح الفائدة التي يحصل عليها العميل، ثم حدد الجمهور حسب الحاجة الفعلية والسلوك والموقع الجغرافي بدلاً من الاستهداف الواسع غير المدروس.</p>
$Cta
<h3>اختبر قبل التوسع</h3>
<p>اختبر أكثر من رسالة أو تصميم أو صفحة هبوط بميزانية منضبطة. تغيير عنصر واحد في كل تجربة يساعد على معرفة سبب التحسن أو التراجع.</p>
$Cta
<h2>مؤشرات الأداء المهمة</h2>
<p>راقب تكلفة العميل المحتمل أو الطلب، ومعدل التحويل، وجودة الرسائل، ومتوسط قيمة الطلب. المشاهدات والإعجابات مؤشرات مساعدة لكنها لا تكفي للحكم على الربحية.</p>
$Cta
<h2>أخطاء شائعة يجب تجنبها</h2>
<p>من الأخطاء إطلاق الإعلان قبل تجهيز صفحة هبوط واضحة، أو الاعتماد على تصميم جذاب دون عرض مفهوم، أو إيقاف الحملة قبل جمع بيانات كافية. الأفضل تحديد فترة اختبار ثم اتخاذ القرار وفق الأرقام.</p>
$Cta
<h2>أسئلة شائعة</h2>
<h3>متى تظهر النتيجة؟</h3>
<p>تختلف المدة حسب القناة والمنافسة واستعداد الموقع أو المتجر للتحويل. الإعلانات تقدم بيانات أولية بسرعة، لكن تحسين الأداء يحتاج اختبارات ومراجعة مستمرة.</p>
$Cta
<h3>هل توجد نتيجة مضمونة؟</h3>
<p>لا يمكن ضمان نتيجة محددة لأن الأداء يتأثر بالسوق والمنافسة والعرض وتجربة العميل. العمل الاحترافي يركز على القياس والتحسين وتقليل الهدر.</p>
$Cta
</section>
"@

    return $Html -replace '</main>', ($Extra + "`n</main>")
}

$Header = @"
<header class="site-header" dir="rtl">
<style>
.site-header{position:sticky;top:0;z-index:999;background:#0a0e27;border-bottom:1px solid rgba(255,184,0,.22);font-family:Cairo,sans-serif}
.site-header .wrap{max-width:1200px;margin:auto;padding:10px 18px;display:flex;align-items:center;justify-content:space-between;gap:18px}
.site-header .brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;font-weight:900}
.site-header .brand img{width:44px;height:44px;border-radius:50%;object-fit:cover}
.site-header nav{display:flex;gap:16px;align-items:center;flex-wrap:wrap}.site-header nav a{color:#e8edf5;text-decoration:none;font-weight:700;font-size:.9rem}.site-header .wa{background:#25D366;color:#fff!important;padding:8px 14px;border-radius:22px}
@media(max-width:700px){.site-header .wrap{padding:8px 12px}.site-header nav{gap:9px}.site-header nav a{font-size:.78rem}.site-header .brand span{display:none}}
</style>
<div class="wrap">
<a class="brand" href="/"><img src="$Logo" alt="شعار إعلانات العرب" width="44" height="44"><span>إعلانات العرب</span></a>
<nav aria-label="التنقل الرئيسي"><a href="/">الرئيسية</a><a href="/services/">الخدمات</a><a href="/blog/">المدونة</a><a href="/about.html">من نحن</a><a class="wa" href="https://wa.me/${WhatsApp}?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%B3%D9%88%D9%8A%D9%82%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer">واتساب</a></nav>
</div>
</header>
"@

$Footer = @"
<section class="site-banner-before-footer" dir="rtl">
<style>.site-banner-before-footer{background:#0a0e27;padding:20px 14px 0}.site-banner-before-footer img{display:block;width:100%;max-width:1200px;height:auto;margin:auto;border-radius:16px}</style>
<img src="$Banner" alt="إعلانات العرب - إعلانات احترافية على كل المنصات" loading="lazy" width="1600" height="675">
</section>
<footer style="background:#070b1e;color:#e8edf5;padding:28px 18px;text-align:center;font-family:Cairo,sans-serif" dir="rtl">
<img src="$Logo" alt="شعار إعلانات العرب" width="58" height="58" style="border-radius:50%;object-fit:cover">
<p style="margin:10px 0 5px;font-weight:800">إعلانات العرب</p>
<p style="margin:0;color:#a8b3c1">حلول التسويق الرقمي والإعلانات الممولة للمتاجر والشركات.</p>
<p style="margin:12px 0 0"><a href="https://wa.me/${WhatsApp}?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AA%D8%B3%D9%88%D9%8A%D9%82%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" style="color:#25D366;text-decoration:none;font-weight:800">تواصل عبر واتساب</a></p>
</footer>
"@

Write-Utf8Bom (Join-Path $Root 'shared-header.html') $Header
Write-Utf8Bom (Join-Path $Root 'shared-footer.html') $Footer

$HtmlFiles = Get-ChildItem -Path $Root -Filter '*.html' -Recurse | Where-Object {
    $_.FullName -notlike '*node_modules*' -and $_.Name -ne 'shared-header.html' -and $_.Name -ne 'shared-footer.html'
}
$Updated = 0

foreach ($File in $HtmlFiles) {
    $Html = Get-Content $File.FullName -Raw -Encoding UTF8
    $Original = $Html

    # The broken URL was generated as: https://wa.me/=ENCODED_TEXT
    $Html = $Html -replace 'https://wa\.me/=', "https://wa.me/${WhatsApp}?text="

    # Remove only explicit page-level banner copies. The shared footer keeps one banner before every footer.
    $Html = $Html -replace '(?s)<div style="max-width:1200px;margin:0 auto 22px;padding:0 14px">\s*<img[^>]*site-banner-arabsad\.jpg[^>]*>\s*</div>', ''
    $Html = $Html -replace '(?s)<div style="max-width:1200px;margin:25px auto;padding:0 16px">\s*<img[^>]*site-banner-arabsad\.jpg[^>]*>\s*</div>', ''

    if ($File.FullName.StartsWith($ArticleDir)) {
        $Heading = [regex]::Match($Html, '<h1[^>]*>(.*?)</h1>', 'Singleline').Groups[1].Value
        if ([string]::IsNullOrWhiteSpace($Heading)) { $Heading = [regex]::Match($Html, '<title>(.*?)</title>', 'Singleline').Groups[1].Value }
        $Heading = [regex]::Replace($Heading, '<[^>]+>', '').Trim()
        $Html = Add-ArticleDepth $Html $Heading
    }

    if ($Html -ne $Original) {
        Write-Utf8Bom $File.FullName $Html
        $Updated++
    }
}

$Today = Get-Date -Format 'yyyy-MM-dd'
$Urls = @("$Site/", "$Site/blog/", "$Site/services/")
Get-ChildItem $ArticleDir -Filter '*.html' | ForEach-Object { $Urls += "$Site/blog/articles/$($_.Name)" }
$Xml = @('<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($Url in ($Urls | Select-Object -Unique)) {
    $Xml += "  <url><loc>$Url</loc><lastmod>$Today</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>"
}
$Xml += '</urlset>'
Write-Utf8Bom (Join-Path $Root 'sitemap.xml') ($Xml -join "`n")
Write-Utf8Bom (Join-Path $Root 'robots.txt') "User-agent: *`nAllow: /`n`nSitemap: $Site/sitemap.xml`n"

Write-Host "Repaired $Updated HTML files." -ForegroundColor Green
Write-Host 'WhatsApp links fixed, duplicate banners removed, SEO article sections added, sitemap rebuilt.' -ForegroundColor Green
