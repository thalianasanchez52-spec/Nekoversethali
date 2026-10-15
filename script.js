'use strict';
// CONFIGURA AQUÍ TUS DATOS REALES ANTES DE PUBLICAR.
const STORE={
 whatsapp:'573133205715',
 instagram:'',
 facebook:'',
 email:'thalianasanchez52@gmail.com'
}; // Configura los enlaces reales de redes sociales antes de publicar.
const photo=(id)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=750&q=80`;
// Inventario demostrativo: reemplaza imágenes, nombres, precios y disponibilidad con datos reales.
const PRODUCTS=[
{id:1,name:'Hoodie Universo Ninja',category:'Ropa anime',franchise:'Naruto',price:115000,tag:'Popular',description:'Buzo cómodo de inspiración ninja, diseño conceptual.',image:photo('photo-1556821840-3a63f95609a7')},
{id:2,name:'Camiseta Pirata',category:'Ropa anime',franchise:'One Piece',price:59000,tag:'Nuevo',description:'Camiseta casual con estilo de aventura pirata.',image:photo('photo-1503342217505-b0a15ec3261c')},
{id:3,name:'Llavero Estrella Kawaii',category:'Accesorios',franchise:'Pokémon',price:18000,tag:'',description:'Accesorio de inspiración kawaii para tus llaves.',image:photo('photo-1611652022419-a9419f74343d')},
{id:4,name:'Figura Héroe Coleccionable',category:'Figuras coleccionables',franchise:'Dragon Ball',price:139000,tag:'Popular',description:'Figura decorativa conceptual para coleccionistas.',image:photo('photo-1608889175123-8ee362201f81')},
{id:5,name:'Manga de Fantasía Vol. 1',category:'Mangas y cómics',franchise:'Demon Slayer',price:42000,tag:'Nuevo',description:'Edición de demostración; verifica títulos y licencias.',image:photo('photo-1544947950-fa07a98d237f')},
{id:6,name:'Peluche Nube Kawaii',category:'Peluches',franchise:'Studio Ghibli',price:52000,tag:'',description:'Peluche suave de estilo fantástico y adorable.',image:photo('photo-1559454403-b8fb88521f11')},
{id:7,name:'Póster Ciudad Nocturna',category:'Decoración',franchise:'Jujutsu Kaisen',price:25000,tag:'Oferta',description:'Póster decorativo de estética urbana y neón.',image:photo('photo-1519608487953-e999c86e7455')},
{id:8,name:'Lámpara Gamer RGB',category:'Videojuegos',franchise:'Genshin Impact',price:89000,tag:'Nuevo',description:'Iluminación ambiental para tu rincón gamer.',image:photo('photo-1507473885765-e6ed057f782c')},
{id:9,name:'Gorra Streetwear Oscura',category:'Ropa anime',franchise:'Attack on Titan',price:45000,tag:'',description:'Gorra urbana de estilo minimalista oscuro.',image:photo('photo-1521369909029-2afed882baee')},
{id:10,name:'Set de Pines Geek',category:'Accesorios',franchise:'Marvel',price:32000,tag:'Popular',description:'Pines decorativos para mochilas y chaquetas.',image:photo('photo-1490312278390-ab64016e0aa9')},
{id:11,name:'Cómic Aventuras Heroicas',category:'Mangas y cómics',franchise:'DC Comics',price:49000,tag:'',description:'Cómic ilustrado de demostración para fans.',image:photo('photo-1612036782180-6f0b6cd846fe')},
{id:12,name:'Taza Mágica',category:'Películas y series',franchise:'Harry Potter',price:38000,tag:'Nuevo',description:'Taza temática de fantasía para tu colección.',image:photo('photo-1514228742587-6b1558fcca3d')},
{id:13,name:'Cojín Retro Arcade',category:'Peluches',franchise:'Stranger Things',price:49000,tag:'',description:'Cojín decorativo con inspiración retro.',image:photo('photo-1584100936595-c0654b55a2e2')},
{id:14,name:'Cuadro Paisaje Épico',category:'Decoración',franchise:'The Legend of Zelda',price:65000,tag:'',description:'Decoración para amantes de los mundos de aventura.',image:photo('photo-1579783902614-a3fb3927b6a5')},
{id:15,name:'Figura Guerrero Fantasía',category:'Figuras coleccionables',franchise:'Jujutsu Kaisen',price:125000,tag:'Oferta',description:'Pieza de exhibición de estilo fantástico.',image:photo('photo-1578662996442-48f60103fc96')},
{id:16,name:'Set de Stickers Pop',category:'Accesorios',franchise:'Pokémon',price:15000,tag:'',description:'Calcomanías decorativas para cuadernos y portátiles.',image:photo('photo-1549465220-1a8b9238cd48')}
];
const CATEGORIES=['Ropa anime','Accesorios','Figuras coleccionables','Mangas y cómics','Peluches','Decoración','Películas y series','Videojuegos'];
const $=(selector)=>document.querySelector(selector);const money=(n)=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);
const safe=(value)=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let cart={};try{const stored=JSON.parse(localStorage.getItem('nekoCart')||'{}');if(stored&&typeof stored==='object'&&!Array.isArray(stored))cart=Object.fromEntries(Object.entries(stored).filter(([id,qty])=>PRODUCTS.some(p=>p.id===Number(id))&&Number.isInteger(qty)&&qty>0&&qty<=99));}catch{}
let activeCategory='';let toastTimer;let previousFocus=null;
const getProduct=id=>PRODUCTS.find(p=>p.id===Number(id));
function saveCart(){try{localStorage.setItem('nekoCart',JSON.stringify(cart));}catch{}renderCart();}
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600);}
function addToCart(id){const p=getProduct(id);if(!p)return;cart[id]=Math.min(99,(cart[id]||0)+1);saveCart();toast(`${p.name} agregado al carrito ♡`);}
function renderCart(){const entries=Object.entries(cart).map(([id,qty])=>({p:getProduct(id),qty})).filter(x=>x.p);$('#cartCount').textContent=entries.reduce((n,x)=>n+x.qty,0);$('#cartTotal').textContent=money(entries.reduce((n,x)=>n+x.qty*x.p.price,0));$('#checkoutBtn').disabled=!entries.length;$('#cartItems').innerHTML=entries.length?entries.map(({p,qty})=>`<div class="cart-item"><img src="${p.image}" alt="${safe(p.name)}" loading="lazy"><div><h3>${safe(p.name)}</h3><p>${money(p.price)} · Subtotal: ${money(p.price*qty)}</p><div class="qty-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Restar ${safe(p.name)}">−</button><span>${qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Sumar ${safe(p.name)}">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Eliminar ${safe(p.name)}">✕</button></div>`).join(''):'<p>Tu carrito está vacío. ¡Encuentra tu próximo favorito! ✨</p>';}
function populateFilters(){CATEGORIES.forEach(c=>$('#categoryFilter').add(new Option(c,c)));[...new Set(PRODUCTS.map(p=>p.franchise))].sort().forEach(f=>$('#franchiseFilter').add(new Option(f,f)));$('#categoryChips').innerHTML=['Todas',...CATEGORIES].map((c,i)=>`<button class="chip ${i===0?'selected':''}" data-category="${i===0?'':safe(c)}">${safe(c)}</button>`).join('');}
function renderProducts(){const q=$('#productSearch').value.trim().toLocaleLowerCase('es');const franchise=$('#franchiseFilter').value;const sort=$('#sortFilter').value;let list=PRODUCTS.filter(p=>(!activeCategory||p.category===activeCategory)&&(!franchise||p.franchise===franchise)&&`${p.name} ${p.category} ${p.franchise} ${p.description}`.toLocaleLowerCase('es').includes(q));if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'es'));$('#resultCount').textContent=`${list.length} producto${list.length===1?'':'s'} encontrado${list.length===1?'':'s'}`;$('#emptyState').hidden=!!list.length;$('#productGrid').innerHTML=list.map(p=>`<article class="product-card"><div class="product-photo"><img src="${p.image}" alt="Imagen ilustrativa de ${safe(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/750x750/2b2244/f8f7ff?text=NekoVerse'">${p.tag?`<span class="tag ${p.tag.toLowerCase()}">${safe(p.tag)}</span>`:''}</div><div class="product-info"><span class="product-category">${safe(p.category)} · ${safe(p.franchise)}</span><h3>${safe(p.name)}</h3><p class="description">${safe(p.description)}</p><p class="product-price">${money(p.price)}</p><div class="product-buttons"><button data-details="${p.id}">Ver detalles</button><button data-add="${p.id}">+ Agregar</button></div></div></article>`).join('');}
function setCategory(category){activeCategory=category;$('#categoryFilter').value=category;document.querySelectorAll('.chip').forEach(ch=>ch.classList.toggle('selected',ch.dataset.category===category));renderProducts();}
function showDetails(id){const p=getProduct(id);if(!p)return;$('#modalContent').innerHTML=`<div class="modal-layout"><img src="${p.image}" alt="Imagen ilustrativa de ${safe(p.name)}"><div><p class="eyebrow">${safe(p.category)} · ${safe(p.franchise)}</p><h2>${safe(p.name)}</h2><p>${safe(p.description)}</p><p>Producto de demostración. Consulta existencias, características y licencias antes de comprar.</p><p class="product-price">${money(p.price)}</p><button class="btn full" data-add="${p.id}">Agregar al carrito 🛒</button></div></div>`;$('#productModal').showModal();}
function openCart(){previousFocus=document.activeElement;$('#overlay').hidden=false;$('#cartDrawer').classList.add('open');$('#cartDrawer').setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');$('#cartClose').focus();}
function closeCart(){if(!$('#cartDrawer').classList.contains('open'))return;$('#overlay').hidden=true;$('#cartDrawer').classList.remove('open');$('#cartDrawer').setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');previousFocus?.focus();}
function whatsappUrl(message){return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;}
function configureLinks(){const hasWhatsApp=/^\d{10,15}$/.test(STORE.whatsapp);for(const id of ['waContact','waFloat']){const el=$('#'+id);if(!el)continue;if(hasWhatsApp)el.href=whatsappUrl('Hola, quisiera consultar sobre los productos de NekoVerse.');else{el.removeAttribute('target');el.href='contacto.html';el.addEventListener('click',e=>{e.preventDefault();toast('Configura el número de WhatsApp en script.js.');});}}for(const [id,url] of [['instagramLink',STORE.instagram],['facebookLink',STORE.facebook]]){const el=$('#'+id);if(!el)continue;if(/^https:\/\//.test(url))el.href=url;else{el.removeAttribute('target');el.addEventListener('click',e=>{e.preventDefault();toast('Configura esta red social en script.js.');});}}if($('#emailLink')&&STORE.email)$('#emailLink').href=`mailto:${STORE.email}`;else if($('#emailLink'))$('#emailLink').addEventListener('click',e=>{e.preventDefault();toast('Configura el correo en script.js.');});}
function submitCheckout(event){event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;if(!/^\d{10,15}$/.test(STORE.whatsapp)){$('#checkoutStatus').textContent='Primero configura el número de WhatsApp de la tienda en script.js.';return;}const entries=Object.entries(cart).map(([id,qty])=>({p:getProduct(id),qty})).filter(x=>x.p);if(!entries.length)return;const data=new FormData(form);const lines=entries.map(({p,qty})=>`• ${p.name} — ${qty} × ${money(p.price)} = ${money(p.price*qty)}`);const total=entries.reduce((n,x)=>n+x.p.price*x.qty,0);const message=`¡Hola! Quiero consultar un pedido en NekoVerse.\n\nCliente: ${data.get('customer')}\n\nProductos:\n${lines.join('\n')}\n\nTOTAL: ${money(total)}\nDirección: ${data.get('address')||'Por acordar'}\nObservaciones: ${data.get('notes')||'Ninguna'}\n\n¿Me confirman disponibilidad y costo de envío?`;const win=window.open(whatsappUrl(message),'_blank','noopener,noreferrer');if(!win){$('#checkoutStatus').textContent='El navegador bloqueó la ventana. Permite ventanas emergentes para enviar el pedido.';return;}$('#checkoutModal').close();form.reset();toast('Se abrió WhatsApp. Envía el mensaje para consultar tu pedido.');}
function setupCollections(){const collections=[['Ropa anime','photo-1556821840-3a63f95609a7'],['Figuras coleccionables','photo-1608889175123-8ee362201f81'],['Mangas y cómics','photo-1544947950-fa07a98d237f'],['Accesorios','photo-1611652022419-a9419f74343d'],['Decoración','photo-1519608487953-e999c86e7455'],['Videojuegos','photo-1493711662062-fa541adb3fc8']];$('#collectionTrack').innerHTML=collections.map(([c,img])=>`<a class="collection-card" href="#productos" data-collection="${c}"><img src="${photo(img)}" alt="Colección ${c}" loading="lazy"><span class="collection-label">${c} ↗</span></a>`).join('');for(const [id,dir] of [['prevCollection',-1],['nextCollection',1]])$('#'+id).addEventListener('click',()=>$('#collectionTrack').scrollBy({left:dir*350,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));}
function initTheme(){
 const button=$('#themeToggle');
 if(!button)return;
 let theme='dark';
 try{theme=localStorage.getItem('nekoTheme')||'dark';}catch{}
 const apply=(value)=>{
  const light=value==='light';
  document.body.classList.toggle('theme-light',light);
  button.textContent=light?'🌙':'☀️';
  button.setAttribute('aria-pressed',String(light));
  button.setAttribute('aria-label',light?'Cambiar a modo oscuro':'Cambiar a modo claro');
  button.title=light?'Cambiar a modo oscuro':'Cambiar a modo claro';
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=light?'#f7f5fc':'#171329';
 };
 apply(theme);
 button.addEventListener('click',()=>{
  theme=document.body.classList.contains('theme-light')?'dark':'light';
  apply(theme);
  try{localStorage.setItem('nekoTheme',theme);}catch{}
 });
}
function init(){
 initTheme();
 const on=(selector,event,handler)=>{const el=$(selector);if(el)el.addEventListener(event,handler);};
 const exists=selector=>!!$(selector);
 if(exists('#categoryFilter')){
  populateFilters();renderProducts();
  on('#productSearch','input',renderProducts);
  on('#franchiseFilter','change',renderProducts);
  on('#sortFilter','change',renderProducts);
  on('#categoryFilter','change',e=>setCategory(e.target.value));
  on('#categoryChips','click',e=>{const b=e.target.closest('[data-category]');if(b)setCategory(b.dataset.category);});
  on('#clearFilters','click',()=>{$('#productSearch').value='';$('#franchiseFilter').value='';$('#sortFilter').value='featured';setCategory('');});
  const selected=new URLSearchParams(location.search).get('categoria');
  if(selected&&CATEGORIES.includes(selected))setCategory(selected);
 }
 renderCart();configureLinks();
 if(exists('#collectionTrack'))setupCollections();
 if(exists('#year'))$('#year').textContent=new Date().getFullYear();
 document.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]'),details=e.target.closest('[data-details]'),qty=e.target.closest('[data-qty]'),remove=e.target.closest('[data-remove]'),collection=e.target.closest('[data-collection]');
  if(add)addToCart(Number(add.dataset.add));
  if(details)showDetails(details.dataset.details);
  if(qty){const id=qty.dataset.qty;cart[id]=Math.max(0,Math.min(99,(cart[id]||0)+Number(qty.dataset.change)));if(!cart[id])delete cart[id];saveCart();}
  if(remove){delete cart[remove.dataset.remove];saveCart();}
  if(collection){e.preventDefault();location.href='productos.html?categoria='+encodeURIComponent(collection.dataset.collection);}
 });
 on('#cartOpen','click',openCart);on('#cartClose','click',closeCart);on('#overlay','click',closeCart);
 on('#modalClose','click',()=>$('#productModal').close());
 on('#checkoutClose','click',()=>$('#checkoutModal').close());
 on('#checkoutBtn','click',()=>{if(!Object.keys(cart).length)return;closeCart();$('#checkoutModal').showModal();});
 on('#checkoutForm','submit',submitCheckout);
 on('#contactForm','submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;if(!STORE.email){$('#formStatus').textContent='Configura el correo de contacto en script.js antes de enviar.';return;}const d=new FormData(form);const subject=encodeURIComponent(d.get('subject'));const body=encodeURIComponent(`Nombre: ${d.get('name')}\nCorreo: ${d.get('email')}\n\n${d.get('message')}`);window.location.href=`mailto:${STORE.email}?subject=${subject}&body=${body}`;$('#formStatus').textContent='Se abrió tu aplicación de correo. Revisa y envía el mensaje allí.';});
 on('#searchJump','click',()=>{location.href='productos.html';});
 on('#menuToggle','click',()=>{const open=$('#nav').classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(open));$('#menuToggle').textContent=open?'✕':'☰';});
 document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');$('#menuToggle').textContent='☰';}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart();if(e.key==='Tab'&&$('#cartDrawer').classList.contains('open')){const focusables=[...$('#cartDrawer').querySelectorAll('button:not(:disabled)')];const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}
document.addEventListener('DOMContentLoaded',init);
