/*
  Working Chatbot Script - Standalone Version
  سكريبت البوت العامل - نسخة مستقلة تعمل بشكل مضمون
*/

class ArabSadAIChatbot {
  constructor() {
    this.isOpen = false;
    this.greeted = false;
    this.cfg = window.ARABSAD_CHATBOT_CONFIG || this.getDefaultConfig();
    this.responses = this.getResponses();
    this.init();
  }
  
  getDefaultConfig() {
    return {
      typingDelayMs: [300, 800],
      openOnIdleMs: 12000,
      cooldownDays: 30,
      greeting: 'مرحباً بك في مؤسسة إعلانات العرب! 👋\n\nأنا مساعدك التسويقي الذكي، هنا لمساعدتك في اختيار أفضل استراتيجية تسويق رقمي لنشاطك.',
      privacyNote: '🔒 محادثتنا آمنة ولا نحفظ أي بيانات شخصية.',
      ctas: [
        { text: '💬 تواصل واتساب', url: 'https://wa.me/201110760081?text=أحتاج مساعدة خبير تسويق فوراً', target: '_blank' },
        { text: '📋 خدماتنا', url: '/arabsad/services/index.html' },
        { text: '🇸🇦 خدمات السعودية', url: '/arabsad/sa.html' }
      ]
    };
  }
  
  getResponses() {
    return {
      'google-ads': {
        message: '🎯 إعلانات Google Ads ترفع مبيعاتك بسرعة. نحدد الكلمات، نصيغ الإعلانات، ونقيس العائد. هل نشاطك محلي أم خليجي؟',
        actions: [
          { text: 'عرض Google Ads', url: 'https://wa.me/201110760081?text=عرض Google Ads&utm_source=chatbot&utm_medium=ai&utm_campaign=google-ads', target: '_blank' },
          { text: 'تفاصيل الخدمة', url: '/arabsad/services/google-ads.html', target: '_blank' }
        ]
      },
      'social-media': {
        message: '📱 حملات مدروسة على فيسبوك، إنستجرام، تيك توك، وسناب شات. اختبارات A/B وتحسين مستمر.',
        actions: [
          { text: 'خطة Social Media', url: 'https://wa.me/201110760081?text=خطة Social Media&utm_source=chatbot&utm_medium=ai&utm_campaign=social', target: '_blank' },
          { text: 'استعرض الخدمة', url: '/arabsad/services/social-media-ads.html', target: '_blank' }
        ]
      },
      'seo': {
        message: '🔍 SEO يزيد الزيارات المجانية بشكل مستمر. تدقيق تقني، كلمات مربحة، محتوى وروابط آمنة.',
        actions: [
          { text: 'تحليل SEO مجاني', url: 'https://wa.me/201110760081?text=تحليل SEO مجاني&utm_source=chatbot&utm_medium=ai&utm_campaign=seo-audit', target: '_blank' },
          { text: 'خدمة SEO', url: '/arabsad/services/seo.html', target: '_blank' }
        ]
      },
      'ecommerce': {
        message: '🛒 متاجر سريعة وآمنة مع دفع محلي وتكامل شحن. نحسّن تجربة الشراء والتحويل.',
        actions: [
          { text: 'عرض متجر', url: 'https://wa.me/201110760081?text=عرض متجر إلكتروني&utm_source=chatbot&utm_medium=ai&utm_campaign=ecommerce', target: '_blank' },
          { text: 'الخدمة', url: '/arabsad/services/ecommerce.html', target: '_blank' }
        ]
      },
      'default': {
        message: this.cfg?.greeting || 'مرحباً بك! كيف يمكن المساعدة؟',
        actions: this.cfg?.ctas || []
      }
    };
  }
  
  init() {
    this.createChatbot();
    this.bindEvents();
    this.smartAutoOpen();
  }
  
  createChatbot() {
    // إنشاء HTML للبوت مباشرة
    const chatbotHTML = `
      <div id="ai-chatbot" class="chatbot-widget" style="display: none;">
        <div class="chatbot-header">
          <div class="bot-avatar">🤖</div>
          <div class="bot-info">
            <h4>مساعدك التسويقي</h4>
            <span class="status online">متاح الآن</span>
          </div>
          <button class="close-chat">&times;</button>
        </div>
        
        <div class="chatbot-body">
          <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
              <div class="message-content">
                👋 مرحباً بك! أنا مساعدك الذكي في مؤسسة إعلانات العرب.<br>
                أساعدك في اختيار أفضل استراتيجية تسويق رقمي لنشاطك.<br>
                <small>🔒 محادثتنا آمنة ولا نحفظ أي بيانات شخصية.</small>
              </div>
            </div>
          </div>
          
          <div class="quick-options">
            <button class="quick-btn" data-action="google-ads">🎯 Google Ads</button>
            <button class="quick-btn" data-action="social-media">📱 Social Media</button>
            <button class="quick-btn" data-action="seo">🔍 SEO</button>
            <button class="quick-btn" data-action="ecommerce">🛒 متاجر</button>
          </div>
          
          <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="اكتب رسالتك هنا..." maxlength="500">
            <button id="sendMessage">➤</button>
          </div>
        </div>
      </div>
      
      <button id="chatbot-trigger" class="chatbot-fab">
        🤖
        <span class="notification-badge" id="chatNotification" style="display: none;">!</span>
      </button>
    `;
    
    // إضافة HTML للصفحة
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    
    // إضافة CSS
    this.addChatbotStyles();
  }
  
  addChatbotStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .chatbot-widget {
        position: fixed;
        bottom: 120px;
        right: 20px;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 500px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: var(--font-body);
      }
      
      .chatbot-header {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .bot-avatar {
        font-size: 1.8rem;
      }
      
      .bot-info h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        font-family: var(--font-heading);
      }
      
      .status {
        font-size: 0.8rem;
        opacity: 0.9;
      }
      
      .close-chat {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
      }
      
      .chatbot-body {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .message {
        max-width: 85%;
        word-wrap: break-word;
      }
      
      .message-content {
        padding: 0.75rem 1rem;
        border-radius: 18px;
        font-size: 0.9rem;
        line-height: 1.5;
      }
      
      .bot-message {
        align-self: flex-start;
      }
      
      .bot-message .message-content {
        background: #f3f4f6;
        color: #374151;
      }
      
      .user-message {
        align-self: flex-end;
      }
      
      .user-message .message-content {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
      }
      
      .message-actions {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .action-btn {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        font-family: var(--font-heading);
      }
      
      .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      }
      
      .quick-options {
        padding: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        border-top: 1px solid #e5e7eb;
      }
      
      .quick-btn {
        background: #f9fafb;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 0.5rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--font-heading);
      }
      
      .quick-btn:hover {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        border-color: transparent;
      }
      
      .chat-input-area {
        display: flex;
        padding: 1rem;
        border-top: 1px solid #e5e7eb;
        gap: 0.5rem;
      }
      
      #chatInput {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 25px;
        font-size: 0.9rem;
        outline: none;
        font-family: var(--font-body);
      }
      
      #chatInput:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      #sendMessage {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .chatbot-fab {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        transition: all 0.3s ease;
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .chatbot-fab:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
      }
      
      .notification-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ef4444;
        color: white;
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
        border-radius: 50%;
        min-width: 18px;
        text-align: center;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      
      @media (max-width: 768px) {
        .chatbot-widget {
          width: calc(100vw - 20px);
          right: 10px;
          bottom: 90px;
          height: 70vh;
        }
        
        .chatbot-fab {
          bottom: 15px;
          right: 15px;
          width: 55px;
          height: 55px;
          font-size: 1.3rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  bindEvents() {
    const trigger = document.getElementById('chatbot-trigger');
    const closeBtn = document.querySelector('.close-chat');
    const sendBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    
    trigger?.addEventListener('click', () => this.toggle());
    closeBtn?.addEventListener('click', () => this.close());
    sendBtn?.addEventListener('click', () => this.send());
    chatInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.send();
    });
    
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.reply(action);
      });
    });
  }
  
  smartAutoOpen() {
    const lastSeen = localStorage.getItem('arabsad-chatbot-last-seen');
    const cooldownDays = this.cfg.cooldownDays || 30;
    const now = Date.now();
    
    if (lastSeen) {
      const daysPassed = (now - parseInt(lastSeen)) / (1000 * 60 * 60 * 24);
      if (daysPassed < cooldownDays) {
        return;
      }
    }
    
    setTimeout(() => {
      this.notify();
      localStorage.setItem('arabsad-chatbot-last-seen', now.toString());
    }, this.cfg.openOnIdleMs || 12000);
  }
  
  notify() {
    const trigger = document.getElementById('chatbot-trigger');
    const notification = document.getElementById('chatNotification');
    if (trigger && notification) {
      trigger.style.animation = 'bounce 2s infinite';
      notification.style.display = 'block';
      setTimeout(() => {
        trigger.style.animation = '';
      }, 8000);
    }
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open();
    const notification = document.getElementById('chatNotification');
    if (notification) notification.style.display = 'none';
  }
  
  open() {
    this.isOpen = true;
    const widget = document.getElementById('ai-chatbot');
    if (widget) {
      widget.style.display = 'flex';
      setTimeout(() => this.focusInput(), 300);
      if (!this.greeted) {
        this.systemGreet();
        this.greeted = true;
      }
    }
  }
  
  close() {
    this.isOpen = false;
    const widget = document.getElementById('ai-chatbot');
    if (widget) {
      widget.style.display = 'none';
    }
  }
  
  focusInput() {
    const input = document.getElementById('chatInput');
    input?.focus();
  }
  
  systemGreet() {
    const response = this.responses.default;
    this.addBotMessage(response.message, response.actions);
  }
  
  async send() {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;
    
    const message = input.value.trim();
    this.addUserMessage(message);
    await this.simulateTypingThenReply(message);
    input.value = '';
  }
  
  addUserMessage(message) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
  }
  
  async simulateTypingThenReply(message) {
    const container = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = '<div class="message-content">يكتب…</div>';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
    
    const delay = Math.floor(
      Math.random() * (this.cfg.typingDelayMs[1] - this.cfg.typingDelayMs[0] + 1)
    ) + this.cfg.typingDelayMs[0];
    
    await new Promise(resolve => setTimeout(resolve, delay));
    typingDiv.remove();
    
    const response = this.generateSmartResponse(message);
    this.addBotMessage(response.message, response.actions);
  }
  
  generateSmartResponse(message) {
    const msg = message.toLowerCase();
    
    // قاعدة معرفة البوت (Brain)
    const knowledgeBase = [
      {
        keywords: ['مرحبا', 'اهلا', 'سلام', 'هلا', 'hi', 'hello', 'hey', 'start', 'بدء'],
        response: '👋 أهلاً بك! أنا هنا لمساعدتك في نجاح مشروعك. كيف يمكنني خدمتك اليوم؟',
        actions: this.cfg.ctas
      },
      {
        keywords: ['شكرا', 'تسلم', 'يعطيك العافية', 'thx', 'thanks', 'thank'],
        response: '🙏 العفو! نحن في الخدمة دائماً. هل لديك أي استفسار آخر؟',
        actions: []
      },
      {
        keywords: ['مساعدة', 'help', 'support', 'دعم'],
        response: '🤝 فريق الدعم جاهز لمساعدتك. يمكنك وصف مشكلتك أو التواصل معنا مباشرة.',
        actions: [{ text: 'تواصل واتساب', url: 'https://wa.me/201110760081', target: '_blank' }]
      },
      {
        keywords: ['سعر', 'تكلفة', 'ميزانية', 'فلوس', 'بكام', 'اسعار', 'price', 'cost'],
        response: '💰 أسعارنا مرنة وتعتمد على أهدافك. لدينا باقات تبدأ من ميزانيات صغيرة للشركات الناشئة. هل تفضل باقة شهرية أم مشروع لمرة واحدة؟',
        actions: [{ text: 'طلب عرض سعر', url: 'https://wa.me/201110760081?text=ممكن عرض سعر؟', target: '_blank' }]
      },
      {
        keywords: ['جوجل', 'google', 'بحث', 'search', 'ads', 'adwords', 'ppc'],
        response: '🎯 إعلانات Google هي تخصصنا! نضمن لك الظهور في الصفحة الأولى للعملاء الباحثين عن خدماتك. تشمل خدماتنا: شبكة البحث، الشبكة الإعلانية، وGoogle Shopping.',
        actions: [{ text: 'خدمة Google Ads', url: '/arabsad/services/google-ads.html', target: '_blank' }]
      },
      {
        keywords: ['يوتيوب', 'youtube', 'فيديو', 'video', 'مشاهدات'],
        response: '📹 إعلانات يوتيوب تزيد الوعي بعلامتك التجارية بنسبة 95%. ننتج فيديوهات احترافية ونستهدف جمهورك بدقة عالية.',
        actions: [{ text: 'إعلانات يوتيوب', url: '/arabsad/services/google-ads.html', target: '_blank' }]
      },
      {
        keywords: ['سوشيال', 'social', 'فيس', 'facebook', 'انستا', 'instagram', 'meta'],
        response: '📱 ندير حملاتك على منصات Meta (فيسبوك وإنستجرام) باحترافية. نستخدم استهداف دقيق للوصول لعملائك المحتملين وزيادة المبيعات.',
        actions: [{ text: 'خدمات السوشيال', url: '/arabsad/services/social-media-ads.html', target: '_blank' }]
      },
      {
        keywords: ['تيك توك', 'tiktok', 'تيكتوك', 'تريند'],
        response: '🎵 تيك توك هو منصة الانتشار السريع! نصمم محتوى "تريند" يجذب الجيل الجديد ويحقق مبيعات ضخمة بتكلفة منافسة.',
        actions: [{ text: 'إعلانات تيك توك', url: '/arabsad/services/social-media-ads.html', target: '_blank' }]
      },
      {
        keywords: ['سناب', 'snapchat', 'سناب شات', 'فلاتر'],
        response: '👻 إعلانات سناب شات هي الأقوى في الخليج. نصل لجمهورك في السعودية والكويت والإمارات عبر إعلانات القصص والعدسات التفاعلية.',
        actions: [{ text: 'إعلانات سناب', url: '/arabsad/services/social-media-ads.html', target: '_blank' }]
      },
      {
        keywords: ['ادارة', 'إدارة', 'حسابات', 'نشر', 'محتوى', 'بوستات', 'ريلز'],
        response: '✍️ اترك إدارة حساباتك لخبرائنا. نقدم خطة محتوى شهرية، تصميم جرافيك، مونتاج ريلز، والرد على العملاء لزيادة التفاعل والنمو.',
        actions: [{ text: 'إدارة الحسابات', url: '/arabsad/services/social-management.html', target: '_blank' }]
      },
      {
        keywords: ['سيو', 'seo', 'تصدر', 'مجاني', 'زيارات', 'rank'],
        response: '🔍 الـ SEO هو استثمار طويل الأمد. نقوم بتحسين موقعك تقنياً وكتابة محتوى ليتصدر النتائج مجاناً.',
        actions: [{ text: 'خدمة SEO', url: '/arabsad/services/seo.html', target: '_blank' }]
      },
      {
        keywords: ['متجر', 'سلة', 'زد', 'شوبيفاي', 'ecommerce', 'بيع', 'woocommerce', 'salla', 'zid'],
        response: '🛒 نبني متاجر إلكترونية متكاملة: تصميم سريع، ربط بوابات الدفع (مدى/فيزا)، وتكامل مع شركات الشحن. متجرك جاهز للبيع فوراً.',
        actions: [{ text: 'خدمة المتاجر', url: '/arabsad/services/ecommerce.html', target: '_blank' }]
      },
      {
        keywords: ['تصميم', 'موقع', 'ويب', 'web', 'design', 'برمجة'],
        response: '💻 نصمم مواقع تعريفية تعكس فخامة علامتك التجارية. مواقعنا سريعة، آمنة، ومتجاوبة تماماً مع الجوال ومحسنة لمحركات البحث.',
        actions: [{ text: 'تصميم المواقع', url: '/arabsad/services/website-design.html', target: '_blank' }]
      },
      {
        keywords: ['مقاولات', 'بناء', 'تشييد', 'عقار', 'contracting'],
        response: '🏗️ لدينا خبرة خاصة في تسويق شركات المقاولات. نصل بك لأصحاب المشاريع والمطورين العقاريين عبر إعلانات جوجل المستهدفة.',
        actions: [{ text: 'تسويق المقاولات', url: '/arabsad/services/contracting-services.html', target: '_blank' }]
      },
      {
        keywords: ['خرائط', 'ماب', 'maps', 'اغلاق', 'حظر', 'بديل', 'landing'],
        response: '🚫 هل تعاني من إغلاق نشاطك على خرائط جوجل؟ الحل هو امتلاك "صفحة هبوط" خاصة بك تكون ملكاً لك 100% ومحمية من بلاغات المنافسين.',
        actions: [{ text: 'بديل الخرائط', url: '/arabsad/services/safahat-al5dmat.html', target: '_blank' }]
      },
      {
        keywords: ['سعودية', 'رياض', 'جدة', 'دمام', 'saudi', 'ksa'],
        response: '🇸🇦 لدينا خبرة واسعة في السوق السعودي ونفهم سلوك المستهلك في الرياض وجدة والدمام جيداً.',
        actions: [{ text: 'خدمات السعودية', url: '/arabsad/sa.html', target: '_blank' }]
      },
      {
        keywords: ['امارات', 'دبي', 'ابوظبي', 'uae', 'dubai'],
        response: '🇦🇪 نقدم خدمات تسويق راقية تناسب المنافسة العالية في سوق الإمارات (دبي وأبوظبي).',
        actions: [{ text: 'خدمات الإمارات', url: '/arabsad/ae.html', target: '_blank' }]
      },
      {
        keywords: ['كويت', 'kuwait'],
        response: '🇰🇼 نساعدك في الوصول للجمهور الكويتي عبر انستقرام وسناب شات وجوجل.',
        actions: [{ text: 'خدمات الكويت', url: '/arabsad/kw.html', target: '_blank' }]
      },
      {
        keywords: ['قطر', 'qatar', 'دوحة'],
        response: '🇶🇦 خدمات تسويقية متكاملة للشركات في الدوحة والريان.',
        actions: [{ text: 'خدمات قطر', url: '/arabsad/qa.html', target: '_blank' }]
      },
      {
        keywords: ['عمان', 'oman'],
        response: '🇴🇲 نغطي سلطنة عمان بجميع خدمات التسويق الرقمي.',
        actions: [{ text: 'خدمات عمان', url: '/arabsad/om.html', target: '_blank' }]
      },
      {
        keywords: ['بحرين', 'bahrain'],
        response: '🇧🇭 خدماتنا متاحة في مملكة البحرين لزيادة نمو أعمالك.',
        actions: [{ text: 'خدمات البحرين', url: '/arabsad/bh.html', target: '_blank' }]
      },
      {
        keywords: ['وقت', 'متى', 'مدة'],
        response: '⏱️ إعلانات جوجل والسوشيال ميديا تعطي نتائج فورية (خلال 24-48 ساعة). الـ SEO يحتاج 3-6 أشهر.',
        actions: this.cfg.ctas
      },
      {
        keywords: ['ضمان', 'نتيجة', 'عائد'],
        response: '✅ نعم، نلتزم بمؤشرات أداء (KPIs) واضحة. نضمن لك الشفافية الكاملة وتقارير أسبوعية توضح العائد على استثمارك.',
        actions: [{ text: 'تحدث مع المدير', url: 'https://wa.me/201110760081', target: '_blank' }]
      },
      {
        keywords: ['من انتم', 'من أنتم', 'شركة', 'مؤسسة', 'وكالة'],
        response: '🏢 نحن "مؤسسة إعلانات العرب"، وكالة تسويق رقمي رائدة متخصصة في تنمية الأعمال في الخليج العربي ومصر منذ سنوات.',
        actions: [{ text: 'عن المؤسسة', url: '/arabsad/index.html', target: '_blank' }]
      },
      {
        keywords: ['ايميل', 'email', 'بريد', 'mail', 'تواصل'],
        response: '📧 يمكنك مراسلتنا مباشرة على بريدنا الرسمي: sherow1982@gmail.com',
        actions: [{ text: 'إرسال إيميل', url: 'mailto:sherow1982@gmail.com', target: '_blank' }]
      },
      {
        keywords: ['واتساب', 'whatsapp', 'رقم', 'هاتف'],
        response: '📞 تواصل معنا فوراً عبر واتساب على الرقم: 00201110760081',
        actions: [{ text: 'فتح واتساب', url: 'https://wa.me/201110760081', target: '_blank' }]
      },
      {
        keywords: ['طرق الدفع', 'دفع', 'تحويل', 'payment'],
        response: '💳 نقبل التحويل البنكي، البطاقات الائتمانية، وPayPal. نوفر خيارات دفع مرنة لعملائنا في الخليج.',
        actions: []
      },
      {
        keywords: ['سياسة', 'شروط', 'عقد', 'legal'],
        response: '⚖️ نلتزم بأعلى معايير الشفافية. يمكنك الاطلاع على سياساتنا وشروط الخدمة من الروابط أدناه.',
        actions: [{ text: 'سياسة الخصوصية', url: '/arabsad/privacy-policy.html', target: '_blank' }, { text: 'شروط الخدمة', url: '/arabsad/terms-of-service.html', target: '_blank' }]
      }
    ];

    // البحث عن أفضل تطابق
    for (const item of knowledgeBase) {
      if (item.keywords.some(keyword => msg.includes(keyword))) {
        return {
          message: item.response,
          actions: item.actions || []
        };
      }
    }
    
    // الرد الافتراضي إذا لم يتم العثور على تطابق
    if (/(استشارة|مكالمة|تواصل|رقم)/.test(msg)) {
      return {
        message: 'الاستشارة مجانية 30 دقيقة. نحلل وضعك ونقترح استراتيجية مخصصة بدون أي التزام. متى يناسبك؟',
        actions: [{ text: '📞 اتصل الآن', url: 'https://wa.me/201110760081', target: '_blank' }]
      };
    }
    
    return {
      message: 'لست متأكداً تماماً، ولكن يسعدني مساعدتك! 🤖\nيمكنك اختيار خدمة من القائمة أدناه أو التحدث مع خبيرنا البشري مباشرة 👇',
      actions: this.cfg.ctas
    };
  }
  
  reply(action) {
    const response = this.responses[action] || this.responses.default;
    this.addBotMessage(response.message, response.actions);
  }
  
  addBotMessage(message, actions = []) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    let actionsHtml = '';
    if (actions.length) {
      actionsHtml = '<div class="message-actions">' +
        actions.map(action => `<a href="${action.url}" class="action-btn" ${action.target ? `target="${action.target}" rel="noopener"` : ''}>${action.text}</a>`).join('') +
        '</div>';
    }
    
    messageDiv.innerHTML = `<div class="message-content">${message}</div>${actionsHtml}`;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
  }
}

// تشغيل البوت فور تحميل السكريبت
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ArabSadAIChatbot();
    console.log('✅ البوت شغال ومتجاوب');
  });
} else {
  new ArabSadAIChatbot();
  console.log('✅ البوت شغال ومتجاوب');
}