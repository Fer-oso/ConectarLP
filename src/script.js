// ---------- UTILIDADES ----------
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Año en footer
$('#year').textContent = new Date().getFullYear();

// Scroll suave al form
function scrollToForm(){
  $('#colabora').scrollIntoView({behavior:'smooth', block:'start'});
  setTimeout(() => $('#name')?.focus(), prefersReduced ? 0 : 600);
}
window.scrollToForm = scrollToForm;

// Abrir perfil IG
function openInstagram(){
  window.open('https://instagram.com/conectar', '_blank');
}
window.openInstagram = openInstagram;

// ---------- HEADER: shrink + sticky CTA ----------
const header = $('#main-header');
const stickyCta = $('#sticky-cta');
const hero = $('#inicio');
const formSection = $('#colabora');

// Header “scrolled”
const onScrollHeader = () => {
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

// Sticky CTA aparece cuando el hero sale de vista y NO estamos en el form
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.target === hero) {
      if (!e.isIntersecting) stickyCta?.classList.add('visible');
      else stickyCta?.classList.remove('visible');
    }
    if (e.target === formSection) {
      if (e.isIntersecting) stickyCta?.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });
if (hero) io.observe(hero);
if (formSection) io.observe(formSection);

// ---------- MENÚ MÓVIL ----------
const menuBtn = $('#mobile-menu-btn');
const mainMenu = $('#main-menu');

if (menuBtn && mainMenu) {
  const toMobile = () => {
    if (window.innerWidth <= 1000) mainMenu.classList.add('mobile');
    else { mainMenu.classList.remove('mobile', 'active'); menuBtn.classList.remove('active'); document.body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded','false'); }
  };
  toMobile();
  window.addEventListener('resize', toMobile);

  const toggleMenu = () => {
    const isOpen = mainMenu.classList.toggle('active');
    menuBtn.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    // Foco al primer link
    if (isOpen) mainMenu.querySelector('a')?.focus();
  };
  menuBtn.addEventListener('click', toggleMenu);

  // Cerrar al clickear un link
  mainMenu.addEventListener('click', e => {
    if (e.target.matches('a')) {
      mainMenu.classList.remove('active');
      menuBtn.classList.remove('active');
      document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded','false');
    }
  });

  // Cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
      menuBtn.click();
    }
  });
}

// ---------- MODAL ACCESIBLE ----------
const modal = $('#modal');
function openCollabModal(){
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  // Trampa de foco simple
  const focusables = $$('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])', modal);
  const first = focusables[0], last = focusables[focusables.length - 1];
  first?.focus();
  function trap(e){
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  modal._trap = trap;
  modal.addEventListener('keydown', trap);
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.removeEventListener('keydown', modal._trap || (()=>{}));
}
window.openCollabModal = openCollabModal;
window.closeModal = closeModal;

// Cerrar modal por click fuera / ESC
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('show')) closeModal(); });

// ---------- ANIMACIONES APPEAR ----------
const appearEls = $$('.appear, .fade-up');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if(ent.isIntersecting){
      ent.target.style.opacity = 1;
      ent.target.style.transform = 'none';
      ent.target.style.animationPlayState = 'running';
      obs.unobserve(ent.target);
    }
  });
}, {threshold:0.12});
appearEls.forEach(el => obs.observe(el));

// ---------- CONTADOR DE COMUNIDAD ----------
const counterEl = $('#counter');
if (counterEl) {
  const target = parseInt(counterEl.textContent.replace(/\D/g,''), 10) || 0;
  counterEl.textContent = '0';
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (!ent.isIntersecting) return;
      cObs.disconnect();
      const duration = prefersReduced ? 0 : 1500;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = p < .5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3)/2; // easeInOutCubic
        const val = Math.floor(target * (duration ? ease : 1));
        counterEl.textContent = val.toLocaleString('es-AR');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  cObs.observe(counterEl);
}

// ---------- FORM: validación + UX ----------
const form = $('#collabForm');
const thanks = $('#thanks');
const submitBtn = $('#submitBtn');

// Helpers de validación
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isURL   = (v) => {
  try { const u = new URL(v); return ['http:','https:'].includes(u.protocol); } catch { return false; }
};
const normHandle = (v) => v ? (v.startsWith('@') ? v : '@'+v.replace(/^@+/,'')).trim() : '';

function showError(id, msg){
  const input = $('#'+id);
  const err = $('#'+id+'-error');
  input.classList.add('error');
  if (err){ err.textContent = msg; err.style.display = 'block'; }
}
function clearError(id){
  const input = $('#'+id);
  const err = $('#'+id+'-error');
  input.classList.remove('error');
  if (err) err.style.display = 'none';
}

// Persistencia local
const STORAGE_KEY = 'conectarForm';
function saveForm(){
  const data = {
    name: $('#name')?.value || '',
    email: $('#email')?.value || '',
    insta: $('#insta')?.value || '',
    phone: $('#phone')?.value || '',
    link: $('#link')?.value || '',
    message: $('#message')?.value || ''
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function restoreForm(){
  try{
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    Object.entries(data).forEach(([k,v]) => { const el = $('#'+k); if (el && !el.value) el.value = v; });
  }catch{}
}
restoreForm();
$$('#collabForm input, #collabForm textarea').forEach(el => el.addEventListener('input', saveForm));

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Limpiar errores
  ['name','email','insta','link'].forEach(clearError);

  // Datos
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const insta = normHandle($('#insta').value.trim());
  const phone = $('#phone').value.trim();
  const link = $('#link').value.trim();
  const message = $('#message').value.trim();

  // Validación
  let ok = true;
  if (!name) { showError('name','Ingresá tu nombre completo'); ok = false; }
  if (!isEmail(email)) { showError('email','Ingresá un email válido'); ok = false; }
  if (!insta || insta.length < 3) { showError('insta','Ingresá tu usuario (ej: @tuusuario)'); ok = false; }
  if (!isURL(link)) { showError('link','Ingresá un link válido (http/https)'); ok = false; }

  if (!ok) return;

  // UX: bloqueo
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  // Simulación de envío (reemplazar por fetch a tu backend)
  try{
    await new Promise(res => setTimeout(res, 1000));

    // Éxito
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar solicitud';
    thanks.style.display = 'block';
    form.reset();
    localStorage.removeItem(STORAGE_KEY);

    // Auto-ocultar mensaje
    setTimeout(()=> { thanks.style.display = 'none'; }, 8000);
  }catch(err){
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar solicitud';
    alert('Hubo un problema al enviar. Intentá nuevamente.');
  }
});

// Normalizar handle al salir del campo
$('#insta')?.addEventListener('blur', (e) => {
  e.target.value = normHandle(e.target.value);
});

// ---------- DESCARGA GUÍA (demo) ----------
function downloadGuide(){
  // Podés cambiar por un archivo real en tu hosting
  const blob = new Blob(
    ['Guía rápida para colaboraciones exitosas en @conectar.\n1) Reel educativo.\n2) CTA claro.\n3) Medí tus leads.'],
    { type: 'text/plain;charset=utf-8' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Guia-Colaboraciones-Conectar.txt';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
window.downloadGuide = downloadGuide;
// Función para abrir el modal de Instagram
function openInstagramModal(videoUrl, title, description) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('instagram-video');
  const modalTitle = document.getElementById('video-modal-title');
  
  // Configurar el iframe con la URL del video
  // Nota: Instagram no permite embeber videos directamente, 
  // así que en una implementación real necesitarías usar su API
  // Esta es una aproximación
  iframe.src = videoUrl;
  
  // Configurar título y descripción si se proporcionan
  if (title) {
    modalTitle.textContent = title;
  }
  
  // Mostrar el modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Enfocar el modal para accesibilidad
  modal.setAttribute('aria-hidden', 'false');
}

// Función para cerrar el modal de Instagram
function closeInstagramModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('instagram-video');
  
  // Detener el video
  iframe.src = '';
  
  // Ocultar el modal
  modal.classList.remove('show');
  document.body.style.overflow = '';
  
  // Actualizar para accesibilidad
  modal.setAttribute('aria-hidden', 'true');
}

// Event listeners para los posts
document.addEventListener('DOMContentLoaded', function() {
  // Agregar event listeners a todos los posts
  const posts = document.querySelectorAll('.post[data-video]');
  
  posts.forEach(post => {
    post.addEventListener('click', function(e) {
      // Evitar que se active si se hace clic en un enlace dentro del post
      if (e.target.tagName === 'A') return;
      
      const videoUrl = this.getAttribute('data-video');
      const title = this.querySelector('h4').textContent;
      const description = this.querySelector('p').textContent;
      
      openInstagramModal(videoUrl, title, description);
    });
    
    // Mejorar accesibilidad con teclado
    post.setAttribute('tabindex', '0');
    post.setAttribute('role', 'button');
    post.setAttribute('aria-label', 'Reproducir video: ' + post.querySelector('h4').textContent);
    
    post.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const videoUrl = this.getAttribute('data-video');
        const title = this.querySelector('h4').textContent;
        const description = this.querySelector('p').textContent;
        
        openInstagramModal(videoUrl, title, description);
      }
    });
  });
  
  // Cerrar modal con el botón de cerrar
  const closeButton = document.querySelector('.modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeInstagramModal);
  }
  
  // Cerrar modal al hacer clic fuera del contenido
  const modal = document.getElementById('video-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeInstagramModal();
      }
    });
  }
  
  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeInstagramModal();
    }
  });
});
function openCollabModal(){
  const modal = document.getElementById('collab-modal');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeCollabModal(){
  const modal = document.getElementById('collab-modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
// cerrar al hacer click afuera
document.getElementById('collab-modal').addEventListener('click',function(e){
  if(e.target === this) closeCollabModal();
});
// cerrar con Escape
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    closeCollabModal();
  }
});
// Nota importante: 
// Instagram tiene restricciones para embeber contenido.
// En producción, necesitarías usar la API oficial de Instagram
// o un servicio de terceros para embeber correctamente los videos.