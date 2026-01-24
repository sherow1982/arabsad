// Auto Knowledge Base Updater for Static GitHub Pages
// نظام تحديث تلقائي لقاعدة بيانات البوت

class KnowledgeBaseUpdater {
  constructor() {
    this.baseUrl = 'https://sherow1982.github.io/arabsad';
    this.knowledgeBase = {};
    this.init();
  }

  async init() {
    await this.loadSiteContent();
    this.updateChatbotConfig();
  }

  async loadSiteContent() {
    try {
      // تحميل محتوى الصفحات الرئيسية
      const pages = [
        '/services/google-ads.html',
        '/services/seo.html', 
        '/services/social-media-ads.html',
        '/services/ecommerce.html',
        '/services/website-design.html',
        '/services/social-management.html'
      ];

      const content = {};
      
      for (const page of pages) {
        try {
          const response = await fetch(this.baseUrl + page);
          if (response.ok) {
            content[page] = await response.text();
          }
        } catch (e) {
          console.log(`Could not load ${page}`);
        }
      }

      this.extractKnowledge(content);
    } catch (error) {
      console.log('Using fallback knowledge base');
      this.loadFallbackKnowledge();
    }
  }

  extractKnowledge(content) {
    this.knowledgeBase = {
      company: {
        name: 'مؤسسة إعلانات العرب',
        phone: '+201110760081',
        email: 'info@arabsad.com',
        location: 'مصر - الجيزة - حدائق أكتوبر',
        experience: '+7 سنوات خبرة',
        clients: '+500 عميل راضي',
        reach: '+50M وصول شهري',
        satisfaction: '98% رضا العملاء',
        support: 'دعم 24/7'
      },

      services: {
        googleAds: {
          name: 'إعلانات Google Ads',
          types: ['Search Ads', 'Display Network', 'YouTube Ads', 'Shopping Ads'],
          benefits: ['نتائج فورية خلال 24-48 ساعة', 'استهداف دقيق', 'عائد استثمار مضمون'],
          pricing: 'تبدأ من 15% من ميزانية الإعلانات بحد أدنى 500 دولار شهرياً',
          timeline: '24-48 ساعة للإطلاق، نتائج فورية'
        },

        seo: {
          name: 'تحسين محركات البحث SEO',
          services: ['تحليل SEO شامل', 'بحث الكلمات المفتاحية', 'تحسين المحتوى', 'بناء الروابط'],
          benefits: ['زيارات مجانية مستدامة', 'ظهور في النتائج الأولى', 'بناء سلطة الموقع'],
          timeline: '2-6 أشهر للنتائج الملموسة',
          pricing: 'باقات مرنة حسب حجم الموقع والمنافسة'
        },

        socialMedia: {
          name: 'إعلانات وسائل التواصل الاجتماعي',
          platforms: ['Facebook', 'Instagram', 'TikTok', 'Snapchat', 'LinkedIn'],
          services: ['Meta Ads', 'TikTok Ads', 'محتوى إبداعي', 'تصاميم احترافية'],
          benefits: ['وصول واسع للجمهور', 'استهداف دقيق', 'تفاعل عالي']
        },

        ecommerce: {
          name: 'المتاجر الإلكترونية',
          features: ['تصميم متجاوب', 'بوابات دفع آمنة', 'إدارة المخزون', 'تكامل الشحن'],
          benefits: ['متاجر سريعة وآمنة', 'تحسين التحويل', 'دعم فني مستمر'],
          timeline: '2-4 أسابيع للتسليم'
        },

        webDesign: {
          name: 'تصميم المواقع',
          features: ['تصميم متجاوب', 'سرعة تحميل فائقة', 'محسن لمحركات البحث'],
          benefits: ['مواقع احترافية', 'تجربة مستخدم ممتازة', 'تحسين التحويل']
        },

        socialManagement: {
          name: 'إدارة وسائل التواصل الاجتماعي',
          services: ['محتوى يومي', 'إدارة التفاعلات', 'تقارير شهرية'],
          benefits: ['زيادة المتابعين', 'تفاعل أعلى', 'بناء علامة تجارية قوية']
        }
      },

      countries: {
        'السعودية': ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'],
        'الإمارات': ['دبي', 'أبوظبي', 'الشارقة', 'عجمان'],
        'الكويت': ['مدينة الكويت', 'الأحمدي', 'الجهراء'],
        'قطر': ['الدوحة', 'الريان', 'الوكرة'],
        'البحرين': ['المنامة', 'المحرق', 'الرفاع'],
        'عمان': ['مسقط', 'صلالة', 'صحار']
      },

      faq: {
        'كم تكلفة الخدمات': 'التكاليف تعتمد على حجم المشروع. نقدم باقات مرنة من الشركات الناشئة للمؤسسات الكبرى.',
        'مدة تنفيذ الحملات': 'Google Ads: 24-48 ساعة. SEO: 2-6 أشهر. تصميم المواقع: 2-4 أسابيع.',
        'التقارير': 'نرسل تقارير مفصلة أسبوعية أو شهرية حسب الباقة.',
        'الدعم الفني': 'متاح 24/7 عبر واتساب والبريد الإلكتروني.',
        'الضمان': 'نضمن الشفافية والعمل الجاد. أغلب العملاء يحققون ROI إيجابي خلال 3 أشهر.'
      }
    };
  }

  loadFallbackKnowledge() {
    // نفس البيانات الأساسية كـ fallback
    this.extractKnowledge({});
  }

  updateChatbotConfig() {
    if (window.ARABSAD_CHATBOT_CONFIG) {
      window.ARABSAD_CHATBOT_CONFIG.knowledgeBase = this.knowledgeBase;
      console.log('✅ تم تحديث قاعدة بيانات البوت تلقائياً');
    }
  }

  // تحديث دوري كل 5 دقائق
  startAutoUpdate() {
    setInterval(() => {
      this.loadSiteContent();
    }, 300000); // 5 دقائق
  }
}

// تشغيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const updater = new KnowledgeBaseUpdater();
  updater.startAutoUpdate();
});

window.KnowledgeBaseUpdater = KnowledgeBaseUpdater;