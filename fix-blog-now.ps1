$ErrorActionPreference = 'Stop'

$root = (Get-Location).Path
$blogDir = Join-Path $root 'blog'
$articlesDir = Join-Path $blogDir 'articles'
$assetsDir = Join-Path $root 'assets\images'

if (!(Test-Path $articlesDir)) {
    New-Item -ItemType Directory -Path $articlesDir -Force | Out-Null
}

$wa = '201110760081'
$site = 'https://storesads.shop'
$banner = '/assets/images/site-banner-arabsad.jpg'
$logo = '/assets/images/logo-arabsad.jpg'

$articles = @(
    @{
        Slug = 'sharikat-taswiq-social-media'
        Keyword = 'شركات تسويق سوشيال ميديا'
        Title = 'كيف تختار أفضل شركات تسويق سوشيال ميديا لعملك؟'
        Description = 'دليل عملي لاختيار شركة تسويق سوشيال ميديا، قياس النتائج الحقيقية، وبناء حملة تحول التفاعل إلى مبيعات.'
        Category = 'سوشيال ميديا'
        Content = @(
            'تساعد شركات تسويق سوشيال ميديا المتاجر والشركات على الوصول إلى جمهور مناسب عبر المحتوى والحملات الممولة، لكن الفرق الحقيقي لا يكون في عدد المنشورات بل في وجود خطة تربط المحتوى بهدف تجاري واضح.'
            'عند اختيار شركة تسويق، اطلب تقارير واضحة عن تكلفة اكتساب العميل، عدد الطلبات، ونسبة التحويل. الإعجابات وحدها لا تعني أن الحملة مربحة أو أن الجمهور مستعد للشراء.'
            'تنجح الحملة عندما تتكامل إدارة المحتوى مع الإعلانات المدفوعة وإعادة الاستهداف، بحيث يرى العميل رسالة متناسقة منذ أول إعلان حتى إتمام الطلب.'
        )
    },
    @{
        Slug = 'sharikat-elan-w-taswiq'
        Keyword = 'شركات اعلان وتسويق'
        Title = 'شركات اعلان وتسويق: كيف تبني حملة متكاملة من الصفر؟'
        Description = 'تعرف على دور شركات الإعلان والتسويق في بناء استراتيجية تجمع المحتوى والإعلانات والتحليل لتحقيق مبيعات قابلة للقياس.'
        Category = 'استراتيجية'
        Content = @(
            'شركات اعلان وتسويق المتكاملة لا تكتفي بتشغيل إعلان، بل تبدأ بفهم المنتج والجمهور والمنافسين قبل اختيار المنصة والرسالة المناسبة.'
            'الحملة المتكاملة تجمع بين صفحة هبوط واضحة، محتوى عضوي يشرح القيمة، وحملات مدفوعة تستهدف الأشخاص الأكثر احتمالاً للشراء.'
            'قبل الاتفاق مع أي شركة، افصل دائمًا بين رسوم الإدارة وميزانية الإعلان، وحدد مؤشرات الأداء التي ستراجعها شهريًا.'
        )
    },
    @{
        Slug = 'elan-mamol-snapchat'
        Keyword = 'اعلان ممول في سناب شات'
        Title = 'كيف تطلق اعلان ممول في سناب شات بنتائج فعلية؟'
        Description = 'خطوات إعداد إعلان سناب شات ممول، تركيب البيكسل، اختيار النوع المناسب، وضبط الميزانية للاختبار.'
        Category = 'سناب شات'
        Content = @(
            'نجاح اعلان ممول في سناب شات يعتمد على محتوى عمودي سريع يجذب الانتباه خلال الثواني الأولى، وليس على إعادة استخدام فيديو صمم لمنصة أخرى.'
            'ركّب Snap Pixel قبل بدء الحملة حتى تتبع الزيارات والطلبات، وتتمكن المنصة من تحسين الاستهداف بناءً على البيانات الفعلية.'
            'ابدأ بميزانية اختبار صغيرة لمدة أسبوع، واختبر أكثر من نسخة إعلانية قبل زيادة الإنفاق على النسخة الأفضل.'
        )
    },
    @{
        Slug = 'elan-mamol-facebook'
        Keyword = 'الاعلان الممول على فيس بوك'
        Title = 'الاعلان الممول على فيس بوك: كيف تحول الميزانية إلى مبيعات؟'
        Description = 'دليل مبسط لهيكلة حملات فيسبوك، استهداف الجمهور، اختبار الإعلانات، وإعادة الاستهداف.'
        Category = 'فيسبوك'
        Content = @(
            'الاعلان الممول على فيس بوك يعطيك قدرة واسعة على اختبار شرائح الجمهور، لكن البداية الصحيحة تكون بتحديد هدف الحملة بدقة: مبيعات أو عملاء محتملون أو وعي بالعلامة.'
            'قسّم الجمهور إلى مجموعات إعلانية صغيرة بدل وضع كل الاهتمامات في مجموعة واحدة، ثم قارن تكلفة التحويل بين كل شريحة.'
            'إعادة استهداف زوار الموقع والمتفاعلين مع المحتوى تساعد على خفض تكلفة العميل لأنهم عرفوا علامتك مسبقًا.'
        )
    },
    @{
        Slug = 'sharikat-taswiq-montajat-alghayr'
        Keyword = 'شركة تسويق منتجات الغير'
        Title = 'شركة تسويق منتجات الغير: كيف يعمل نموذج الدروبشيبينغ؟'
        Description = 'فهم عملي لنموذج تسويق منتجات الغير والدروبشيبينغ، التحديات، وكيف تتفوق على المنافسين.'
        Category = 'تجارة إلكترونية'
        Content = @(
            'شركة تسويق منتجات الغير تساعد التاجر على تسويق منتجات لا يخزنها بنفسه، بينما يتولى المورد تنفيذ الشحن والتوصيل للعميل.'
            'التحدي الأكبر هو أن المنتج قد يكون متاحًا عند تجار آخرين، لذلك يصبح التميز في العرض والإعلان وخدمة العملاء هو العامل الحاسم.'
            'اختبر المنتج بإعلانات منخفضة الميزانية، وتأكد من سرعة المورد وجودة الشحن قبل توسيع حجم الإنفاق.'
        )
    },
    @{
        Slug = 'sharikat-mashaheer-taswiq'
        Keyword = 'شركة مشاهير للتسويق'
        Title = 'شركة مشاهير للتسويق: متى تحتاج التسويق بالمؤثرين؟'
        Description = 'دليل لاختيار المؤثر المناسب وقياس عائد التسويق بالمشاهير من المبيعات الفعلية.'
        Category = 'مؤثرون'
        Content = @(
            'شركة مشاهير للتسويق تساعد العلامات التجارية على اختيار مؤثر يتوافق جمهوره فعليًا مع المنتج، وليس فقط من يملك رقم متابعين كبير.'
            'المؤثرون المتوسطون غالبًا يقدمون تفاعلًا أعلى وتكلفة مناسبة، خصوصًا للمتاجر الصغيرة والمتوسطة التي تريد اختبار السوق.'
            'استخدم كود خصم أو رابط تتبع منفصل لكل مؤثر لتعرف عدد المبيعات الناتجة عن التعاون بشكل دقيق.'
        )
    },
    @{
        Slug = 'maktab-taswiq-montajat'
        Keyword = 'مكتب تسويق منتجات'
        Title = 'مكتب تسويق منتجات: ما الخدمات التي يجب أن يقدمها لك؟'
        Description = 'تعرف على خدمات مكتب تسويق المنتجات من التصوير وكتابة الوصف إلى إدارة الإعلانات والتحليل.'
        Category = 'منتجات'
        Content = @(
            'مكتب تسويق منتجات احترافي يبدأ من تجهيز صور ووصف المنتج، ثم يبني عرضًا واضحًا يساعد العميل على فهم الفائدة قبل رؤية الإعلان.'
            'وصف المنتج الجيد يجيب عن أسئلة العميل ويعالج اعتراضاته، ما يقلل التخلي عن سلة الشراء ويرفع نسبة التحويل.'
            'بعد تجهيز المحتوى، يختبر المكتب الإعلانات عبر أكثر من منصة ثم ينقل الميزانية تدريجيًا للقناة الأكثر ربحية.'
        )
    },
    @{
        Slug = 'sharikat-taswiq-alamiya'
        Keyword = 'شركات تسويق عالمية'
        Title = 'شركات تسويق عالمية أم محلية: كيف تقرر لعملك؟'
        Description = 'مقارنة بين شركات التسويق العالمية والشركات المحلية المتخصصة في السوق العربي.'
        Category = 'مقارنة'
        Content = @(
            'شركات تسويق عالمية قد تناسب الأنشطة التي تستهدف أسواقًا متعددة ولغات متنوعة، لكنها ليست الخيار الأفضل تلقائيًا لكل متجر أو شركة.'
            'الشركة المحلية تفهم اللهجة والعادات الشرائية في السوق العربي، وتستطيع صياغة رسالة أقرب للجمهور المستهدف.'
            'اختر شريكك حسب موقع جمهورك، طبيعة منتجك، وجودة التقارير والمتابعة وليس بناءً على حجم اسم الشركة فقط.'
        )
    },
    @{
        Slug = 'afdal-mawqe-taswiq-elektroni'
        Keyword = 'افضل موقع تسويق الكتروني'
        Title = 'كيف تجد افضل موقع تسويق الكتروني لمشروعك؟'
        Description = 'معايير اختيار موقع أو منصة تسويق إلكتروني مناسبة لنشاطك التجاري وميزانيتك.'
        Category = 'تسويق إلكتروني'
        Content = @(
            'لا يوجد افضل موقع تسويق الكتروني يصلح لجميع الأنشطة، فالاختيار يعتمد على هدفك وهل تريد مبيعات مباشرة أو عملاء محتملين أو بناء وعي بالعلامة.'
            'ابحث عن أدوات واضحة لتتبع الزيارات والتحويلات وتكلفة اكتساب العميل، لأن هذه الأرقام أهم من الوعود العامة.'
            'المنصات الذاتية تناسب من يملك وقتًا وخبرة، بينما الشريك التسويقي المتخصص يناسب من يريد إدارة متكاملة للحملات.'
        )
    },
    @{
        Slug = 'elan-snap-mamol'
        Keyword = 'اعلان سناب ممول'
        Title = 'اعلان سناب ممول: أي نوع يناسب هدف حملتك؟'
        Description = 'دليل أنواع إعلانات سناب شات الممولة وكيف تختار النوع والميزانية المناسبة للمتجر أو النشاط.'
        Category = 'سناب شات'
        Content = @(
            'اعلان سناب ممول يمكن أن يكون فيديو قصيرًا أو عرض منتجات أو إعلان قصص، واختيار النوع يعتمد على هدف الحملة وطبيعة المنتج.'
            'إعلانات Collection مناسبة للمتاجر التي تريد عرض أكثر من منتج، بينما Snap Ads تناسب عرضًا سريعًا أو فيديو يشرح الفائدة.'
            'اختبر الإبداع الإعلاني والجمهور قبل زيادة الميزانية، وتابع معدل إكمال المشاهدة والنقرات والتحويلات.'
        )
    }
)

function New-ArticleHtml {
    param(
        [hashtable]$Article,
        [string]$Whatsapp,
        [string]$Site,
        [string]$Banner
    )

    $canonical = "$Site/blog/articles/$($Article.Slug).html"
    $paragraphs = ''

    foreach ($paragraph in $Article.Content) {
        $message = [System.Uri]::EscapeDataString("أريد استشارة حول $($Article.Keyword)")
        $paragraphs += @"
<p>$paragraph</p>
<a class="wa-cta" href="https://wa.me/$Whatsapp?text=$message" target="_blank" rel="noopener noreferrer">💬 استفسر عبر واتساب</a>
"@
    }

    return @"
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>$($Article.Title) | إعلانات العرب</title>
<meta name="description" content="$($Article.Description)">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="$canonical">
<meta property="og:type" content="article">
<meta property="og:title" content="$($Article.Title) | إعلانات العرب">
<meta property="og:description" content="$($Article.Description)">
<meta property="og:image" content="$Site$Banner">
<meta property="og:url" content="$canonical">
<meta property="og:site_name" content="إعلانات العرب">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="$($Article.Title) | إعلانات العرب">
<meta name="twitter:description" content="$($Article.Description)">
<meta name="twitter:image" content="$Site$Banner">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/css/universal-header-footer.css">
<style>
:root{--bg:#0a0e27;--card:#1a1f3a;--gold:#ffb800;--muted:#a8b3c1;--green:#25d366}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:#e8edf5;font-family:Cairo,sans-serif;line-height:1.9}
main{max-width:850px;margin:96px auto 45px;padding:0 18px}
h1{color:var(--gold);font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.55}
h2{color:var(--gold);margin-top:2rem}.lead{color:var(--muted);font-size:1.05rem}
.hero-image{width:100%;height:auto;border-radius:16px;margin:18px 0 24px;display:block}
.wa-cta{display:inline-block;background:var(--green);color:white;text-decoration:none;font-weight:800;padding:9px 16px;border-radius:24px;margin:0 0 22px}
.banner-wrap{max-width:1100px;margin:0 auto 25px;padding:0 18px}.banner-wrap img{display:block;width:100%;height:auto;border-radius:14px}
.related{background:var(--card);border:1px solid rgba(255,184,0,.2);padding:22px;border-radius:14px;margin-top:26px}.related a{color:var(--gold)}
</style>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","headline":"$($Article.Title)","description":"$($Article.Description)","image":"$Site$Banner","datePublished":"2026-08-19","dateModified":"2026-08-19","author":{"@type":"Organization","name":"إعلانات العرب"},"publisher":{"@type":"Organization","name":"إعلانات العرب","logo":{"@type":"ImageObject","url":"$Site/assets/images/logo-arabsad.jpg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"$canonical"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"الرئيسية","item":"$Site/"},{"@type":"ListItem","position":2,"name":"المدونة","item":"$Site/blog/"},{"@type":"ListItem","position":3,"name":"$($Article.Title)","item":"$canonical"}]}
</script>
</head>
<body>
<div data-include="../../shared-header.html"></div>
<main>
<h1>$($Article.Title)</h1>
<p class="lead">$($Article.Description)</p>
<img class="hero-image" src="$Banner" alt="$($Article.Keyword) - إعلانات العرب" width="1600" height="675">
$paragraphs
<div class="related">
<h2>خدمات مرتبطة</h2>
<p><a href="/services/">خدمات التسويق والإعلانات</a> · <a href="/blog/">العودة إلى المدونة</a> · <a href="https://wa.me/$Whatsapp?text=$([System.Uri]::EscapeDataString("أريد استشارة حول $($Article.Keyword)"))" target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a></p>
</div>
</main>
<div class="banner-wrap"><img src="$Banner" alt="إعلانات العرب - إعلانات احترافية على كل المنصات" loading="lazy" width="1600" height="675"></div>
<div data-include="../../shared-footer.html"></div>
<script>
document.addEventListener('DOMContentLoaded',function(){
 document.querySelectorAll('[data-include]').forEach(async function(el){
  try{
   var f=el.getAttribute('data-include'),r=await fetch(f);
   if(!r.ok)r=await fetch('/'+f.replace(/^(\.\.\/)+/,''));
   if(r.ok)el.innerHTML=await r.text();
  }catch(e){console.log(e)}
 })
})
</script>
<script src="/assets/js/universal-header-footer.js" defer></script>
</body>
</html>
"@
}

$articleCards = foreach ($article in $articles) {
@"
<article class="card">
  <img src="$banner" alt="$($article.Keyword) - إعلانات العرب" loading="lazy" width="1600" height="675">
  <div class="card-body">
    <span class="tag">$($article.Category)</span>
    <h2>$($article.Title)</h2>
    <p>$($article.Description)</p>
    <a href="articles/$($article.Slug).html">اقرأ المقال</a>
  </div>
</article>
"@
}

$blogPage = @"
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>مدونة إعلانات العرب | التسويق الرقمي والإعلانات الممولة</title>
<meta name="description" content="مقالات ودلائل عملية عن التسويق الرقمي والإعلانات الممولة للمتاجر والشركات العربية.">
<meta name="robots" content="index,follow">
<link rel="canonical" href="$site/blog/">
<meta property="og:type" content="website">
<meta property="og:title" content="مدونة إعلانات العرب">
<meta property="og:description" content="مقالات ودلائل عملية عن التسويق الرقمي والإعلانات الممولة.">
<meta property="og:image" content="$site$banner">
<meta property="og:url" content="$site/blog/">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/universal-header-footer.css">
<style>
:root{--bg:#0a0e27;--card:#1a1f3a;--gold:#ffb800;--muted:#a8b3c1;--green:#25d366}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:#e8edf5;font-family:Cairo,sans-serif;line-height:1.75}
.page{max-width:1200px;margin:96px auto 50px;padding:0 18px}.hero{text-align:center;padding:25px 0 34px}.hero h1{margin:0 0 12px;color:var(--gold);font-size:clamp(2rem,5vw,3rem)}.hero p{max-width:720px;margin:auto;color:var(--muted)}.hero img{width:100%;max-width:1000px;height:auto;border-radius:16px;margin:24px auto 0;display:block}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px}.card{background:var(--card);border:1px solid rgba(255,184,0,.18);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}.card>img{width:100%;height:145px;object-fit:cover}.card-body{padding:22px;flex:1}.tag{display:inline-block;background:rgba(255,184,0,.13);color:var(--gold);padding:4px 11px;border-radius:20px;font-size:.8rem;font-weight:700}.card h2{font-size:1.2rem;line-height:1.6;margin:14px 0 10px}.card p{color:var(--muted);font-size:.94rem;margin:0 0 20px}.card a{display:inline-block;background:var(--gold);color:#111;text-decoration:none;font-weight:800;padding:10px 16px;border-radius:24px}.notice{margin:34px 0;background:linear-gradient(135deg,#1a1f3a,#24365a);padding:24px;border-radius:16px;text-align:center;border:1px solid rgba(255,184,0,.25)}.notice a{color:#fff;background:var(--green);display:inline-block;text-decoration:none;border-radius:24px;padding:10px 18px;font-weight:800}@media(max-width:600px){.page{margin-top:72px;padding:0 14px}.grid{grid-template-columns:1fr}}
</style>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Blog","name":"مدونة إعلانات العرب","url":"$site/blog/","description":"مقالات متخصصة في التسويق الرقمي والإعلانات الممولة."}</script>
</head>
<body>
<div data-include="../shared-header.html"></div>
<main class="page">
<section class="hero"><h1>مدونة إعلانات العرب</h1><p>أدلة عملية تساعد أصحاب المتاجر والشركات على فهم التسويق الرقمي، الإعلانات الممولة، وتحسين المبيعات.</p><img src="$banner" alt="إعلانات العرب - إعلانات احترافية على كل المنصات" width="1600" height="675"></section>
<section class="grid">
$($articleCards -join "`n")
</section>
<section class="notice"><h2>هل تحتاج حملة إعلانية مخصصة؟</h2><p>تواصل مع فريق إعلانات العرب لاستشارة سريعة حول نشاطك.</p><a href="https://wa.me/$wa?text=$([System.Uri]::EscapeDataString('أريد استشارة تسويقية'))" target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a></section>
</main>
<div data-include="../shared-footer.html"></div>
<script>document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-include]').forEach(async function(el){try{var f=el.getAttribute('data-include'),r=await fetch(f);if(!r.ok)r=await fetch('/'+f.replace(/^(\.\.\/)+/,''));if(r.ok)el.innerHTML=await r.text()}catch(e){console.log(e)}})})</script>
<script src="/assets/js/universal-header-footer.js" defer></script>
</body></html>
"@

$header = @"
<header class="site-header" dir="rtl">
  <style>
    .site-header{position:sticky;top:0;z-index:999;background:#0a0e27;border-bottom:1px solid rgba(255,184,0,.22);font-family:Cairo,sans-serif}
    .site-header .wrap{max-width:1200px;margin:auto;padding:10px 18px;display:flex;align-items:center;justify-content:space-between;gap:18px}
    .site-header .brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;font-weight:900}
    .site-header .brand img{width:44px;height:44px;border-radius:50%;object-fit:cover}
    .site-header nav{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
    .site-header nav a{color:#e8edf5;text-decoration:none;font-weight:700;font-size:.9rem}
    .site-header .wa{background:#25D366;color:#fff!important;padding:8px 14px;border-radius:22px}
    @media(max-width:700px){.site-header .wrap{padding:8px 12px}.site-header nav{gap:9px}.site-header nav a{font-size:.78rem}.site-header .brand span{display:none}}
  </style>
  <div class="wrap">
    <a class="brand" href="/"><img src="/assets/images/logo-arabsad.jpg" alt="شعار إعلانات العرب" width="44" height="44"><span>إعلانات العرب</span></a>
    <nav aria-label="التنقل الرئيسي"><a href="/">الرئيسية</a><a href="/services/">الخدمات</a><a href="/blog/">المدونة</a><a href="/about.html">من نحن</a><a class="wa" href="https://wa.me/$wa?text=$([System.Uri]::EscapeDataString('أريد استشارة تسويقية'))" target="_blank" rel="noopener noreferrer">واتساب</a></nav>
  </div>
</header>
"@

$footer = @"
<section class="site-banner-before-footer" dir="rtl">
  <style>.site-banner-before-footer{background:#0a0e27;padding:20px 14px 0}.site-banner-before-footer img{display:block;width:100%;max-width:1200px;height:auto;margin:auto;border-radius:16px}</style>
  <img src="/assets/images/site-banner-arabsad.jpg" alt="إعلانات العرب - إعلانات احترافية على كل المنصات" loading="lazy" width="1600" height="675">
</section>
<footer style="background:#070b1e;color:#e8edf5;padding:28px 18px;text-align:center;font-family:Cairo,sans-serif;margin-top:0" dir="rtl">
  <img src="/assets/images/logo-arabsad.jpg" alt="شعار إعلانات العرب" width="58" height="58" style="border-radius:50%;object-fit:cover">
  <p style="margin:10px 0 5px;font-weight:800">إعلانات العرب</p>
  <p style="margin:0;color:#a8b3c1">حلول التسويق الرقمي والإعلانات الممولة للمتاجر والشركات.</p>
  <p style="margin:12px 0 0"><a href="https://wa.me/$wa?text=$([System.Uri]::EscapeDataString('أريد استشارة تسويقية'))" target="_blank" rel="noopener noreferrer" style="color:#25D366;text-decoration:none;font-weight:800">تواصل عبر واتساب</a></p>
</footer>
"@

Set-Content -Path (Join-Path $root 'shared-header.html') -Value $header -Encoding utf8
Set-Content -Path (Join-Path $root 'shared-footer.html') -Value $footer -Encoding utf8
Set-Content -Path (Join-Path $blogDir 'index.html') -Value $blogPage -Encoding utf8

foreach ($article in $articles) {
    $html = New-ArticleHtml -Article $article -Whatsapp $wa -Site $site -Banner $banner
    $path = Join-Path $articlesDir "$($article.Slug).html"
    Set-Content -Path $path -Value $html -Encoding utf8
}

# favicon: use the uploaded logo as the browser icon source
Copy-Item (Join-Path $assetsDir 'logo-arabsad.jpg') (Join-Path $root 'apple-touch-icon.png') -Force
Copy-Item (Join-Path $assetsDir 'logo-arabsad.jpg') (Join-Path $root 'favicon.ico') -Force

# Add banner to main page before shared footer if not already present
$homePath = Join-Path $root 'index.html'
if (Test-Path $homePath) {
    $home = Get-Content $homePath -Raw -Encoding utf8
    if ($home -notmatch 'site-banner-arabsad\.jpg') {
        $home = $home -replace '(<div data-include="shared-footer\.html"></div>)', '<div style="max-width:1200px;margin:25px auto;padding:0 16px"><img src="/assets/images/site-banner-arabsad.jpg" alt="إعلانات العرب - إعلانات احترافية على كل المنصات" loading="lazy" style="width:100%;height:auto;border-radius:16px"></div>$1'
        Set-Content -Path $homePath -Value $home -Encoding utf8
    }
}

# Rebuild sitemap with existing core URLs and new articles
$sitemapUrls = @(
    @{ loc = "$site/"; priority = '1.0' },
    @{ loc = "$site/blog/"; priority = '0.9' },
    @{ loc = "$site/services/"; priority = '0.8' }
)
foreach ($article in $articles) {
    $sitemapUrls += @{ loc = "$site/blog/articles/$($article.Slug).html"; priority = '0.8' }
}
$lastmod = (Get-Date -Format 'yyyy-MM-dd')
$xml = @('<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($entry in $sitemapUrls) {
    $xml += "  <url><loc>$($entry.loc)</loc><lastmod>$lastmod</lastmod><changefreq>monthly</changefreq><priority>$($entry.priority)</priority></url>"
}
$xml += '</urlset>'
Set-Content -Path (Join-Path $root 'sitemap.xml') -Value ($xml -join "`n") -Encoding utf8

$robots = @"
User-agent: *
Allow: /

Sitemap: $site/sitemap.xml
"@
Set-Content -Path (Join-Path $root 'robots.txt') -Value $robots -Encoding utf8

Write-Host ''
Write-Host 'تم إنشاء/إصلاح الملفات التالية:' -ForegroundColor Green
Write-Host '- blog/index.html'
Write-Host '- 10 مقالات داخل blog/articles'
Write-Host '- shared-header.html بالشعار الجديد'
Write-Host '- shared-footer.html بالبانر قبل الفوتر'
Write-Host '- sitemap.xml و robots.txt'
Write-Host '- favicon.ico و apple-touch-icon.png'
Write-Host ''
Write-Host 'راجع التغييرات بالأمر: git status' -ForegroundColor Yellow