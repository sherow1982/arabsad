/**
 * نظام الباك لنك المتقدم للمقالات والخدمات
 * Advanced Internal Linking System for Articles & Services
 * مؤسسة إعلانات العرب - ArabSad
 */

class AdvancedInternalLinking {
    constructor() {
        this.linkingMap = {
            // المقالات الرئيسية
            articles: {
                'google-ads-comprehensive-guide': {
                    url: '/arabsad/blog/articles/google-ads-comprehensive-guide.html',
                    title: 'دليل إعلانات جوجل الشامل 2025',
                    keywords: ['إعلانات جوجل', 'google ads', 'جوجل ادز', 'PPC', 'حملات البحث', 'إعلانات مدفوعة'],
                    relatedServices: ['google-ads'],
                    relatedArticles: ['seo-comprehensive-guide', 'social-media-ads-comprehensive-guide'],
                    relatedCountries: ['saudi', 'uae', 'kuwait', 'qatar'],
                    priority: 10
                },
                'seo-comprehensive-guide': {
                    url: '/arabsad/blog/articles/seo-comprehensive-guide.html',
                    title: 'دليل تحسين محركات البحث الشامل',
                    keywords: ['سيو', 'SEO', 'تحسين محركات البحث', 'ترتيب المواقع', 'تصدر نتائج البحث'],
                    relatedServices: ['seo', 'website-design'],
                    relatedArticles: ['google-ads-comprehensive-guide', 'website-design-comprehensive-guide'],
                    relatedCountries: ['saudi', 'uae', 'kuwait'],
                    priority: 10
                },
                'social-media-ads-comprehensive-guide': {
                    url: '/arabsad/blog/articles/social-media-ads-comprehensive-guide.html',
                    title: 'دليل إعلانات وسائل التواصل الشامل',
                    keywords: ['فيسبوك ادز', 'انستجرام ادز', 'سناب شات ادز', 'تيك توك ادز', 'إعلانات السوشيال ميديا'],
                    relatedServices: ['social-media-ads', 'social-management'],
                    relatedArticles: ['google-ads-comprehensive-guide', 'social-media-management-guide'],
                    relatedCountries: ['saudi', 'uae', 'qatar'],
                    priority: 9
                },
                'website-design-comprehensive-guide': {
                    url: '/arabsad/blog/articles/website-design-comprehensive-guide.html',
                    title: 'دليل تصميم المواقع الشامل',
                    keywords: ['تصميم مواقع', 'تطوير مواقع', 'مواقع متجاوبة', 'تصميم ويب'],
                    relatedServices: ['website-design', 'ecommerce'],
                    relatedArticles: ['seo-comprehensive-guide', 'ecommerce-comprehensive-guide'],
                    relatedCountries: ['uae', 'saudi'],
                    priority: 8
                },
                'ecommerce-comprehensive-guide': {
                    url: '/arabsad/blog/articles/ecommerce-comprehensive-guide.html',
                    title: 'دليل التجارة الإلكترونية الشامل',
                    keywords: ['متجر إلكتروني', 'تجارة إلكترونية', 'متاجر أونلاين', 'ecommerce'],
                    relatedServices: ['ecommerce', 'google-ads', 'seo'],
                    relatedArticles: ['website-design-comprehensive-guide', 'google-ads-comprehensive-guide'],
                    relatedCountries: ['saudi', 'uae', 'kuwait'],
                    priority: 8
                }
            },

            // مقالات الدول
            countryArticles: {
                'google-ads-saudi-guide-2025': {
                    url: '/arabsad/blog/google-ads-saudi-guide-2025.html',
                    title: 'دليل إعلانات جوجل في السعودية 2025',
                    keywords: ['جوجل ادز السعودية', 'إعلانات جوجل الرياض', 'google ads saudi'],
                    relatedServices: ['google-ads'],
                    relatedArticles: ['google-ads-comprehensive-guide'],
                    relatedCountries: ['saudi'],
                    relatedCities: ['riyadh', 'jeddah'],
                    priority: 9
                },
                'google-ads-uae-guide-2025': {
                    url: '/arabsad/blog/google-ads-uae-guide-2025.html',
                    title: 'دليل إعلانات جوجل في الإمارات 2025',
                    keywords: ['جوجل ادز الإمارات', 'إعلانات جوجل دبي', 'google ads uae'],
                    relatedServices: ['google-ads'],
                    relatedArticles: ['google-ads-comprehensive-guide'],
                    relatedCountries: ['uae'],
                    relatedCities: ['dubai', 'abudhabi'],
                    priority: 9
                }
            },

            // الخدمات
            services: {
                'google-ads': {
                    url: '/arabsad/services/google-ads.html',
                    title: 'خدمات إعلانات جوجل',
                    keywords: ['خدمات جوجل ادز', 'شركة إعلانات جوجل', 'إدارة حملات جوجل'],
                    relatedArticles: ['google-ads-comprehensive-guide', 'google-ads-saudi-guide-2025'],
                    relatedServices: ['seo', 'social-media-ads'],
                    relatedCountries: ['saudi', 'uae', 'kuwait'],
                    priority: 10
                },
                'seo': {
                    url: '/arabsad/services/seo.html',
                    title: 'خدمات تحسين محركات البحث',
                    keywords: ['خدمات سيو', 'شركة SEO', 'تحسين المواقع'],
                    relatedArticles: ['seo-comprehensive-guide'],
                    relatedServices: ['google-ads', 'website-design'],
                    relatedCountries: ['saudi', 'uae'],
                    priority: 10
                },
                'social-media-ads': {
                    url: '/arabsad/services/social-media-ads.html',
                    title: 'خدمات إعلانات وسائل التواصل',
                    keywords: ['خدمات فيسبوك ادز', 'إدارة إعلانات السوشيال ميديا'],
                    relatedArticles: ['social-media-ads-comprehensive-guide'],
                    relatedServices: ['google-ads', 'social-management'],
                    relatedCountries: ['saudi', 'uae', 'qatar'],
                    priority: 9
                }
            }
        };

        this.contextualPhrases = {
            'إعلانات جوجل': 'google-ads-comprehensive-guide',
            'جوجل ادز': 'google-ads-comprehensive-guide',
            'google ads': 'google-ads-comprehensive-guide',
            'سيو': 'seo-comprehensive-guide',
            'SEO': 'seo-comprehensive-guide',
            'تحسين محركات البحث': 'seo-comprehensive-guide',
            'فيسبوك ادز': 'social-media-ads-comprehensive-guide',
            'انستجرام ادز': 'social-media-ads-comprehensive-guide',
            'تصميم مواقع': 'website-design-comprehensive-guide',
            'متجر إلكتروني': 'ecommerce-comprehensive-guide',
            'تجارة إلكترونية': 'ecommerce-comprehensive-guide'
        };

        this.init();
    }

    init() {
        this.addContextualLinks();
        this.createRelatedContentSection();
        this.addArticleToArticleLinks();
        this.addServiceToArticleLinks();
        this.addCountrySpecificLinks();
        this.trackLinkPerformance();
    }

    addContextualLinks() {
        const content = document.querySelector('article') || document.body;
        
        Object.entries(this.contextualPhrases).forEach(([phrase, targetKey]) => {
            const target = this.findContentByKey(targetKey);
            if (!target || window.location.pathname.includes(target.url)) return;

            const regex = new RegExp(`\\b${phrase}\\b(?![^<]*>)`, 'gi');
            this.replaceTextWithLink(content, regex, target.url, target.title, phrase);
        });
    }

    replaceTextWithLink(element, regex, url, title, phrase) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    const parent = node.parentElement;
                    return !['A', 'SCRIPT', 'STYLE', 'BUTTON'].includes(parent.tagName) &&
                           !parent.classList.contains('internal-link')
                        ? NodeFilter.FILTER_ACCEPT 
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (regex.test(node.textContent)) {
                textNodes.push(node);
            }
        }

        textNodes.slice(0, 3).forEach(textNode => { // حد أقصى 3 روابط لكل عبارة
            const parent = textNode.parentNode;
            const wrapper = document.createElement('span');
            wrapper.innerHTML = textNode.textContent.replace(regex, 
                `<a href="${url}" title="${title}" class="contextual-internal-link" data-phrase="${phrase}">$&</a>`
            );
            parent.replaceChild(wrapper, textNode);
            
            while (wrapper.firstChild) {
                parent.insertBefore(wrapper.firstChild, wrapper);
            }
            parent.removeChild(wrapper);
        });
    }

    createRelatedContentSection() {
        const currentPath = window.location.pathname;
        const currentContent = this.findCurrentContent(currentPath);
        
        if (!currentContent) return;

        const relatedItems = this.getRelatedContent(currentContent);
        if (relatedItems.length === 0) return;

        const section = document.createElement('section');
        section.className = 'related-content-section';
        section.innerHTML = `
            <div class="container">
                <h3>📚 محتوى ذو صلة</h3>
                <div class="related-content-grid">
                    ${relatedItems.map(item => `
                        <a href="${item.url}" class="related-content-card" title="${item.title}">
                            <div class="card-icon">${this.getContentIcon(item.type)}</div>
                            <div class="card-content">
                                <h4>${item.title}</h4>
                                <p class="card-type">${this.getContentTypeLabel(item.type)}</p>
                            </div>
                            <div class="card-arrow">←</div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        const article = document.querySelector('article');
        if (article) {
            article.appendChild(section);
        }
    }

    getRelatedContent(currentContent) {
        const related = [];
        
        // إضافة المقالات ذات الصلة
        if (currentContent.relatedArticles) {
            currentContent.relatedArticles.forEach(articleKey => {
                const article = this.findContentByKey(articleKey);
                if (article) {
                    related.push({...article, type: 'article'});
                }
            });
        }

        // إضافة الخدمات ذات الصلة
        if (currentContent.relatedServices) {
            currentContent.relatedServices.forEach(serviceKey => {
                const service = this.linkingMap.services[serviceKey];
                if (service) {
                    related.push({...service, type: 'service'});
                }
            });
        }

        // إضافة الدول ذات الصلة
        if (currentContent.relatedCountries) {
            currentContent.relatedCountries.slice(0, 2).forEach(countryKey => {
                const countryPage = {
                    url: `/${countryKey}.html`,
                    title: this.getCountryTitle(countryKey),
                    type: 'country'
                };
                related.push(countryPage);
            });
        }

        return related.slice(0, 6); // حد أقصى 6 عناصر
    }

    addArticleToArticleLinks() {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/blog/articles/')) return;

        const currentArticle = this.findCurrentContent(currentPath);
        if (!currentArticle || !currentArticle.relatedArticles) return;

        // إضافة روابط في نهاية المقال
        const article = document.querySelector('article');
        if (article) {
            const linksSection = document.createElement('div');
            linksSection.className = 'article-cross-links';
            linksSection.innerHTML = `
                <h4>🔗 مقالات مرتبطة</h4>
                <div class="cross-links-list">
                    ${currentArticle.relatedArticles.map(articleKey => {
                        const relatedArticle = this.findContentByKey(articleKey);
                        return relatedArticle ? `
                            <a href="${relatedArticle.url}" class="cross-link">
                                📖 ${relatedArticle.title}
                            </a>
                        ` : '';
                    }).join('')}
                </div>
            `;
            
            const ctaSection = article.querySelector('.cta-section');
            if (ctaSection) {
                ctaSection.appendChild(linksSection);
            }
        }
    }

    addServiceToArticleLinks() {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/services/')) return;

        const currentService = this.findCurrentContent(currentPath);
        if (!currentService || !currentService.relatedArticles) return;

        // إضافة قسم "تعلم المزيد"
        const learnMoreSection = document.createElement('div');
        learnMoreSection.className = 'learn-more-section';
        learnMoreSection.innerHTML = `
            <h3>📚 تعلم المزيد</h3>
            <p>اقرأ أدلتنا الشاملة لتتعلم كيفية تحقيق أفضل النتائج:</p>
            <div class="learn-more-links">
                ${currentService.relatedArticles.map(articleKey => {
                    const article = this.findContentByKey(articleKey);
                    return article ? `
                        <a href="${article.url}" class="learn-more-link">
                            <span class="link-icon">📖</span>
                            <span class="link-text">${article.title}</span>
                        </a>
                    ` : '';
                }).join('')}
            </div>
        `;

        const mainContent = document.querySelector('main') || document.querySelector('.container');
        if (mainContent) {
            mainContent.appendChild(learnMoreSection);
        }
    }

    addCountrySpecificLinks() {
        const currentPath = window.location.pathname;
        const currentContent = this.findCurrentContent(currentPath);
        
        if (!currentContent || !currentContent.relatedCountries) return;

        // إضافة روابط للدول ذات الصلة
        const countryLinksSection = document.createElement('div');
        countryLinksSection.className = 'country-specific-links';
        countryLinksSection.innerHTML = `
            <h4>🌍 خدماتنا في دول الخليج</h4>
            <div class="country-links-grid">
                ${currentContent.relatedCountries.map(countryKey => `
                    <a href="/${countryKey}.html" class="country-link">
                        ${this.getCountryFlag(countryKey)} ${this.getCountryTitle(countryKey)}
                    </a>
                `).join('')}
            </div>
        `;

        const article = document.querySelector('article') || document.querySelector('main');
        if (article) {
            article.appendChild(countryLinksSection);
        }
    }

    findCurrentContent(path) {
        // البحث في المقالات
        for (const [key, content] of Object.entries(this.linkingMap.articles)) {
            if (path.includes(content.url) || path.includes(key)) {
                return content;
            }
        }

        // البحث في مقالات الدول
        for (const [key, content] of Object.entries(this.linkingMap.countryArticles)) {
            if (path.includes(content.url) || path.includes(key)) {
                return content;
            }
        }

        // البحث في الخدمات
        for (const [key, content] of Object.entries(this.linkingMap.services)) {
            if (path.includes(content.url) || path.includes(key)) {
                return content;
            }
        }

        return null;
    }

    findContentByKey(key) {
        return this.linkingMap.articles[key] || 
               this.linkingMap.countryArticles[key] || 
               this.linkingMap.services[key];
    }

    getContentIcon(type) {
        const icons = {
            'article': '📖',
            'service': '🎯',
            'country': '🌍',
            'city': '🏙️'
        };
        return icons[type] || '🔗';
    }

    getContentTypeLabel(type) {
        const labels = {
            'article': 'مقال',
            'service': 'خدمة',
            'country': 'دولة',
            'city': 'مدينة'
        };
        return labels[type] || 'محتوى';
    }

    getCountryTitle(countryKey) {
        const titles = {
            'saudi': 'السعودية',
            'uae': 'الإمارات',
            'kuwait': 'الكويت',
            'qatar': 'قطر',
            'bahrain': 'البحرين',
            'oman': 'عمان'
        };
        return titles[countryKey] || countryKey;
    }

    getCountryFlag(countryKey) {
        const flags = {
            'saudi': '🇸🇦',
            'uae': '🇦🇪',
            'kuwait': '🇰🇼',
            'qatar': '🇶🇦',
            'bahrain': '🇧🇭',
            'oman': '🇴🇲'
        };
        return flags[countryKey] || '🌍';
    }

    trackLinkPerformance() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('contextual-internal-link') ||
                e.target.closest('.related-content-card') ||
                e.target.closest('.cross-link') ||
                e.target.closest('.learn-more-link')) {
                
                const linkData = {
                    type: this.getLinkType(e.target),
                    source: window.location.pathname,
                    target: e.target.href || e.target.closest('a')?.href,
                    text: e.target.textContent || e.target.closest('a')?.textContent,
                    timestamp: new Date().toISOString()
                };

                // حفظ في localStorage للتحليل
                const clicks = JSON.parse(localStorage.getItem('arabsad_internal_clicks') || '[]');
                clicks.push(linkData);
                localStorage.setItem('arabsad_internal_clicks', JSON.stringify(clicks.slice(-100)));

                // إرسال لـ Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'internal_link_click', {
                        'link_type': linkData.type,
                        'source_page': linkData.source,
                        'target_page': linkData.target
                    });
                }
            }
        });
    }

    getLinkType(element) {
        if (element.classList.contains('contextual-internal-link')) return 'contextual';
        if (element.closest('.related-content-card')) return 'related_content';
        if (element.closest('.cross-link')) return 'cross_reference';
        if (element.closest('.learn-more-link')) return 'learn_more';
        return 'other';
    }
}

// تهيئة النظام
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedInternalLinking();
});

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedInternalLinking;
}