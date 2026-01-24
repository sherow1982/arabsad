// Professional Chatbot Implementation - ArabSad.com
// مؤسسة إعلانات العرب - البوت الذكي المحسن

class ArabSadChatbot {
  constructor() {
    this.config = window.ARABSAD_CHATBOT_CONFIG || {};
    this.isOpen = false;
    this.hasShown = false;
    this.messages = [];
    this.currentStep = 'greeting';
    
    this.init();
  }

  init() {
    this.createChatWidget();
    this.bindEvents();
    this.scheduleAutoOpen();
  }

  createChatWidget() {
    // إنشاء HTML للبوت
    const chatHTML = `
      <div id="arabsad-chatbot" class="chatbot-widget">
        <div class="chat-toggle" id="chatToggle">
          <div class="chat-icon">💬</div>
          <div class="notification-badge" id="notificationBadge">1</div>
        </div>
        
        <div class="chat-window" id="chatWindow">
          <div class="chat-header">
            <div class="chat-avatar">🤖</div>
            <div class="chat-info">
              <div class="chat-title">مساعد إعلانات العرب</div>
              <div class="chat-status">متصل الآن</div>
            </div>
            <button class="chat-close" id="chatClose">×</button>
          </div>
          
          <div class="chat-messages" id="chatMessages"></div>
          
          <div class="chat-input-area">
            <div class="quick-replies" id="quickReplies"></div>
            <div class="chat-input-wrapper">
              <input type="text" id="chatInput" placeholder="اكتب رسالتك هنا..." maxlength="500">
              <button id="chatSend">إرسال</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // إضافة HTML للصفحة
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    
    // إضافة CSS
    this.injectStyles();
  }

  injectStyles() {
    const styles = `
      <style>
        .chatbot-widget {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 10000;
          font-family: 'Cairo', sans-serif;
          direction: rtl;
        }

        .chat-toggle {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          position: relative;
        }

        .chat-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
        }

        .chat-icon {
          font-size: 24px;
          color: white;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff4757;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .chat-window {
          position: absolute;
          bottom: 80px;
          left: 0;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-window.open {
          display: flex;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chat-avatar {
          font-size: 24px;
        }

        .chat-info {
          flex: 1;
        }

        .chat-title {
          font-weight: bold;
          font-size: 14px;
        }

        .chat-status {
          font-size: 12px;
          opacity: 0.8;
        }

        .chat-close {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .chat-close:hover {
          background: rgba(255,255,255,0.2);
        }

        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #f8f9fa;
        }

        .message {
          margin-bottom: 15px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-bubble {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
        }

        .message.bot .message-bubble {
          background: white;
          border: 1px solid #e9ecef;
          color: #333;
        }

        .message.user .message-bubble {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .quick-replies {
          padding: 10px 15px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .quick-reply {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-reply:hover {
          background: #667eea;
          color: white;
        }

        .chat-input-wrapper {
          display: flex;
          padding: 15px;
          border-top: 1px solid #e9ecef;
          background: white;
        }

        #chatInput {
          flex: 1;
          border: 1px solid #dee2e6;
          border-radius: 20px;
          padding: 10px 15px;
          font-size: 14px;
          outline: none;
          font-family: inherit;
        }

        #chatInput:focus {
          border-color: #667eea;
        }

        #chatSend {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          margin-right: 10px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        #chatSend:hover {
          transform: translateY(-1px);
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 10px 15px;
          background: white;
          border-radius: 18px;
          margin-bottom: 15px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .cta-button {
          background: linear-gradient(135deg, #26de81, #20bf6b);
          color: white;
          text-decoration: none;
          padding: 12px 15px;
          border-radius: 8px;
          text-align: center;
          font-size: 13px;
          font-weight: bold;
          transition: all 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(38, 222, 129, 0.3);
        }

        @media (max-width: 768px) {
          .chatbot-widget {
            left: 10px;
            bottom: 10px;
            right: 10px;
          }
          
          .chat-window {
            width: calc(100vw - 20px);
            height: 80vh;
            max-width: none;
            left: 0;
            right: 0;
          }
          
          .chat-messages {
            font-size: 16px;
            padding: 20px;
          }
          
          .message-bubble {
            font-size: 16px;
            padding: 12px 16px;
            max-width: 85%;
          }
          
          #chatInput {
            font-size: 16px;
            padding: 12px 16px;
          }
          
          #chatSend {
            font-size: 16px;
            padding: 12px 16px;
          }
          
          .chat-header {
            padding: 20px;
          }
          
          .chat-title {
            font-size: 16px;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  bindEvents() {
    const toggle = document.getElementById('chatToggle');
    const close = document.getElementById('chatClose');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');

    toggle.addEventListener('click', () => this.toggleChat());
    close.addEventListener('click', () => this.closeChat());
    send.addEventListener('click', () => this.sendMessage());
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  scheduleAutoOpen() {
    if (this.hasShown || localStorage.getItem('chatbot_shown')) return;
    
    setTimeout(() => {
      if (!this.hasShown) {
        this.showNotification();
      }
    }, this.config.openOnIdleMs || 12000);
  }

  showNotification() {
    const badge = document.getElementById('notificationBadge');
    badge.style.display = 'flex';
    this.hasShown = true;
    localStorage.setItem('chatbot_shown', 'true');
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    const window = document.getElementById('chatWindow');
    const badge = document.getElementById('notificationBadge');
    
    window.classList.add('open');
    badge.style.display = 'none';
    this.isOpen = true;
    
    if (this.messages.length === 0) {
      this.showGreeting();
    }
  }

  closeChat() {
    const window = document.getElementById('chatWindow');
    window.classList.remove('open');
    this.isOpen = false;
  }

  showGreeting() {
    this.addMessage('bot', this.config.greeting);
    
    setTimeout(() => {
      this.showCTAButtons();
    }, 1000);
  }

  showCTAButtons() {
    const ctaHTML = this.config.ctas.map(cta => 
      `<a href="${cta.url}" target="${cta.target || '_self'}" class="cta-button">${cta.text}</a>`
    ).join('');
    
    this.addMessage('bot', `${this.config.privacyNote}<div class="cta-buttons">${ctaHTML}</div>`);
  }

  addMessage(sender, content) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    messageDiv.innerHTML = `
      <div class="message-bubble">${content}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    this.messages.push({ sender, content, timestamp: Date.now() });
  }

  showTyping() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    this.addMessage('user', message);
    input.value = '';
    
    this.showTyping();
    
    setTimeout(() => {
      this.hideTyping();
      this.processMessage(message);
    }, 1500);
  }

  processMessage(message) {
    const lowerMessage = message.toLowerCase();
    const kb = this.config.knowledgeBase;
    let response = '';
    
    // تحليل ذكي للرسالة
    if (lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة') || lowerMessage.includes('كم') || lowerMessage.includes('باقة')) {
      response = this.getSmartResponse('pricing', message);
    } else if (lowerMessage.includes('وقت') || lowerMessage.includes('متى') || lowerMessage.includes('مدة') || lowerMessage.includes('زمن')) {
      response = this.getSmartResponse('timeline', message);
    } else if (lowerMessage.includes('ضمان') || lowerMessage.includes('نتائج') || lowerMessage.includes('عائد')) {
      response = this.getSmartResponse('guarantee', message);
    } else if (lowerMessage.includes('متجر') || lowerMessage.includes('تجارة') || lowerMessage.includes('إلكتروني')) {
      response = this.getSmartResponse('ecommerce', message);
    } else if (lowerMessage.includes('استشارة') || lowerMessage.includes('مجاني') || lowerMessage.includes('مكالمة')) {
      response = this.getSmartResponse('consultation', message);
    } else if (lowerMessage.includes('خدمات') || lowerMessage.includes('خدمة')) {
      response = this.getSmartResponse('services', message);
    } else if (lowerMessage.includes('دول') || lowerMessage.includes('بلد') || lowerMessage.includes('منطقة')) {
      response = this.getSmartResponse('countries', message);
    } else if (lowerMessage.includes('google') || lowerMessage.includes('جوجل') || lowerMessage.includes('إعلانات')) {
      response = this.getGoogleAdsInfo();
    } else if (lowerMessage.includes('seo') || lowerMessage.includes('سيو') || lowerMessage.includes('محركات')) {
      response = this.getSEOInfo();
    } else if (lowerMessage.includes('فيسبوك') || lowerMessage.includes('إنستجرام') || lowerMessage.includes('تيك توك')) {
      response = this.getSocialMediaInfo();
    } else {
      response = this.config.escalation;
    }
    
    this.addMessage('bot', response);
  }
  
  getSmartResponse(type, userMessage) {
    const kb = this.config.knowledgeBase;
    
    switch(type) {
      case 'pricing':
        return `أسعارنا تنافسية ومرنة:\n\n📊 Google Ads: ${kb.services.googleAds.pricing}\n🔍 SEO: ${kb.services.seo.pricing}\n\nما نوع نشاطك التجاري لأقترح الباقة المناسبة؟`;
        
      case 'timeline':
        return `المدة الزمنية حسب الخدمة:\n\n⚡ Google Ads: ${kb.services.googleAds.timeline}\n🔍 SEO: ${kb.services.seo.timeline}\n🛒 المتاجر: ${kb.services.ecommerce.timeline}\n\nأيهما أولويتك الآن؟`;
        
      case 'guarantee':
        return `نضمن لك:\n\n✅ ${kb.company.satisfaction} رضا العملاء\n✅ فريق خبرة ${kb.company.experience}\n✅ ${kb.faq['الضمان']}\n\nهل تريد معرفة قصص نجاح عملائنا؟`;
        
      case 'ecommerce':
        const features = kb.services.ecommerce.features.join('\n• ');
        return `متاجرنا الإلكترونية تشمل:\n\n• ${features}\n\n${kb.services.ecommerce.timeline}\n\nالمتجر جديد أم تطوير لموجود؟`;
        
      case 'consultation':
        return `الاستشارة مجانية 100% لمدة 30 دقيقة:\n\n📋 تحليل وضعك الحالي\n🎯 استراتيجية مخصصة\n💡 توصيات عملية\n\nبدون أي التزام! متى يناسبك؟`;
        
      case 'countries':
        let response = 'نخدم جميع دول الخليج:\n\n';
        Object.keys(kb.countries).forEach(country => {
          const cities = kb.countries[country].slice(0, 3).join('، ');
          response += `🇸🇦 ${country}: ${cities}\n`;
        });
        return response + '\nأي دولة تهمك؟';
        
      case 'services':
        return `خدماتنا الرئيسية:\n\n🎯 ${kb.services.googleAds.name}\n🔍 ${kb.services.seo.name}\n📱 ${kb.services.socialMedia.name}\n🛒 ${kb.services.ecommerce.name}\n💻 ${kb.services.webDesign.name}\n👥 ${kb.services.socialManagement.name}\n\nأي خدمة تهمك أكثر؟`;
        
      default:
        return this.config.escalation;
    }
  }
  
  getGoogleAdsInfo() {
    const kb = this.config.knowledgeBase;
    const benefits = kb.services.googleAds.benefits.join('\n• ');
    return `🎯 ${kb.services.googleAds.name}:\n\n• ${benefits}\n\n⏱️ ${kb.services.googleAds.timeline}\n💰 ${kb.services.googleAds.pricing}\n\nهل تريد معرفة المزيد؟`;
  }
  
  getSEOInfo() {
    const kb = this.config.knowledgeBase;
    const services = kb.services.seo.services.join('\n• ');
    return `🔍 ${kb.services.seo.name}:\n\n• ${services}\n\n⏱️ ${kb.services.seo.timeline}\n💰 ${kb.services.seo.pricing}\n\nهل لديك موقع تريد تحسينه؟`;
  }
  
  getSocialMediaInfo() {
    const kb = this.config.knowledgeBase;
    const platforms = kb.services.socialMedia.platforms.join('، ');
    return `📱 ${kb.services.socialMedia.name}:\n\n🌐 المنصات: ${platforms}\n\n• ${kb.services.socialMedia.services.join('\n• ')}\n\nأي منصة تهمك أكثر؟`;
  }
}

// تشغيل البوت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  new ArabSadChatbot();
});

// تصدير للاستخدام الخارجي
window.ArabSadChatbot = ArabSadChatbot;