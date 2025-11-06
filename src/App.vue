<!-- src/App.vue -->
<template>
  <div id="app" class="app-root">
    <HeaderNav />

    <!-- route switch: main app vs pages -->
    <main v-if="route === '/' || route === ''" class="container">
      <section class="hero" id="hero">
        <div class="hero-left">
          <h1 class="hero-title">
            <span class="gold-text">Robôs</span> e <span class="gold-text">Indicadores</span> Profissionais para a B3
          </h1>
          <p class="subtitle">
            Soluções automáticas e indicadores para operadores que buscam
            consistência e um sistema profissional. Pacotes e planos mensais,
            trimestrais e anuais.
          </p>
          <div class="hero-cta">
            <a href="#robos" class="primary">Ver Robôs</a>
            <a href="#pacotes" class="ghost">Pacotes e Indicadores</a>
          </div>
        </div>

      <div class="hero-right">
        <img
          ref="mascotsImg"
          src="/mascotes.png"
          alt="Mascotes — touro e urso"
          class="mascots"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
    </section>

    <section class="carousel-section">
      <div class="carousel-track">
        <div 
          v-for="(img, index) in [...carouselImages, ...carouselImages]" 
          :key="index" 
          class="carousel-item"
          @click="openLightbox(index % carouselImages.length)"
        >
          <img :src="img" :alt="`Imagem ${index + 1}`" loading="lazy" />
        </div>
      </div>
    </section>

    <div class="telegram-cta" role="navigation" aria-label="Links para Telegram">
      <div class="centered">
        <h2 class="tg-title">Grupo Automações</h2>
        <p>Entre para o nosso grupo do Telegram para receber TODOS OS ROBÔS E INDICADORES GRATUITAMENTE para teste, e também um CUPOM DE 20% DE DESCONTO na pré-venda:</p>
        <a
          class="tg-btn tg-group"
          href="https://t.me/+1h9O__7JFzZjM2Fh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Entrar no Grupo Automações no Telegram"
        >
          <span class="tg-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22l-4-9-9-4 20-7z"></path>
            </svg>
          </span>
          <span class="tg-label">
            Grupo Automações
          </span>
        </a>
      </div>

      <div class="centered">
        <h2 class="tg-title">Copy Trade</h2>
        <p>Copie automaticamente em tempo real as operações dos nossos traders profissionais. Transparência, praticidade e resultado — tudo integrado ao seu Profit 👇</p>
        <a
          class="tg-btn tg-copy"
          href="https://t.me/cleitinhotrader?text=Quero%20saber%20mais%20sobre%20o%20copy%20trade."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Saber mais sobre Copy Trade no Telegram"
        >
          <span class="tg-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22l-4-9-9-4 20-7z"></path>
            </svg>
          </span>
          <span class="tg-label">
            Copy Trade — Saiba mais
          </span>
        </a>
      </div>
    </div>

      <section id="pacotes" class="products-section">
        <h2>Pacotes</h2>
        <p class="section-lead">
          Pacotes premium que unem robôs e indicadores em curadorias pensadas para maximizar custo‑benefício, simplicidade de setup e performance — com 25% OFF em relação à compra individual dos produtos.
        </p>
        <div class="grid">
          <ProductCard
            v-for="p in packages"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>
      </section>

      <section id="robos" class="products-section">
        <h2>Robôs</h2>
        <p class="section-lead">
          Os robôs Flow Auto Gain combinam leitura de mercado, gestão de risco institucional e execução de alta performance. A Linha Alpha opera em dólar (WDO/DOL), enquanto as linhas Gamma, Delta e Alta Frequência operam em índice (WIN/IND). Explore as linhas para estratégias sob medida e evolução contínua.
        </p>

        <!-- Linha Gamma -->
        <h3 id="linha-gamma" class="line-title">Linha Gamma</h3>
        <div class="grid">
          <ProductCard
            v-for="p in gammaLine"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>

        <!-- Linha Delta -->
        <h3 id="linha-delta" class="line-title">Linha Delta</h3>
        <div class="grid">
          <ProductCard
            v-for="p in deltaLine"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>

        <!-- Linha de Alta frequência (aparece abaixo da Delta) -->
        <h3 id="linha-alta-frequencia" class="line-title">Linha de Alta frequência</h3>
        <div class="grid">
          <ProductCard
            v-for="p in altaFreqLine"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>

        <!-- Linha Alpha -->
        <h3 id="linha-alpha" class="line-title">Linha Alpha</h3>
        <div class="grid">
          <ProductCard
            v-for="p in alphaLine"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>
      </section>

      <section id="indicadores" class="products-section">
        <h2>Indicadores</h2>
        <p class="section-lead">
          Indicadores profissionais para análise gráfica — tendência, momentum, timing e confluências — prontos para o seu Profit. Sinais claros, documentados e construídos para elevar sua tomada de decisão.
        </p>
        <div class="grid">
          <ProductCard
            v-for="p in indicators"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>
      </section>
    </main>

    <TermsPage v-else-if="route === '/terms'" />
    <PrivacyPage v-else-if="route === '/privacy'" />

    <FooterSection />

    <OfferModal
      :visible="modalVisible"
      :offer="selectedOffer"
      @close="closeModal"
    />

    <!-- Lightbox -->
    <div v-if="lightboxVisible" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Fechar">×</button>
      <button class="lightbox-nav lightbox-prev" @click="prevImage" aria-label="Anterior">‹</button>
      <button class="lightbox-nav lightbox-next" @click="nextImage" aria-label="Próxima">›</button>
      <img :src="carouselImages[currentLightboxIndex]" :alt="`Imagem ${currentLightboxIndex + 1}`" class="lightbox-image" />
      <div class="lightbox-counter">{{ currentLightboxIndex + 1 }} / {{ carouselImages.length }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import HeaderNav from "./components/HeaderNav.vue";
import ProductCard from "./components/ProductCard.vue";
import OfferModal from "./components/OfferModal.vue";
import FooterSection from "./components/FooterSection.vue";
import TermsPage from "./pages/Terms.vue";
import PrivacyPage from "./pages/Privacy.vue";
import { PRODUCTS, offerUrl } from "./data/products.js";

const modalVisible = ref(false);
const selectedOffer = ref(null);

// Array de imagens do carrossel
const carouselImages = ref([
  '/carousel-1.png',
  '/carousel-2.png',
  '/carousel-3.png',
  '/carousel-4.png',
  '/carousel-5.png',
  '/carousel-6.png'
]);

const robots = computed(() => PRODUCTS.filter((p) => p.category === "Robô"));
const indicators = computed(() => PRODUCTS.filter((p) => p.category === "Indicador"));
const packages = computed(() => PRODUCTS.filter((p) => p.category === "Pacote"));

const gammaLine = computed(() => robots.value.filter((p) => p.name.startsWith("Gamma")));
const deltaLine = computed(() => robots.value.filter((p) => p.name.startsWith("Delta")));
const altaFreqLine = computed(() => robots.value.filter((p) => p.line === 'Linha de alta frequência'));
const alphaLine = computed(() => robots.value.filter((p) => p.name.startsWith("Alpha")));

// hash handling:
// - "#/..." => app route (ex: "/terms", "/privacy")
// - "#anchor" (no leading "/") => anchor within main page (ex: "#robos")
const route = ref('/');
function _handleHashChange() {
  const raw = String(window.location.hash || '').replace(/^#/, '');

  // route case: hashes that start with "/" map to that route directly
  if (raw && raw.startsWith('/')) {
    route.value = raw;
    // quando abrimos uma página de rota (terms/privacy), subir ao topo
    // após a troca de conteúdo, garantindo que a view seja exibida
    nextTick(() => {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0,0); }
    });
    return;
  }

  // anchor / main page case: garantir que a app esteja em "/" e rolar para a âncora
  route.value = '/';
  // se houver uma âncora (ex: "robos"), rolar para ela após renderizar main
  if (raw) {
    // usar rolagem resiliente para âncoras
    _scrollToAnchor(raw);
  } else {
    nextTick(() => {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0,0); }
    });
  }
}
onMounted(() => window.addEventListener("hashchange", _handleHashChange));
onBeforeUnmount(() => window.removeEventListener("hashchange", _handleHashChange));
// rodar uma vez na inicialização para respeitar hash atual
_handleHashChange();

function openOffer(payload) {
  // payload: { productId, name, planKey, plan, url }
  const url = payload.url || offerUrl(payload.productId, payload.planKey);
  selectedOffer.value = { ...payload, url };
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
  selectedOffer.value = null;
}

const mascotsImg = ref(null);

// estado interno para o efeito (não reativo)
const _mascots = {
  clientX: null,
  clientY: null,
  rafId: null,
  running: false,
  maxTilt: 1,       // suavizado: menos inclinação (graus)
  translateMax: 1,  // suavizado: menor deslocamento (px)
};

function _updateMascotsTransform() {
  const img = mascotsImg.value;
  if (!img) return;

  const rect = img.getBoundingClientRect();

  // reset suave se o ponteiro não estiver presente
  if (_mascots.clientX == null || _mascots.clientY == null) {
    img.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
    return;
  }

  const cx = _mascots.clientX;
  const cy = _mascots.clientY;

  // normaliza -1..1 com base no centro do elemento
  const relX = ((cx - (rect.left + rect.width / 2)) / rect.width) * -2;
  const relY = ((cy - (rect.top + rect.height / 2)) / rect.height) * -2;
  const clamp = (v) => Math.max(-1, Math.min(1, v));
  const nx = clamp(relX);
  const ny = clamp(relY);

  const max = _mascots.maxTilt;

  // fazer a imagem "olhar" para o cursor
  const rotateX = ny * max;
  const rotateY = -nx * max;

  // pequena translação para parallax
  const tx = nx * _mascots.translateMax * -1;
  const ty = ny * _mascots.translateMax * -1;

  // reduzir profundidade (translateZ) para efeito mais sutil
  img.style.transform = `perspective(800px) translate3d(${tx}px, ${ty}px, 3px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function _startMascotsRaf() {
  if (_mascots.rafId) return;
  _mascots.running = true;
  const loop = () => {
    _updateMascotsTransform();
    _mascots.rafId = requestAnimationFrame(loop);
  };
  _mascots.rafId = requestAnimationFrame(loop);
}

function _stopMascotsRaf() {
  if (_mascots.rafId) {
    cancelAnimationFrame(_mascots.rafId);
    _mascots.rafId = null;
  }
  _mascots.running = false;
}

onMounted(() => {
  const target = window;
  const onPointerMove = (e) => {
    const cx = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
    const cy = (e.clientY !== undefined) ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY) || 0;
    _mascots.clientX = cx;
    _mascots.clientY = cy;
    if (!_mascots.running) _startMascotsRaf();
  };

  const onPointerEnd = () => {
    _mascots.clientX = null;
    _mascots.clientY = null;
    if (!_mascots.running) _startMascotsRaf();
    // allow RAF to run one more frame to reset, then stop shortly after
    setTimeout(() => _stopMascotsRaf(), 220);
  };

  target.addEventListener('pointermove', onPointerMove, { passive: true });
  target.addEventListener('mousemove', onPointerMove, { passive: true });
  target.addEventListener('pointerleave', onPointerEnd, { passive: true });
  target.addEventListener('touchend', onPointerEnd, { passive: true });

  // guardar refs para remoção
  _mascots._onPointerMove = onPointerMove;
  _mascots._onPointerEnd = onPointerEnd;
});

onBeforeUnmount(() => {
  const target = window;
  if (_mascots._onPointerMove) {
    target.removeEventListener('pointermove', _mascots._onPointerMove);
    target.removeEventListener('mousemove', _mascots._onPointerMove);
  }
  if (_mascots._onPointerEnd) {
    target.removeEventListener('pointerleave', _mascots._onPointerEnd);
    target.removeEventListener('touchend', _mascots._onPointerEnd);
  }
  _stopMascotsRaf();
});

// helpers to force scroll without relying on hashchange
function _scrollToTop() {
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
}

// resilient anchor scroll: wait until target exists after route switches back to "/"
function _scrollToAnchor(id) {
  if (!id) return;

  const header = document.querySelector('.topbar');
  const headerOffset = header ? header.offsetHeight : 72;

  const scrollToEl = (el) => {
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
    try { window.scrollTo({ top, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, top); }
  };

  let attempts = 0;
  const maxAttempts = 24; // ~24 * 50ms = ~1.2s
  const tryFind = () => {
    attempts++;
    const target = document.getElementById(id);
    if (target) {
      scrollToEl(target);
    } else if (attempts < maxAttempts) {
      setTimeout(tryFind, 50);
    }
  };

  // wait for DOM updates, then begin retries
  nextTick(() => setTimeout(tryFind, 0));
}

// set up listeners once with stable references
const _onNavAnchor = (e) => _scrollToAnchor(e?.detail?.id);

onMounted(() => {
  window.addEventListener("hashchange", _handleHashChange);
  window.addEventListener('nav:home', _scrollToTop);
  window.addEventListener('nav:anchor', _onNavAnchor);
});

// proper cleanup using same function refs
onBeforeUnmount(() => {
  window.removeEventListener("hashchange", _handleHashChange);
  window.removeEventListener('nav:home', _scrollToTop);
  window.removeEventListener('nav:anchor', _onNavAnchor);
});

// run once on init to honor current hash
_handleHashChange();

const lightboxVisible = ref(false);
const currentLightboxIndex = ref(0);

function openLightbox(index) {
  currentLightboxIndex.value = index;
  lightboxVisible.value = true;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxVisible.value = false;
  document.body.style.overflow = '';
}

function nextImage() {
  currentLightboxIndex.value = (currentLightboxIndex.value + 1) % carouselImages.value.length;
}

function prevImage() {
  currentLightboxIndex.value = (currentLightboxIndex.value - 1 + carouselImages.value.length) % carouselImages.value.length;
}

// Keyboard navigation for lightbox
onMounted(() => {
  const handleKeydown = (e) => {
    if (!lightboxVisible.value) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };
  window.addEventListener('keydown', handleKeydown);
  
  // Store for cleanup
  if (!window._lightboxKeyHandler) {
    window._lightboxKeyHandler = handleKeydown;
  }
});

onBeforeUnmount(() => {
  if (window._lightboxKeyHandler) {
    window.removeEventListener('keydown', window._lightboxKeyHandler);
  }
});
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  background: var(--bg);
  color: #f5f2eb;
  display: flex;
  flex-direction: column;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: stretch;
  padding: 2rem 0;
  height: 70vh;
}

.hero-left {
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ensure hero text and CTAs sit above the decorative circle */
.hero-left > * {
  position: relative;
  z-index: 1;
}

/* golden blurred circle behind hero text */
.hero-left::before {
  content: "";
  position: absolute;
  left: 5%;
  top: -20%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  border-radius: 50%;
  /* radial golden gradient, translucent toward the edges */
  background: radial-gradient(
    circle at 30% 30%,
    rgba(212,175,55,0.95) 0%,
    rgba(212,175,55,0.72) 10%,
    rgba(212,175,55,0.30) 42%,
    rgba(212,175,55,0.08) 65%,
    rgba(0,0,0,0) 80%
  );
  filter: blur(150px);
  opacity: 0.5;
  z-index: 0;
  pointer-events: none;
  /* mix-blend-mode dá um brilho mais elegante sobre o fundo escuro */
  mix-blend-mode: screen;
  animation: floatCircleLeft 12s linear infinite;
}

/* moving golden blurred circle behind hero-right image */
.hero-right::before {
  content: "";
  position: absolute;
  left: 62%;
  top: 58%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(212,175,55,0.95) 0%,
    rgba(212,175,55,0.72) 18%,
    rgba(212,175,55,0.30) 40%,
    rgba(212,175,55,0.08) 62%,
    rgba(0,0,0,0) 80%
  );
  filter: blur(100px);
  opacity: 0.5;
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  animation: floatCircle 10s linear infinite;
}

/* keyframes approximate a circular orbit by changing top/left */
@keyframes floatCircle {
  0%   { left: 62%; top: 58%; }
  12.5%{ left: 68%; top: 62%; }
  25%  { left: 62%; top: 66%; }
  37.5%{ left: 56%; top: 62%; }
  50%  { left: 62%; top: 58%; }
  62.5%{ left: 68%; top: 62%; }
  75%  { left: 62%; top: 66%; }
  87.5%{ left: 56%; top: 62%; }
  100% { left: 62%; top: 58%; }
}

/* keyframes for hero-left blur */
@keyframes floatCircleLeft {
  0%   { left: 5%; top: -20%; }
  12.5%{ left: 10%; top: -15%; }
  25%  { left: 5%; top: -10%; }
  37.5%{ left: 0%; top: -15%; }
  50%  { left: 5%; top: -20%; }
  62.5%{ left: 10%; top: -15%; }
  75%  { left: 5%; top: -10%; }
  87.5%{ left: 0%; top: -15%; }
  100% { left: 5%; top: -20%; }
}

/* responsive: reduce size and blur on smaller viewports */
@media (max-width: 900px) {
  .hero-right::before {
    width: 420px;
    height: 420px;
    filter: blur(60px);
    animation-duration: 12s;
  }
  
  @keyframes floatCircle {
    0%   { left: 60%; top: 55%; }
    12.5%{ left: 65%; top: 58%; }
    25%  { left: 60%; top: 62%; }
    37.5%{ left: 55%; top: 58%; }
    50%  { left: 60%; top: 55%; }
    62.5%{ left: 65%; top: 58%; }
    75%  { left: 60%; top: 62%; }
    87.5%{ left: 55%; top: 58%; }
    100% { left: 60%; top: 55%; }
  }
}

@media (max-width: 640px) {
  .hero-right::before {
    width: 320px;
    height: 320px;
    filter: blur(42px);
    animation-duration: 14s;
  }
  
  @keyframes floatCircle {
    0%   { left: 58%; top: 52%; }
    12.5%{ left: 62%; top: 55%; }
    25%  { left: 58%; top: 58%; }
    37.5%{ left: 54%; top: 55%; }
    50%  { left: 58%; top: 52%; }
    62.5%{ left: 62%; top: 55%; }
    75%  { left: 58%; top: 58%; }
    87.5%{ left: 54%; top: 55%; }
    100% { left: 58%; top: 52%; }
  }
}

.hero-left h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: #f8ecd8; /* título principal branco/dourado apenas nos spans */
  text-shadow: 0 6px 22px rgba(0,0,0,0.45);
  letter-spacing: -0.6px;
}

/* gradient only for selected words */
.gold-text {
  background: linear-gradient(90deg, 
    var(--gold-1) 0%, 
    var(--gold-2) 25%, 
    var(--gold-1) 50%, 
    var(--gold-2) 75%, 
    var(--gold-1) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  line-height: 1.05;
  animation: goldShift 3s linear infinite;
}

@keyframes goldShift {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

.subtitle {
  color: rgba(245,242,235,0.72);
  margin: 0 0 4rem 0;
}

.hero-cta a {
  margin-right: 1rem;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
}

.primary {
  background: rgba(212,175,55);
  color: #ffffff;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 120ms ease;
  will-change: transform, box-shadow;
  animation: pulse 2s ease-in-out infinite;
}
.primary:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 34px rgba(212,175,55,0.12);
  opacity: 0.98;
  animation: none;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.ghost {
  background: transparent;
  color: #f5f2eb;
  border: 1px solid rgba(212,175,55);
  /* changed: allow transform/scale like .primary */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;
}
.ghost:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 34px rgba(212,175,55,0.12);
}


.hero-right {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* ensure image sits above the animated blur */
.hero-right > .mascots {
  position: relative;
  z-index: 1;
}

/* imagem responsiva dentro do visual */
.mascots {
  width: 100%;
  max-height: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  border: 2px solid rgba(212,175,55);
  border-radius: 20px;

  /* performance + suavização do movimento */
  transform-origin: center center;
  will-change: transform;
  transition: transform 200ms cubic-bezier(.2,.8,.2,1);
}

/* responsividade: reduzir visual em telas menores */
@media (max-width: 900px) {
  .hero-right .mascots { height: 260px; }
}
@media (max-width: 640px) {
  .hero-right .mascots { height: 200px; }
}

.chart {
  width: 100%;
  height: 100%;
  max-width: 340px;
}


/* chart stroke animation */
.chart path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: drawLine 1400ms cubic-bezier(.2,.9,.2,1) 120ms forwards;
}

.chart path[stroke="#b8860b"], .chart path[stroke="#D4AF37"] { stroke: var(--gold-1); }

@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

.products-section {
  margin-top: 6rem;
  text-align: center;
}
.products-section h2 {
  color: #f8ecd8;
  margin-bottom: 1.5rem;
  font-size: 32px;
}

/* título das linhas (subseções dentro de Robôs) */
.line-title {
  color: #f8ecd8;
  margin: 3rem 0 1.2rem 0;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
}

/* === CHANGE: força 3 colunas para a seção "Robôs" (3x3) === */
#robos .grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
@media (max-width: 1100px) {
  #robos .grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
}
@media (max-width: 680px) {
  #robos .grid { grid-template-columns: 1fr; gap: 1.2rem; }
}

/* === Novas regras: Indicadores = 4 colunas, Pacotes = 3 colunas === */

/* Indicadores: 3 colunas em desktop, reduz para 2/1 em larguras menores */
#indicadores .grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}
@media (max-width: 1200px) {
  #indicadores .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  #indicadores .grid { grid-template-columns: 1fr; }
}

/* Pacotes: 3 colunas em desktop, reduz para 2/1 em larguras menores */
#pacotes .grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
@media (max-width: 1100px) {
  #pacotes .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  #pacotes .grid { grid-template-columns: 1fr; }
}

.telegram-cta {
  width: 100%;
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin: 1.2rem 0;
  padding: 0 0 4rem 0;
  box-sizing: border-box;
}

.tg-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 700;
  background: rgba(212,175,55);
  border: 1px solid rgba(2,136,209,0.12);
  box-shadow: 0 8px 24px rgba(2,136,209,0.06);
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
}
.tg-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 34px rgba(2,136,209,0.12);
  opacity: 0.98;
}
.tg-btn:active { transform: translateY(-1px); }
.tg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #ffffff;
}
.tg-icon svg { width: 100%; height: 100%; color: inherit; display:block; }

/* variant subtle: darker for Copy Trade to differentiate */
.tg-copy {
  background: rgba(212,175,55);
  border: 1px solid rgba(184,134,11,0.12);
  color: #ffffff;
}

/* responsividade */
@media (max-width: 640px) {
  .telegram-cta { flex-direction: column; gap: 10px; }
  .tg-btn { width: 100%; justify-content: center; padding: 0.65rem; }
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .hero-right {
    order: 2;
  }
  .hero-left h1 { font-size:1.8rem; }
}

/* Add a small utility for page wrappers used on Terms/Privacy */
.page-content {
  max-width: 980px;
  margin: 3rem auto;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid rgba(212,175,55,0.04);
  padding: 2.2rem;
  border-radius: 12px;
  color: #efe8d6;
  box-shadow: 0 12px 36px rgba(0,0,0,0.6);
}
.page-content h1 {
  margin-top: 0;
  color: #f8ecd8;
  letter-spacing: -0.2px;
}
.page-content p, .page-content li {
  color: rgba(245,242,235,0.86);
  line-height: 1.6;
  margin-bottom: 0.9rem;
}
.page-actions {
  display:flex;
  gap:12px;
  margin-top:1.4rem;
}
.page-actions a {
  text-decoration:none;
  padding:0.6rem 1rem;
  border-radius:8px;
  font-weight:700;
  background:#b8860b;
  color:#111;
}

/* container: usar max-width e padding responsivo */
.container {
  width: 80vw;
  margin: 0 auto;
  box-sizing: border-box;
}

/* melhorar leitura em tablets / mobiles */
@media (max-width: 420px) {
  .mascots { border-radius: 14px; border-width: 1px; }
  .hero-left h1 { font-size: 1.4rem; }
  .subtitle { margin-bottom: 1.4rem; font-size: 0.95rem; }
}

.section-lead {
  color: rgba(245,242,235,0.72);
  max-width: 920px;
  margin: 0 auto 1.8rem;
  line-height: 1.6;
}

/* Carousel Section - full width */
.carousel-section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  padding: 4rem 0;
  background: transparent;
}

/* Gradient overlays on left and right edges */
.carousel-section::before,
.carousel-section::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 5%;
  z-index: 2;
  pointer-events: none;
}

.carousel-section::before {
  left: 0;
  background: linear-gradient(to right, var(--bg) 0%, transparent 100%);
}

.carousel-section::after {
  right: 0;
  background: linear-gradient(to left, var(--bg) 0%, transparent 100%);
}

.carousel-track {
  display: flex;
  gap: 2rem;
  animation: scroll 30s linear infinite;
  width: max-content;
}

.carousel-item {
  flex-shrink: 0;
  width: 320px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(212,175,55,0.2);
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-item:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(212,175,55,0.2);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50%));
  }
}

/* Pause animation on hover */
.carousel-track:hover {
  animation-play-state: paused;
}

/* Responsive carousel */
@media (max-width: 640px) {
  .carousel-item {
    width: 240px;
    height: 150px;
  }
  
  .carousel-section::before,
  .carousel-section::after {
    width: 20%;
  }
}

/* Lightbox styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
  box-sizing: border-box;
}

.lightbox-image {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.8);
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  font-size: 2.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 160ms ease, transform 160ms ease;
  z-index: 10001;
}

.lightbox-close:hover {
  background: rgba(255,255,255,0.2);
  transform: scale(1.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  font-size: 3rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 160ms ease, transform 160ms ease;
  line-height: 1;
  z-index: 10001;
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

.lightbox-nav:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-counter {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255,255,255,0.1);
}

@media (max-width: 768px) {
  .lightbox-nav {
    width: 50px;
    height: 50px;
    font-size: 2.5rem;
  }
  
  .lightbox-prev {
    left: 1rem;
  }
  
  .lightbox-next {
    right: 1rem;
  }
  
  .lightbox-close {
    width: 45px;
    height: 45px;
    font-size: 2rem;
    top: 1rem;
    right: 1rem;
  }
}
</style>
