/**
 * نظام الباك لنك الداخلي القوي - مؤسسة إعلانات العرب
 * Internal Linking System for Enhanced SEO
 */

class InternalLinkingSystem {
    constructor() {
        this.linkMap = {
            // الخدمات الرئيسية
            'google-ads': {
                url: '/services/google-ads.html',
                title: 'خدمات إعلانات جوجل',
                keywords: ['جوجل ادز', 'google ads', 'إعلانات جوجل', 'حملات البحث', 'إعلانات مدفوعة']
            },
            'seo': {
                url: '/services/seo.html',
                title: 'خدمات تحسين محركات البحث SEO',
                keywords: ['سيو', 'seo', 'تحسين محركات البحث', 'ترتيب المواقع', 'تصدر نتائج البحث']
            },
            'social-media-ads': {
                url: '/services/social-media-ads.html',
                title: 'إعلانات وسائل التواصل الاجتماعي',
                keywords: ['فيسبوك ادز', 'انستجرام ادز', 'سناب شات ادز', 'تيك توك ادز', 'إعلانات السوشيال ميديا']
            },
            'website-design': {
                url: '/services/website-design.html',
                title: 'تصميم وتطوير المواقع',
                keywords: ['تصميم مواقع', 'تطوير مواقع', 'مواقع متجاوبة', 'تصميم ويب']
            },
            'ecommerce': {
                url: '/services/ecommerce.html',
                title: 'تصميم المتاجر الإلكترونية',
                keywords: ['متجر إلكتروني', 'تجارة إلكترونية', 'متاجر أونلاين', 'ecommerce']
            },

            // الدول
            'saudi': {
                url: '/sa.html',
                title: 'خدمات التسويق الرقمي في السعودية',
                keywords: ['السعودية', 'الرياض', 'جدة', 'الدمام', 'تسويق رقمي السعودية']
            },
            'uae': {
                url: '/ae.html',
                title: 'خدمات التسويق الرقمي في الإمارات',
                keywords: ['الإمارات', 'دبي', 'أبوظبي', 'الشارقة', 'تسويق رقمي الإمارات']
            },
            'kuwait': {
                url: '/kw.html',
                title: 'خدمات التسويق الرقمي في الكويت',
                keywords: ['الكويت', 'مدينة الكويت', 'تسويق رقمي الكويت']
            },
            'qatar': {
                url: '/qa.html',
                title: 'خدمات التسويق الرقمي في قطر',
                keywords: ['قطر', 'الدوحة', 'تسويق رقمي قطر']
            },
            'bahrain': {
                url: '/bh.html',
                title: 'خدمات التسويق الرقمي في البحرين',
                keywords: ['البحرين', 'المنامة', 'تسويق رقمي البحرين']
            },
            'oman': {
                url: '/om.html',
                title: 'خدمات التسويق الرقمي في عمان',
                keywords: ['عمان', 'مسقط', 'تسويق رقمي عمان']
            },

            // المدن
            'riyadh': {
                url: '/cities/riyadh-google-ads.html',
                title: 'خدمات جوجل ادز في الرياض',
                keywords: ['الرياض', 'جوجل ادز الرياض', 'تسويق رقمي الرياض']
            },
            'jeddah': {
                url: '/cities/jeddah-google-ads.html',
                title: 'خدمات جوجل ادز في جدة',
                keywords: ['جدة', 'جوجل ادز جدة', 'تسويق رقمي جدة']
            },
            'dubai': {
                url: '/cities/dubai-digital-marketing.html',
                title: 'خدمات التسويق الرقمي في دبي',
                keywords: ['دبي', 'تسويق رقمي دبي', 'إعلانات دبي']
            },

            // المقالات والمدونة
            'blog': {
                url: '/blog/',
                title: 'مدونة التسويق الرقمي',
                keywords: ['مدونة', 'مقالات تسويق', 'نصائح تسويقية', 'دليل التسويق']
            }
        };

        this.contextualLinks = {
            'google-ads': ['seo', 'social-media-ads', 'saudi', 'uae', 'riyadh', 'dubai'],
            'seo': ['google-ads', 'website-design', 'ecommerce', 'blog'],
            'social-media-ads': ['google-ads', 'seo', 'kuwait', 'qatar'],
            'website-design': ['seo', 'ecommerce', 'bahrain', 'oman'],
            'ecommerce': ['seo', 'google-ads', 'website-design'],
            'saudi': ['riyadh', 'jeddah', 'google-ads', 'seo'],
            'uae': ['dubai', 'google-ads', 'social-media-ads'],
            'kuwait': ['social-media-ads', 'website-design'],
            'qatar': ['google-ads', 'seo'],
            'bahrain': ['website-design', 'ecommerce'],
            'oman': ['seo', 'social-media-ads']
        };

        this.init();
    }

    init() {
        this.addInternalLinks();
        this.createRelatedLinksSection();
        this.addBreadcrumbs();
        this.trackLinkClicks();
    }

    addInternalLinks() {
        const content = document.body;
        if (!content) return;

        Object.entries(this.linkMap).forEach(([key, data]) => {
            data.keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                this.replaceTextWithLinks(content, regex, data.url, data.title, keyword);
            });
        });
    }

    replaceTextWithLinks(element, regex, url, title, keyword) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    return node.parentElement.tagName !== 'A' && 
                           node.parentElement.tagName !== 'SCRIPT' &&
                           node.parentElement.tagName !== 'STYLE'
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

        textNodes.forEach(textNode => {
            const parent = textNode.parentNode;
            const wrapper = document.createElement('span');
            wrapper.innerHTML = textNode.textContent.replace(regex, 
                `<a href="${url}" title="${title}" class="internal-link" data-keyword="${keyword}">$&</a>`
            );
            parent.replaceChild(wrapper, textNode);
            
            // Unwrap the span
            while (wrapper.firstChild) {
                parent.insertBefore(wrapper.firstChild, wrapper);
            }
            parent.removeChild(wrapper);
        });
    }

    createRelatedLinksSection() {
        const currentPage = this.getCurrentPageKey();
        if (!currentPage || !this.contextualLinks[currentPage]) return;

        const relatedLinks = this.contextualLinks[currentPage]
            .map(key => this.linkMap[key])
            .filter(Boolean)
            .slice(0, 4);

        if (relatedLinks.length === 0) return;

        const section = document.createElement('section');
        section.className = 'related-links-section';
        section.innerHTML = `
            <div class="container">
                <h3>🔗 صفحات ذات صلة</h3>
                <div class="related-links-grid">
                    ${relatedLinks.map(link => `
                        <a href="${link.url}" class="related-link-card" title="${link.title}">
                            <span class="link-icon">🔗</span>
                            <span class="link-title">${link.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        // Insert before footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.parentNode.insertBefore(section, footer);
        } else {
            document.body.appendChild(section);
        }
    }

    addBreadcrumbs() {
        const breadcrumbData = this.generateBreadcrumbs();
        if (!breadcrumbData.length) return;

        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'breadcrumb';
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');
        
        breadcrumb.innerHTML = `
            <div class="container">
                <ol class="breadcrumb-list">
                    ${breadcrumbData.map((item, index) => `
                        <li class="breadcrumb-item ${index === breadcrumbData.length - 1 ? 'active' : ''}">
                            ${index === breadcrumbData.length - 1 
                                ? `<span>${item.title}</span>`
                                : `<a href="${item.url}" title="${item.title}">${item.title}</a>`
                            }
                        </li>
                    `).join('')}
                </ol>
            </div>
        `;

        const main = document.querySelector('main') || document.querySelector('.main-content');
        if (main) {
            main.insertBefore(breadcrumb, main.firstChild);
        }
    }

    generateBreadcrumbs() {
        const path = window.location.pathname;
        const breadcrumbs = [];

        if (path.includes('/services/')) {
            breadcrumbs.push({ title: 'الخدمات', url: '/services/' });
        } else if (path.includes('/blog/')) {
            breadcrumbs.push({ title: 'المدونة', url: '/blog/' });
        } else if (path.includes('/cities/')) {
            breadcrumbs.push({ title: 'المدن', url: '/cities/' });
        }

        // Add current page
        const currentPage = this.getCurrentPageKey();
        if (currentPage && this.linkMap[currentPage]) {
            breadcrumbs.push({ 
                title: this.linkMap[currentPage].title, 
                url: this.linkMap[currentPage].url 
            });
        }

        return breadcrumbs;
    }

    getCurrentPageKey() {
        const path = window.location.pathname;
        
        for (const [key, data] of Object.entries(this.linkMap)) {
            if (path.includes(data.url.replace('/arabsad', ''))) {
                return key;
            }
        }
        return null;
    }

    trackLinkClicks() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('internal-link')) {
                const keyword = e.target.dataset.keyword;
                const url = e.target.href;
                
                // Track with Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'internal_link_click', {
                        'link_text': keyword,
                        'link_url': url,
                        'page_location': window.location.href
                    });
                }
                
                console.log('Internal link clicked:', { keyword, url });
            }
        });
    }
}

// CSS Styles for Internal Linking
const linkingStyles = `
<style>
.internal-link {
    color: #2563eb;
    text-decoration: underline;
    text-decoration-color: rgba(37, 99, 235, 0.3);
    text-underline-offset: 2px;
    transition: all 0.2s ease;
}

.internal-link:hover {
    color: #1d4ed8;
    text-decoration-color: #1d4ed8;
}

.related-links-section {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 3rem 0;
    margin: 3rem 0;
    border-top: 1px solid #e2e8f0;
}

.related-links-section h3 {
    text-align: center;
    color: #1e293b;
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

.related-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
}

.related-link-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-decoration: none;
    color: #374151;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.related-link-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #2563eb;
}

.link-icon {
    font-size: 1.2rem;
    color: #2563eb;
}

.link-title {
    font-weight: 500;
    flex: 1;
}

.breadcrumb {
    background: #f8fafc;
    padding: 1rem 0;
    border-bottom: 1px solid #e2e8f0;
}

.breadcrumb-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.875rem;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
    content: '←';
    margin: 0 0.5rem;
    color: #6b7280;
}

.breadcrumb-item a {
    color: #2563eb;
    text-decoration: none;
}

.breadcrumb-item a:hover {
    text-decoration: underline;
}

.breadcrumb-item.active span {
    color: #374151;
    font-weight: 500;
}

@media (max-width: 768px) {
    .related-links-grid {
        grid-template-columns: 1fr;
    }
    
    .breadcrumb-list {
        flex-wrap: wrap;
    }
}
</style>
`;

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS styles
    document.head.insertAdjacentHTML('beforeend', linkingStyles);
    
    // Initialize internal linking system
    new InternalLinkingSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InternalLinkingSystem;
}