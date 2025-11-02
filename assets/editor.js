/**
 * TinyMCE عربي لموقع إعلانات العرب
 * محرر متقدم للمحتوى والإعلانات
 * تم إصلاح مشاكل التحميل
 */

// تحميل TinyMCE بطريقة آمنة
function loadTinyMCE() {
  return new Promise((resolve, reject) => {
    if (window.tinymce) {
      console.log('✅ TinyMCE محمل مسبقاً');
      resolve();
      return;
    }
    
    console.log('🔄 جاري تحميل TinyMCE...');
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tinymce@6/tinymce.min.js';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'origin';
    script.async = true;
    
    script.onload = () => {
      console.log('✅ تم تحميل TinyMCE بنجاح');
      resolve();
    };
    
    script.onerror = (error) => {
      console.error('❌ فشل في تحميل TinyMCE:', error);
      reject(new Error('TinyMCE loading failed'));
    };
    
    document.head.appendChild(script);
  });
}

// إعداد محرر إعلانات العرب مع إصلاحات
function initArabsadEditor() {
  const config = {
    selector: '.arabsad-editor, .rich-editor, textarea.arabic-content',
    
    plugins: [
      'anchor', 'autolink', 'autoresize', 'autosave', 'charmap', 'code',
      'codesample', 'directionality', 'emoticons', 'fullscreen',
      'image', 'insertdatetime', 'link', 'lists', 'media', 'preview',
      'quickbars', 'save', 'searchreplace', 'table', 'visualblocks',
      'wordcount'
    ].join(' '),
    
    toolbar: [
      'undo redo | styles | bold italic underline | fontfamily fontsize',
      'forecolor backcolor | alignleft aligncenter alignright alignjustify | ltr rtl',
      'bullist numlist | outdent indent | link image media table emoticons',
      'code preview fullscreen | searchreplace | saveAd previewAd | help'
    ].join(' | '),
    
    menubar: 'file edit view insert format tools table help',
    
    // إعدادات عربية محسنة
    directionality: 'rtl',
    language: 'ar',
    language_url: false, // تجنب مشاكل التحميل
    
    height: 500,
    min_height: 300,
    max_height: 800,
    resize: 'vertical',
    
    branding: false,
    promotion: false,
    
    // حفظ تلقائي
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_retention: '2m',
    
    // إعدادات المحتوى
    content_css: false,
    content_style: `
      body {
        font-family: 'Cairo', 'Amiri', Arial, sans-serif;
        font-size: 15px;
        line-height: 1.7;
        direction: rtl;
        text-align: right;
        color: #2c3e50;
        background: #fff;
        margin: 10px;
      }
      h1, h2, h3, h4, h5, h6 {
        font-weight: bold;
        color: #34495e;
        margin: 1.2em 0 0.6em 0;
      }
      .ad-highlight {
        background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
        padding: 3px 6px;
        border-radius: 4px;
        font-weight: bold;
      }
      .arabsad-quote {
        background: #f8f9fa;
        border-right: 4px solid #17a2b8;
        padding: 20px;
        margin: 20px 0;
        border-radius: 6px;
        font-style: italic;
      }
      .success-box {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
        padding: 15px;
        border-radius: 6px;
        margin: 15px 0;
      }
    `,
    
    style_formats: [
      {
        title: 'أنماط إعلانات العرب',
        items: [
          { title: 'نص إعلاني مميز', inline: 'span', classes: 'ad-highlight' },
          { title: 'اقتباس عربي', block: 'blockquote', classes: 'arabsad-quote' },
          { title: 'مربع نجاح', block: 'div', classes: 'success-box' },
          { title: 'عنوان إعلان', block: 'h2', styles: { color: '#e74c3c', 'text-align': 'center' } }
        ]
      }
    ],
    
    // معالج التهيئة
    init_instance_callback: function(editor) {
      console.log('✅ محرر إعلانات العرب جاهز:', editor.id);
      
      // عرض رسالة نجاح
      setTimeout(() => {
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(45deg, #e74c3c, #c0392b);
          color: white;
          padding: 15px 25px;
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
          z-index: 10000;
          font-weight: bold;
          text-align: center;
        `;
        successMsg.textContent = '✅ محرر إعلانات العرب جاهز! 🎯';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.style.opacity = '0';
          successMsg.style.transition = 'all 0.5s ease';
          successMsg.style.transform = 'translateY(-20px)';
          setTimeout(() => successMsg.remove(), 500);
        }, 3500);
      }, 800);
    },
    
    setup: function(editor) {
      // زر حفظ إعلان
      editor.ui.registry.addButton('saveAd', {
        text: '💾 حفظ إعلان',
        tooltip: 'حفظ محتوى الإعلان',
        onAction: function() {
          const content = editor.getContent();
          const title = document.title || 'إعلان-عربي';
          
          const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Cairo', Arial, sans-serif;
            direction: rtl;
            text-align: right;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.7;
        }
        h1, h2, h3 { color: #2c3e50; }
        .ad-highlight {
            background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
            padding: 3px 6px;
            border-radius: 4px;
            font-weight: bold;
        }
        .arabsad-quote {
            background: #f8f9fa;
            border-right: 4px solid #17a2b8;
            padding: 20px;
            margin: 20px 0;
            border-radius: 6px;
            font-style: italic;
        }
        .success-box {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    ${content}
    <hr style="margin-top: 40px;">
    <p style="text-align: center; color: #7f8c8d; font-size: 12px;">
        تم إنشاؤه بواسطة موقع إعلانات العرب - https://arabsad.com
    </p>
</body>
</html>`;
          
          const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `arabsad-ad-${Date.now()}.html`;
          link.click();
          URL.revokeObjectURL(url);
          
          editor.notificationManager.open({
            text: 'تم حفظ الإعلان بنجاح! 🎉',
            type: 'success',
            timeout: 3000
          });
        }
      });
      
      // زر معاينة مباشرة
      editor.ui.registry.addButton('previewAd', {
        text: '👁️ معاينة',
        tooltip: 'معاينة الإعلان',
        onAction: function() {
          const content = editor.getContent();
          const previewWindow = window.open('', '_blank');
          previewWindow.document.write(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>معاينة الإعلان</title>
    <style>
        body {
            font-family: 'Cairo', Arial, sans-serif;
            direction: rtl;
            text-align: right;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.7;
            background: #f8f9fa;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        h1, h2, h3 { color: #2c3e50; }
        .ad-highlight {
            background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
            padding: 3px 6px;
            border-radius: 4px;
            font-weight: bold;
        }
        .arabsad-quote {
            background: #f8f9fa;
            border-right: 4px solid #17a2b8;
            padding: 20px;
            margin: 20px 0;
            border-radius: 6px;
            font-style: italic;
        }
        .success-box {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>👁️ معاينة الإعلان</h1>
        ${content}
    </div>
</body>
</html>
          `);
          previewWindow.document.close();
        }
      });
      
      // إعداد المحرر بعد التهيئة
      editor.on('init', function() {
        console.log('🚀 محرر إعلانات العرب مُهيأ بنجاح');
        
        // إعداد الاتجاه للعربية
        const body = editor.getBody();
        body.style.direction = 'rtl';
        body.style.textAlign = 'right';
      });
    }
  };
  
  // تهيئة مع معالجة الأخطاء
  try {
    tinymce.init(config);
    console.log('🔄 جاري تهيئة محرر إعلانات العرب...');
  } catch (error) {
    console.error('❌ خطأ في تهيئة المحرر:', error);
  }
}

// تهيئة مع إعادة محاولة
let retryCount = 0;
const maxRetries = 3;

function initArabsadWithRetry() {
  console.log('🚀 بدء تهيئة محرر إعلانات العرب...');
  
  loadTinyMCE()
    .then(() => {
      // انتظار قصير قبل التهيئة
      setTimeout(() => {
        initArabsadEditor();
        console.log('✅ تم تهيئة محرر إعلانات العرب بنجاح');
      }, 300);
    })
    .catch(error => {
      console.error(`❌ محاولة ${retryCount + 1}: فشل في التحميل:`, error);
      
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`🔄 إعادة محاولة ${retryCount}/${maxRetries} بعد 2 ثواني...`);
        setTimeout(initArabsadWithRetry, 2000);
      } else {
        console.error('❌ فشل نهائي - عرض رسالة خطأ');
        showArabsadError();
      }
    });
}

// عرض رسالة خطأ مخصصة
function showArabsadError() {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #e74c3c, #c0392b);
    color: white;
    padding: 25px 35px;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(231, 76, 60, 0.4);
    z-index: 10000;
    text-align: center;
    max-width: 450px;
    border: 2px solid rgba(255,255,255,0.2);
  `;
  errorDiv.innerHTML = `
    <div style="font-size: 3em; margin-bottom: 15px;">⚠️</div>
    <h3 style="margin-bottom: 15px;">مشكلة في تحميل المحرر</h3>
    <p style="margin-bottom: 20px; line-height: 1.5;">
      يرجى التحقق من الإنترنت أو إعادة تحميل الصفحة<br>
      <small>إذا استمرت المشكلة، تواصل معنا</small>
    </p>
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <button onclick="this.parentElement.parentElement.remove(); location.reload();" 
              style="background: white; color: #e74c3c; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold;">
        🔄 إعادة تحميل
      </button>
      <a href="https://wa.me/201110760081" target="_blank"
         style="background: #25d366; color: white; text-decoration: none; padding: 10px 20px; border-radius: 25px; font-weight: bold;">
        📞 تواصل معنا
      </a>
    </div>
  `;
  document.body.appendChild(errorDiv);
}

// تهيئة تلقائية
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM جاهز - بدء تحميل محرر إعلانات العرب');
    setTimeout(initArabsadWithRetry, 500);
  });
} else {
  console.log('📄 DOM محمل مسبقاً - بدء المحرر');
  setTimeout(initArabsadWithRetry, 100);
}

// تصدير الوظائف
window.ArabsadEditor = { 
  loadTinyMCE, 
  initArabsadEditor, 
  initArabsadWithRetry 
};

// وظائف مساعدة
window.ArabsadHelpers = {
  // إدراج قالب إعلان
  insertAdTemplate: function(editorId) {
    const editor = tinymce.get(editorId);
    if (editor) {
      const template = `
        <h2 style="text-align: center; color: #e74c3c;">🎯 [عنوان الإعلان]</h2>
        
        <div class="ad-highlight">
          <h3>🚀 ما نقدمه لك:</h3>
          <ul>
            <li>[الميزة الأولى]</li>
            <li>[الميزة الثانية]</li>
            <li>[الميزة الثالثة]</li>
          </ul>
        </div>
        
        <blockquote class="arabsad-quote">
          <p>"شهادة عميل أو نتيجة مميزة..."</p>
        </blockquote>
        
        <div class="success-box">
          <h4>🎯 عرض خاص محدود!</h4>
          <p>[تفاصيل العرض]</p>
        </div>
        
        <p style="text-align: center; margin-top: 20px;">
          <strong>📞 تواصل معنا الآن:</strong><br>
          واتساب: <a href="https://wa.me/201110760081">+201110760081</a>
        </p>
      `;
      editor.insertContent(template);
      
      editor.notificationManager.open({
        text: 'تم إضافة قالب الإعلان! 🎯',
        type: 'success'
      });
    }
  },
  
  // تبديل اتجاه النص
  toggleDirection: function(editorId) {
    const editor = tinymce.get(editorId);
    if (editor) {
      const body = editor.getBody();
      const isRTL = body.style.direction === 'rtl';
      
      body.style.direction = isRTL ? 'ltr' : 'rtl';
      body.style.textAlign = isRTL ? 'left' : 'right';
      
      editor.notificationManager.open({
        text: `تم التبديل إلى ${isRTL ? 'English (LTR)' : 'العربية (RTL)'}`,
        type: 'info',
        timeout: 2000
      });
    }
  }
};

console.log('📦 تم تحميل ملف محرر إعلانات العرب (مُصلَح)');