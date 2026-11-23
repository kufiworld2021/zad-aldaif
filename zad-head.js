/* رأس الصفحة المعتمد: البوتيك الزيتي — يركب فوق رأس المتجر الأصلي ويشغل روابطه */
(function(){
  var f=document.getElementById('frame');if(!f)return;
  var LABELS=['الرئيسية','كل الهدايا','تمور ومياه','مصاحف ومستلزمات','من نحن'];
  var PAGE={home:'الرئيسية',shop:'كل الهدايا',about:'من نحن'};
  var S='<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>';
  var U='<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 20c.9-3.4 3.8-5.4 7.2-5.4s6.3 2 7.2 5.4"/></svg>';
  var B='<svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>';
  var H='<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.6A4 4 0 0 1 12 8a4 4 0 0 1 7 2.4C19 15.600 12 20 12 20z"/></svg>';
  var CSS='#zh{position:sticky;top:0;z-index:60;direction:rtl;font-family:"Noto Kufi Arabic",sans-serif;font-size:14px;line-height:1.4}'
  +'#zh *{box-sizing:border-box}'
  +'#zh svg{width:19px;height:19px;fill:none;stroke:#F4EFE6;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none;transition:stroke .2s}'
  +'#zh .zh1{background:#425548;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:14px;padding:12px 28px}'
  +'#zh .zhr{order:3;justify-self:end;display:flex;align-items:center;gap:10px;flex-direction:row-reverse}#zh .zhl{order:2}#zh .zhsp{order:1}'
  +'#zh .zhcap{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:9px;height:42px;border-radius:999px;background:#F4EFE6;padding:0 5px 0 14px;cursor:pointer;transition:transform .2s,box-shadow .2s}'
  +'#zh .zhcap:hover{transform:translateY(-1px);box-shadow:0 6px 14px -6px rgba(0,0,0,.45)}'
  +'#zh .zhcap u{width:32px;height:32px;border-radius:50%;background:#425548 url(img/logo-ivory.svg) center/74% no-repeat;flex:none}'
  +'#zh .zhcap b{font:700 13px "Noto Kufi Arabic",sans-serif;color:#425548;white-space:nowrap}'
  +'#zh .zhb{all:unset;box-sizing:border-box;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;position:relative;cursor:pointer;background:transparent;border:1px solid rgba(244,239,230,.35);transition:background .2s,border-color .2s}'
  +'#zh .zhb:hover{background:#E6C9A8;border-color:#E6C9A8}#zh .zhn svg{transform-origin:50% 10%;animation:zhnr 4s ease-in-out infinite}@keyframes zhnr{0%,86%,100%{rotate:0deg}89%{rotate:14deg}92%{rotate:-12deg}95%{rotate:8deg}98%{rotate:-4deg}}#zh .zhn em{position:absolute;top:1px;right:2px;width:9px;height:9px;border-radius:50%;background:#B88458;border:2px solid #425548}#zh .zhn.seen em{display:none}#zh .zhnp{display:none;position:absolute;top:52px;left:0;z-index:60;width:230px;background:#f4efe6;color:#425548;border-radius:16px;padding:14px 16px;text-align:center;box-shadow:0 16px 34px rgba(0,0,0,.28);border-top:3px solid #B88458;cursor:default}#zh .zhn.on .zhnp{display:block}#zh .zhnp b{display:block;font:900 15px "Noto Kufi Arabic",sans-serif;margin-bottom:4px}#zh .zhnp small{font:800 13px "Noto Kufi Arabic",sans-serif;color:#6b756e}#zh .zhb:hover svg{stroke:#425548}'
  +'#zh .zhb i{position:absolute;top:-4px;right:-4px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#B88458;color:#fff;font:700 10px/17px "Noto Kufi Arabic",sans-serif;text-align:center;font-style:normal}'
  +'#zh .zhl{display:block;width:150px;height:60px;cursor:pointer;background:url(img/logo-ivory.svg) center/contain no-repeat}'
  +'#zh .zhsb{background:#425548;display:none;justify-content:center;padding:0 18px 12px}#zh.sopen .zhsb{display:flex}'
  +'#zh .zhs{display:flex;align-items:center;gap:10px;width:min(520px,100%);height:42px;border-radius:999px;padding:0 16px;background:rgba(244,239,230,.1);border:1px solid rgba(244,239,230,.35);cursor:text}'
  +'#zh .zhs input{all:unset;flex:1;min-width:0;color:#F4EFE6;font:700 13px "Noto Kufi Arabic",sans-serif;text-align:right}'
  +'#zh .zhs input::placeholder{color:#d9d3c6;opacity:1}'
  +'#zh .zh2{background:#F4EFE6;height:50px;display:flex;justify-content:center;align-items:center;overflow-x:auto;scrollbar-width:none}'
  +'#zh .zh2::-webkit-scrollbar{display:none}'
  +'#zh .zh2 nav{display:flex;gap:clamp(18px,2.6vw,38px);white-space:nowrap;padding:0 18px}'
  +'#zh .zh2 a{color:#425548;cursor:pointer;position:relative;text-decoration:none}'
  +'#zh .zh2 a.on::after{content:"";position:absolute;right:0;left:0;bottom:-8px;height:2px;border-radius:2px;background:#B88458}'
  +'#zh .zhe{height:4px;background:#B88458}'
  +'#zh .zh2 a.mg{display:inline-flex;align-items:center;gap:6px}#zh .zh2 a.mg::before{content:"";width:7px;height:7px;border-left:2px solid #B88458;border-bottom:2px solid #B88458;rotate:-45deg;margin-top:-4px;transition:rotate .25s,margin .25s;order:2}#zh.mopen .zh2 a.mg::before{rotate:135deg;margin-top:4px}'
  +'#zh .zmg{position:absolute;top:100%;right:0;left:0;background:#F4EFE6;border-bottom:4px solid #B88458;box-shadow:0 26px 40px -26px rgba(0,0,0,.5);display:none;padding:22px clamp(16px,4vw,60px) 26px;max-height:calc(100vh - 180px);overflow:auto}#zh.mopen .zmg{display:block;animation:zmgIn .25s ease-out}@keyframes zmgIn{from{opacity:0;translate:0 -8px}to{opacity:1;translate:0 0}}'
  +'#zh .zmg{padding:0!important;background:#fff!important}'
  +'#zh .zmg .in{max-width:1300px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr) 280px;gap:0}'
  +'#zh .zmg .col{padding:24px 22px;text-align:center}'
  +'#zh .zmg h5{margin:0 0 12px;font:800 16px "Noto Kufi Arabic",sans-serif;color:#B88458;cursor:pointer}#zh .zmg h5:hover{color:#425548}'
  +'#zh .zmg .it{cursor:pointer;padding:7px 0}'
  +'#zh .zmg .it b{position:relative;display:inline-block;font:800 15px/1.6 "Noto Kufi Arabic",sans-serif;color:#2e3a33}'
  +'#zh .zmg .it b::after{content:"";position:absolute;right:50%;translate:50% 0;bottom:-2px;height:2px;width:0;background:#B88458;transition:width .25s}#zh .zmg .it:hover b::after,#zh .zmg .it.on b::after{width:100%}'
  +'#zh .zmg .pv{background:#425548;display:grid;place-items:center;padding:20px;text-align:center;cursor:pointer}'
  +'#zh .zmg .pv u{display:block;width:170px;height:170px;background:center/contain no-repeat;filter:drop-shadow(0 16px 12px rgba(0,0,0,.4));transition:opacity .2s,scale .3s}#zh .zmg .pv.sw u{opacity:0;scale:.9}'
  +'#zh .zmg .pv b{display:block;font:800 16px "Noto Kufi Arabic",sans-serif;color:#F4EFE6;margin-top:8px}#zh .zmg .pv small{display:block;font:700 12.500px "Noto Kufi Arabic",sans-serif;color:#E6C9A8}'
  +'@media (max-width:980px){#zh .zmg .in{grid-template-columns:1fr 1fr}#zh .zmg .pv{display:none}#zh .zmg .col{padding:16px 18px}}'
  +'#zh .zhcap{background:#b88458;height:46px;padding:0 5px 0 18px;box-shadow:0 6px 14px -6px rgba(0,0,0,.45)}#zh .zhcap:hover{background:#a8744a}#zh .zhcap u{width:36px;height:36px;background:#f4efe6 url(img/logo-olive.svg) center/74% no-repeat}#zh .zhcap b{font:900 16px "Noto Kufi Arabic",sans-serif;color:#fff}'
  +'#zh .zhg{display:flex;align-items:center;gap:2px;height:46px;padding:0 5px;border-radius:999px;background:rgba(244,239,230,.1);border:1px solid rgba(244,239,230,.35);flex-direction:row-reverse}#zh .zhg .zhb{border:0;width:40px;height:38px}#zh .zhg .zhb i{top:-2px;right:-2px}#zh .zhn em{background:#e02424!important;border-color:#4d6053!important}'
  +'#zh .zhi{width:clamp(180px,17vw,250px);height:46px}#zh .zhsr{display:none}#zh.sopen .zhsb{display:none}'
  +'@media (max-width:900px){#zh .zhi{display:none}#zh .zhsr{display:grid}#zh.sopen .zhsb{display:flex}}'
  +'#zh .zh2 a.of{color:#b88458!important;display:inline-flex;align-items:center;gap:6px}#zh .zh2 a.of em{font-style:normal;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#b88458;color:#fff;font:900 12px Arial,sans-serif;animation:zhof 1.800s ease-in-out infinite}@keyframes zhof{50%{transform:scale(1.200) rotate(-10deg)}}'
  +'#zh .zhm{display:none}#zh .zmg .pv>div{display:grid;justify-items:center;text-align:center}#zh .zmg .pv u{margin:0 auto}'
  +'#zh .zhdh{display:none;align-items:center;justify-content:space-between;background:#425548;padding:14px 16px 12px}#zh .zhdh u{width:110px;height:44px;background:url(img/logo-ivory.svg) right center/contain no-repeat}#zh .zhx{all:unset;box-sizing:border-box;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;cursor:pointer;border:1px solid rgba(244,239,230,.4);color:#F4EFE6;font:400 24px/1 Arial,sans-serif;transition:background .2s,color .2s}#zh .zhx:hover{background:#E6C9A8;color:#425548}'
  +'#zh .zhbk{display:block;position:fixed;inset:0;background:rgba(20,26,22,.55);opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s;z-index:70}#zh.nopen .zhbk{opacity:1;visibility:visible;transition:opacity .3s}#zh.nopen{z-index:2147483000!important}'
  +'#zh .zhsp{display:flex;justify-content:flex-start;align-items:center}#zh.nopen .zhm2{background:#E6C9A8;border-color:#E6C9A8}#zh.nopen .zhm2 svg{stroke:#425548}'
  +'#zh .zhdr{position:fixed;top:0;right:0;bottom:0;width:min(86vw,370px);background:#F4EFE6;z-index:71;overflow-y:auto;overflow-x:hidden;padding-bottom:26px;transform:translateX(106%);visibility:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1),visibility 0s .35s;box-shadow:-18px 0 40px -18px rgba(0,0,0,.6);border-left:3px solid #B88458}#zh.nopen .zhdr{transform:none;visibility:visible;transition:transform .35s cubic-bezier(.2,.7,.2,1)}#zh .zhdr .zhdh{display:flex}'
  +'#zh .zhdr>a{display:flex;justify-content:center;align-items:center;gap:8px;padding:16px 10px;border-bottom:1px solid #e6ded1;font:800 17px "Noto Kufi Arabic",sans-serif;color:#425548;cursor:pointer;text-decoration:none;transition:background .2s,color .2s}#zh .zhdr>a:hover{background:#efe7da;color:#B88458}#zh .zhdr>a.of{color:#b88458}#zh .zhdr>a.of em{font-style:normal;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#b88458;color:#fff;font:900 12px Arial,sans-serif}'
  +'#zh .zhdr>a.mg::after{content:"";width:7px;height:7px;border-left:2px solid #B88458;border-bottom:2px solid #B88458;rotate:-45deg;margin-top:-4px;transition:rotate .25s,margin .25s}#zh .zhdr.co>a.mg::after{rotate:135deg;margin-top:4px}'
  +'#zh .zhdr .dc{display:none;grid-template-columns:minmax(0,1fr) minmax(0,1fr);background:#fff;border-bottom:1px solid #e6ded1;padding:6px 0}#zh .zhdr.co .dc{display:grid}#zh .zhdr .dc .col{padding:12px 8px;text-align:center;min-width:0}#zh .zhdr .dc h5{margin:0 0 8px;font:800 15px "Noto Kufi Arabic",sans-serif;color:#B88458;cursor:pointer}#zh .zhdr .dc .it{padding:6px 0;cursor:pointer;font:800 13.5px/1.5 "Noto Kufi Arabic",sans-serif;color:#2e3a33;transition:color .2s}#zh .zhdr .dc .it:hover,#zh .zhdr .dc h5:hover{color:#425548;text-decoration:underline;text-decoration-color:#B88458;text-underline-offset:5px}'
  +'@media (max-width:760px){#zh .zhdr,#zh .zhm2{display:none!important}}'
  +'@media (max-width:760px){#zh .zhm{display:grid}#zh.nopen{z-index:2147483000!important}#zh .zhbk{display:block;position:fixed;inset:0;background:rgba(20,26,22,.55);opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s;z-index:70}#zh.nopen .zhbk{opacity:1;visibility:visible;transition:opacity .3s}#zh .zh2{display:block!important;position:fixed!important;top:0;right:0;bottom:0;left:auto;width:min(82vw,330px);height:auto!important;padding:0 0 26px!important;background:#F4EFE6!important;overflow-y:auto!important;overflow-x:hidden!important;z-index:71;transform:translateX(106%);visibility:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1),visibility 0s .35s;box-shadow:-18px 0 40px -18px rgba(0,0,0,.6);border-left:3px solid #B88458}#zh.nopen .zh2{transform:none;visibility:visible;transition:transform .35s cubic-bezier(.2,.7,.2,1)}#zh .zhdh{display:flex;align-items:center;justify-content:space-between;background:#425548;padding:14px 16px 10px}#zh .zhdh u{width:96px;height:40px;background:url(img/logo-ivory.svg) right center/contain no-repeat}#zh .zhx{all:unset;box-sizing:border-box;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;cursor:pointer;border:1px solid rgba(244,239,230,.4);color:#F4EFE6;font:400 24px/1 Arial,sans-serif}#zh .zhx:active{background:#E6C9A8;color:#425548}#zh .zh2 .zhsb{display:flex!important;padding:6px 14px 14px!important}#zh .zh2 nav{display:flex!important;flex-direction:column!important;gap:0!important;align-items:stretch!important;width:100%}#zh .zh2 nav a{display:flex!important;justify-content:center;align-items:center;gap:8px;padding:14px 10px!important;border-bottom:1px solid #e6ded1;font-size:16px!important}#zh .zh2 nav a:last-of-type{border-bottom:0}#zh .zh2 .zmg{position:static!important;display:none;box-shadow:none!important;border-bottom:1px solid #e6ded1!important;max-height:none!important;overflow:visible!important;animation:none!important}#zh.mopen .zh2 .zmg{display:block}#zh .zh2 .zmg .in{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important}#zh .zh2 .zmg .col{min-width:0;overflow:hidden}#zh .zh2 .zmg .it b{white-space:normal!important;overflow-wrap:anywhere;line-height:1.5!important;font-size:12.5px!important}#zh .zh2 .zmg h5{font-size:14.5px!important}#zh.nopen .zhm{background:#E6C9A8;border-color:#E6C9A8}#zh.nopen .zhm svg{stroke:#425548}#zh .zmg .col{padding:12px 6px!important}#zh .zmg .it b{font-size:13px!important}}'
  +'@media (max-width:760px){#zh .zh1{padding:8px 10px!important;gap:6px!important}#zh .zhl{width:82px!important;height:36px!important}#zh .zhr{gap:5px!important}#zh .zhb{width:34px!important;height:34px!important}#zh .zhb svg{width:16px!important;height:16px!important}#zh .zhg{height:38px!important;padding:0 3px!important;gap:0!important}#zh .zhg .zhb{width:29px!important;height:30px!important}#zh .zhcap{height:38px!important;padding:0 3px!important;flex:none}#zh .zhcap u{width:30px!important;height:30px!important}#zh .zhsr{display:none!important}#zh.nopen .zhsb{display:flex!important;padding:8px 12px!important}#zh .zhnp{left:auto!important;right:-60px!important;width:200px!important}}'
  +'@media (max-width:720px){#zh .zh1{grid-template-columns:auto 1fr;padding:10px 14px;gap:10px}#zh .zhl{justify-self:start;width:104px;height:42px}#zh .zhsp{display:none}#zh .zhcap{padding:0 5px}#zh .zhcap b{display:none}#zh .zhr{gap:8px}#zh .zh2{justify-content:flex-start;height:46px}#zh .zh2 nav{gap:24px}}';

  function norm(t){return (t||'').split(String.fromCharCode(10)).join(' ').replace(/ +/g,' ').trim()}
  function arr(x){return Array.prototype.slice.call(x)}

  function build(d,w){
    var A=arr(d.querySelectorAll('a,button')).filter(function(e){return norm(e.textContent)==='كل الهدايا'})[0];
    if(!A)return null;
    var I=arr(d.querySelectorAll('input')).filter(function(e){return (e.placeholder||'').indexOf('ابحث')>-1})[0]||null;
    var C,kids;
    if(I){C=A.parentElement;while(C&&!C.contains(I))C=C.parentElement;if(!C)return null;
      kids=arr(C.children).filter(function(k){return k.contains(A)||k.contains(I)})}
    else{var h=A.closest('header');if(!h||!h.parentElement)return null;C=h.parentElement;kids=[h]}
    if(!kids.length)return null;
    for(var i=0;i<kids.length;i++){if(kids[i].getBoundingClientRect().height>340||kids[i].querySelector('main,footer'))return null}

    function old(sel){var out=[];kids.forEach(function(k){out=out.concat(arr(k.querySelectorAll(sel)))});return out}
    function byText(t){return old('a,button').filter(function(e){return norm(e.textContent)===t})[0]}
    var icons=old('a,button').filter(function(e){
      if(!e.querySelector('svg,img'))return false;
      if(norm(e.textContent).replace(/[0-9٠-٩]/g,'')!=='')return false;
      if(I&&e.parentElement&&e.parentElement.contains(I))return false;
      return true});
    var cart=icons.filter(function(e){return /[0-9٠-٩]/.test(e.textContent)})[0]||icons[icons.length-1]||null;
    var acct=icons.filter(function(e){return e!==cart})[0]||null;

    if(!d.getElementById('zh-css')){var st=d.createElement('style');st.id='zh-css';st.textContent=CSS;d.head.appendChild(st)}
    var zh=d.createElement('div');zh.id='zh';
    var CATS={'سقيا وضيافة':1,'مصاحف وعبادة':2,'مستلزمات الحاج':3,'أطقم وهدايا':4};
    var items=['الرئيسية','الأقسام','كل الهدايا','العروض','من نحن'].filter(function(t){return t==='الأقسام'||t==='العروض'||!!byText(t)});
    zh.innerHTML='<div class="zh1"><div class="zhr"><button class="zhcap zhu" aria-label="حسابي"><u></u><b>حسابي</b></button>'
      +'<span class="zhg"><button class="zhb zhc" aria-label="السلة">'+B+'<i>0</i></button><button class="zhb zhw" aria-label="المفضلة">'+H+'</button><button class="zhb zhn" aria-label="الإشعارات"><svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.500 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg><em></em><span class="zhnp"><b>الإشعارات</b><small>ما عندك إشعارات جديدة</small></span></button></span><label class="zhs zhi">'+S+'<input type="search" placeholder="ابحث عن هدية" aria-label="بحث"></label><button class="zhb zhsr" aria-label="بحث">'+S+'</button><button class="zhb zhm" aria-label="القائمة"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div>'
      +'<a class="zhl" role="img" aria-label="زاد الضيف"></a><div class="zhsp"></div></div>'
      +'<div class="zhsb"><label class="zhs">'+S+'<input type="search" placeholder="ابحث عن هدية" aria-label="بحث"></label></div>'
      +'<div class="zh2"><nav>'+items.map(function(t){return '<a data-t="'+t+'"'+(t==='الأقسام'?' class="mg"':t==='العروض'?' class="of"':'')+'>'+t+(t==='العروض'?'<em>%</em>':'')+'</a>'}).join('')+'</nav></div><div class="zhe"></div><div class="zmg"><div class="in"></div></div>';
    kids.forEach(function(k){k.style.setProperty('display','none','important')});
    C.insertBefore(zh,kids[0]);

    arr(zh.querySelectorAll('.zh2 a')).forEach(function(a){a.onclick=function(){var t=a.getAttribute('data-t'),g=CATS[t];
      if(t==='الأقسام'){mega();zh.classList.toggle('mopen');return}zh.classList.remove('mopen');zh.classList.remove('nopen');
      w.__zOffers=(t==='العروض')?1:0;w.__zCat=0;
      if(t==='العروض'){zh.__cat=0;var s0=byText('كل الهدايا');if(s0)s0.click();try{w.scrollTo(0,0)}catch(e){}return}
      if(!g){zh.__cat=0;var o=byText(t);if(o)o.click();return}
      goCat(g)}});
    function goCat(g){{
      zh.__cat=0;w.__zCat=g;w.__zOffers=0;var o=byText('كل الهدايا');if(o)o.click();else w.location.hash='shop';try{w.scrollTo(0,0)}catch(e){}}}
    function mega(){var box=zh.querySelector('.zmg .in');if(box.__done||!window.__zSWP)return;box.__done=1;
      var pv=d.createElement('div');pv.className='pv';pv.innerHTML='<div><u></u><b></b><small></small></div>';var cur=null;
      function show(p,it){if(cur===p)return;cur=p;arr(box.querySelectorAll('.it')).forEach(function(o){o.classList.toggle('on',o===it)});pv.classList.add('sw');w.setTimeout(function(){pv.querySelector('u').style.backgroundImage='url(img/cut/'+p[3]+'.png)';pv.querySelector('b').textContent=p[0];pv.querySelector('small').textContent=p[1];pv.classList.remove('sw')},150)}
      var first=null;
      Object.keys(CATS).forEach(function(nm){var g=CATS[nm],col=d.createElement('div');col.className='col';var h5=d.createElement('h5');h5.textContent=nm;h5.onclick=function(){zh.classList.remove('mopen');goCat(g)};col.appendChild(h5);
        window.__zSWP.filter(function(p){return p[4]===g}).forEach(function(p){var it=d.createElement('div');it.className='it';it.innerHTML='<b></b>';it.querySelector('b').textContent=p[0];
          it.onmouseenter=function(){show(p,it)};it.onclick=function(){zh.classList.remove('mopen');window.__zOpen(p[0])};col.appendChild(it);if(!first)first=[p,it]});
        box.appendChild(col)});
      box.appendChild(pv);pv.onclick=function(){if(cur){zh.classList.remove('mopen');window.__zOpen(cur[0])}};if(first)show(first[0],first[1])}
    function shut(){zh.classList.remove('mopen')}
    d.addEventListener('click',function(e){var t=e.target;if(!t.closest||!(t.closest('#zh .zmg')||t.closest('#zh .zh2 a.mg')))shut()},true);
    var sy=0;w.addEventListener('scroll',function(){if(!zh.classList.contains('mopen')){sy=w.pageYOffset;return}if(Math.abs(w.pageYOffset-sy)>30)shut()},{passive:true});
    zh.querySelector('.zh2 a.mg')&&zh.querySelector('.zh2 a.mg').addEventListener('click',function(){sy=w.pageYOffset});
    w.addEventListener('hashchange',shut);w.addEventListener('blur',shut);
    d.addEventListener('keydown',function(e){if(e.key==='Escape')shut()});
    try{document.addEventListener('click',shut)}catch(e){}
    zh.querySelector('.zhl').onclick=function(){var h=w.location.hash;var o=byText('الرئيسية');if(o)o.click();else w.location.hash='home';setTimeout(function(){if(w.location.hash===h&&w.__zLoad)w.__zLoad()},30)};
    var hm=zh.querySelector('.zhm');if(hm)hm.onclick=function(e){e.stopPropagation();zh.classList.toggle('nopen');if(!zh.classList.contains('nopen'))zh.classList.remove('mopen')};
    (function(){var zh2=zh.querySelector('.zh2'),nav=zh2.querySelector('nav'),sb=zh.querySelector('.zhsb'),mg=zh.querySelector('.zmg'),mga=zh.querySelector('.zh2 a.mg');if(!nav||!sb||!mg||!mga)return;
      var bk=d.createElement('div');bk.className='zhbk';zh.appendChild(bk);var dh=d.createElement('div');dh.className='zhdh';dh.innerHTML='<u></u><button class="zhx" aria-label="إغلاق">&times;</button>';zh2.insertBefore(dh,nav);
      function cls(){zh.classList.remove('nopen');zh.classList.remove('mopen')}bk.onclick=cls;dh.querySelector('.zhx').onclick=function(e){e.stopPropagation();cls()};
      mg.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.it,h5,.pv'))zh.classList.remove('nopen')});
      function place(){var m=w.innerWidth<=760;if(m===zh.__m)return;zh.__m=m;if(m){zh2.insertBefore(sb,nav);mga.parentNode.insertBefore(mg,mga.nextSibling)}else{zh.insertBefore(sb,zh2);zh.appendChild(mg);cls()}}
      var sp=zh.querySelector('.zhsp'),b2=d.createElement('button');b2.className='zhb zhm2';b2.setAttribute('aria-label','القائمة');b2.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';if(sp)sp.appendChild(b2);
      var dr=d.createElement('div');dr.className='zhdr';dr.innerHTML='<div class="zhdh"><u></u><button class="zhx" aria-label="إغلاق">&times;</button></div>';
      arr(nav.querySelectorAll('a')).forEach(function(a){var t=a.getAttribute('data-t'),x=d.createElement('a');x.className=a.className;x.innerHTML=a.innerHTML;dr.appendChild(x);
        if(t==='الأقسام'){var dc=d.createElement('div');dc.className='dc';dr.appendChild(dc);x.onclick=function(e){e.stopPropagation();if(!dc.__done&&window.__zSWP){dc.__done=1;Object.keys(CATS).forEach(function(nm){var g=CATS[nm],col=d.createElement('div');col.className='col';var h5=d.createElement('h5');h5.textContent=nm;h5.onclick=function(){cls();goCat(g)};col.appendChild(h5);window.__zSWP.filter(function(p){return p[4]===g}).forEach(function(p){var it=d.createElement('div');it.className='it';it.textContent=p[0];it.onclick=function(){cls();window.__zOpen(p[0])};col.appendChild(it)});dc.appendChild(col)})}dr.classList.toggle('co')}}
        else x.onclick=function(){cls();a.click()}});
      zh.appendChild(dr);dr.querySelector('.zhx').onclick=function(e){e.stopPropagation();cls()};b2.onclick=function(e){e.stopPropagation();zh.classList.toggle('nopen')};
      place();w.addEventListener('resize',place)})();
    var nb=zh.querySelector('.zhn');if(nb){nb.onclick=function(e){e.stopPropagation();nb.classList.toggle('on');nb.classList.add('seen')};d.addEventListener('click',function(e){if(!nb.contains(e.target))nb.classList.remove('on')});w.addEventListener('scroll',function(){nb.classList.remove('on')},{passive:true})}
    var u=zh.querySelector('.zhu'),c=zh.querySelector('.zhc');
    (function(){var ac=null,F='"Noto Kufi Arabic",sans-serif';
      function sv(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>'}
      var IC={bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.500 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',box:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',pend:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',heart:'<path d="M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10z"/>',wal:'<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12.500h2M3 10h18"/>',user:'<circle cx="12" cy="8.500" r="4"/><path d="M4.500 20a7.500 7.500 0 0 1 15 0"/>',out:'<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 8l-4 4 4 4M6 12h10"/>',mega:'<path d="M4 10v4h3l8 4V6l-8 4zM18 9.500a4 4 0 0 1 0 5"/>',del:'<circle cx="10" cy="8.500" r="3.500"/><path d="M3.500 19.500a6.500 6.500 0 0 1 11.500-4M16.500 15.500l4 4M20.500 15.500l-4 4"/>'};
      var TB=[['bell','الإشعارات','ما عندك إشعارات جديدة','أول ما يصير شي على طلبك نبلغك هنا'],['box','الطلبات','ما عندك طلبات للحين','اختر هديتك ونجهزها ونوصلها لضيوف الرحمن'],['pend','طلبات بانتظار الدفع','ما عندك طلبات بانتظار الدفع','كل طلباتك مدفوعة'],['heart','قائمة الأمنيات','قائمة أمنياتك فاضية','اضغط القلب على أي هدية وتلقاها هنا'],['wal','محفظتي','رصيد محفظتك 0 ر.س','أي مبلغ مسترجع ينزل في محفظتك'],['user','حسابي']];
      var C='#zac{position:fixed;left:0;right:0;bottom:0;z-index:55;display:none;overflow:auto;overscroll-behavior:contain;background:rgba(46,58,51,.36);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);direction:rtl;font:700 15px/1.7 '+F+';color:#2e3a33;padding:28px 18px 90px}#zac.on{display:block;animation:zacI .3s ease-out}@keyframes zacI{from{opacity:0;translate:0 10px}to{opacity:1;translate:0 0}}#zac *{box-sizing:border-box}'
        +'#zac svg{width:20px!important;height:20px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}'
        +'#zac .sp{display:grid;grid-template-columns:340px 1fr;max-width:1120px;margin:0 auto;border-radius:28px;overflow:hidden;border:1px solid #e6ded1;box-shadow:0 30px 60px -40px rgba(0,0,0,.5)}'
        +'#zac .sp{position:relative}#zac .cx{all:unset;box-sizing:border-box;position:absolute;top:14px;left:14px;z-index:4;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;cursor:pointer;background:#f4efe6;border:1.5px solid #e6ded1;color:#2e3a33;font:400 26px/1 Arial,sans-serif;transition:background .2s,color .2s,rotate .25s}#zac .cx:hover{background:#c0392b;border-color:#c0392b;color:#fff;rotate:90deg}#zac .h3{padding-inline-end:46px}#zac .pn{background:#2e3a33;color:#f4efe6;padding:30px 22px;text-align:center}#zac .lgo{display:block;width:120px;height:44px;margin:0 auto 18px;background:url(img/logo-ivory.svg) center/contain no-repeat}'
        +'#zac .arch{width:150px;height:186px;border-radius:999px 999px 16px 16px;border:3px solid #b88458;margin:0 auto 12px;display:grid;place-items:center;background:rgba(244,239,230,.06);color:#e6c9a8;outline:1.5px dotted rgba(230,201,168,.45);outline-offset:8px}#zac .arch svg{width:64px!important;height:64px!important}'
        +'#zac .arch{position:relative}#zac .arch .ph0{display:none;position:absolute;inset:0;width:100%!important;height:100%!important;max-width:none!important;object-fit:cover;border-radius:999px 999px 13px 13px}#zac .arch.has .ph0{display:block}#zac .cam{position:absolute;bottom:-12px;left:-12px;width:42px;height:42px;border-radius:50%;background:#b88458;color:#fff;border:3px solid #2e3a33;display:grid;place-items:center;cursor:pointer;box-shadow:0 8px 16px -6px rgba(0,0,0,.6);transition:background .2s,color .2s,scale .2s}#zac .cam:hover{background:#f4efe6;color:#425548;scale:1.08}#zac .cam svg{width:19px!important;height:19px!important}#zac .cmn{display:none;position:absolute;z-index:6;top:calc(100% + 18px);left:50%;translate:-50% 0;width:210px;background:#fbf8f3;border-radius:16px;padding:6px;box-shadow:0 20px 40px -14px rgba(0,0,0,.7);border-top:3px solid #b88458}#zac .arch.pk .cmn{display:grid;gap:2px;animation:zacI .2s ease-out}#zac .cmn label{display:flex;align-items:center;gap:10px;cursor:pointer;padding:11px 12px;border-radius:12px;font:800 14px '+F+';color:#2e3a33;transition:background .2s,color .2s}#zac .cmn label:hover{background:#f4efe6;color:#b88458}#zac .cmn label+label{border-top:1px solid #e6ded1;border-radius:0 0 12px 12px}#zac .cmn svg{width:20px!important;height:20px!important;color:#b88458}#zac .cmn input{display:none!important}#zac .pn h3{margin:14px 0 0;font:900 21px '+F+';color:#f4efe6}#zac .pn small{color:#e6c9a8;font:700 13px '+F+'}'
        +'#zac .ic{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px}#zac .ic a{cursor:pointer;border:1px solid rgba(244,239,230,.2);border-radius:16px;padding:12px 4px;font:800 12px/1.5 '+F+';color:#f4efe6;display:grid;justify-items:center;align-content:center;gap:6px;transition:background .2s,border-color .2s,translate .2s}#zac .ic a:hover{background:rgba(184,132,88,.45);translate:0 -2px}#zac .ic a.on{background:#b88458;border-color:#b88458}'
        +'#zac .out{display:inline-flex;gap:8px;align-items:center;margin-top:18px;color:#f0a79e;font:800 14px '+F+';cursor:pointer}#zac .out:hover{color:#fff}'
        +'#zac .bd{background:#fff;padding:30px;min-height:520px}#zac .pg{display:none}#zac .pg.on{display:block;animation:zacI .3s ease-out}'
        +'#zac .h3{font:900 20px '+F+';color:#425548;margin:0 0 14px;display:flex;align-items:center;gap:10px}#zac .h3::after{content:"";flex:1;height:1px;background:#e6ded1}'
        +'#zac .fm{display:grid;grid-template-columns:1fr 1fr;gap:16px 18px}#zac .fd label{display:block;font:800 14px '+F+';margin-bottom:6px;color:#425548}'
        +'#zac .fd input,#zac .fd select{width:100%;height:48px;border:0;border-bottom:2px solid #e6ded1;border-radius:0;background:transparent;padding:0 2px;font:700 14.5px '+F+';color:#2e3a33;outline:0;box-shadow:none;transition:border-color .2s}#zac .fd input:focus,#zac .fd select:focus{border-color:#b88458}'
        +'#zac .ph{display:flex;direction:ltr}#zac .ph span{height:48px;display:grid;place-items:center;padding:0 10px 0 2px;border-bottom:2px solid #e6ded1;font:800 14.5px '+F+';color:#425548}#zac .ph input{text-align:left}#zac .ph,#zac .ph *{background:transparent!important;box-shadow:none!important}#zac .fd input,#zac .fd select{background:transparent!important}'
        +'#zac .sv{all:unset;box-sizing:border-box;grid-column:1/-1;text-align:center;cursor:pointer;height:52px;border-radius:999px;background:#b88458;color:#fff;font:900 16px '+F+';box-shadow:0 12px 22px -12px rgba(0,0,0,.6),inset 0 -3px 0 rgba(0,0,0,.14);transition:background .2s,translate .2s}#zac .sv:hover{background:#425548;translate:0 -2px}#zac .sv.ok{background:#425548}'
        +'#zac .stk{display:grid;gap:14px;margin-top:22px}#zac .sc{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #e6ded1;border-radius:16px;padding:16px}#zac .sc i{width:46px;height:46px;border-radius:50%;background:#425548;color:#f4efe6;display:grid;place-items:center;flex:none}#zac .sc.dl i{background:#c0392b}#zac .sc div{flex:1}#zac .sc b{display:block;font:900 16px '+F+'}#zac .sc small{display:block;color:#6b756e;font:700 12.5px/1.6 '+F+'}'
        +'#zac .tg{width:50px;height:28px;border-radius:99px;background:#425548;position:relative;cursor:pointer;flex:none;transition:background .2s}#zac .tg::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;transition:left .2s}#zac .tg.off{background:#c9c2b4}#zac .tg.off::after{left:25px}'
        +'#zac .dbt{all:unset;cursor:pointer;font:800 13.5px '+F+';color:#c0392b;border:1.5px solid #c0392b;border-radius:999px;padding:7px 16px;white-space:nowrap;transition:background .2s,color .2s}#zac .dbt:hover{background:#c0392b;color:#fff}'
        +'#zac .em{display:grid;justify-items:center;text-align:center;gap:6px;padding:46px 10px}#zac .em i{width:96px;height:112px;border-radius:999px 999px 14px 14px;border:3px solid #b88458;background:#f4efe6;color:#425548;display:grid;place-items:center;margin-bottom:10px}#zac .em i svg{width:40px!important;height:40px!important}#zac .em b{font:900 19px '+F+';color:#425548}#zac .em small{font:700 14px '+F+';color:#6b756e}#zac .em a{margin-top:12px;cursor:pointer;background:#b88458;color:#fff;border-radius:999px;padding:11px 26px;font:800 14.5px '+F+';transition:background .2s}#zac .em a:hover{background:#425548}'
        +'@media (max-width:820px){#zac{padding:14px 10px 90px}#zac .sp{grid-template-columns:1fr;border-radius:22px}#zac .fm{grid-template-columns:1fr}#zac .bd{padding:20px 16px;min-height:0}#zac .pn{padding:22px 16px}#zac .arch{width:112px;height:138px}#zac .arch svg{width:48px!important;height:48px!important}#zac .sc{flex-wrap:wrap}}';
      function shutA(){if(ac)ac.classList.remove('on')}
      var tq=null,tt=0;function toast(m){if(!tq){var ts=d.createElement('style');ts.textContent='#ztq{position:fixed;top:18px;left:50%;z-index:2147483640;translate:-50% -160%;opacity:0;display:flex;align-items:center;gap:10px;direction:rtl;background:#425548;color:#f4efe6;border-radius:999px;padding:10px 22px 10px 12px;font:800 15px '+F+';box-shadow:0 18px 36px -14px rgba(0,0,0,.6);border:2px solid #b88458;white-space:nowrap;transition:translate .45s cubic-bezier(.2,.8,.2,1),opacity .3s;pointer-events:none}#ztq.on{translate:-50% 0;opacity:1}#ztq i{width:30px;height:30px;border-radius:50%;background:#b88458;display:grid;place-items:center;flex:none}#ztq svg{width:17px!important;height:17px!important;fill:none!important;stroke:#fff!important;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}';d.head.appendChild(ts);tq=d.createElement('div');tq.id='ztq';tq.innerHTML='<i>'+sv('<path d="M5 12.500l4.500 4.500L19 7.500"/>')+'</i><span></span>';d.body.appendChild(tq)}
        tq.querySelector('span').textContent=m;w.clearTimeout(tt);w.setTimeout(function(){tq.classList.add('on')},30);tt=w.setTimeout(function(){tq.classList.remove('on')},2800)}
      function show(i){arr(ac.querySelectorAll('.ic a')).forEach(function(a,k){a.classList.toggle('on',k===i)});arr(ac.querySelectorAll('.pg')).forEach(function(p,k){p.classList.toggle('on',k===i)});try{ac.querySelector('.bd').scrollIntoView({block:'nearest'})}catch(x){}}
      function build(){var st=d.createElement('style');st.textContent=C;d.head.appendChild(st);ac=d.createElement('div');ac.id='zac';
        var pgs=TB.map(function(t,i){if(t[0]==='user')return '<div class="pg"><h3 class="h3">حسابي</h3><form class="fm"><div class="fd"><label>الاسم الأول</label><input placeholder="الاسم الأول"></div><div class="fd"><label>الاسم الأخير</label><input placeholder="الاسم الأخير"></div><div class="fd"><label>تاريخ الميلاد</label><input placeholder="حدد تاريخ ميلادك"></div><div class="fd"><label>الجنس</label><select><option>حدد الجنس</option><option>ذكر</option><option>أنثى</option></select></div><div class="fd"><label>البريد الإلكتروني</label><input type="email" placeholder="name@example.com" style="direction:ltr;text-align:right"></div><div class="fd"><label>رقم الجوال</label><div class="ph"><span>+966</span><input inputmode="numeric" placeholder="5XXXXXXXX"></div></div><button class="sv" type="submit">حفظ</button></form><div class="stk"><div class="sc"><i>'+sv(IC.mega)+'</i><div><b>الرسائل الترويجية</b><small>اختر اذا كنت ترغب في استلام عروض وجديد زاد الضيف</small></div><span class="tg"></span></div><div class="sc dl"><i>'+sv(IC.del)+'</i><div><b>حذف الحساب</b><small>سيحذف حسابك وبياناتك من المتجر نهائيا بما في ذلك سجل طلباتك</small></div><button class="dbt" type="button">حذف الحساب</button></div></div></div>';
          return '<div class="pg"><h3 class="h3">'+t[1]+'</h3><div class="em"><i>'+sv(IC[t[0]])+'</i><b>'+t[2]+'</b><small>'+t[3]+'</small>'+(i===1||i===3?'<a class="go">تصفح الهدايا</a>':'')+'</div></div>'}).join('');
        ac.innerHTML='<div class="sp"><button class="cx" type="button" aria-label="إغلاق">&times;</button><div class="pn"><span class="lgo"></span><div class="arch">'+sv(IC.user)+'<img class="ph0" alt=""><a class="cam" title="أضف صورتك">'+sv('<path d="M4 8h3l2-2.500h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.200"/>')+'</a><div class="cmn"><label>'+sv('<path d="M4 8h3l2-2.500h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.200"/>')+'صور بالكاميرا<input type="file" accept="image/*" capture="user"></label><label>'+sv('<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="8.500" cy="10" r="1.500"/><path d="M4 17l5-4.500 3.500 3 3-2.500 4.500 4"/>')+'اختر من الألبوم<input type="file" accept="image/*"></label></div></div><h3>اسم العميل</h3><small>عميل زاد الضيف</small><div class="ic">'+TB.map(function(t){return '<a>'+sv(IC[t[0]])+t[1]+'</a>'}).join('')+'</div><a class="out">'+sv(IC.out)+'تسجيل الخروج</a></div><div class="bd">'+pgs+'</div></div>';
        (zh.parentNode||d.body).appendChild(ac);
        arr(ac.querySelectorAll('.ic a')).forEach(function(a,i){a.onclick=function(){show(i)}});
        var ar0=ac.querySelector('.arch');ac.querySelector('.cam').onclick=function(e){e.stopPropagation();ar0.classList.toggle('pk')};ac.addEventListener('click',function(e){if(!e.target.closest('.cmn,.cam'))ar0.classList.remove('pk')});
        arr(ac.querySelectorAll('.cmn input')).forEach(function(fi){fi.onchange=function(){ar0.classList.remove('pk');var fl=this.files&&this.files[0];if(!fl||!/^image\//.test(fl.type))return;var rd=new w.FileReader();rd.onload=function(){ac.__setPh(rd.result)};rd.readAsDataURL(fl);this.value=''}});
        ac.querySelector('.cx').onclick=shutA;ac.addEventListener('mousedown',function(e){if(e.target===ac)shutA()});d.addEventListener('keydown',function(e){if(e.key==='Escape')shutA()});
        ac.querySelector('.out').onclick=shutA;ac.querySelector('.tg').onclick=function(){this.classList.toggle('off')};
        arr(ac.querySelectorAll('.go')).forEach(function(g){g.onclick=function(){shutA();var o=zh.querySelector('.zh2 a[data-t="كل الهدايا"]');if(o)o.click()}});
        var fm=ac.querySelector('.fm'),sb=fm.querySelector('.sv'),nm=ac.querySelector('.pn h3'),FI=arr(fm.querySelectorAll('input,select'));sb.setAttribute('type','button');
        function setNm(v){if(!v)return;nm.textContent=v;var dn=zh.querySelector('.zhud .uc b');if(dn)dn.textContent=v}
        function setPh(src){if(!src)return;var ar=ac.querySelector('.arch');ar.querySelector('.ph0').src=src;ar.classList.add('has');var ui=zh.querySelector('.zhud .uc i');if(ui){ui.style.background='center/cover no-repeat url('+JSON.stringify(src)+')';var s0=ui.querySelector('svg');if(s0)s0.style.display='none'}}
        ac.__setPh=function(src){setPh(src);try{w.localStorage.setItem('zacPh',src)}catch(x){}};
        function save(){var v=norm(FI[0].value+' '+FI[1].value);setNm(v);try{w.localStorage.setItem('zacFm',JSON.stringify(FI.map(function(x){return x.value})))}catch(x){}shutA();toast('تم حفظ بياناتك')}
        sb.onclick=function(e){e.preventDefault();save()};fm.onsubmit=function(e){e.preventDefault();save()};
        try{var sd=JSON.parse(w.localStorage.getItem('zacFm')||'null');if(sd){FI.forEach(function(x,k){if(sd[k]!=null)x.value=sd[k]});setNm(norm(FI[0].value+' '+FI[1].value))}setPh(w.localStorage.getItem('zacPh'))}catch(x){}
        d.addEventListener('click',function(e){var t=e.target;if(!ac.classList.contains('on')||!t.closest)return;if((t.closest('#zh')&&!t.closest('.zhud,.zhu,.zhm,.zhm2,.zhn,.zhsr,.zhi,.zhs,.zhx,.zhbk,a.mg'))||t.closest('#zsr .r,#zsr .ch a'))shutA()},true);
        w.addEventListener('hashchange',shutA)}
      function openA(){if(!ac)build();zh.classList.remove('nopen');zh.classList.remove('mopen');ac.style.top=zh.getBoundingClientRect().bottom+'px';ac.scrollTop=0;show(5);ac.classList.add('on')}
      w.addEventListener('resize',function(){if(ac&&ac.classList.contains('on'))ac.style.top=zh.getBoundingClientRect().bottom+'px'});
      var ud=d.createElement('div');ud.className='zhud';
      var us=d.createElement('style');us.textContent='#zh .zhud{position:absolute;z-index:80;width:330px;max-width:calc(100vw - 20px);display:none;direction:rtl;background:#fbf8f3;border:1px solid #e6ded1;border-radius:20px;padding:10px;box-shadow:0 26px 50px -18px rgba(0,0,0,.55);font-family:'+F+'}#zh .zhud.on{display:grid;gap:10px;animation:zudI .22s ease-out}@keyframes zudI{from{opacity:0;translate:0 -8px}to{opacity:1;translate:0 0}}'
        +'#zh .zhud svg{width:19px!important;height:19px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8;flex:none}'
        +'#zh .zhud .uc{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e6ded1;border-radius:16px;padding:12px;cursor:pointer;transition:border-color .2s,background .2s}#zh .zhud .uc:hover{border-color:#b88458;background:#f4efe6}#zh .zhud .uc i{width:52px;height:52px;border-radius:50%;background:#425548;color:#e6c9a8;display:grid;place-items:center;flex:none;border:2px solid #b88458}#zh .zhud .uc svg{width:26px!important;height:26px!important}#zh .zhud .uc em{margin-inline-start:auto;width:34px;height:34px;border-radius:50%;background:#f4efe6;border:1.5px solid #b88458;color:#b88458;display:grid;place-items:center;flex:none;transition:background .2s,color .2s,translate .2s}#zh .zhud .uc em svg{width:16px!important;height:16px!important;stroke-width:2.4}#zh .zhud .uc:hover em{background:#b88458;color:#fff;translate:-3px 0}#zh .zhud .uc b{display:block;font:900 17px/1.4 '+F+';color:#2e3a33}#zh .zhud .uc small{display:block;font:700 13px '+F+';color:#b88458}'
        +'#zh .zhud .rw{display:flex;align-items:center;gap:8px;min-width:0;background:#f4efe6;border:1px solid #e6ded1;border-radius:16px;padding:8px 12px;color:#425548}#zh .zhud .rw>b{font:800 14.5px '+F+';color:#2e3a33;padding-inline-start:10px;border-inline-start:1px solid #d9cfbf;white-space:nowrap}'
        +'#zh .zhud .sg{margin-inline-start:auto;display:inline-flex;background:#fff;border:1px solid #e6ded1;border-radius:999px;padding:3px}#zh .zhud .sg a{display:inline-flex;align-items:center;gap:5px;cursor:pointer;font:800 12.5px '+F+';color:#6b756e;border-radius:999px;padding:6px 10px;white-space:nowrap;transition:background .2s,color .2s}#zh .zhud .sg a.on{background:#425548;color:#f4efe6}#zh .zhud .sg svg{width:15px!important;height:15px!important}'
        +'#zh .zhud .lo{display:flex;align-items:center;gap:8px;cursor:pointer;font:800 15px '+F+';color:#c0392b;padding:6px 10px 4px}#zh .zhud .lo:hover{color:#8f2a20}';d.head.appendChild(us);
      ud.innerHTML='<a class="uc"><i>'+sv(IC.user)+'</i><span><b>اسم العميل</b><small>عميل زاد الضيف</small></span><em>'+sv('<path d="M14.500 6l-6 6 6 6"/>')+'</em></a>'
        +'<div class="rw">'+sv('<path d="M12 3a9 9 0 1 0 0 18c1.400 0 2-.900 2-1.800 0-1.200-1-1.700-1-2.700 0-.900.700-1.500 1.600-1.500H17a4 4 0 0 0 4-4c0-4.400-4-8-9-8z"/><circle cx="7.500" cy="11" r="1"/><circle cx="10" cy="7.500" r="1"/><circle cx="14.500" cy="7.500" r="1"/>')+'<b>لون الثيم</b><span class="sg"><a class="on">'+sv('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.400 1.400M17.600 17.600L19 19M5 19l1.400-1.400M17.600 6.400L19 5"/>')+'فاتح</a><a>'+sv('<path d="M20 14.500A8 8 0 0 1 9.500 4a8 8 0 1 0 10.500 10.500z"/>')+'داكن</a></span></div>'
        +'<div class="rw">'+sv('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.200 3 14.800 0 18M12 3c-3 3.200-3 14.800 0 18"/>')+'<b>اللغة</b><span class="sg"><a class="on">عربي</a><a>English</a></span></div>'
        +'<a class="lo">'+sv(IC.out)+'تسجيل الخروج</a>';zh.appendChild(ud);
      function shutU(){ud.classList.remove('on')}
      arr(ud.querySelectorAll('.sg')).forEach(function(g,gi){arr(g.children).forEach(function(b,bi){b.onclick=function(e){e.stopPropagation();arr(g.children).forEach(function(o){o.classList.toggle('on',o===b)});try{if(gi===0){if(w.__zSetTheme)w.__zSetTheme(bi===1?'dark':'light')}else if(w.__zSetLang)w.__zSetLang(bi===1?'en':'ar')}catch(x){}}})});
      function syncU(){var rc=d.documentElement.classList,st=[rc.contains('zdark')?1:0,rc.contains('zen')?1:0];arr(ud.querySelectorAll('.sg')).forEach(function(g,gi){arr(g.children).forEach(function(o,bi){o.classList.toggle('on',bi===st[gi])})})}
      ud.querySelector('.uc').onclick=function(e){e.stopPropagation();shutU();openA()};ud.querySelector('.lo').onclick=function(e){e.stopPropagation();shutU();shutA()};ud.onclick=function(e){e.stopPropagation()};
      d.addEventListener('click',function(e){if(!ud.contains(e.target)&&!(u&&u.contains(e.target)))shutU()});w.addEventListener('scroll',shutU,{passive:true});
      if(u)u.onclick=function(e){e.stopPropagation();zh.classList.remove('nopen');zh.classList.remove('mopen');if(ud.classList.contains('on')){shutU();return}var r=u.getBoundingClientRect(),z=zh.getBoundingClientRect();ud.style.top=(r.bottom-z.top+10)+'px';ud.style.left=Math.max(10,r.left-z.left)+'px';syncU();ud.classList.add('on')};
    })();
    if(c)c.onclick=function(){if(cart)cart.click()};
    zh.querySelector('.zhsr').onclick=function(){zh.classList.toggle('sopen');if(zh.classList.contains('sopen')){var q=zh.querySelector('.zhs input');try{q.focus()}catch(x){}}};
    var inp=zh.querySelector('.zhs input');
    var inp2=zh.querySelector('.zhi input');
    (function(){var ov=null,qi,bd;
      var F='"Noto Kufi Arabic",sans-serif';
      var C='#zsr{position:fixed;inset:0;z-index:2147483600;display:none;direction:rtl;background:rgba(46,58,51,.36);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);padding:clamp(56px,12vh,130px) 14px 20px;font-family:'+F+'}#zsr.on{display:block;animation:zsrI .25s ease-out}@keyframes zsrI{from{opacity:0}to{opacity:1}}'
        +'#zsr .bx{max-width:860px;margin:0 auto;background:#fbf8f3;border-radius:18px;box-shadow:0 30px 70px -20px rgba(0,0,0,.6);border-top:4px solid #b88458;overflow:hidden;animation:zsrB .3s cubic-bezier(.2,.7,.2,1)}@keyframes zsrB{from{translate:0 -18px;opacity:0}to{translate:0 0;opacity:1}}'
        +'#zsr .q{display:flex;align-items:center;gap:10px;margin:14px;padding:0 16px;height:52px;border-radius:12px;background:#f4efe6;border:1.5px solid #e6ded1;transition:border-color .2s}#zsr .q:focus-within{border-color:#b88458}'
        +'#zsr .q input{all:unset;flex:1;min-width:0;font:800 16px '+F+';color:#2e3a33;text-align:right}#zsr .q input::placeholder{color:#8a938c}#zsr .q input::-webkit-search-cancel-button{display:none;-webkit-appearance:none}'
        +'#zsr .q svg{width:20px!important;height:20px!important;fill:none!important;stroke:#b88458!important;stroke-width:2;stroke-linecap:round;flex:none}'
        +'#zsr .x{all:unset;cursor:pointer;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#6b756e;font:400 24px/1 Arial,sans-serif;flex:none}#zsr .x:hover{background:#e6ded1;color:#2e3a33}'
        +'#zsr .bd{border-top:1px solid #e6ded1;padding:14px 20px 18px;max-height:58vh;overflow:auto}'
        +'#zsr h6{margin:6px 0 10px;font:800 14px '+F+';color:#b88458}'
        +'#zsr .ch{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}#zsr .ch a{cursor:pointer;font:800 13.5px '+F+';color:#425548;background:#f4efe6;border:1px solid #e6ded1;border-radius:999px;padding:7px 16px;transition:background .2s,color .2s}#zsr .ch a:hover{background:#425548;color:#f4efe6}'
        +'#zsr .r{display:flex;align-items:center;gap:12px;padding:8px;border-radius:10px;cursor:pointer;font:800 14.5px '+F+';color:#2e3a33;transition:background .2s,color .2s}#zsr .r:hover{background:#f4efe6;color:#b88458}#zsr .r img{width:40px!important;height:40px!important;object-fit:contain;flex:none}#zsr .r small{margin-inline-start:auto;font:800 13px '+F+';color:#b88458;white-space:nowrap}'
        +'#zsr .no{padding:18px;text-align:center;font:800 14px '+F+';color:#6b756e}@media (max-width:760px){#zsr .bd{padding:12px 12px 14px}#zsr .r{font-size:13.5px}}';
      function nz(t){return (t||'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').toLowerCase().trim()}
      function shutS(){if(ov)ov.classList.remove('on')}
      function draw(){var P=window.__zSWP||[],q=nz(qi.value),L=q?P.filter(function(p){return nz(p[0]).indexOf(q)>-1||nz(p[1]).indexOf(q)>-1}):P.slice(0,5);bd.innerHTML='';
        var h1=d.createElement('h6');h1.textContent='التصنيفات الأكثر بحثا';bd.appendChild(h1);var ch=d.createElement('div');ch.className='ch';
        Object.keys(CATS).forEach(function(nm){var c=d.createElement('a');c.textContent=nm;c.onclick=function(){shutS();goCat(CATS[nm])};ch.appendChild(c)});bd.appendChild(ch);
        var h2=d.createElement('h6');h2.textContent=q?'نتائج البحث':'الأكثر بحثا';bd.appendChild(h2);
        if(!L.length){var n=d.createElement('div');n.className='no';n.textContent='ما لقينا هدية بهذا الاسم جرب كلمة ثانية';bd.appendChild(n);return}
        L.forEach(function(p){var r=d.createElement('div');r.className='r';r.innerHTML='<img alt=""><span></span><small></small>';r.querySelector('img').src='img/cut/'+p[3]+'.png';r.querySelector('span').textContent=p[0];r.querySelector('small').textContent=p[2]+' ر.س';r.onclick=function(){shutS();window.__zOpen(p[0])};bd.appendChild(r)});bd.__first=L[0]}
      function openS(v){if(!ov){var st=d.createElement('style');st.textContent=C;d.head.appendChild(st);ov=d.createElement('div');ov.id='zsr';
          ov.innerHTML='<div class="bx"><label class="q">'+S+'<input type="search" placeholder="ابحث عن هدية" aria-label="بحث"><button class="x" aria-label="إغلاق">&times;</button></label><div class="bd"></div></div>';d.body.appendChild(ov);
          qi=ov.querySelector('input');bd=ov.querySelector('.bd');qi.oninput=draw;qi.onkeydown=function(e){if(e.key==='Enter'&&bd.__first&&nz(qi.value)){shutS();window.__zOpen(bd.__first[0])}};
          ov.querySelector('.x').onclick=function(e){e.preventDefault();shutS()};ov.addEventListener('mousedown',function(e){if(e.target===ov)shutS()});d.addEventListener('keydown',function(e){if(e.key==='Escape')shutS()})}
        zh.classList.remove('nopen');zh.classList.remove('mopen');zh.classList.remove('sopen');qi.value=v||'';bd.__first=null;draw();ov.classList.add('on');w.setTimeout(function(){try{qi.focus()}catch(x){}},60)}
      [inp,inp2].forEach(function(i){if(!i)return;var lb=i.closest('label')||i;lb.addEventListener('mousedown',function(e){e.preventDefault();openS('')});i.addEventListener('focus',function(){try{i.blur()}catch(x){}openS('')})});
      zh.querySelector('.zhsr').onclick=function(e){e.stopPropagation();openS('')};
    })();
    inp.onkeydown=function(e){
      if(e.key!=='Enter'||!I)return;
      I.value=this.value;
      I.dispatchEvent(new w.Event('input',{bubbles:true}));I.dispatchEvent(new w.Event('change',{bubbles:true}));
      I.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));
      I.dispatchEvent(new w.KeyboardEvent('keyup',{key:'Enter',keyCode:13,bubbles:true}));
      if(I.form){try{I.form.requestSubmit()}catch(x){}}
    };
    if(inp2)inp2.onkeydown=inp.onkeydown;
    zh.__kids=kids;zh.__cart=cart;
    try{w.dispatchEvent(new w.Event('resize'))}catch(x){}
    return zh;
  }

  function tick(){
    try{
      var d=f.contentDocument,w=f.contentWindow;if(!d||!d.body||!d.head)return;
      var zh=d.getElementById('zh');
      if(zh&&(!zh.__kids||!zh.__kids[0].isConnected)){zh.remove();zh=null}
      if(!zh)zh=build(d,w);
      if(!zh)return;
      zh.__kids.forEach(function(k){if(k.style.display!=='none')k.style.setProperty('display','none','important')});
      var page=(w.location.hash||'').replace('#','')||'home',on=PAGE[page]||'';
      if(page!=='home')zh.__cat=0;var sw=d.querySelector('#zsw .tabs a.on'),sg=sw?+sw.getAttribute('data-g'):0;if(zh.__cat&&sg!==zh.__cat)zh.__cat=0;
      arr(zh.querySelectorAll('.zh2 a')).forEach(function(a){var t=a.getAttribute('data-t'),g={'سقيا وضيافة':1,'مصاحف وعبادة':2,'مستلزمات الحاج':3,'أطقم وهدايا':4}[t];a.classList.toggle('on',(page==='shop'&&w.__zOffers)?t==='العروض':(page==='shop'&&w.__zCat)?t==='الأقسام':t===on)});
      var b=zh.querySelector('.zhc i');
      if(b&&zh.__cart){var m=(zh.__cart.textContent||'').match(/[0-9٠-٩]+/);b.textContent=m?m[0]:'0'}
    }catch(e){}
  }
  f.addEventListener('load',tick);
  setInterval(tick,700);tick();
})();
