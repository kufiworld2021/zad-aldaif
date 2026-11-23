/* بنر الصفحة الرئيسية: ٧ شرائح — يركب مكان واجهة المتجر الأصلية */
(function(){
  var f=document.getElementById('frame');if(!f)return;
  var SL=[{"k": "01", "s": "مصاحف", "h": "مصحف يهدى<br><b>لضيف الرحمن</b>", "cls": "", "p": "أهد مصحفا باسمك أو باسم من تحب ونوثق لك التنفيذ", "c": "أهد مصحفا", "g": "#304532", "w": "", "to": "مصحف باسم من تحب"}, {"k": "02", "s": "سجاد ومسابح", "h": "سجادة ومسبحة<br><b>هدية تبقى</b>", "cls": "", "p": "سجادات صلاة مع مسابحها توصل لضيوف الرحمن باسم من تهديه", "c": "تصفح السجاد", "g": "#2e412e", "w": "", "to": "سجادة صلاة"}, {"k": "03", "s": "طقم العمرة", "h": "طقم إحرام<br><b>لضيف الرحمن</b>", "cls": "", "p": "طقم إحرام كامل بحقيبته يهدى للمعتمر باسمك", "c": "اطلب طقم العمرة", "g": "#2d422f", "w": "", "to": ""}, {"k": "04", "s": "كراسي الصلاة", "h": "كرسي صلاة <b>قابل للطي</b>", "cls": "one", "p": "خفيف وسهل الحمل عون لكبار السن من ضيوف الرحمن", "c": "اطلب الكرسي", "g": "#2a412d", "w": "", "to": "كرسي صلاة قابل للطي"}, {"k": "09", "s": "الكراسي المتحركة", "h": "كراسي متحركة<br><b>لضيوف الرحمن</b>", "cls": "", "p": "كرسي متحرك يهدى لمن يحتاجه من كبار السن", "c": "اطلب الكرسي", "g": "#2d4430", "w": "35%", "to": ""}, {"k": "05", "s": "وجبة الحرم", "h": "أطعم ضيف الرحمن <b>باسمك</b>", "cls": "one sm", "p": "وجبة وتمر وماء اختر العدد واترك التوزيع والتوثيق علينا", "c": "اطلب الوجبات", "g": "#2e4531", "w": "", "to": "وجبة إفطار"}, {"k": "06", "s": "مستلزمات الحجاج", "h": "مستلزمات الحجاج<br><b>لضيوف بيت الرحمن</b>", "cls": "", "p": "مظلة وتمر ومسواك وماء كل اللي يحتاجه الحاج في طريقه", "c": "تصفح المستلزمات", "g": "#314633", "w": "", "to": ""}];
  var CSS=".zb{position:relative;aspect-ratio:1902/814;background:#3c483c;overflow:hidden;font-family:'Noto Kufi Arabic';color:#f4efe6;direction:rtl;user-select:none} .zb .sl{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .8s ease,visibility 0s .8s} .zb .sl.on{opacity:1;visibility:visible;transition:opacity .8s ease} .zb .im{position:absolute;inset:0;background-size:cover;background-position:left center;transform:scale(1.06)} .zb .sl.on .im{animation:zbZoom 7s ease-out forwards} @keyframes zbZoom{from{transform:scale(1.06)}to{transform:scale(1)}} .zb .tx{position:absolute;top:0;bottom:0;right:0;width:var(--tw,43%);padding:0 4cqw 2cqw 1cqw;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center} .zb small{font:700 clamp(10px,1.05cqw,19px) 'Noto Sans Arabic';color:#e6c9a8;border:1px solid rgba(230,201,168,.45);border-radius:999px;padding:.45em 1.2em;margin-bottom:1.3em} .zb h2{font-size:clamp(17px,3.1cqw,66px);line-height:1.5;font-weight:800;margin:0 0 .35em;text-wrap:balance}.zb h2.one{white-space:nowrap}.zb h2.sm{font-size:clamp(16px,2.75cqw,58px)} .zb h2 b{color:#e6c9a8;font-weight:800} .zb p{font:700 clamp(11px,1.3cqw,25px)/2 'Noto Sans Arabic';color:#dcd6c9;margin:0 0 1.6em;max-width:30em;text-wrap:balance} .zb .cta{font:800 clamp(11px,1.15cqw,22px) 'Noto Kufi Arabic';background:#b88458;color:#fff;border-radius:999px;padding:.95em 2.2em;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:.6em;position:relative;z-index:4;box-shadow:0 12px 26px -10px rgba(0,0,0,.65),inset 0 -3px 0 rgba(0,0,0,.14);transition:background .25s,color .25s,translate .25s,box-shadow .25s} .zb .cta::after{content:'';width:.5em;height:.5em;border-left:.16em solid currentColor;border-bottom:.16em solid currentColor;transform:rotate(45deg);transition:translate .25s} .zb .cta:hover{background:#f4efe6;color:#425548;translate:0 -3px;box-shadow:0 18px 30px -12px rgba(0,0,0,.7)} .zb .cta:hover::after{translate:-4px 0} .zb .cta:active{translate:0 1px} .zb .sl.on{z-index:2} .zb .tx>*{opacity:0;transform:translateY(22px)} .zb .sl.on .tx>*{animation:zbRise .7s cubic-bezier(.2,.7,.2,1) forwards} .zb .sl.on .tx>:nth-child(1){animation-delay:.25s}.zb .sl.on .tx>:nth-child(2){animation-delay:.4s} .zb .sl.on .tx>:nth-child(3){animation-delay:.55s}.zb .sl.on .tx>:nth-child(4){animation-delay:.7s} @keyframes zbRise{to{opacity:1;transform:none}} .zb .dots{position:absolute;right:0;width:43%;padding:0 4cqw 0 1cqw;justify-content:center;bottom:2.6cqw;display:flex;gap:7px;z-index:3;direction:rtl} .zb .dots i{width:9px;height:9px;border-radius:9px;background:rgba(244,239,230,.35);cursor:pointer;transition:width .3s,background .3s} .zb .dots i.on{width:30px;background:#b88458} .zb .ar{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:52px;height:52px;border-radius:50%;border:1px solid rgba(244,239,230,.35);background:rgba(46,58,51,.35);color:#f4efe6;display:grid;place-items:center;cursor:pointer;font:400 20px/1 sans-serif;padding:0} .zb .ar svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;display:block} .zb .ar.nx{left:16px}.zb .ar.pv{right:16px} .zb .ar:hover{background:#b88458;border-color:#b88458} @container (max-width:700px){ .zb{aspect-ratio:auto;height:566px} .zb .im{inset:0 0 auto 0;height:250px;background-size:auto 100%;background-position:left center} .zb .tx{top:250px;right:0;left:0;width:auto;padding:16px 22px 58px;justify-content:center;background:var(--g,#3c483c)}.zb h2.one{white-space:normal} .zb small{font-size:11px;margin-bottom:10px} .zb h2{font-size:22px} .zb p{font-size:13.5px;margin-bottom:14px;line-height:1.9} .zb .cta{font-size:13px;padding:11px 24px} .zb .dots{right:0;left:0;width:auto;padding:0;bottom:20px} .zb .ar{display:none} }"+'@media (prefers-reduced-motion:reduce){.zb .tx>*{opacity:1!important;transform:none!important}}#zbw{container-type:inline-size;direction:rtl}#zbw .zb .cta{border:0}';
  function arr(x){return Array.prototype.slice.call(x)}
  function norm(t){return (t||'').split(String.fromCharCode(10)).join(' ').replace(/ +/g,' ').trim()}
  function page(w){return (w.location.hash||'').replace('#','')||'home'}
  function findHero(d){
    var c=arr(d.querySelectorAll('[class*="hero"],[id*="hero"]')).filter(function(e){return !e.closest('#zbw')&&!e.closest('#zh')&&e.offsetParent!==null});
    var e=c[0];if(!e)return null;
    while(e.parentElement&&/hero/i.test((e.parentElement.className||'')+' '+(e.parentElement.id||'')))e=e.parentElement;
    var r=e.getBoundingClientRect();if(r.height<120||r.width<200)return null;
    return e;
  }
  function build(d,w){
    var hero=findHero(d),zh=d.getElementById('zh'),host,before;
    if(hero){host=hero.parentElement;before=hero}
    else if(zh){host=zh.parentElement;before=zh.nextSibling}
    else return null;
    if(!d.getElementById('zb-css')){var st=d.createElement('style');st.id='zb-css';st.textContent=CSS;d.head.appendChild(st)}
    var wr=d.createElement('div');wr.id='zbw';
    wr.innerHTML='<div class="zb">'+SL.map(function(s,i){return '<div class="sl'+(i?'':' on')+'" style="--g:'+s.g+(s.w?';--tw:'+s.w:'')+'"><div class="im" style="background-image:url(img/bn/'+s.k+'.jpg)"></div><div class="tx"><small>'+s.s+'</small><h2'+(s.cls?' class="'+s.cls+'"':'')+'>'+s.h+'</h2><p>'+s.p+'</p><a class="cta" data-to="'+s.to+'">'+s.c+'</a></div></div>'}).join('')
      +'<button class="ar pv" aria-label="السابق"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button><button class="ar nx" aria-label="التالي"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><div class="dots"></div></div>';
    host.insertBefore(wr,before);
    if(hero){hero.style.setProperty('display','none','important');wr.__hero=hero}
    var zb=wr.firstChild,sl=arr(zb.querySelectorAll('.sl')),dots=zb.querySelector('.dots'),i=0,t;
    function go(k){i=(k+sl.length)%sl.length;sl.forEach(function(s,j){s.classList.toggle('on',j===i)});arr(dots.children).forEach(function(x,j){x.classList.toggle('on',j===i)});play()}
    function play(){w.clearInterval(t);t=w.setInterval(function(){go(i+1)},5500)}
    sl.forEach(function(_,k){var x=d.createElement('i');if(!k)x.className='on';x.onclick=function(){go(k)};dots.appendChild(x)});
    zb.querySelector('.nx').onclick=function(){go(i+1)};zb.querySelector('.pv').onclick=function(){go(i-1)};
    zb.onmouseenter=function(){w.clearInterval(t)};zb.onmouseleave=play;
    var x0=null;zb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
    zb.addEventListener('touchend',function(e){if(x0==null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx>0?1:-1));x0=null});
    arr(zb.querySelectorAll('.cta')).forEach(function(a){a.onclick=function(){
      var to=a.getAttribute('data-to');function kk(t){return (t||'').replace(/[^\u0621-\u063A\u0641-\u064A]/g,'')}
      if(to){var cd=arr(d.querySelectorAll('.s-product-card-entry')).filter(function(x){var t=x.querySelector('.s-product-card-content-title');return t&&kk(t.textContent)===kk(to)})[0],l=cd&&(cd.querySelector('a.s-product-card-image')||cd.querySelector('a[href="#product"]')||cd.querySelector('a'));if(l){try{var q=function(z){var e=cd.querySelector(z);return e?norm(e.textContent):''},im=cd.querySelector('.s-product-card-image img');w.__zprod={t:q('.s-product-card-content-title'),s:q('.s-product-card-content-subtitle'),p:q('.s-product-card-price'),i:im?im.getAttribute('src'):''};w.sessionStorage.setItem('zprod',JSON.stringify(w.__zprod))}catch(e){}l.click();try{if(w.__zSync)w.__zSync()}catch(e){}if((w.location.hash||'')!=='#product')w.location.hash='product';w.scrollTo(0,0);return}}
      w.location.hash='shop';w.scrollTo(0,0);
    }});
    play();
    return wr;
  }
  function tick(){
    try{
      var d=f.contentDocument,w=f.contentWindow;if(!d||!d.body||!d.head)return;
      var wr=d.getElementById('zbw'),home=page(w)==='home';
      if(wr&&wr.__hero&&!wr.__hero.isConnected){wr.remove();wr=null}
      if(!wr&&home)wr=build(d,w);
      if(!wr)return;
      if(wr.__hero){if(wr.__hero.style.display!=='none')wr.__hero.style.setProperty('display','none','important')}
      else wr.style.display=home?'':'none';
      /* البنر بعرض الصفحة كاملة */
      if(wr.style.display!=='none'){var cw=d.documentElement.clientWidth;wr.style.position='relative';wr.style.maxWidth='none';if(wr.style.width!==cw+'px')wr.style.width=cw+'px';var cur=parseFloat(wr.style.left)||0,nat=wr.getBoundingClientRect().left-cur,nl=(-nat)+'px';if(Math.abs(nat+cur)>.5)wr.style.left=nl;var zh=d.getElementById('zh');if(zh){var mt=parseFloat(wr.style.marginTop)||0,gap=wr.getBoundingClientRect().top-zh.getBoundingClientRect().bottom-mt;if(gap>0&&gap<120&&Math.abs(gap+mt)>.5)wr.style.marginTop=(-gap)+'px'}}
    }catch(e){}
  }
  f.addEventListener('load',function(){setTimeout(tick,300)});
  setInterval(tick,700);setTimeout(tick,300);
})();
