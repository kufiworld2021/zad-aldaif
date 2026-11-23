/* تعديلات صغيرة على معاينة المتجر: توسيط عناوين الأقسام (مثل «تسوق حسب الهدية») مع الزخرفة تحتها */
(function(){
  var f=document.getElementById('frame');if(!f)return;
  var TITLE='تسوق حسب الهدية';
  function arr(x){return Array.prototype.slice.call(x)}
  function norm(t){return (t||'').replace(/\u0640/g,'').split(String.fromCharCode(10)).join(' ').replace(/ +/g,' ').trim()}
  function center(h,w){
    if(h.__zc)return;h.__zc=1;
    h.style.setProperty('text-align','center','important');
    h.style.setProperty('margin-left','auto','important');h.style.setProperty('margin-right','auto','important');
    h.style.setProperty('background-position-x','center','important');
    var p=h.parentElement;
    if(p&&p.children.length<=3&&p.getBoundingClientRect().height<200){
      var cs=w.getComputedStyle(p);
      p.style.setProperty('text-align','center','important');
      if(cs.display.indexOf('flex')>-1){p.style.setProperty('justify-content','center','important');if(cs.flexDirection.indexOf('column')>-1)p.style.setProperty('align-items','center','important')}
      arr(p.children).forEach(function(k){
        if(k===h)return;
        if(k.getBoundingClientRect().height<40){k.style.setProperty('margin-left','auto','important');k.style.setProperty('margin-right','auto','important');
          if(w.getComputedStyle(k).display==='inline')return;k.style.setProperty('background-position-x','center','important')}
      });
    }
  }
  /* صور المنتجات بدون خلفية + أقسام بدون كروت (مثل محطة المنزل) */
  var CUT={'miswak.jpg':'img/cut/miswak.png','dates.jpg':'img/cut/dates.png','water.jpg':'img/cut/water.png','gift-box.jpg':'img/cut/box.png','meal.jpg':'img/cut/meal.png','bag.jpg':'img/cut/bag.png'};
  var CATS=['سقيا ماء','تمور','وجبات','مساويك','بوكسات','هدايا'];
  function imp(e,k,v){e.style.setProperty(k,v,'important')}
  function cutouts(d){
    arr(d.images).forEach(function(im){
      if(im.__cut)return;
      var n=(im.getAttribute('src')||'').split('?')[0].split('/').pop();
      if(!CUT[n])return;
      im.__cut=1;im.removeAttribute('srcset');im.src=CUT[n];
      imp(im,'object-fit','contain');imp(im,'background','transparent');imp(im,'padding','6%');imp(im,'box-sizing','border-box');
    });
  }
  function cats(d){
    if(!d.getElementById('zcat-css')){var st=d.createElement('style');st.id='zcat-css';st.textContent='.zcat img{transition:transform .35s ease!important;transform-origin:center bottom}.zcat:hover img{transform:scale(1.12)!important}';d.head.appendChild(st)}
    CATS.forEach(function(t){
      var c=arr(d.querySelectorAll('a,li,div,button')).filter(function(e){return !e.closest('#zh')&&!e.closest('#zbw')&&norm(e.textContent)===t&&e.querySelector('img')});
      var card=c[c.length-1];if(!card||card.__zcat)return;card.__zcat=1;
      card.classList.add('zcat');
      imp(card,'background','transparent');imp(card,'border','0');imp(card,'box-shadow','none');
      var im=card.querySelector('img');if(!im||!im.__cut)return;
      imp(im,'display','block');imp(im,'width','100%');imp(im,'max-width','150px');imp(im,'height','112px');imp(im,'margin','0 auto');imp(im,'object-position','center');imp(im,'border-radius','0');imp(im,'padding','0');
      var p=im.parentElement;
      while(p&&p!==card){imp(p,'border-radius','0');imp(p,'background','transparent');imp(p,'width','100%');imp(p,'height','auto');imp(p,'display','flex');imp(p,'justify-content','center');imp(p,'margin','0');imp(p,'overflow','visible');imp(p,'box-shadow','none');imp(p,'border','0');p=p.parentElement}
    });
  }
  /* كروت الخطوات المعتمدة: نموذج ٢ (أرقام كبيرة خضراء شفافة) */
  var STEPS=[['اختر الهدية والعدد','تمر أو ماء أو وجبة أو مصحف وغيرها وحدد الكمية اللي تناسبك'],['اكتب الاسم أو الإهداء','نكتبه على الطلب كما هو فراجع الإملاء قبل الدفع'],['نجهز ونوزع ونوثق','نسلمها لضيوف الرحمن ويوصلك مقطع التوثيق على واتساب']];
  var STCSS='#zst{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;direction:rtl}'
    +'#zst .it{background:#fff;border:1px solid #e6ded1;border-top:4px solid #b88458;border-radius:18px;padding:26px 24px 24px;position:relative;overflow:hidden;text-align:right}'
    +'#zst svg.n{position:absolute;left:10px;top:50%;margin-top:-50px;width:100px;height:100px;overflow:visible}#zst .it{padding-left:118px!important;min-height:112px}'
    +'#zst .n text{font:700 108px "Noto Kufi Arabic",sans-serif;fill:#3f6b4c;fill-opacity:0;stroke:#3f6b4c;stroke-width:1.6;stroke-opacity:.7;stroke-linejoin:round;stroke-dasharray:560;stroke-dashoffset:560;animation:zstDraw 6.5s ease-in-out infinite}'
    +'#zst .it:nth-child(2) .n text{animation-delay:.7s}#zst .it:nth-child(3) .n text{animation-delay:1.4s}'
    +'@keyframes zstDraw{0%{stroke-dashoffset:560;fill-opacity:0;stroke-opacity:.7}42%{stroke-dashoffset:0;fill-opacity:0;stroke-opacity:.7}58%,86%{stroke-dashoffset:0;fill-opacity:.3;stroke-opacity:.35}100%{stroke-dashoffset:0;fill-opacity:0;stroke-opacity:0}}'
    +'@media (prefers-reduced-motion:reduce){#zst .n text{animation:none;stroke-dashoffset:0;fill-opacity:.3;stroke-opacity:0}}'
    +'#zst b{display:block;position:relative;font:700 17px/1.6 "Noto Kufi Arabic",sans-serif;color:#2e3a33;margin:0 0 4px}'
    +'#zst p{position:relative;font:400 13.5px/1.9 "Noto Sans Arabic",sans-serif;color:#6b756e;margin:0}'
    +'@media (max-width:760px){#zst{grid-template-columns:1fr}}';
  function steps(d){
    var z=d.getElementById('zst');
    if(z){if(z.__old&&z.__old.isConnected){if(z.__old.style.display!=='none')imp(z.__old,'display','none');return}z.remove()}
    var els=STEPS.map(function(x){var c=arr(d.querySelectorAll('h2,h3,h4,h5,h6,b,strong,div,p,span')).filter(function(e){return norm(e.textContent)===x[0]});return c[c.length-1]});
    if(!els[0]||!els[1]||!els[2])return;
    var C=els[0].parentElement;
    while(C&&!(C.contains(els[1])&&C.contains(els[2])))C=C.parentElement;
    if(!C||C===d.body||C===d.documentElement||!C.parentElement)return;
    if(C.getBoundingClientRect().height>700||C.querySelector('h1,h2'))return;
    if(!d.getElementById('zst-css')){var st=d.createElement('style');st.id='zst-css';st.textContent=STCSS;d.head.appendChild(st)}
    z=d.createElement('div');z.id='zst';var N=['١','٢','٣'];
    z.innerHTML=STEPS.map(function(x,i){return '<div class="it"><svg class="n" viewBox="0 0 120 120" aria-hidden="true"><text x="60" y="98" text-anchor="middle">'+N[i]+'</text></svg><b>'+x[0]+'</b><p>'+x[1]+'</p></div>'}).join('');
    C.parentElement.insertBefore(z,C);imp(C,'display','none');z.__old=C;
  }
  /* صور للمنتجات اللي ما لها صورة (مكان «صورة المنتج») */
  function key(t){return (t||'').replace(/[\s\u00a0\u200e\u200f\u0640\u064b-\u0652]/g,'')}
  var PH={'سجادة صلاة':'img/cut/rugs.png','كرسي صلاة قابل للطي':'img/cut/chair.png','مصحف باسم من تحب':'img/cut/quran-trio.png'};
  var GAL={'مصحف باسم من تحب':['img/cut/quran-trio.png','img/cut/quran-green.png','img/cut/quran-beige.png','img/cut/quran-brown.png']};
  function placeholders(d,w){
    arr(d.querySelectorAll('.s-product-card-entry')).forEach(function(card){
      var t=card.querySelector('.s-product-card-content-title'),a=card.querySelector('.s-product-card-image');
      if(!t||!a||a.querySelector('img.zpi'))return;
      var src=null,k=key(t.textContent);
      Object.keys(PH).forEach(function(n){if(key(n)===k)src=PH[n]});
      if(!src)return;
      var ph=a.querySelector('.ph');if(ph)imp(ph,'display','none');
      var im=d.createElement('img');im.className='zpi';im.__cut=1;im.src=src;im.alt=norm(t.textContent);
      imp(im,'object-fit','contain');imp(im,'background','transparent');imp(im,'padding','6%');imp(im,'box-sizing','border-box');
      a.appendChild(im);
    });
  }
  /* كل منتج يفتح صفحته: ناخذ بيانات البطاقة اللي انضغطت ونعبي فيها صفحة المنتج */
  var TAIL='يجهز ويوزع على ضيوف الرحمن في الحرم مع كتابة الاسم أو الإهداء اللي تختاره';
  function zsync(d,w){function go(){try{unT(d)}catch(e){}try{prodApply(d,w)}catch(e){}try{prodHero(d)}catch(e){}try{lang(d,w)}catch(e){}}go();w.setTimeout(go,40);w.setTimeout(go,160);w.setTimeout(go,400)}
  function prodInit(d,w){
    if(d.__zpInit)return;d.__zpInit=1;
    try{w.__zprod=JSON.parse(w.sessionStorage.getItem('zprod'))}catch(e){}
    d.addEventListener('click',function(ev){
      var x=ev.target;if(!x||!x.closest)return;
      var c=x.closest('.s-product-card-entry');if(!c||!x.closest('a')||x.closest('button'))return;
      var t=c.querySelector('.s-product-card-content-title'),sb=c.querySelector('.s-product-card-content-subtitle'),p=c.querySelector('.s-product-card-price'),im=c.querySelector('.s-product-card-image>img');
      if(!t)return;
      w.__zprod={t:norm(t.textContent),s:sb?norm(sb.textContent):'',p:p?norm(p.textContent):'',i:im?im.getAttribute('src'):''};
      try{w.sessionStorage.setItem('zprod',JSON.stringify(w.__zprod))}catch(e){}
      try{w.scrollTo(0,0)}catch(e){}
      zsync(d,w);
    },true);
    w.__zSync=function(){zsync(d,w)};
  }
  function prodApply(d,w){
    var pg=d.querySelector('.page[data-page="product"]');if(!pg)return;
    var P=w.__zprod;if(!P||!P.t)return;
    var h1=pg.querySelector('.pd-info h1');if(!h1)return;
    if(pg.__zpT===P.t&&norm(h1.textContent)===P.t)return;
    var labs=arr(pg.querySelectorAll('.s-product-options-option-content')).slice(0,1).reduce(function(a,c){return a.concat(arr(c.querySelectorAll('label')))},[]);
    var dp=pg.querySelector('.desc p');
    if(!pg.__zo)pg.__zo={t:norm(h1.textContent),labs:labs.map(function(l){return l.textContent}),desc:dp?dp.textContent:'',st:(pg.querySelector('.product-entry__sub-title')||{}).textContent||''};
    pg.__zpT=P.t;
    var orig=key(P.t)===key(pg.__zo.t);
    h1.textContent=P.t;
    var bc=pg.querySelector('.breadcrumbs');if(bc&&bc.lastChild&&bc.lastChild.nodeType===3)bc.lastChild.nodeValue=P.t;
    var st=pg.querySelector('.product-entry__sub-title');if(st)st.textContent=orig?pg.__zo.st:(P.s||pg.__zo.st);
    var pr=pg.querySelector('.pd-price');if(pr&&P.p)pr.textContent=P.p.replace(/\s*ر\.س/,'')+' ر.س';
    var mi=pg.querySelector('#mainImg'),th=pg.querySelector('.thumbs');
    if(mi){
      mi.__cut=1;mi.removeAttribute('srcset');mi.alt=P.t;
      if(P.i){mi.src=P.i;var cut=P.i.indexOf('/cut/')>-1;imp(mi,'object-fit',cut?'contain':'cover');imp(mi,'padding',cut?'6%':'0');imp(mi,'opacity','1')}
      else{mi.src='img/logo-olive.svg';imp(mi,'object-fit','contain');imp(mi,'padding','30%');imp(mi,'opacity','.35')}
    }
    var gal=null;Object.keys(GAL).forEach(function(n){if(key(n)===key(P.t))gal=GAL[n]});
    if(th){
      if(!gal)imp(th,'display','none');
      else{
        th.style.removeProperty('display');
        arr(th.children).forEach(function(tb,i){
          if(i>=gal.length){imp(tb,'display','none');return}
          tb.style.removeProperty('display');tb.setAttribute('data-src',gal[i]);tb.classList.toggle('on',i===0);
          var ti=tb.querySelector('img');if(ti){ti.__cut=1;ti.removeAttribute('srcset');ti.src=gal[i];imp(ti,'object-fit','contain');imp(ti,'background','transparent');imp(ti,'padding','6%');imp(ti,'box-sizing','border-box')}
          tb.onclick=function(){if(mi){mi.src=gal[i];imp(mi,'object-fit','contain');imp(mi,'padding','6%')}arr(th.children).forEach(function(o){o.classList.toggle('on',o===tb)})};
        });
      }
    }
    labs.forEach(function(l,i){
      if(orig){l.textContent=pg.__zo.labs[i];return}
      var n=norm(pg.__zo.labs[i]).split(' ')[0];l.textContent=n+(n==='١٠'||n==='10'?' قطع':' قطعة');
    });
    if(dp)dp.textContent=orig?pg.__zo.desc:((P.s?P.s+' ':'')+TAIL);
  }
  /* كروت المميزات المعتمدة: الشريط الزيتي (نموذج ١) */
  var TR=[['<rect x="3" y="6.5" width="12.5" height="11" rx="2.5"/><path d="M15.5 10.5l5-2.8v8.6l-5-2.8"/>','توثيق بالفيديو','يوصلك على واتساب'],
          ['<path d="M4 20l1-4.2L16.2 4.6a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19 4 20z"/><path d="M14.5 6.3l3.2 3.2"/>','باسم من تحب','اسم أو إهداء على الطلب'],
          ['<path d="M6.5 3.5h11v17l-2.75-1.7L12 20.5l-2.75-1.7L6.5 20.5v-17z"/><path d="M9.5 8.5h5M9.5 12h5"/>','فاتورة إلكترونية','لكل طلب'],
          ['<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>','دفع آمن','مدى و Apple Pay والبطاقات']];
  var TRCSS='#ztr{display:grid;grid-template-columns:repeat(4,1fr);background:#425548;border-radius:22px;padding:8px;direction:rtl}'
    +'#ztr .it{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px 18px;position:relative;text-align:center;overflow:hidden}'
    +'#ztr .it+.it::before{content:"";position:absolute;right:0;top:22%;bottom:22%;width:1px;background:rgba(244,239,230,.22)}'
    +'#ztr i{width:58px;height:58px;border-radius:50%;background:#b88458;color:#fff;display:grid;place-items:center;flex:none}'
    +'#ztr svg{width:27px;height:27px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
    +'#ztr b{display:block;text-align:center;font:800 clamp(16px,1.25vw,20px)/1.6 "Noto Kufi Arabic",sans-serif;color:#f4efe6}'
    +'#ztr small{display:block;text-align:center;font:700 clamp(13px,1vw,15.5px)/1.7 "Noto Kufi Arabic",sans-serif;color:#cfd6cc}'
    +'#ztr .it>div{display:grid;justify-items:center}#ztr b::after{content:"";display:block;width:46px;height:3px;border-radius:3px;background:#b88458;margin:8px auto 6px}#ztr .it small{grid-area:2/1;animation:ztrA 6s ease-in-out infinite}#ztr .it small.alt{animation-name:ztrB;color:#e6c9a8}#ztr .it:nth-child(2) small{animation-delay:.35s}#ztr .it:nth-child(3) small{animation-delay:.7s}#ztr .it:nth-child(4) small{animation-delay:1.05s}#ztr .it:nth-child(2)>div,#ztr .it:nth-child(2) i{animation-delay:.4s}#ztr .it:nth-child(3)>div,#ztr .it:nth-child(3) i{animation-delay:.8s}#ztr .it:nth-child(4)>div,#ztr .it:nth-child(4) i{animation-delay:1.2s}'
    +'@keyframes ztrA{0%,40%{opacity:1;transform:none}45%,95%{opacity:0;transform:translateY(-12px)}100%{opacity:1;transform:none}}@keyframes ztrB{0%,46%{opacity:0;transform:translateY(12px)}52%,88%{opacity:1;transform:none}94%,100%{opacity:0;transform:translateY(12px)}}@keyframes ztrTxt{0%{opacity:0;transform:translateY(14px)}12%,82%{opacity:1;transform:none}94%,100%{opacity:0;transform:translateY(-12px)}}@keyframes ztrBob{0%,100%{transform:none}50%{transform:translateY(-5px)}}'
    +'@media (prefers-reduced-motion:reduce){#ztr .it small{animation:none}#ztr .it small.alt{display:none}}'
    +'@media (max-width:860px){#ztr{grid-template-columns:repeat(2,1fr)}#ztr .it:nth-child(3)::before{display:none}}'
    +'@media (max-width:460px){#ztr{grid-template-columns:1fr}#ztr .it+.it::before{display:none}}';
  function trust(d){
    var z=d.getElementById('ztr');
    if(z){if(z.__old&&z.__old.isConnected){if(z.__old.style.display!=='none')imp(z.__old,'display','none');return}z.remove()}
    var first=arr(d.querySelectorAll('body *')).filter(function(e){return !e.children.length&&!e.closest('#zh')&&!e.closest('#zbw')&&norm(e.textContent)===TR[0][1]})[0];
    if(!first)return;
    var C=first.parentElement;
    while(C&&C!==d.body&&!TR.every(function(x){return C.textContent.indexOf(x[1])>-1}))C=C.parentElement;
    if(!C||C===d.body||!C.parentElement)return;
    if(C.getBoundingClientRect().height>420||C.querySelector('.s-product-card-entry,h1,h2'))return;
    if(!d.getElementById('ztr-css')){var st=d.createElement('style');st.id='ztr-css';st.textContent=TRCSS;d.head.appendChild(st)}
    z=d.createElement('div');z.id='ztr';
    var ALT=['نصور لك التوزيع','نكتبه كما هو','تجيك بعد الدفع','بدون رسوم إضافية'];z.innerHTML=TR.map(function(x,i){return '<div class="it"><i><svg viewBox="0 0 24 24">'+x[0]+'</svg></i><div><b>'+x[1]+'</b><small>'+x[2]+'</small><small class="alt">'+ALT[i]+'</small></div></div>'}).join('');
    C.parentElement.insertBefore(z,C);imp(C,'display','none');z.__old=C;
  }
  /* أقسام إضافية بنفس ستايل الأقسام: ننسخ بطاقة قسم موجودة ونغير اسمها وصورتها */
  var NEWCATS=[['قرآن','img/cut/quran.png'],['مصاحف','img/cut/quran-trio.png'],['سجاد','img/cut/rugs-cat.png'],['سبح','img/cut/misbaha.png'],['طقم إحرام','img/cut/ihram.png'],['كراسي صلاة','img/cut/chair.png'],['كراسي متحركة','img/cut/wheelchair.png'],['مظلات','img/cut/umbrella.png'],['تعبئة ماء زمزم','img/cut/zamzam.png'],['مستلزمات الحجاج','img/cut/supplies.png']];
  var ORDER=['سقيا ماء','تعبئة ماء زمزم','تمور','وجبات','هدايا','قرآن','مصاحف','سجاد','سبح','مساويك','طقم إحرام','مظلات','كراسي صلاة','كراسي متحركة','مستلزمات الحجاج'];
  function order(box){
    if(box.__zord===box.children.length)return;box.__zord=box.children.length;
    arr(box.children).forEach(function(k){var i=ORDER.indexOf(norm(k.textContent));if(i>-1)imp(k,'order',String(i+1))});
  }
  function addCats(d){
    var base=arr(d.querySelectorAll('.zcat')).filter(function(e){return !e.closest('[data-zx]')&&norm(e.textContent)==='مساويك'})[0];
    if(!base)return;
    function n(box){return arr(box.children).filter(function(k){return CATS.indexOf(norm(k.textContent))>-1}).length}
    var unit=base,box=base.parentElement;
    while(box&&box!==d.body&&n(box)<4){unit=box;box=box.parentElement}
    if(!box||box===d.body)return;
    if(box.querySelector('[data-zx]')){order(box);return}
    if(!d.getElementById('zcats-css')){var st=d.createElement('style');st.id='zcats-css';st.textContent='.zcats{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;align-items:flex-end!important;gap:34px 14px!important}.zcats>*{flex:0 0 calc((100% - 98px)/8)!important;width:auto!important;max-width:none!important;min-width:0!important;margin:0!important}.zcats>*,.zcats .zcat{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;text-align:center!important;gap:12px!important;padding:0!important}.zcats .zcat>*{margin-left:auto!important;margin-right:auto!important;text-align:center!important}@media (max-width:900px){.zcats>*{flex-basis:calc((100% - 42px)/4)!important}}@media (max-width:520px){.zcats{gap:24px 8px!important}.zcats>*{flex-basis:calc((100% - 16px)/3)!important}}';d.head.appendChild(st)}
    box.classList.add('zcats');
    NEWCATS.forEach(function(x){
      var c=unit.cloneNode(true);c.setAttribute('data-zx','1');c.__zcat=1;
      arr(c.querySelectorAll('*')).forEach(function(e){e.__zcat=1});
      var tw=d.createTreeWalker(c,4,null),t,done=false;
      while((t=tw.nextNode())){if(norm(t.nodeValue)==='مساويك'){t.nodeValue=x[0];done=true;break}}
      if(!done)return;
      var im=c.querySelector('img');if(im){im.__cut=1;im.removeAttribute('srcset');im.src=x[1];im.alt=x[0]}
      box.appendChild(c);
    });
    order(box);
  }
  /* الأقسام المعتمدة: نصف عجلة جانبي يسار مع لوحة (نموذج ٤ المعدل) */
  var PHR={'سقيا ماء':'اسق ضيف الرحمن ولك الأجر','تعبئة ماء زمزم':'عبوة خفيفة يعبي فيها الضيف ماء زمزم','تمور':'تمر فاخر يقدم لضيوف الرحمن باسمك','وجبات':'وجبة متكاملة مرتبة لضيف الرحمن','بوكسات':'تمر ومسواك وسبحة ومصلية في بوكس واحد','هدايا':'هدية مرتبة بكيس زاد الضيف','قرآن':'مصحف يهدى لضيف الرحمن','مصاحف':'مصحف باسم من تحب مكتوب على الغلاف','سجاد':'سجادة صلاة رفيقة الصلاة والسكينة','سبح':'سبحة تبقى مع الضيف وتذكره بالدعاء','مساويك':'مسواك مغلف بعناية','طقم إحرام':'طقم إحرام كامل بحقيبته','مظلات':'مظلة تظلل الحاج في طريقه','كراسي صلاة':'كرسي خفيف راحة أثناء الصلاة','كراسي متحركة':'عون لكبار السن من ضيوف الرحمن','مستلزمات الحجاج':'كل اللي يحتاجه الحاج في طريقه'};
  var ZWCSS='#zwh{--S:min(1320px,112vw);--H:min(var(--S),720px);--off:0px;--I:calc(var(--S)*.14);--R:calc(var(--S)*.39);direction:rtl;font-family:"Noto Kufi Arabic",sans-serif;color:#2e3a33}'
   +'#zwh *{box-sizing:border-box}'
   +'#zwh .zw-side{display:flex;align-items:center;justify-content:space-between;gap:30px;flex-wrap:nowrap}'
   +'#zwh .zw-panel{flex:1 1 auto;min-width:0;text-align:center}'
   +'#zwh .zw-big{height:clamp(260px,25vw,440px);display:grid;place-items:center;margin:0 0 12px}'
   +'#zwh .zw-big img{max-width:100%;max-height:clamp(260px,25vw,440px);width:auto;height:auto;object-fit:contain;transition:opacity .2s,transform .3s}'
   +'#zwh .zw-panel small{display:block;font:700 clamp(13px,1vw,17px) "Noto Kufi Arabic",sans-serif;color:#b88458}'
   +'#zwh .zw-panel h3{-webkit-text-stroke:.6px currentColor;font:900 clamp(34px,3.3vw,60px)/1.5 "Noto Kufi Arabic",sans-serif;color:#425548;margin:2px 0 4px;text-align:center;transition:opacity .2s}'
   +'#zwh .zw-panel p{font:700 clamp(15px,1.25vw,22px)/1.9 "Noto Kufi Arabic",sans-serif;color:#425548;margin:0 0 22px;text-align:center;transition:opacity .2s}'
   +'#zwh .zw-panel a{display:inline-block;font:700 clamp(14px,1.1vw,19px) "Noto Kufi Arabic",sans-serif;background:#425548;color:#f4efe6;border-radius:999px;padding:.85em 2.4em;cursor:pointer;text-decoration:none}'
   +'#zwh .zw-panel.sw .zw-big img{opacity:0;transform:scale(.92)}#zwh .zw-panel.sw h3,#zwh .zw-panel.sw p{opacity:.15}'
   +'#zwh .zw-hw::before,#zwh .zw-hw::after{content:"";position:absolute;left:0;right:0;height:17%;z-index:2;pointer-events:none}#zwh .zw-hw::before{top:0;background:linear-gradient(to bottom,#fbf8f3 8%,rgba(251,248,243,0))}#zwh .zw-hw::after{bottom:0;background:linear-gradient(to top,#fbf8f3 8%,rgba(251,248,243,0))}#zwh .zw-hub,#zwh .zw-ptr{z-index:3}'
   +'#zwh .zw-hw{position:relative;overflow:hidden;direction:ltr;flex:none;width:calc(var(--S)*.54);height:var(--H);margin-left:calc(var(--off)*-1);touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none}'
   +'#zwh .zw-hw.grab{cursor:grabbing}'
   +'#zwh .zw-wheel{position:absolute;top:calc((var(--H) - var(--S))/2);left:calc(var(--S)*-.48);width:var(--S);height:var(--S)}'
   +'#zwh .zw-ring{position:absolute;inset:11%;border-radius:50%;border:2px dashed #d8c3a8}'
   +'#zwh .zw-rot{position:absolute;inset:0;border-radius:50%;transition:transform 1s cubic-bezier(.2,.8,.2,1)}'
   +'#zwh .zw-cw{width:100%;height:100%;transition:transform 1s cubic-bezier(.2,.8,.2,1)}'
   +'#zwh .zw-rot.fast,#zwh .zw-rot.fast .zw-cw{transition-duration:3.8s;transition-timing-function:cubic-bezier(.12,.75,.1,1)}'
   +'#zwh .zw-rot.drag,#zwh .zw-rot.drag .zw-cw{transition:none!important}'
   +'#zwh .zw-it{position:absolute;left:50%;top:50%;width:var(--I);height:var(--I);margin:calc(var(--I)/-2) 0 0 calc(var(--I)/-2);cursor:pointer;opacity:.6;transition:opacity .3s}'
   +'#zwh .zw-it.on,#zwh .zw-it:hover{opacity:1}'
   +'#zwh .zw-in{width:100%;height:100%;border-radius:50%;background:#fff;border:2px solid #e6ded1;display:grid;place-items:center;transition:scale .3s,border-color .3s,box-shadow .3s}'
   +'#zwh .zw-in img{width:68%;height:68%;object-fit:contain;display:block;pointer-events:none;-webkit-user-drag:none}'
   +'#zwh .zw-it:hover .zw-in{border-color:#b88458}'
   +'#zwh .zw-it.on .zw-in{scale:1.28;border-color:#b88458;box-shadow:0 0 0 5px rgba(184,132,88,.22),0 14px 24px -14px rgba(46,58,51,.6)}'
   +'#zwh .zw-hub{position:absolute;left:25%;top:25%;width:50%;height:50%;border-radius:50%;background:#c1946e;box-shadow:0 0 0 calc(var(--S)*.012) #425548,0 0 0 calc(var(--S)*.018) #fbf8f3,0 0 0 calc(var(--S)*.018 + 1px) #e6ded1}'
   +'#zwh .zw-hub i{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:40%;height:30%;background:url(img/logo-ivory.svg) center/contain no-repeat;opacity:.45}'
   +'#zwh .zw-ptr{position:absolute;right:0;top:50%;margin-top:-10px;width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:16px solid #b88458;filter:drop-shadow(0 2px 2px rgba(0,0,0,.2))}'
   +'#zwh .zw-ctl{display:flex;width:max-content;gap:8px;align-items:center;margin:26px auto 0;direction:ltr;background:#fff;border:1px solid #e6ded1;border-radius:999px;padding:7px;box-shadow:0 14px 30px -18px rgba(46,58,51,.55)}'
   +'#zwh .zw-ctl button{all:unset;box-sizing:border-box;cursor:pointer;font:700 13px "Noto Kufi Arabic",sans-serif;border-radius:999px;border:1.5px solid #425548;background:#fff;color:#425548;padding:9px 24px}'
   +'#zwh .zw-ctl button{border:0;background:#f4efe6;height:50px;display:flex;align-items:center;gap:9px;font-size:16px;font-weight:800;transition:background .25s,color .25s,transform .2s}#zwh .zw-ctl button:hover{background:#b88458;color:#fff}#zwh .zw-ctl button:active{transform:scale(.94)}#zwh .zw-ctl button.sp{background:#425548;color:#f4efe6;padding:0 34px}#zwh .zw-ctl button.sp:hover{background:#b88458}#zwh .zw-ctl button.sp:hover svg{transform:rotate(180deg)}#zwh .zw-ctl button.sp svg{transition:transform .5s}'
   +'#zwh .zw-ctl button.ar{width:50px;height:50px;padding:0;display:grid;place-items:center}'
   +'#zwh .zw-ctl svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}'
   +'#zwh.zw-m{--S:620px;--I:64px;--R:270px;--H:150px}'
   +'#zwh.zw-m .zw-side{flex-direction:column;align-items:stretch;gap:4px}'
   +'#zwh.zw-m .zw-hw{width:auto;height:var(--H);margin:0 calc(var(--off)*-1);align-self:stretch}'
   +'#zwh.zw-m .zw-wheel{left:50%;margin-left:calc(var(--S)/-2);top:calc(var(--H) - var(--S) - 24px)}'
   +'#zwh.zw-m .zw-hub{display:none}#zwh.zw-m .zw-ring{inset:40px}'
   +'#zwh.zw-m .zw-it.on .zw-in{scale:1.5}'
   +'#zwh.zw-m .zw-ptr{right:auto;left:50%;top:auto;bottom:0;margin:0 0 0 -10px;border:0;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:16px solid #b88458}'
   +'#zwh.zw-m .zw-big{height:170px;margin-bottom:6px}#zwh.zw-m .zw-big img{max-height:170px}#zwh.zw-m .zw-panel p{font-size:15px}#zwh.zw-m .zw-panel a{font-size:14px}#zwh.zw-m .zw-panel small{font-size:13px}'
   +'#zwh.zw-m .zw-panel h3{font-size:26px}#zwh.zw-m .zw-panel p{margin-bottom:12px}#zwh.zw-m .zw-ctl{margin-top:14px}';
  function wheel(d,w){
    var box=d.querySelector('.zcats');if(!box)return;
    var z=d.getElementById('zwh');
    var mob=w.innerWidth<=760;
    if(z){if(z.__box===box&&z.__mob===mob){if(box.style.display!=='none')imp(box,'display','none');return}z.remove()}
    var C=arr(box.children).map(function(k){var im=k.querySelector('img');return {el:k,n:norm(k.textContent),i:im?im.getAttribute('src'):''}}).filter(function(x){return x.i&&ORDER.indexOf(x.n)>-1});
    if(C.length<ORDER.length)return;
    C.sort(function(a,b){return ORDER.indexOf(a.n)-ORDER.indexOf(b.n)});
    if(!d.getElementById('zwh-css')){var st=d.createElement('style');st.id='zwh-css';st.textContent=ZWCSS;d.head.appendChild(st)}
    z=d.createElement('div');z.id='zwh';z.__box=box;z.__mob=mob;if(mob)z.className='zw-m';
    z.innerHTML='<div class="zw-side"><div class="zw-panel"><div class="zw-big"><img alt=""></div><small>القسم المختار</small><h3></h3><p></p><a>تسوق الآن</a></div>'
      +'<div class="zw-hw"><div class="zw-wheel"><div class="zw-ring"></div><div class="zw-rot"></div><div class="zw-hub"><i></i></div></div><div class="zw-ptr"></div></div></div>'
      +'<div class="zw-ctl"><button class="ar nxb" aria-label="يسار"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button class="sp"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5"/></svg>لف</button><button class="ar pvb" aria-label="يمين"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button></div>';
    box.parentElement.insertBefore(z,box);imp(box,'display','none');
    var N=C.length,step=360/N,A=mob?90:0,rot=0,cur=0,timer,drag=null,dragEnd=0;
    var hw=z.querySelector('.zw-hw'),rotEl=z.querySelector('.zw-rot'),panel=z.querySelector('.zw-panel');
    var big=panel.querySelector('img'),h3=panel.querySelector('h3'),pp=panel.querySelector('p');
    var els=C.map(function(c,i){
      var e=d.createElement('div');e.className='zw-it';
      e.innerHTML='<div class="zw-cw"><div class="zw-in"><img src="'+c.i+'" alt="'+c.n+'"></div></div>';
      e.onclick=function(){if(Date.now()-dragEnd<300)return;goTo(i)};rotEl.appendChild(e);return e});
    function place(){
      els.forEach(function(e,i){var a=i*step+A;e.style.transform='rotate('+a+'deg) translate(var(--R)) rotate('+(-a)+'deg)';
        e.firstChild.style.transform='rotate('+(-rot)+'deg)';e.classList.toggle('on',i===cur)});
      rotEl.style.transform='rotate('+rot+'deg)';
    }
    function fill(){var c=C[cur];big.src=c.i;big.alt=c.n;h3.textContent=kash(c.n);pp.textContent=PHR[c.n]||''}
    function show(){panel.classList.add('sw');w.setTimeout(function(){fill();panel.classList.remove('sw')},200)}
    function goTo(i,fast,turns){
      var dd=((-i*step-rot)%360+540)%360-180;if(turns)dd+=360*turns*(dd<0?-1:1);
      rot+=dd;cur=i;rotEl.classList.toggle('fast',!!fast);place();w.setTimeout(show,fast?3000:450);
    }
    z.querySelector('.nxb').onclick=function(){goTo((cur+1)%N)};
    z.querySelector('.pvb').onclick=function(){goTo((cur-1+N)%N)};
    z.querySelector('.sp').onclick=function(){var r;do{r=Math.floor(Math.random()*N)}while(r===cur);goTo(r,true,2)};
    panel.querySelector('a').onclick=function(){var t=C[cur].el,l=t.matches('a,button')?t:t.querySelector('a,button');(l||t).click()};
    function auto(){w.clearInterval(timer);timer=w.setInterval(function(){if(!z.isConnected){w.clearInterval(timer);return}goTo((cur+1)%N)},3600)}
    function ang(e){var r=rotEl.getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))*180/Math.PI}
    hw.addEventListener('pointerdown',function(e){drag={a:ang(e),m:0,on:false,id:e.pointerId,v:0,t:Date.now()};w.clearInterval(timer)});
    hw.addEventListener('pointermove',function(e){
      if(!drag)return;var a=ang(e),dd=a-drag.a;if(dd>180)dd-=360;if(dd<-180)dd+=360;drag.a=a;drag.m+=Math.abs(dd);
      var now=Date.now(),dt=Math.max(8,now-drag.t);drag.t=now;drag.v=drag.v*.55+(dd/dt)*.45;
      if(!drag.on&&drag.m>1.2){drag.on=true;rotEl.classList.add('drag');rotEl.classList.remove('fast');hw.classList.add('grab');try{hw.setPointerCapture(drag.id)}catch(x){}}
      if(drag.on){rot+=dd;var c=((Math.round(-rot/step)%N)+N)%N;if(c!==cur){cur=c;fill()}place()}
    });
    /* اللف باليد: لو سحب العميل بسرعة وفلت العجلة تكمل لف وتوقف على قسم */
    function settle(extra){
      var fast=Math.abs(extra)>170,target=Math.round((rot+extra)/step)*step;
      rot=target;cur=((Math.round(-rot/step)%N)+N)%N;rotEl.classList.toggle('fast',fast);place();w.setTimeout(show,fast?3000:450);
    }
    function end(){
      if(!drag)return;var was=drag.on,v=(Date.now()-drag.t>90)?0:drag.v;drag=null;rotEl.classList.remove('drag');hw.classList.remove('grab');
      if(was){dragEnd=Date.now();var extra=Math.max(-1260,Math.min(1260,v*750));void rotEl.offsetWidth;settle(extra)}
      auto();
    }
    hw.addEventListener('pointerup',end);hw.addEventListener('pointercancel',end);
    function fit(){if(!z.isConnected)return;z.style.setProperty('--off','0px');var r=hw.getBoundingClientRect();z.style.setProperty('--off',Math.max(0,Math.round(r.left))+'px')}
    fit();w.addEventListener('resize',fit);w.setTimeout(fit,600);
    fill();place();auto();
  }
  /* تنظيف النصوص: بدون حركات ولا فواصل + النصوص الصغيرة بولد + توسيع المحتوى */
  var HRK=/[\u064B-\u0652\u0670]/g;
  function cl(t){return t.replace(HRK,'').replace(/\s*[،؛]\s*/g,' ').replace(/([^\d\s])\s*,\s*(?=\D)/g,'$1 ')}
  var XCSS='body p,body small,body li,body label,body span,body a,body td,body th,body input,body textarea,body select,body button,body div{font-weight:900!important}'
    +'body h1,body h2,body h3,body h4,body b,body strong{font-weight:900!important;-webkit-text-stroke:.35px currentColor}'
    +'.s-product-card-content{text-align:center!important}.s-product-card-content-title,.s-product-card-content-title a{display:block!important;font-size:clamp(18px,1.55vw,25px)!important;line-height:1.6!important;font-weight:800!important;text-align:center!important}.s-product-card-content-subtitle{text-align:center!important}.s-product-card-price{display:flex!important;justify-content:center!important;text-align:center!important}'
    +'.zt::after,.zt::before,.ztp::after,.ztp::before{content:none!important;display:none!important}.zt{background-image:none!important}.zorn{display:block!important;width:96px!important;height:14px!important;margin:8px 0 0!important;line-height:0!important}.zorn.c{margin:8px auto 0!important}.zorn svg{display:block;width:96px;height:14px}'
    +'.s-product-card-entry{border:1px solid #e6ded1!important;border-radius:22px!important;padding:12px 12px 0!important;background:#fbf8f3!important;overflow:hidden;transition:transform .3s,box-shadow .3s}.s-product-card-entry:hover{transform:translateY(-6px);box-shadow:0 22px 34px -22px rgba(46,58,51,.5)}'
    +'.s-product-card-entry .s-product-card-image{display:grid!important;place-items:center!important;position:relative!important;aspect-ratio:4/5!important;height:auto!important;width:100%!important;border-radius:999px 999px 14px 14px!important;background:#425548!important;border:5px solid #b88458!important;box-shadow:inset 0 0 0 3px #fbf8f3!important;overflow:hidden!important;padding:0!important}'
    +'.s-product-card-entry .s-product-card-image img{position:static!important;width:84%!important;height:72%!important;max-width:none!important;object-fit:contain!important;background:transparent!important;padding:0!important;margin:12% 0 0!important;transition:transform .4s}.s-product-card-entry:hover .s-product-card-image img{transform:scale(1.07)}'
    +'.s-product-card-entry .s-product-card-image .ph,.s-product-card-entry .s-product-card-image .ph>div{background:transparent!important;width:100%!important;height:100%!important;display:grid!important;place-items:center!important;position:static!important}'
    +'.s-product-card-entry .s-product-card-image>:not(img):not(.ph){position:absolute!important;top:-42px!important;bottom:auto!important;right:0!important;left:auto!important;z-index:3}.s-product-card-entry{padding-top:52px!important}.s-product-card-entry .s-product-card-image{overflow:visible!important}'
    +'.s-product-card-entry.zalt{background:#425548!important;border:0!important;border-radius:28px!important;padding:0 12px 12px!important;margin-top:76px!important;overflow:visible!important}'
    +'.s-product-card-entry.zalt .s-product-card-image{aspect-ratio:auto!important;height:210px!important;border-radius:0!important;background:transparent!important;border:0!important;box-shadow:none!important;margin-top:-76px!important;margin-bottom:-38px!important;z-index:2;overflow:visible!important}'
    +'.s-product-card-entry.zalt .s-product-card-image img{width:auto!important;max-width:88%!important;height:auto!important;max-height:100%!important;margin:0!important;filter:drop-shadow(0 22px 14px rgba(0,0,0,.38));animation:zFloat 4s ease-in-out infinite;transition:transform .45s cubic-bezier(.2,.8,.2,1)}'
    +'.s-product-card-entry.zalt:nth-child(2n) .s-product-card-image img{animation-delay:-2s}'
    +'.s-product-card-entry.zalt:hover .s-product-card-image img{transform:scale(1.1) rotate(-4deg)!important}'
    +'@keyframes zFloat{0%,100%{translate:0 0}50%{translate:0 -10px}}@media (prefers-reduced-motion:reduce){.s-product-card-entry.zalt .s-product-card-image img{animation:none}}'
    +'.s-product-card-entry.zalt{display:flex!important;flex-direction:column!important}.s-product-card-entry.zalt .s-product-card-content{flex:1 1 auto!important;background:#fff!important;border-radius:22px!important;padding:50px 14px 14px!important;display:flex!important;flex-direction:column!important;position:relative;z-index:1}'
    +'.s-product-card-entry.zalt .s-product-card-price{order:-1;color:#b88458!important;font-size:clamp(22px,1.8vw,28px)!important;margin:0 0 4px!important}'
    +'.s-product-card-entry.zalt .s-product-card-content-title{position:relative;padding-bottom:10px!important}.s-product-card-entry.zalt .s-product-card-content-title::after{content:"";position:absolute;bottom:0;right:50%;transform:translateX(50%);width:40px;height:3px;border-radius:3px;background:#b88458}'
    +'.s-product-card-entry.zalt [data-add]{background:#2e3a33!important;color:#f4efe6!important}.s-product-card-entry.zalt [data-add]:hover{background:#b88458!important}'
    +'.s-product-card-entry .s-product-card-price{color:#b88458!important}.s-product-card-entry .s-product-card-content{background:transparent!important}'
    +'body,body *:not(i):not([class*="icon"]){font-family:"Noto Kufi Arabic",sans-serif!important}'
    +'.zt{font-size:clamp(28px,2.7vw,46px)!important;font-weight:900!important;-webkit-text-stroke:.6px currentColor;text-align:center!important;line-height:1.6!important;width:100%}.ztp{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;gap:6px!important}.zorn{margin:8px auto 0!important;width:130px!important}.zorn svg{width:130px!important}'
    +'.zsar{display:inline-block!important;flex:none;align-self:center;width:.95em;height:1.05em;background:currentColor;-webkit-mask:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACgCAYAAAA1mT9wAAALq0lEQVR42u2daYyVZxXHfwPTFij72mEqMBQYoDAbm6VIimnrh9IaYzVq/GCiMbE2sekHTUw0MXH52qipjUs0xhY0JgabprENbdNQhMIwK8zKMpRhLR12hqWMH865zsvAzLx3f+97///khpaEO+/ym+d5znn+zzljkQBmAz8HBoCDehxSWH0FaHdwntbjkMJoAfAX4JaDMwBs1mORRtMXgK4ANIJHGlWlwK+Aa3cBR/BIw2ou8K9hoBE80rCqAlpHAUfwSHfoceBYCHAEj3SbngUuhgQnKvB8HhivV5dffSNJcPINzypfk/UAk/T68qevAleSBCdf8NwH/Ajo82voAe7XK8yPNqcw4uQLnhrgnSHXcETw5Ed1wOkUwck1PN8FztzlGgRPHrQY6EwDnFzBMwF4aYRrKBh4SmMEz7ccoCirAvgTsImYpOuJ0dYDEU9UbgWWxeWBj4kRPAMRvrYngTfjBE7cRp6o6ingb8DUuN3YGL3brOoZYEscwRE82dUTwJ+JcbZY8GRH1cCrwPQ436TgybweAv4BzIr7jQqezGos8DKwpBhuVvBkPnpdVCw3K3gyr5uCR5IEjyR4JMEjCR5JEjyS4JEEjyR4JMEjSYJHEjyS4JEEjyR4JEnwSIJHEjyS4JEkwSMJHknwSIJHEjySJHgkwSMJHknwSJLgkQSPJHgkwSMJHkkSPJLgkQSPRMyrd0pSWI0HyoFaYJngkUaalcqxHmarHJiVwHysJcJpwSMlNAurXr8MeBSoBJYzfAuEDsFTvNNPhY8kK4H1WPHxB4GSkN/RKXjir3HAAz6i1GIdlauBucDENL63S/DET3OABVin59VYe8rKDLduGgAaBE9ha4KDsQRY65/5wGey/HM/BtoFDwXTL3UCMMMjnxr/82EfaSbk+Pq6gVOCJ3q65WHyXGAhsMZhqfJoKAqdA/cB1wRP9PQAsN2nnrKIXuP7oAxzVMPotRG+vj7gQ7S3lXF9GvH+7plQA3BE8GQnTB4X83vchjZG09ZEBjcJq32qWeIL3bjqEvAfwZOc7vXF67JA9FPtI83EInoOu4FOwXN33fA/y7Bk2yofUSodnMlF/nz+HlzTCZ7b9SLwYyyfUq7HcZtOAm8gM9iwelKPYFj9EzgeV3gG9H6z8kx7gHbgZWJsQ71H75qMbHgCbcAeoBE47H9PXOCZ6CFxtUc+dcA6vfukdBE4CjRjib96h+YMcDPMF5RQGF7aeZjzbT22k1yFbRqOFwOhdNOnn4MebjcCB3xUuZbql0YRnhnAUsx4vRFY4dHPdDGQ1PRzwEeSncB+oAu4kMkfkm94JmH5lKqAR2UJlmcZKwZC6YKPIE3++a9PR8ezHUSU5DhLW+5wfNannxrMdK3pJ5yuAh8BHdjOdouvWU4A/bm+mJIs+1IWYcc3NjJol5wsBkLrhEc/LT6idPhU1B+FiyvJYPTzkEc/a3z6mR/zTcJsTkM/AXY4PCeieqGpwDMWc+ev8BA5YZGcTe69tHHUEf9FvEUMz6p/Dfi9QMnqL/R44HLcqmTcAzwncBjJvD6gKhl31zpf00im80AvsBc7UdAGvIIlNAXPEH29iPeQbmD5ky4PkxOw9HB7lva6Rp47NRN4iuLZTT7jYXIj8IGHyT3AuRH+3X0FsuWTc3g2evgdZ70OvOvTUJcD9Klm5/Th+WIRPI/fAm8Ji1F1P1AeFp7JPvJQBEZ36c7UwTxstyDo6Z4SFp5V/gVSvDXWB4rl2G5BNXa0aAFWOSyo5tIkQvQxETQzHcOsB+8DjwFf0vtPSpOxjelqrJZPjYMzI0RUHbrEymPkP/mWCJPrMYtku/9/4rjMbMEz6qhS4Z91PptU+nSUSvrlUBh4pmD2iVyGyWcdjn0eKtdj/pSPVRY4NChTsXqDVVhitwqrvDEtQz+jNcwDX46djCSLVRd63ZeyB3O9tThAN8RBKE3zNWlNoO5gpa9TsmGquwLsCwNPRQazytexXeNOzB7Z4iPMYeVTSKZAZYVPNwlP93IsB5er0bcHOBHmh9WlsU457XC0YmamZswJd14MjDhtXwlMP7N8+lkMfM6nn3nk94x8K3AuDDxLCW+67vF1Sgvmp20DPtGoQrJFKp/HXJerMW/PzIhte3wQZpF57zBntq/5VNPlI0qjA3OSkGd+pGE1G/h1hK/velh4pvmn10eR/Z5T6cbOAF3Wuy46HcJya6PCcwnb0zrh6xdJ2p5Yk40Gz2Vfu0hSIgh6HTVrk1KcsnYKHikV/RvbUxQ8UtJR1quox6iUgnYMXf8KHinsqPMKQ5K92om+XWf1CLiFJXs/whLABzBXQyOyMTBSWuIUxVuipd0jqWZst6BvtCPPgmdQLVgmPe7Tz7HAaLID2488Qgr2F8EzqD+QRok1otlE5Qy2/7jLfznqsd2CPvJU6CDKczVp9I/aUuD334cl8ZoYtOm2Yq6GW1GpkkFEz59NSWPOfxGrulUo6ndQOjALzF4GN6sHolxiJQqgTMMcdCswz0sd5ntJRb/04ZwIn5FPmOoa/LPXI6ILhVafJ9eajlksqzHHfxVmUJtB+v7c94DfROx+z/gCtgkre9vmC9zzUSv4VBrBE5sLGWz1XOf/XUHmE5rngRcYtHySpwKV3Zine6+vVbo9AiKOlcEyCcp0Bp3+6zGvbjm5KXr5ixzbTa759NPin92+oD1OgZrqSnNsr1wQqGNYg50AmE7u/bnvAC+RvdMNeEh8xNdTDQ5MZ5zM/yVZNHEvxBqcJY6HLMWOtubbyH0O2IBZaslC85RnfYTZ74ta4lwBIRPTzxxf0FYyWHP5QawUR9T0A6JtMI8tPCWB6Wedr1ESNZcLoTfEW8DTFFHpt3zCMwU7YJY477wSO504uwDtHGexQ3Nteu3Zzav8FHjTF3j9WNay0D/P6dVmP9p6HvhZzO7zDeCPet1paTyW2a/1iLmy5C4tjOqxc9HEqPnHJmwfSCKpxjMLsO2fWl+6LA7sIR4bOvI8HjNwrgPfEziEKVC5xKPkDR45VzBye/DOofB8k3gV3X4B2CY2GJqDmxHYJ1yN5eHKkux71hWEZ74P73HQJ8D3ga2oQthcH0XWerRc6+863S2gtiA8T2Sw5Fg+9S7wQ2yjsdg0FdvySWT2q30ZMpPMG+8agvA8Q2F3792NWUm3Ei876UjTT5mPJIkmeZU+0mS7nvRJoLs0sLJeU4DHQ9oxE/d27JjIjRinVMoCVpVEP/myPLXdbANOJ+CpdoCiqnOesGwN9NrsiHHZl1keJlcDj/iIsjxCy4p64GYCnk0R8+f2MNi5dxfmzT1MPBuhjcMstCsD/VkXepg8JsI1eij1z5o85mFOYfaF3YHay3n352YRlDkeGtd5qFzt65SJBXIPp/wXm1Jsk3MpufPndjssOx2WdjJ0jojopvW/7SNKwtc0qYDvZw/ecbkU2zWfk6VCz4d8ndKAdcc7XCj+3Azqy0TPZJ+OtgVX8etI/xRCf2A4awocjD+D1TWkiDeevxOj+zkHvB28uWUpfMlxH1UafBg74NHQRaSgarFkXVz0HtZA5v/wLA5REbXLI58PfWQ5lJj3JIqpoe+WYMQ7FJ4rHukkinLv8gXtKQrrOG4UNAmzvBKjYpZvD52TG4HXfGHb5IvaS3r3aesR4tVf/a9Do+JSCntPK8ranKV2RbnUaSyTXw/8TvV5yFkycEOBXfNFLJPfHOglfxwrBqXiTjlUJbntjkgKJfRO+jJlr0fLjT7SXFVlsPzqUaLVZrsXS6U0YttAHVim/5KKO0UTHvJYIawds03UOyy92Tj6LHjIikmrKofrlJPYZnKDr1easMZ511XciYL04lRkyS15FMu37PFRpQ1LrVxVcad46GEyU+DhrK9Tmh2UfQ5On4o7xVeLUyyq2esjSqtHQB3YxvINFXcqHi1kdAPcUYdjt4fJia7P/agyWFFrEXca9YMbywkHwiUVd5KG/jK+hu08N2JuyYM+JcXOf/0/WlsPbMDEw7wAAAAASUVORK5CYII=) center/contain no-repeat;mask:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACgCAYAAAA1mT9wAAALq0lEQVR42u2daYyVZxXHfwPTFij72mEqMBQYoDAbm6VIimnrh9IaYzVq/GCiMbE2sekHTUw0MXH52qipjUs0xhY0JgabprENbdNQhMIwK8zKMpRhLR12hqWMH865zsvAzLx3f+97///khpaEO+/ym+d5znn+zzljkQBmAz8HBoCDehxSWH0FaHdwntbjkMJoAfAX4JaDMwBs1mORRtMXgK4ANIJHGlWlwK+Aa3cBR/BIw2ou8K9hoBE80rCqAlpHAUfwSHfoceBYCHAEj3SbngUuhgQnKvB8HhivV5dffSNJcPINzypfk/UAk/T68qevAleSBCdf8NwH/Ajo82voAe7XK8yPNqcw4uQLnhrgnSHXcETw5Ed1wOkUwck1PN8FztzlGgRPHrQY6EwDnFzBMwF4aYRrKBh4SmMEz7ccoCirAvgTsImYpOuJ0dYDEU9UbgWWxeWBj4kRPAMRvrYngTfjBE7cRp6o6ingb8DUuN3YGL3brOoZYEscwRE82dUTwJ+JcbZY8GRH1cCrwPQ436TgybweAv4BzIr7jQqezGos8DKwpBhuVvBkPnpdVCw3K3gyr5uCR5IEjyR4JMEjCR5JEjyS4JEEjyR4JMEjSYJHEjyS4JEEjyR4JEnwSIJHEjyS4JEkwSMJHknwSIJHEjySJHgkwSMJHknwSJLgkQSPJHgkwSMJHkkSPJLgkQSPRMyrd0pSWI0HyoFaYJngkUaalcqxHmarHJiVwHysJcJpwSMlNAurXr8MeBSoBJYzfAuEDsFTvNNPhY8kK4H1WPHxB4GSkN/RKXjir3HAAz6i1GIdlauBucDENL63S/DET3OABVin59VYe8rKDLduGgAaBE9ha4KDsQRY65/5wGey/HM/BtoFDwXTL3UCMMMjnxr/82EfaSbk+Pq6gVOCJ3q65WHyXGAhsMZhqfJoKAqdA/cB1wRP9PQAsN2nnrKIXuP7oAxzVMPotRG+vj7gQ7S3lXF9GvH+7plQA3BE8GQnTB4X83vchjZG09ZEBjcJq32qWeIL3bjqEvAfwZOc7vXF67JA9FPtI83EInoOu4FOwXN33fA/y7Bk2yofUSodnMlF/nz+HlzTCZ7b9SLwYyyfUq7HcZtOAm8gM9iwelKPYFj9EzgeV3gG9H6z8kx7gHbgZWJsQ71H75qMbHgCbcAeoBE47H9PXOCZ6CFxtUc+dcA6vfukdBE4CjRjib96h+YMcDPMF5RQGF7aeZjzbT22k1yFbRqOFwOhdNOnn4MebjcCB3xUuZbql0YRnhnAUsx4vRFY4dHPdDGQ1PRzwEeSncB+oAu4kMkfkm94JmH5lKqAR2UJlmcZKwZC6YKPIE3++a9PR8ezHUSU5DhLW+5wfNannxrMdK3pJ5yuAh8BHdjOdouvWU4A/bm+mJIs+1IWYcc3NjJol5wsBkLrhEc/LT6idPhU1B+FiyvJYPTzkEc/a3z6mR/zTcJsTkM/AXY4PCeieqGpwDMWc+ev8BA5YZGcTe69tHHUEf9FvEUMz6p/Dfi9QMnqL/R44HLcqmTcAzwncBjJvD6gKhl31zpf00im80AvsBc7UdAGvIIlNAXPEH29iPeQbmD5ky4PkxOw9HB7lva6Rp47NRN4iuLZTT7jYXIj8IGHyT3AuRH+3X0FsuWTc3g2evgdZ70OvOvTUJcD9Klm5/Th+WIRPI/fAm8Ji1F1P1AeFp7JPvJQBEZ36c7UwTxstyDo6Z4SFp5V/gVSvDXWB4rl2G5BNXa0aAFWOSyo5tIkQvQxETQzHcOsB+8DjwFf0vtPSpOxjelqrJZPjYMzI0RUHbrEymPkP/mWCJPrMYtku/9/4rjMbMEz6qhS4Z91PptU+nSUSvrlUBh4pmD2iVyGyWcdjn0eKtdj/pSPVRY4NChTsXqDVVhitwqrvDEtQz+jNcwDX46djCSLVRd63ZeyB3O9tThAN8RBKE3zNWlNoO5gpa9TsmGquwLsCwNPRQazytexXeNOzB7Z4iPMYeVTSKZAZYVPNwlP93IsB5er0bcHOBHmh9WlsU457XC0YmamZswJd14MjDhtXwlMP7N8+lkMfM6nn3nk94x8K3AuDDxLCW+67vF1Sgvmp20DPtGoQrJFKp/HXJerMW/PzIhte3wQZpF57zBntq/5VNPlI0qjA3OSkGd+pGE1G/h1hK/velh4pvmn10eR/Z5T6cbOAF3Wuy46HcJya6PCcwnb0zrh6xdJ2p5Yk40Gz2Vfu0hSIgh6HTVrk1KcsnYKHikV/RvbUxQ8UtJR1quox6iUgnYMXf8KHinsqPMKQ5K92om+XWf1CLiFJXs/whLABzBXQyOyMTBSWuIUxVuipd0jqWZst6BvtCPPgmdQLVgmPe7Tz7HAaLID2488Qgr2F8EzqD+QRok1otlE5Qy2/7jLfznqsd2CPvJU6CDKczVp9I/aUuD334cl8ZoYtOm2Yq6GW1GpkkFEz59NSWPOfxGrulUo6ndQOjALzF4GN6sHolxiJQqgTMMcdCswz0sd5ntJRb/04ZwIn5FPmOoa/LPXI6ILhVafJ9eajlksqzHHfxVmUJtB+v7c94DfROx+z/gCtgkre9vmC9zzUSv4VBrBE5sLGWz1XOf/XUHmE5rngRcYtHySpwKV3Zine6+vVbo9AiKOlcEyCcp0Bp3+6zGvbjm5KXr5ixzbTa759NPin92+oD1OgZrqSnNsr1wQqGNYg50AmE7u/bnvAC+RvdMNeEh8xNdTDQ5MZ5zM/yVZNHEvxBqcJY6HLMWOtubbyH0O2IBZaslC85RnfYTZ74ta4lwBIRPTzxxf0FYyWHP5QawUR9T0A6JtMI8tPCWB6Wedr1ESNZcLoTfEW8DTFFHpt3zCMwU7YJY477wSO504uwDtHGexQ3Nteu3Zzav8FHjTF3j9WNay0D/P6dVmP9p6HvhZzO7zDeCPet1paTyW2a/1iLmy5C4tjOqxc9HEqPnHJmwfSCKpxjMLsO2fWl+6LA7sIR4bOvI8HjNwrgPfEziEKVC5xKPkDR45VzBye/DOofB8k3gV3X4B2CY2GJqDmxHYJ1yN5eHKkux71hWEZ74P73HQJ8D3ga2oQthcH0XWerRc6+863S2gtiA8T2Sw5Fg+9S7wQ2yjsdg0FdvySWT2q30ZMpPMG+8agvA8Q2F3792NWUm3Ei876UjTT5mPJIkmeZU+0mS7nvRJoLs0sLJeU4DHQ9oxE/d27JjIjRinVMoCVpVEP/myPLXdbANOJ+CpdoCiqnOesGwN9NrsiHHZl1keJlcDj/iIsjxCy4p64GYCnk0R8+f2MNi5dxfmzT1MPBuhjcMstCsD/VkXepg8JsI1eij1z5o85mFOYfaF3YHay3n352YRlDkeGtd5qFzt65SJBXIPp/wXm1Jsk3MpufPndjssOx2WdjJ0jojopvW/7SNKwtc0qYDvZw/ecbkU2zWfk6VCz4d8ndKAdcc7XCj+3Azqy0TPZJ+OtgVX8etI/xRCf2A4awocjD+D1TWkiDeevxOj+zkHvB28uWUpfMlxH1UafBg74NHQRaSgarFkXVz0HtZA5v/wLA5REbXLI58PfWQ5lJj3JIqpoe+WYMQ7FJ4rHukkinLv8gXtKQrrOG4UNAmzvBKjYpZvD52TG4HXfGHb5IvaS3r3aesR4tVf/a9Do+JSCntPK8ranKV2RbnUaSyTXw/8TvV5yFkycEOBXfNFLJPfHOglfxwrBqXiTjlUJbntjkgKJfRO+jJlr0fLjT7SXFVlsPzqUaLVZrsXS6U0YttAHVim/5KKO0UTHvJYIawds03UOyy92Tj6LHjIikmrKofrlJPYZnKDr1easMZ511XciYL04lRkyS15FMu37PFRpQ1LrVxVcad46GEyU+DhrK9Tmh2UfQ5On4o7xVeLUyyq2esjSqtHQB3YxvINFXcqHi1kdAPcUYdjt4fJia7P/agyWFFrEXca9YMbywkHwiUVd5KG/jK+hu08N2JuyYM+JcXOf/0/WlsPbMDEw7wAAAAASUVORK5CYII=) center/contain no-repeat;vertical-align:-.16em;margin:0 .25em}.s-product-card-price{align-items:center!important;line-height:1!important;font-size:clamp(18px,1.4vw,22px)!important}'
    +'@media(min-width:1100px){.container{max-width:min(1560px,94vw)!important}}'
    +'@media(min-width:600px) and (max-width:1099px){.container{padding-left:18px!important;padding-right:18px!important}}';
  function clean(d){
    if(!d.getElementById('zx-css')){
      var st=d.createElement('style');st.id='zx-css';st.textContent=XCSS;d.head.appendChild(st);
      var l=d.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700;800;900&family=Noto+Sans+Arabic:wght@400;600;700;800&display=swap';d.head.appendChild(l);
    }
    var tw=d.createTreeWalker(d.body,4,null),n,t,c;
    while((n=tw.nextNode())){var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName))continue;t=n.nodeValue;if(!t)continue;c=cl(t);if(c!==t)n.nodeValue=c}
    var hits=[],tw2=d.createTreeWalker(d.body,4,null),m;while((m=tw2.nextNode())){if(m.nodeValue.indexOf('ر.س')>-1&&m.parentNode&&!/^(SCRIPT|STYLE|TEXTAREA|OPTION|TITLE)$/.test(m.parentNode.nodeName))hits.push(m)}
    hits.forEach(function(n){var parts=n.nodeValue.split('ر.س'),fr=d.createDocumentFragment();parts.forEach(function(pt,i){if(pt)fr.appendChild(d.createTextNode(pt));if(i<parts.length-1){var ic=d.createElement('i');ic.className='zsar';ic.setAttribute('aria-label','ريال');fr.appendChild(ic)}});n.parentNode.replaceChild(fr,n)});
    arr(d.querySelectorAll('[placeholder],[aria-label],[title],img[alt]')).forEach(function(e){['placeholder','aria-label','title','alt'].forEach(function(a){var v=e.getAttribute(a);if(v){var c2=cl(v);if(c2!==v)e.setAttribute(a,c2)}})});
  }
  /* أسعار تجريبية (تقديرية) — هامش الربح 25% من سعر البيع */
  var PRICE={'سقيا ماء':3,'تمر الضيافة':45,'مصحف باسم من تحب':60,'وجبة إفطار':20,'مسواك الضيف':3,'سجادة صلاة':55,'كرسي صلاة قابل للطي':95};
  function prices(d){
    arr(d.querySelectorAll('.s-product-card-entry')).forEach(function(c){
      var t=c.querySelector('.s-product-card-content-title'),p=c.querySelector('.s-product-card-price');if(!t||!p)return;
      var k=key(t.textContent),v=null;Object.keys(PRICE).forEach(function(n){if(key(n)===k)v=PRICE[n]});
      if(v==null)return;if(p.getAttribute('data-zp')!==String(v)){p.setAttribute('data-zp',String(v));p.textContent=v+' ر.س'}
    });
  }
  /* كروت القسم السفلي (وصل حديثا) بشكل مختلف عن قوس البوتيك */
  function altCards(d){
    arr(d.querySelectorAll('h1,h2,h3')).forEach(function(h){
      if(norm(h.textContent)!=='وصل حديثا')return;
      var sec=h.closest('section')||h.parentElement.parentElement;if(!sec)return;
      arr(sec.querySelectorAll('.s-product-card-entry')).forEach(function(c){if(!c.classList.contains('zalt'))c.classList.add('zalt')});
    });
  }
  var KASH={"\u062a\u0633\u0648\u0642 \u062d\u0633\u0628 \u0627\u0644\u0647\u062f\u064a\u0629": "\u062a\u0640\u0633\u0640\u0640\u0640\u0648\u0642 \u062d\u0640\u0633\u0640\u0640\u0640\u0628 \u0627\u0644\u0640\u0647\u0640\u062f\u064a\u0640\u0640\u0640\u0629", "\u0627\u0644\u0623\u0643\u062b\u0631 \u0637\u0644\u0628\u0627": "\u0627\u0644\u0623\u0643\u0640\u062b\u0640\u0640\u0640\u0631 \u0637\u0640\u0644\u0640\u0628\u0640\u0640\u0640\u0627", "\u0648\u0635\u0644 \u062d\u062f\u064a\u062b\u0627": "\u0648\u0635\u0640\u0640\u0640\u0644 \u062d\u0640\u062f\u064a\u0640\u062b\u0640\u0640\u0640\u0627", "\u062b\u0644\u0627\u062b \u062e\u0637\u0648\u0627\u062a \u0648\u062a\u0648\u0635\u0644 \u0647\u062f\u064a\u062a\u0643": "\u062b\u0640\u0640\u0640\u0644\u0627\u062b \u062e\u0640\u0637\u0640\u0640\u0640\u0648\u0627\u062a \u0648\u062a\u0640\u0648\u0635\u0640\u0640\u0640\u0644 \u0647\u0640\u062f\u064a\u0640\u062a\u0640\u0640\u0640\u0643", "\u0643\u0644 \u0627\u0644\u0647\u062f\u0627\u064a\u0627": "\u0643\u0640\u0640\u0640\u0644 \u0627\u0644\u0640\u0647\u0640\u062f\u0627\u064a\u0640\u0640\u0640\u0627"};
  /* قسم الأكثر طلبا: كل الكروت تاغها «الأكثر طلبا» */
  function topTags(d){
    arr(d.querySelectorAll('h1,h2,h3')).forEach(function(h){
      if(norm(h.textContent)!=='الأكثر طلبا'||h.closest('.s-product-card-entry'))return;
      var sec=h.closest('section')||h.parentElement.parentElement;if(!sec)return;
      var cards=arr(sec.querySelectorAll('.s-product-card-entry')),Q='.s-product-card-image>:not(img):not(.ph)';
      var tpl=null;cards.forEach(function(c){tpl=tpl||c.querySelector(Q)});
      if(!tpl)tpl=d.querySelector('.s-product-card-entry '+Q);if(!tpl)return;
      cards.forEach(function(c){
        var a=c.querySelector('.s-product-card-image');if(!a)return;var t=c.querySelector(Q);
        if(!t){t=tpl.cloneNode(true);a.appendChild(t)}
        if(norm(t.textContent)!=='الأكثر طلبا')t.textContent='الأكثر طلبا';
      });
    });
  }
  /* شريط «محتار وش تختار؟» المعتمد: عاجي بإطار كراميل + نصوص وشعار وأيقونة متحركة */
  var CTCSS='#zct{position:relative;overflow:hidden;direction:rtl;display:flex;align-items:center;justify-content:space-between;gap:24px;background:#f4efe6;border:2px solid #b88458;border-radius:24px;padding:30px 44px 30px 34px}'
    +'#zct::before{content:"";position:absolute;right:0;top:0;bottom:0;width:9px;background:#b88458}'
    +'#zct .tx{display:flex;align-items:center;gap:26px;min-width:0}'
    +'#zct .lg{width:clamp(90px,9vw,140px);height:auto;flex:none;animation:zctFloat 3.6s ease-in-out infinite}'
    +'#zct h3{margin:0 0 6px;font-size:clamp(26px,2.9vw,46px)!important;-webkit-text-stroke:.6px #425548;line-height:1.6;font-weight:900!important;text-align:right;background:linear-gradient(100deg,#425548 40%,#b88458 50%,#425548 60%);background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:zctShine 4s linear infinite}'
    +'#zct p{margin:0;display:grid;font-size:clamp(14px,1.25vw,18px);line-height:1.9;color:#6b756e;text-align:right}'
    +'#zct p span{grid-area:1/1;animation:ztrA 7s ease-in-out infinite}#zct p span.alt{animation-name:ztrB;color:#b88458}'
    +'#zct .bt{position:relative;flex:none;display:inline-flex;align-items:center;gap:10px;background:#425548;color:#f4efe6;border-radius:999px;padding:15px 32px;font-size:clamp(15px,1.2vw,18px);font-weight:800!important;cursor:pointer;text-decoration:none;white-space:nowrap;transition:background .25s,translate .25s;animation:zctPulse 2.4s ease-out infinite}'
    +'#zct .bt:hover{background:#b88458;translate:0 -3px}'
    +'#zct .bt svg{width:1.4em;height:1.4em;fill:currentColor;stroke:none;flex:none;transform-origin:50% 60%;animation:zctRing 2.4s ease-in-out infinite}'
    +'@keyframes zctFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}'
    +'@keyframes zctShine{from{background-position:120% 0}to{background-position:-140% 0}}'
    +'@keyframes zctPulse{0%{box-shadow:0 0 0 0 rgba(66,85,72,.45)}70%,100%{box-shadow:0 0 0 16px rgba(66,85,72,0)}}'
    +'@keyframes zctRing{0%,60%,100%{transform:rotate(0)}10%,30%,50%{transform:rotate(-14deg)}20%,40%{transform:rotate(14deg)}}'
    +'@media(max-width:760px){#zct{flex-direction:column;text-align:center;padding:26px 20px}#zct .tx{flex-direction:column;gap:12px}#zct h3,#zct p{text-align:center}}'
    +'@media (prefers-reduced-motion:reduce){#zct .lg,#zct h3,#zct .bt,#zct .bt svg,#zct p span{animation:none}#zct h3{color:#425548;background:none}#zct p span.alt{display:none}}';
  function cta(d){
    var z=d.getElementById('zct');
    if(z){if(z.__old&&z.__old.isConnected){if(z.__old.style.display!=='none')imp(z.__old,'display','none');return}z.remove()}
    var hd=arr(d.querySelectorAll('h1,h2,h3,h4,h5,b,strong,div,p,span')).filter(function(e){return !e.children.length&&!e.closest('#zct')&&norm(e.textContent)==='محتار وش تختار؟'})[0];
    if(!hd)return;
    var C=hd.parentElement,btn=null;
    while(C&&C!==d.body){btn=arr(C.querySelectorAll('a,button')).filter(function(e){return norm(e.textContent)==='تواصل معنا'})[0];if(btn)break;C=C.parentElement}
    if(!C||C===d.body||!btn||!C.parentElement||C.getBoundingClientRect().height>420||C.querySelector('.s-product-card-entry'))return;
    if(!d.getElementById('zct-css')){var st=d.createElement('style');st.id='zct-css';st.textContent=CTCSS;d.head.appendChild(st)}
    z=d.createElement('div');z.id='zct';
    z.innerHTML='<div class="tx"><img class="lg" src="img/logo-olive.svg" alt="زاد الضيف"><div><h3>مـحـتـــار وش تـخـتـــار؟</h3><p><span>كلمنا على واتساب ونساعدك تختار الهدية والكمية المناسبة</span><span class="alt">اختر هديتك واترك الباقي علينا</span></p></div></div>'
      +'<a class="bt"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>تواصل معنا</a>';
    C.parentElement.insertBefore(z,C);imp(C,'display','none');z.__old=C;
    z.querySelector('.bt').onclick=function(){try{btn.click()}catch(e){}};
  }
  /* قسم «وصل حديثا»: عارض بالسحب — منتج كبير بالوسط وجيرانه على الأطراف وتحته كرت أبيض */
  var SWCSS='#zsw{position:relative;direction:rtl;border-radius:34px;background:radial-gradient(circle at 50% 30%,#627b68 0,#425548 58%);padding:26px 16px 30px;overflow:hidden;user-select:none;-webkit-user-select:none}'
    +'#zsw .tabs{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:4px 0 18px;position:relative;z-index:5}#zsw .tabs a{cursor:pointer;border:1.5px solid rgba(244,239,230,.45);color:#f4efe6;border-radius:999px;padding:9px 22px;font-size:clamp(13px,1.1vw,16px);transition:background .25s,color .25s,border-color .25s}#zsw .tabs a:hover{border-color:#e6c9a8;color:#e6c9a8}#zsw .tabs a.on{background:#b88458;border-color:#b88458;color:#fff}'
    +'#zsw .st{position:relative;height:clamp(265px,30vw,395px);touch-action:pan-y;cursor:grab}#zsw .st.grab{cursor:grabbing}'
    +'#zsw .pi{position:absolute;left:50%;top:50%;width:clamp(245px,28vw,385px);height:clamp(245px,28vw,385px);margin:calc(clamp(245px,28vw,385px)/-2) 0 0 calc(clamp(245px,28vw,385px)/-2);display:grid;place-items:center;transition:transform .55s cubic-bezier(.2,.8,.2,1),opacity .45s;will-change:transform}'
    +'#zsw .st.grab .pi{transition:none}'
    +'#zsw .pi img{max-width:100%;max-height:100%;object-fit:contain;pointer-events:none;-webkit-user-drag:none}#zsw .pi.on img{filter:drop-shadow(0 26px 18px rgba(0,0,0,.4))}'
    +'#zsw .pi.on img{animation:zswBob 3.8s ease-in-out infinite}@keyframes zswBob{0%,100%{translate:0 0}50%{translate:0 -9px}}'
    +'#zsw .cd{position:relative;z-index:3;width:min(470px,94%);margin:-46px auto 0;background:#fff;border-radius:30px;padding:54px 30px 26px;text-align:center;box-shadow:0 30px 40px -28px rgba(0,0,0,.6)}'
    +'#zsw .cd>*{transition:opacity .3s,transform .3s}#zsw .cd.sw>*{opacity:0;transform:translateY(12px)}'
    +'#zsw .pr{display:flex;align-items:center;justify-content:center;gap:.2em;font-size:clamp(30px,3vw,42px);font-weight:900!important;color:#2e3a33;line-height:1.3;margin:0 0 6px}#zsw .pr .zsar{width:.7em;height:.78em;margin:0}'
    +'#zsw h4{margin:0 0 8px;font-size:clamp(22px,2.2vw,30px)!important;font-weight:900!important;line-height:1.6;color:#2e3a33;text-align:center}'
    +'#zsw p{margin:0 0 22px;font-size:clamp(14px,1.2vw,16px);line-height:2;color:#7a837c;text-align:center}'
    +'#zsw .go{display:block;text-align:center;background:#2e3a33;color:#fff;border-radius:999px;padding:16px;font-size:17px;font-weight:800!important;cursor:pointer;transition:background .25s,translate .2s}#zsw .go:hover{background:#b88458;translate:0 -2px}'
    +'#zsw .dots{display:flex;gap:8px;justify-content:center;margin-top:20px;direction:ltr}#zsw .dots i{width:9px;height:9px;border-radius:9px;background:rgba(244,239,230,.35);cursor:pointer;transition:width .3s,background .3s}#zsw .dots i.on{width:30px;background:#b88458}'
    +'#zsw .nv{position:absolute;top:clamp(190px,19vw,260px);z-index:4;width:48px;height:48px;border-radius:50%;border:1px solid rgba(244,239,230,.4);background:rgba(46,58,51,.35);color:#f4efe6;display:grid;place-items:center;cursor:pointer;padding:0}#zsw .nv:hover{background:#b88458;border-color:#b88458}#zsw .nv.l{left:18px}#zsw .nv.r{right:18px}'
    +'#zsw .nv svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}'
    +'@media(max-width:760px){#zsw .nv{display:none}}@media (prefers-reduced-motion:reduce){#zsw .pi.on img{animation:none}}';
  var SWCATS=['الكل','سقيا وضيافة','مصاحف وعبادة','مستلزمات الحاج','أطقم وهدايا'];
  var SWP=[
    ['سقيا ماء','كرتون مياه لضيوف الرحمن',3,'water',1],['عبوة ماء زمزم','عبوة خفيفة يعبي فيها الضيف ماء زمزم',5,'zamzam',1],['تمر الضيافة','علبة تمر باسمك أو باسم من تحب',45,'dates',1],['وجبة إفطار','وجبة متكاملة مرتبة',20,'meal',1],
    ['قرآن كريم','مصحف يهدى لضيف الرحمن',40,'quran',2],['مصحف باسم من تحب','مصحف مع كتابة الاسم',60,'quran-brown',2],['سجادة صلاة','رفيقة الصلاة والسكينة',55,'rugs',2],['سبحة الضيف','سبحة تبقى مع الضيف وتذكره بالدعاء',10,'misbaha',2],['مسواك الضيف','مسواك مغلف بعناية',3,'miswak',2],
    ['مظلة الحاج','مظلة تظلل الحاج في طريقه',25,'umbrella',3],['مستلزمات الحجاج','كل اللي يحتاجه الحاج في طريقه',65,'supplies',3],['كرسي صلاة قابل للطي','راحة أثناء الصلاة',95,'chair',3],['كرسي متحرك','عون لكبار السن من ضيوف الرحمن',450,'wheelchair',3],
    ['طقم إحرام','طقم إحرام كامل بحقيبته',85,'ihram',4],['طقم مصاحف الضيف','ثلاثة مصاحف بألوان مختلفة تهدى لضيوف الرحمن',165,'quran-trio',4],['كيس هدايا زاد الضيف','هدية مرتبة بكيس زاد الضيف',35,'bag',4]];
  window.__zSWP=SWP;window.__zSWCATS=SWCATS;
  window.__zOpen=function(n){try{var d=f.contentDocument,w=f.contentWindow,x=SWP.filter(function(p){return p[0]===n})[0];if(!x)return;
    w.__zprod={t:x[0],s:x[1],p:String(x[2]),i:'img/cut/'+x[3]+'.png'};try{w.sessionStorage.setItem('zprod',JSON.stringify(w.__zprod))}catch(e){}
    if((w.location.hash||'')!=='#product')w.location.hash='product';zsync(d,w);w.scrollTo(0,0)}catch(e){}};
  function swiper(d,w){
    var h=arr(d.querySelectorAll('h1,h2,h3')).filter(function(e){return (e.__zswH||norm(e.textContent)==='وصل حديثا')&&!e.closest('.s-product-card-entry')})[0];if(!h)return;
    var sec=h.closest('section')||h.parentElement.parentElement;if(!sec)return;
    var cards=arr(sec.querySelectorAll('.s-product-card-entry'));if(!cards.length)return;
    var grid=cards[0].parentElement,z=sec.querySelector('#zsw');
    if(z){if(z.__grid===grid){if(grid.style.display!=='none')imp(grid,'display','none');return}z.remove()}
    if(!h.__zswH){h.__zswH=1;var tn=arr(h.childNodes).filter(function(n){return n.nodeType===3&&n.nodeValue.trim()})[0];if(tn)tn.nodeValue='كل الهدايا'}
    var allCards=arr(d.querySelectorAll('.s-product-card-entry'));
    var ALL=SWP.map(function(x){var c=allCards.filter(function(k){var t=k.querySelector('.s-product-card-content-title');return t&&key(norm(t.textContent))===key(x[0])})[0]||null;
      return {c:c,n:x[0],s:x[1],p:String(x[2]),i:'img/cut/'+x[3]+'.png',g:x[4]}});
    if(!d.getElementById('zsw-css')){var st0=d.createElement('style');st0.id='zsw-css';st0.textContent=SWCSS;d.head.appendChild(st0)}
    z=d.createElement('div');z.id='zsw';z.__grid=grid;
    z.innerHTML='<div class="tabs">'+SWCATS.map(function(t,i){return '<a data-g="'+i+'"'+(i?'':' class="on"')+'>'+t+'</a>'}).join('')+'</div>'
      +'<button class="nv r" aria-label="السابق"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button><button class="nv l" aria-label="التالي"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>'
      +'<div class="st"></div><div class="cd"><div class="pr"><span></span><i class="zsar"></i></div><h4></h4><p></p><a class="go">أضف للسلة</a></div><div class="dots"></div>';
    grid.parentElement.insertBefore(z,grid);imp(grid,'display','none');
    var IT=ALL,N=IT.length,cur=0,st=z.querySelector('.st'),dotsBox=z.querySelector('.dots'),pis=[],dots=[],cd=z.querySelector('.cd'),drag=null,off=0,timer,moved=0;
    function build(g){IT=g?ALL.filter(function(x){return x.g===g}):ALL;N=IT.length;cur=0;off=0;
      st.innerHTML=IT.map(function(x){return '<div class="pi"><img src="'+x.i+'" alt=""></div>'}).join('');pis=arr(st.querySelectorAll('.pi'));
      dotsBox.innerHTML=IT.map(function(){return '<i></i>'}).join('');dots=arr(dotsBox.children);dots.forEach(function(x,i){x.onclick=function(){go(i)}});
      st.classList.add('grab');place();void st.offsetWidth;st.classList.remove('grab');
      cd.classList.add('sw');w.setTimeout(function(){fill();cd.classList.remove('sw')},200);auto()}
    function rel(i){var r=((i-cur)%N+N)%N;if(r>N/2)r-=N;return r}
    function place(){var gap=Math.min(st.clientWidth*.42,430);pis.forEach(function(p,i){var r=rel(i),x=-r*gap+off,ax=Math.abs(x),a=Math.min(1,ax/gap),sc=1-.42*a,vis=ax<gap*1.5;
      var jump=p.__r!=null&&Math.abs(r-p.__r)>1.5;if(jump)p.style.transition='none';
      p.style.transform='translateX('+x+'px) scale('+sc+')';p.style.opacity=vis?String(1-.55*a):'0';p.style.pointerEvents=vis?'':'none';p.style.zIndex=r===0?2:1;p.classList.toggle('on',r===0&&!drag);
      if(jump){void p.offsetWidth;p.style.transition=''}p.__r=r});
      dots.forEach(function(x,i){x.classList.toggle('on',i===cur)})}
    function fill(){var x=IT[cur];if(!x)return;cd.querySelector('.pr span').textContent=x.p;cd.querySelector('h4').textContent=x.n;cd.querySelector('p').textContent=x.s;cd.querySelector('.go').textContent=x.c?'أضف للسلة':'اطلب الآن'}
    function go(k){cur=((k%N)+N)%N;off=0;place();cd.classList.add('sw');w.setTimeout(function(){fill();cd.classList.remove('sw')},260);auto()}
    function auto(){w.clearInterval(timer);if(N<2)return;timer=w.setInterval(function(){if(!z.isConnected){w.clearInterval(timer);return}if(!drag)go(cur+1)},5200)}
    st.addEventListener('pointerdown',function(e){drag={x:e.clientX};moved=0;st.classList.add('grab');try{st.setPointerCapture(e.pointerId)}catch(_){}w.clearInterval(timer)});
    var raf=0;st.addEventListener('pointermove',function(e){if(!drag)return;off=e.clientX-drag.x;moved=Math.max(moved,Math.abs(off));if(!raf)raf=w.requestAnimationFrame(function(){raf=0;if(drag)place()})});
    function end(){if(!drag)return;var dx=off;drag=null;st.classList.remove('grab');if(Math.abs(dx)>50&&N>1)go(cur+(dx>0?1:-1));else{off=0;place();auto();if(moved<6)open()}}
    st.addEventListener('pointerup',end);st.addEventListener('pointercancel',end);st.addEventListener('lostpointercapture',end);w.addEventListener('blur',end);
    function open(){var x=IT[cur];if(!x)return;
      try{w.__zprod={t:x.n,s:x.s,p:x.p,i:x.i};w.sessionStorage.setItem('zprod',JSON.stringify(w.__zprod))}catch(e){}
      var l=x.c&&(x.c.querySelector('a.s-product-card-image')||x.c.querySelector('a'));if(l)l.click();
      try{w.__zprod={t:x.n,s:x.s,p:x.p,i:x.i};w.sessionStorage.setItem('zprod',JSON.stringify(w.__zprod))}catch(e){}
      zsync(d,w);if((w.location.hash||'')!=='#product')w.location.hash='product';w.scrollTo(0,0)}
    z.querySelector('.nv.l').onclick=function(){go(cur+1)};z.querySelector('.nv.r').onclick=function(){go(cur-1)};
    arr(z.querySelectorAll('.tabs a')).forEach(function(a){a.onclick=function(){arr(z.querySelectorAll('.tabs a')).forEach(function(o){o.classList.toggle('on',o===a)});build(+a.getAttribute('data-g'))}});
    cd.querySelector('.go').onclick=function(){var x=IT[cur],b=x&&x.c&&(x.c.querySelector('[data-add]')||x.c.querySelector('button:not(.s-product-card-wishlist-btn)'));if(b)b.click();else open()};
    cd.querySelector('h4').style.cursor='pointer';cd.querySelector('h4').onclick=open;
    w.addEventListener('resize',place);
    build(0);
  }
  (function(){var sc=document.createElement('script');sc.src='zad-chat.js';document.head.appendChild(sc)})();
  /* تمديد العناوين (كشيدة) بشكل آلي: مدتين قبل آخر حرف متصل في كل كلمة */
  function kash(t){var NJ='ادذرزوةىءأإآؤ',T='ــ';
    return (t||'').split(' ').map(function(wd){if(wd.replace(/[^ء-ي]/g,'').length<3||wd.indexOf('ـ')>-1)return wd;
      for(var i=wd.length-2;i>=0;i--){var a=wd[i],b=wd[i+1];if(!/[ء-ي]/.test(a)||!/[ء-ي]/.test(b))continue;if(NJ.indexOf(a)>-1)continue;if(a==='ل'&&'اأإآ'.indexOf(b)>-1)continue;return wd.slice(0,i+1)+T+wd.slice(i+1)}
      return wd}).join(' ')}
  /* صفحة المنتج المعتمدة: قالب «المجلة» — اسم المنتج كبير شفاف يمشي ورا الصورة والمنتج يطفو */
  var PHCSS='.zph .gallery{position:relative!important;display:grid!important;place-items:center!important;min-height:clamp(300px,36vw,500px)!important;overflow:hidden!important;padding:26px 0 64px!important;width:100%!important;max-width:none!important;background:#fbf8f3!important;border:1px solid #e6ded1!important;border-radius:30px!important}'
    +'.zph .gallery .main-img{position:relative!important;z-index:2!important;background:transparent!important;border:0!important;box-shadow:none!important;width:min(58%,470px)!important;height:auto!important;aspect-ratio:auto!important;overflow:visible!important;display:grid!important;place-items:center!important;margin:0 auto!important}'
    +'.zph #mainImg{position:static!important;width:100%!important;height:auto!important;max-height:clamp(240px,30vw,420px)!important;object-fit:contain!important;padding:0!important;background:transparent!important;filter:drop-shadow(0 30px 20px rgba(0,0,0,.36));animation:zphBob 4s ease-in-out infinite}'
    +'@keyframes zphBob{0%,100%{translate:0 0;rotate:-1.5deg}50%{translate:0 -14px;rotate:1.5deg}}'
    +'.zph .thumbs{position:absolute!important;z-index:3!important;bottom:12px!important;left:0!important;right:0!important;display:flex!important;justify-content:center!important;gap:8px!important;margin:0!important}.zph .thumbs>*{width:46px!important;height:46px!important;border-radius:12px!important;background:#fff!important;border:1px solid #e6ded1!important;overflow:hidden;flex:none}.zph .thumbs>.on{border-color:#b88458!important}'
    +'.zph .pd-info>h1{font-size:clamp(28px,3.4vw,46px)!important;line-height:1.5!important;margin:0 0 4px!important}'
    +'.zph .pd-info>.product-entry__sub-title{color:#b88458!important;font-size:clamp(14px,1.3vw,18px)!important}'
    +'.zph .pd-price{font-size:clamp(34px,3.6vw,52px)!important;color:#b88458!important;display:flex!important;align-items:center;line-height:1.2!important}'
    +'.zpbg{position:absolute;inset:0;z-index:1;display:none;align-items:center;direction:ltr;overflow:hidden;pointer-events:none}'
    +'.zpbg div{display:flex;flex:none;white-space:nowrap;animation:zphRun 13s linear infinite;will-change:transform}'
    +'.zpbg span{flex:none;padding:0 .35em;font-size:clamp(80px,15vw,210px)!important;font-weight:900!important;line-height:1.3;color:rgba(66,85,72,.07);-webkit-text-stroke:2px rgba(66,85,72,.55);direction:rtl}'
    +'@keyframes zphRun{from{transform:translateX(-50%)}to{transform:translateX(0)}}'
    /* ٤ مجلة — سقيا وضيافة */
    +'.zph.m4 .pd{display:block!important}.zph.m4 .zpbg{display:flex}'
    +'.zph.m4 .pd-info{display:grid!important;grid-template-columns:1fr auto!important;column-gap:26px!important;align-items:center!important;padding:20px 8px 0!important;max-width:none!important;width:100%!important}'
    +'.zph.m4 .pd-info>*{grid-column:1/-1}.zph.m4 .pd-info>h1{grid-column:1!important;grid-row:1;text-align:right!important}'
    +'.zph.m4 .pd-info>.product-entry__sub-title{grid-column:1!important;grid-row:2;margin:0 0 6px!important}'
    +'.zph.m4 .pd-info>.pd-meta{grid-column:2!important;grid-row:1/3;display:flex!important;flex-direction:column;align-items:flex-end;gap:8px;margin:0!important}'
    +'.zph.m4 .pd-info>form,.zph.m4 .pd-info>.product-form{margin-top:18px!important;border-top:1px solid #e6ded1;padding-top:18px}'
    /* القوالب ذات العمودين */
    +'.zph.m1 .pd,.zph.m2 .pd,.zph.m5 .pd{display:grid!important;grid-template-columns:1fr 1fr!important;gap:34px!important;align-items:center!important}'
    +'.zph.m1 .pd-info,.zph.m2 .pd-info,.zph.m5 .pd-info{display:block!important;max-width:none!important}'
    /* ١ نصفين بخط مائل — مستلزمات الحاج */
    +'.zph.m1 .gallery{background:#425548!important;border:0!important;clip-path:polygon(16% 0,100% 0,100% 100%,0 100%)}.zph.m1 .gallery .main-img{width:min(64%,430px)!important;translate:5% 0}'
    /* ٢ حلقة كراميل — مصاحف وعبادة */
    +'.zph.m2 .gallery{background:transparent!important;border:0!important;overflow:visible!important}'
    +'.zph.m2 .gallery::before{content:"";position:absolute;left:50%;top:46%;width:min(74%,400px);aspect-ratio:1;border-radius:50%;background:#425548;translate:-50% -50%}'
    +'.zph.m2 .gallery::after{content:"";position:absolute;left:50%;top:46%;width:min(88%,470px);aspect-ratio:1;border-radius:50%;border:3px solid #b88458;border-left-color:transparent;translate:-50% -50%;animation:zphSpin 14s linear infinite}@keyframes zphSpin{to{rotate:360deg}}'
    +'.zph.m2 .gallery .main-img{width:min(80%,460px)!important}'
    /* ٥ مثمن البوكس — أطقم وهدايا */
    +'.zph.m5 .gallery{background:transparent!important;border:0!important;overflow:visible!important}'
    +'.zph.m5 .gallery::before{content:"";position:absolute;left:50%;top:46%;width:min(72%,390px);aspect-ratio:1;background:#425548;translate:-50% -50%;clip-path:polygon(28% 0,72% 0,100% 28%,100% 72%,72% 100%,28% 100%,0 72%,0 28%)}'
    +'.zph.m5 .gallery::after{content:"";position:absolute;left:50%;top:46%;width:min(82%,444px);aspect-ratio:1;background:#b88458;translate:-50% -50%;clip-path:polygon(28% 0,72% 0,100% 28%,100% 72%,72% 100%,28% 100%,0 72%,0 28%,28% 0,28.6% 1.4%,1.4% 28.6%,1.4% 71.4%,28.6% 98.6%,71.4% 98.6%,98.6% 71.4%,98.6% 28.6%,71.4% 1.4%,28.6% 1.4%)}'
    +'.zph.m5 .gallery .main-img{width:min(78%,450px)!important}.zph.m5 .pd-info{border-right:1px dashed #d8cdbb;padding-right:30px!important}'
    +'@media(max-width:760px){.zph.m1 .pd,.zph.m2 .pd,.zph.m5 .pd{grid-template-columns:1fr!important}.zph.m1 .gallery{clip-path:polygon(0 0,100% 0,100% 88%,0 100%)}.zph.m4 .pd-info{grid-template-columns:1fr!important}.zph.m4 .pd-info>.pd-meta{grid-column:1!important;grid-row:auto;align-items:flex-start}.zph.m5 .pd-info{border:0;padding-right:0!important}}'
    +'';
  var PHTPL={1:'m4',2:'m4',3:'m4',4:'m4'};
  function prodHero(d){
    var pg=d.querySelector('.page[data-page="product"]');if(!pg)return;
    var g=pg.querySelector('.gallery'),h1=pg.querySelector('.pd-info h1');if(!g||!h1)return;
    if(!d.getElementById('zph-css')){var st=d.createElement('style');st.id='zph-css';st.textContent=PHCSS;d.head.appendChild(st)}
    if(!pg.classList.contains('zph'))pg.classList.add('zph');
    var t=norm(h1.textContent),bg=g.querySelector('.zpbg'),gcat=1;
    SWP.forEach(function(x){if(key(x[0])===key(t))gcat=x[4]});var tp=PHTPL[gcat]||'m4';
    if(pg.__tp!==tp){['m1','m2','m4','m5'].forEach(function(c){pg.classList.toggle(c,c===tp)});pg.__tp=tp}
    arr(pg.querySelectorAll('.zpbg')).forEach(function(x){if(x!==bg||x.parentNode!==g)x.remove()});bg=g.querySelector('.zpbg');
    if(!bg){bg=d.createElement('div');bg.className='zpbg';g.insertBefore(bg,g.firstChild)}
    var sp=bg.querySelector('span'),curT=sp?sp.textContent:'';
    if(curT!==t||bg.querySelectorAll('span').length!==6){var one='<span></span><span></span><span></span>';bg.innerHTML='<div>'+one+one+'</div>';arr(bg.querySelectorAll('span')).forEach(function(x){x.textContent=t})}
  }
  /* تفاصيل صفحة المنتج ككروت متحركة: خط خطوات التنفيذ + كروت «عن المنتج» */
  var PKCSS='#zpk{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center;padding:8px 0 4px;direction:rtl}'
    +'#zpk .ln{position:absolute;top:35px;right:17%;left:17%;height:3px;background:#e0d5c3;border-radius:3px;overflow:hidden}#zpk .ln s{display:block;height:100%;background:#b88458;border-radius:3px;animation:zpkLine 2s ease-out both}@keyframes zpkLine{from{width:0}to{width:100%}}'
    +'#zpk .s{position:relative}#zpk .s span{width:56px;height:56px;border-radius:50%;background:#425548;color:#f4efe6;display:grid;place-items:center;font-size:20px;margin:0 auto 10px;border:4px solid #f4efe6;box-shadow:0 0 0 2px #b88458;animation:zpkPop .55s cubic-bezier(.2,1.6,.4,1) both}'
    +'#zpk .s:nth-child(3) span{animation-delay:.6s}#zpk .s:nth-child(4) span{animation-delay:1.2s}@keyframes zpkPop{from{scale:.3;opacity:0}to{scale:1;opacity:1}}'
    +'#zpk .s b{display:block;font-size:clamp(15px,1.3vw,18px);color:#2e3a33}#zpk .s p{margin:2px 0 0;font-size:clamp(12.5px,1.05vw,14.5px);line-height:1.8;color:#6b756e}'
    +'#zpd{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;direction:rtl;margin-top:12px}'
    +'#zpd .k{background:#fff;border:1px solid #e6ded1;border-radius:20px;padding:22px 14px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px;animation:zpdUp .6s ease-out both;transition:transform .3s,box-shadow .3s,border-color .3s}'
    +'#zpd .k:nth-child(2){animation-delay:.1s}#zpd .k:nth-child(3){animation-delay:.2s}#zpd .k:nth-child(4){animation-delay:.3s}@keyframes zpdUp{from{opacity:0;translate:0 20px}to{opacity:1;translate:0 0}}'
    +'#zpd .k:hover{transform:translateY(-6px);box-shadow:0 22px 30px -22px rgba(46,58,51,.6);border-color:#b88458}'
    +'#zpd .k i{width:54px;height:54px;border-radius:50%;background:#425548;color:#f4efe6;display:grid;place-items:center;transition:background .3s}#zpd .k:hover i{background:#b88458}'
    +'#zpd svg{width:25px;height:25px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
    +'#zpd .k b{font-size:clamp(16px,1.35vw,19px);color:#2e3a33}#zpd .k p{margin:0;font-size:clamp(13px,1.05vw,14.5px);line-height:1.85;color:#6b756e}'
    +'@media(max-width:860px){#zpd{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){#zpk{grid-template-columns:1fr;row-gap:16px}#zpk .ln{display:none}}';
  var PKI=['<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-1.5-3-5-3-5-1s3 1 5 1zm0 0c1.5-3 5-3 5-1s-3 1-5 1z"/>','<path d="M4 20l1-4.2L16.6 4.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19z"/>','<path d="M12 21s-6.5-5.6-6.5-10.5a6.500 6.500 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>','<path d="M15.5 10.2 20 7.5v9l-4.5-2.700"/><rect x="3.5" y="6.5" width="12" height="11" rx="2.5"/>'];
  function prodCards(d){
    var pg=d.querySelector('.page[data-page="product"]');if(!pg||!pg.classList.contains('on'))return;
    if(!d.getElementById('zpk-css')){var st=d.createElement('style');st.id='zpk-css';st.textContent=PKCSS;d.head.appendChild(st)}
    if(!pg.querySelector('#zpk')){
      var T=arr(pg.querySelectorAll('h2,h3,h4,h5,b,strong,div,p,span')).filter(function(e){return !e.children.length&&norm(e.textContent)==='كيف ننفذ طلبك'})[0];
      if(T){var C=T.parentElement;while(C&&C!==pg&&C.textContent.indexOf('نرسل لك مقطع')<0)C=C.parentElement;
        if(C&&C!==pg){arr(C.children).forEach(function(k){var x=k.textContent;if(k.contains(T)&&k!==C)return;if(x.indexOf('نستلم طلبك')>-1||x.indexOf('نجهز الهدية')>-1||x.indexOf('نرسل لك مقطع')>-1)imp(k,'display','none')});
          var z=d.createElement('div');z.id='zpk';
          z.innerHTML='<div class="ln"><s></s></div><div class="s"><span>1</span><b>نستلم طلبك</b><p>والاسم أو الإهداء كما كتبته</p></div><div class="s"><span>2</span><b>نجهز الهدية</b><p>ونسلمها لضيوف الرحمن في الحرم</p></div><div class="s"><span>3</span><b>نرسل لك التوثيق</b><p>مقطع فيديو على واتساب</p></div>';
          var after=T.parentElement===C?T:arr(C.children).filter(function(k){return k.contains(T)})[0];
          if(after&&after.nextSibling)C.insertBefore(z,after.nextSibling);else C.appendChild(z)}}
    }
    var ds=pg.querySelector('.desc'),dp=ds&&ds.querySelector('p');if(!ds||!dp)return;
    var txt=norm(dp.textContent),zd=ds.querySelector('#zpd');
    if(!zd){zd=d.createElement('div');zd.id='zpd';ds.appendChild(zd)}
    if(dp.style.display!=='none')imp(dp,'display','none');
    if(zd.__t!==txt){zd.__t=txt;
      var K=[['الهدية',txt],['باسمك','نكتب الاسم أو عبارة الإهداء كما تدخلها'],['التوزيع','فريقنا يسلمها لضيوف الرحمن في الحرم'],['التوثيق','يوصلك مقطع فيديو على واتساب']];
      zd.innerHTML=K.map(function(x,i){return '<div class="k"><i><svg viewBox="0 0 24 24">'+PKI[i]+'</svg></i><b>'+x[0]+'</b><p></p></div>'}).join('');
      arr(zd.querySelectorAll('p')).forEach(function(p,i){p.textContent=K[i][1]})}
  }
  /* الفوتر المعتمد: قوس أخضر + شعار يطفو + ثلاث كروت + شريط سفلي (يقرأ بيانات وروابط الفوتر الأصلي) */
  var FTCSS='#zft{position:relative;isolation:isolate;direction:rtl;background:transparent;color:#f4efe6;overflow:hidden;margin-top:46px}#zft::before{content:"";position:absolute;z-index:-1;top:0;bottom:0;left:-15%;width:130%;background:#425548;border-radius:50% 50% 0 0/clamp(170px,27vw,480px) clamp(170px,27vw,480px) 0 0}'
    +'#zft *{box-sizing:border-box}'
    +'#zft .ar{position:absolute;left:50%;top:26px;translate:-50% 0;width:min(1500px,150%);height:900px;border-radius:999px 999px 0 0;border:1.5px solid rgba(244,239,230,.07);pointer-events:none}#zft .ar.b{top:70px;width:min(1240px,124%)}'
    +'#zft .top{position:relative;text-align:center;padding:clamp(40px,5vw,70px) 20px 28px}#zft .nm{display:block;font-size:clamp(22px,2.2vw,32px);color:#f4efe6;line-height:1.6}'
    +'#zft .lg{display:block;width:clamp(86px,8vw,112px);aspect-ratio:1;border-radius:50%;border:4px solid #b88458;margin:0 auto 12px;background:#f4efe6 url(img/logo-olive.svg) center/74% no-repeat;box-shadow:0 14px 26px -14px rgba(0,0,0,.6);animation:zftFloat 4s ease-in-out infinite;cursor:pointer}@keyframes zftFloat{0%,100%{translate:0 0}50%{translate:0 -7px}}'
    +'#zft .tg{margin:0 auto;max-width:560px;color:#cfd6cc;font-size:clamp(14px,1.2vw,17px);line-height:2}'
    +'#zft .dv{display:flex;align-items:center;justify-content:center;gap:8px;margin:16px auto 0}#zft .dv i{width:7px;height:7px;border-radius:50%;background:#b88458;animation:zftDot 1.8s ease-in-out infinite}#zft .dv i:nth-child(2){animation-delay:.2s}#zft .dv i:nth-child(3){animation-delay:.4s}#zft .dv s{width:70px;height:2px;background:#b88458;border-radius:2px;opacity:.7}@keyframes zftDot{0%,100%{opacity:.35;scale:.8}50%{opacity:1;scale:1.2}}'
    +'#zft .gr{position:relative;display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:16px;max-width:1240px;margin:0 auto;padding:0 24px}'
    +'#zft .cd{background:rgba(244,239,230,.06);border:1px solid rgba(244,239,230,.14);border-radius:24px;padding:22px 22px 20px;opacity:0;translate:0 22px;transition:opacity .6s,translate .6s,border-color .3s,background .3s}#zft.in .cd{opacity:1;translate:0 0}#zft .cd:nth-child(2){transition-delay:.12s}#zft .cd:nth-child(3){transition-delay:.24s}#zft .cd:hover{border-color:#b88458;background:rgba(244,239,230,.09)}'
    +'#zft h4{margin:0 0 14px;font-size:clamp(17px,1.4vw,20px)!important;color:#e6c9a8;display:flex;align-items:center;gap:10px}#zft h4::after{content:"";flex:1;height:1px;background:rgba(230,201,168,.3)}'
    +'#zft .lk{display:grid;grid-template-columns:1fr 1fr;gap:10px 14px}#zft .lk a{position:relative;cursor:pointer;color:#f4efe6;font-size:clamp(13.5px,1.1vw,15.5px);padding-right:16px;transition:color .25s,translate .25s}#zft .lk a::before{content:"";position:absolute;right:0;top:50%;width:7px;height:7px;margin-top:-4px;border-left:2px solid #b88458;border-bottom:2px solid #b88458;rotate:45deg}#zft .lk a:hover{color:#e6c9a8;translate:-5px 0}'
    +'#zft .ct{display:flex;flex-direction:column;gap:12px}#zft .ct div{display:flex;align-items:center;gap:12px;font-size:clamp(13.5px,1.1vw,15.5px)}#zft .ct u{width:42px;height:42px;border-radius:50%;background:#b88458;display:grid;place-items:center;flex:none;text-decoration:none}#zft .ct svg{width:20px;height:20px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}#zft .ct small{display:block;color:#cfd6cc;font-size:12px}#zft .ct b{direction:ltr;unicode-bidi:plaintext}#zft .ct{flex-direction:column;align-items:center;gap:20px}#zft .ct div{flex:1;flex-direction:column;text-align:center;gap:8px}#zft .ct div>*{text-align:center}#zft .ct u{width:54px;height:54px;margin:0 auto}#zft .ct svg{width:24px;height:24px}#zft .ct small{font-size:clamp(15px,1.2vw,17px);color:#f4efe6}#zft .ct small::after{content:"";display:block;width:38px;height:2px;border-radius:2px;background:#b88458;margin:6px auto}#zft .ct b{display:block;color:#e6c9a8}#zft .top{padding:clamp(22px,2.6vw,34px) 20px 14px}#zft .lg{width:clamp(64px,5.6vw,80px);margin-bottom:6px;border-width:3px}#zft .nm{font-size:clamp(19px,1.7vw,25px);line-height:1.4}#zft .tg{line-height:1.7;font-size:clamp(13px,1.05vw,15px)}#zft .dv{margin-top:8px}#zft .gr{align-items:stretch;gap:14px;grid-template-columns:repeat(3,1fr)}#zft .cd{display:flex;flex-direction:column}#zft .cd>h4{flex:none}#zft .cd>.lk,#zft .cd>.ct,#zft .cd>.py{flex:1;align-content:center;justify-content:center}#zft .cd>.lk{align-items:center}@media(max-width:900px){#zft .gr{grid-template-columns:1fr}}#zft .cd{padding:14px 18px 14px}#zft h4{margin-bottom:10px}#zft .lk{gap:6px 12px}#zft .ct{gap:10px}#zft .ct div{gap:4px}#zft .ct u{width:40px;height:40px}#zft .ct svg{width:19px;height:19px}#zft .ct small::after{margin:3px auto}#zft .cd.pa,#zft .cd.pa:hover{padding:clamp(30px,3.2vw,42px) 16px 16px;border-radius:200px 200px 22px 22px}#zft .cd.pa .py{gap:7px}#zft .cd.pa .py .lg3{height:42px;padding:4px 6px}#zft .cd.pa .py .lg3 img{height:30px}#zft .lg2{margin-top:12px}#zft .nt{margin-top:8px}#zft .bt{margin-top:14px;padding-top:10px;padding-bottom:10px}#zft .fl h5{margin-bottom:8px}#zft .sc a{width:38px;height:38px}#zft .sc svg{width:17px;height:17px}#zft .ar,#zft .ar.b{border:0;border-top:1.5px dotted rgba(230,201,168,.24);border-left:1.5px dotted rgba(230,201,168,.24);border-right:1.5px dotted rgba(230,201,168,.24)}html{overflow-x:clip!important}body{overflow-x:clip!important;max-width:100%!important}#zft,#zft::before,#zft .bt{border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}#zft .lg2{align-items:center}#zft .vf{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#1b2a78,#111a52);color:#fff;border-radius:999px;padding:7px 20px 7px 8px;font-size:16px;font-weight:900;box-shadow:0 6px 16px rgba(0,0,0,.3);transition:translate .25s}#zft .vf:hover{translate:0 -3px}#zft .vf i{width:36px;height:36px;border-radius:11px;background:#fff;color:#16205c;display:grid;place-items:center}#zft .vf svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;animation:zvfp 2.6s infinite}@keyframes zvfp{0%,70%,100%{transform:scale(1)}80%{transform:scale(1.25)}}#zft .fl{position:relative;margin:14px auto 0;padding:0 20px;text-align:center}#zft .sc{flex-wrap:nowrap}#zft .fl h5{margin:0 0 14px;font-size:clamp(16px,1.3vw,19px);color:#e6c9a8;font-weight:900}#zft .sc{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}#zft .sc a{width:44px;height:44px;border-radius:50%;background:#f4efe6;display:grid;place-items:center;cursor:pointer;transition:translate .25s,background .25s;animation:zscf 3s ease-in-out infinite}#zft .sc a:nth-child(2n){animation-delay:.5s}#zft .sc a:nth-child(3n){animation-delay:1s}#zft .sc svg{width:20px;height:20px;fill:#425548;stroke:none;transition:fill .25s}#zft .sc a:hover{background:#b88458;translate:0 -4px}#zft .sc a:hover svg{fill:#fff}@keyframes zscf{50%{transform:translateY(-4px)}}'
    +'#zft .py{display:flex;flex-wrap:wrap;gap:8px}#zft .py span{background:#f4efe6;color:#425548;border-radius:12px;padding:8px 14px;font-size:13px;transition:translate .25s,background .25s}#zft .py span:hover{translate:0 -3px;background:#e6c9a8}#zft .cd.pa,#zft .cd.pa:hover{background:#f4efe6;border:0;border-radius:240px 240px 24px 24px;padding:clamp(46px,5vw,64px) 20px 26px;text-align:center;box-shadow:0 0 0 3px #b88458,0 0 0 9px rgba(230,201,168,.22)}#zft .cd.pa h4{display:block;text-align:center;color:#425548;font-size:clamp(19px,1.6vw,23px)!important}#zft .cd.pa h4::after{display:block;width:64px;height:3px;border-radius:3px;background:#b88458;margin:10px auto 0;flex:none}#zft .cd.pa .py{justify-content:center}#zft .cd.pa .py span{background:#fff;border:2px solid #e6ded1}#zft .cd.pa .py span:hover{border-color:#b88458;background:#fff}#zft .cd.pa .py{gap:10px}#zft .cd.pa .py .lg3{display:inline-flex;align-items:center;gap:8px;padding:6px 8px;border-radius:12px;height:52px}#zft .cd.pa .py .lg3 img{display:block;height:38px;width:auto;border-radius:6px}#zft .cd.pa .py .lg3.bk{padding:6px 12px 6px 8px}#zft .cd.pa .py .lg3 em{font-style:normal;font-size:13px;color:#425548;white-space:nowrap}'
    +'#zft .lg2{position:relative;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:22px auto 0;padding:0 20px}#zft .lg2 span{border:1px dashed rgba(244,239,230,.3);border-radius:999px;padding:7px 18px;font-size:13px;color:#dfe5dc}'
    +'#zft .nt{position:relative;text-align:center;margin:14px 0 0;padding:0 20px;color:#cfd6cc;font-size:13px}'
    +'#zft .bt{position:relative;margin-top:26px;background:#34443a;display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;padding:14px clamp(18px,4vw,60px) 16px;font-size:13px;color:#cfd6cc}'
    +'@media(max-width:860px){#zft .gr{grid-template-columns:1fr}#zft .bt{justify-content:center;text-align:center;padding-bottom:84px}}';
  function footer(d,w){
    var ft=d.querySelector('footer');if(!ft)return;
    var z=ft.querySelector('#zft');
    if(z){arr(ft.children).forEach(function(k){if(k!==z&&k.style.display!=='none')imp(k,'display','none')});return}
    function val(label){var best=null;arr(ft.querySelectorAll('*')).forEach(function(e){var t=norm(e.textContent);if(t.indexOf(label)===0&&t.length<label.length+60&&(!best||t.length<=norm(best.textContent).length))best=e});
      if(!best)return '—';var v=norm(best.textContent).slice(label.length).replace(/^[\s:：]+/,'').trim();return v||'—'}
    var HIDE=['الرئيسية'];
    var links=arr(ft.querySelectorAll('a')).map(function(a){return {a:a,t:norm(a.textContent)}}).filter(function(x){return x.t&&x.t.length<40&&!x.a.querySelector('img,svg')&&HIDE.indexOf(x.t)<0&&!/واتساب|البريد|@|\d{5}/.test(x.t)});
    var seen={};links=links.filter(function(x){if(seen[x.t])return false;seen[x.t]=1;return true});
    var cr=val('السجل التجاري'),mw=val('موثق في المركز السعودي للأعمال'),wa=val('واتساب'),em=val('البريد');
    var rights='',salla='';arr(ft.querySelectorAll('*')).forEach(function(e){if(e.children.length)return;var t=norm(e.textContent);if(t.indexOf('جميع الحقوق')>-1)rights=t;if(t.indexOf('منصة سلة')>-1)salla=t});
    if(!d.getElementById('zft-css')){var st=d.createElement('style');st.id='zft-css';st.textContent=FTCSS;d.head.appendChild(st)}
    z=d.createElement('div');z.id='zft';
    z.innerHTML='<span class="ar"></span><span class="ar b"></span>'
      +'<div class="top"><a class="lg" role="img" aria-label="زاد الضيف"></a><b class="nm">زاد الضيف</b><p class="tg">هدايا تقدم بمحبة نجهزها ونوصلها لضيوف الرحمن نيابة عنك</p><div class="dv"><s></s><i></i><i></i><i></i><s></s></div></div>'
      +'<div class="gr"><div class="cd"><h4>روابط مهمة</h4><div class="lk"></div></div>'
      +'<div class="cd"><h4>تواصل معنا</h4><div class="ct"><div><u><svg viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/></svg></u><span><small>واتساب</small><b class="wa"></b></span></div>'
      +'<div><u><svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.500"/><path d="M4 7.500l8 6 8-6"/></svg></u><span><small>البريد</small><b class="em"></b></span></div></div></div>'
      +'<div class="cd pa"><h4>طرق الدفع</h4><div class="py"><span class="lg3" title="مدى"><img src="img/pay/mada.svg" alt="مدى"></span><span class="lg3" title="Apple Pay"><img src="img/pay/apple_pay.svg" alt="Apple Pay"></span><span class="lg3" title="Visa"><img src="img/pay/visa.svg" alt="Visa"></span><span class="lg3" title="Mastercard"><img src="img/pay/master.svg" alt="Mastercard"></span><span class="lg3 bk" title="حوالة بنكية"><img src="img/pay/genericbank.svg" alt=""><em>حوالة بنكية</em></span></div></div></div>'
      +'<div class="fl"><h5>تابعنا</h5><div class="sc"><a title="انستقرام" aria-label="انستقرام"><svg viewBox="0 0 24 24"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg></a><a title="سناب شات" aria-label="سناب شات"><svg viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/></svg></a><a title="تيك توك" aria-label="تيك توك"><svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a><a title="اكس" aria-label="اكس"><svg viewBox="0 0 24 24"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg></a><a title="يوتيوب" aria-label="يوتيوب"><svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a title="فيسبوك" aria-label="فيسبوك"><svg viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg></a></div></div>'
      +'<div class="lg2"><a class="vf"><i><svg viewBox="0 0 24 24"><path d="M12 2.800 4.500 5.600v6c0 4.600 3.100 8 7.500 9.600 4.400-1.600 7.500-5 7.500-9.600v-6z"/><path d="m8.700 12 2.400 2.400 4.300-4.600"/></svg></i>متجر موثق</a><span class="cr"></span><span class="mw"></span></div>'
      +'<p class="nt">متجر لبيع الهدايا والمنتجات وتوصيلها ولا نستقبل تبرعات</p>'
      +'<div class="bt"><span class="r1"></span><span class="r2"></span></div>';
    var lk=z.querySelector('.lk');links.forEach(function(x){var a=d.createElement('a');a.textContent=x.t;a.onclick=function(){try{x.a.click()}catch(e){}w.scrollTo(0,0)};lk.appendChild(a)});
    z.querySelector('.wa').textContent=wa;var SOC={'انستقرام':'https://www.instagram.com/zaadaldaif','سناب شات':'https://www.snapchat.com/add/zaadaldaif','تيك توك':'https://www.tiktok.com/@zaadaldaif'};arr(z.querySelectorAll('.sc a')).forEach(function(a){var su=SOC[a.getAttribute('title')];if(su){a.setAttribute('href',su);a.setAttribute('target','_blank');a.setAttribute('rel','noopener');a.onclick=function(e){e.preventDefault();e.stopPropagation();try{var pa=document.createElement('a');pa.href=su;pa.target='_blank';pa.rel='noopener noreferrer';pa.style.cssText='position:fixed;top:0;left:0;width:1px;height:1px;opacity:0';document.body.appendChild(pa);pa.click();setTimeout(function(){try{document.body.removeChild(pa)}catch(x){}},500)}catch(x){try{window.open(su,'_blank')}catch(y){}}}}});if(em==='—')em='zaadaldaif@gmail.com';var emb=z.querySelector('.em');emb.textContent=em;if(em.indexOf('@')>0){emb.style.direction='ltr';emb.style.cursor='pointer';emb.style.wordBreak='break-all';emb.onclick=function(){var o=null;try{o=window.open('mailto:'+em,'_blank')}catch(e){}if(!o){try{w.open('mailto:'+em,'_blank')}catch(e){}}}}
    z.querySelector('.cr').textContent='السجل التجاري: '+cr;z.querySelector('.mw').textContent='موثق في المركز السعودي للأعمال: '+mw;
    z.querySelector('.r1').textContent=rights||'جميع الحقوق محفوظة لـ زاد الضيف';z.querySelector('.r2').textContent=salla||'متجر على منصة سلة';
    z.querySelector('.lg').onclick=function(){w.location.hash='home';w.scrollTo(0,0)};
    ft.insertBefore(z,ft.firstChild);imp(ft,'border-radius','0');imp(ft,'overflow','hidden');imp(ft,'margin-bottom','0');arr(ft.children).forEach(function(k){if(k!==z)imp(k,'display','none')});
    imp(ft,'padding','0');imp(ft,'background','transparent');imp(ft,'border','0');imp(ft,'margin-top','0');
    try{var io=new w.IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)z.classList.add('in')})},{threshold:.15});io.observe(z)}catch(e){z.classList.add('in')}
  }
  /* قسم آراء العملاء: صفان متحركان — التقييمات تُعبأ من مصدر المتجر الحقيقي (w.ZAD_REVIEWS) ولا تُكتب هنا */
  var ZAD_REVIEWS=[]; /* كل عنصر: {name:'اسم العميل',city:'المدينة',text:'نص التقييم',stars:5,verified:true} — verified:false يخفي تاغ «مشتري موثق» */
  var RVCSS='#zrv{direction:rtl;background:transparent;padding:40px 0 20px;margin:30px 0 0;overflow:hidden;position:relative}'
    +'#zrv *{box-sizing:border-box}#zrv .hd{text-align:center;padding:0 20px 28px}'
    +'#zrv .hd small{display:block;font-size:13px;color:#b88458;margin-bottom:2px}'
    +'#zrv .hd h3{margin:0;font-size:clamp(28px,3vw,44px)!important;line-height:1.6;color:#2e3a33;-webkit-text-stroke:.5px currentColor}'
    +'#zrv .hd p{margin:4px 0 14px;font-size:clamp(14px,1.2vw,17px);color:#6b756e}'
    +'#zrv .bdg{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1px solid #e6ded1;border-radius:999px;padding:9px 20px;font-size:14px;color:#2e3a33}'
    +'#zrv .st{display:inline-flex;gap:3px;direction:ltr}#zrv .st svg{width:16px;height:16px;fill:#f2b01e}#zrv .bdg .st svg{width:16px;height:16px}'
    +'#zrv .row{position:relative;overflow:hidden;direction:ltr;padding:10px 0 16px}'
    +'#zrv .row::before,#zrv .row::after{content:"";position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none}#zrv .row::before{left:0;background:linear-gradient(90deg,#fbf8f3,rgba(251,248,243,0))}#zrv .row::after{right:0;background:linear-gradient(270deg,#fbf8f3,rgba(251,248,243,0))}'
    +'#zrv .tr{display:flex;gap:22px;width:max-content;animation:zrvL 38s linear infinite}#zrv .row.r .tr{animation-name:zrvR}#zrv .row:hover .tr{animation-play-state:paused}'
    +'@keyframes zrvL{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes zrvR{from{transform:translateX(-50%)}to{transform:translateX(0)}}'
    +'#zrv .c{position:relative;flex:none;width:360px;direction:rtl;background:#fff;border:1px solid #e6ded1;border-top:3px solid #b88458;border-radius:18px;padding:18px 20px 16px;box-shadow:0 14px 26px -22px rgba(46,58,51,.55);display:flex;flex-direction:column;transition:translate .25s,box-shadow .25s,border-color .25s}'
    +'#zrv .c:hover{translate:0 -3px;box-shadow:0 20px 30px -20px rgba(46,58,51,.6);border-color:#b88458}'
    +'#zrv .c .tp{display:flex;align-items:center;justify-content:space-between}'
    +'#zrv .c .q{font-size:44px;line-height:.7;color:#d8cdbb;font-family:Georgia,serif!important;height:20px}'
    +'#zrv .c p{margin:10px 0 14px;font-size:15px;line-height:1.9;color:#4a544c;text-align:right!important;min-height:3.8em;flex:1}'
    +'#zrv .ft{display:flex;align-items:center;gap:10px;border-top:1px solid #e6ded1;padding-top:12px}'
    +'#zrv .ft u{width:38px;height:38px;border-radius:50%;background:#425548;color:#f4efe6;display:grid;place-items:center;font-size:16px;text-decoration:none;flex:none}'
    +'#zrv .ft .nm{margin-inline-end:auto;text-align:right}#zrv .ft b{display:block;font-size:15px;color:#2e3a33}#zrv .ft small{display:block;font-size:12.5px;color:#8a8f86}'
    +'#zrv .vf{display:inline-flex;align-items:center;gap:6px;background:#e3f0fb;color:#1d7fd0;border-radius:999px;padding:6px 12px;font-size:12.5px;white-space:nowrap}#zrv .vf svg{width:15px;height:15px;flex:none}'
    +'#zrv .c.ph{border-style:solid}'
    +'@media(max-width:760px){#zrv .row.r{display:none}#zrv .c{width:86vw}#zrv .tr{animation-duration:60s;gap:14px}#zrv .row::before,#zrv .row::after{width:30px}}';
  var RVSTAR='<svg viewBox="0 0 24 24"><path d="M12 2.6l2.9 5.900 6.500.900-4.700 4.600 1.100 6.500L12 17.400l-5.800 3.100 1.100-6.500L2.600 9.400l6.500-.900z"/></svg>';
  function reviews(d,w){
    var ft=d.querySelector('footer');if(!ft||!ft.parentElement)return;
    var zx=d.getElementById('zrv');
    if(zx){if(zx.nextElementSibling!==ft)ft.parentElement.insertBefore(zx,ft);var cw=d.documentElement.clientWidth;zx.style.position='relative';zx.style.maxWidth='none';if(zx.style.width!==cw+'px')zx.style.width=cw+'px';var cl=parseFloat(zx.style.left)||0,nat=zx.getBoundingClientRect().left-cl;if(Math.abs(nat+cl)>.5)zx.style.left=(-nat)+'px';return}
    var data=(w.ZAD_REVIEWS&&w.ZAD_REVIEWS.length?w.ZAD_REVIEWS:ZAD_REVIEWS).filter(function(r){return r&&r.name&&r.text});
    var real=data.length>0,list=real?data:[0,1,2,3,4,5].map(function(){return {name:'اسم العميل',product:'اسم المنتج',city:'المدينة',text:'نص تقييم العميل يظهر هنا من تقييمات المتجر الحقيقية',stars:5,ph:1}});
    if(!d.getElementById('zrv-css')){var st=d.createElement('style');st.id='zrv-css';st.textContent=RVCSS;d.head.appendChild(st)}
    function stars(n){var o='';for(var i=0;i<Math.max(1,Math.min(5,Math.round(n||5)));i++)o+=RVSTAR;return '<span class="st">'+o+'</span>'}
    function card(r){var c=d.createElement('div');c.className='c'+(r.ph?' ph':'');c.innerHTML='<div class="tp">'+stars(r.stars)+'<span class="q">”</span></div><p></p><div class="ft"><u></u><span class="nm"><b></b><small></small></span>'+(r.verified===false?'':'<span class="vf"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1d8fe6"/><path d="M7.5 12.300l3 3 6-6.300" fill="none" stroke="#fff" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"/></svg>مشتري موثق</span>')+'</div>';
      c.querySelector('p').textContent=r.text;c.querySelector('u').textContent=r.ph?'؟':String(r.name).trim().charAt(0);c.querySelector('b').textContent=r.name;c.querySelector('small').textContent=r.city||r.product||'';return c}
    function row(items,cls){var rw=d.createElement('div');rw.className='row'+cls;var tr=d.createElement('div');tr.className='tr';var base=items.slice();while(base.length<6)base=base.concat(items);
      base.concat(base).forEach(function(r){tr.appendChild(card(r))});rw.appendChild(tr);return rw}
    var avg=real?(data.reduce(function(a,r){return a+(+r.stars||5)},0)/data.length).toFixed(1):'';
    var z=d.createElement('div');z.id='zrv';
    z.innerHTML='<div class="hd"><small>آراء عملائنا</small><h3></h3><p>كلام عملائنا بعد ما وصلت هداياهم لضيوف الرحمن</p><span class="bdg">'+stars(5)+'<span class="tx"></span></span></div>';
    z.querySelector('h3').textContent=kash('عملاؤنا يتكلمون عنا');
    z.querySelector('.tx').textContent=real?(avg+' من 5 · '+data.length+' تقييم'):'التقييمات تظهر هنا بعد ربطها بالمتجر';
    var half=Math.ceil(list.length/2),a=list.slice(0,half),b=list.slice(half);if(!b.length)b=a;
    z.appendChild(row(a,' r'));z.appendChild(row(b,''));
    ft.parentElement.insertBefore(z,ft);
  }
  /* أقسام التصنيفات بالرئيسية: بنر مقوس + منتجات القسم بشكل «القبة» في شريط يسحب */
  var CSBN={1:'img/bn/05.jpg',2:'img/bn/01.jpg',3:'img/bn/06.jpg',4:'img/bn/03.jpg'};
  var CSTX={1:'ماء وتمر ووجبات توصل لضيوف الرحمن باسمك',2:'مصاحف وسجاد وسبح ومساويك تهدى باسم من تحب',3:'كل اللي يحتاجه الحاج والمعتمر في طريقه',4:'هدايا مرتبة وجاهزة تقدم لضيوف الرحمن'};
  var CSCSS='.zcs{direction:rtl;margin:34px 0 0}.zcs *{box-sizing:border-box}'
    +'.zcs .bn{position:relative;overflow:hidden;background:#425548 left center/cover no-repeat;min-height:clamp(190px,19vw,270px);display:flex;align-items:center;justify-content:center;text-align:center;border-radius:50% 50% 22px 22px/clamp(70px,9vw,150px) clamp(70px,9vw,150px) 22px 22px}'
    +'.zcs .bn::before{content:"";position:absolute;inset:0;background:rgba(58,76,64,.72)}'
    +'.zcs .bn.np::before{background:radial-gradient(circle at 50% 0,#62796a,#425548 70%)}'
    +'.zcs .tx{position:relative;color:#f4efe6;padding:30px 20px 22px}.zcs .tx small{display:block;color:#e6c9a8;font-size:13px}'
    +'.zcs .tx h3{margin:2px 0;font-size:clamp(28px,3.2vw,48px)!important;line-height:1.5;color:#f4efe6!important;-webkit-text-stroke:.5px currentColor}'
    +'.zcs .tx p{margin:0 0 14px;color:#dcd6c9;font-size:clamp(14px,1.2vw,17px)}'
    +'.zcs .tx>*{opacity:0;translate:0 26px;transition:opacity .7s,translate .7s cubic-bezier(.2,.7,.2,1)}.zcs.in .tx>*{opacity:1;translate:0 0}.zcs.in .tx>:nth-child(2){transition-delay:.15s}.zcs.in .tx>:nth-child(3){transition-delay:.3s}.zcs.in .tx>:nth-child(4){transition-delay:.45s}'
    +'.zcs.in .tx h3{background:linear-gradient(100deg,#f4efe6 40%,#e9b787 50%,#f4efe6 60%);background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;-webkit-text-stroke:0;animation:zcsShine 4.500s linear infinite}@keyframes zcsShine{from{background-position:120% 0}to{background-position:-140% 0}}'
    +'.zcs.in .all{animation:zcsPulse 2.400s ease-out 1s infinite}@keyframes zcsPulse{0%{box-shadow:0 0 0 0 rgba(184,132,88,.6)}70%,100%{box-shadow:0 0 0 14px rgba(184,132,88,0)}}'
    +'.zcs .zc{opacity:0;translate:0 24px;transition:opacity .6s,translate .6s,box-shadow .3s}.zcs.in .zc{opacity:1;translate:0 0}.zcs.in .zc:nth-child(2){transition-delay:.1s}.zcs.in .zc:nth-child(3){transition-delay:.2s}.zcs.in .zc:nth-child(4){transition-delay:.3s}.zcs.in .zc:nth-child(5){transition-delay:.4s}.zcs.in .zc:hover{translate:0 -6px;transition-delay:0s}'
    +'.zcs .bn{border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}.zcs .all{display:inline-block;background:#b88458;color:#fff;border-radius:999px;padding:10px 30px;font-size:14.500px;cursor:pointer;transition:background .25s,color .25s,translate .25s}.zcs .all:hover{background:#f4efe6;color:#425548;translate:0 -2px}'
    +'.zcs .zg{display:flex!important;align-items:stretch;height:auto!important;min-height:0!important;gap:16px;margin-top:16px;overflow-x:auto;scroll-snap-type:x proximity;padding:4px 2px 12px;scrollbar-width:thin;scrollbar-color:#b88458 transparent;cursor:grab}'
    +'.zcs .zg{overflow-x:auto!important;overflow-y:hidden!important;max-height:none!important;padding-top:10px!important;padding-bottom:22px!important;scrollbar-width:none!important;-ms-overflow-style:none}.zcs .zg::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}.zcs .zc{flex-shrink:0!important;align-self:stretch}.zcs .zg{justify-content:center;justify-content:safe center;max-width:1560px;margin-left:auto!important;margin-right:auto!important;padding-left:16px!important;padding-right:16px!important}'
    +'.zcs .zc{flex:0 0 clamp(210px,21vw,280px);scroll-snap-align:start;background:#fff;border:1px solid #e6ded1;border-radius:22px;padding:0 12px 14px;text-align:center;display:flex!important;flex-direction:column;align-items:center;overflow:hidden;cursor:pointer;height:auto!important;min-height:0!important;transition:translate .3s,box-shadow .3s}'
    +'.zcs .zc:hover{translate:0 -6px;box-shadow:0 22px 30px -22px rgba(46,58,51,.55)}'
    +'.zcs .zc i{position:relative;display:grid;place-items:center;width:100%;height:clamp(200px,19vw,240px);margin-bottom:10px}'
    +'.zcs .zc i::before{content:"";position:absolute;left:-12px;right:-12px;bottom:0;height:64%;background:#425548;border-radius:50% 50% 0 0/100% 100% 0 0}'
    +'.zcs .zc i::after{content:"";position:absolute;left:-12px;right:-12px;bottom:0;height:4px;background:#b88458}'
    +'.zcs .zc img{position:relative;width:72%;height:74%;object-fit:contain;filter:drop-shadow(0 14px 10px rgba(0,0,0,.35));margin-top:8px;transition:scale .4s;pointer-events:none}.zcs .zc:hover img{scale:1.1}'
    +'.zcs .zc b{font-size:clamp(17px,1.4vw,20px);line-height:1.6;color:#2e3a33}.zcs .zc small{font-size:12.500px;color:#6b756e;margin-bottom:6px;min-height:2.800em;line-height:1.5}'
    +'.zcs .zpr{font-size:22px!important;line-height:1.2!important;color:#b88458;display:inline-flex!important;align-items:center;margin:6px 0 12px!important;height:auto!important}.zcs .zpr .zsar{width:.8em!important;height:.9em!important;margin:0 .25em!important}'
    +'.zcs .zad{display:block;width:100%;margin-top:auto;background:#425548;color:#f4efe6;border-radius:999px;padding:10px;font-size:14px;transition:background .25s}.zcs .zad:hover{background:#b88458}';
  var PFCSS='#zpf{direction:rtl;margin:46px 0;padding:0;box-sizing:border-box;background:#f4efe6;border-block:2px solid #e6c9a8}#zpf .bx{max-width:1320px;margin:0 auto;padding:clamp(30px,4vw,60px) 24px;text-align:center}#zpf .r{gap:clamp(20px,4vw,60px)!important}#zpf .vd{width:min(420px,74vw)!important;height:480px!important}#zpf .bx{max-width:1640px!important;width:100%!important;box-sizing:border-box!important;padding-inline:clamp(20px,4vw,70px)!important}#zpf .r{display:grid!important;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)!important;width:100%!important}#zpf .sd{gap:22px!important}#zpf .cd{padding:clamp(24px,2.6vw,38px) 22px!important;border-radius:26px!important}#zpf .cd i{width:62px!important;height:62px!important;margin-bottom:12px!important}#zpf .cd svg{width:28px!important;height:28px!important}#zpf .cd b{font-size:clamp(18px,1.7vw,25px)!important}#zpf .cd span{font-size:clamp(14px,1.15vw,17px)!important}#zpf .ld{font-size:clamp(15px,1.5vw,20px)!important}@media(max-width:800px){#zpf .r{grid-template-columns:1fr!important}}'
    +'#zpf .ld{font-size:clamp(14px,1.3vw,17px);line-height:2;margin:6px 0 0;color:#425548}'
    +'#zpf .r{display:grid;grid-template-columns:1fr auto 1fr;gap:28px;align-items:center;margin:26px 0}#zpf .sd{display:grid;gap:18px}'
    +'#zpf .cd{background:#fff;border-radius:20px;padding:18px;border:2px solid #e6ded1;transition:border-color .25s,translate .25s,opacity .6s;opacity:0;translate:0 20px}#zpf.in .cd{opacity:1;translate:0 0}#zpf .sd .cd:nth-child(2){transition-delay:.15s}#zpf .cd:hover{border-color:#b88458;translate:0 -4px}'
    +'#zpf .cd i{width:46px;height:46px;border-radius:50%;background:#b88458;color:#fff;display:grid;place-items:center;margin:0 auto 8px}#zpf .cd svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}'
    +'#zpf .cd b{display:block;color:#425548;font-size:clamp(15px,1.3vw,18px)}#zpf .cd span{font-size:13.5px;color:#5c675f}'
    +'#zpf .vd{width:min(360px,74vw);height:420px;border-radius:200px 200px 26px 26px;background:linear-gradient(170deg,#56695b,#2e3a33);position:relative;display:grid;place-items:center;box-shadow:0 0 0 4px #b88458,0 0 0 12px rgba(230,201,168,.35);overflow:hidden;cursor:pointer}'
    +'#zpf .vd video,#zpf .vd img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}'
    +'#zpf .pl{position:relative;width:78px;height:78px;border-radius:50%;background:rgba(244,239,230,.94);color:#425548;display:grid;place-items:center;animation:zpfp 1.8s infinite}#zpf .pl svg{width:32px;height:32px;fill:currentColor}'
    +'#zpf .nt{position:absolute;bottom:24px;left:0;right:0;color:#e6c9a8;font-size:14px}'
    +'#zpf .bn{display:inline-flex;background:#b88458;color:#fff;border-radius:999px;padding:13px 30px;font-size:17px;cursor:pointer;transition:translate .25s,background .25s;box-shadow:0 8px 18px rgba(0,0,0,.2)}#zpf .bn:hover{translate:0 -3px;background:#a8744a}'
    +'#zpf .vd{cursor:default}#zpf .sn{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:70px 24px 50px;opacity:0;animation:zpfs 12s infinite}#zpf .s2{animation-delay:3s}#zpf .s3{animation-delay:6s}#zpf .s4{animation-delay:9s}'
    +'#zpf .sn img{position:static!important;width:auto!important;height:auto!important;max-width:78%;max-height:52%;object-fit:contain!important;filter:drop-shadow(0 18px 22px rgba(0,0,0,.4));animation:zpff 3s ease-in-out infinite}#zpf .sn b{color:#f4efe6;font-size:clamp(17px,1.5vw,22px);text-align:center;line-height:1.7}'
    +'#zpf .sn u{text-decoration:none;background:#f4efe6;border-radius:16px;padding:18px 22px;box-shadow:0 0 0 3px #b88458,0 16px 26px rgba(0,0,0,.35);rotate:-3deg}#zpf .sn u em{display:block;font-style:normal;color:#425548;font-size:clamp(16px,1.4vw,20px);white-space:nowrap;overflow:hidden;animation:zpft 12s steps(22) infinite}'
    +'#zpf .sn svg{width:110px;height:110px;fill:none;stroke:#e6c9a8;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}#zpf .s4 path{stroke:#f4efe6;stroke-dasharray:40;animation:zpfc 12s infinite}'
    +'#zpf .rc{position:absolute;top:56px;left:50%;translate:-50% 0;display:inline-flex;align-items:center;gap:7px;background:rgba(0,0,0,.35);color:#f4efe6;border-radius:999px;padding:4px 12px;font-size:12px;white-space:nowrap}#zpf .rc i{width:8px;height:8px;border-radius:50%;background:#e02424;animation:zpfb 1s infinite}'
    +'#zpf .pg{position:absolute;left:22px;right:22px;bottom:20px;height:4px;border-radius:4px;background:rgba(244,239,230,.25);overflow:hidden}#zpf .pg i{display:block;height:100%;background:#b88458;transform-origin:right;animation:zpfg 12s linear infinite}'
    +'@keyframes zpfs{0%{opacity:0;scale:.92}3%,22%{opacity:1;scale:1}25%,100%{opacity:0;scale:1.04}}@keyframes zpff{50%{translate:0 -10px}}@keyframes zpft{0%,26%{width:0}40%,100%{width:100%}}@keyframes zpfc{0%,76%{stroke-dashoffset:40}86%,100%{stroke-dashoffset:0}}@keyframes zpfb{50%{opacity:.2}}@keyframes zpfg{from{scale:0 1}to{scale:1 1}}'
    +'#zpf .vw{display:flex;flex-direction:column;align-items:center;gap:16px}#zpf .cl{display:none;position:absolute;inset:0}#zpf .cl.on{display:block}#zpf .tb{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}#zpf .tb a{cursor:pointer;border-radius:999px;padding:8px 18px;font-size:14px;color:#425548;background:#fff;border:2px solid #e6ded1;transition:background .25s,color .25s,border-color .25s}#zpf .tb a.on{background:#425548;color:#f4efe6;border-color:#425548}#zpf .tb a:hover{border-color:#b88458}'
    +'#zpf .c2 .fn{position:absolute;left:17%;right:17%;top:92px;bottom:-30px;background:#ece5d8;border-radius:26px 26px 0 0;border:7px solid #1f2823;border-bottom:0;padding:0 10px;display:flex;flex-direction:column;gap:9px;align-items:flex-start;direction:rtl;animation:zc2u .8s cubic-bezier(.2,.8,.2,1) both}#zpf .c2 .fh{align-self:stretch;margin:0 -10px 4px;background:#f4efe6;padding:9px 12px;display:flex;align-items:center;gap:8px;border-radius:18px 18px 0 0;font-size:13px;color:#2e3a33}#zpf .c2 .fh i{width:28px;height:28px;border-radius:50%;background:#425548 url(img/logo-ivory.svg) center/74% no-repeat}'
    +'#zpf .c2 .bb{background:#fff;color:#2e3a33;border-radius:14px 4px 14px 14px;padding:8px 11px;font-size:12.500px;line-height:1.7;text-align:right;max-width:94%;box-shadow:0 2px 6px rgba(0,0,0,.1);opacity:0;animation:zc2b .5s ease both}#zpf .c2 .b1{animation-delay:1.200s}#zpf .c2 .b2{animation-delay:3s}#zpf .c2 .b3{animation-delay:4.800s;display:flex;align-items:center;gap:8px}#zpf .c2 .tv{width:54px;height:40px;border-radius:8px;background:linear-gradient(160deg,#5a6d60,#2e3a33);display:grid;place-items:center;flex:none}#zpf .c2 .tv svg{width:16px;height:16px;fill:#f4efe6;stroke:none}'
    +'#zpf .ok{position:absolute;left:0;right:0;bottom:34px;display:flex;flex-direction:column;align-items:center;gap:6px;opacity:0;animation:zc2k .6s cubic-bezier(.2,1.4,.4,1) 7s both}#zpf .ok svg{width:74px;height:74px;fill:#b88458;stroke:#fff;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 10px 16px rgba(0,0,0,.4))}#zpf .ok circle{stroke:none}#zpf .ok b{background:#f4efe6;color:#425548;border-radius:999px;padding:5px 16px;font-size:15px}'
    +'#zpf .c3{display:none;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:86px 18px 46px}#zpf .c3.on{display:flex}#zpf .c3 .rw{display:flex;gap:12px;justify-content:center}#zpf .c3 .rw span{position:relative;width:86px;height:86px;border-radius:50%;background:#f4efe6;display:grid;place-items:center;box-shadow:0 0 0 3px #b88458;opacity:0;animation:zc3p .6s cubic-bezier(.2,1.4,.4,1) both}#zpf .c3 .rw span:nth-child(1){animation-delay:.400s}#zpf .c3 .rw span:nth-child(2){animation-delay:1.400s}#zpf .c3 .rw span:nth-child(3){animation-delay:2.400s}'
    +'#zpf .c3 .rw img{position:static!important;width:66%!important;height:66%!important;object-fit:contain!important}#zpf .c3 .rw i{position:absolute;top:-4px;right:-4px;width:26px;height:26px;border-radius:50%;background:#425548;border:2px solid #f4efe6;opacity:0;animation:zc3p .4s ease both}#zpf .c3 .rw i::after{content:"";position:absolute;left:8px;top:4px;width:6px;height:11px;border:solid #fff;border-width:0 2.500px 2.500px 0;rotate:45deg}#zpf .c3 .rw span:nth-child(1) i{animation-delay:3.400s}#zpf .c3 .rw span:nth-child(2) i{animation-delay:3.900s}#zpf .c3 .rw span:nth-child(3) i{animation-delay:4.400s}'
    +'#zpf .c3 .shd svg{width:120px;height:120px;fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}#zpf .c3 .o{stroke:#e6c9a8;stroke-dasharray:170;stroke-dashoffset:170;animation:zc3d 1.400s ease 5.200s forwards}#zpf .c3 .k{stroke:#f4efe6;stroke-dasharray:36;stroke-dashoffset:36;animation:zc3d .600s ease 6.600s forwards}#zpf .c3 .cp{color:#f4efe6;font-size:clamp(18px,1.6vw,23px);opacity:0;animation:zc2b .6s ease 7.200s both}'
    +'@keyframes zc2u{from{translate:0 110%}to{translate:0 0}}@keyframes zc2b{from{opacity:0;translate:0 14px}to{opacity:1;translate:0 0}}@keyframes zc2k{from{opacity:0;scale:.3}to{opacity:1;scale:1}}@keyframes zc3p{from{opacity:0;scale:.3}to{opacity:1;scale:1}}@keyframes zc3d{to{stroke-dashoffset:0}}'
    +'#zpf svg.sl{overflow:visible;filter:drop-shadow(0 10px 18px rgba(46,166,240,.45))}#zpf svg.sl .sg{fill:#2ea6f0!important;stroke:#2ea6f0!important;stroke-width:3!important;stroke-linejoin:round;stroke-dasharray:none!important;transform-box:fill-box;transform-origin:center;animation:zslr 9s linear infinite,zslb 1.800s ease-in-out infinite!important}#zpf svg.sl .sk{fill:none!important;stroke:#fff!important;stroke-width:5.500!important}#zpf .ok svg.sl .sk{stroke-dasharray:40;stroke-dashoffset:40;animation:zc3d .500s ease 7.500s forwards}#zpf .ok svg.sl{width:84px;height:84px}'
    +'@keyframes zslr{to{rotate:360deg}}@keyframes zslb{50%{scale:1.080}}'
    +'#zpf .c2 .fn{left:19%!important;right:19%!important;top:92px!important;bottom:44px!important;border:6px solid #1c1c1e!important;border-radius:38px!important;box-shadow:0 0 0 2px #48484a,0 22px 40px rgba(0,0,0,.5);overflow:hidden;padding:0 10px 12px!important}#zpf .c2 .fn::before{content:"";position:absolute;top:8px;left:50%;translate:-50% 0;width:36%;height:17px;border-radius:999px;background:#0b0b0c;z-index:2}#zpf .c2 .fh{border-radius:0!important;padding:34px 12px 9px!important}#zpf .c2 .bb{font-size:12px!important}#zpf .ok{bottom:74px!important}#zpf .pg{bottom:18px!important}#zpf .rc{top:58px!important;z-index:3}'
    +'@media(max-width:760px){#zpf .c2 .fn{left:15%!important;right:15%!important;top:84px!important}#zpf .rc{top:50px!important}#zpf .sn{padding:74px 16px 44px!important}#zpf .sn b{font-size:16px!important}}'
    +'#zpf .vd{height:580px!important}#zpf .c2 .fn{left:0!important;right:0!important;margin:0 auto!important;width:auto!important;top:90px!important;bottom:auto!important;height:calc(100% - 132px)!important;aspect-ratio:9/19.300!important;border:5px solid #2b2b2e!important;border-radius:36px!important;box-shadow:0 0 0 1.500px #6e6e73,0 0 0 3px #1c1c1e,0 24px 44px rgba(0,0,0,.55)!important;padding:0 8px 10px!important;gap:7px!important}#zpf .c2 .fn::before{top:7px!important;width:34%!important;height:15px!important}#zpf .c2 .fn::after{content:"";position:absolute;bottom:6px;left:50%;translate:-50% 0;width:36%;height:4px;border-radius:4px;background:#1c1c1e;opacity:.55}'
    +'#zpf .c2 .fh{margin:0 -8px 2px!important;padding:30px 10px 8px!important;font-size:12px!important}#zpf .c2 .fh i{width:24px!important;height:24px!important}#zpf .c2 .bb{font-size:11px!important;padding:7px 9px!important;line-height:1.600!important;max-width:96%!important}#zpf .c2 .tv{width:40px!important;height:32px!important}#zpf .ok{bottom:96px!important}#zpf .ok svg.sl{width:70px!important;height:70px!important}#zpf .ok b{font-size:13px!important;padding:4px 12px!important}'
    +'@media(max-width:760px){#zpf .vd{height:470px!important}#zpf .c2 .fn{top:82px!important;height:calc(100% - 122px)!important}}'
    +'#zpf .vd{width:min(470px,84vw)!important;height:690px!important}#zpf .c2 .fn{top:112px!important;height:calc(100% - 172px)!important}#zpf .rc{top:66px!important}#zpf .pg{bottom:24px!important;left:34px!important;right:34px!important}#zpf .ok{bottom:120px!important}#zpf .sn{padding:100px 30px 60px!important}'
    +'@media(max-width:760px){#zpf .vd{width:min(330px,86vw)!important;height:560px!important}#zpf .c2 .fn{top:98px!important;height:calc(100% - 150px)!important}#zpf .rc{top:56px!important}#zpf .sn{padding:90px 18px 50px!important}}'
    +'#zpf .c2 .fn{background:#e9e1d3 radial-gradient(rgba(66,85,72,.090) 1.200px,transparent 1.400px) 0 0/14px 14px!important}#zpf .c2 .fh{background:#425548!important;color:#f4efe6!important;gap:7px!important}#zpf .c2 .fh s{width:8px;height:8px;border-top:2px solid #f4efe6;border-right:2px solid #f4efe6;rotate:45deg;flex:none;text-decoration:none}#zpf .c2 .fh i{background:#f4efe6 url(img/logo-olive.svg) center/74% no-repeat!important;flex:none}#zpf .c2 .fh span{display:flex;flex-direction:column;line-height:1.300;text-align:right}#zpf .c2 .fh b{font-size:12px;color:#f4efe6}#zpf .c2 .fh small{font-size:9px;color:#cfd6cc}'
    +'#zpf .c2 .dy{align-self:center!important;background:rgba(255,255,255,.850);color:#5c675f;border-radius:8px;padding:2px 10px;font-size:9px;box-shadow:0 1px 2px rgba(0,0,0,.1);opacity:0;animation:zc2b .5s ease .900s both}#zpf .c2 .bb{position:relative;border-radius:10px 2px 10px 10px!important;padding:6px 9px 17px!important;min-width:92px;box-shadow:0 1px 1.500px rgba(0,0,0,.18)!important}'
    +'#zpf .c2 .bb em{position:absolute;left:7px;bottom:3px;font:700 8px Arial,sans-serif;font-style:normal;color:#8a938c;display:inline-flex;align-items:center;gap:3px;direction:rtl}#zpf .c2 .bb em svg{width:13px;height:9px;fill:none;stroke:#2ea6f0;stroke-width:1.600;stroke-linecap:round;stroke-linejoin:round}#zpf .c2 .b3{flex-direction:column!important;align-items:stretch!important;gap:5px!important;padding:5px 5px 18px!important;width:78%}#zpf .c2 .b3 .tv{width:100%!important;height:78px!important;border-radius:7px!important}#zpf .c2 .b3 .tv svg{width:22px!important;height:22px!important}#zpf .c2 .b3 .tx{padding:0 4px;text-align:right}'
    +'#zpf .c2 .ib{margin-top:auto;align-self:stretch;display:flex;align-items:center;gap:6px;padding-bottom:10px}#zpf .c2 .ib span{flex:1;background:#fff;border-radius:999px;padding:6px 12px;font-size:10px;color:#9aa39c;text-align:right;box-shadow:0 1px 2px rgba(0,0,0,.12)}#zpf .c2 .ib u{width:26px;height:26px;border-radius:50%;background:#425548;flex:none;position:relative;text-decoration:none}#zpf .c2 .ib u::after{content:"";position:absolute;left:8px;top:8px;border:5px solid transparent;border-right:9px solid #f4efe6;border-left:0}#zpf .c2 .fn::after{bottom:4px!important}#zpf .ok{bottom:160px!important}'
    +'#zpf .c3 .rw{gap:14px!important}#zpf .c3 .rw span{width:112px!important;height:112px!important}#zpf .c3 .rw span{overflow:visible!important}#zpf .c3 .rw img{width:auto!important;height:auto!important;max-width:72%!important;max-height:72%!important;min-width:0!important;min-height:0!important;display:block!important;margin:auto!important}#zpf .c3 .rw i{width:30px!important;height:30px!important}#zpf .c3 .rw i::after{left:10px!important;top:5px!important}@media(max-width:760px){#zpf .c3 .rw{gap:8px!important}#zpf .c3 .rw span{width:86px!important;height:86px!important}}'
    +'#zpf .ok{bottom:112px!important;gap:4px!important}#zpf .ok svg.sl{width:58px!important;height:58px!important}#zpf .c2 .b3 .tv{height:66px!important}#zpf .c2 .fn{gap:6px!important}'
    +'@media(max-width:760px){#zpf .ok{bottom:102px!important}#zpf .ok svg.sl{width:48px!important;height:48px!important}#zpf .c2 .b3 .tv{height:50px!important}#zpf .ok b{font-size:12px!important}}'
    +'#zpf .c2 .fn .ok{position:static!important;align-self:center!important;margin:auto 0!important;padding:8px 0!important;flex:none}#zpf .c2 .fn .ib{margin-top:0!important}'
    +'@keyframes zpfp{0%{box-shadow:0 0 0 0 rgba(244,239,230,.55)}100%{box-shadow:0 0 0 22px rgba(244,239,230,0)}}'
    +'@media(max-width:800px){#zpf .r{grid-template-columns:1fr}#zpf .vd{margin:0 auto}#zpf .vw{order:-1}}';
  function proof(d,w){
    var zx=d.getElementById('zpf');
    if(zx){var cw=d.documentElement.clientWidth;zx.style.position='relative';zx.style.maxWidth='none';if(zx.style.width!==cw+'px')zx.style.width=cw+'px';var cl=parseFloat(zx.style.left)||0,nat=zx.getBoundingClientRect().left-cl;if(Math.abs(nat+cl)>.5)zx.style.left=(-nat)+'px';return}
    var sw=d.getElementById('zsw');if(!sw)return;
    var sec=sw.closest('section')||sw.parentElement;if(!sec||!sec.parentElement)return;
    if(!d.getElementById('zpf-css')){var st=d.createElement('style');st.id='zpf-css';st.textContent=PFCSS;d.head.appendChild(st)}
    var I={v:'<rect x="3" y="6" width="12" height="12" rx="3"/><path d="m15 10.500 6-3.500v10l-6-3.500"/>',p:'<path d="M12 20h9M16.500 3.500a2.100 2.100 0 0 1 3 3L7 19l-4 1 1-4z"/>',m:'<path d="M12 21s-7-6.200-7-11.500a7 7 0 0 1 14 0C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>'};
    function c(i,t,x){return '<div class="cd"><i><svg viewBox="0 0 24 24">'+I[i]+'</svg></i><b>'+t+'</b><span>'+x+'</span></div>'}
    var z=d.createElement('div');z.id='zpf';
    z.innerHTML='<div class="bx"><h2 class="zt ztp">'+kash('شاهد كيف نوثق طلبك')+'</h2><p class="ld">بعد توزيع هديتك يوصلك مقطع فيديو يوثق التنفيذ على واتساب</p>'
      +'<div class="r"><div class="sd">'+c('v','توثيق بالفيديو','يوصلك على واتساب بعد التوزيع')+c('p','باسم من تحب','نكتب الاسم او الاهداء كما هو')+'</div>'
      +'<div class="vw"><div class="vd"><div class="cl c1 on"><div class="sn s1"><img src="img/cut/dates.png" alt=""><b>نجهز هديتك</b></div>'
      +'<div class="sn s2"><u><em>عن والدتي رحمها الله</em></u><b>نكتب الاسم كما هو</b></div>'
      +'<div class="sn s3"><img src="img/cut/bag.png" alt=""><b>نوزعها على ضيوف الرحمن</b></div>'
      +'<div class="sn s4"><svg class="sl" viewBox="0 0 60 60"><polygon class="sg" points="30.0,3.0 35.0,8.1 41.7,5.7 44.0,12.4 51.1,13.2 50.3,20.2 56.3,24.0 52.5,30.0 56.3,36.0 50.3,39.8 51.1,46.8 44.0,47.6 41.7,54.3 35.0,51.9 30.0,57.0 25.0,51.9 18.3,54.3 16.0,47.6 8.9,46.8 9.7,39.8 3.7,36.0 7.5,30.0 3.7,24.0 9.7,20.2 8.9,13.2 16.0,12.4 18.3,5.7 25.0,8.1"/><path class="sk" d="M19 31l8 7.500L42 22"/></svg><b>يوصلك مقطع التوثيق على واتساب</b></div><span class="pg"><i></i></span></div>'
      +'<div class="cl c2"><div class="fn"><div class="fh"><s></s><i></i><span><b>زاد الضيف</b><small>متصل الآن</small></span></div><div class="dy">اليوم</div><div class="bb b1">طلبك جاهز وكتبنا الاسم كما هو<em>9:12 ص<svg viewBox="0 0 18 12"><path d="M1 6.500l3.500 3.500L11 2.500M7 9l1 1 6.500-7.500"/></svg></em></div><div class="bb b2">وصلنا الحرم وجاري التوزيع<em>4:40 م<svg viewBox="0 0 18 12"><path d="M1 6.500l3.500 3.500L11 2.500M7 9l1 1 6.500-7.500"/></svg></em></div><div class="bb b3"><span class="tv"><svg viewBox="0 0 24 24"><path d="M8 5.500v13l10-6.500z"/></svg></span><span class="tx">مقطع توثيق طلبك</span><em>4:52 م<svg viewBox="0 0 18 12"><path d="M1 6.500l3.500 3.500L11 2.500M7 9l1 1 6.500-7.500"/></svg></em></div><div class="ib"><span>اكتب رسالة</span><u></u></div></div><div class="ok"><svg class="sl" viewBox="0 0 60 60"><polygon class="sg" points="30.0,3.0 35.0,8.1 41.7,5.7 44.0,12.4 51.1,13.2 50.3,20.2 56.3,24.0 52.5,30.0 56.3,36.0 50.3,39.8 51.1,46.8 44.0,47.6 41.7,54.3 35.0,51.9 30.0,57.0 25.0,51.9 18.3,54.3 16.0,47.6 8.9,46.8 9.7,39.8 3.7,36.0 7.5,30.0 3.7,24.0 9.7,20.2 8.9,13.2 16.0,12.4 18.3,5.7 25.0,8.1"/><path class="sk" d="M19 31l8 7.500L42 22"/></svg><b>وصلك التوثيق</b></div><span class="pg"><i></i></span></div>'
      +'<div class="cl c3"><div class="rw"><span><img src="img/cut/water.png" alt=""><i></i></span><span><img src="img/cut/dates.png" alt=""><i></i></span><span><img src="img/cut/quran.png" alt=""><i></i></span></div><div class="shd"><svg viewBox="0 0 60 60"><path class="o" d="M30 5 10 12.500v15c0 12 8 20.500 20 25 12-4.500 20-13 20-25v-15z"/><path class="k" d="M20 30l7.500 7.500L41 23"/></svg></div><b class="cp">تم توزيع هديتك بامان</b><span class="pg"><i></i></span></div>'
      +'<span class="rc"><i></i>عرض توضيحي</span></div><div class="tb"><a class="on">رحلة الطلب</a><a>على جوالك</a><a>تم التوزيع</a></div></div>'
      +'<div class="sd">'+c('m','توزيع في الحرم','لضيوف الرحمن يدا بيد')+c('v','لكل طلب','كل طلب له مقطع توثيق خاص')+'</div></div>'
      +'<a class="bn">اختر هديتك</a></div>';
    sec.parentElement.insertBefore(z,sec.nextSibling);
    (function(){var ok=z.querySelector('.c2 .ok'),ib=z.querySelector('.c2 .ib');if(ok&&ib)ib.parentElement.insertBefore(ok,ib)})();
    (function(){var cl=arr(z.querySelectorAll('.cl')),tb=arr(z.querySelectorAll('.tb a')),cur=0,tm;function show(i){cur=i;cl.forEach(function(c,k){c.classList.toggle('on',k===i)});tb.forEach(function(a,k){a.classList.toggle('on',k===i)});w.clearInterval(tm);tm=w.setInterval(function(){show((cur+1)%cl.length)},12000)}tb.forEach(function(a,k){a.onclick=function(){show(k)}});show(0)})();
    z.querySelector('.bn').onclick=function(){try{sw.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}};
    try{new w.IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)z.classList.add('in')})},{threshold:.15}).observe(z)}catch(e){z.classList.add('in')}
  }
  function vfab(d){
    if(d.getElementById('zvf'))return;
    var st=d.createElement('style');
    st.textContent='#zvf{position:fixed;right:18px;bottom:18px;z-index:2147483000;direction:rtl;display:inline-flex;align-items:center;gap:9px;background:linear-gradient(135deg,#1b2a78,#111a52);color:#fff;border-radius:999px;padding:6px 16px 6px 7px;font:900 14px "Noto Kufi Arabic",sans-serif;box-shadow:0 10px 22px rgba(0,0,0,.3);cursor:pointer;transition:translate .25s}#zvf:hover{translate:0 -3px}#zvf i{width:32px;height:32px;border-radius:10px;background:#fff;color:#16205c;display:grid;place-items:center}#zvf svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;animation:zvfq 2.6s infinite}@keyframes zvfq{0%,70%,100%{transform:scale(1)}80%{transform:scale(1.25)}}@media(max-width:640px){#zvf{right:12px;bottom:12px;font-size:12px;padding:5px 12px 5px 6px}#zvf i{width:28px;height:28px}}';
    d.head.appendChild(st);
    var a=d.createElement('a');a.id='zvf';
    a.innerHTML='<i><svg viewBox="0 0 24 24"><path d="M12 2.800 4.500 5.600v6c0 4.600 3.100 8 7.500 9.600 4.400-1.600 7.500-5 7.500-9.600v-6z"/><path d="m8.700 12 2.400 2.400 4.300-4.600"/></svg></i>متجر موثق';
    d.body.appendChild(a);
  }
  function marq(d,w){
    var zx=d.getElementById('zmq');
    if(zx){var cw=d.documentElement.clientWidth;if(zx.style.width!==cw+'px')zx.style.width=cw+'px';var cl=parseFloat(zx.style.left)||0,nat=zx.getBoundingClientRect().left-cl;if(Math.abs(nat+cl)>.5)zx.style.left=(-nat)+'px';return}
    var wh=d.getElementById('zwh');if(!wh)return;
    var sec=wh.closest('section')||wh;if(!sec.parentElement)return;
    var st=d.createElement('style');
    st.textContent='#zmq{position:relative;max-width:none;direction:ltr;overflow:hidden;background:#425548;border-block:3px solid #b88458;padding:14px 0;margin:34px 0 10px;box-sizing:border-box}#zmq div{display:flex;width:max-content;animation:zmqa 38s linear infinite}#zmq:hover div{animation-play-state:paused}#zmq span{display:inline-flex;align-items:center;gap:26px;padding-inline-end:26px;white-space:nowrap;direction:rtl;color:#f4efe6;font:900 clamp(15px,1.5vw,21px) "Noto Kufi Arabic",sans-serif}#zmq span::after{content:"";width:9px;height:9px;rotate:45deg;background:#b88458;flex:none}@keyframes zmqa{to{transform:translateX(-50%)}}';
    d.head.appendChild(st);
    var T=['شحن مجاني','شحن سريع'],h='';
    for(var i=0;i<16;i++)T.forEach(function(t){h+='<span>'+t+'</span>'});
    var z=d.createElement('div');z.id='zmq';z.innerHTML='<div>'+h+'</div>';
    sec.parentElement.insertBefore(z,sec.nextSibling);
  }
  function hideHero(d){
    arr(d.querySelectorAll('h1,h2')).forEach(function(h){
      if(h.__zhh||h.closest('#zft,#zbw,#zh,#zpf,#zcb'))return;
      if(norm(h.textContent).replace(/ـ/g,'').indexOf('هدايا تقدم بمحبة')<0)return;
      h.__zhh=1;var G='#zbw,#zwh,#zsw,#zmq,#zpf,#zrv,#zh,#zft,.zcs,.zcats,.s-product-card-entry,footer,header';
      var p=h;while(p.parentElement&&p.parentElement!==d.body&&!p.parentElement.querySelector(G))p=p.parentElement;
      if(p.querySelector(G)||p===d.body)return;
      imp(p,'display','none');
    });
  }
  function noBox(d){
    arr(d.querySelectorAll('.s-product-card-entry')).forEach(function(c){if(c.__znb)return;if(c.textContent.indexOf('بوكس')>-1){c.__znb=1;imp(c,'display','none')}});
  }
  function allProducts(d,w){
    var all=arr(d.querySelectorAll('.s-product-card-entry')).filter(function(c){return !c.closest('#zsw,.zcs')});
    var groups=[];all.forEach(function(c){var g=groups.filter(function(x){return x.p===c.parentElement})[0];if(!g){g={p:c.parentElement,c:[]};groups.push(g)}g.c.push(c)});
    groups.forEach(function(g){
      var site=g.c.filter(function(c){return !c.classList.contains('zadd')});
      if(site.length<6||g.p.__zall)return;
      var src=site.filter(function(c){return c.style.display!=='none'&&c.querySelector('.s-product-card-content-title')&&c.querySelector('img')})[1]||site[0];
      if(!src||!src.querySelector('.s-product-card-content-title'))return;
      g.p.__zall=1;
      var have=site.map(function(c){var t=c.querySelector('.s-product-card-content-title');return t?key(t.textContent):''});
      SWP.forEach(function(x){
        if(have.indexOf(key(x[0]))>-1)return;
        var c=src.cloneNode(true);c.classList.add('zadd');c.style.removeProperty('display');c.removeAttribute('data-zd');arr(c.querySelectorAll('.zold,.zdt')).forEach(function(e){e.remove()});
        var t=c.querySelector('.s-product-card-content-title'),pr=c.querySelector('.s-product-card-price'),im=c.querySelector('img');
        var a=t.querySelector('a')||t;a.textContent=x[0];
        if(pr){pr.textContent=x[2]+' ر.س';pr.setAttribute('data-zp',String(x[2]))}
        if(im){im.removeAttribute('srcset');im.removeAttribute('data-src');im.setAttribute('src','img/cut/'+x[3]+'.png');im.setAttribute('alt',x[0])}
        var skip=[t,pr];
        var leaf=arr(c.querySelectorAll('p,span,div,small')).filter(function(e){return !e.children.length&&norm(e.textContent).length>7&&!skip.some(function(k){return k&&(k===e||k.contains(e))})&&!e.closest('button,a')})[0];
        if(leaf)leaf.textContent=x[1];
        arr(c.querySelectorAll('a[href]')).forEach(function(l){l.removeAttribute('href')});
        c.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('button'))return;e.preventDefault();e.stopPropagation();if(window.__zOpen)window.__zOpen(x[0])},true);
        g.p.appendChild(c);
      });
    });
  }
  var ABCSS='#zab{direction:rtl;max-width:1100px;margin:0 auto;padding:10px 0 30px;line-height:1.9;color:#2e3a33}#zab svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}'
    +'#zab .hd{background:linear-gradient(160deg,#4a5e50,#34443a);color:#f4efe6;border-radius:50% 50% 0 0/120px 120px 0 0;padding:60px 24px 78px;text-align:center}#zab .lg{width:104px;height:104px;border-radius:50%;background:#f4efe6 url(img/logo-olive.svg) center/74% no-repeat;border:4px solid #b88458;margin:0 auto 14px;animation:zabf 3s ease-in-out infinite}'
    +'#zab .tt{font-size:clamp(30px,3.6vw,48px);font-weight:900;color:#e6c9a8;line-height:1.5}#zab .tt::after{content:"";display:block;width:80px;height:3px;border-radius:3px;background:#b88458;margin:8px auto 0}#zab .ld{font-size:clamp(15px,1.4vw,19px);max-width:760px;margin:14px auto 0}'
    +'#zab .cs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:-48px 24px 0;position:relative}#zab .c{background:#fff;border-radius:22px;padding:24px 16px;text-align:center;border-bottom:4px solid #b88458;box-shadow:0 14px 30px rgba(0,0,0,.1);transition:translate .25s;animation:zabu .7s both}#zab .c:nth-child(2){animation-delay:.15s}#zab .c:nth-child(3){animation-delay:.3s}#zab .c:hover{translate:0 -6px}'
    +'#zab .ic{width:66px;height:66px;border-radius:50%;background:#425548;color:#f4efe6;display:grid;place-items:center;margin:0 auto 14px;box-shadow:0 0 0 4px #e6c9a8,0 8px 16px rgba(0,0,0,.18)}#zab .ic svg{width:30px!important;height:30px!important;stroke:#f4efe6!important;fill:none!important;stroke-width:2!important}#zab .c:hover .ic{background:#b88458}#zab .c b{display:block;font-size:clamp(17px,1.5vw,20px);color:#425548}#zab .c span{font-size:14.500px;color:#5c675f}'
    +'#zab .h3{font-size:clamp(22px,2.4vw,30px);font-weight:900;text-align:center;color:#425548}#zab .st{display:grid;grid-template-columns:repeat(3,1fr);margin:22px 24px 0;position:relative;text-align:center}#zab .st::before{content:"";position:absolute;top:27px;right:16.600%;left:16.600%;border-top:3px dotted #b88458}'
    +'#zab .st i{position:relative;width:56px;height:56px;border-radius:50%;background:#425548;color:#f4efe6;display:grid;place-items:center;margin:0 auto 10px;font-style:normal;font-size:22px;box-shadow:0 0 0 5px #fbf8f3;animation:zabp 4.500s infinite}#zab .st div:nth-child(2) i{animation-delay:1.500s}#zab .st div:nth-child(3) i{animation-delay:3s}#zab .st span{font-size:15px;padding:0 10px;display:block}'
    +'#zab .cl{background:#f4efe6;border-radius:22px;margin:34px 24px 0;padding:24px;text-align:center;box-shadow:0 0 0 2px #b88458}#zab .cl p{font-size:15.500px;margin:6px 0 0}#zab .th{text-align:center;font-size:17px;color:#b88458;margin:22px 0 0}'
    +'@keyframes zabu{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes zabf{50%{transform:translateY(-7px)}}@keyframes zabp{0%,20%,100%{transform:scale(1)}10%{transform:scale(1.180)}}'
    +'@media(max-width:800px){#zab .cs,#zab .st{grid-template-columns:1fr}#zab .st::before{display:none}#zab .st{gap:18px}}';
  function about(d){
    if(d.getElementById('zab'))return;
    var h=arr(d.querySelectorAll('h1,h2')).filter(function(e){return !e.closest('#zh,#zft,#zab')&&key(e.textContent)==='مننحن'})[0];if(!h)return;
    var box=h;while(box.parentElement&&box.parentElement!==d.body&&box.textContent.indexOf('شكرا لاختياركم')<0)box=box.parentElement;
    if(box.textContent.indexOf('شكرا لاختياركم')<0||box.querySelector('#zh,#zft,#zrv,footer,header'))return;
    if(!d.getElementById('zab-css')){var st=d.createElement('style');st.id='zab-css';st.textContent=ABCSS;d.head.appendChild(st)}
    var I={g:'<rect x="3.500" y="9" width="17" height="11" rx="2"/><path d="M2.500 6h19v3h-19zM12 6v14M12 6c-1.500-3-5-3-5-.800C7 6.500 10 6 12 6zm0 0c1.500-3 5-3 5-.800C17 6.500 14 6 12 6z"/>',p:'<path d="M12 20h9M16.500 3.500a2.100 2.100 0 0 1 3 3L7 19l-4 1 1-4z"/>',v:'<rect x="3" y="6" width="12" height="12" rx="3"/><path d="m15 10.500 6-3.500v10l-6-3.500"/>'};
    function c(i,t,x){return '<div class="c"><span class="ic"><svg viewBox="0 0 24 24">'+I[i]+'</svg></span><b>'+t+'</b><span>'+x+'</span></div>'}
    var z=d.createElement('div');z.id='zab';
    z.innerHTML='<div class="hd"><div class="lg" role="img" aria-label="زاد الضيف"></div><div class="tt">'+kash('من نحن')+'</div><p class="ld">زاد الضيف متجر سعودي إلكتروني يقدم هدايا ومنتجات مختارة ونجهزها ونوصلها لضيوف الرحمن في الحرم نيابة عنك باسمك أو باسم من تحب</p></div>'
      +'<div class="cs">'+c('g','هدايا مختارة بعناية','تمور ومياه ووجبات ومصاحف ومستلزمات صلاة بتغليف يليق بالضيف')+c('p','باسمك أو باسم من تحب','نكتب الاسم أو عبارة الإهداء على طلبك كما تكتبها')+c('v','توثيق بالفيديو','يوصلك مقطع التوثيق على واتساب بعد التنفيذ')+'</div>'
      +'<div class="h3" style="margin-top:44px">'+kash('كيف نشتغل')+'</div>'
      +'<div class="st"><div><i>1</i><span>تختار الهدية والعدد من المتجر وتكتب الاسم أو الإهداء</span></div><div><i>2</i><span>تفوضنا بتجهيز الطلب وتسليمه لضيوف الرحمن نيابة عنك</span></div><div><i>3</i><span>نجهز الطلب ونوزعه ونرسل لك التوثيق</span></div></div>'
      +'<div class="cl"><div class="h3">'+kash('وضوح وشفافية')+'</div><p>زاد الضيف متجر لبيع الهدايا والمنتجات وتوصيلها ولا يستقبل التبرعات أو يجمعها</p><p>أسعار كل المنتجات معلنة في المتجر وتصدر لك فاتورة إلكترونية مع كل طلب</p></div>'
      +'<p class="th">شكرا لاختياركم زاد الضيف</p>';
    box.parentElement.insertBefore(z,box);imp(box,'display','none');
  }
  function fixImgs(d){
    arr(d.querySelectorAll('.s-product-card-entry:not(.zadd)')).forEach(function(c){
      if(c.__zfi)return;var t=c.querySelector('.s-product-card-content-title');if(!t||key(t.textContent)!==key('مصحف باسم من تحب'))return;
      var im=c.querySelector('img');if(!im||im.getAttribute('src')==='img/cut/quran-brown.png')return;
      if((im.getAttribute('src')||'').indexOf('img/cut/')<0)return;
      c.__zfi=1;im.removeAttribute('srcset');im.setAttribute('src','img/cut/quran-brown.png');
    });
  }
  var ZPG=[{"k": ["الاستبدالوالاسترجاع"], "t": "سياسة الاستبدال والاسترجاع", "l": "نحرص على تجربة واضحة وموثوقة وننفذ طلبك ونوزعه على ضيوف الرحمن حسب التفاصيل اللي حددتها", "s": [["إلغاء الطلب واسترداد المبلغ", "تقدر تطلب إلغاء طلبك واسترداد المبلغ ما دام التجهيز أو التوزيع لم يبدأ. بعد بدء التجهيز أو التنفيذ لا يمكن الإلغاء أو الاسترجاع لأن الهدية تنفذ وتوزع نيابة عنك"], ["المنتجات المخصصة", "المنتجات اللي يكتب عليها اسم أو إهداء لا يمكن استرجاعها أو إلغاؤها بعد بدء تجهيزها"], ["الوجبات والمنتجات الغذائية", "لطبيعتها وسرعة تجهيزها وتوزيعها لا يمكن استبدالها أو استرجاعها بعد بدء التجهيز"], ["وجود خطأ في الطلب", "إذا نفذنا منتجا مختلفا عن طلبك أو لم ينفذ بالشكل المتفق عليه تواصل معنا برقم الطلب ونراجع الحالة ونختار الأنسب", ["إعادة تنفيذ الطلب بالشكل الصحيح", "تعويضك عند الحاجة", "استرداد قيمة الطلب أو الجزء المتأثر منه"]], ["تأخر تنفيذ الطلب", "إذا تعذر التنفيذ في المدة المتفق عليها نتواصل معك ونعرض عليك موعدا جديدا أو إلغاء الطلب واسترداد المبلغ"], ["استرداد المبالغ", "بعد الموافقة يرجع المبلغ لنفس وسيلة الدفع وتختلف مدة ظهوره حسب البنك أو مزود خدمة الدفع"], ["تعديل الطلب", "لا يمكن تعديل الاسم أو الإهداء بعد إتمام الدفع وبدء التجهيز فراجع الإملاء قبل الدفع"], ["التواصل معنا", "لطلب الإلغاء أو أي ملاحظة راسلنا على واتساب وزودنا برقم الطلب والتفاصيل"]], "n": "تخضع حالات الاستبدال والاسترجاع للأنظمة المعمول بها في المملكة العربية السعودية ولا تؤثر هذه السياسة على حقوقك النظامية كمستهلك"}, {"k": ["التنفيذوالتوثيق"], "t": "سياسة التنفيذ والتوثيق", "l": "كيف ننفذ طلبك ونوثقه من لحظة الدفع إلى وصول مقطع التوثيق", "s": [["التفويض", "بإتمام الطلب تفوض زاد الضيف بتجهيز الهدية وتسليمها لضيوف الرحمن نيابة عنك"], ["التجهيز", "نجهز المنتجات ونكتب الاسم أو عبارة الإهداء كما كتبتها وقت الطلب"], ["التوزيع", "توزع الهدايا على ضيوف الرحمن في الحرم يدا بيد"], ["التوثيق", "بعد التوزيع يوصلك مقطع فيديو يوثق تنفيذ طلبك على واتساب"], ["موعد التنفيذ", "يعتمد موعد التنفيذ على نوع الطلب والعدد ونتواصل معك إذا تغير الموعد"], ["المتابعة", "لمتابعة طلبك راسلنا على واتساب برقم الطلب"]], "n": "زاد الضيف متجر لبيع الهدايا والمنتجات وتوصيلها ولا يستقبل التبرعات أو يجمعها"}, {"k": ["سياسةالخصوصية", "الخصوصية"], "t": "سياسة الخصوصية", "l": "نحترم خصوصيتك ونستخدم بياناتك فقط لتنفيذ طلبك وخدمتك", "s": [["المعلومات اللي نجمعها", "الاسم ورقم الجوال والبريد الإلكتروني وبيانات الطلب والاسم أو الإهداء المطلوب كتابته"], ["كيف نستخدمها", "لتنفيذ طلبك والتواصل معك وإرسال مقطع التوثيق والفاتورة الإلكترونية"], ["الدفع", "يتم الدفع عبر بوابات دفع آمنة ولا نطلب بيانات بطاقتك في المحادثات أو الرسائل"], ["مشاركة البيانات", "لا نبيع بياناتك ونشاركها فقط مع مزودي الخدمة اللازمين لإتمام الطلب"], ["مقاطع التوثيق", "مقطع توثيق طلبك يرسل لك أنت"], ["حقوقك", "تقدر تطلب تعديل بياناتك أو حذفها بالتواصل معنا"]], "n": "باستخدامك للمتجر توافق على هذه السياسة وقد نحدثها عند الحاجة وننشر التحديث في هذه الصفحة"}, {"k": ["الشروطوالأحكام", "الشروطوالاحكام"], "t": "الشروط والأحكام", "l": "شروط استخدام متجر زاد الضيف وإتمام الطلبات", "s": [["طبيعة المتجر", "زاد الضيف متجر إلكتروني لبيع الهدايا والمنتجات وتوصيلها لضيوف الرحمن ولا يستقبل التبرعات أو يجمعها"], ["المنتجات والأسعار", "أسعار كل المنتجات معلنة في المتجر وقت الطلب وتصدر لك فاتورة إلكترونية مع كل طلب"], ["الطلب والدفع", "يعتبر الطلب مؤكدا بعد إتمام الدفع بإحدى طرق الدفع المتاحة في المتجر"], ["التنفيذ نيابة عنك", "بإتمام الطلب تفوضنا بتجهيز الهدية وتسليمها لضيوف الرحمن ونرسل لك التوثيق بعد التنفيذ"], ["بيانات الطلب", "أنت مسؤول عن صحة الاسم أو الإهداء اللي تكتبه فراجعه قبل الدفع"], ["الإلغاء والاسترجاع", "تطبق سياسة الاستبدال والاسترجاع المنشورة في المتجر"], ["تحديث الشروط", "قد نحدث هذه الشروط عند الحاجة ويسري التحديث من تاريخ نشره في هذه الصفحة"], ["النظام المطبق", "تخضع هذه الشروط للأنظمة المعمول بها في المملكة العربية السعودية"]], "n": ""}, {"k": ["الأسئلةالشائعة", "الاسئلةالشائعة"], "t": "الأسئلة الشائعة", "l": "إجابات سريعة على أكثر الأسئلة اللي توصلنا", "faq": 1, "s": [["كيف أطلب؟", "تختار الهدية والعدد وتكتب الاسم أو الإهداء ثم تكمل الدفع ونحن نجهز ونوزع ونوثق لك"], ["هل أقدر أهدي باسم شخص ثاني؟", "أكيد. اكتب الاسم أو عبارة الإهداء وقت الطلب ونكتبها كما هي"], ["كيف أتأكد إن طلبي تنفذ؟", "بعد التوزيع يوصلك مقطع فيديو يوثق التنفيذ على واتساب"], ["وين توزع الهدايا؟", "توزع على ضيوف الرحمن في الحرم يدا بيد"], ["وش طرق الدفع؟", "طرق الدفع المتاحة تظهر لك في صفحة الدفع وفي أسفل المتجر"], ["هل تستقبلون تبرعات؟", "لا. زاد الضيف متجر لبيع الهدايا وتوصيلها ولا يستقبل التبرعات أو يجمعها"], ["أقدر ألغي أو أعدل طلبي؟", "تقدر تطلب الإلغاء ما دام التجهيز لم يبدأ. والتعديل على الاسم لا يمكن بعد الدفع وبدء التجهيز"], ["كيف أتواصل معكم؟", "راسلنا على واتساب من زر التواصل وزودنا برقم الطلب إن وجد"]], "n": ""}];
  var PGCSS='.zpg{direction:rtl;max-width:1100px;margin:0 auto;padding:10px 0 30px;line-height:1.9;color:#2e3a33}.zpg .hd{background:linear-gradient(160deg,#4a5e50,#34443a);color:#f4efe6;border-radius:50% 50% 0 0/120px 120px 0 0;padding:60px 24px 84px;text-align:center}.zpg .lg{width:96px;height:96px;border-radius:50%;background:#f4efe6 url(img/logo-olive.svg) center/74% no-repeat;border:4px solid #b88458;margin:0 auto 14px;animation:zabf 3s ease-in-out infinite}'
    +'.zpg .tt{font-size:clamp(26px,3.200vw,44px);font-weight:900;color:#e6c9a8;line-height:1.5}.zpg .tt::after{content:"";display:block;width:80px;height:3px;border-radius:3px;background:#b88458;margin:8px auto 0}.zpg .ld{font-size:clamp(15px,1.400vw,19px);max-width:760px;margin:14px auto 0}'
    +'.zpg .gr{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:-52px 24px 0;position:relative}.zpg .c{background:#fff;border-radius:22px;padding:22px 22px 20px;border-bottom:4px solid #b88458;box-shadow:0 14px 30px rgba(0,0,0,.09);transition:translate .25s;animation:zabu .7s both;text-align:center}.zpg .c:nth-child(2n){animation-delay:.12s}.zpg .c:hover{translate:0 -5px}'
    +'.zpg .c i{width:50px;height:50px;border-radius:50%;background:#425548;color:#f4efe6;display:grid;place-items:center;margin:0 auto 10px;font-style:normal;font-size:20px;font-weight:900;box-shadow:0 0 0 4px #e6c9a8}.zpg .c b{display:block;font-size:clamp(18px,1.600vw,21px);color:#425548;margin-bottom:4px}.zpg .c p{font-size:15px;color:#4a554d;margin:0}'
    +'.zpg .c ul{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:6px}.zpg .c li{background:#f4efe6;border-radius:12px;padding:6px 12px;font-size:14.500px;color:#425548}'
    +'.zpg .nt{background:#f4efe6;border-radius:22px;margin:22px 24px 0;padding:20px 24px;text-align:center;box-shadow:0 0 0 2px #b88458;font-size:15.500px}.zpg .nt b{color:#b88458}.zpg .th{text-align:center;font-size:17px;color:#b88458;margin:22px 0 0}'
    +'.zpg .fq{margin:-52px 24px 0;position:relative;display:grid;gap:12px}.zpg details{background:#fff;border-radius:20px;box-shadow:0 10px 24px rgba(0,0,0,.08);border-right:5px solid #b88458;overflow:hidden;animation:zabu .7s both}.zpg summary{list-style:none;cursor:pointer;padding:18px 22px;font-size:clamp(16px,1.500vw,19px);font-weight:900;color:#425548;display:flex;align-items:center;justify-content:space-between;gap:14px}.zpg summary::-webkit-details-marker{display:none}'
    +'.zpg summary::after{content:"";width:40px;height:40px;border-radius:50%;flex:none;background:linear-gradient(#f4efe6,#f4efe6) center/16px 3px no-repeat,linear-gradient(#f4efe6,#f4efe6) center/3px 16px no-repeat,#425548;box-shadow:0 0 0 4px #e6c9a8;transition:rotate .3s,background-color .3s}.zpg details[open] summary::after{rotate:45deg;background-color:#b88458}.zpg summary:hover::after{background-color:#b88458}.zpg details p{margin:0;padding:0 22px 18px;font-size:15.500px;color:#4a554d}'
    +'@media(max-width:800px){.zpg .gr{grid-template-columns:1fr}}';
  function pages(d){
    var hs=arr(d.querySelectorAll('h1,h2')).filter(function(e){return !e.__zpgd&&!e.closest('#zh,#zft,#zab,.zpg,#zrv,#zpf,#zsw,.zcs')});
    hs.forEach(function(h){
      var k=key(h.textContent),P=null;
      ZPG.forEach(function(x){if(P)return;x.k.forEach(function(q){if(k===q||k==='سياسة'+q||k.replace(/^سياسة/,'')===q)P=x})});
      if(!P)return;
      var G='#zh,#zft,#zrv,#zab,.zpg,footer,header,#zbw,#zwh,#zsw';
      var box=h;while(box.parentElement&&box.parentElement!==d.body&&norm(box.textContent).length<160&&!box.parentElement.querySelector(G))box=box.parentElement;
      if(norm(box.textContent).length<160||box.querySelector(G))return;
      h.__zpgd=1;
      if(!d.getElementById('zpg-css')){var st=d.createElement('style');st.id='zpg-css';st.textContent=ABCSS+PGCSS;d.head.appendChild(st)}
      var z=d.createElement('div');z.className='zpg';
      var body='';
      if(P.faq){body='<div class="fq">'+P.s.map(function(x,i){return '<details'+(i?'':' open')+'><summary>'+x[0]+'</summary><p>'+x[1]+'</p></details>'}).join('')+'</div>'}
      else{body='<div class="gr">'+P.s.map(function(x,i){return '<div class="c"><i>'+(i+1)+'</i><b>'+x[0]+'</b><p>'+x[1]+'</p>'+(x[2]?'<ul>'+x[2].map(function(l){return '<li>'+l+'</li>'}).join('')+'</ul>':'')+'</div>'}).join('')+'</div>'}
      z.innerHTML='<div class="hd"><div class="lg" role="img" aria-label="زاد الضيف"></div><div class="tt">'+P.t+'</div><p class="ld">'+P.l+'</p></div>'+body+(P.n?'<div class="nt"><b>ملاحظة </b>'+P.n+'</div>':'')+'<p class="th">شكرا لاختياركم زاد الضيف</p>';
      box.parentElement.insertBefore(z,box);imp(box,'display','none');
      var ds=arr(z.querySelectorAll('details'));ds.forEach(function(x){x.addEventListener('toggle',function(){if(x.open)ds.forEach(function(o){if(o!==x)o.open=false})})});
    });
  }
  function feedback(d,w){
    if(d.getElementById('zfb'))return;var pf=d.getElementById('zpf');if(!pf||!pf.parentElement)return;
    var st=d.createElement('style');
    st.textContent='#zfb{direction:rtl;max-width:980px;margin:54px auto 20px;padding:0 16px;line-height:1.9}#zfb .hd{background:linear-gradient(160deg,#4a5e50,#34443a);color:#f4efe6;border-radius:50% 50% 0 0/110px 110px 0 0;padding:52px 24px 80px;text-align:center}#zfb .ld{font-size:clamp(15px,1.400vw,18px);margin:6px 0 0;color:#f4efe6}'
      +'#zfb .cd{position:relative;margin:-54px 20px 0;background:#fff;border-radius:24px;padding:26px clamp(18px,3vw,36px) 28px;box-shadow:0 16px 34px rgba(0,0,0,.12);border-bottom:4px solid #b88458;text-align:center}'
      +'#zfb .st{display:flex;justify-content:center;gap:8px;direction:rtl;margin:4px 0 6px}#zfb .st button{all:unset;cursor:pointer;font-size:clamp(40px,4.500vw,56px);line-height:1;color:#ddd6c9;transition:color .15s,transform .15s}#zfb .st:hover button{color:#f5b301}#zfb .st button:hover~button{color:#ddd6c9}#zfb .st button:hover{transform:scale(1.180)}#zfb .st.set button{color:#ddd6c9}#zfb .st.set button.on{color:#f5b301}'
      +'#zfb .lb{font-size:16px;color:#b88458;min-height:30px}#zfb .ch{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0 16px}#zfb .ch a{cursor:pointer;border-radius:999px;padding:7px 16px;font-size:14px;color:#425548;background:#f4efe6;border:2px solid #e6ded1;transition:background .2s,color .2s,border-color .2s}#zfb .ch a.on{background:#425548;color:#f4efe6;border-color:#425548}'
      +'#zfb textarea,#zfb input{all:unset;box-sizing:border-box;display:block;width:100%;background:#fbf8f3;border:2px solid #e6ded1;border-radius:16px;padding:12px 16px;font:800 15px "Noto Kufi Arabic",sans-serif;color:#2e3a33;text-align:right;transition:border-color .2s}#zfb textarea{min-height:96px;white-space:pre-wrap}#zfb input{margin-top:10px}#zfb textarea:focus,#zfb input:focus{border-color:#b88458}'
      +'#zfb .bn{display:inline-flex;margin-top:16px;background:#b88458;color:#fff;border-radius:999px;padding:12px 34px;font-size:17px;cursor:pointer;transition:translate .25s,background .25s;box-shadow:0 8px 18px rgba(0,0,0,.18)}#zfb .bn:hover{translate:0 -3px;background:#a8744a}#zfb .er{color:#c0392b;font-size:14px;min-height:24px;margin-top:6px}'
      +'#zfb .ok{display:none;padding:18px 0 6px}#zfb.done .fm{display:none}#zfb.done .ok{display:block;animation:zfbu .6s both}@keyframes zfbu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}#zfb .ok u{display:grid;place-items:center;width:84px;height:84px;border-radius:50%;background:#425548;margin:0 auto 12px;text-decoration:none;box-shadow:0 0 0 5px #e6c9a8}#zfb .ok u::after{content:"";width:22px;height:40px;border:solid #f4efe6;border-width:0 6px 6px 0;rotate:45deg;margin-top:-8px}#zfb .ok b{display:block;font-size:22px;color:#425548}#zfb .ok span{font-size:15px;color:#5c675f}';
    d.head.appendChild(st);
    var L=['','ما عجبتني','مقبولة','جيدة','ممتازة','فوق الممتازة'];
    var z=d.createElement('div');z.id='zfb';
    z.innerHTML='<div class="hd"><h2 class="zt ztp" style="color:#e6c9a8!important">'+kash('قيم تجربتك معنا')+'</h2><p class="ld">رايك يساعدنا نخدم ضيوف الرحمن احسن</p></div>'
      +'<div class="cd"><div class="fm"><div class="st">'+[1,2,3,4,5].map(function(n){return '<button type="button" data-n="'+n+'" aria-label="'+n+' نجوم">★</button>'}).join('')+'</div><div class="lb">اختر عدد النجوم</div>'
      +'<div class="ch"><a>سهولة الطلب</a><a>جودة الهدية</a><a>التوثيق بالفيديو</a><a>خدمة العملاء</a><a>سرعة التنفيذ</a></div>'
      +'<textarea placeholder="اكتب تجربتك هنا" aria-label="تجربتك"></textarea><input type="text" placeholder="اسمك (اختياري)" aria-label="الاسم">'
      +'<div class="er"></div><a class="bn">ارسل تقييمك</a></div>'
      +'<div class="ok"><u></u><b>شكرا لك</b><span>وصلنا تقييمك ونتشرف بخدمتك دايم</span></div></div>';
    pf.parentElement.insertBefore(z,pf.nextSibling);
    var sb=z.querySelector('.st'),bs=arr(sb.querySelectorAll('button')),lb=z.querySelector('.lb'),val=0;
    bs.forEach(function(b){b.onclick=function(){val=+b.getAttribute('data-n');sb.classList.add('set');bs.forEach(function(x){x.classList.toggle('on',+x.getAttribute('data-n')<=val)});lb.textContent=L[val];z.querySelector('.er').textContent=''}});
    arr(z.querySelectorAll('.ch a')).forEach(function(a){a.onclick=function(){a.classList.toggle('on')}});
    z.querySelector('.bn').onclick=function(){if(!val){z.querySelector('.er').textContent='اختر عدد النجوم اول';return}z.classList.add('done')};
  }
  var ZDISC=null;
  function discounts(d){
    if(!ZDISC){ZDISC={};var PC=[25,20,15,30,10];SWP.forEach(function(x,i){var pc=PC[i%PC.length],old=Math.max(x[2]+1,Math.round(x[2]/(1-pc/100)));ZDISC[key(x[0])]=[pc,old]})}
    if(!d.getElementById('zdc-css')){var st=d.createElement('style');st.id='zdc-css';st.textContent='.zold{position:relative!important;color:#7f8982!important;text-decoration:none!important;font-size:18px!important;line-height:1!important;margin-inline-start:12px!important;padding:0 4px!important;font-weight:900!important;display:inline-block!important;vertical-align:middle!important}.zold::after{content:"";position:absolute;left:-3px;right:-3px;top:50%;height:3px;margin-top:-1.500px;background:#c0392b;border-radius:3px;rotate:-24deg}.s-product-card-price{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex-wrap:nowrap!important}.zdt{position:absolute;z-index:3;top:20px;left:-42px;rotate:-45deg;width:150px;text-align:center;background:#c0392b;color:#fff;padding:5px 0;font:900 14px Arial,sans-serif;direction:ltr;white-space:nowrap;box-shadow:0 4px 10px rgba(0,0,0,.22);pointer-events:none}.s-product-card-entry{position:relative;overflow:hidden!important}.zcs .zc{position:relative!important;overflow:hidden!important}.zcs .zc .zdt{top:14px;left:-48px;font-size:12px;padding:3px 0}';d.head.appendChild(st)}
    function put(card,name,price,inside){
      if(card.getAttribute('data-zd'))return;var D=ZDISC[key(name)];if(!D||!price)return;
      card.setAttribute('data-zd','1');
      var o=d.createElement('span');o.className='zold';o.textContent=String(D[1]);
      if(inside)price.appendChild(o);else price.parentElement.insertBefore(o,price.nextSibling);
      var t=d.createElement('span');t.className='zdt';t.textContent=D[0]+'%-';card.appendChild(t);var hb=card.querySelector('[class*="wishlist"],[class*="fav"],[class*="heart"]');if(hb&&!card.classList.contains('zc')){hb.style.setProperty('top','58px','important')}
    }
    arr(d.querySelectorAll('.s-product-card-entry')).forEach(function(c){var t=c.querySelector('.s-product-card-content-title'),p=c.querySelector('.s-product-card-price');if(t&&p)put(c,t.textContent,p,true)});
    arr(d.querySelectorAll('.zcs .zc')).forEach(function(c){var t=c.querySelector('b'),p=c.querySelector('.zpr');if(t&&p)put(c,t.textContent,p,true)});
  }
  var MOBCSS='@media(max-width:760px){#ztr{grid-template-columns:1fr 1fr!important;padding:4px!important;border-radius:18px!important}#ztr .it{padding:14px 8px!important;gap:6px!important}#ztr .it+.it::before{display:none!important}#ztr i{width:42px!important;height:42px!important}#ztr svg{width:20px!important;height:20px!important}#ztr b{font-size:14px!important}#ztr b::after{margin:4px auto!important;width:32px!important}#ztr small{font-size:11.500px!important}#zst{grid-template-columns:1fr!important;gap:10px!important}#zst .it{padding:14px 16px 14px 84px!important;min-height:84px!important}#zst svg.n{width:70px!important;height:70px!important;margin-top:-35px!important}.zt{font-size:25px!important;line-height:1.500!important}.zcs .bn{min-height:150px!important;background-color:#7d8b80!important;background-blend-mode:multiply!important}.zcs .bn h3{font-size:24px!important}.zcs .bn p{font-size:13px!important}.zcs .zg{gap:10px!important}.zcs .zc{flex:0 0 44vw!important;padding:0 8px 10px!important}.zcs .zc b{font-size:15px!important}.zcs .zc small{font-size:11.500px!important}.zcs .zpr{font-size:18px!important;margin:4px 0 8px!important}.zcs .zad{padding:8px!important;font-size:13px!important}#zpf .bx{padding:26px 12px!important}#zpf .ld{font-size:14px!important}#zpf .r{grid-template-columns:1fr 1fr!important;gap:10px!important;margin:18px 0!important}#zpf .vw{grid-column:1/-1!important;order:-1!important}#zpf .sd{display:contents!important}#zpf .cd{padding:14px 8px!important;border-radius:18px!important}#zpf .cd i{width:44px!important;height:44px!important;margin-bottom:6px!important}#zpf .cd svg{width:20px!important;height:20px!important}#zpf .cd b{font-size:14.500px!important}#zpf .cd span{font-size:12px!important}#zpf .vd{width:min(300px,78vw)!important;height:380px!important}#zpf .tb a{padding:6px 12px!important;font-size:12.500px!important}#zvf{padding:5px!important;font-size:0!important;gap:0!important;right:12px!important;bottom:12px!important}#zvf i{width:30px!important;height:30px!important}#zcb{left:10px!important;bottom:10px!important}#zcb .fab{width:52px!important;height:52px!important}#zcb .fab::before{width:30px!important;height:30px!important}#zfb{margin-top:34px!important;padding:0 8px!important}#zfb .hd{padding:40px 16px 70px!important;border-radius:50% 50% 0 0/70px 70px 0 0!important}#zfb .cd{margin:-48px 8px 0!important;padding:18px 14px 20px!important}#zfb .ch a{padding:5px 12px!important;font-size:12.500px!important}#zab .hd,.zpg .hd{border-radius:50% 50% 0 0/70px 70px 0 0!important;padding:44px 16px 70px!important}#zab .cs,.zpg .gr,.zpg .fq{margin:-44px 10px 0!important;gap:10px!important}#zab .st,#zab .cl,.zpg .nt{margin-inline:10px!important}#zab .c,.zpg .c{padding:16px 14px!important}.zpg summary{padding:14px 16px!important;font-size:15px!important}.zpg details p{padding:0 16px 14px!important;font-size:14px!important}#zft::before{border-radius:50% 50% 0 0/90px 90px 0 0!important}#zft .gr{padding:0 14px!important;gap:12px!important}#zft .bt{padding-bottom:76px!important}#zmq{padding:10px 0!important;margin:20px 0 6px!important}#zmq span{font-size:14px!important;gap:18px!important;padding-inline-end:18px!important}.zdt{top:14px!important;left:-48px!important;font-size:12px!important;padding:3px 0!important}.zold{font-size:14px!important;margin-inline-start:8px!important}#zvf{padding:5px 13px 5px 6px!important;font-size:12px!important;gap:7px!important}.zcs .bn{min-height:176px!important;background-size:auto 138%!important;background-position:left center!important;background-blend-mode:normal!important;background-color:#425548!important}.zcs .bn::before{background:rgba(52,68,58,.660)!important}#zsw .tabs{gap:7px!important;margin-bottom:10px!important}#zsw .tabs a{padding:6px 14px!important;font-size:12.500px!important}#zsw .st{height:205px!important}#zsw .pi{width:185px!important;height:185px!important;margin:-92px 0 0 -92px!important}#zsw .cd{margin-top:-26px!important;padding:38px 18px 20px!important}.zt,.zpg .tt,#zab .tt{white-space:nowrap!important}#zpf .vd{width:min(336px,90vw)!important;height:610px!important}#zpf .c2 .fn{top:90px!important;height:calc(100% - 134px)!important}#zpf .rc{top:52px!important}#zpf .pg{bottom:20px!important}#zpf .c2 .fh b{white-space:nowrap}#zpf .c2 .fh small{white-space:nowrap}#zpf .sn{padding:92px 20px 52px!important}#zpf .sn img{max-height:46%!important}#zpf .c3{padding:92px 12px 48px!important}#zpf .c3 .rw span{width:88px!important;height:88px!important}}';
  function mob(d){if(d.getElementById('zmob'))return;var st=d.createElement('style');st.id='zmob';st.textContent=MOBCSS;(d.body||d.head).appendChild(st)}
  function offerBanner(d,w){
    var z=d.getElementById('zob');
    if(z){
      var on=!!w.__zOffers;if((z.style.display!=='none')!==on)z.style.display=on?'':'none';
      if(on){var cw=d.documentElement.clientWidth;if(z.style.width!==cw+'px')z.style.width=cw+'px';var cl=parseFloat(z.style.left)||0,nat=z.getBoundingClientRect().left-cl;if(Math.abs(nat+cl)>.5)z.style.left=(-nat)+'px'}
      return;
    }
    if(!w.__zOffers)return;
    var grid=null;arr(d.querySelectorAll('.s-product-card-entry.zadd')).forEach(function(c){if(!grid)grid=c.parentElement});if(!grid)return;
    var h=null,pp=grid.parentElement;while(pp&&pp!==d.body&&!h){h=arr(pp.querySelectorAll('h1,h2')).filter(function(e){return e.__zsh||key(e.textContent)==='كلالهدايا'})[0]||null;if(pp.querySelector('#zsw,#zwh,#zbw'))break;pp=pp.parentElement}
    if(h&&h.closest('section')&&h.closest('section').querySelector('#zsw'))h=null;
    var anchor=h||grid;
    var st=d.createElement('style');
    st.textContent='#zob{position:relative;max-width:none;box-sizing:border-box;direction:rtl;background:#c0392b;height:clamp(150px,15vw,210px);overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 clamp(18px,5vw,90px);margin:0 0 26px}'
      +'#zob .tx{height:100%;overflow:hidden;flex:1;min-width:0;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 22%,#000 78%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 22%,#000 78%,transparent)}#zob .tx div{display:flex;flex-direction:column;animation:zobu 9s linear infinite}'
      +'#zob .tx b{display:block;font:900 clamp(40px,6.200vw,92px)/1.350 "Noto Kufi Arabic",sans-serif;white-space:nowrap;color:#fff}#zob .tx b:nth-child(odd){color:transparent;-webkit-text-stroke:2px #fff}'
      +'#zob .bn{flex:none;background:#fff;color:#2e3a33;padding:clamp(10px,1.200vw,16px) clamp(22px,3vw,46px);font:900 clamp(16px,1.700vw,24px) "Noto Kufi Arabic",sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:14px;transition:translate .25s,background .25s,color .25s;animation:zobp 2s ease-in-out infinite}#zob .bn:hover{background:#2e3a33;color:#fff}#zob .bn::after{content:"";width:10px;height:10px;border-left:3px solid currentColor;border-bottom:3px solid currentColor;rotate:45deg}'
      +'#zob small{position:absolute;left:14px;top:50%;writing-mode:vertical-rl;rotate:180deg;translate:0 -50%;color:#ffd9d2;font:800 11px "Noto Kufi Arabic",sans-serif;white-space:nowrap}'
      +'@keyframes zobu{to{transform:translateY(-50%)}}@keyframes zobp{50%{scale:1.060}}@media(max-width:760px){#zob{padding:0 34px 0 16px!important;height:130px!important}#zob .tx b{font-size:34px!important;-webkit-text-stroke-width:1.300px!important}#zob .bn{font-size:14px!important;padding:8px 16px!important}}';
    d.head.appendChild(st);
    z=d.createElement('div');z.id='zob';
    var rows='';for(var i=0;i<8;i++)rows+='<b>'+kash('عروض حصرية')+'</b>';
    z.innerHTML='<div class="tx"><div>'+rows+'</div></div><a class="bn">تسوق الآن</a><small>تطبق الشروط والأحكام</small>';
    anchor.parentElement.insertBefore(z,anchor);
    z.querySelector('.bn').onclick=function(){try{grid.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}};
  }
  function ptools(){
    var D=document;if(D.__zpt)return;
    var T=['الرئيسية','كل المنتجات','صفحة المنتج','من نحن','الاستبدال والاسترجاع','التنفيذ والتوثيق','الخصوصية','الشروط','الأسئلة الشائعة'];
    var els=arr(D.querySelectorAll('button,a,[role="tab"],[role="button"]')),tabs=els.filter(function(e){return T.indexOf(norm(e.textContent))>-1});
    var mob=els.filter(function(e){return norm(e.textContent)==='جوال'})[0],web=els.filter(function(e){return norm(e.textContent)==='ويب'})[0];
    if(tabs.length<5||!mob||!web)return;
    D.__zpt=1;
    tabs.forEach(function(e){imp(e,'display','none')});
    var st=D.createElement('style');
    st.textContent='.ztg{display:inline-flex!important;align-items:center!important;gap:4px!important;background:#425548!important;border:0!important;border-radius:999px!important;padding:5px!important;box-shadow:0 8px 18px -8px rgba(0,0,0,.45),inset 0 0 0 2px #b88458!important}.ztg .ztb{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex!important;align-items:center;gap:8px;flex-direction:row-reverse;font:800 14px "Noto Kufi Arabic",sans-serif!important;color:#e6c9a8!important;background:transparent!important;border-radius:999px!important;padding:8px 18px!important;transition:background .25s,color .25s,transform .2s}.ztg .ztb:hover{color:#fff!important}.ztg .ztb.zon{background:#f4efe6!important;color:#425548!important;box-shadow:0 4px 10px rgba(0,0,0,.25)}.ztg .ztb svg{width:18px;height:18px;stroke:currentColor}.ztg .ztb:active{transform:scale(.95)}';
    D.head.appendChild(st);
    function bg(e){var m=/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[,/ ]+([\d.]+))?/.exec(getComputedStyle(e).backgroundColor||'');return m&&(m[4]===undefined||+m[4]>.2)?1:0}
    var act=bg(mob)&&!bg(web)?mob:web;
    var box=mob.parentElement===web.parentElement?mob.parentElement:null;if(box)box.classList.add('ztg');
    D.__zmobEl=mob;[mob,web].forEach(function(b){b.classList.add('ztb');b.addEventListener('click',function(){mob.classList.toggle('zon',b===mob);web.classList.toggle('zon',b===web);setTimeout(function(){try{pframe()}catch(e){}},40);setTimeout(function(){try{pframe()}catch(e){}},300)})});
    act.classList.add('zon');
  }
  var SHT={1:'ماء وتمر ووجبات توصل لضيوف الرحمن باسمك',2:'مصاحف وسجاد وسبح ومساويك تهدى باسم من تحب',3:'كل اللي يحتاجه الحاج والمعتمر في طريقه',4:'أطقم وهدايا مرتبة تقدم لضيوف الرحمن'};
  function shopMode(d,w){
    var grid=null;arr(d.querySelectorAll('.s-product-card-entry.zadd')).forEach(function(c){if(!grid)grid=c.parentElement});if(!grid)return;
    var g=+w.__zCat||0,of=!!w.__zOffers,ttl=of?'العروض':g?SWCATS[g]:'كل الهدايا',sig=ttl+'|'+g;
    if(grid.__zsig===sig)return;grid.__zsig=sig;
    var G={};SWP.forEach(function(x){G[key(x[0])]=x[4]});
    arr(grid.children).forEach(function(c){if(!c.classList||!c.classList.contains('s-product-card-entry'))return;
      var t=c.querySelector('.s-product-card-content-title'),k=t?key(t.textContent):'';
      if(c.__znb||c.textContent.indexOf('بوكس')>-1){imp(c,'display','none');return}
      if(g&&G[k]!==g)imp(c,'display','none');else c.style.removeProperty('display')});
    var h=null,pp=grid.parentElement;while(pp&&pp!==d.body&&!h){h=arr(pp.querySelectorAll('h1,h2')).filter(function(e){return !e.closest('#zob')&&(e.__zsh||key(e.textContent)==='كلالهدايا')})[0]||null;if(pp.querySelector('#zsw,#zwh,#zbw'))break;pp=pp.parentElement}
    if(h){h.__zsh=1;var tn=arr(h.childNodes).filter(function(n){return n.nodeType===3});if(tn.length){tn[0].nodeValue=kash(ttl);tn.slice(1).forEach(function(n){n.nodeValue=''})}else h.insertBefore(d.createTextNode(kash(ttl)),h.firstChild);
      var sub=h.parentElement.querySelector('.zshs');if(!sub){sub=d.createElement('p');sub.className='zshs';sub.style.cssText='text-align:center;margin:6px 0 18px;font:800 16px "Noto Kufi Arabic",sans-serif;color:#b88458';h.parentElement.insertBefore(sub,h.nextSibling)}
      sub.textContent=of?'خصومات حصرية على هدايا ضيوف الرحمن':g?SHT[g]:'';sub.style.display=sub.textContent?'':'none'}
    arr(d.querySelectorAll('a,span,li')).forEach(function(e){if(e.children.length||e.closest('.s-product-card-entry,#zob,#zh,#zft,#zsw,.zcs,#zcb'))return;if(!e.__zbc&&(e.offsetParent===null||key(e.textContent)!=='كلالهدايا'))return;e.__zbc=1;e.textContent=ttl});
  }
  function pframe(){
    var D=document,W=window,r=f.getBoundingClientRect(),ph=D.__zph,me=D.__zmobEl,mobile=(me&&D.body.contains(me)&&(me.classList.contains('zon')||D.querySelector('.ztb.zon')))?me.classList.contains('zon'):(r.width>0&&r.width<560);
    if(!D.getElementById('zph-css')){var st=D.createElement('style');st.id='zph-css';st.textContent='.zphone{width:464px!important;height:980px!important;min-width:464px!important;min-height:980px!important;max-width:none!important;max-height:none!important;flex:none!important;border:12px solid #1d1d20!important;border-radius:76px!important;box-shadow:0 0 0 2px #8a8a90,0 0 0 5px #2a2a2d,0 40px 80px -24px rgba(0,0,0,.6)!important;background:#425548!important;padding:58px 0 0!important;box-sizing:border-box!important;overflow:hidden!important;transform:scale(var(--zs,1))!important;transform-origin:50% 0!important;margin:0 calc((var(--zs,1) - 1)*232px) calc((var(--zs,1) - 1)*980px)!important}.zphone iframe{border-radius:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;border:0!important;display:block!important}#zisl{position:fixed;z-index:50;width:126px;height:37px;border-radius:999px;background:#0b0b0c;pointer-events:none;display:none;box-shadow:inset 0 0 0 1px #222;transform-origin:50% 0}#zisl::after{content:"";position:absolute;right:16px;top:12px;width:13px;height:13px;border-radius:50%;background:#1b2330;box-shadow:inset 0 0 0 2px #0f141d}#zhmb{position:fixed;z-index:50;width:150px;height:5px;border-radius:5px;background:rgba(20,20,22,.8);pointer-events:none;display:none;transform-origin:50% 100%}';D.head.appendChild(st)
      var a=D.createElement('div');a.id='zisl';D.body.appendChild(a);var b=D.createElement('div');b.id='zhmb';D.body.appendChild(b)}
    var isl=D.getElementById('zisl'),hm=D.getElementById('zhmb');
    if(!mobile){if(ph){ph.classList.remove('zphone')}isl.style.display='none';hm.style.display='none';return}
    if(!ph||!D.body.contains(ph)){var e=f,k=0;ph=null;while(e&&k<4){var cs=getComputedStyle(e);if(parseFloat(cs.borderTopWidth)>3||parseFloat(cs.borderTopLeftRadius)>18){ph=e;break}e=e.parentElement;k++}if(!ph)ph=f.parentElement;D.__zph=ph}
    if(!ph.classList.contains('zphone'))ph.classList.add('zphone');
    var pr=ph.getBoundingClientRect(),top=pr.top+(W.pageYOffset||0);
    var s=Math.min(1,(W.innerHeight-top-18)/980,(W.innerWidth-20)/464);if(!(s>.3))s=.3;s=Math.round(s*1000)/1000;
    if(ph.__zs!==s){ph.__zs=s;ph.style.setProperty('--zs',s);pr=ph.getBoundingClientRect()}
    var cx=pr.left+pr.width/2;
    isl.style.display='block';isl.style.transform='scale('+s+')';isl.style.left=(cx-63)+'px';isl.style.top=(pr.top+26*s)+'px';
    hm.style.display='block';hm.style.transform='scale('+s+')';hm.style.left=(cx-75)+'px';hm.style.top=(pr.bottom-24*s-5)+'px';
  }
  function fitTitles(d,w){
    var mob=w.innerWidth<=760;
    arr(d.querySelectorAll('.zt,.zpg .tt,#zab .tt')).forEach(function(e){
      if(!mob){if(e.__zfit){e.style.removeProperty('font-size');e.__zfit=''}return}
      if(e.offsetParent===null)return;var sig=e.textContent+'|'+e.clientWidth;if(e.__zfit===sig)return;e.__zfit=sig;
      var n=25;e.style.setProperty('font-size',n+'px','important');
      while(n>13&&e.scrollWidth>e.clientWidth+1){n--;e.style.setProperty('font-size',n+'px','important')}
    });
  }
  function catSecs(d,w){
    var sw=d.getElementById('zsw');if(!sw||d.querySelector('.zcs'))return;
    var sec=sw.closest('section')||sw.parentElement;if(!sec||!sec.parentElement)return;
    if(!d.getElementById('zcs-css')){var st=d.createElement('style');st.id='zcs-css';st.textContent=CSCSS;d.head.appendChild(st)}
    var ORD=['الأول','الثاني','الثالث','الرابع'],allCards=arr(d.querySelectorAll('.s-product-card-entry'));
    [1,2,3,4].forEach(function(g){
      var z=d.createElement('div');z.className='zcs';
      z.innerHTML='<div class="bn'+(CSBN[g]?'':' np')+'"><div class="tx"><small>القسم '+ORD[g-1]+'</small><h3></h3><p></p><a class="all">عرض الكل</a></div></div><div class="zg"></div>';
      if(CSBN[g])z.querySelector('.bn').style.backgroundImage='url('+CSBN[g]+')';
      z.querySelector('h3').textContent=SWCATS[g];z.querySelector('p').textContent=CSTX[g];
      z.querySelector('.all').onclick=function(){var na=d.querySelector('#zh .zh2 a[data-t="كل الهدايا"]');if(na){na.click();w.__zCat=g;w.__zOffers=0;try{w.scrollTo(0,0)}catch(e){}return}var tb=sw.querySelector('.tabs a[data-g="'+g+'"]');if(tb)tb.click();var zh=d.getElementById('zh');w.scrollTo({top:sw.getBoundingClientRect().top+w.pageYOffset-((zh?zh.offsetHeight:0)+16),behavior:'smooth'})};
      var gr=z.querySelector('.zg'),items=SWP.filter(function(p){return p[4]===g});if(items.length<4)gr.classList.add('zctr');
      items.forEach(function(p){var c=d.createElement('div');c.className='zc';c.innerHTML='<i><img alt=""></i><b></b><small></small><span class="zpr"></span><a class="zad"></a>';
        c.querySelector('img').src='img/cut/'+p[3]+'.png';c.querySelector('b').textContent=p[0];c.querySelector('small').textContent=p[1];c.querySelector('.zpr').textContent=p[2]+' ر.س';
        var real=allCards.filter(function(k){var t=k.querySelector('.s-product-card-content-title');return t&&key(norm(t.textContent))===key(p[0])})[0],btn=real&&(real.querySelector('[data-add]')||real.querySelector('button:not(.s-product-card-wishlist-btn)'));
        var ad=c.querySelector('.zad');ad.textContent=btn?'أضف للسلة':'اطلب الآن';
        c.onclick=function(e){if(gr.__mv>6)return;if(e.target===ad&&btn){btn.click();return}window.__zOpen(p[0])};gr.appendChild(c)});
      var dn=null;gr.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'){dn={x:e.clientX,s:gr.scrollLeft};gr.__mv=0}});
      gr.addEventListener('pointermove',function(e){if(!dn)return;var dx=e.clientX-dn.x;gr.__mv=Math.max(gr.__mv,Math.abs(dx));gr.scrollLeft=dn.s-dx});
      w.addEventListener('pointerup',function(){dn=null});
      sec.parentElement.insertBefore(z,sec);
      try{var io=new w.IntersectionObserver(function(es){es.forEach(function(e){z.classList.toggle('in',e.isIntersecting)})},{threshold:.18});io.observe(z)}catch(e){z.classList.add('in')}
    });
  }

  /* ===== الوضع الداكن واللغة الإنجليزية ===== */
  var ZEN={"الرئيسية": "Home", "كل الهدايا": "All Gifts", "تمور ومياه": "Dates & Water", "مصاحف ومستلزمات": "Qurans & Essentials", "من نحن": "About Us", "ابحث": "Search", "سقيا وضيافة": "Water & Hospitality", "مصاحف وعبادة": "Qurans & Worship", "مستلزمات الحاج": "Pilgrim Essentials", "أطقم وهدايا": "Sets & Gifts", "الأقسام": "Categories", "العروض": "Offers", "حسابي": "My Account", "السلة": "Cart", "المفضلة": "Wishlist", "الإشعارات": "Notifications", "ما عندك إشعارات جديدة": "You have no new notifications", "ابحث عن هدية": "Search for a gift", "بحث": "Search", "القائمة": "Menu", "زاد الضيف": "Zad Al-Daif", "إغلاق": "Close", "أول ما يصير شي على طلبك نبلغك هنا": "We will notify you here as soon as your order is updated", "الطلبات": "Orders", "ما عندك طلبات للحين": "You have no orders yet", "اختر هديتك ونجهزها ونوصلها لضيوف الرحمن": "Choose your gift and we prepare and deliver it to the guests of Allah", "طلبات بانتظار الدفع": "Orders awaiting payment", "ما عندك طلبات بانتظار الدفع": "You have no orders awaiting payment", "كل طلباتك مدفوعة": "All your orders are paid", "قائمة الأمنيات": "Wishlist", "قائمة أمنياتك فاضية": "Your wishlist is empty", "اضغط القلب على أي هدية وتلقاها هنا": "Tap the heart on any gift to find it here", "محفظتي": "My Wallet", "رصيد محفظتك 0 ر.س": "Your wallet balance is SAR 0", "أي مبلغ مسترجع ينزل في محفظتك": "Any refunded amount goes to your wallet", "الاسم الأول": "First name", "الاسم الأخير": "Last name", "تاريخ الميلاد": "Date of birth", "حدد تاريخ ميلادك": "Select your date of birth", "الجنس": "Gender", "حدد الجنس": "Select gender", "ذكر": "Male", "أنثى": "Female", "البريد الإلكتروني": "Email", "رقم الجوال": "Mobile number", "حفظ": "Save", "الرسائل الترويجية": "Promotional messages", "اختر اذا كنت ترغب في استلام عروض وجديد زاد الضيف": "Choose whether you want to receive Zad Al-Daif offers and news", "حذف الحساب": "Delete account", "سيحذف حسابك وبياناتك من المتجر نهائيا بما في ذلك سجل طلباتك": "Your account and data will be permanently deleted including your order history", "تصفح الهدايا": "Browse gifts", "أضف صورتك": "Add your photo", "صور بالكاميرا": "Take a photo", "اختر من الألبوم": "Choose from album", "اسم العميل": "Customer name", "عميل زاد الضيف": "Zad Al-Daif customer", "تسجيل الخروج": "Log out", "تم حفظ بياناتك": "Your details are saved", "لون الثيم": "Theme", "فاتح": "Light", "داكن": "Dark", "اللغة": "Language", "عربي": "Arabic", "التصنيفات الأكثر بحثا": "Most searched categories", "نتائج البحث": "Search results", "الأكثر بحثا": "Most searched", "ما لقينا هدية بهذا الاسم جرب كلمة ثانية": "No gift found with this name. Try another word", "ر.س": "SAR", "مصاحف": "Qurans", "مصحف يهدى": "A Quran gifted", "لضيف الرحمن": "to a guest of Allah", "أهد مصحفا باسمك أو باسم من تحب ونوثق لك التنفيذ": "Gift a Quran in your name or a loved one's name and we document it for you", "أهد مصحفا": "Gift a Quran", "مصحف باسم من تحب": "Quran in a Loved One's Name", "سجاد ومسابح": "Rugs & Prayer Beads", "سجادة ومسبحة": "A rug and prayer beads", "هدية تبقى": "A lasting gift", "سجادات صلاة مع مسابحها توصل لضيوف الرحمن باسم من تهديه": "Prayer rugs with their beads delivered to the guests of Allah in the name you choose", "تصفح السجاد": "Browse rugs", "سجادة صلاة": "Prayer Rug", "طقم العمرة": "Umrah Set", "طقم إحرام": "Ihram Set", "طقم إحرام كامل بحقيبته يهدى للمعتمر باسمك": "A complete Ihram set with its bag gifted to a pilgrim in your name", "اطلب طقم العمرة": "Order the Umrah set", "كراسي الصلاة": "Prayer Chairs", "كرسي صلاة": "Prayer chair", "قابل للطي": "Foldable", "خفيف وسهل الحمل عون لكبار السن من ضيوف الرحمن": "Light and easy to carry. A help for elderly guests of Allah", "اطلب الكرسي": "Order the chair", "كرسي صلاة قابل للطي": "Foldable Prayer Chair", "الكراسي المتحركة": "Wheelchairs", "كراسي متحركة": "Wheelchairs", "لضيوف الرحمن": "for the guests of Allah", "كرسي متحرك يهدى لمن يحتاجه من كبار السن": "A wheelchair gifted to an elderly pilgrim who needs it", "وجبة الحرم": "Haram Meal", "أطعم ضيف الرحمن": "Feed a guest of Allah", "باسمك": "in your name", "وجبة وتمر وماء اختر العدد واترك التوزيع والتوثيق علينا": "Meal, dates and water. Choose the quantity and leave distribution and documentation to us", "اطلب الوجبات": "Order meals", "وجبة إفطار": "Iftar Meal", "مستلزمات الحجاج": "Pilgrim Essentials", "لضيوف بيت الرحمن": "for the guests of the House of Allah", "مظلة وتمر ومسواك وماء كل اللي يحتاجه الحاج في طريقه": "Umbrella, dates, miswak and water. Everything a pilgrim needs on the way", "تصفح المستلزمات": "Browse essentials", "السابق": "Previous", "التالي": "Next", "تسوق حسب الهدية": "Shop by gift", "سقيا ماء": "Drinking Water", "تمور": "Dates", "وجبات": "Meals", "مساويك": "Miswak", "بوكسات": "Boxes", "هدايا": "Gifts", "اختر الهدية والعدد": "Choose the gift and quantity", "تمر أو ماء أو وجبة أو مصحف وغيرها وحدد الكمية اللي تناسبك": "Dates, water, a meal, a Quran and more. Pick the quantity that suits you", "اكتب الاسم أو الإهداء": "Write the name or dedication", "نكتبه على الطلب كما هو فراجع الإملاء قبل الدفع": "We write it on the order exactly as is so check the spelling before paying", "نجهز ونوزع ونوثق": "We prepare, distribute and document", "نسلمها لضيوف الرحمن ويوصلك مقطع التوثيق على واتساب": "We hand it to the guests of Allah and send you the documentation clip on WhatsApp", "يجهز ويوزع على ضيوف الرحمن في الحرم مع كتابة الاسم أو الإهداء اللي تختاره": "Prepared and distributed to the guests of Allah at the Haram with the name or dedication you choose", "قطع": "pieces", "قطعة": "piece", "توثيق بالفيديو": "Video documentation", "يوصلك على واتساب": "Sent to you on WhatsApp", "باسم من تحب": "In a loved one's name", "اسم أو إهداء على الطلب": "A name or dedication on the order", "فاتورة إلكترونية": "E-invoice", "لكل طلب": "For every order", "دفع آمن": "Secure payment", "مدى و": "Mada, ", "والبطاقات": "and cards", "نصور لك التوزيع": "We film the distribution for you", "نكتبه كما هو": "We write it as is", "تجيك بعد الدفع": "You get it after payment", "بدون رسوم إضافية": "No extra fees", "قرآن": "Quran", "سجاد": "Rugs", "سبح": "Prayer Beads", "كراسي صلاة": "Prayer Chairs", "مظلات": "Umbrellas", "تعبئة ماء زمزم": "Zamzam Water Filling", "اسق ضيف الرحمن ولك الأجر": "Give water to a guest of Allah and earn the reward", "عبوة خفيفة يعبي فيها الضيف ماء زمزم": "A light bottle the guest fills with Zamzam water", "تمر فاخر يقدم لضيوف الرحمن باسمك": "Premium dates offered to the guests of Allah in your name", "وجبة متكاملة مرتبة لضيف الرحمن": "A complete well-packed meal for a guest of Allah", "تمر ومسواك وسبحة ومصلية في بوكس واحد": "Dates, miswak, beads and a prayer mat in one box", "هدية مرتبة بكيس زاد الضيف": "A neat gift in a Zad Al-Daif bag", "مصحف يهدى لضيف الرحمن": "A Quran gifted to a guest of Allah", "مصحف باسم من تحب مكتوب على الغلاف": "A Quran with a loved one's name written on the cover", "سجادة صلاة رفيقة الصلاة والسكينة": "A prayer rug for prayer and serenity", "سبحة تبقى مع الضيف وتذكره بالدعاء": "Beads that stay with the guest as a reminder to pray", "مسواك مغلف بعناية": "Carefully wrapped miswak", "طقم إحرام كامل بحقيبته": "A complete Ihram set with its bag", "مظلة تظلل الحاج في طريقه": "An umbrella that shades the pilgrim on the way", "كرسي خفيف راحة أثناء الصلاة": "A light chair for comfort during prayer", "عون لكبار السن من ضيوف الرحمن": "A help for elderly guests of Allah", "كل اللي يحتاجه الحاج في طريقه": "Everything a pilgrim needs on the way", "القسم المختار": "Selected category", "تسوق الآن": "Shop now", "يسار": "Left", "لف": "Spin", "يمين": "Right", "ريال": "SAR", "تمر الضيافة": "Hospitality Dates", "مسواك الضيف": "Guest Miswak", "وصل حديثا": "New arrivals", "الأكثر طلبا": "Best sellers", "محتار وش تختار؟": "Not sure what to choose?", "تواصل معنا": "Contact us", "كلمنا على واتساب ونساعدك تختار الهدية والكمية المناسبة": "Message us on WhatsApp and we help you pick the right gift and quantity", "اختر هديتك واترك الباقي علينا": "Choose your gift and leave the rest to us", "الكل": "All", "كرتون مياه لضيوف الرحمن": "A carton of water for the guests of Allah", "عبوة ماء زمزم": "Zamzam Water Bottle", "علبة تمر باسمك أو باسم من تحب": "A box of dates in your name or a loved one's name", "وجبة متكاملة مرتبة": "A complete well-packed meal", "قرآن كريم": "Holy Quran", "مصحف مع كتابة الاسم": "A Quran with the name written", "رفيقة الصلاة والسكينة": "For prayer and serenity", "سبحة الضيف": "Guest Prayer Beads", "مظلة الحاج": "Pilgrim Umbrella", "راحة أثناء الصلاة": "Comfort during prayer", "كرسي متحرك": "Wheelchair", "طقم مصاحف الضيف": "Guest Quran Set", "ثلاثة مصاحف بألوان مختلفة تهدى لضيوف الرحمن": "Three Qurans in different colors gifted to the guests of Allah", "كيس هدايا زاد الضيف": "Zad Al-Daif Gift Bag", "أضف للسلة": "Add to cart", "اطلب الآن": "Order now", "كيف ننفذ طلبك": "How we fulfil your order", "نرسل لك مقطع": "We send you a clip", "نستلم طلبك": "We receive your order", "نجهز الهدية": "We prepare the gift", "والاسم أو الإهداء كما كتبته": "with the name or dedication as you wrote it", "ونسلمها لضيوف الرحمن في الحرم": "and hand it to the guests of Allah at the Haram", "نرسل لك التوثيق": "We send you the documentation", "مقطع فيديو على واتساب": "A video clip on WhatsApp", "الهدية": "The gift", "نكتب الاسم أو عبارة الإهداء كما تدخلها": "We write the name or dedication exactly as you enter it", "التوزيع": "Distribution", "فريقنا يسلمها لضيوف الرحمن في الحرم": "Our team hands it to the guests of Allah at the Haram", "التوثيق": "Documentation", "يوصلك مقطع فيديو على واتساب": "A video clip reaches you on WhatsApp", "واتساب": "WhatsApp", "البريد": "Email", "السجل التجاري": "Commercial Registration", "موثق في المركز السعودي للأعمال": "Verified by the Saudi Business Center", "جميع الحقوق": "All rights", "منصة سلة": "Salla platform", "هدايا تقدم بمحبة نجهزها ونوصلها لضيوف الرحمن نيابة عنك": "Gifts offered with love. We prepare and deliver them to the guests of Allah on your behalf", "روابط مهمة": "Important links", "طرق الدفع": "Payment methods", "مدى": "Mada", "حوالة بنكية": "Bank transfer", "تابعنا": "Follow us", "انستقرام": "Instagram", "سناب شات": "Snapchat", "تيك توك": "TikTok", "اكس": "X", "يوتيوب": "YouTube", "فيسبوك": "Facebook", "متجر موثق": "Verified store", "متجر لبيع الهدايا والمنتجات وتوصيلها ولا نستقبل تبرعات": "A store that sells and delivers gifts and products. We do not accept donations", "جميع الحقوق محفوظة ل زاد الضيف": "All rights reserved to Zad Al-Daif", "متجر على منصة سلة": "A store on Salla platform", "اسم المنتج": "Product name", "نص تقييم العميل يظهر هنا من تقييمات المتجر الحقيقية": "The customer review text appears here from the real store reviews", "مشتري موثق": "Verified buyer", "آراء عملائنا": "Customer reviews", "كلام عملائنا بعد ما وصلت هداياهم لضيوف الرحمن": "What our customers say after their gifts reached the guests of Allah", "عملاؤنا يتكلمون عنا": "Our customers talk about us", "من": "from", "تقييم": "review", "التقييمات تظهر هنا بعد ربطها بالمتجر": "Reviews appear here once connected to the store", "ماء وتمر ووجبات توصل لضيوف الرحمن باسمك": "Water, dates and meals delivered to the guests of Allah in your name", "مصاحف وسجاد وسبح ومساويك تهدى باسم من تحب": "Qurans, rugs, beads and miswak gifted in a loved one's name", "كل اللي يحتاجه الحاج والمعتمر في طريقه": "Everything a Hajj or Umrah pilgrim needs on the way", "هدايا مرتبة وجاهزة تقدم لضيوف الرحمن": "Neat ready gifts offered to the guests of Allah", "شاهد كيف نوثق طلبك": "See how we document your order", "بعد توزيع هديتك يوصلك مقطع فيديو يوثق التنفيذ على واتساب": "After your gift is distributed a video clip documenting it reaches you on WhatsApp", "يوصلك على واتساب بعد التوزيع": "Sent on WhatsApp after distribution", "نكتب الاسم او الاهداء كما هو": "We write the name or dedication as is", "نجهز هديتك": "We prepare your gift", "عن والدتي رحمها الله": "On behalf of my late mother", "نكتب الاسم كما هو": "We write the name as is", "نوزعها على ضيوف الرحمن": "We distribute it to the guests of Allah", "يوصلك مقطع التوثيق على واتساب": "The documentation clip reaches you on WhatsApp", "متصل الآن": "Online now", "اليوم": "Today", "طلبك جاهز وكتبنا الاسم كما هو": "Your order is ready and we wrote the name as is", "ص": "AM", "وصلنا الحرم وجاري التوزيع": "We reached the Haram and distribution is under way", "م": "PM", "مقطع توثيق طلبك": "Your order documentation clip", "اكتب رسالة": "Write a message", "وصلك التوثيق": "Documentation delivered", "تم توزيع هديتك بامان": "Your gift was distributed safely", "عرض توضيحي": "Illustration", "رحلة الطلب": "Order journey", "على جوالك": "On your phone", "تم التوزيع": "Distributed", "توزيع في الحرم": "Distribution at the Haram", "لضيوف الرحمن يدا بيد": "to the guests of Allah hand to hand", "كل طلب له مقطع توثيق خاص": "Every order has its own documentation clip", "اختر هديتك": "Choose your gift", "شحن مجاني": "Free shipping", "شحن سريع": "Fast shipping", "هدايا تقدم بمحبة": "Gifts offered with love", "شكرا لاختياركم": "Thank you for choosing us", "زاد الضيف متجر سعودي إلكتروني يقدم هدايا ومنتجات مختارة ونجهزها ونوصلها لضيوف الرحمن في الحرم نيابة عنك باسمك أو باسم من تحب": "Zad Al-Daif is a Saudi online store offering selected gifts and products. We prepare and deliver them to the guests of Allah at the Haram on your behalf in your name or a loved one's name", "هدايا مختارة بعناية": "Carefully selected gifts", "تمور ومياه ووجبات ومصاحف ومستلزمات صلاة بتغليف يليق بالضيف": "Dates, water, meals, Qurans and prayer essentials in packaging worthy of the guest", "باسمك أو باسم من تحب": "In your name or a loved one's name", "نكتب الاسم أو عبارة الإهداء على طلبك كما تكتبها": "We write the name or dedication on your order as you write it", "يوصلك مقطع التوثيق على واتساب بعد التنفيذ": "The documentation clip reaches you on WhatsApp after fulfilment", "كيف نشتغل": "How we work", "تختار الهدية والعدد من المتجر وتكتب الاسم أو الإهداء": "You choose the gift and quantity from the store and write the name or dedication", "تفوضنا بتجهيز الطلب وتسليمه لضيوف الرحمن نيابة عنك": "You authorize us to prepare the order and hand it to the guests of Allah on your behalf", "نجهز الطلب ونوزعه ونرسل لك التوثيق": "We prepare the order, distribute it and send you the documentation", "وضوح وشفافية": "Clarity and transparency", "زاد الضيف متجر لبيع الهدايا والمنتجات وتوصيلها ولا يستقبل التبرعات أو يجمعها": "Zad Al-Daif is a store that sells and delivers gifts and products. It does not accept or collect donations", "أسعار كل المنتجات معلنة في المتجر وتصدر لك فاتورة إلكترونية مع كل طلب": "All product prices are shown in the store and an e-invoice is issued with every order", "شكرا لاختياركم زاد الضيف": "Thank you for choosing Zad Al-Daif", "سياسة الاستبدال والاسترجاع": "Exchange & Return Policy", "نحرص على تجربة واضحة وموثوقة وننفذ طلبك ونوزعه على ضيوف الرحمن حسب التفاصيل اللي حددتها": "We care about a clear and reliable experience. We fulfil your order and distribute it to the guests of Allah according to the details you set", "إلغاء الطلب واسترداد المبلغ": "Order cancellation and refund", "تقدر تطلب إلغاء طلبك واسترداد المبلغ ما دام التجهيز أو التوزيع لم يبدأ. بعد بدء التجهيز أو التنفيذ لا يمكن الإلغاء أو الاسترجاع لأن الهدية تنفذ وتوزع نيابة عنك": "You can request to cancel your order and get a refund as long as preparation or distribution has not started. After preparation or fulfilment starts, cancellation or return is not possible because the gift is fulfilled and distributed on your behalf", "المنتجات المخصصة": "Customized products", "المنتجات اللي يكتب عليها اسم أو إهداء لا يمكن استرجاعها أو إلغاؤها بعد بدء تجهيزها": "Products with a written name or dedication cannot be returned or cancelled after preparation starts", "الوجبات والمنتجات الغذائية": "Meals and food products", "لطبيعتها وسرعة تجهيزها وتوزيعها لا يمكن استبدالها أو استرجاعها بعد بدء التجهيز": "Due to their nature and fast preparation and distribution they cannot be exchanged or returned after preparation starts", "وجود خطأ في الطلب": "An error in the order", "إذا نفذنا منتجا مختلفا عن طلبك أو لم ينفذ بالشكل المتفق عليه تواصل معنا برقم الطلب ونراجع الحالة ونختار الأنسب": "If we fulfilled a product different from your order or it was not fulfilled as agreed, contact us with the order number and we review the case and choose the most suitable option", "إعادة تنفيذ الطلب بالشكل الصحيح": "Re-fulfilling the order correctly", "تعويضك عند الحاجة": "Compensating you when needed", "استرداد قيمة الطلب أو الجزء المتأثر منه": "Refunding the order value or the affected part of it", "تأخر تنفيذ الطلب": "Delayed fulfilment", "إذا تعذر التنفيذ في المدة المتفق عليها نتواصل معك ونعرض عليك موعدا جديدا أو إلغاء الطلب واسترداد المبلغ": "If fulfilment is not possible within the agreed time we contact you and offer a new date or cancellation with a refund", "استرداد المبالغ": "Refunds", "بعد الموافقة يرجع المبلغ لنفس وسيلة الدفع وتختلف مدة ظهوره حسب البنك أو مزود خدمة الدفع": "After approval the amount returns to the same payment method. The time it takes to appear depends on the bank or payment provider", "تعديل الطلب": "Order changes", "لا يمكن تعديل الاسم أو الإهداء بعد إتمام الدفع وبدء التجهيز فراجع الإملاء قبل الدفع": "The name or dedication cannot be changed after payment and the start of preparation so check the spelling before paying", "التواصل معنا": "Contact us", "لطلب الإلغاء أو أي ملاحظة راسلنا على واتساب وزودنا برقم الطلب والتفاصيل": "To request a cancellation or share a note message us on WhatsApp with the order number and details", "تخضع حالات الاستبدال والاسترجاع للأنظمة المعمول بها في المملكة العربية السعودية ولا تؤثر هذه السياسة على حقوقك النظامية كمستهلك": "Exchange and return cases are subject to the regulations in force in the Kingdom of Saudi Arabia and this policy does not affect your statutory rights as a consumer", "سياسة التنفيذ والتوثيق": "Fulfilment & Documentation Policy", "كيف ننفذ طلبك ونوثقه من لحظة الدفع إلى وصول مقطع التوثيق": "How we fulfil and document your order from payment until the documentation clip arrives", "التفويض": "Authorization", "بإتمام الطلب تفوض زاد الضيف بتجهيز الهدية وتسليمها لضيوف الرحمن نيابة عنك": "By completing the order you authorize Zad Al-Daif to prepare the gift and hand it to the guests of Allah on your behalf", "التجهيز": "Preparation", "نجهز المنتجات ونكتب الاسم أو عبارة الإهداء كما كتبتها وقت الطلب": "We prepare the products and write the name or dedication as you wrote it when ordering", "توزع الهدايا على ضيوف الرحمن في الحرم يدا بيد": "Gifts are distributed to the guests of Allah at the Haram hand to hand", "بعد التوزيع يوصلك مقطع فيديو يوثق تنفيذ طلبك على واتساب": "After distribution a video clip documenting your order reaches you on WhatsApp", "موعد التنفيذ": "Fulfilment date", "يعتمد موعد التنفيذ على نوع الطلب والعدد ونتواصل معك إذا تغير الموعد": "The fulfilment date depends on the order type and quantity and we contact you if the date changes", "المتابعة": "Follow-up", "لمتابعة طلبك راسلنا على واتساب برقم الطلب": "To follow up on your order message us on WhatsApp with the order number", "الخصوصية": "Privacy", "سياسة الخصوصية": "Privacy Policy", "نحترم خصوصيتك ونستخدم بياناتك فقط لتنفيذ طلبك وخدمتك": "We respect your privacy and use your data only to fulfil your order and serve you", "المعلومات اللي نجمعها": "Information we collect", "الاسم ورقم الجوال والبريد الإلكتروني وبيانات الطلب والاسم أو الإهداء المطلوب كتابته": "Name, mobile number, email, order details and the name or dedication to be written", "كيف نستخدمها": "How we use it", "لتنفيذ طلبك والتواصل معك وإرسال مقطع التوثيق والفاتورة الإلكترونية": "To fulfil your order, contact you and send the documentation clip and e-invoice", "الدفع": "Checkout", "يتم الدفع عبر بوابات دفع آمنة ولا نطلب بيانات بطاقتك في المحادثات أو الرسائل": "Payment is made through secure payment gateways and we never ask for your card details in chats or messages", "مشاركة البيانات": "Data sharing", "لا نبيع بياناتك ونشاركها فقط مع مزودي الخدمة اللازمين لإتمام الطلب": "We do not sell your data and share it only with the service providers needed to complete the order", "مقاطع التوثيق": "Documentation clips", "مقطع توثيق طلبك يرسل لك أنت": "Your order documentation clip is sent to you", "حقوقك": "Your rights", "تقدر تطلب تعديل بياناتك أو حذفها بالتواصل معنا": "You can ask to edit or delete your data by contacting us", "باستخدامك للمتجر توافق على هذه السياسة وقد نحدثها عند الحاجة وننشر التحديث في هذه الصفحة": "By using the store you agree to this policy. We may update it when needed and publish the update on this page", "الشروط والأحكام": "Terms & Conditions", "شروط استخدام متجر زاد الضيف وإتمام الطلبات": "Terms of using Zad Al-Daif store and completing orders", "طبيعة المتجر": "Nature of the store", "زاد الضيف متجر إلكتروني لبيع الهدايا والمنتجات وتوصيلها لضيوف الرحمن ولا يستقبل التبرعات أو يجمعها": "Zad Al-Daif is an online store that sells gifts and products and delivers them to the guests of Allah. It does not accept or collect donations", "المنتجات والأسعار": "Products and prices", "أسعار كل المنتجات معلنة في المتجر وقت الطلب وتصدر لك فاتورة إلكترونية مع كل طلب": "All product prices are shown in the store at the time of ordering and an e-invoice is issued with every order", "الطلب والدفع": "Ordering and payment", "يعتبر الطلب مؤكدا بعد إتمام الدفع بإحدى طرق الدفع المتاحة في المتجر": "The order is confirmed after completing payment with one of the payment methods available in the store", "التنفيذ نيابة عنك": "Fulfilment on your behalf", "بإتمام الطلب تفوضنا بتجهيز الهدية وتسليمها لضيوف الرحمن ونرسل لك التوثيق بعد التنفيذ": "By completing the order you authorize us to prepare the gift and hand it to the guests of Allah and we send you the documentation after fulfilment", "بيانات الطلب": "Order details", "أنت مسؤول عن صحة الاسم أو الإهداء اللي تكتبه فراجعه قبل الدفع": "You are responsible for the accuracy of the name or dedication you write so review it before paying", "الإلغاء والاسترجاع": "Cancellation and returns", "تطبق سياسة الاستبدال والاسترجاع المنشورة في المتجر": "The exchange and return policy published in the store applies", "تحديث الشروط": "Updating the terms", "قد نحدث هذه الشروط عند الحاجة ويسري التحديث من تاريخ نشره في هذه الصفحة": "We may update these terms when needed and the update takes effect from the date it is published on this page", "النظام المطبق": "Governing law", "تخضع هذه الشروط للأنظمة المعمول بها في المملكة العربية السعودية": "These terms are subject to the regulations in force in the Kingdom of Saudi Arabia", "الأسئلة الشائعة": "FAQ", "إجابات سريعة على أكثر الأسئلة اللي توصلنا": "Quick answers to the questions we get most", "كيف أطلب؟": "How do I order?", "تختار الهدية والعدد وتكتب الاسم أو الإهداء ثم تكمل الدفع ونحن نجهز ونوزع ونوثق لك": "Choose the gift and quantity, write the name or dedication, then complete payment. We prepare, distribute and document for you", "هل أقدر أهدي باسم شخص ثاني؟": "Can I gift in someone else's name?", "أكيد. اكتب الاسم أو عبارة الإهداء وقت الطلب ونكتبها كما هي": "Sure. Write the name or dedication when ordering and we write it as is", "كيف أتأكد إن طلبي تنفذ؟": "How do I know my order was fulfilled?", "بعد التوزيع يوصلك مقطع فيديو يوثق التنفيذ على واتساب": "After distribution a video clip documenting it reaches you on WhatsApp", "وين توزع الهدايا؟": "Where are the gifts distributed?", "توزع على ضيوف الرحمن في الحرم يدا بيد": "They are distributed to the guests of Allah at the Haram hand to hand", "وش طرق الدفع؟": "What are the payment methods?", "طرق الدفع المتاحة تظهر لك في صفحة الدفع وفي أسفل المتجر": "Available payment methods appear on the checkout page and at the bottom of the store", "هل تستقبلون تبرعات؟": "Do you accept donations?", "لا. زاد الضيف متجر لبيع الهدايا وتوصيلها ولا يستقبل التبرعات أو يجمعها": "No. Zad Al-Daif is a store that sells and delivers gifts. It does not accept or collect donations", "أقدر ألغي أو أعدل طلبي؟": "Can I cancel or change my order?", "تقدر تطلب الإلغاء ما دام التجهيز لم يبدأ. والتعديل على الاسم لا يمكن بعد الدفع وبدء التجهيز": "You can request cancellation as long as preparation has not started. The name cannot be changed after payment and the start of preparation", "كيف أتواصل معكم؟": "How do I contact you?", "راسلنا على واتساب من زر التواصل وزودنا برقم الطلب إن وجد": "Message us on WhatsApp from the contact button and share the order number if you have one", "سياسة": "Policy", "ملاحظة": "Note", "ما عجبتني": "Did not like it", "مقبولة": "Acceptable", "جيدة": "Good", "ممتازة": "Excellent", "فوق الممتازة": "Beyond excellent", "قيم تجربتك معنا": "Rate your experience with us", "رايك يساعدنا نخدم ضيوف الرحمن احسن": "Your opinion helps us serve the guests of Allah better", "نجوم": "stars", "اختر عدد النجوم": "Choose the number of stars", "سهولة الطلب": "Easy ordering", "جودة الهدية": "Gift quality", "التوثيق بالفيديو": "Video documentation", "خدمة العملاء": "Customer service", "سرعة التنفيذ": "Fast fulfilment", "اكتب تجربتك هنا": "Write your experience here", "تجربتك": "Your experience", "اسمك": "Your name", "اختياري": "Optional", "الاسم": "Name", "ارسل تقييمك": "Send your review", "شكرا لك": "Thank you", "وصلنا تقييمك ونتشرف بخدمتك دايم": "We received your review and are honoured to serve you always", "اختر عدد النجوم اول": "Choose the number of stars first", "عروض حصرية": "Exclusive offers", "تطبق الشروط والأحكام": "Terms and conditions apply", "كل المنتجات": "All products", "صفحة المنتج": "Product page", "الاستبدال والاسترجاع": "Exchange & Returns", "التنفيذ والتوثيق": "Fulfilment & Documentation", "الشروط": "Terms", "جوال": "Mobile", "ويب": "Web", "أطقم وهدايا مرتبة تقدم لضيوف الرحمن": "Neat sets and gifts offered to the guests of Allah", "خصومات حصرية على هدايا ضيوف الرحمن": "Exclusive discounts on gifts for the guests of Allah", "الأول": "One", "الثاني": "Two", "الثالث": "Three", "الرابع": "Four", "القسم": "Category", "عرض الكل": "View all", "ثلاث خطوات وتوصل هديتك": "Three steps and your gift arrives", "تسوق حسب": "Shop by", "الإعدادات": "Settings", "السعر": "Price", "الكمية": "Quantity", "خصم": "OFF", "متجر": "Store", "إتمام الطلب": "Complete order", "سلة التسوق": "Shopping cart", "السلة فارغة": "The cart is empty", "المجموع": "Total", "الإجمالي": "Total", "وصف المنتج": "Product description", "منتجات مشابهة": "Similar products", "اشتر الآن": "Buy now", "متوفر": "In stock", "غير متوفر": "Out of stock", "المنتجات": "Products", "الهدايا": "Gifts", "عرض المزيد": "Show more", "المزيد": "More", "رجوع": "Back", "تأكيد": "Confirm", "إلغاء": "Cancel", "إرسال": "Send", "المحادثة": "Chat", "طلباتي": "My orders", "مصحف": "Quran", "سجادة": "Rug", "سبحة": "Prayer beads", "مسواك": "Miswak", "مظلة": "Umbrella", "تمر": "Dates", "وجبة": "Meal", "ماء": "Water", "زمزم": "Zamzam", "هدية": "Gift", "ضيوف الرحمن": "the guests of Allah", "ضيف الرحمن": "a guest of Allah", "حياك الله": "Welcome", "يا هلا والله": "A warm welcome", "أبشر": "Sure", "الله يحييك": "Welcome to you", "هلا بك": "Hello", "يا مرحبا": "Welcome", "تمام": "OK", "أكيد": "Sure", "على راسي": "With pleasure", "سم": "Yes", "تبي أساعدك بشي ثاني؟": "Can I help you with anything else?", "إذا تبي تفاصيل أكثر قل لي": "Tell me if you want more details", "وإذا عندك سؤال ثاني أنا حاضر": "And if you have another question I am here", "تحب أشرح لك طريقة الطلب؟": "Would you like me to explain how to order?", "وش الهدية اللي في بالك؟": "Which gift do you have in mind?", "قل لي العدد اللي تبيه وأرتب لك": "Tell me the quantity you want and I will arrange it", "وإذا احتجت شي راسلنا على واتساب": "And if you need anything message us on WhatsApp", "نتشرف بخدمتك": "Honoured to serve you", "أي خدمة ثانية؟": "Any other service?", "الله يتقبل منك": "May Allah accept from you", "حياك في زاد الضيف. وش الهدية اللي تدور عليها أو كم العدد اللي تبيه؟": "Welcome to Zad Al-Daif. Which gift are you looking for or what quantity do you want?", "نورت زاد الضيف. تبي هدية معينة ولا أعرض لك الأقسام؟": "Welcome to Zad Al-Daif. Do you want a specific gift or shall I show you the categories?", "هلا بك في زاد الضيف. قل لي الهدية أو العدد وأساعدك": "Welcome to Zad Al-Daif. Tell me the gift or quantity and I will help you", "زاد الضيف متجر هدايا نجهزها ونوصلها لضيوف الرحمن نيابة عنك": "Zad Al-Daif is a gift store. We prepare gifts and deliver them to the guests of Allah on your behalf", "زاد الضيف يجهز هديتك ويوزعها على ضيوف الرحمن ويوثق لك التنفيذ": "Zad Al-Daif prepares your gift, distributes it to the guests of Allah and documents the fulfilment for you", "تختار الهدية من زاد الضيف وفريقنا يوصلها لضيوف الرحمن باسمك": "You choose the gift from Zad Al-Daif and our team delivers it to the guests of Allah in your name", "الطلب ثلاث خطوات": "Ordering takes three steps", "تختار الهدية والعدد ثم تكتب الاسم أو الإهداء وبعدها نجهز ونوزع ونوثق لك": "You choose the gift and quantity, then write the name or dedication, and after that we prepare, distribute and document for you", "اختر الهدية وحدد الكمية واكتب الاسم أو الإهداء وادفع والباقي علينا": "Choose the gift, set the quantity, write the name or dedication and pay. The rest is on us", "من صفحة المنتج تختار العدد وتكتب الاسم ثم تكمل الدفع ونحن نجهز ونوزع ونوثق": "From the product page you choose the quantity and write the name, then complete payment. We prepare, distribute and document", "نوثق التوزيع بالفيديو ونرسله لك على واتساب": "We document the distribution on video and send it to you on WhatsApp", "كل طلب نصور توزيعه ويوصلك المقطع على واتساب": "We film the distribution of every order and the clip reaches you on WhatsApp", "تقدر تكتب اسمك أو اسم من تحب أو عبارة إهداء على الطلب": "You can write your name, a loved one's name or a dedication on the order", "الاسم أو الإهداء تكتبه وقت الطلب ونكتبه كما هو فراجع الإملاء قبل الدفع": "You write the name or dedication when ordering and we write it as is so check the spelling before paying", "اكتب الاسم اللي تبي الهدية باسمه في خانة الاسم أو عبارة الإهداء": "Write the name you want the gift in, in the name or dedication field", "الدفع آمن عن طريق مدى و": "Payment is secure through Mada, ", "تقدر تدفع بمدى أو": "You can pay with Mada or", "أو البطاقات من صفحة الدفع": "or cards from the checkout page", "طرق الدفع المتاحة مدى و": "Available payment methods: Mada, ", "لكل طلب فاتورة إلكترونية": "Every order has an e-invoice", "تصدر لك فاتورة إلكترونية مع كل طلب": "An e-invoice is issued with every order", "الفاتورة الإلكترونية تجيك مع الطلب": "The e-invoice comes with the order", "فريقنا يجهز الهدايا ويوزعها على ضيوف الرحمن في الحرم": "Our team prepares the gifts and distributes them to the guests of Allah at the Haram", "التوزيع يكون على ضيوف الرحمن في الحرم ويوصلك التوثيق": "Distribution is to the guests of Allah at the Haram and the documentation reaches you", "نوزع هديتك في الحرم ونرسل لك المقطع على واتساب": "We distribute your gift at the Haram and send you the clip on WhatsApp", "الكميات المتاحة في صفحة المنتج 10 أو 20 أو 50 أو 100 قطعة": "Available quantities on the product page are 10, 20, 50 or 100 pieces", "تختار العدد من صفحة المنتج": "You choose the quantity from the product page", "أو 20 أو 50 أو 100 قطعة": "or 20, 50 or 100 pieces", "العدد تحدده من صفحة المنتج وأقل خيار 10 قطع": "You set the quantity from the product page and the smallest option is 10 pieces", "للأعداد الكبيرة نتأكد لك من التوفر. راسلنا على واتساب بالعدد المطلوب": "For large quantities we check availability for you. Message us on WhatsApp with the quantity needed", "الطلبات الكبيرة لها ترتيب خاص. ارسل العدد على واتساب ونرد عليك": "Large orders have a special arrangement. Send the quantity on WhatsApp and we will reply", "إذا العدد أكثر من خيارات الصفحة راسلنا على واتساب ونتأكد لك": "If the quantity is more than the page options message us on WhatsApp and we will check for you", "موعد التنفيذ أتأكد لك منه وأرد عليك. راسلنا على واتساب برقم طلبك": "I will confirm the fulfilment date and get back to you. Message us on WhatsApp with your order number", "ما عندي موعد مؤكد الحين. أتأكد لك وأرد عليك على واتساب": "I do not have a confirmed date right now. I will check and reply to you on WhatsApp", "وقت التنفيذ يعتمد على الطلب. راسلنا على واتساب ونعطيك الموعد المؤكد": "Fulfilment time depends on the order. Message us on WhatsApp and we give you the confirmed date", "تفاصيل الاستبدال والاسترجاع موجودة في صفحة سياسة الاستبدال والاسترجاع": "Exchange and return details are on the Exchange & Return Policy page", "راجع صفحة سياسة الاستبدال والاسترجاع ولو عندك حالة معينة راسلنا على واتساب": "Check the Exchange & Return Policy page and if you have a specific case message us on WhatsApp", "الإلغاء والاسترجاع حسب سياسة المتجر المنشورة. أتأكد لك من حالتك وأرد عليك": "Cancellation and returns follow the published store policy. I will check your case and get back to you", "نعتذر منك. ارسل رقم الطلب ووصف المشكلة على واتساب ونتأكد ونرد عليك": "We apologize. Send the order number and a description of the problem on WhatsApp and we will check and reply", "حقك علينا. عطنا رقم الطلب على واتساب ونراجع حالتك": "We owe you that. Give us the order number on WhatsApp and we review your case", "نأسف على اللي صار. راسلنا على واتساب برقم الطلب ونتابع معك": "We are sorry for what happened. Message us on WhatsApp with the order number and we follow up with you", "ما عندي خصم مؤكد الحين. أتأكد لك وأرد عليك": "I do not have a confirmed discount right now. I will check and get back to you", "العروض تنزل في المتجر أول بأول وما أقدر أوعدك بخصم غير المعلن": "Offers are posted in the store as they come and I cannot promise a discount that is not announced", "ما فيه كود خصم معلن الحين. لو نزل عرض بتشوفه في المتجر": "There is no announced discount code right now. If an offer is posted you will see it in the store", "زاد الضيف متجر لبيع الهدايا وتوصيلها ولا نستقبل تبرعات": "Zad Al-Daif is a store that sells and delivers gifts. We do not accept donations", "نحن متجر هدايا مو جهة تبرعات. تشتري الهدية ونوصلها لضيوف الرحمن باسمك": "We are a gift store, not a donation body. You buy the gift and we deliver it to the guests of Allah in your name", "ما نستقبل تبرعات. تقدر تشتري هدية ونوزعها نيابة عنك مع التوثيق": "We do not accept donations. You can buy a gift and we distribute it on your behalf with documentation", "تقدر تتواصل معنا على واتساب من زر تواصل معنا": "You can contact us on WhatsApp from the Contact us button", "زر واتساب موجود في الصفحة ويرد عليك الفريق": "The WhatsApp button is on the page and the team replies to you", "راسلنا على واتساب من زر تواصل معنا ونخدمك": "Message us on WhatsApp from the Contact us button and we will serve you", "لا ترسل بيانات بطاقتك أو معلوماتك البنكية هنا أبدا. الدفع من صفحة الدفع الآمنة فقط": "Never send your card details or banking information here. Payment is only from the secure checkout page", "ما نطلب بيانات البطاقة في المحادثة. الدفع يتم من صفحة الدفع فقط": "We do not ask for card details in chat. Payment is made only from the checkout page", "رجاء لا تكتب بيانات بنكية هنا. كمل الدفع من صفحة السلة": "Please do not write banking details here. Complete payment from the cart page", "عندنا سقيا وضيافة ومصاحف وعبادة ومستلزمات الحاج وأطقم وهدايا": "We have Water & Hospitality, Qurans & Worship, Pilgrim Essentials and Sets & Gifts", "سقيا ماء وتمور ووجبات ومصاحف وسجاد وسبح ومساويك وإحرام ومظلات وكراسي وهدايا": "Drinking water, dates, meals, Qurans, rugs, beads, miswak, Ihram, umbrellas, chairs and gifts", "تلقى في المتجر الماء والتمر والوجبات والمصاحف والسجاد ومستلزمات الحاج والهدايا": "In the store you will find water, dates, meals, Qurans, rugs, pilgrim essentials and gifts", "الأسعار معروضة على كل منتج في المتجر. قل لي اسم الهدية وأعطيك سعرها": "Prices are shown on every product in the store. Tell me the gift name and I give you its price", "كل منتج سعره ظاهر في صفحته. أي هدية تبي سعرها؟": "Every product shows its price on its page. Which gift do you want the price of?", "قل لي الهدية اللي تبيها وأقول لك السعر المعروض": "Tell me the gift you want and I tell you the listed price", "العفو. الله يتقبل منك": "You are welcome. May Allah accept from you", "حياك الله في أي وقت": "Welcome any time", "واجبنا. الله يكتب أجرك": "Our duty. May Allah reward you", "الله يحفظك. ننتظرك في زاد الضيف": "May Allah protect you. We await you at Zad Al-Daif", "مع السلامة والله يتقبل منك": "Goodbye and may Allah accept from you", "المتجر يستقبل الطلبات أونلاين في أي وقت. وأوقات رد الفريق أتأكد لك منها": "The store takes orders online at any time. I will confirm the team's reply hours for you", "تقدر تطلب من المتجر في أي وقت. موعد رد الفريق أتأكد لك منه وأرد عليك": "You can order from the store at any time. I will confirm the team's reply time and get back to you", "الطلب متاح دائما من المتجر. وللتواصل المباشر راسلنا على واتساب": "Ordering is always available from the store. For direct contact message us on WhatsApp", "تقدر تهدي باسم أي شخص تحبه. اكتب اسمه في خانة الاسم أو الإهداء": "You can gift in the name of anyone you love. Write their name in the name or dedication field", "اختر الهدية واكتب اسم الشخص اللي تهديه ونوزعها باسمه ونوثق لك": "Choose the gift and write the name of the person you are gifting. We distribute it in their name and document it for you", "الهدية تنكتب باسم من تحب وتوصلك الوثيقة بالفيديو": "The gift is written in a loved one's name and the video documentation reaches you", "حالة الطلب أتأكد لك منها. ارسل رقم الطلب على واتساب": "I will check the order status for you. Send the order number on WhatsApp", "عطنا رقم الطلب على واتساب ونعطيك حالته": "Give us the order number on WhatsApp and we give you its status", "متابعة الطلب تكون مع الفريق على واتساب برقم الطلب": "Order follow-up is with the team on WhatsApp using the order number", "كل طلب يوصلك معه فاتورة إلكترونية وتوثيق بالفيديو على واتساب": "Every order comes with an e-invoice and video documentation on WhatsApp", "نوثق لك التنفيذ بالفيديو وتجيك فاتورة لكل طلب": "We document the fulfilment on video and you get an invoice for every order", "بيانات المتجر الرسمية موجودة أسفل الصفحة وكل طلب له توثيق وفاتورة": "The official store details are at the bottom of the page and every order has documentation and an invoice", "سعره المعروض في المتجر": "its listed price in the store is", "ريال للقطعة": "SAR per piece", "في المتجر": "in the store", "ريال للقطعة الواحدة": "SAR per single piece", "وتقدر تشوف التفاصيل في صفحته": "and you can see the details on its page", "من هدايا زاد الضيف": "from Zad Al-Daif gifts", "ادخل صفحة": "Open the page of", "واختر العدد واكتب الاسم أو الإهداء ثم كمل الدفع": "and choose the quantity and write the name or dedication then complete payment", "من صفحة": "From the page of", "تحدد الكمية وتكتب الاسم ونحن نجهز ونوزع ونوثق": "you set the quantity and write the name. We prepare, distribute and document", "تختار عدده من الصفحة": "you choose its quantity from the page", "الكميات المتاحة ل": "Available quantities for", "هي 10 و 20 و 50 و 100 قطعة": "are 10, 20, 50 and 100 pieces", "تقدر تطلبه باسمك أو باسم من تحب. تكتب الاسم وقت الطلب": "You can order it in your name or a loved one's name. You write the name when ordering", "في طلب": "In the order of", "تكتب الاسم أو عبارة الإهداء ونكتبها كما هي": "you write the name or dedication and we write it as is", "توزيع": "Distribution of", "نوثقه بالفيديو ونرسله لك على واتساب": "we document it on video and send it to you on WhatsApp", "بعد توزيع": "After distributing", "معروض في المتجر. ولو تبي عدد كبير نتأكد لك من التوفر على واتساب": "is listed in the store. If you want a large quantity we check availability for you on WhatsApp", "موجود في المتجر وتقدر تطلبه من صفحته": "is available in the store and you can order it from its page", "هذي أتأكد لك منها وأرد عليك. راسلنا على واتساب من زر تواصل معنا": "I will check this and get back to you. Message us on WhatsApp from the Contact us button", "ما عندي معلومة مؤكدة عن هذا. أتأكد لك وأرد عليك على واتساب": "I do not have confirmed information about this. I will check and reply to you on WhatsApp", "خلني أتأكد لك. الأسرع تراسلنا على واتساب من زر تواصل معنا": "Let me check for you. The fastest way is to message us on WhatsApp from the Contact us button", "نعتذر منك على اللي صار. ارسل رقم الطلب وصورة توضح الضرر على واتساب والفريق يراجعها ويرد عليك": "We apologize for what happened. Send the order number and a photo showing the damage on WhatsApp and the team will review it and reply", "حقك علينا. صور لنا المشكلة وارسلها مع رقم الطلب على واتساب ونتابع معك لين تنحل": "We owe you that. Take a photo of the problem and send it with the order number on WhatsApp and we follow up until it is solved", "نأسف جدا. بلاغ الضرر يحتاج رقم الطلب وصورة او مقطع. ارسلها على واتساب والفريق يتواصل معك": "We are very sorry. A damage report needs the order number and a photo or clip. Send them on WhatsApp and the team will contact you", "ما نرضى لك الا بالزين. ارسل رقم الطلب ووصف الضرر مع صورة على واتساب ونراجع حالتك": "We only accept the best for you. Send the order number and a description of the damage with a photo on WhatsApp and we review your case", "نعتذر منك. ارسل رقم الطلب ووضح لنا الخطا على واتساب والفريق يراجعه ويرد عليك": "We apologize. Send the order number and explain the error on WhatsApp and the team will review it and reply", "حقك علينا. قل لنا وش اللي طلع غلط مع رقم الطلب على واتساب ونتابع معك": "We owe you that. Tell us what went wrong with the order number on WhatsApp and we follow up with you", "نأسف على الخطا. ارسل رقم الطلب واللي كان المفروض يكون على واتساب ونراجع الحالة": "We are sorry for the error. Send the order number and what it should have been on WhatsApp and we review the case", "نعتذر عن التاخير. ارسل رقم الطلب على واتساب والفريق يتاكد من حالة التوثيق ويرد عليك": "We apologize for the delay. Send the order number on WhatsApp and the team will check the documentation status and reply", "حقك علينا. عطنا رقم الطلب على واتساب ونراجع وين وصل توثيق طلبك": "We owe you that. Give us the order number on WhatsApp and we check where your order documentation has reached", "خلني اوصلك للفريق. ارسل رقم الطلب على واتساب ويتاكدون لك من مقطع التوثيق": "Let me connect you to the team. Send the order number on WhatsApp and they will check the documentation clip for you", "نعتذر عن التاخير. ارسل رقم الطلب على واتساب والفريق يتاكد من حالته ويرد عليك": "We apologize for the delay. Send the order number on WhatsApp and the team will check its status and reply", "حقك علينا. عطنا رقم الطلب على واتساب ونشوف وين وصل طلبك": "We owe you that. Give us the order number on WhatsApp and we see where your order has reached", "نقدر انتظارك. الموعد اتاكد لك منه مع الفريق. ارسل رقم الطلب على واتساب": "We appreciate your patience. I will confirm the date with the team. Send the order number on WhatsApp", "متابعة الطلب تكون برقم الطلب. ارسله على واتساب والفريق يعطيك حالته": "Order follow-up uses the order number. Send it on WhatsApp and the team gives you its status", "عطنا رقم الطلب على واتساب ونقول لك وين وصل": "Give us the order number on WhatsApp and we tell you where it has reached", "رقم الطلب تلقاه في رسالة تاكيد الطلب. ارسله على واتساب ونتابع لك حالته": "You find the order number in the order confirmation message. Send it on WhatsApp and we follow up its status", "حالة طلبك اتاكد لك منها مع الفريق. ارسل رقم الطلب على واتساب": "I will check your order status with the team. Send the order number on WhatsApp", "هدايا زاد الضيف نجهزها ونوزعها على ضيوف الرحمن نيابة عنك ويوصلك التوثيق. ولو طلبك فيه شحن لعنوانك راسلنا على واتساب برقم الطلب ونتاكد لك": "We prepare Zad Al-Daif gifts and distribute them to the guests of Allah on your behalf and the documentation reaches you. If your order includes shipping to your address message us on WhatsApp with the order number and we will check", "الاصل ان هديتك توزع على ضيوف الرحمن وانت يوصلك مقطع التوثيق. تفاصيل اي شحن لعنوانك اتاكد لك منها. راسلنا على واتساب": "Normally your gift is distributed to the guests of Allah and you receive the documentation clip. I will check the details of any shipping to your address. Message us on WhatsApp", "ما عندي معلومة مؤكدة عن الشحن لعنوانك. الفريق يتاكد لك. راسلنا على واتساب برقم الطلب او المدينة": "I do not have confirmed information about shipping to your address. The team will check for you. Message us on WhatsApp with the order number or city", "ما عندي بيانات شركة الشحن او رقم التتبع هنا. ارسل رقم الطلب على واتساب والفريق يعطيك حالة الشحنة": "I do not have the shipping company details or tracking number here. Send the order number on WhatsApp and the team gives you the shipment status", "متابعة اي شحنة تكون مع الفريق برقم الطلب. راسلنا على واتساب ونتاكد لك من شركة الشحن": "Any shipment follow-up is with the team using the order number. Message us on WhatsApp and we check the shipping company for you", "لو عندك شحنة متاخرة او فيها مشكلة ارسل رقم الطلب على واتساب والفريق يتابعها مع شركة الشحن ويرد عليك": "If you have a delayed shipment or a problem with it send the order number on WhatsApp and the team follows up with the shipping company and replies", "بلاغات الشحنات نرفعها لشركة الشحن بعد ما نراجع الطلب. ارسل رقم الطلب ووصف المشكلة على واتساب": "We raise shipment reports to the shipping company after reviewing the order. Send the order number and a description of the problem on WhatsApp", "الالغاء حسب سياسة الاستبدال والاسترجاع المنشورة في المتجر. ارسل رقم الطلب على واتساب والفريق يراجع حالته": "Cancellation follows the Exchange & Return Policy published in the store. Send the order number on WhatsApp and the team reviews its status", "اذا الطلب ما تنفذ الفريق يشوف لك امكانية الالغاء. راسلنا على واتساب برقم الطلب باسرع وقت": "If the order has not been fulfilled the team checks whether it can be cancelled. Message us on WhatsApp with the order number as soon as possible", "خلني اوصلك للفريق. ارسل رقم الطلب على واتساب ويتاكدون لك من الالغاء حسب السياسة": "Let me connect you to the team. Send the order number on WhatsApp and they will check the cancellation according to the policy", "تعديل الطلب يعتمد على حالته. ارسل رقم الطلب والتعديل اللي تبيه على واتساب والفريق يتاكد لك": "Changing the order depends on its status. Send the order number and the change you want on WhatsApp and the team will check", "اذا الطلب ما تجهز الفريق يشوف لك التعديل. راسلنا على واتساب برقم الطلب باسرع وقت": "If the order has not been prepared the team checks the change for you. Message us on WhatsApp with the order number as soon as possible", "قل لنا التعديل المطلوب مع رقم الطلب على واتساب ونتاكد لك اذا يمدي": "Tell us the change needed with the order number on WhatsApp and we check if it is still possible", "لا ترسل بيانات بطاقتك هنا ابدا. ارسل رقم الطلب ووقت العملية على واتساب والفريق يراجعها ويرد عليك": "Never send your card details here. Send the order number and the time of the transaction on WhatsApp and the team will review it and reply", "مشاكل الدفع والمبالغ يراجعها الفريق. راسلنا على واتساب برقم الطلب بدون اي بيانات بطاقة": "The team reviews payment and amount issues. Message us on WhatsApp with the order number without any card details", "نتفهم قلقك. ارسل رقم الطلب على واتساب والفريق يتاكد من حالة المبلغ ويرد عليك. ولا ترسل بيانات البطاقة": "We understand your concern. Send the order number on WhatsApp and the team will check the amount status and reply. Do not send card details", "نعتذر منك. قل لي وش المشكلة بالضبط وانا اساعدك. ولو تبي الفريق مباشرة راسلنا على واتساب": "We apologize. Tell me exactly what the problem is and I will help you. If you want the team directly message us on WhatsApp", "حقك علينا. وضح لي وين وقفت معك او ارسل صورة للمشكلة على واتساب والفريق يساعدك": "We owe you that. Tell me where you got stuck or send a photo of the problem on WhatsApp and the team will help you", "خلنا نحلها. اكتب لي المشكلة او ارسل صورتها على واتساب مع رقم الطلب ان وجد": "Let us solve it. Write the problem to me or send its photo on WhatsApp with the order number if any", "انا مساعد الي بردود جاهزة. لو تبي احد من الفريق راسلنا على واتساب من زر تواصل معنا": "I am an automated assistant with ready replies. If you want someone from the team message us on WhatsApp from the Contact us button", "اكيد. الفريق يرد عليك على واتساب. اضغط زر واتساب وارسل استفسارك": "Sure. The team replies to you on WhatsApp. Tap the WhatsApp button and send your question", "انا مساعد الي واقدر اجاوبك على الاسئلة العامة. ولأي شي يحتاج موظف راسلنا على واتساب": "I am an automated assistant and can answer general questions. For anything that needs a staff member message us on WhatsApp", "نعتذر منك من قلب. رضاك يهمنا. ارسل رقم الطلب واللي ضايقك على واتساب والفريق يتابع معك شخصيا": "We sincerely apologize. Your satisfaction matters to us. Send the order number and what upset you on WhatsApp and the team will follow up with you personally", "حقك علينا وما نرضى بزعلك. قل لنا وش صار مع رقم الطلب على واتساب ونعالجها": "We owe you that and do not accept you being upset. Tell us what happened with the order number on WhatsApp and we will fix it", "نأسف جدا على تجربتك. ارسل التفاصيل ورقم الطلب على واتساب والفريق يرد عليك": "We are very sorry about your experience. Send the details and order number on WhatsApp and the team will reply", "صباح الخير": "Good morning", "مساء الخير": "Good evening", "وحياك الله في زاد الضيف. وش الهدية اللي تدور عليها؟": "and welcome to Zad Al-Daif. Which gift are you looking for?", "يا هلا فيك. كيف نقدر نخدمك اليوم؟": "A warm welcome. How can we serve you today?", "ومرحبا بك في زاد الضيف. تبي تهدي ضيوف الرحمن؟ قل لي وش في بالك": "and welcome to Zad Al-Daif. Want to gift the guests of Allah? Tell me what you have in mind", "اهلا وسهلا. قل لي الهدية او العدد اللي تبيه وانا ارتب لك": "Welcome. Tell me the gift or quantity you want and I will arrange it", "حياك الله. تدور على سقيا ولا مصاحف ولا هدايا واطقم؟": "Welcome. Are you looking for water, Qurans, or gifts and sets?", "نورت زاد الضيف. وش نقدر نساعدك فيه؟": "Welcome to Zad Al-Daif. How can we help you?", "يا مرحبا. عندك سؤال عن الطلب او الاسعار او التوثيق؟": "Welcome. Do you have a question about ordering, prices or documentation?", "هلا والله. اختر من الاختيارات السريعة او اكتب سؤالك": "Hello. Choose from the quick options or write your question", "اسعد الله اوقاتك. وش الهدية اللي ناوي عليها؟": "Good day. Which gift do you have in mind?", "تشرفنا بزيارتك. كم العدد اللي تبيه ولأي هدية؟": "Honoured by your visit. What quantity do you want and for which gift?", "حياك الله. وش الهدية اللي تدور عليها؟": "Welcome. Which gift are you looking for?", "يا هلا فيك. كيف نقدر نخدمك؟": "A warm welcome. How can we serve you?", "اهلا وسهلا. قل لي وش في بالك": "Welcome. Tell me what you have in mind", "مرحبا بك. تبي تعرف الاسعار ولا طريقة الطلب؟": "Welcome. Do you want to know the prices or how to order?", "نورت. وش نقدر نساعدك فيه؟": "Welcome. How can we help you?", "هلا والله. قل لي العدد والهدية وارتب لك": "Hello. Tell me the quantity and the gift and I will arrange it", "تنبيه": "Notice", "لا ترسل بيانات بطاقتك أو معلوماتك البنكية هنا أبدا. الدفع يتم من صفحة الدفع الآمنة فقط": "Never send your card details or banking information here. Payment is made only from the secure checkout page", "صباح النور": "Good morning", "مساء النور": "Good evening", "وعليكم السلام ورحمة الله": "Peace be upon you too", "الأسعار": "Prices", "تواصل واتساب": "Contact on WhatsApp", "كيف نقدر نخدمك؟": "How can we serve you?", "المساعد الآلي يرد عليك فورا": "The automated assistant replies instantly", "كلم مساعد زاد الضيف": "Talk to the Zad Al-Daif assistant", "الطلب": "Ordering", "ابدأ محادثة": "Start a chat", "اكتب رقم طلبك ونوصلك لمتابعته": "Write your order number and we take you to its follow-up", "تابع الطلب": "Track order", "مساعد زاد الضيف": "Zad Al-Daif Assistant", "إعادة المحادثة": "Restart chat", "محادثة جديدة": "New chat", "عرض الاختيارات السريعة": "Show quick options", "اكتب سؤالك هنا": "Write your question here", "رسالتك": "Your message", "إرفاق ملف": "Attach a file", "شكرا لك على تقييمك. رايك يهمنا ويساعدنا نخدم ضيوف الرحمن احسن": "Thank you for your rating. Your opinion matters and helps us serve the guests of Allah better", "الله يسعدك. وصلنا تقييمك ونتشرف بخدمتك دايم": "May Allah make you happy. We received your rating and are honoured to serve you always", "ممتنين لك. تقييمك يفرق معنا كثير": "We are grateful. Your rating makes a big difference to us", "نعتذر ان التجربة ما كانت مثل ما تستاهل. ارسل لنا ملاحظتك ورقم الطلب على واتساب والفريق يتابع معك": "We apologize that the experience was not what you deserve. Send us your note and order number on WhatsApp and the team will follow up", "حقك علينا. قل لنا وش اللي ما عجبك على واتساب مع رقم الطلب ونعالجه": "We owe you that. Tell us what you did not like on WhatsApp with the order number and we will fix it", "نأسف على ذلك. ملاحظتك مهمة لنا. ارسلها على واتساب والفريق يرد عليك": "We are sorry about that. Your note is important to us. Send it on WhatsApp and the team will reply", "يسعدنا نسمع رايك": "We would love to hear your opinion", "الحمد لله ان طلبك تم. تقبل الله منك ومن ضيوف الرحمن": "Praise be to Allah your order is done. May Allah accept from you and from the guests of Allah", "كيف كانت تجربتك مع زاد الضيف؟": "How was your experience with Zad Al-Daif?", "قبل ما تروح. كيف تقيم خدمتنا في هذي المحادثة؟": "Before you go. How do you rate our service in this chat?", "هذا مو رقم طلب. لا تكتب رقم بطاقتك هنا ابدا": "This is not an order number. Never write your card number here", "اكتب رقم الطلب اللي وصلك في رسالة تاكيد الطلب": "Write the order number you received in the order confirmation message", "متابعة الطلب رقم": "Follow-up of order number", "تكون مع الفريق. ارسل الرقم لنا على واتساب ونعطيك حالته": "is with the team. Send the number to us on WhatsApp and we give you its status", "مرفق": "Attachment", "وصلني اسم الملف بس المساعد الالي ما يقدر يفتح المرفقات. ارسله لنا على واتساب مع رقم طلبك والفريق يراجعه": "I received the file name but the automated assistant cannot open attachments. Send it to us on WhatsApp with your order number and the team will review it", "المدينة": "City", "كيف نقدر نخدمك": "How can we serve you", "وش الهدية اللي تدور عليها": "Which gift are you looking for"};
  var ZKEYS=Object.keys(ZEN).filter(function(k){return k.length>=4}).sort(function(a,b){return b.length-a.length}),ZRX={},ZCACHE={};
  function pref(k){try{return window.localStorage.getItem(k)}catch(e){return null}}
  function setPref(k,v){try{window.localStorage.setItem(k,v)}catch(e){}}
  function nk(t){return (t||'').replace(/[ً-ْـ،؛]/g,'').replace(/\s+/g,' ').trim()}
  var AR=/[ء-ي]/;
  function trn(t){
    var k=nk(t);if(!k||!AR.test(k))return null;if(ZCACHE.hasOwnProperty(k))return ZCACHE[k];
    var r=ZEN.hasOwnProperty(k)?ZEN[k]:null;
    if(r===null){var s=k,i,q;
      for(i=0;i<ZKEYS.length&&AR.test(s);i++){q=ZKEYS[i];if(s.indexOf(q)<0)continue;
        if(!ZRX[q])ZRX[q]=new RegExp('(^|[^\\u0621-\\u064A])'+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^\\u0621-\\u064A])','g');
        s=s.replace(ZRX[q],function(m,a){return a+ZEN[q]})}
      s=s.replace(/ر\.س/g,'SAR').replace(/[٠-٩]/g,function(c){return String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))});
      r=(s!==k&&!AR.test(s))?s:null}
    ZCACHE[k]=r;return r}
  function unT(d){
    var L=d.querySelectorAll('z-t');if(!L.length)return;
    for(var i=0;i<L.length;i++){var z=L[i],p=z.parentNode;if(!p)continue;var a=z.firstChild,n=a&&a.firstChild;if(n&&n.nodeType===3)p.insertBefore(n,z);p.removeChild(z)}
  }
  function lang(d,w){
    var on=pref('zLang')==='en',root=d.documentElement;
    w.__zSetLang=function(v){setPref('zLang',v==='en'?'en':'ar');try{tick()}catch(e){}};
    if(root.classList.contains('zen')!==on)root.classList.toggle('zen',on);
    if(!d.getElementById('zen-css')){var st=d.createElement('style');st.id='zen-css';st.textContent='z-t>z-a{display:none!important}z-t{direction:ltr;unicode-bidi:isolate}z-t::after{content:attr(data-en)}';d.head.appendChild(st)}
    arr(d.querySelectorAll('input[placeholder],textarea[placeholder]')).forEach(function(i){var ph=i.getAttribute('placeholder')||'';
      if(on){if(AR.test(ph)){var t=trn(ph);if(t){i.setAttribute('data-zph',ph);i.setAttribute('placeholder',t)}}}
      else if(i.hasAttribute('data-zph')){i.setAttribute('placeholder',i.getAttribute('data-zph'));i.removeAttribute('data-zph')}});
    arr(d.querySelectorAll('option')).forEach(function(o){
      if(on){if(AR.test(o.textContent)){var t=trn(o.textContent);if(t){o.setAttribute('data-zop',o.textContent);o.textContent=t}}}
      else if(o.hasAttribute('data-zop')){o.textContent=o.getAttribute('data-zop');o.removeAttribute('data-zop')}});
    if(!on){if(d.__zmo){try{d.__zmo.disconnect()}catch(e){}d.__zmo=null}return}
    if(!d.__zmo&&w.MutationObserver){try{d.__zmo=new w.MutationObserver(function(){var nw=Date.now();if(nw-(d.__zmoT||0)<70){if(!d.__zmoQ){d.__zmoQ=1;w.setTimeout(function(){d.__zmoQ=0;d.__zmoT=Date.now();try{lang(d,w)}catch(e){}},90)}return}d.__zmoT=nw;try{lang(d,w)}catch(e){}});d.__zmo.observe(d.body,{childList:true,subtree:true,characterData:true})}catch(e){}}
    var tw=d.createTreeWalker(d.body,4,null),n,list=[];
    while((n=tw.nextNode())){var p=n.parentNode;if(!p)continue;var nm=p.nodeName;if(nm==='SCRIPT'||nm==='STYLE'||nm==='TEXTAREA'||nm==='OPTION'||nm==='Z-A'||nm==='NOSCRIPT')continue;if(!AR.test(n.nodeValue))continue;list.push(n)}
    for(var i=0;i<list.length;i++){n=list[i];var t=trn(n.nodeValue);if(!t)continue;
      var v=n.nodeValue,z=d.createElement('z-t'),a=d.createElement('z-a');z.setAttribute('data-en',(/^\s/.test(v)?' ':'')+t+(/\s$/.test(v)?' ':''));
      n.parentNode.insertBefore(z,n);a.appendChild(n);z.appendChild(a)}
    if(d.__zmo){try{d.__zmo.takeRecords()}catch(e){}}
  }
  function cParse(v){
    if(!v)return null;v=v.trim().toLowerCase();if(v==='white')return [255,255,255,1];if(v==='black')return [0,0,0,1];
    var m=/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,\/]\s*([\d.]+%?))?\s*\)$/.exec(v);if(!m)return null;
    var a=m[4]===undefined?1:(m[4].indexOf('%')>-1?parseFloat(m[4])/100:parseFloat(m[4]));return [+m[1],+m[2],+m[3],a]}
  function cHsl(c){var r=c[0]/255,g=c[1]/255,b=c[2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2,dd=mx-mn;
    if(dd){s=l>.5?dd/(2-mx-mn):dd/(mx+mn);h=mx===r?((g-b)/dd+(g<b?6:0)):mx===g?((b-r)/dd+2):((r-g)/dd+4);h*=60}return [h,s,l]}
  function cCss(h,s,l,a){return 'hsla('+Math.round(h)+','+Math.round(s*100)+'%,'+(Math.round(l*1000)/10)+'%,'+a+')'}
  function mBg(c){if(c[3]<.6)return null;var x=cHsl(c),h=x[0],s=x[1],l=x[2];
    if(l>=.7&&(s<.45||l>.9)){var nl=l>=.985?.15:(l>=.955?.10:.105+(.955-l)*1.25);if(nl>.42)nl=.42;return cCss(140,.13,nl,c[3])}
    if(l>=.7&&s>=.45&&h>=15&&h<=50)return 'rgba(184,132,88,'+c[3]+')';return null}
  function mTx(c){var x=cHsl(c);if(x[2]<.5&&x[1]<.4)return cCss(40,.3,1-x[2]*.55,c[3]);return null}
  function mBd(c){if(c[3]<.6)return null;var x=cHsl(c);if(x[2]>=.7&&x[1]<.45)return cCss(140,.13,.25,c[3]);return null}
  var DKP=[['background-color',mBg],['color',mTx],['fill',mTx],['stroke',mTx],['caret-color',mTx],['border-top-color',mBd],['border-right-color',mBd],['border-bottom-color',mBd],['border-left-color',mBd],['outline-color',mBd]];
  var DKEEP=/\.tg::after|\.zhcap u|\.lg3|#zvf|#zld|#zisl|\.zwinv|zdark|z-t|#ztq/;
  function dkSel(s){var out=[],dep=0,cur='';for(var i=0;i<s.length;i++){var ch=s[i];if(ch==='(')dep++;else if(ch===')')dep--;if(ch===','&&!dep){out.push(cur);cur=''}else cur+=ch}out.push(cur);
    return out.map(function(x){x=x.trim();if(/^(html|:root)(?![\w-])/.test(x))return x.replace(/^(html|:root)/,'html.zdark');return 'html.zdark '+x}).join(',')}
  function dkWalk(rules,out){
    for(var i=0;i<rules.length;i++){var r=rules[i];
      if(r.type===1){var sel=r.selectorText;if(!sel||DKEEP.test(sel))continue;var ds=[];
        for(var k=0;k<DKP.length;k++){var v=r.style.getPropertyValue(DKP[k][0]);if(!v)continue;var c=cParse(v);if(!c)continue;var m=DKP[k][1](c);if(m)ds.push(DKP[k][0]+':'+m+'!important')}
        var bi=r.style.getPropertyValue('background-image');
        if(bi&&bi.indexOf('gradient')>-1){var ch=0,nb=bi.replace(/rgba?\([^)]*\)/g,function(x){var c=cParse(x),m=c&&mBg(c);if(m){ch=1;return m}return x});if(ch)ds.push('background-image:'+nb+'!important')}
        if(ds.length)out.push(dkSel(sel)+'{'+ds.join(';')+'}')}
      else if(r.type===4||r.type===12){var sub=[];try{dkWalk(r.cssRules,sub)}catch(e){}
        if(sub.length)out.push((r.type===4?'@media ':'@supports ')+r.conditionText+'{'+sub.join('')+'}')}
    }
  }
  function theme(d,w){
    var on=pref('zTheme')==='dark',root=d.documentElement;
    w.__zSetTheme=function(v){setPref('zTheme',v==='dark'?'dark':'light');try{tick()}catch(e){}};
    if(root.classList.contains('zdark')!==on)root.classList.toggle('zdark',on);
    if(!on)return;
    var ss=d.styleSheets,sig=ss.length,all=[];
    for(var i=0;i<ss.length;i++){var o=ss[i].ownerNode;if(o&&o.id==='zdk')continue;try{var rs=ss[i].cssRules;sig+=':'+rs.length;all.push(rs)}catch(e){}}
    var st=d.getElementById('zdk');if(st&&d.__zdkSig===sig)return;d.__zdkSig=sig;
    var out=['html.zdark{color-scheme:dark;background:#131a16!important}html.zdark body{background:#131a16!important;color:#ece6da}'];
    all.forEach(function(rs){try{dkWalk(rs,out)}catch(e){}});
    out.push('html.zdark img{filter:brightness(.94)}html.zdark input,html.zdark select,html.zdark textarea{color:#ece6da}html.zdark ::placeholder{color:#9aa69d!important}');
    if(!st){st=d.createElement('style');st.id='zdk';d.head.appendChild(st)}
    st.textContent=out.join('\n');
  }
  function tick(){
    var d,w;try{d=f.contentDocument;w=f.contentWindow}catch(e){}
    if(d&&d.body){try{unT(d)}catch(e){}}
    try{tick0()}catch(e){}
    if(d&&d.body&&d.head){try{theme(d,w)}catch(e){}try{lang(d,w)}catch(e){}}
  }
  function tick0(){
    try{
      var d=f.contentDocument,w=f.contentWindow;if(!d||!d.body||!d.head)return;
      try{if(window.__zadChat)window.__zadChat(d,w)}catch(e){}
      [function(){cutouts(d)},function(){cats(d)},function(){addCats(d)},function(){wheel(d,w)},function(){steps(d)},function(){trust(d)},function(){placeholders(d,w)},function(){prices(d)},function(){altCards(d)},function(){topTags(d)},function(){cta(d)},function(){swiper(d,w)},function(){prodHero(d)},function(){prodCards(d)},function(){footer(d,w)},function(){reviews(d,w)},function(){catSecs(d,w)},function(){proof(d,w)},function(){shopMode(d,w)},function(){ptools()},function(){pframe()},function(){offerBanner(d,w)},function(){mob(d)},function(){fitTitles(d,w)},function(){discounts(d)},function(){feedback(d,w)},function(){about(d)},function(){pages(d)},function(){fixImgs(d)},function(){allProducts(d,w)},function(){noBox(d)},function(){hideHero(d)},function(){marq(d,w)},function(){vfab(d)},function(){prodInit(d,w)},function(){prodApply(d,w)},function(){clean(d)}].forEach(function(fn){try{fn()}catch(e){}});
      arr(d.querySelectorAll('h1,h2,h3,h4')).forEach(function(e){if(norm(e.textContent)==='ثلاث خطوات وتوصل هديتك'){center(e,w);e.classList.add('zt');var tn0=arr(e.childNodes).filter(function(n){return n.nodeType===3&&n.nodeValue.trim()})[0],k0=KASH[norm(e.textContent)];if(tn0&&k0&&tn0.nodeValue.indexOf('\u0640')<0)tn0.nodeValue=k0}});
      var h=arr(d.querySelectorAll('h1,h2,h3,h4')).filter(function(e){return norm(e.textContent)===TITLE})[0];
      if(!h)return;
      var list=[h],cls=(h.className&&h.className.baseVal===undefined?h.className:'').trim().split(/ +/)[0];
      if(cls){
        list=arr(d.querySelectorAll(h.tagName.toLowerCase()+'.'+cls)).filter(function(e){return !e.closest('#zh')&&!e.closest('#zbw')});
        if(!d.getElementById('zfix-css')){
          var st=d.createElement('style');st.id='zfix-css';
          var s=h.tagName.toLowerCase()+'.'+cls;
          st.textContent=s+'::after,'+s+'::before{content:none!important;display:none!important}'+s+'{background-image:none!important}.zorn{display:block;width:96px;height:14px;margin:8px 0 0;line-height:0}.zorn.c{margin:8px auto 0}.zorn svg{display:block;width:100%;height:100%}';
          d.head.appendChild(st);
        }
      }
      list=arr(d.querySelectorAll('.page h1,.page h2')).filter(function(e){return !e.closest('#zh,#zbw,#zwh,#zst,#ztr,#zct,#zsw,#zcb,#zrv,#zft,.zcs,.s-product-card-entry,.pd,.pd-info,[data-page="product"]')});if(list.indexOf(h)<0)list.push(h);
      list.forEach(function(e){
        e.classList.add('zt');if(e.parentElement&&e.parentElement.children.length<=4)e.parentElement.classList.add('ztp');
        var cen=true,kt=KASH[norm(e.textContent)]||kash(norm(e.textContent));center(e,w);
        if(kt){var tn=arr(e.childNodes).filter(function(n){return n.nodeType===3&&n.nodeValue.trim()})[0];if(tn&&tn.nodeValue.indexOf('\u0640')<0)tn.nodeValue=kt}
        if(!e.querySelector('.zorn')){
          arr(e.children).forEach(function(k){if(!norm(k.textContent))imp(k,'display','none')});
          var nx=e.nextElementSibling;if(nx&&!norm(nx.textContent)&&!nx.querySelector('img,input,button,a')&&nx.getBoundingClientRect().height<40)imp(nx,'display','none');
          var o=d.createElement('span');o.className='zorn'+(cen?' c':'');
          o.innerHTML='<svg viewBox="0 0 96 14" fill="none"><path d="M2 9C16 3 26 13 40 9S64 3 76 8s14 3 18 1" stroke="#b88458" stroke-width="1.2" stroke-linecap="round"/><circle cx="43" cy="3" r="1.1" fill="#b88458"/><circle cx="48" cy="3" r="1.1" fill="#b88458"/><circle cx="53" cy="3" r="1.1" fill="#b88458"/></svg>';
          e.appendChild(o);
        }
      });
    }catch(e){}
  }
  function zload(w){
    try{
      var d=w.document,o=d.getElementById('zld');
      if(!o){
        var st=d.createElement('style');
        st.textContent='#zld{position:fixed;inset:0;z-index:2147483600;background:#f4efe6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s}#zld.on{opacity:1;visibility:visible;transition:none}#zld b{width:190px;height:76px;background:url(img/logo-olive.svg) center/contain no-repeat;animation:zldp 1.1s ease-in-out infinite}#zld i{width:150px;height:3px;border-radius:9px;background:#e0d7c7;overflow:hidden;position:relative}#zld i:after{content:"";position:absolute;inset:0;width:45%;background:#b88458;border-radius:9px;animation:zldb 1s ease-in-out infinite}@keyframes zldp{50%{opacity:.55;transform:scale(.97)}}@keyframes zldb{0%{transform:translateX(110%)}100%{transform:translateX(-330%)}}';
        d.head.appendChild(st);
        o=d.createElement('div');o.id='zld';o.innerHTML='<b></b><i></i>';d.body.appendChild(o);
      }
      o.classList.add('on');
      try{w.scrollTo(0,0)}catch(e){}
      clearTimeout(w.__zldT);w.__zldT=setTimeout(function(){try{w.scrollTo(0,0)}catch(e){}o.classList.remove('on');wafab(w)},900);
    }catch(e){}
  }
  /* زر واتساب العائم: يعكس الوانه فوق الخلفيات الخضراء */
  function wafab(w){
    try{
      var d=w.document,b=w.__zwa;
      if(!b||!d.body.contains(b)){
        b=null;
        var all=d.querySelectorAll('body a,body button,body div');
        for(var i=0;i<all.length;i++){
          var e=all[i];if(e.id==='zvf'||e.closest('#zcb,#zh,#zld,#zft,#zdbg,#zvf'))continue;
          var cs=w.getComputedStyle(e);if(cs.position!=='fixed'||cs.display==='none')continue;
          var r=e.getBoundingClientRect();
          if(r.width<36||r.width>90||r.height<36||r.height>90)continue;
          if(r.left<w.innerWidth/2||r.top<w.innerHeight/2)continue;
          if(!e.querySelector('svg,img,i'))continue;
          b=e;break;
        }
        w.__zwa=b;if(b){var mb=w.innerWidth<=760;b.style.setProperty('bottom',mb?'54px':'76px','important');if(mb){b.style.setProperty('scale','.82');b.style.setProperty('transform-origin','100% 100%');b.style.setProperty('right','10px','important')}}
        if(b&&!d.getElementById('zwast')){var st=d.createElement('style');st.id='zwast';st.textContent='.zwinv,.zwinv *{transition:none!important}.zwinv{background:#b88458!important;background-image:none!important;color:#ffffff!important;box-shadow:0 6px 18px rgba(0,0,0,.28)!important}.zwinv svg{color:#ffffff!important}';d.head.appendChild(st)}
      }
      if(!b)return;
      var r=b.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,els=d.elementsFromPoint(x,y),green=false;
      function col(c){var m=/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[,/ ]+([\d.]+))?/.exec(c||'');if(!m)return null;if(m[4]!==undefined&&+m[4]<.5)return null;return [+m[1],+m[2],+m[3]]}
      function dark(c){return (c[0]*.299+c[1]*.587+c[2]*.114)<125}
      function px(src,im,r,fit){
        try{
          var C=w.__zpc||(w.__zpc={}),k=src+'|'+Math.round(r.width)+'x'+Math.round(r.height)+fit,cv=C[k];
          if(!cv){
            if(!im){im=C['i'+src];if(!im){im=new w.Image();im.src=src;C['i'+src]=im}}
            if(!im.complete||!im.naturalWidth)return undefined;
            var sc=48/Math.max(r.width,1),cw=48,ch=Math.max(1,Math.round(r.height*sc));
            cv=d.createElement('canvas');cv.width=cw;cv.height=ch;
            var iw=im.naturalWidth,ih=im.naturalHeight,q=fit==='contain'?Math.min(cw/iw,ch/ih):(fit==='fill'?0:Math.max(cw/iw,ch/ih));
            var g=cv.getContext('2d',{willReadFrequently:true});
            if(q)g.drawImage(im,(cw-iw*q)/2,(ch-ih*q)/2,iw*q,ih*q);else g.drawImage(im,0,0,cw,ch);
            C[k]=cv;
          }
          var X=Math.min(cv.width-1,Math.max(0,Math.floor((x-r.left)/r.width*cv.width))),Y=Math.min(cv.height-1,Math.max(0,Math.floor((y-r.top)/r.height*cv.height)));
          var p=cv.getContext('2d',{willReadFrequently:true}).getImageData(X,Y,1,1).data;
          return p[3]<128?null:[p[0],p[1],p[2]];
        }catch(e){return undefined}
      }
      for(var j=0;j<els.length;j++){
        var e=els[j];if(e===b||b.contains(e))continue;
        if(e.closest('#zcb,#zvf'))continue;
        var zf=e.closest('#zft');
        if(zf){
          var fr=zf.getBoundingClientRect(),R=170;
          try{var br=w.getComputedStyle(zf,'::before').borderTopLeftRadius.split(' ');R=parseFloat(br[br.length-1])||170}catch(_){}
          var a=fr.width*.65,cx=fr.left+fr.width/2,dy=y-(fr.top+R);
          green=dy>=0||((x-cx)*(x-cx))/(a*a)+(dy*dy)/(R*R)<=1;
          if(green)break;
          continue;
        }
        var cs=w.getComputedStyle(e),c=null;
        if(e.tagName==='IMG'){
          c=px(e.currentSrc||e.src,e,e.getBoundingClientRect(),cs.objectFit||'fill');
          if(c===undefined){green=!!b.__zinv;break}
          if(c){green=dark(c);break}
          continue;
        }
        var bi=cs.backgroundImage;
        if(bi&&bi!=='none'){
          var first=bi.replace(/^\s+/,'');
          if(first.indexOf('url(')!==0)c=col(bi);
          if(!c){var m=/url\(["']?([^"')]+)["']?\)/.exec(bi);if(m){c=px(m[1],null,e.getBoundingClientRect(),'cover');if(c===undefined){green=!!b.__zinv;break}}}
        }
        if(!c)c=col(cs.backgroundColor);
        if(c){green=dark(c);break}
      }
      if(green===!!b.__zinv)return;
      b.__zinv=green;b.classList.toggle('zwinv',green);
      var ps=b.querySelectorAll('svg,svg *');
      for(var k=0;k<ps.length;k++){
        var p=ps[k];
        if(green){
          var s=w.getComputedStyle(p);
          if(p.__zf===undefined){p.__zf=p.style.fill||'';p.__zs=p.style.stroke||''}
          if(s.fill&&s.fill!=='none'&&p.tagName.toLowerCase()!=='svg')p.style.setProperty('fill','#ffffff','important');
          if(s.stroke&&s.stroke!=='none')p.style.setProperty('stroke','#ffffff','important');
        }else if(p.__zf!==undefined){
          p.style.removeProperty('fill');p.style.removeProperty('stroke');
          if(p.__zf)p.style.fill=p.__zf;if(p.__zs)p.style.stroke=p.__zs;
        }
      }
    }catch(e){}
  }
  var SOV=[];
  function socOv(){try{var d=f.contentDocument,w=f.contentWindow;if(!d||!w)return;var as=d.querySelectorAll('#zft .sc a[href]'),fr=f.getBoundingClientRect(),s=f.clientWidth?fr.width/f.clientWidth:1;
    for(var i=0;i<as.length;i++){var a=as[i],o=SOV[i];
      if(!o){o=document.createElement('a');o.target='_blank';o.rel='noopener noreferrer';o.style.cssText='position:fixed;z-index:60;border-radius:50%;cursor:pointer;background:transparent;display:none';document.body.appendChild(o);SOV[i]=o;
        (function(o){o.onmouseenter=function(){if(o.__a)o.__a.style.background='#b88458'};o.onmouseleave=function(){if(o.__a)o.__a.style.background=''}})(o)}
      o.__a=a;var hr=a.getAttribute('href');if(o.getAttribute('href')!==hr)o.setAttribute('href',hr);
      var r=a.getBoundingClientRect(),ok=r.width>0&&r.bottom>4&&r.top<w.innerHeight-4;
      if(ok){var el=d.elementFromPoint(r.left+r.width/2,r.top+r.height/2);ok=!!el&&(el===a||a.contains(el))}
      if(!ok){if(o.style.display!=='none')o.style.display='none';continue}
      o.style.display='block';o.style.left=(fr.left+r.left*s)+'px';o.style.top=(fr.top+r.top*s)+'px';o.style.width=(r.width*s)+'px';o.style.height=(r.height*s)+'px'}
    for(var j=as.length;j<SOV.length;j++)SOV[j].style.display='none'}catch(e){}}
  (function sraf(){socOv();requestAnimationFrame(sraf)})();
  f.addEventListener('load',function(){setTimeout(tick,300)});
  setInterval(tick,800);setTimeout(tick,300);
  (function(){var ly=-1,n=0;(function raf(){try{var cw=f.contentWindow,y=cw?cw.pageYOffset:0;if(y!==ly||(++n%20)===0){ly=y;wafab(cw)}}catch(e){}requestAnimationFrame(raf)})()})();setInterval(function(){try{wafab(f.contentWindow)}catch(e){}},500);
  (function hook(){try{var w=f.contentWindow;if(w&&!w.__zHook){w.__zHook=1;w.__zLoad=function(){zload(w)};w.addEventListener('scroll',function(){wafab(w)},{passive:true});w.addEventListener('resize',function(){wafab(w)});w.addEventListener('hashchange',function(){zload(w);setTimeout(tick,60);setTimeout(tick,300)});w.document.addEventListener('click',function(){setTimeout(tick,120);setTimeout(tick,450)},true)}}catch(e){}setTimeout(hook,1500)})();

  /* تشخيص مؤقت: يظهر فقط مع #zdbg-M-P */
  function zdbg(){
    try{
      if(location.hash.indexOf('#zdbg')!==0)return;
      var a=location.hash.split('-'),M=+a[1]||1,P=+a[2]||0,d=f.contentDocument,txt='';
      var Q={1:'سجادة صلاة',2:'مسواك الضيف'};
      function card(q){
        var hits=arr(d.querySelectorAll('body *')).filter(function(e){return e.tagName!=='SCRIPT'&&e.tagName!=='STYLE'&&!e.closest('#zbw')&&!e.closest('#zh')&&e.textContent.indexOf(q)>-1});
        var leaf=hits.filter(function(e){return !arr(e.children).some(function(c){return c.textContent.indexOf(q)>-1})})[0];
        if(!leaf)return 'no leaf for '+q+' hits='+hits.length;
        var p=leaf,chain=[];for(var i=0;i<8&&p;i++,p=p.parentElement)chain.push(p.tagName+'.'+String(p.className).replace(/ /g,'.'));
        var c=leaf;for(var j=0;j<3&&c.parentElement;j++)c=c.parentElement;
        return 'LEAF <'+leaf.tagName+' class="'+leaf.className+'"> kids='+leaf.children.length+' text='+JSON.stringify(leaf.textContent.slice(0,60))+'\nCHAIN '+chain.join(' < ')+'\nHTML '+c.outerHTML.replace(/\s+/g,' ');
      }
      if(M===1||M===2)txt=card(Q[M]);
      else if(M===3){var sc=arr(d.scripts).map(function(x){return x.textContent}).join('\n/*---*/\n');var k=sc.indexOf('سجادة صلاة');txt='scriptlen='+sc.length+' idx='+k+'\n'+sc.slice(Math.max(0,k-1200)).replace(/\s+/g,' ')}
      else if(M===4){var sc2=arr(d.scripts).map(function(x){return x.textContent}).join('\n/*---*/\n');txt=sc2.replace(/\s+/g,' ')}
      else if(M===6||M===7){if(f.contentWindow.location.hash!=='#product')f.contentWindow.location.hash='product';var pg=d.querySelector('.page.on');txt=(M===6?(pg?pg.outerHTML:'none'):arr(d.querySelectorAll('.page')).map(function(e){return e.id+'|'+e.className+'|'+e.getAttribute('data-page')}).join('\n')).replace(/\s+/g,' ')}
      else if(M===8){var hh=arr(d.querySelectorAll('h1,h2,h3,h4')).filter(function(e){return e.textContent.indexOf('تسوق حسب')>-1})[0],W=f.contentWindow;txt='vw='+W.innerWidth+' sw='+d.documentElement.scrollWidth+' sx='+W.scrollX+'\n';for(var q=hh,i8=0;q&&i8<7;q=q.parentElement,i8++){var c8=W.getComputedStyle(q),r8=q.getBoundingClientRect();txt+=q.tagName+'.'+String(q.className).replace(/ /g,'.')+' x='+Math.round(r8.left)+' w='+Math.round(r8.width)+' disp='+c8.display+' ta='+c8.textAlign+' m='+c8.marginLeft+'/'+c8.marginRight+' p='+c8.paddingLeft+'/'+c8.paddingRight+' fd='+c8.flexDirection+' jc='+c8.justifyContent+' ai='+c8.alignItems+' kids='+q.children.length+' st='+(q.getAttribute('style')||'')+'\n'}txt+=hh.outerHTML}
      else if(M===5){txt=arr(d.querySelectorAll('.page')).map(function(e){return e.id+'|'+e.className+'|'+e.children.length}).join('\n')+'\n'+((d.querySelector('.page.on')||{}).outerHTML||'').replace(/\s+/g,' ')}
      var pre=document.getElementById('zdbg');
      if(!pre){pre=document.createElement('pre');pre.id='zdbg';pre.style.cssText='position:fixed;z-index:99;top:0;left:0;right:0;bottom:0;overflow:auto;margin:0;padding:8px;background:#fff;color:#000;font:15px/1.5 Consolas,monospace;direction:ltr;text-align:left;white-space:pre-wrap;word-break:break-all';document.body.appendChild(pre)}
      var out='M'+M+' P'+P+' total='+txt.length+'\n'+txt.slice(P*3000,(P+1)*3000);
      if(pre.textContent!==out)pre.textContent=out;
    }catch(e){var p2=document.getElementById('zdbg')||document.body.appendChild(document.createElement('pre'));p2.id='zdbg';p2.textContent='ERR '+e}
  }
  window.addEventListener('hashchange',zdbg);
  setInterval(zdbg,1500);
})();
