#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سكربت متكامل لـ SEO وLocal Business 
ريبو: arabsad-ads
تصحيح: حفظ كامل البيانات لجميع دول الخليج
"""

import sys
import re
import json
from pathlib import Path
from datetime import datetime

# ================== بيانات دول الخليج كاملة ==================

GULF_COUNTRIES = {
    "SA": {
        "name": "السعودية",
        "arabic_name": "المملكة العربية السعودية",
        "lat": 24.7136,
        "lng": 46.6753,
        "cities": [
            ("الرياض", 24.7136, 46.6753),
            ("جدة", 21.5485, 39.1721),
            ("الدمام", 26.3989, 50.2048),
            ("الخبر", 26.2156, 50.2106),
            ("القطيف", 26.1801, 50.0157),
            ("مكة", 21.4225, 39.8262),
            ("المدينة", 24.4647, 39.6074),
            ("الطائف", 21.2745, 40.4158),
            ("تبوك", 28.3852, 36.5627),
            ("أبها", 18.2155, 42.5054),
            ("جيزان", 16.8892, 42.5521),
            ("نجران", 17.6927, 44.1860),
            ("حفر الباطن", 28.4347, 45.3569),
        ]
    },
    "AE": {
        "name": "الإمارات",
        "arabic_name": "الإمارات العربية المتحدة",
        "lat": 23.4241,
        "lng": 53.8478,
        "cities": [
            ("دبي", 25.2048, 55.2708),
            ("أبوظبي", 24.4539, 54.3773),
            ("الشارقة", 25.3548, 55.3944),
            ("عجمان", 25.3986, 55.4501),
            ("أم القيوين", 25.5645, 55.5597),
            ("رأس الخيمة", 25.7482, 55.9754),
            ("الفجيرة", 25.1242, 56.3540),
        ]
    },
    "KW": {
        "name": "الكويت",
        "arabic_name": "دولة الكويت",
        "lat": 29.3759,
        "lng": 47.9774,
        "cities": [
            ("مدينة الكويت", 29.3759, 47.9774),
            ("الأحمدي", 29.1118, 47.6929),
            ("الجهراء", 29.4444, 47.6804),
            ("الفروانية", 29.2269, 47.8558),
            ("حولي", 29.3621, 47.9825),
            ("مبارك الكبير", 29.0269, 47.7373),
            ("العاصمة", 29.3759, 47.9774),
        ]
    },
    "QA": {
        "name": "قطر",
        "arabic_name": "دولة قطر",
        "lat": 25.2854,
        "lng": 51.5310,
        "cities": [
            ("الدوحة", 25.2854, 51.5310),
            ("الريان", 25.3548, 51.5342),
            ("الوكرة", 25.1673, 51.6286),
            ("الخور", 25.6753, 51.4805),
            ("أم صلال", 25.4167, 51.5000),
            ("الشمال", 25.8500, 51.2500),
        ]
    },
    "BH": {
        "name": "البحرين",
        "arabic_name": "مملكة البحرين",
        "lat": 26.0667,
        "lng": 50.5577,
        "cities": [
            ("المنامة", 26.1290, 50.5826),
            ("المحرق", 26.1667, 50.5833),
            ("الرفاع", 26.1333, 50.4167),
            ("الجفير", 26.1778, 50.4389),
            ("سلمان آباد", 26.0833, 50.5000),
        ]
    },
    "OM": {
        "name": "عمان",
        "arabic_name": "سلطنة عمان",
        "lat": 21.4735,
        "lng": 55.9754,
        "cities": [
            ("مسقط", 21.4735, 55.9754),
            ("صلالة", 17.0151, 54.0924),
            ("صحار", 24.2795, 56.9366),
            ("نزوى", 22.9342, 57.5364),
            ("السويق", 23.8069, 57.4074),
            ("شناص", 24.7167, 56.7833),
            ("هيماء", 24.2000, 56.6000),
        ]
    },
}

# ================== الدوال ==================

def extract_title(html: str) -> str:
    m = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
    if m:
        txt = m.group(1).strip()
        return txt.split('|')[0].strip() if '|' in txt else txt
    m = re.search(r'<h1[^>]*>([^<]+)</h1>', html, re.IGNORECASE)
    return m.group(1).strip() if m else "صفحة من مؤسسة إعلانات العرب"

def extract_description(html: str) -> str:
    m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    m = re.search(r'<p[^>]*>([^<]+)</p>', html, re.IGNORECASE)
    if m:
        txt = m.group(1).strip()
        return txt if len(txt) <= 155 else txt[:152] + "..."
    return "خدمات تسويق رقمي متميزة من مؤسسة إعلانات العرب"

def extract_image(html: str) -> str:
    m = re.search(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html, re.IGNORECASE)
    if m:
        src = m.group(1).strip()
        if src.startswith('http'):
            return src
        src = src.lstrip('./')
        return f"https://sherow1982.github.io/arabsad-ads/{src}"
    return "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg"

def determine_page_type(file_path: Path) -> str:
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
    relative_path = file_path.relative_to(Path("."))
    url_path = str(relative_path).replace("\\", "/")
    return f"https://sherow1982.github.io/arabsad-ads/{url_path}"

def extract_page_keywords(file_path: Path, title: str) -> list:
    keywords = [
        "Google Ads", "إعلانات جوجل", "Facebook Ads", "إعلانات فيسبوك",
        "SEO", "تحسين محركات البحث", "تسويق رقمي", "التسويق الرقمي",
        "تصميم المواقع", "Web Design", "Social Media Ads"
    ]
    
    for country_code, country_data in GULF_COUNTRIES.items():
        keywords.append(f"تسويق رقمي {country_data['name']}")
        keywords.append(f"إعلانات جوجل {country_data['name']}")
        for city_name, _, _ in country_data["cities"][:2]:
            keywords.append(f"تسويق {city_name}")
    
    keywords.append(title)
    return list(set(keywords))[:25]

# ================== Schema ==================

def create_service_schema(title: str, image: str, url: str, description: str) -> str:
    import json
    area_served = [{"@type": "Country", "name": country_data['arabic_name']} for country_data in GULF_COUNTRIES.values()]
    
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
        "areaServed": area_served,
        "priceRange": "$$-$$$"
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_article_schema(title: str, image: str, url: str, description: str, file_path: Path) -> str:
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
        "author": {"@type": "Organization", "name": "مؤسسة إعلانات العرب"},
        "url": url
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_organization_schema() -> str:
    import json
    schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "مؤسسة إعلانات العرب",
        "url": "https://sherow1982.github.io/arabsad-ads/",
        "telephone": "+201110760081",
        "email": "info@arabsad.com"
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_breadcrumb_schema(file_path: Path) -> str:
    import json
    relative = file_path.relative_to(Path("."))
    parts = relative.parts
    breadcrumb_items = [{"@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://sherow1982.github.io/arabsad-ads"}]
    
    current_path = ""
    for i, part in enumerate(parts[:-1], start=2):
        current_path += f"/{part}" if current_path else part
        name = part.replace('-', ' ').title()
        breadcrumb_items.append({
            "@type": "ListItem",
            "position": i,
            "name": name,
            "item": f"https://sherow1982.github.io/arabsad-ads/{current_path}"
        })
    
    schema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": breadcrumb_items}
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_meta_tags(title: str, image: str, url: str, description: str, keywords: list) -> str:
    if len(description) > 155:
        desc_short = description[:152] + "..."
    else:
        desc_short = description
    
    title_clean = title.replace('"', '').replace("'", '')
    keywords_str = ", ".join(keywords[:15])
    
    meta = f"""
    <!-- SEO Meta Tags (Auto) -->
    <meta charset="UTF-8">
    <title>{title_clean} - مؤسسة إعلانات العرب</title>
    <meta name="description" content="{desc_short}">
    <meta name="keywords" content="{keywords_str}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="canonical" href="{url}">
    <!-- Open Graph -->
    <meta property="og:title" content="{title_clean} - مؤسسة إعلانات العرب">
    <meta property="og:description" content="{desc_short}">
    <meta property="og:image" content="{image}">
    <meta property="og:url" content="{url}">
    """
    return meta

# ================== Google Business Profiles ==================

def create_google_business_profiles():
    """إنشاء Google Business Profile Data لجميع المدن"""
    profiles = []
    
    print("\n📊 جاري إنشاء Google Business Profiles:\n")
    
    for country_code, country_data in GULF_COUNTRIES.items():
        print(f"🌍 {country_data['name']} ({country_code}):")
        for city_name, lat, lng in country_data["cities"]:
            profile = {
                "id": f"{country_code}_{city_name.replace(' ', '_')}",
                "business_name": f"مؤسسة إعلانات العرب - {city_name}",
                "country_code": country_code,
                "country_name": country_data['arabic_name'],
                "city": city_name,
                "phone": "+201110760081",
                "website": "https://sherow1982.github.io/arabsad-ads/",
                "latitude": lat,
                "longitude": lng,
                "services": [
                    "Google Ads", "Facebook Ads", "Instagram Ads", "SEO",
                    "تصميم المواقع", "التسويق الرقمي", "تطوير المتاجر"
                ],
                "address": f"{city_name}, {country_data['name']}",
                "opening_hours": {
                    "saturday": "08:00-23:00",
                    "sunday": "08:00-23:00",
                    "monday": "08:00-23:00",
                    "tuesday": "08:00-23:00",
                    "wednesday": "08:00-23:00",
                    "thursday": "08:00-23:00",
                    "friday": "08:00-23:00"
                }
            }
            profiles.append(profile)
            print(f"   ✅ {city_name}")
        print()
    
    return profiles

# ================== Sitemap ==================

def generate_sitemap(all_files: list) -> str:
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for file_path in all_files:
        if file_path.name.endswith('.html'):
            url = build_page_url(file_path)
            try:
                last_mod = datetime.fromtimestamp(file_path.stat().st_mtime).strftime('%Y-%m-%d')
            except:
                last_mod = datetime.now().strftime('%Y-%m-%d')
            
            priority = "1.0" if file_path.name == 'index.html' else "0.7"
            
            sitemap += f"""  <url>
    <loc>{url}</loc>
    <lastmod>{last_mod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{priority}</priority>
  </url>
"""
    
    sitemap += '</urlset>'
    return sitemap

# ================== Robots.txt ==================

def generate_robots_txt() -> str:
    return """User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://sherow1982.github.io/arabsad-ads/sitemap.xml
Crawl-delay: 1
"""

# ================== الحقن ==================

def inject_seo(html: str, title: str, image: str, url: str, description: str, file_path: Path, page_type: str, keywords: list) -> str:
    if '</head>' not in html:
        if '<body' in html.lower():
            html = html.replace('<body', '</head><body', 1)
        else:
            html = html + '</head>'
    
    html = re.sub(r'<script\s+type=["\']?application/ld\+json["\']?\s*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    meta = create_meta_tags(title, image, url, description, keywords)
    
    if page_type == 'article':
        main_schema = create_article_schema(title, image, url, description, file_path)
    else:
        main_schema = create_service_schema(title, image, url, description)
    
    org_schema = create_organization_schema()
    breadcrumb_schema = create_breadcrumb_schema(file_path)
    
    injection = f"""
{meta}

<!-- Main Schema (Auto) -->
<script type="application/ld+json">
{main_schema}
</script>

<!-- Organization Schema (Auto) -->
<script type="application/ld+json">
{org_schema}
</script>

<!-- Breadcrumb Schema (Auto) -->
<script type="application/ld+json">
{breadcrumb_schema}
</script>

</head>"""
    
    return html.replace('</head>', injection, 1)

def process_file(file_path: Path) -> tuple:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            html = f.read()
        
        title = extract_title(html)
        image = extract_image(html)
        description = extract_description(html)
        url = build_page_url(file_path)
        page_type = determine_page_type(file_path)
        keywords = extract_page_keywords(file_path, title)
        
        updated = inject_seo(html, title, image, url, description, file_path, page_type, keywords)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(updated)
        
        return (True, file_path.relative_to(Path(".")))
    except Exception as e:
        return (False, file_path.relative_to(Path(".")))

def main():
    print("\n" + "="*80)
    print("🏆 سكربت SEO + Google Business Profiles كاملة - arabsad-ads 🏆")
    print("="*80 + "\n")

    root = Path(".")
    
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
        print("❌ لا توجد ملفات HTML")
        sys.exit(1)

    print(f"\n📦 إجمالي الملفات: {len(all_files)}\n")

    # معالجة الملفات
    ok = 0
    for i, fp in enumerate(all_files, 1):
        print(f"[{i}/{len(all_files)}] {fp.relative_to(root)} ...", end=" ")
        success, _ = process_file(fp)
        if success:
            print("✅")
            ok += 1
        else:
            print("❌")

    # إنشاء Sitemap
    print("\n📍 جاري إنشاء Sitemap...")
    sitemap_content = generate_sitemap(all_files)
    with open(root / "sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    print("✅ sitemap.xml تم إنشاؤها\n")

    # إنشاء robots.txt
    print("🤖 جاري إنشاء robots.txt...")
    with open(root / "robots.txt", "w", encoding="utf-8") as f:
        f.write(generate_robots_txt())
    print("✅ robots.txt تم إنشاؤها\n")

    # إنشاء Google Business Profiles
    print("🏪 جاري إنشاء Google Business Profiles...\n")
    profiles = create_google_business_profiles()
    
    # حفظ JSON الكامل
    json_data = json.dumps(profiles, ensure_ascii=False, indent=2)
    gbp_file = root / "google-business-profiles.json"
    with open(gbp_file, "w", encoding="utf-8") as f:
        f.write(json_data)
    
    print(f"✅ google-business-profiles.json تم إنشاؤها\n")

    # حفظ ملفات منفصلة لكل دولة
    print("📁 جاري إنشاء ملفات منفصلة لكل دولة:\n")
    for country_code, country_data in GULF_COUNTRIES.items():
        country_profiles = [p for p in profiles if p['country_code'] == country_code]
        country_file = root / f"gbp-{country_code.lower()}.json"
        with open(country_file, "w", encoding="utf-8") as f:
            f.write(json.dumps(country_profiles, ensure_ascii=False, indent=2))
        print(f"   ✅ gbp-{country_code.lower()}.json ({len(country_profiles)} ملف)")

    # النتائج النهائية
    print("\n" + "="*80)
    print("✨ النتائج النهائية:")
    print("="*80)
    print(f"✅ ملفات HTML محدثة: {ok}/{len(all_files)}")
    print(f"📁 ملفات JSON:")
    print(f"   • google-business-profiles.json ({len(profiles)} ملف تعريف)")
    for country_code in GULF_COUNTRIES.keys():
        print(f"   • gbp-{country_code.lower()}.json")
    
    print(f"\n🌐 دول الخليج:")
    total_cities = 0
    for code, country in GULF_COUNTRIES.items():
        city_count = len(country["cities"])
        total_cities += city_count
        print(f"   ✅ {country['name']}: {city_count} مدينة")
    
    print(f"\n💰 الإجمالي: {len(profiles)} Google Business Profile")
    print(f"📍 من {len(GULF_COUNTRIES)} دول و {total_cities} مدينة")
    print("\n" + "="*80 + "\n")

if __name__ == "__main__":
    main()
