// ===== إعلانات العرب - إدارة المتجر =====
const CART_KEY = 'arabsads_cart';
const WA_PHONE = '201110760081';

const CITIES = {
  SA:['الرياض','جدة','مكة المكرمة','المدينة المنورة','الدمام','الخبر','الطائف','تبوك','أبها','القصيم','حائل','نجران','جازان'],
  AE:['دبي','أبوظبي','الشارقة','عجمان','رأس الخيمة','الفجيرة','أم القيوين','العين'],
  KW:['مدينة الكويت','حولي','الفروانية','الأحمدي','الجهراء','مبارك الكبير'],
  QA:['الدوحة','الريان','الوكرة','الخور','الشمال','أم صلال'],
  BH:['المنامة','المحرق','الرفاع','مدينة عيسى','مدينة حمد','سترة'],
  OM:['مسقط','صلالة','صحار','نزوى','صور','البريمي','الرستاق'],
  EG:['القاهرة','الإسكندرية','الجيزة','الشرقية','الدقهلية','البحيرة','المنوفية','القليوبية','الغربية','المنيا','أسيوط','سوهاج','الأقصر','أسوان','الفيوم','الإسماعيلية','السويس','بورسعيد','دمياط']
};

const PHONE_FORMATS = {
  SA:{placeholder:'05XXXXXXXX',hint:'مثال: 0512345678',pattern:'05[0-9]{8}'},
  AE:{placeholder:'05XXXXXXXX',hint:'مثال: 0501234567',pattern:'05[0-9]{8}'},
  KW:{placeholder:'XXXXXXXX',hint:'مثال: 55123456',pattern:'[569][0-9]{7}'},
  QA:{placeholder:'XXXXXXXX',hint:'مثال: 55123456',pattern:'[3567][0-9]{7}'},
  BH:{placeholder:'XXXXXXXX',hint:'مثال: 33123456',pattern:'[3679][0-9]{7}'},
  OM:{placeholder:'XXXXXXXX',hint:'مثال: 91234567',pattern:'[79][0-9]{7}'},
  EG:{placeholder:'01XXXXXXXXX',hint:'مثال: 01012345678',pattern:'01[0-9]{9}'}
};

// ===== CART =====
function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[];}catch(e){return[];}}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c));}

function updateCartUI(){
  const c=getCart();
  const total=c.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('.cart-count,.floating-cart-count').forEach(el=>{
    el.textContent=total;
    el.classList.toggle('visible',total>0);
  });
  document.querySelectorAll('.floating-cart').forEach(el=>{
    el.style.display=total>0?'flex':'none';
  });
}

function addToCart(product){
  const cart=getCart();
  const idx=cart.findIndex(i=>i.id===product.id);
  if(idx>-1){cart[idx].qty++;}else{cart.push({...product,qty:1});}
  saveCart(cart);
  updateCartUI();
  showToast('✅ تمت إضافة '+product.name+' إلى السلة');
}

function showToast(msg){
  let t=document.getElementById('cartToast');
  if(!t){t=document.createElement('div');t.id='cartToast';t.className='cart-toast';document.body.appendChild(t);}
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ===== WHATSAPP =====
function buildWaMessage(productName,productUrl){
  return encodeURIComponent('مرحباً، أريد الاستفسار عن خدمة: '+productName+'\nرابط الخدمة: '+productUrl+'\nأرجو التواصل معي.');
}

// ===== PHONE / CITY HELPERS =====
function populateCities(selectEl, countryCode){
  selectEl.innerHTML='<option value="">-- اختر المدينة --</option>';
  (CITIES[countryCode]||[]).forEach(c=>{
    const o=document.createElement('option');
    o.value=c;o.textContent=c;
    selectEl.appendChild(o);
  });
}

function applyPhoneFormat(phoneEl, hintEl, countryCode){
  const fmt=PHONE_FORMATS[countryCode];
  if(!fmt)return;
  phoneEl.placeholder=fmt.placeholder;
  phoneEl.pattern=fmt.pattern;
  if(hintEl)hintEl.textContent=fmt.hint;
}

// ===== BUILD ORDER MESSAGE =====
function buildOrderMessage(data, product){
  const ref='ORD-'+Date.now().toString().slice(-6);
  const msg=`🛒 *طلب جديد - ${ref}*\n\n👤 *بيانات العميل:*\nالاسم: ${data.name}\nالبريد: ${data.email}\nالدولة: ${data.country}\nالمدينة: ${data.city}\nالجوال: ${data.phone}${data.company?'\nالشركة: '+data.company:''}\n\n📦 *الخدمة المطلوبة:*\n- ${product.name} — $${product.price}\n\n💰 *الإجمالي: $${product.price}*\n💳 طريقة الدفع: ${data.payment}${data.notes?'\n\n📝 ملاحظات: '+data.notes:''}`;
  return {ref, msg};
}

// ===== INLINE CHECKOUT =====
function initInlineCheckout(product){
  const toggleBtn=document.getElementById('btnOrderNow');
  const panel=document.getElementById('inlineCheckout');
  if(!toggleBtn||!panel)return;

  toggleBtn.addEventListener('click',function(){
    const isOpen=panel.classList.contains('open');
    panel.classList.toggle('open');
    toggleBtn.textContent=isOpen?'⚡ اطلب الآن مباشرة':'✕ إغلاق النموذج';
    if(!isOpen)panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  });

  // country change
  const countryEl=panel.querySelector('#icCountry');
  const cityEl=panel.querySelector('#icCity');
  const phoneEl=panel.querySelector('#icPhone');
  const hintEl=panel.querySelector('#icPhoneHint');

  if(countryEl){
    countryEl.addEventListener('change',function(){
      populateCities(cityEl,this.value);
      applyPhoneFormat(phoneEl,hintEl,this.value);
    });
  }

  // submit
  const form=panel.querySelector('#inlineOrderForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const data={
        name:form.querySelector('#icName').value,
        email:form.querySelector('#icEmail').value,
        country:countryEl.options[countryEl.selectedIndex].text,
        city:cityEl.value,
        phone:phoneEl.value,
        company:form.querySelector('#icCompany').value,
        notes:form.querySelector('#icNotes').value,
        payment:form.querySelector('input[name="icPayment"]:checked').value
      };
      const {ref,msg}=buildOrderMessage(data,product);
      localStorage.setItem('lastOrder',JSON.stringify({ref,name:data.name,product}));
      window.open('https://wa.me/'+WA_PHONE+'?text='+encodeURIComponent(msg),'_blank');
    });
  }
}

// ===== STICKY ORDER BAR =====
function initStickyBar(product){
  const bar=document.getElementById('stickyOrderBar');
  if(!bar)return;
  const waMsg=buildWaMessage(product.name,window.location.href);
  const waBtn=bar.querySelector('.btn-sticky-wa');
  if(waBtn)waBtn.href='https://wa.me/'+WA_PHONE+'?text='+waMsg;
  const orderBtn=bar.querySelector('.btn-sticky-gold');
  if(orderBtn){
    orderBtn.addEventListener('click',function(){
      const panel=document.getElementById('inlineCheckout');
      const toggleBtn=document.getElementById('btnOrderNow');
      if(panel&&toggleBtn){
        panel.classList.add('open');
        toggleBtn.textContent='✕ إغلاق النموذج';
        panel.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  }
}

// ===== PRODUCT PAGE INIT =====
function initProductPage(product){
  // زر إضافة للسلة
  document.querySelectorAll('.btn-add-cart').forEach(btn=>{
    btn.addEventListener('click',function(e){
      e.preventDefault();
      addToCart(product);
    });
  });
  // زر واتساب
  const waMsg=buildWaMessage(product.name,window.location.href);
  document.querySelectorAll('.btn-whatsapp,.wa-float a').forEach(btn=>{
    btn.href='https://wa.me/'+WA_PHONE+'?text='+waMsg;
    btn.target='_blank';
    btn.rel='noopener noreferrer';
  });
  initInlineCheckout(product);
  initStickyBar(product);
  updateCartUI();
}

// ===== CHECKOUT PAGE =====
function updatePhoneFormat(){
  const country=document.getElementById('country');
  const cityEl=document.getElementById('city');
  const phoneEl=document.getElementById('phone');
  const hintEl=document.getElementById('phoneHint');
  if(!country)return;
  populateCities(cityEl,country.value);
  applyPhoneFormat(phoneEl,hintEl,country.value);
}

function renderOrderSummary(){
  const cart=getCart();
  const itemsEl=document.getElementById('orderItems');
  const totalEl=document.getElementById('orderTotal');
  const emptyEl=document.getElementById('emptyCart');
  const contentEl=document.getElementById('checkoutContent');
  if(!itemsEl)return;
  if(!cart.length){
    if(emptyEl)emptyEl.style.display='block';
    if(contentEl)contentEl.style.display='none';
    return;
  }
  let total=0;
  itemsEl.innerHTML='';
  cart.forEach(item=>{
    total+=item.price*item.qty;
    const div=document.createElement('div');
    div.className='order-item';
    div.innerHTML=`<div><div style="font-weight:700;font-size:.88rem">${item.name}</div><div style="font-size:.78rem;color:var(--muted)">الكمية: ${item.qty}</div></div><div style="font-weight:900;color:var(--gold)">$${(item.price*item.qty).toLocaleString()}</div>`;
    itemsEl.appendChild(div);
  });
  if(totalEl)totalEl.textContent='$'+total.toLocaleString();
}

function submitOrder(e){
  e.preventDefault();
  const country=document.getElementById('country');
  const cart=getCart();
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const services=cart.map(i=>`- ${i.name} (${i.qty}x $${i.price})`).join('\n');
  const ref='ORD-'+Date.now().toString().slice(-6);
  const data={
    name:document.getElementById('fullName').value,
    email:document.getElementById('email').value,
    country:country.options[country.selectedIndex].text,
    city:document.getElementById('city').value,
    phone:document.getElementById('phone').value,
    company:document.getElementById('company').value,
    notes:document.getElementById('notes').value,
    payment:document.querySelector('input[name="payment"]:checked').value
  };
  const msg=`🛒 *طلب جديد - ${ref}*\n\n👤 *بيانات العميل:*\nالاسم: ${data.name}\nالبريد: ${data.email}\nالدولة: ${data.country}\nالمدينة: ${data.city}\nالجوال: ${data.phone}${data.company?'\nالشركة: '+data.company:''}\n\n📦 *الخدمات المطلوبة:*\n${services}\n\n💰 *الإجمالي: $${total.toLocaleString()}*\n💳 طريقة الدفع: ${data.payment}${data.notes?'\n\n📝 ملاحظات: '+data.notes:''}`;
  localStorage.setItem('lastOrder',JSON.stringify({ref,name:data.name,total}));
  saveCart([]);
  window.location.href='https://wa.me/'+WA_PHONE+'?text='+encodeURIComponent(msg);
}

// ===== TABS =====
function initTabs(){
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',function(){
      const target=this.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      this.classList.add('active');
      const panel=document.getElementById(target);
      if(panel)panel.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded',function(){
  initTabs();
  updateCartUI();
  renderOrderSummary();
});
