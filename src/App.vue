<!-- src/App.vue -->
<template>
  <div id="app" class="app-root">
    <HeaderNav />

    <!-- route switch: main app vs pages -->
    <main v-if="route === '/' || route === ''" class="container">
      <section class="hero">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import HeaderNav from "./components/HeaderNav.vue";
import ProductCard from "./components/ProductCard.vue";
import OfferModal from "./components/OfferModal.vue";
// FooterSection will be provided/updated below
import FooterSection from "./components/FooterSection.vue";
import TermsPage from "./pages/Terms.vue";
import PrivacyPage from "./pages/Privacy.vue";
import { PRODUCTS, offerUrl } from "./data/products.js";

const modalVisible = ref(false);
const selectedOffer = ref(null);

const robots = computed(() => PRODUCTS.filter((p) => p.category === "Robô"));
const indicators = computed(() => PRODUCTS.filter((p) => p.category === "Indicador"));
const packages = computed(() => PRODUCTS.filter((p) => p.category === "Pacote"));

const gammaLine = computed(() =>
  robots.value.filter((p) => p.name.startsWith("Gamma"))
);

const deltaLine = computed(() =>
  robots.value.filter((p) => p.name.startsWith("Delta"))
);

// Linha de Alta frequência
const altaFreqLine = computed(() =>
  robots.value.filter((p) => p.line === 'Linha de alta frequência')
);

const alphaLine = computed(() =>
  robots.value.filter((p) => p.name.startsWith("Alpha"))
);

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
    nextTick(() => {
      // permitir pequena espera para que o DOM esteja pronto
      setTimeout(() => {
        try {
          const target = document.getElementById(raw);
          const header = document.querySelector('.topbar');
          const headerOffset = header ? header.offsetHeight : 72;
          if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
            window.scrollTo({ top, behavior: 'smooth' });
          } else {
            // se não houver elemento com esse id, tentar rolar ao topo como fallback
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } catch (e) {
          // fallback silencioso
        }
      }, 50);
    });
  } else {
    // sem âncora: rolar ao topo quando voltar para a main
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
  const relX = ((cx - (rect.left + rect.width / 2)) / rect.width) * 2;
  const relY = ((cy - (rect.top + rect.height / 2)) / rect.height) * 2;
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
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  padding-top: 76px; /* desloca o conteúdo abaixo da navbar fixa (navbar height 72px + pequena folga) */
  /* changed: usar cor sólida escura para remover a linha horizontal de dois tons */
  background: var(--bg);
  color: #f5f2eb;
  display: flex;
  flex-direction: column;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  padding: 2rem 0;
  height: 70vh;
}

.hero-left {
  text-align: left;
  position: relative; /* added so ::before can be positioned relative to this block */
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
  top: 100%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  border-radius: 50%;
  /* radial golden gradient, translucent toward the edges */
  background: radial-gradient(
    circle at 30% 30%,
    rgba(212,175,55,0.95) 0%,
    rgba(212,175,55,0.72) 20%,
    rgba(212,175,55,0.30) 42%,
    rgba(212,175,55,0.08) 65%,
    rgba(0,0,0,0) 80%
  );
  filter: blur(150px);
  opacity: 0.25;
  z-index: 0;
  pointer-events: none;
  /* mix-blend-mode dá um brilho mais elegante sobre o fundo escuro */
  mix-blend-mode: screen;
}

/* moving golden blurred circle behind hero-right image */
.hero-right::before {
  content: "";
  position: absolute;
  /* start near center-right of the image area */
  left: 62%;
  top: 42%;
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
  filter: blur(120px);
  opacity: 0.5;
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  /* animate position to create subtle circular motion */
  animation: floatCircle 10s linear infinite;
}

/* keyframes approximate a circular orbit by changing top/left */
@keyframes floatCircle {
  0%   { left: 62%; top: 42%; }
  12.5%{ left: 70%; top: 50%; }
  25%  { left: 62%; top: 58%; }
  37.5%{ left: 54%; top: 50%; }
  50%  { left: 62%; top: 42%; }
  62.5%{ left: 70%; top: 50%; }
  75%  { left: 62%; top: 58%; }
  87.5%{ left: 54%; top: 50%; }
  100% { left: 62%; top: 42%; }
}

/* responsive: reduce size and blur on smaller viewports */
@media (max-width: 900px) {
  .hero-right::before {
    width: 420px;
    height: 420px;
    filter: blur(60px);
    left: 60%;
    top: 38%;
    animation-duration: 12s;
  }
}
@media (max-width: 640px) {
  .hero-right::before {
    width: 320px;
    height: 320px;
    filter: blur(42px);
    left: 54%;
    top: 44%;
    animation-duration: 14s;
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
  background: linear-gradient(225deg, var(--gold-1), var(--gold-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  /* keep slight separation if needed */
  line-height: 1.05;
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
  /* added: allow transform/scale to work on the anchor */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 120ms ease;
  will-change: transform, box-shadow;
}
.primary:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 34px rgba(212,175,55,0.12);
  opacity: 0.98;
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
  color: rgba(212,175,55);
}


.hero-right {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* added: allow absolute pseudo-element behind the image */
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
  background: linear-gradient(225deg, #0880d5 0%, #0b63a2 100%);
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
  background: linear-gradient(225deg, #0880d5 0%, #0b63a2 100%);
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
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* melhorar leitura em tablets / mobiles */
@media (max-width: 420px) {
  .mascots { border-radius: 14px; border-width: 1px; }
  .hero-left h1 { font-size: 1.4rem; }
  .subtitle { margin-bottom: 1.4rem; font-size: 0.95rem; }
}
</style>
