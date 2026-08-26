(function(){
  'use strict';
  if(!window.chatbotConfig||!window.chatbotConfig.enabled)return;
  var config=window.chatbotConfig;
  var waMsg=encodeURIComponent('\u0645\u0631\u062d\u0628\u0627\u064b\u060c \u0623\u0631\u064a\u062f \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u062e\u062f\u0645\u0627\u062a\u0643\u0645');
  var waUrl='https://wa.me/201110760081?text='+waMsg;
  var color=config.primaryColor||'#C9A227';
  var welcome=config.welcomeMessage||'\u0645\u0631\u062d\u0628\u0627\u064b! \u0643\u064a\u0641 \u064a\u0645\u0643\u0646\u0646\u064a \u0645\u0633\u0627\u0639\u062f\u062a\u0643\u061f';

  var html='<div id="chatbot-container" style="position:fixed;bottom:80px;left:20px;width:300px;max-height:400px;background:#1a1f3a;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,.3);z-index:999;display:none;font-family:Cairo,sans-serif;direction:rtl">'
    +'<div style="background:'+color+';color:#000;padding:1rem;border-radius:15px 15px 0 0;font-weight:700;display:flex;justify-content:space-between;align-items:center">'
    +'<span>\ud83d\udcac \u0645\u0633\u0627\u0639\u062f \u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0627\u0644\u0639\u0631\u0628</span>'
    +'<button id="chatbot-close" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:#000;line-height:1">\xd7</button>'
    +'</div>'
    +'<div id="chatbot-messages" style="padding:1rem;max-height:250px;overflow-y:auto;color:#e8edf5">'
    +'<div style="padding:.6rem;background:rgba(255,184,0,.1);border-radius:8px;font-size:.9rem">'+welcome+'</div>'
    +'</div>'
    +'<div style="padding:1rem;border-top:1px solid rgba(255,184,0,.2)">'
    +'<a href="'+waUrl+'" target="_blank" rel="noopener noreferrer" style="display:block;width:100%;background:#25D366;color:#fff;padding:.8rem;border-radius:8px;font-weight:700;text-align:center;text-decoration:none;font-family:Cairo,sans-serif">\ud83d\udcf1 \u062a\u062d\u062f\u062b \u0645\u0639\u0646\u0627 \u0639\u0644\u0649 \u0648\u0627\u062a\u0633\u0627\u0628</a>'
    +'</div></div>'
    +'<button id="chatbot-toggle" style="position:fixed;bottom:20px;left:80px;width:50px;height:50px;background:'+color+';color:#000;border:none;border-radius:50%;cursor:pointer;font-size:1.2rem;box-shadow:0 4px 15px rgba(255,184,0,.3);z-index:1000">\ud83d\udcac</button>';

  document.addEventListener('DOMContentLoaded',function(){
    document.body.insertAdjacentHTML('beforeend',html);
    document.getElementById('chatbot-toggle').addEventListener('click',function(){
      var c=document.getElementById('chatbot-container');
      c.style.display=c.style.display==='none'?'block':'none';
    });
    document.getElementById('chatbot-close').addEventListener('click',function(){
      document.getElementById('chatbot-container').style.display='none';
    });
  });
})();
