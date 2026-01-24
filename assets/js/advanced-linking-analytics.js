/**
 * تحليل أداء نظام الباك لنك المتقدم
 * Advanced Internal Linking Performance Analytics
 * مؤسسة إعلانات العرب - ArabSad
 */

class AdvancedLinkingAnalytics {
    constructor() {
        this.linkingData = {
            contextualLinks: new Map(),
            relatedContent: new Map(),
            crossReferences: new Map(),
            countryLinks: new Map(),
            serviceToArticle: new Map()
        };
        
        this.performanceMetrics = {
            totalClicks: 0,
            uniqueUsers: new Set(),
            conversionRate: 0,
            averageTimeOnPage: 0,
            bounceRate: 0,
            pageDepth: new Map()
        };
        
        this.seoMetrics = {
            linkJuiceDistribution: new Map(),
            internalLinkDensity: 0,
            contextualRelevance: 0,
            anchorTextVariation: new Map()
        };
        
        this.init();
    }
    
    init() {
        this.trackLinkInteractions();
        this.analyzeLinkDistribution();
        this.monitorSEOMetrics();
        this.generateReports();
        this.setupRealTimeTracking();
    }
    
    trackLinkInteractions() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link || !this.isInternalLink(link)) return;
            
            const linkData = {
                type: this.getLinkType(link),
                source: window.location.pathname,
                target: link.getAttribute('href'),
                anchorText: link.textContent.trim(),
                position: this.getLinkPosition(link),
                timestamp: Date.now(),
                userId: this.getUserId()
            };
            
            this.recordLinkClick(linkData);
            this.updatePerformanceMetrics(linkData);
            this.sendToAnalytics(linkData);
        });
    }
    
    isInternalLink(link) {
        const href = link.getAttribute('href');
        return href && (
            href.startsWith('/') || 
            href.includes('sherow1982.github.io/arabsad') ||
            href.startsWith('#')
        );
    }
    
    getLinkType(link) {
        if (link.classList.contains('contextual-internal-link')) return 'contextual';
        if (link.closest('.related-content-card')) return 'related_content';
        if (link.closest('.cross-link')) return 'cross_reference';
        if (link.closest('.learn-more-link')) return 'learn_more';
        if (link.closest('.country-link')) return 'country_specific';
        return 'other';
    }
    
    getLinkPosition(link) {
        const rect = link.getBoundingClientRect();
        const docHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        return {
            x: rect.left,
            y: rect.top + scrollPosition,
            relativePosition: (rect.top + scrollPosition) / docHeight,
            viewportPosition: rect.top / viewportHeight,
            isAboveFold: rect.top < viewportHeight
        };
    }
    
    recordLinkClick(linkData) {
        const linkMap = this.linkingData[this.getLinkMapKey(linkData.type)];
        const linkKey = `${linkData.source}->${linkData.target}`;
        
        if (!linkMap.has(linkKey)) {
            linkMap.set(linkKey, {
                clicks: 0,
                uniqueUsers: new Set(),
                anchorTexts: new Map(),
                positions: [],
                firstClick: linkData.timestamp,
                lastClick: linkData.timestamp
            });
        }
        
        const linkStats = linkMap.get(linkKey);
        linkStats.clicks++;
        linkStats.uniqueUsers.add(linkData.userId);
        linkStats.positions.push(linkData.position);
        linkStats.lastClick = linkData.timestamp;
        
        // تتبع تنوع النص المرساة
        const anchorCount = linkStats.anchorTexts.get(linkData.anchorText) || 0;
        linkStats.anchorTexts.set(linkData.anchorText, anchorCount + 1);
    }
    
    getLinkMapKey(linkType) {
        const typeMap = {
            'contextual': 'contextualLinks',
            'related_content': 'relatedContent',
            'cross_reference': 'crossReferences',
            'country_specific': 'countryLinks',
            'learn_more': 'serviceToArticle'
        };
        return typeMap[linkType] || 'contextualLinks';
    }
    
    updatePerformanceMetrics(linkData) {
        this.performanceMetrics.totalClicks++;
        this.performanceMetrics.uniqueUsers.add(linkData.userId);
        
        // تحديث عمق الصفحة
        const currentDepth = this.performanceMetrics.pageDepth.get(linkData.userId) || 0;
        this.performanceMetrics.pageDepth.set(linkData.userId, currentDepth + 1);
    }
    
    analyzeLinkDistribution() {
        const allLinks = document.querySelectorAll('a[href^="/"], a[href*="arabsad"]');
        const totalWords = this.countWords(document.body);
        
        this.seoMetrics.internalLinkDensity = (allLinks.length / totalWords) * 100;
        
        // تحليل توزيع Link Juice
        allLinks.forEach(link => {
            const target = link.getAttribute('href');
            const currentJuice = this.seoMetrics.linkJuiceDistribution.get(target) || 0;
            this.seoMetrics.linkJuiceDistribution.set(target, currentJuice + 1);
        });
        
        // حساب الصلة السياقية
        this.calculateContextualRelevance();
    }
    
    calculateContextualRelevance() {
        const contextualLinks = document.querySelectorAll('.contextual-internal-link');
        let totalRelevance = 0;
        
        contextualLinks.forEach(link => {
            const anchorText = link.textContent.toLowerCase();
            const targetUrl = link.getAttribute('href');
            const relevanceScore = this.calculateRelevanceScore(anchorText, targetUrl);
            totalRelevance += relevanceScore;
        });
        
        this.seoMetrics.contextualRelevance = contextualLinks.length > 0 
            ? totalRelevance / contextualLinks.length 
            : 0;
    }
    
    calculateRelevanceScore(anchorText, targetUrl) {
        // خوارزمية بسيطة لحساب الصلة
        const keywords = {
            'جوجل': ['google-ads'],
            'سيو': ['seo'],
            'فيسبوك': ['social-media'],
            'تصميم': ['website-design'],
            'متجر': ['ecommerce']
        };
        
        let score = 0;
        Object.entries(keywords).forEach(([keyword, urls]) => {
            if (anchorText.includes(keyword)) {
                urls.forEach(url => {
                    if (targetUrl.includes(url)) score += 1;
                });
            }
        });
        
        return Math.min(score, 1); // تطبيع النتيجة بين 0-1
    }
    
    countWords(element) {
        const text = element.textContent || element.innerText || '';
        return text.trim().split(/\s+/).length;
    }
    
    monitorSEOMetrics() {
        // مراقبة مقاييس SEO في الوقت الفعلي
        setInterval(() => {
            this.updateSEOMetrics();
        }, 30000); // كل 30 ثانية
    }
    
    updateSEOMetrics() {
        // تحديث كثافة الروابط
        this.analyzeLinkDistribution();
        
        // حساب معدل التحويل
        const totalUsers = this.performanceMetrics.uniqueUsers.size;
        const convertedUsers = Array.from(this.performanceMetrics.pageDepth.values())
            .filter(depth => depth >= 3).length;
        
        this.performanceMetrics.conversionRate = totalUsers > 0 
            ? (convertedUsers / totalUsers) * 100 
            : 0;
    }
    
    generateReports() {
        // تقرير يومي
        setInterval(() => {
            this.generateDailyReport();
        }, 24 * 60 * 60 * 1000);
        
        // تقرير أسبوعي
        setInterval(() => {
            this.generateWeeklyReport();
        }, 7 * 24 * 60 * 60 * 1000);
    }
    
    generateDailyReport() {
        const report = {
            date: new Date().toISOString().split('T')[0],
            performance: {
                totalClicks: this.performanceMetrics.totalClicks,
                uniqueUsers: this.performanceMetrics.uniqueUsers.size,
                conversionRate: this.performanceMetrics.conversionRate,
                averagePageDepth: this.calculateAveragePageDepth()
            },
            seo: {
                linkDensity: this.seoMetrics.internalLinkDensity,
                contextualRelevance: this.seoMetrics.contextualRelevance,
                topLinkedPages: this.getTopLinkedPages(10)
            },
            linkTypes: {
                contextual: this.linkingData.contextualLinks.size,
                relatedContent: this.linkingData.relatedContent.size,
                crossReferences: this.linkingData.crossReferences.size,
                countrySpecific: this.linkingData.countryLinks.size,
                serviceToArticle: this.linkingData.serviceToArticle.size
            }
        };
        
        this.saveReport('daily', report);
        console.log('📊 تقرير يومي - نظام الباك لنك المتقدم:', report);
    }
    
    generateWeeklyReport() {
        const weeklyData = this.getWeeklyData();
        
        const report = {
            week: this.getWeekNumber(),
            summary: {
                totalClicks: weeklyData.totalClicks,
                uniqueUsers: weeklyData.uniqueUsers,
                topPerformingLinks: weeklyData.topLinks,
                linkTypeDistribution: weeklyData.linkDistribution,
                seoImprovements: this.calculateSEOImprovements(weeklyData)
            },
            recommendations: this.generateRecommendations(weeklyData)
        };
        
        this.saveReport('weekly', report);
        console.log('📈 تقرير أسبوعي - نظام الباك لنك المتقدم:', report);
    }
    
    calculateAveragePageDepth() {
        const depths = Array.from(this.performanceMetrics.pageDepth.values());
        return depths.length > 0 
            ? depths.reduce((sum, depth) => sum + depth, 0) / depths.length 
            : 0;
    }
    
    getTopLinkedPages(limit = 10) {
        return Array.from(this.seoMetrics.linkJuiceDistribution.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([url, count]) => ({ url, linkCount: count }));
    }
    
    generateRecommendations(weeklyData) {
        const recommendations = [];
        
        // توصيات كثافة الروابط
        if (this.seoMetrics.internalLinkDensity < 1) {
            recommendations.push({
                type: 'link_density',
                priority: 'high',
                message: 'كثافة الروابط الداخلية منخفضة. يُنصح بزيادة الروابط السياقية.',
                target: 2
            });
        }
        
        // توصيات الصلة السياقية
        if (this.seoMetrics.contextualRelevance < 0.7) {
            recommendations.push({
                type: 'contextual_relevance',
                priority: 'medium',
                message: 'تحسين الصلة السياقية للروابط الداخلية.',
                target: 0.8
            });
        }
        
        // توصيات معدل التحويل
        if (this.performanceMetrics.conversionRate < 15) {
            recommendations.push({
                type: 'conversion_rate',
                priority: 'high',
                message: 'معدل التحويل منخفض. تحسين جودة الروابط والمحتوى المرتبط.',
                target: 20
            });
        }
        
        return recommendations;
    }
    
    setupRealTimeTracking() {
        // تتبع الوقت الفعلي
        this.startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const sessionTime = Date.now() - this.startTime;
            this.performanceMetrics.averageTimeOnPage = sessionTime;
            this.saveSessionData();
        });
    }
    
    sendToAnalytics(linkData) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'advanced_internal_link_click', {
                'link_type': linkData.type,
                'source_page': linkData.source,
                'target_page': linkData.target,
                'anchor_text': linkData.anchorText,
                'position_relative': linkData.position.relativePosition,
                'above_fold': linkData.position.isAboveFold
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'AdvancedInternalLinkClick', {
                link_type: linkData.type,
                source_page: linkData.source,
                target_page: linkData.target
            });
        }
    }
    
    getUserId() {
        let userId = localStorage.getItem('arabsad_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('arabsad_user_id', userId);
        }
        return userId;
    }
    
    saveReport(type, report) {
        const reports = JSON.parse(localStorage.getItem(`arabsad_reports_${type}`) || '[]');
        reports.push(report);
        localStorage.setItem(`arabsad_reports_${type}`, JSON.stringify(reports.slice(-30)));
    }
    
    saveSessionData() {
        const sessionData = {
            timestamp: Date.now(),
            performance: this.performanceMetrics,
            seo: this.seoMetrics,
            linkingData: {
                contextualLinks: Array.from(this.linkingData.contextualLinks.entries()),
                relatedContent: Array.from(this.linkingData.relatedContent.entries()),
                crossReferences: Array.from(this.linkingData.crossReferences.entries()),
                countryLinks: Array.from(this.linkingData.countryLinks.entries()),
                serviceToArticle: Array.from(this.linkingData.serviceToArticle.entries())
            }
        };
        
        localStorage.setItem('arabsad_advanced_linking_session', JSON.stringify(sessionData));
    }
    
    // API للمطورين
    getAnalytics() {
        return {
            performance: this.performanceMetrics,
            seo: this.seoMetrics,
            linkingData: this.linkingData,
            reports: {
                daily: JSON.parse(localStorage.getItem('arabsad_reports_daily') || '[]'),
                weekly: JSON.parse(localStorage.getItem('arabsad_reports_weekly') || '[]')
            }
        };
    }
    
    exportData() {
        return JSON.stringify(this.getAnalytics(), null, 2);
    }
    
    clearData() {
        localStorage.removeItem('arabsad_reports_daily');
        localStorage.removeItem('arabsad_reports_weekly');
        localStorage.removeItem('arabsad_advanced_linking_session');
        localStorage.removeItem('arabsad_user_id');
        
        // إعادة تعيين البيانات
        Object.keys(this.linkingData).forEach(key => {
            this.linkingData[key].clear();
        });
        
        this.performanceMetrics = {
            totalClicks: 0,
            uniqueUsers: new Set(),
            conversionRate: 0,
            averageTimeOnPage: 0,
            bounceRate: 0,
            pageDepth: new Map()
        };
    }
    
    getWeekNumber() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        return Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
    }
    
    getWeeklyData() {
        // استخراج البيانات الأسبوعية من التقارير اليومية
        const dailyReports = JSON.parse(localStorage.getItem('arabsad_reports_daily') || '[]');
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const weeklyReports = dailyReports.filter(report => 
            new Date(report.date) >= weekAgo
        );
        
        return {
            totalClicks: weeklyReports.reduce((sum, report) => sum + report.performance.totalClicks, 0),
            uniqueUsers: weeklyReports.reduce((sum, report) => sum + report.performance.uniqueUsers, 0),
            topLinks: this.getTopLinkedPages(5),
            linkDistribution: this.getLinkTypeDistribution()
        };
    }
    
    getLinkTypeDistribution() {
        return {
            contextual: this.linkingData.contextualLinks.size,
            relatedContent: this.linkingData.relatedContent.size,
            crossReferences: this.linkingData.crossReferences.size,
            countrySpecific: this.linkingData.countryLinks.size,
            serviceToArticle: this.linkingData.serviceToArticle.size
        };
    }
    
    calculateSEOImprovements(weeklyData) {
        // حساب التحسينات في SEO مقارنة بالأسبوع السابق
        const previousWeekData = this.getPreviousWeekData();
        
        return {
            linkDensityImprovement: this.seoMetrics.internalLinkDensity - (previousWeekData.linkDensity || 0),
            contextualRelevanceImprovement: this.seoMetrics.contextualRelevance - (previousWeekData.contextualRelevance || 0),
            clickThroughRateImprovement: (weeklyData.totalClicks / weeklyData.uniqueUsers) - (previousWeekData.ctr || 0)
        };
    }
    
    getPreviousWeekData() {
        // استخراج بيانات الأسبوع السابق
        const weeklyReports = JSON.parse(localStorage.getItem('arabsad_reports_weekly') || '[]');
        return weeklyReports[weeklyReports.length - 2] || {};
    }
}

// تهيئة النظام
document.addEventListener('DOMContentLoaded', () => {
    window.advancedLinkingAnalytics = new AdvancedLinkingAnalytics();
    
    // إضافة أوامر وحدة التحكم للمطورين
    window.advancedLinkingAnalytics.console = {
        getAnalytics: () => window.advancedLinkingAnalytics.getAnalytics(),
        exportData: () => window.advancedLinkingAnalytics.exportData(),
        clearData: () => window.advancedLinkingAnalytics.clearData(),
        generateReport: () => window.advancedLinkingAnalytics.generateDailyReport()
    };
    
    console.log('🔗 نظام تحليل الباك لنك المتقدم جاهز!');
    console.log('💡 استخدم: advancedLinkingAnalytics.console.getAnalytics() للحصول على التحليلات');
});

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedLinkingAnalytics;
}