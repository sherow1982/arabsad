(function(){
  const map={
    'SA': 'أهلاً! أحتاج استشارة لحملة إعلانية في السعودية',
    'AE': 'مرحباً! أريد خطة إعلانات في الإمارات',
    'KW': 'مرحبا! أريد بدء إعلانات في الكويت',
    'QA': 'مرحباً! أحتاج حملات لقطر',
    'BH': 'مرحباً! أحتاج استشارة للبحرين',
    'OM': 'مرحباً! أريد خطة لعُمان'
  };
  function getCountry(){
    try{ return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; }catch(e){return ''}
  }
  function countryCodeFromTZ(tz){
    if(/Riyadh|Arab/.test(tz)) return 'SA';
    if(/Dubai|Abu|Gulf|Muscat/.test(tz)) return 'AE';
    return '';
  }
  const tz=getCountry();
  const code=countryCodeFromTZ(tz);
  const links=[].slice.call(document.querySelectorAll('a[href^="https://wa.me/201110760081"]'));
  if(code && map[code]){
    const msg=encodeURIComponent(map[code]);
    links.forEach(a=>{a.href=`https://wa.me/201110760081?text=${msg}`});
  }
})();