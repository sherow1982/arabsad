// Simple Chatbot Implementation
(function() {
    'use strict';
    
    if (!window.chatbotConfig || !window.chatbotConfig.enabled) {
        return;
    }
    
    const config = window.chatbotConfig;
    
    // Create chatbot HTML
    const chatbotHTML = `
        <div id="chatbot-container" style="
            position: fixed;
            bottom: 80px;
            left: 20px;
            width: 300px;
            max-height: 400px;
            background: #1a1f3a;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 999;
            display: none;
            font-family: 'Segoe UI', sans-serif;
        ">
            <div style="
                background: ${config.primaryColor};
                color: #000;
                padding: 1rem;
                border-radius: 15px 15px 0 0;
                font-weight: 600;
            ">
                💬 مساعد إعلانات العرب
                <button id="chatbot-close" style="
                    float: left;
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: #000;
                ">×</button>
            </div>
            <div id="chatbot-messages" style="
                padding: 1rem;
                max-height: 250px;
                overflow-y: auto;
                color: #e8edf5;
            ">
                <div style="margin-bottom: 1rem; padding: 0.5rem; background: rgba(255,184,0,0.1); border-radius: 8px;">
                    ${config.welcomeMessage}
                </div>
            </div>
            <div style="padding: 1rem; border-top: 1px solid rgba(255,184,0,0.2);">
                <button onclick="openWhatsApp()" style="
                    width: 100%;
                    background: #25D366;
                    color: white;
                    border: none;
                    padding: 0.8rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">
                    📱 تحدث معنا على واتساب
                </button>
            </div>
        </div>
        
        <button id="chatbot-toggle" style="
            position: fixed;
            bottom: 20px;
            left: 80px;
            width: 50px;
            height: 50px;
            background: ${config.primaryColor};
            color: #000;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(255,184,0,0.3);
            z-index: 1000;
        ">
            💬
        </button>
    `;
    
    // Add chatbot to page
    document.addEventListener('DOMContentLoaded', function() {
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        
        // Toggle chatbot
        document.getElementById('chatbot-toggle').addEventListener('click', function() {
            const container = document.getElementById('chatbot-container');
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
        });
        
        // Close chatbot
        document.getElementById('chatbot-close').addEventListener('click', function() {
            document.getElementById('chatbot-container').style.display = 'none';
        });
    });
    
    // WhatsApp function
    window.openWhatsApp = function() {
        const message = encodeURIComponent('مرحباً، أريد الاستفسار عن خدماتكم');
        window.open(`https://wa.me/${config.whatsappNumber}?text=${message}`, '_blank');
    };
    
})();