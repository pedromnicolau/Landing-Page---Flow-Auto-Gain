<template>
  <header class="topbar">
    <div class="topbar-inner">
      <!-- make brand clickable and keyboard accessible -->
      <div
        class="brand"
        @click="goHome"
        @keyup.enter="goHome"
        role="button"
        tabindex="0"
        aria-label="Ir para a página inicial"
      >
        <div>
          <h2>Flow <span class="gold-text">Auto Gain</span></h2>
          <!-- <img
            src="/candles.png"
            alt="Candles"
            title="Candles"
          > -->
        </div>
      </div>

      <!-- Desktop nav -->
      <nav class="navlinks" aria-hidden="false">
        <!-- Pacotes (link + caret dropdown) -->
        <div class="nav-item">
          <a href="#pacotes" @click.prevent="navigate('#pacotes')">Pacotes</a>
          <button class="caret" @click.stop="toggleCategory('pacotes')" :aria-expanded="categoryDropdowns.pacotes" aria-haspopup="true" aria-label="Abrir lista de pacotes">▾</button>

          <ul v-if="categoryDropdowns.pacotes" class="cat-dropdown" role="menu" @click.stop>
            <li v-for="p in pacotesList" :key="p.id">
              <button type="button" @click="scrollToProduct(p.id)" role="menuitem">{{ p.name }}</button>
            </li>
          </ul>
        </div>

        <!-- Robôs (link + caret dropdown) -->
        <div class="nav-item">
          <a href="#robos" @click.prevent="navigate('#robos')">Robôs</a>
          <button class="caret" @click.stop="toggleCategory('robos')" :aria-expanded="categoryDropdowns.robos" aria-haspopup="true" aria-label="Abrir lista de robôs">▾</button>

          <ul v-if="categoryDropdowns.robos" class="cat-dropdown" role="menu" @click.stop>
            <li v-for="p in robosList" :key="p.id">
              <button type="button" @click="scrollToProduct(p.id)" role="menuitem">{{ p.name }}</button>
            </li>
          </ul>
        </div>

        <!-- Indicadores (link + caret dropdown) -->
        <div class="nav-item">
          <a href="#indicadores" @click.prevent="navigate('#indicadores')">Indicadores</a>
          <button class="caret" @click.stop="toggleCategory('indicadores')" :aria-expanded="categoryDropdowns.indicadores" aria-haspopup="true" aria-label="Abrir lista de indicadores">▾</button>

          <ul v-if="categoryDropdowns.indicadores" class="cat-dropdown" role="menu" @click.stop>
            <li v-for="p in indicadoresList" :key="p.id">
              <button type="button" @click="scrollToProduct(p.id)" role="menuitem">{{ p.name }}</button>
            </li>
          </ul>
        </div>

        <!-- NEW: Telegram dropdown -->
        <div
          class="telegram-menu"
          @keyup.enter="toggleTelegram"
        >
          <button
            class="menu-button"
            @click="toggleTelegram"
            :aria-expanded="telegramOpen"
            aria-haspopup="true"
            aria-controls="telegram-dropdown"
            aria-label="Abrir menu Telegram"
            type="button"
          >
            Telegram <span class="chev" aria-hidden="true">▾</span>
          </button>

          <ul
            id="telegram-dropdown"
            class="dropdown"
            v-if="telegramOpen"
            role="menu"
            @click.stop
          >
            <li role="none">
              <a
                role="menuitem"
                href="https://t.me/+1h9O__7JFzZjM2Fh"
                target="_blank"
                rel="noopener noreferrer"
              >Grupo Automações</a>
            </li>
            <li role="none">
              <a
                role="menuitem"
                href="https://t.me/cleitinhotrader?text=Quero%20saber%20mais%20sobre%20o%20copy%20trade."
                target="_blank"
                rel="noopener noreferrer"
              >Copy Trade</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Hamburger (mobile) -->
      <button
        class="hamburger"
        @click="toggleMobile"
        :aria-expanded="mobileOpen.toString()"
        aria-controls="mobile-menu"
        aria-label="Abrir menu"
      >
        <svg v-if="!mobileOpen" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="currentColor" d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="currentColor" d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.17 13.4 3.88 19.7 2.47 18.29 8.76 12 2.47 5.71 3.88 4.29 10.17 10.6 16.46 4.29z"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu panel -->
    <div
      id="mobile-menu"
      class="mobile-menu"
      v-if="mobileOpen"
      role="menu"
      @click.self="toggleMobile"
    >
      <nav class="mobile-navlinks">
        <!-- Robôs: link + caret -->
        <div class="mobile-nav-item">
          <a href="#robos" role="menuitem" @click.prevent="navigate('#robos')">Robôs</a>
          <button class="mobile-caret" @click.stop="toggleCategory('robos')" :aria-expanded="categoryDropdowns.robos" aria-label="Abrir lista de robôs">▾</button>
        </div>
        <div v-if="categoryDropdowns.robos" class="mobile-submenu">
          <button v-for="p in robosList" :key="p.id" @click="scrollToProduct(p.id)">{{ p.name }}</button>
        </div>

        <!-- Indicadores: link + caret -->
        <div class="mobile-nav-item">
          <a href="#indicadores" role="menuitem" @click.prevent="navigate('#indicadores')">Indicadores</a>
          <button class="mobile-caret" @click.stop="toggleCategory('indicadores')" :aria-expanded="categoryDropdowns.indicadores" aria-label="Abrir lista de indicadores">▾</button>
        </div>
        <div v-if="categoryDropdowns.indicadores" class="mobile-submenu">
          <button v-for="p in indicadoresList" :key="p.id" @click="scrollToProduct(p.id)">{{ p.name }}</button>
        </div>

        <!-- Pacotes: link + caret -->
        <div class="mobile-nav-item">
          <a href="#pacotes" role="menuitem" @click.prevent="navigate('#pacotes')">Pacotes</a>
          <button class="mobile-caret" @click.stop="toggleCategory('pacotes')" :aria-expanded="categoryDropdowns.pacotes" aria-label="Abrir lista de pacotes">▾</button>
        </div>
        <div v-if="categoryDropdowns.pacotes" class="mobile-submenu">
          <button v-for="p in pacotesList" :key="p.id" @click="scrollToProduct(p.id)">{{ p.name }}</button>
        </div>

        <!-- NEW: Telegram items for mobile (kept as simple links) -->
        <a
          href="https://t.me/+1h9O__7JFzZjM2Fh"
          class="tg-mobile"
          role="menuitem"
          target="_blank"
          rel="noopener noreferrer"
        >Grupo Automações</a>
        <a
          href="https://t.me/cleitinhotrader?text=Quero%20saber%20mais%20sobre%20o%20copy%20trade."
          class="tg-mobile"
          role="menuitem"
          target="_blank"
          rel="noopener noreferrer"
        >Copy Trade</a>
      </nav>
    </div>
  </header>
</template>

<script>
  import { PRODUCTS } from '../data/products.js';

  export default {
    name: 'HeaderNav',
    data() {
      return {
        mobileOpen: false,
        telegramOpen: false,
        categoryDropdowns: {
          pacotes: false,
          robos: false,
          indicadores: false
        }
      };
  },
  
  mounted() {
    // storage for highlight timeouts
    this._highlightTimeouts = {};

    // handlers para fechar dropdown Telegram / categorias ao clicar fora / Esc
    this._onDocClick = (e) => {
      try {
        if (this.telegramOpen && !this.$el.contains(e.target)) this.closeTelegram();

        const anyOpen = Object.values(this.categoryDropdowns).some(Boolean);
        if (anyOpen && !this.$el.contains(e.target)) this.closeCategoryDropdowns();
      } catch (err) { /* silent */ }
    };

    this._onDocKeydown = (e) => {
      if (this.telegramOpen && (e.key === 'Escape' || e.key === 'Esc')) this.closeTelegram();
      if (Object.values(this.categoryDropdowns).some(Boolean) && (e.key === 'Escape' || e.key === 'Esc')) this.closeCategoryDropdowns();
    };

    // garantir registro único
    document.addEventListener('click', this._onDocClick, true);
    document.addEventListener('keydown', this._onDocKeydown, true);
  },

  beforeDestroy() { // Vue 2
    this._removeListeners();
  },
  beforeUnmount() { // Vue 3
    this._removeListeners();
  },

  computed: {
    pacotesList() {
      return PRODUCTS.filter(p => p.category === 'Pacote');
    },
    robosList() {
      return PRODUCTS.filter(p => p.category === 'Robô');
    },
    indicadoresList() {
      return PRODUCTS.filter(p => p.category === 'Indicador');
    }
  },

  methods: {
    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
    },

    toggleTelegram() {
      this.telegramOpen = !this.telegramOpen;
    },

    closeTelegram() {
      this.telegramOpen = false;
    },

    toggleCategory(key) {
      // close others
      Object.keys(this.categoryDropdowns).forEach(k => {
        if (k !== key) this.categoryDropdowns[k] = false;
      });
      this.categoryDropdowns[key] = !this.categoryDropdowns[key];

      // close telegram if opening a category
      if (this.categoryDropdowns[key]) this.telegramOpen = false;
    },

    closeCategoryDropdowns() {
      this.categoryDropdowns = { pacotes: false, robos: false, indicadores: false };
    },

    scrollToProduct(productId) {
      const id = 'product-' + productId;
      const target = document.getElementById(id);
      const header = document.querySelector('.topbar');
      const headerOffset = header ? header.offsetHeight : 72;

      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
        window.scrollTo({ top, behavior: 'smooth' });

        // highlight pulse: add class and remove after ~3s
        try {
          // clear any existing timeout for this product
          if (this._highlightTimeouts && this._highlightTimeouts[productId]) {
            clearTimeout(this._highlightTimeouts[productId]);
            delete this._highlightTimeouts[productId];
          }

          // ensure class toggled
          target.classList.add('highlight');

          // remove after 3s
          this._highlightTimeouts[productId] = setTimeout(() => {
            try { target.classList.remove('highlight'); } catch (e) { /* silent */ }
            delete this._highlightTimeouts[productId];
          }, 3000);
        } catch (err) {
          // silent fallback
        }
      }

      // close open dropdowns and mobile menu
      this.closeCategoryDropdowns();
      if (this.mobileOpen) this.toggleMobile();
    },

    navigate(hash) {
      const id = String(hash).replace(/^#/, '');
      const target = document.getElementById(id);
      const header = document.querySelector('.topbar');
      const headerOffset = header ? header.offsetHeight : 72;

      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        try {
          // atualizar o hash (dispara hashchange) para que App.vue possa trocar a rota e rolar ao destino
          window.location.hash = '#' + id;
        } catch (e) {}
      }

      if (this.mobileOpen) this.toggleMobile();
    },

    goHome() {
      try {
        window.location.hash = '';
      } catch (e) {}
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
      if (this.mobileOpen) this.toggleMobile();
    },

    _removeListeners() {
      // remover listeners do documento para dropdown Telegram
      if (this._onDocClick) document.removeEventListener('click', this._onDocClick, true);
      if (this._onDocKeydown) document.removeEventListener('keydown', this._onDocKeydown, true);

      // clear any pending highlight timeouts
      if (this._highlightTimeouts) {
        Object.values(this._highlightTimeouts).forEach((t) => clearTimeout(t));
        this._highlightTimeouts = {};
      }
    }
  }
};
</script>

<style scoped>
.topbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 72px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: var(--bg);
  color: #f5f2eb;
  border-bottom: 1px solid rgba(212,175,55,0.5);
  box-shadow: 0 6px 24px rgba(0,0,0,0.6);
  z-index: 9999;
}

.topbar-inner {
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand { 
  display:flex; 
  align-items:center; 
  gap:0.8rem; 
  height:72px; 
  cursor: pointer; 
  /* adicionar perspectiva para filhos 3D */
  perspective: 800px;
}
.brand img {
  width: 62px;
  height: 62px;
  object-fit: contain;
  display: block;
  transition: transform 180ms ease, opacity 140ms ease;
  /* melhorar render 3D */
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
}

/* slight visual feedback when it's the bull */
.brand img.bull {
  transform: scale(1.04);
  opacity: 0.98;
}

/* optional: slightly reduce on very small screens */
@media (max-width: 420px) {
  .brand img { width: 42px; height: 42px; }
}

.navlinks a { 
  margin-left:1rem; 
  color:rgba(245,242,235,0.9); 
  text-decoration:none; 
  padding:0.35rem 0.5rem; 
  border-radius:8px; 
  transition: background 180ms ease, color 160ms ease; 
}
.navlinks a:hover { 
  background: rgba(212,175,55,0.04); 
  color: var(--gold-1); 
}
.navlinks a.cta { 
  background: linear-gradient(180deg,var(--gold-1),var(--gold-2)); 
  color:#0b0b0b; 
  padding:0.45rem 0.9rem; 
  border-radius:8px; 
  font-weight:700; 
}

/* Telegram menu styles */
.telegram-menu {
  position: relative;
  display: inline-block;
  margin-left: 0.6rem;
}
.menu-button {
  background: linear-gradient(180deg,var(--gold-1),var(--gold-2));
  color:#0b0b0b; font-weight:700;
  border: none;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.chev {
  font-size: 0.85rem;
  opacity: 0.9;
  line-height: 1;
}

/* dropdown panel */
.dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 200px;
  background: linear-gradient(180deg, #0b0b0b, #121212);
  border: 1px solid rgba(212,175,55,0.06);
  box-shadow: 0 12px 36px rgba(0,0,0,0.6);
  border-radius: 10px;
  padding: 8px;
  list-style: none;
  margin: 0;
  z-index: 10000;
}
.dropdown li {
  margin: 0;
}
.dropdown a {
  display: block;
  padding: 8px 10px;
  color: rgba(245,242,235,0.96);
  text-decoration: none;
  border-radius: 8px;
}
.dropdown a:hover {
  background: rgba(212,175,55,0.04);
  color: var(--gold-1);
}

/* nav item wrapper to position dropdown */
.nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;           /* caret mais próximo do link */
  margin-right: 18px; /* mais espaço entre menus */
}

/* caret button next to menu link */
.caret {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0 4px;    /* menos padding para ficar mais colado ao link */
  font-size: 0.9rem;
  line-height: 1;
  border-radius: 6px;
}
.caret:hover { background: rgba(255,255,255,0.02); }

/* category dropdown similar to telegram dropdown but aligned under the nav item */
.cat-dropdown {
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  min-width: 200px;
  background: linear-gradient(180deg, #0b0b0b, #121212);
  border: 1px solid rgba(212,175,55,0.06);
  box-shadow: 0 12px 36px rgba(0,0,0,0.6);
  border-radius: 10px;
  padding: 6px;
  list-style: none;
  margin: 0;
  z-index: 10000;
}
.cat-dropdown li { margin: 0; }
.cat-dropdown button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  color: rgba(245,242,235,0.96);
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}
.cat-dropdown button:hover {
  background: rgba(212,175,55,0.04);
  color: var(--gold-1);
}

/* Mobile menu */
.hamburger {
  display: none;
  background: transparent;
  border: none;
  color: inherit;
  padding: 8px;
  margin-left: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 160ms ease;
}
.hamburger:hover { background: rgba(255,255,255,0.03); }

.mobile-menu {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(9,9,9,0.98), var(--bg));
  border-bottom: 1px solid rgba(212,175,55,0.06);
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  z-index: 9998;
  padding: 12px 10px 18px;
  box-sizing: border-box;
}

.mobile-navlinks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mobile-navlinks a {
  color: rgba(245,242,235,0.95);
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
}

/* mobile submenu styles */
.mobile-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}
.mobile-caret {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1rem;
  padding: 6px;
  border-radius: 6px;
}
.mobile-caret:hover { background: rgba(255,255,255,0.02); }
.mobile-submenu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 0 10px 12px;
}
.mobile-submenu button {
  background: transparent;
  border: none;
  color: rgba(245,242,235,0.95);
  text-align: left;
  padding: 8px 4px;
  border-radius: 6px;
}
.mobile-submenu button:hover {
  background: rgba(212,175,55,0.04);
  color: var(--gold-1);
}

/* reduzir padding e tornar layout adaptável */
@media (max-width: 900px) {
  .navlinks { display: none; } /* esconder links desktop */
  .hamburger { display: inline-flex; } /* mostrar botão mobile */
  .topbar-inner { padding: 0 0.9rem; }
  .brand img { width: 52px; height: 52px; }
}

/* mobile breakpoint: ajustar dropdown transform/position if needed */
@media (max-width: 480px) {
  .menu-button { padding: 0.28rem 0.45rem; font-size: 0.92rem; }
  .dropdown { min-width: 170px; right: 6px; }
}

/* garantir que dropdown não cause overflow em small screens */
@media (max-width: 768px) {
  .telegram-menu .dropdown { right: 6px; left: auto; }
}
@media (max-width: 400px) {
  .title .logo { font-size: 0.95rem; }
  .title .subtitle { font-size: 0.75rem; }
}

.gold-text {
  background: linear-gradient(225deg, var(--gold-1), var(--gold-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  /* keep slight separation if needed */
  line-height: 1.05;
}
</style>