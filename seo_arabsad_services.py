#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سكربت سكيما وSEO لصفحات arabsad-ads
ريبو: arabsad-ads (مؤسسة إعلانات العرب)
البنية:
- root: ملفات HTML رئيسية
- services/: صفحات الخدمات
- cities/: صفحات المدن
- blog/: المدونة
- blog/articles/: المقالات
"""

import sys
import re
from pathlib import Path
from datetime import datetime, timedelta

def extract_title(html: str) -> str:
    """استخراج العنوان من <title> أو <h1>"""
    m = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
    if m:
        txt = m.group(1).strip()
        if '|' in txt:
            txt = txt.split('|')[0].strip()
        return txt if txt else "صفحة من مؤسسة إعلانات العرب"
    m = re.search(r'<h1[^>]*>([^<]+)</h1>', html, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return "صفحة من مؤسسة إعلانات العرب"

def extract_description(html: str) -> str:
    """استخراج وصف من meta أو النص"""
    m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    m = re.search(r'<p[^>]*>([^<]+)</p>', html, re.IGNORECASE)
    if m:
        txt = m.group(1).strip()
        if len(txt) > 155:
            txt = txt[:152] + "..."
        return txt
    return "خدمات تسويق رقمي متميزة من مؤسسة إعلانات العرب"

def extract_image(html: str) -> str:
    """استخراج أول صورة من الصفحة"""
    m = re.search(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html, re.IGNORECASE)
    if m:
        src = m.group(1).strip()
        if src.startswith('http'):
            return src
        # تطبيع المسار
        src = src.lstrip('./')
        return f"https://sherow1982.github.io/arabsad-ads/{src}"
    return "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg"

def determine_page_type(file_path: Path) -> str:
    """تحديد نوع الصفحة (service, city, article, etc)"""
    relative = str(file_path.relative_to(Path("."))).lower()
    
    if 'blog/articles' in relative:
        return 'article'
    elif 'blog' in relative:
        return 'blog'
    elif 'services' in relative:
        return 'service'
    elif 'cities' in relative:
        return 'city'
    else:
        return 'page'

def build_page_url(file_path: Path) -> str:
    """بناء رابط GitHub Pages للصفحة"""
    relative_path = file_path.relative_to(Path("."))
    url_path = str(relative_path).replace("\\", "/")
    return f"https://sherow1982.github.io/arabsad-ads/{url_path}"

def create_service_schema(title: str, image: str, url: str, description: str) -> str:
    """إنشاء Service Schema"""
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
        "areaServed": {
            "@type": "Country",
            "name": "العالم العربي"
        },
        "priceRange": "$$-$$$"
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_article_schema(title: str, image: str, url: str, description: str, file_path: Path) -> str:
    """إنشاء Article Schema"""
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
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        "url": url
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_organization_schema() -> str:
    """إنشاء Organization Schema"""
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
            "addressLocality": "حدائق أكتوبر",
            "streetAddress": "مصر"
        },
        "sameAs": [
            "https://www.facebook.com/arabsad",
            "https://www.twitter.com/arabsad",
            "https://www.instagram.com/arabsad"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "telephone": "+201110760081",
            "availableLanguage": ["ar"]
        }
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_local_business_schema() -> str:
    """إنشاء LocalBusiness Schema"""
    import json
    schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "مؤسسة إعلانات العرب",
        "image": "https://sherow1982.github.io/arabsad-ads/assets/images/logo.svg",
        "url": "https://sherow1982.github.io/arabsad-ads/",
        "telephone": "+201110760081",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "حدائق أكتوبر",
            "addressLocality": "الجيزة",
            "addressRegion": "الجيزة",
            "postalCode": "12572",
            "addressCountry": "EG"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.0031",
            "longitude": "31.2089"
        },
        "openingHours": "Su-Sa 08:00-23:00",
        "priceRange": "$$"
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_breadcrumb_schema(file_path: Path) -> str:
    """إنشاء Breadcrumb Schema"""
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
        current_path += f"/{part}" if current_path else f"{part}"
        name = part.replace('-', ' ').replace('.html', '').title()
        item_url = f"{base_url}/{current_path}"
        breadcrumb_items.append({
            "@type": "ListItem",
            "position": i,
            "name": name,
            "item": item_url
        })
    
    # آخر عنصر (الصفحة الحالية)
    current_path += f"/{parts[-1]}" if current_path else parts[-1]
    last_name = parts[-1].replace('-', ' ').replace('.html', '').title()
    breadcrumb_items.append({
        "@type": "ListItem",
        "position": len(parts) + 1,
        "name": last_name,
        "item": f"{base_url}/{current_path}"
    })
    
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb_items
    }
    return json.dumps(schema, ensure_ascii=False, indent=2)

def create_meta_tags(title: str, image: str, url: str, description: str) -> str:
    """إنشاء Meta + OG + Twitter tags"""
    if len(description) > 155:
        desc_short = description[:152] + "..."
    else:
        desc_short = description
    
    # تنظيف العنوان
    title_clean = title.replace('"', '').replace("'", '')
    
    meta = f"""
    <!-- SEO Meta Tags (Auto) -->
    <meta charset="UTF-8">
    <title>{title_clean} - مؤسسة إعلانات العرب</title>
    <meta name="description" content="{desc_short}">
    <meta name="keywords" content="{title_clean}, تسويق رقمي, Google Ads, Facebook Ads, SEO, مؤسسة إعلانات العرب">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="geo.region" content="EG">
    <meta name="geo.placename" content="مصر">
    <meta name="geo.position" content="30.0031;31.2089">
    <link rel="canonical" href="{url}">
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
    <meta name="twitter:title" content="{title_clean} - مؤسسة إعلانات العرب">
    <meta name="twitter:description" content="{desc_short}">
    <meta name="twitter:image" content="{image}">
    """
    return meta

def inject_seo(html: str, title: str, image: str, url: str, description: str, file_path: Path, page_type: str) -> str:
    """حقن الميتا والسكيما في <head>"""
    # ضمان وجود </head>
    if '</head>' not in html:
        if '<body' in html.lower():
            html = html.replace('<body', '</head><body', 1)
        else:
            html = html + '</head>'
    
    # إزالة أي سكيما JSON-LD قديم
    html = re.sub(
        r'<script\s+type=["\']?application/ld\+json["\']?\s*>.*?</script>',
        '',
        html,
        flags=re.DOTALL | re.IGNORECASE
    )
    
    meta = create_meta_tags(title, image, url, description)
    org_schema = create_organization_schema()
    local_schema = create_local_business_schema()
    breadcrumb_schema = create_breadcrumb_schema(file_path)
    
    # Schema حسب نوع الصفحة
    if page_type == 'article':
        main_schema = create_article_schema(title, image, url, description, file_path)
        schema_type = "<!-- Article Schema JSON-LD (Auto) -->"
    else:
        main_schema = create_service_schema(title, image, url, description)
        schema_type = "<!-- Service Schema JSON-LD (Auto) -->"
    
    injection = f"""
{meta}

{schema_type}
<script type="application/ld+json">
{main_schema}
</script>

<!-- Organization Schema JSON-LD (Auto) -->
<script type="application/ld+json">
{org_schema}
</script>

<!-- LocalBusiness Schema JSON-LD (Auto) -->
<script type="application/ld+json">
{local_schema}
</script>

<!-- Breadcrumb Schema JSON-LD (Auto) -->
<script type="application/ld+json">
{breadcrumb_schema}
</script>

</head>"""
    
    return html.replace('</head>', injection, 1)

def process_file(file_path: Path) -> tuple:
    """معالجة ملف HTML واحد"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            html = f.read()
        
        title = extract_title(html)
        image = extract_image(html)
        description = extract_description(html)
        url = build_page_url(file_path)
        page_type = determine_page_type(file_path)
        
        updated = inject_seo(html, title, image, url, description, file_path, page_type)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(updated)
        
        return (True, file_path.relative_to(Path(".")), page_type)
    except Exception as e:
        return (False, file_path.relative_to(Path(".")), str(e))

def main():
    print("\n" + "="*70)
    print("🏆 سكربت SEO + سكيما لمؤسسة إعلانات العرب 🏆")
    print("="*70 + "\n")

    root = Path(".")
    
    # البحث عن ملفات HTML في جميع المجالات
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
        print("\n❌ لم يتم العثور على أي ملفات HTML في المشروع")
        sys.exit(1)

    print(f"\n📦 إجمالي الملفات: {len(all_files)}\n")
    print("-" * 70 + "\n")

    ok = 0
    fail = 0
    stats = {"service": 0, "article": 0, "city": 0, "blog": 0, "page": 0}

    for i, fp in enumerate(all_files, 1):
        rel_path = fp.relative_to(root)
        print(f"[{i}/{len(all_files)}] {rel_path} ...", end=" ")
        
        success, filename, result = process_file(fp)
        if success:
            page_type = result
            stats[page_type] = stats.get(page_type, 0) + 1
            print(f"✅ ({page_type})")
            ok += 1
        else:
            print(f"❌ {result}")
            fail += 1

    print("\n" + "="*70)
    print("📊 النتائج النهائية:")
    print("="*70)
    print(f"✅ نجح: {ok} ملف")
    print(f"❌ فشل: {fail} ملف")
    print(f"📈 نسبة النجاح: {(ok/len(all_files)*100):.1f}%")
    print("\n📋 تفاصيل حسب النوع:")
    for page_type, count in stats.items():
        if count > 0:
            print(f"   • {page_type}: {count} ملف")
    print("="*70)
    print("\n✨ تم إضافة Schema ومحسنات SEO لكل الصفحات!\n")

if __name__ == "__main__":
    main()
