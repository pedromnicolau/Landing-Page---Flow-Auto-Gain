<!-- src/App.vue -->
<template>
  <div id="app" class="app-root">
    <HeaderNav />

    <!-- route switch: main app vs pages -->
    <main v-if="route === '/' || route === ''">
      <section class="hero">
        <div class="hero-left">
          <h1>Robôs e Indicadores profissionais para a B3</h1>
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
          <div class="hero-visual">
            <!-- grafico estilizado -->
            <svg viewBox="0 0 200 120" class="chart">
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stop-color="#b8860b" />
                  <stop
                    offset="1"
                    stop-color="#f5f2eb"
                    stop-opacity="0.1"
                  />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="transparent" />
              <path
                d="M0 80 L20 60 L40 70 L60 40 L80 50 L100 30 L120 45 L140 25 L160 35 L180 20 L200 30"
                fill="none"
                stroke="#b8860b"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      <!-- Telegram CTAs: Grupo e Copy Trade -->
      <div class="telegram-cta" role="navigation" aria-label="Links para Telegram">
        
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

        <h3 class="line-title">Linha Gamma</h3>
        <div class="grid">
          <ProductCard
            v-for="p in gammaLine"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>

        <h3 class="line-title">Linha Delta</h3>
        <div class="grid">
          <ProductCard
            v-for="p in deltaLine"
            :key="p.id"
            :product="p"
            @select-offer="openOffer"
          />
        </div>

        <h3 class="line-title">Linha Alpha</h3>
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

      <div class="risk-notice">
        <strong>Aviso de Risco:</strong> Operar no mercado financeiro envolve
        riscos. Você pode perder parte ou todo o capital investido. Leia os Termos
        de Uso e a Política de Privacidade antes de comprar.
      </div>
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
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

const alphaLine = computed(() =>
  robots.value.filter((p) => p.name.startsWith("Alpha"))
);

// simple hash-based route ("/", "/terms", "/privacy")
const route = ref(window.location.hash.replace("#", "") || "/");
function onHashChange() {
  route.value = window.location.hash.replace("#", "") || "/";
}
onMounted(() => window.addEventListener("hashchange", onHashChange));
onBeforeUnmount(() => window.removeEventListener("hashchange", onHashChange));

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
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  padding-top: 76px; /* desloca o conteúdo abaixo da navbar fixa (navbar height 72px + pequena folga) */
  background: linear-gradient(180deg, #070707 0%, #0f0f0f 100%);
  color: #f5f2eb;
  display: flex;
  flex-direction: column;
}

/* HERO: keep two-column on large, switch to single-column on smaller screens, reduce gaps */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  padding: 2rem 0;
}

.hero-left {
  text-align: left;
}

.hero-left h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: #f8ecd8;
  letter-spacing: -0.6px;
  text-shadow: 0 6px 22px rgba(0,0,0,0.6);
}

.subtitle {
  color: rgba(245,242,235,0.72);
  margin: 0 0 4rem 0;
}

.hero-cta a {
  margin-right: 0.6rem;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
}

.primary {
  background: rgba(212,175,55);
  color: #ffffff;
  font-weight: 700;
}

.ghost {
  background: transparent;
  color: #f5f2eb;
  border: 1px solid rgba(212,175,55);
}


.hero-right .hero-visual {
  background: linear-gradient(180deg, #0b0b0b, #121212);
  border-radius: 12px;
  padding: 0.5rem; /* manter proporção com container reduzido */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px solid rgba(212,175,55,0.06);
  box-shadow: 0 18px 44px rgba(0,0,0,0.7);
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
}
.products-section h2 {
  color: #f8ecd8;
  margin-bottom: 1.5rem;
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

/* === CHANGE: força 3 colunas para a seção "Robôs" (desktop), but responsive down to 1 column === */
#robos .grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
@media (max-width: 1200px) {
  #robos .grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
}
@media (max-width: 700px) {
  #robos .grid { grid-template-columns: 1fr; gap: 1.25rem; }
}

/* Indicadores: 4 columns on wide, progressively reduce */
#indicadores .grid {
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
@media (max-width: 1400px) {
  #indicadores .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 1000px) {
  #indicadores .grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}
@media (max-width: 640px) {
  #indicadores .grid { grid-template-columns: 1fr; gap: 0.9rem; }
}

/* Pacotes: 3 colunas on desktop, reduce to 2/1 */
#pacotes .grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
@media (max-width: 1100px) {
  #pacotes .grid { grid-template-columns: repeat(2, 1fr); gap: 1.6rem; }
}
@media (max-width: 640px) {
  #pacotes .grid { grid-template-columns: 1fr; gap: 1rem; }
}

/* risk */
.risk-notice {
  margin-top: 1.2rem;
  background: rgba(184, 134, 11, 0.04);
  padding: 0.8rem;
  border-radius: 8px;
  color: rgba(245, 242, 235, 0.85);
  border: 1px solid rgba(184, 134, 11, 0.03);
  font-size: 0.95rem;
  text-align: center;
}

/* Telegram CTAs: Grupo e Copy Trade - ensure wrap on small screens */
.telegram-cta {
  width: 100%;
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin: 1.2rem 0;
  padding: 0 1rem;
  box-sizing: border-box;
  flex-wrap: wrap;
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
  white-space: nowrap;
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
  .telegram-cta { flex-direction: column; gap: 10px; padding: 0 0.6rem; }
  .tg-btn { width: 100%; justify-content: center; padding: 0.65rem; }
}

/* HERO responsive adjustments */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.4rem 0;
  }
  .hero-right {
    order: 2;
  }
  .hero-left h1 { font-size:1.8rem; }
  .hero-left .subtitle { margin-bottom: 2rem; }
  .hero-right .hero-visual { height: 180px; }
  .chart { max-width: 420px; }

  /* Mobile CTA: stack buttons and add vertical gap */
  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 0.75rem; /* margem entre os botões no mobile */
    align-items: stretch;
  }
  /* remove desktop right-margin on mobile and make buttons fill horizontally */
  .hero-cta a {
    margin-right: 0;
    width: 100%;
    justify-content: center;
  }
}

/* Tighten for very small screens */
@media (max-width: 420px) {
  .hero-left h1 { font-size: 1.4rem; line-height: 1.1; }
  .subtitle { font-size: 0.95rem; margin-bottom: 1.4rem; }
  .hero-right .hero-visual { height: 140px; padding: 0.4rem; }
  .app-root { padding-top: 72px; }
  .page-actions { flex-direction: column; gap: 8px; }
  .page-actions a { width: 100%; text-align: center; }
}

/* Add small utility for page wrappers used on Terms/Privacy */
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

/* Accessibility: ensure tap targets are large enough on touch devices */
.tg-btn, .primary, .ghost, .page-actions a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Small performance: reduce heavy shadows on small screens */
@media (max-width: 640px) {
  .hero-right .hero-visual, .page-content {
    box-shadow: 0 8px 18px rgba(0,0,0,0.5);
  }
}
</style>
