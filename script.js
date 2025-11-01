// Mobile enhancements: WA links, back-to-top, nav toggle, image fallback
(function(){
  const PLACEHOLDER = '/assets/images/placeholder.webp';
  const topBtn = document.getElementById('backToTop');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Back to top visibility
  function toggleTop(){ topBtn && (topBtn.style.display = (scrollY>400?'flex':'none')); }
  window.addEventListener('scroll', toggleTop, {passive:true});
  toggleTop();
  topBtn && topBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Mobile nav toggle
  navToggle && navToggle.addEventListener('click', ()=> navMenu && navMenu.classList.toggle('active'));

  // Fix broken images
  document.addEventListener('error', function(e){
    const t = e.target;
    if(t.tagName==='IMG'){ t.onerror=null; if(t.src!==PLACEHOLDER){ t.src=PLACEHOLDER; } }
  }, true);

  // Remove blur when images enter viewport
  const io = new IntersectionObserver((entries,o)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const img = en.target; img.classList && img.classList.remove('lazy'); o.unobserve(img);
      }
    });
  },{rootMargin:'200px 0px'});
  document.querySelectorAll('img').forEach(img=> io.observe(img));
})();
