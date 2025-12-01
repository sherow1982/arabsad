#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سكربت متكامل لـ SEO وLocal Business و Content Optimization
ريبو: arabsad-ads (مؤسسة إعلانات العرب)
المهام:
1. حقن Schema وMeta Tags
2. إنشاء Google Business Profile Data
3. Keyword Research محسّن
4. Content Optimization
5. Internal Links
6. Sitemap XML
7. robots.txt
"""

import sys
import re
import json
from pathlib import Path
from datetime import datetime, timedelta
from urllib.parse import urljoin

# ================== البيانات الأساسية ==================

GULF_COUNTRIES = {
    "SA": {
        "name": "السعودية",
        "arabic_name": "المملكة العربية السعودية",
        "cities": ["الرياض", "جدة", "الدمام"],
        "lat": 24.7136,
        "lng": 46.6753,
        "keywords": ["تسويق رقمي السعودية", "إعلانات جوجل السعودية", "Google Ads الرياض", "Facebook Ads جدة"],
    },
    "AE": {
        "name": "الإمارات",
        "arabic_name": "الإمارات العربية المتحدة",
        "cities": ["دبي", "أبوظبي", "الشارقة"],
        "lat": 23.4241,
        "lng": 53.8478,
        "keywords": ["تسويق رقمي الإمارات", "إعلانات جوجل دبي", "Google Ads أبوظبي", "SEO دبي"],
    },
    "KW": {
        "name": "الكويت",
        "arabic_name": "دولة الكويت",
        "cities": ["مدينة الكويت", "الأحمدي"],
        "lat": 29.3759,
        "lng": 47.9774,
        "keywords": ["تسويق رقمي الكويت", "إعلانات جوجل الكويت", "SEO الكويت", "Facebook Ads الكويت"],
    },
    "QA": {
        "name": "قطر",
        "arabic_name": "دولة قطر",
        "cities": ["الدوحة"],
        "lat": 25.2854,
        "lng": 51.5310,
        "keywords": ["تسويق رقمي قطر", "إعلانات جوجل قطر", "SEO الدوحة"],
    },
    "BH": {
        "name": "البحرين",
        "arabic_name": "مملكة البحرين",
        "cities": ["المنامة"],
        "lat": 26.0667,
        "lng": 50.5577,
        "keywords": ["تسويق رقمي البحرين", "إعلانات جوجل البحرين", "SEO البحرين"],
    },
    "OM": {
        "name": "عمان",
        "arabic_name": "سلطنة عمان",
        "cities": ["مسقط"],
        "lat": 21.4735,
        "lng": 55.9754,
        "keywords": ["تسويق رقمي عمان", "إعلانات جوجل عمان", "SEO مسقط"],
    },
}

GLOBAL_KEYWORDS = {
    "google_ads": [
        "Google Ads",
        "إعلانات جوجل",
        "حملات جوجل",
        "Google Search Ads",
        "إعلانات البحث",
        "Google Display Network",
        "GDN",
    ],
    "facebook_ads": [
        "Facebook Ads",
        "إعلانات فيسبوك",
        "Instagram Ads",
        "إعلانات إنستجرام",
        "Social Media Ads",
        "إعلانات وسائل التواصل",
    ],
    "seo": [
        "SEO",
        "تحسين محركات البحث",
        "Search Engine Optimization",
        "الترتيب في جوجل",
        "محسن البحث",
        "Link Building",
        "بناء الروابط",
    ],
    "web_design": [
        "تصميم المواقع",
        "Web Design",
        "تصميم موقع",
        "Website Design",
        "تطوير المواقع",
        "Web Development",
    ],
}

# ================== الدوال الأساسية ==================

def extract_title(html: str) -> str:
    """استخراج العنوان"""
    m = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
    if m:
        txt = m.group(1).strip()
        return txt.split('|')[0].strip() if '|' in txt else txt
    m = re.search(r'<h1[^>]*>([^<]+)</h1>', html, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return "صفحة من مؤسسة إعلانات العرب"

def extract_description(html: str) -> str:
    """استخراج الوصف"""
    m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    m = re.search(r'<p[^>]*>([^<]+)</p>', html, re.IGNORECASE)
    if m:
        txt = m.group(1).strip()
        return txt if len(txt) <= 155 else txt[:152] + "..."
    return "خدمات تسويق رقمي متميزة من مؤسسة إعلانات العرب"

def extract_image(html: str) -> str:
    """استخراج الصورة"""
    m = re.search(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html, re.IGNORECASE)
    if m:
        src = m.group(1).strip()
        if src.startswith('http'):
            return src
        src = src.lstrip('./')
        return f"https://sherow1982.github.io/arabsad-ads/{src}"
    return "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg"

def determine_page_type(file_path: Path) -> str:
    """تحديد نوع الصفحة"""
    relative = str(file_path.relative_to(Path("."))).lower()
    if 'blog/articles' in relative:
        return 'article'
    elif 'blog' in relative:
        return 'blog'
    elif 'services' in relative:
        return 'service'
    elif 'cities' in relative:
        return 'city'
    return 'page'

def build_page_url(file_path: Path) -> str:
    """بناء الرابط"""
    relative_path = file_path.relative_to(Path("."))
    url_path = str(relative_path).replace("\\", "/")
    return f"https://sherow1982.github.io/arabsad-ads/{url_path}"

def extract_page_keywords(file_path: Path, title: str) -> list:
    """استخراج keywords من الصفحة وإضافة keywords الخليج"""
    keywords = []
    
    # أضف keywords حسب نوع الخدمة
    if 'google-ads' in str(file_path).lower():
        keywords.extend(GLOBAL_KEYWORDS["google_ads"])
    elif 'seo' in str(file_path).lower():
        keywords.extend(GLOBAL_KEYWORDS["seo"])
    elif 'social' in str(file_path).lower():
        keywords.extend(GLOBAL_KEYWORDS["facebook_ads"])
    elif 'website' in str(file_path).lower() or 'design' in str(file_path).lower():
        keywords.extend(GLOBAL_KEYWORDS["web_design"])
    
    # أضف keywords خليج عام
    for country_data in GULF_COUNTRIES.values():
        keywords.extend(country_data["keywords"][:2])
    
    # أضف العنوان
    keywords.append(title)
    
    return list(set(keywords))[:15]

# ================== Schema وMeta ==================

def create_service_schema(title: str, image: str, url: str, description: str) -> str:
    """Service Schema"""
    import json
    schema = {
        "@context": "https://schema.org/",
        "@type": "Service",
        "name": title,
        "image": image,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": "مؤسسة إعلانات العرب",
            "url": "https://sherow1982.github.io/arabsad-ads/",
            "logo": "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg",
            "telephone": "+201110760081"
        },
        "url": url,
        "areaServed": [
            {"@type": "Country", "name": "السعودية"},
            {"@type": "Country", "name": "الإمارات"},
            {"@type": "Country", "name": "الكويت"},
            {"@type": "Country", "name": "قطر"},
            {"@type": "Country", "name": "البحرين"},
            {"@type": "Country", "name": "عمان"},
        ],
        "priceRange": "$$-$$$",
        "potentialAction": {
            "@type": "ReserveAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://wa.me/201110760081?text=أريد استشارة"
            }
        }
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_article_schema(title: str, image: str, url: str, description: str, file_path: Path) -> str:
    """Article Schema"""
    import json
    try:
        date_modified = datetime.fromtimestamp(file_path.stat().st_mtime).isoformat()
    except:
        date_modified = datetime.now().isoformat()
    
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "image": image,
        "description": description,
        "datePublished": date_modified,
        "dateModified": date_modified,
        "author": {
            "@type": "Organization",
            "name": "مؤسسة إعلانات العرب"
        },
        "publisher": {
            "@type": "Organization",
            "name": "مؤسسة إعلانات العرب",
            "logo": {
                "@type": "ImageObject",
                "url": "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg"
            }
        },
        "url": url
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_organization_schema() -> str:
    """Organization Schema مع Local Business"""
    import json
    schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "مؤسسة إعلانات العرب",
        "alternateName": "ArabSad Digital Marketing",
        "image": "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg",
        "description": "وكالة تسويق رقمي متخصصة في Google Ads وFacebook Ads وSEO وتصميم المواقع",
        "url": "https://sherow1982.github.io/arabsad-ads/",
        "telephone": "+201110760081",
        "email": "info@arabsad.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "EG",
            "addressRegion": "الجيزة",
            "addressLocality": "حدائق أكتوبر"
        },
        "sameAs": [
            "https://www.facebook.com/arabsad",
            "https://www.twitter.com/arabsad",
            "https://www.instagram.com/arabsad"
        ]
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_local_business_schemas() -> dict:
    """LocalBusiness Schema لكل دول الخليج"""
    import json
    schemas = {}
    
    for country_code, country_data in GULF_COUNTRIES.items():
        schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": f"مؤسسة إعلانات العرب - {country_data['name']}",
            "image": "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg",
            "url": "https://sherow1982.github.io/arabsad-ads/",
            "telephone": "+201110760081",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": country_code,
                "addressLocality": country_data['cities'][0]
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": country_data['lat'],
                "longitude": country_data['lng']
            },
            "openingHours": "Su-Sa 08:00-23:00",
            "priceRange": "$$",
            "areaServed": country_data['name']
        }
        schemas[country_code] = json.dumps(schema, ensure_ascii=False, indent=2)
    
    return schemas

def create_breadcrumb_schema(file_path: Path) -> str:
    """Breadcrumb Schema"""
    import json
    relative = file_path.relative_to(Path("."))
    parts = relative.parts
    breadcrumb_items = []
    base_url = "https://sherow1982.github.io/arabsad-ads"
    
    breadcrumb_items.append({
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": base_url
    })
    
    current_path = ""
    for i, part in enumerate(parts[:-1], start=2):
        current_path += f"/{part}" if current_path else part
        name = part.replace('-', ' ').title()
        breadcrumb_items.append({
            "@type": "ListItem",
            "position": i,
            "name": name,
            "item": f"{base_url}/{current_path}"
        })
    
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb_items
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_meta_tags(title: str, image: str, url: str, description: str, keywords: list) -> str:
    """Meta Tags محسّنة مع Keywords"""
    if len(description) > 155:
        desc_short = description[:152] + "..."
    else:
        desc_short = description
    
    title_clean = title.replace('"', '').replace("'", '')
    keywords_str = ", ".join(keywords[:10])
    
    meta = f"""
    <!-- SEO Meta Tags (Auto) -->
    <meta charset="UTF-8">
    <title>{title_clean} - مؤسسة إعلانات العرب | وكالة تسويق رقمي الخليج</title>
    <meta name="description" content="{desc_short}">
    <meta name="keywords" content="{keywords_str}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="language" content="ar">
    <meta name="author" content="مؤسسة إعلانات العرب">
    <meta name="geo.region" content="EG">
    <meta name="geo.placename" content="مصر">
    <link rel="canonical" href="{url}">
    <link rel="alternate" hreflang="ar" href="{url}">
    <!-- Open Graph -->
    <meta property="og:title" content="{title_clean} - مؤسسة إعلانات العرب">
    <meta property="og:description" content="{desc_short}">
    <meta property="og:image" content="{image}">
    <meta property="og:url" content="{url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="مؤسسة إعلانات العرب">
    <meta property="og:locale" content="ar_EG">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title_clean}">
    <meta name="twitter:description" content="{desc_short}">
    <meta name="twitter:image" content="{image}">
    """
    return meta

# ================== Local Business Data ==================

def create_google_business_profile_json() -> str:
    """إنشاء Google Business Profile Data JSON"""
    import json
    profiles = []
    
    for country_code, country_data in GULF_COUNTRIES.items():
        for city in country_data['cities']:
            profile = {
                "business_name": f"مؤسسة إعلانات العرب - {city}",
                "country_code": country_code,
                "country_name": country_data['arabic_name'],
                "city": city,
                "phone": "+201110760081",
                "website": "https://sherow1982.github.io/arabsad-ads/",
                "latitude": country_data['lat'],
                "longitude": country_data['lng'],
                "services": [
                    "Google Ads",
                    "Facebook Ads",
                    "SEO",
                    "تصميم المواقع",
                    "التسويق الرقمي"
                ],
                "opening_hours": {
                    "monday": "08:00-23:00",
                    "tuesday": "08:00-23:00",
                    "wednesday": "08:00-23:00",
                    "thursday": "08:00-23:00",
                    "friday": "08:00-23:00",
                    "saturday": "08:00-23:00",
                    "sunday": "08:00-23:00"
                },
                "service_areas": [city, country_data['name']],
                "keywords": country_data['keywords']
            }
            profiles.append(profile)
    
    return json.dumps(profiles, ensure_ascii=False, indent=2)

# ================== Internal Links ==================

def generate_internal_links(file_path: Path, all_files: list) -> list:
    """توليد internal links ذكية"""
    page_type = determine_page_type(file_path)
    links = []
    
    # أضف رابط للرئيسية
    links.append({
        "url": "https://sherow1982.github.io/arabsad-ads/index.html",
        "text": "الرئيسية",
        "anchor_text": '<a href="/">الرئيسية</a>'
    })
    
    # أضف روابط من نفس الفئة
    current_folder = file_path.parent
    related_files = [f for f in all_files if f.parent == current_folder and f != file_path]
    
    for related in related_files[:3]:
        title = extract_title(open(related, 'r', encoding='utf-8').read())
        url = build_page_url(related)
        links.append({
            "url": url,
            "text": title,
            "anchor_text": f'<a href="{related.name}">{title}</a>'
        })
    
    # أضف روابط من الخدمات الأخرى
    services_dir = Path(".") / "services"
    if services_dir.exists() and page_type != 'service':
        for service_file in list(services_dir.glob("*.html"))[:3]:
            title = extract_title(open(service_file, 'r', encoding='utf-8').read())
            url = build_page_url(service_file)
            links.append({
                "url": url,
                "text": title,
                "anchor_text": f'<a href="services/{service_file.name}">{title}</a>'
            })
    
    return links[:5]

# ================== Content Optimization ==================

def generate_content_optimization_data(title: str, keywords: list, file_path: Path) -> dict:
    """توليد بيانات تحسين المحتوى"""
    return {
        "title": title,
        "keywords": keywords,
        "keyword_density": {
            keyword: f"استخدم الكلمة {keyword} 2-3 مرات في المحتوى"
            for keyword in keywords[:5]
        },
        "content_guidelines": {
            "minimum_length": "1500+ كلمة",
            "headings": "استخدم H1، H2، H3 بشكل منظم",
            "images": "أضف 3-5 صور محسّنة",
            "internal_links": "أضف 5-10 روابط داخلية",
            "external_links": "أضف 2-3 روابط خارجية موثوقة",
            "readability": "استخدم فقرات قصيرة وقوائم"
        },
        "seo_checklist": [
            "✅ Meta Description (150-160 حرف)",
            "✅ Keywords في الـ Title",
            "✅ Keywords في الـ H1",
            "✅ Keywords في أول 100 كلمة",
            "✅ صور مع Alt Text",
            "✅ روابط داخلية",
            "✅ Call to Action واضح"
        ]
    }

# ================== Sitemap ==================

def generate_sitemap(all_files: list) -> str:
    """توليد Sitemap XML"""
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    base_url = "https://sherow1982.github.io/arabsad-ads"
    
    for file_path in all_files:
        if file_path.name.endswith('.html'):
            url = build_page_url(file_path)
            try:
                last_mod = datetime.fromtimestamp(file_path.stat().st_mtime).strftime('%Y-%m-%d')
            except:
                last_mod = datetime.now().strftime('%Y-%m-%d')
            
            # حدد الأهمية حسب نوع الصفحة
            if file_path.name == 'index.html':
                priority = "1.0"
                changefreq = "daily"
            elif 'services' in str(file_path):
                priority = "0.8"
                changefreq = "weekly"
            elif 'blog' in str(file_path):
                priority = "0.7"
                changefreq = "weekly"
            else:
                priority = "0.6"
                changefreq = "monthly"
            
            sitemap += f"""  <url>
    <loc>{url}</loc>
    <lastmod>{last_mod}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>
"""
    
    sitemap += '</urlset>'
    return sitemap

# ================== Robots.txt ==================

def generate_robots_txt() -> str:
    """توليد robots.txt محسّن"""
    robots = """User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /?*
Disallow: /*?*
Disallow: /*.js$
Disallow: /*.css$

# Google Bot
User-agent: Googlebot
Allow: /

# Bing Bot
User-agent: Bingbot
Allow: /

# Sitemap
Sitemap: https://sherow1982.github.io/arabsad-ads/sitemap.xml

# Crawl Delay
Crawl-delay: 1
"""
    return robots

# ================== الحقن الرئيسي ==================

def inject_seo(html: str, title: str, image: str, url: str, description: str, file_path: Path, page_type: str, keywords: list, local_business_schemas: dict) -> str:
    """حقن كل شيء في <head>"""
    if '</head>' not in html:
        if '<body' in html.lower():
            html = html.replace('<body', '</head><body', 1)
        else:
            html = html + '</head>'
    
    # حذف Schema القديم
    html = re.sub(
        r'<script\s+type=["\']?application/ld\+json["\']?\s*>.*?</script>',
        '',
        html,
        flags=re.DOTALL | re.IGNORECASE
    )
    
    meta = create_meta_tags(title, image, url, description, keywords)
    
    if page_type == 'article':
        main_schema = create_article_schema(title, image, url, description, file_path)
    else:
        main_schema = create_service_schema(title, image, url, description)
    
    org_schema = create_organization_schema()
    breadcrumb_schema = create_breadcrumb_schema(file_path)
    
    injection = f"""
{meta}

<!-- Service/Article Schema JSON-LD (Auto) -->
<script type="application/ld+json">
{main_schema}
</script>

<!-- Organization Schema JSON-LD (Auto) -->
<script type="application/ld+json">
{org_schema}
</script>

<!-- LocalBusiness Schema - Gulf Countries (Auto) -->
<script type="application/ld+json">
[
{', '.join(list(local_business_schemas.values())[:2])}
]
</script>

<!-- Breadcrumb Schema JSON-LD (Auto) -->
<script type="application/ld+json">
{breadcrumb_schema}
</script>

</head>"""
    
    return html.replace('</head>', injection, 1)

def process_file(file_path: Path, all_files: list, local_business_schemas: dict) -> tuple:
    """معالجة ملف واحد"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            html = f.read()
        
        title = extract_title(html)
        image = extract_image(html)
        description = extract_description(html)
        url = build_page_url(file_path)
        page_type = determine_page_type(file_path)
        keywords = extract_page_keywords(file_path, title)
        
        updated = inject_seo(html, title, image, url, description, file_path, page_type, keywords, local_business_schemas)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(updated)
        
        return (True, file_path.relative_to(Path(".")), page_type, keywords)
    except Exception as e:
        return (False, file_path.relative_to(Path(".")), str(e), [])

def main():
    print("\n" + "="*80)
    print("🏆 سكربت SEO شامل + Local Business + Content Optimization - arabsad-ads 🏆")
    print("="*80 + "\n")

    root = Path(".")
    
    # البحث عن جميع ملفات HTML
    search_paths = [
        ("root", root, "*.html"),
        ("services", root / "services", "*.html"),
        ("cities", root / "cities", "*.html"),
        ("blog", root / "blog", "*.html"),
        ("articles", root / "blog" / "articles", "*.html"),
    ]
    
    all_files = []
    for folder_name, folder_path, pattern in search_paths:
        if folder_path.exists():
            files = sorted(folder_path.glob(pattern))
            all_files.extend(files)
            if files:
                print(f"📂 {folder_name}: {len(files)} ملف")
    
    if not all_files:
        print("\n❌ لم يتم العثور على أي ملفات HTML")
        sys.exit(1)

    print(f"\n📦 إجمالي الملفات: {len(all_files)}\n")
    print("-" * 80 + "\n")

    # إنشاء Local Business Schemas
    local_business_schemas = create_local_business_schemas()
    
    ok = 0
    fail = 0
    stats = {"service": 0, "article": 0, "city": 0, "blog": 0, "page": 0}
    all_keywords = []

    # معالجة الملفات
    for i, fp in enumerate(all_files, 1):
        rel_path = fp.relative_to(root)
        print(f"[{i}/{len(all_files)}] {rel_path} ...", end=" ")
        
        success, filename, result, keywords = process_file(fp, all_files, local_business_schemas)
        if success:
            page_type = result
            stats[page_type] = stats.get(page_type, 0) + 1
            all_keywords.extend(keywords)
            print(f"✅ ({page_type})")
            ok += 1
        else:
            print(f"❌ {result}")
            fail += 1

    # إنشاء Sitemap
    print("\n📍 جاري إنشاء Sitemap XML...")
    sitemap_content = generate_sitemap(all_files)
    with open(root / "sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    print("   ✅ sitemap.xml تم إنشاؤها")

    # إنشاء robots.txt
    print("🤖 جاري إنشاء robots.txt...")
    robots_content = generate_robots_txt()
    with open(root / "robots.txt", "w", encoding="utf-8") as f:
        f.write(robots_content)
    print("   ✅ robots.txt تم إنشاؤها")

    # إنشاء Google Business Profile JSON
    print("🏪 جاري إنشاء Google Business Profile Data...")
    gbp_content = create_google_business_profile_json()
    with open(root / "google-business-profiles.json", "w", encoding="utf-8") as f:
        f.write(gbp_content)
    print("   ✅ google-business-profiles.json تم إنشاؤها")

    # النتائج النهائية
    print("\n" + "="*80)
    print("📊 النتائج النهائية:")
    print("="*80)
    print(f"✅ ملفات محدثة: {ok}")
    print(f"❌ ملفات فشلت: {fail}")
    print(f"📈 نسبة النجاح: {(ok/len(all_files)*100):.1f}%")
    print("\n📋 تفاصيل حسب النوع:")
    for page_type, count in stats.items():
        if count > 0:
            print(f"   • {page_type}: {count} ملف")
    print("\n📁 الملفات المُنشأة:")
    print("   ✅ sitemap.xml - خريطة الموقع XML")
    print("   ✅ robots.txt - توجيهات محركات البحث")
    print("   ✅ google-business-profiles.json - بيانات الدول الخليجية")
    print("\n🌐 دول الخليج المُدعومة:")
    for code, country in GULF_COUNTRIES.items():
        print(f"   • {country['name']} ({code})")

    print("\n" + "="*80)
    print("✨ تم إنشاء حل SEO متكامل!")
    print("="*80)
    print("\n📝 الخطوات التالية:")
    print("1. ارفع sitemap.xml و robots.txt على GitHub")
    print("2. ادخل Google Search Console وأضف sitemap.xml")
    print("3. استخدم بيانات google-business-profiles.json لإنشاء GBP")
    print("4. حسّن المحتوى بـ 1500+ كلمة مع استخدام Keywords")
    print("5. أضف Internal Links بين الصفحات")
    print("\n")

if __name__ == "__main__":
    main()
