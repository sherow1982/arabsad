/**
 * تحليل وتقرير نظام الباك لنك الداخلي
 * Internal Linking Analytics & Reporting System
 * مؤسسة إعلانات العرب - ArabSad
 */

class InternalLinkingAnalytics {
    constructor() {
        this.linkClicks = new Map();
        this.pageViews = new Map();
        this.linkPerformance = new Map();
        this.userJourney = [];
        this.sessionId = this.generateSessionId();
        
        this.init();
    }

    init() {
        this.trackPageView();
        this.setupLinkTracking();
        this.setupPerformanceMonitoring();
        this.setupReporting();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    trackPageView() {
        const currentPage = window.location.pathname;
        const timestamp = new Date().toISOString();
        
        // تسجيل زيارة الصفحة
        if (!this.pageViews.has(currentPage)) {
            this.pageViews.set(currentPage, []);
        }
        this.pageViews.get(currentPage).push({
            timestamp,
            sessionId: this.sessionId,
            referrer: document.referrer,
            userAgent: navigator.userAgent
        });

        // إضافة للرحلة
        this.userJourney.push({
            page: currentPage,
            timestamp,
            action: 'page_view'
        });

        this.saveToLocalStorage();
    }

    setupLinkTracking() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('internal-link') || 
                e.target.closest('.related-link-card') ||
                e.target.closest('.breadcrumb-item a')) {
                
                this.trackLinkClick(e.target);
            }
        });
    }

    trackLinkClick(element) {
        const linkUrl = element.href || element.closest('a')?.href;
        const linkText = element.textContent || element.closest('a')?.textContent;
        const linkType = this.getLinkType(element);
        const currentPage = window.location.pathname;
        const timestamp = new Date().toISOString();

        const clickData = {
            url: linkUrl,
            text: linkText.trim(),
            type: linkType,
            sourcePage: currentPage,
            timestamp,
            sessionId: this.sessionId,
            position: this.getElementPosition(element)
        };

        // تسجيل النقرة
        const linkKey = `${currentPage}->${linkUrl}`;
        if (!this.linkClicks.has(linkKey)) {
            this.linkClicks.set(linkKey, []);
        }
        this.linkClicks.get(linkKey).push(clickData);

        // إضافة للرحلة
        this.userJourney.push({
            page: currentPage,
            timestamp,
            action: 'link_click',
            data: clickData
        });

        // تحديث أداء الرابط
        this.updateLinkPerformance(linkKey, clickData);

        // إرسال للتحليلات الخارجية
        this.sendToAnalytics(clickData);

        this.saveToLocalStorage();
    }

    getLinkType(element) {
        if (element.classList.contains('internal-link')) return 'contextual';
        if (element.closest('.related-link-card')) return 'related';
        if (element.closest('.breadcrumb-item')) return 'breadcrumb';
        return 'other';
    }

    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            viewportX: rect.left,
            viewportY: rect.top
        };
    }

    updateLinkPerformance(linkKey, clickData) {
        if (!this.linkPerformance.has(linkKey)) {
            this.linkPerformance.set(linkKey, {
                totalClicks: 0,
                uniqueClicks: new Set(),
                clicksByType: {},
                averagePosition: { x: 0, y: 0 },
                firstClick: clickData.timestamp,
                lastClick: clickData.timestamp
            });
        }

        const performance = this.linkPerformance.get(linkKey);
        performance.totalClicks++;
        performance.uniqueClicks.add(clickData.sessionId);
        performance.clicksByType[clickData.type] = (performance.clicksByType[clickData.type] || 0) + 1;
        performance.lastClick = clickData.timestamp;

        // حساب متوسط الموقع
        const totalClicks = performance.totalClicks;
        performance.averagePosition.x = ((performance.averagePosition.x * (totalClicks - 1)) + clickData.position.x) / totalClicks;
        performance.averagePosition.y = ((performance.averagePosition.y * (totalClicks - 1)) + clickData.position.y) / totalClicks;
    }

    sendToAnalytics(clickData) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'internal_link_click', {
                'link_text': clickData.text,
                'link_url': clickData.url,
                'link_type': clickData.type,
                'source_page': clickData.sourcePage,
                'session_id': this.sessionId
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'InternalLinkClick', {
                link_url: clickData.url,
                link_type: clickData.type,
                source_page: clickData.sourcePage
            });
        }
    }

    setupPerformanceMonitoring() {
        // مراقبة سرعة التحميل
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.trackPerformance('page_load_time', loadTime);
        });

        // مراقبة وقت البقاء
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            this.trackPerformance('time_on_page', timeSpent);
        });
    }

    trackPerformance(metric, value) {
        const currentPage = window.location.pathname;
        const performanceData = {
            page: currentPage,
            metric,
            value,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };

        // حفظ في localStorage
        const stored = JSON.parse(localStorage.getItem('arabsad_performance') || '[]');
        stored.push(performanceData);
        localStorage.setItem('arabsad_performance', JSON.stringify(stored.slice(-100))); // آخر 100 قياس
    }

    setupReporting() {
        // تقرير يومي
        setInterval(() => {
            this.generateDailyReport();
        }, 24 * 60 * 60 * 1000); // كل 24 ساعة

        // تقرير عند إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            this.generateSessionReport();
        });
    }

    generateDailyReport() {
        const report = {
            date: new Date().toISOString().split('T')[0],
            totalPageViews: Array.from(this.pageViews.values()).flat().length,
            totalLinkClicks: Array.from(this.linkClicks.values()).flat().length,
            topPages: this.getTopPages(),
            topLinks: this.getTopLinks(),
            linkTypeDistribution: this.getLinkTypeDistribution(),
            userJourneyPatterns: this.analyzeUserJourneys()
        };

        console.log('📊 تقرير يومي - نظام الباك لنك الداخلي:', report);
        this.saveReport('daily', report);
    }

    generateSessionReport() {
        const report = {
            sessionId: this.sessionId,
            duration: Date.now() - parseInt(this.sessionId.split('_')[1]),
            pagesVisited: this.userJourney.filter(j => j.action === 'page_view').length,
            linksClicked: this.userJourney.filter(j => j.action === 'link_click').length,
            journey: this.userJourney,
            entryPage: this.userJourney[0]?.page,
            exitPage: this.userJourney[this.userJourney.length - 1]?.page
        };

        this.saveReport('session', report);
    }

    getTopPages() {
        return Array.from(this.pageViews.entries())
            .map(([page, views]) => ({ page, views: views.length }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 10);
    }

    getTopLinks() {
        return Array.from(this.linkPerformance.entries())
            .map(([link, data]) => ({
                link,
                totalClicks: data.totalClicks,
                uniqueClicks: data.uniqueClicks.size,
                ctr: (data.uniqueClicks.size / this.getPageViews(link.split('->')[0])) * 100
            }))
            .sort((a, b) => b.totalClicks - a.totalClicks)
            .slice(0, 10);
    }

    getLinkTypeDistribution() {
        const distribution = {};
        this.linkPerformance.forEach(data => {
            Object.entries(data.clicksByType).forEach(([type, count]) => {
                distribution[type] = (distribution[type] || 0) + count;
            });
        });
        return distribution;
    }

    analyzeUserJourneys() {
        const patterns = new Map();
        
        // تحليل المسارات الشائعة
        for (let i = 0; i < this.userJourney.length - 1; i++) {
            const current = this.userJourney[i];
            const next = this.userJourney[i + 1];
            
            if (current.action === 'page_view' && next.action === 'page_view') {
                const pattern = `${current.page} -> ${next.page}`;
                patterns.set(pattern, (patterns.get(pattern) || 0) + 1);
            }
        }

        return Array.from(patterns.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([pattern, count]) => ({ pattern, count }));
    }

    getPageViews(page) {
        return this.pageViews.get(page)?.length || 0;
    }

    saveToLocalStorage() {
        const data = {
            linkClicks: Array.from(this.linkClicks.entries()),
            pageViews: Array.from(this.pageViews.entries()),
            linkPerformance: Array.from(this.linkPerformance.entries()).map(([key, value]) => [
                key, 
                { ...value, uniqueClicks: Array.from(value.uniqueClicks) }
            ]),
            userJourney: this.userJourney,
            sessionId: this.sessionId
        };

        localStorage.setItem('arabsad_internal_linking', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('arabsad_internal_linking');
        if (stored) {
            const data = JSON.parse(stored);
            this.linkClicks = new Map(data.linkClicks || []);
            this.pageViews = new Map(data.pageViews || []);
            this.linkPerformance = new Map(
                (data.linkPerformance || []).map(([key, value]) => [
                    key,
                    { ...value, uniqueClicks: new Set(value.uniqueClicks) }
                ])
            );
            this.userJourney = data.userJourney || [];
        }
    }

    saveReport(type, report) {
        const reports = JSON.parse(localStorage.getItem(`arabsad_reports_${type}`) || '[]');
        reports.push(report);
        localStorage.setItem(`arabsad_reports_${type}`, JSON.stringify(reports.slice(-30))); // آخر 30 تقرير
    }

    // API للحصول على التقارير
    getReports(type = 'daily') {
        return JSON.parse(localStorage.getItem(`arabsad_reports_${type}`) || '[]');
    }

    // تصدير البيانات
    exportData() {
        return {
            analytics: {
                linkClicks: Array.from(this.linkClicks.entries()),
                pageViews: Array.from(this.pageViews.entries()),
                linkPerformance: Array.from(this.linkPerformance.entries()),
                userJourney: this.userJourney
            },
            reports: {
                daily: this.getReports('daily'),
                session: this.getReports('session')
            },
            performance: JSON.parse(localStorage.getItem('arabsad_performance') || '[]')
        };
    }

    // مسح البيانات
    clearData() {
        localStorage.removeItem('arabsad_internal_linking');
        localStorage.removeItem('arabsad_reports_daily');
        localStorage.removeItem('arabsad_reports_session');
        localStorage.removeItem('arabsad_performance');
        
        this.linkClicks.clear();
        this.pageViews.clear();
        this.linkPerformance.clear();
        this.userJourney = [];
    }
}

// تهيئة النظام
document.addEventListener('DOMContentLoaded', () => {
    window.arabsadAnalytics = new InternalLinkingAnalytics();
    
    // إضافة أوامر وحدة التحكم للمطورين
    window.arabsadAnalytics.console = {
        getStats: () => window.arabsadAnalytics.exportData(),
        clearData: () => window.arabsadAnalytics.clearData(),
        generateReport: () => window.arabsadAnalytics.generateDailyReport()
    };
});

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InternalLinkingAnalytics;
}