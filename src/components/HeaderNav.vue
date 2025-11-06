<template>
  <header class="topbar">
    <div class="topbar-inner">
      <a href="#hero" @click.prevent="navigate('#hero')"><h2>Flow <span class="gold-text">Auto Gain</span></h2></a>


      <!-- Desktop nav -->
      <nav class="navlinks" aria-hidden="false">
        <!-- Pacotes -->
        <div class="nav-item">
          <a href="#pacotes" @click.prevent="navigate('#pacotes')">Pacotes</a>
          <button
            class="caret"
            @click.stop="toggleCategory('pacotes')"
            :aria-expanded="categoryDropdowns.pacotes"
            aria-haspopup="true"
            aria-label="Abrir lista de pacotes"
          >
            ▾
          </button>

          <ul
            v-if="categoryDropdowns.pacotes"
            class="cat-dropdown"
            role="menu"
            @click.stop
          >
            <li v-for="p in pacotesList" :key="p.id">
              <button type="button" @click="scrollToProduct(p.id)" role="menuitem">
                {{ p.name }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Robôs -->
        <div class="nav-item">
          <a href="#robos" @click.prevent="navigate('#robos')">Robôs</a>
          <button
            class="caret"
            @click.stop="toggleCategory('robos')"
            :aria-expanded="categoryDropdowns.robos"
            aria-haspopup="true"
            aria-label="Abrir lista de robôs"
          >
            ▾
          </button>

          <ul
            v-if="categoryDropdowns.robos"
            class="cat-dropdown"
            role="menu"
            @click.stop
          >
            <li
              class="line-item"
              v-for="line in roboLines"
              :key="line.key"
              role="none"
            >
              <div class="line-row">
                <button
                  class="line-link"
                  type="button"
                  @click="navigate('#' + line.anchor)"
                  role="menuitem"
                >
                  {{ line.label }}
                </button>
                <button
                  class="line-caret"
                  type="button"
                  @click.stop="toggleRoboLine(line.key)"
                  :aria-expanded="roboLineDropdowns[line.key]"
                  :aria-controls="'line-' + line.key + '-menu'"
                  aria-haspopup="true"
                  :aria-label="'Abrir lista ' + line.label"
                >
                  ▸
                </button>
              </div>
              <ul
                v-if="roboLineDropdowns[line.key]"
                :id="'line-' + line.key + '-menu'"
                class="line-submenu"
                role="menu"
                @click.stop
              >
                <li v-for="r in line.items" :key="r.id" role="none">
                  <button type="button" role="menuitem" @click="scrollToProduct(r.id)">
                    {{ r.name }}
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Indicadores -->
        <div class="nav-item">
          <a href="#indicadores" @click.prevent="navigate('#indicadores')">Indicadores</a>
          <button
            class="caret"
            @click.stop="toggleCategory('indicadores')"
            :aria-expanded="categoryDropdowns.indicadores"
            aria-haspopup="true"
            aria-label="Abrir lista de indicadores"
          >
            ▾
          </button>

          <ul
            v-if="categoryDropdowns.indicadores"
            class="cat-dropdown"
            role="menu"
            @click.stop
          >
            <li v-for="p in indicadoresList" :key="p.id">
              <button type="button" @click="scrollToProduct(p.id)" role="menuitem">
                {{ p.name }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Telegram -->
        <div class="telegram-menu" @keyup.enter="toggleTelegram">
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
              >
                Grupo Automações
              </a>
            </li>
            <li role="none">
              <a
                role="menuitem"
                href="https://t.me/cleitinhotrader?text=Quero%20saber%20mais%20sobre%20o%20copy%20trade."
                target="_blank"
                rel="noopener noreferrer"
              >
                Copy Trade
              </a>
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
        <svg
          v-if="!mobileOpen"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.17 13.4 3.88 19.7 2.47 18.29 8.76 12 2.47 5.71 3.88 4.29 10.17 10.6 16.46 4.29z"
          />
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
        <!-- Mobile: botão que abre a categoria "Robôs" -->
        <div class="mobile-nav-item">
          <button
            class="mobile-line-button"
            type="button"
            @click.stop="toggleCategory('robos')"
            :aria-expanded="categoryDropdowns.robos"
            aria-controls="mobile-robos-menu"
            aria-haspopup="true"
          >Robôs</button>
          <button
            class="mobile-caret"
            type="button"
            @click.stop="toggleCategory('robos')"
            :aria-expanded="categoryDropdowns.robos"
            aria-label="Abrir lista de robôs"
          >▾</button>
        </div>

        <!-- mostrar linhas apenas quando a categoria 'robos' estiver aberta -->
        <div v-if="categoryDropdowns.robos" id="mobile-robos-menu" class="mobile-lines">
          <div v-for="line in roboLines" :key="line.key" class="mobile-line-block">
            <div class="mobile-nav-item">
              <!-- tornar o nome da linha um botão (acessível) que navega para a âncora -->
              <button
                class="mobile-line-button"
                type="button"
                @click="navigate('#' + line.anchor)"
                role="menuitem"
              >{{ line.label }}</button>

              <!-- caret pequeno controlando o submenu (aria attrs) -->
              <button
                class="mobile-caret"
                type="button"
                @click.stop="toggleMobileRoboLine(line.key)"
                :aria-expanded="mobileRoboLines[line.key]"
                :aria-controls="'mobile-line-' + line.key + '-menu'"
                :aria-label="'Abrir lista ' + line.label"
              >
                ▾
              </button>
            </div>

            <!-- usar a mesma aparência do desktop para o submenu (ul/li) -->
            <ul
              v-if="mobileRoboLines[line.key]"
              :id="'mobile-line-' + line.key + '-menu'"
              class="line-submenu mobile-submenu"
              role="menu"
              @click.stop
            >
              <li v-for="r in line.items" :key="r.id" role="none">
                <button type="button" role="menuitem" @click="scrollToProduct(r.id)">{{ r.name }}</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Indicadores -->
        <div class="mobile-nav-item">
          <a href="#indicadores" role="menuitem" @click.prevent="navigate('#indicadores')">Indicadores</a>
          <button
            class="mobile-caret"
            @click.stop="toggleCategory('indicadores')"
            :aria-expanded="categoryDropdowns.indicadores"
            aria-label="Abrir lista de indicadores"
          >
            ▾
          </button>
        </div>
        <div v-if="categoryDropdowns.indicadores" class="mobile-submenu">
          <button
            v-for="p in indicadoresList"
            :key="p.id"
            @click="scrollToProduct(p.id)"
          >
            {{ p.name }}
          </button>
        </div>

        <!-- Pacotes -->
        <div class="mobile-nav-item">
          <a href="#pacotes" role="menuitem" @click.prevent="navigate('#pacotes')">Pacotes</a>
          <button
            class="mobile-caret"
            @click.stop="toggleCategory('pacotes')"
            :aria-expanded="categoryDropdowns.pacotes"
            aria-label="Abrir lista de pacotes"
          >
            ▾
          </button>
        </div>
        <div v-if="categoryDropdowns.pacotes" class="mobile-submenu">
          <button
            v-for="p in pacotesList"
            :key="p.id"
            @click="scrollToProduct(p.id)"
          >
            {{ p.name }}
          </button>
        </div>

        <!-- Telegram (mobile submenu) -->
        <div class="mobile-nav-item">
          <button
            class="mobile-line-button"
            type="button"
            @click.stop="toggleTelegram"
            :aria-expanded="telegramOpen"
            aria-controls="mobile-telegram-menu"
            aria-haspopup="true"
          >
            Telegram
          </button>
          <button
            class="mobile-caret"
            type="button"
            @click.stop="toggleTelegram"
            :aria-expanded="telegramOpen"
            aria-label="Abrir menu Telegram"
          >
            ▾
          </button>
        </div>

        <div v-if="telegramOpen" id="mobile-telegram-menu" class="mobile-submenu" role="menu" @click.stop>
          <a
            class="tg-mobile"
            role="menuitem"
            href="https://t.me/+1h9O__7JFzZjM2Fh"
            target="_blank"
            rel="noopener noreferrer"
          >Grupo Automações</a>
          <a
            class="tg-mobile"
            role="menuitem"
            href="https://t.me/cleitinhotrader?text=Quero%20saber%20mais%20sobre%20o%20copy%20trade."
            target="_blank"
            rel="noopener noreferrer"
          >Copy Trade</a>
        </div>
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
      },
      roboLineDropdowns: {
        gamma: false,
        delta: false,
        alpha: false,
        altaFreq: false
      },
      mobileRoboLines: {
        gamma: false,
        delta: false,
        alpha: false,
        altaFreq: false
      }
    };
  },
  mounted() {
    this._highlightTimeouts = {};

    this._onDocClick = (e) => {
      if (this.telegramOpen && !this.$el.contains(e.target)) this.closeTelegram();
      if (Object.values(this.categoryDropdowns).some(Boolean) && !this.$el.contains(e.target)) this.closeCategoryDropdowns();
      if (Object.values(this.roboLineDropdowns).some(Boolean) && !this.$el.contains(e.target)) this.closeRoboLineDropdowns();
    };

    this._onDocKeydown = (e) => {
      if (e.key === 'Escape') {
        this.closeTelegram();
        this.closeCategoryDropdowns();
        this.closeRoboLineDropdowns();
      }
    };

    document.addEventListener('click', this._onDocClick, true);
    document.addEventListener('keydown', this._onDocKeydown, true);
  },
  beforeUnmount() {
    this._removeListeners();
  },
  computed: {
    pacotesList() {
      return PRODUCTS.filter((p) => p.category === 'Pacote');
    },
    robosList() {
      return PRODUCTS.filter((p) => p.category === 'Robô');
    },
    indicadoresList() {
      return PRODUCTS.filter((p) => p.category === 'Indicador');
    },
    roboLines() {
      const all = this.robosList || [];
      return [
        { key: 'gamma', label: 'Linha Gamma', anchor: 'linha-gamma', items: all.filter((p) => p.name.startsWith('Gamma')) },
        { key: 'delta', label: 'Linha Delta', anchor: 'linha-delta', items: all.filter((p) => p.name.startsWith('Delta')) },
        { key: 'altaFreq', label: 'Linha de Alta frequência', anchor: 'linha-alta-frequencia', items: all.filter((p) => p.line === 'Linha de alta frequência' || p.name === 'Vector' || p.name === 'Ômega') },
        { key: 'alpha', label: 'Linha Alpha (Dólar)', anchor: 'linha-alpha', items: all.filter((p) => p.name.startsWith('Alpha')) }
      ];
    }
  },
  methods: {
    // helper: estamos em uma rota? (hash começa com "#/")
    _isRoutePage() {
      try { return String(window.location.hash || '').startsWith('#/'); } catch (e) { return false; }
    },

    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
    },
    toggleTelegram() {
      this.telegramOpen = !this.telegramOpen;
    },
    closeTelegram() {
      this.telegramOpen = false;
    },
    toggleRoboLine(key) {
      Object.keys(this.roboLineDropdowns).forEach((k) => {
        if (k !== key) this.roboLineDropdowns[k] = false;
      });
      this.roboLineDropdowns[key] = !this.roboLineDropdowns[key];
      if (this.roboLineDropdowns[key]) this.categoryDropdowns.robos = true;
    },
    toggleMobileRoboLine(key) {
      this.mobileRoboLines[key] = !this.mobileRoboLines[key];
    },
    closeRoboLineDropdowns() {
      this.roboLineDropdowns = { gamma: false, delta: false, alpha: false, altaFreq: false };
      this.mobileRoboLines = { gamma: false, delta: false, alpha: false, altaFreq: false };
    },
    toggleCategory(key) {
      Object.keys(this.categoryDropdowns).forEach((k) => {
        if (k !== key) this.categoryDropdowns[k] = false;
      });
      this.categoryDropdowns[key] = !this.categoryDropdowns[key];
      if (this.categoryDropdowns[key]) this.telegramOpen = false;
      if (key !== 'robos') this.closeRoboLineDropdowns();
      if (!this.categoryDropdowns.robos) this.closeRoboLineDropdowns();
    },
    closeCategoryDropdowns() {
      this.categoryDropdowns = { pacotes: false, robos: false, indicadores: false };
      this.closeRoboLineDropdowns();
    },
    // scrollToProduct: agora faz "dois passos" quando vier de rota
    scrollToProduct(productId) {
      const id = 'product-' + productId;
      const onRoute = this._isRoutePage();
      const target = typeof document !== 'undefined' ? document.getElementById(id) : null;

      if (target) {
        // já na main: rolar suave
        try { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
        try { window.dispatchEvent(new CustomEvent('nav:anchor', { detail: { id } })); } catch (e) {}
        if (this.$emit) this.$emit('nav-anchor', id);
      } else if (onRoute) {
        // vindo de página de rota: 1) voltar pra main, 2) ir para âncora
        try {
          window.location.hash = '';
          try { window.dispatchEvent(new Event('nav:home')); } catch (e) {}
          if (this.$emit) this.$emit('nav-home');
        } catch (e) {}
        setTimeout(() => {
          try {
            window.location.hash = '#' + id;
            try { window.dispatchEvent(new CustomEvent('nav:anchor', { detail: { id } })); } catch (e) {}
            if (this.$emit) this.$emit('nav-anchor', id);
          } catch (e) {}
        }, 0);
      } else {
        // main já ativa, elemento ainda não no DOM (raro): atualizar hash
        try {
          window.location.hash = '#' + id;
          try { window.dispatchEvent(new CustomEvent('nav:anchor', { detail: { id } })); } catch (e) {}
          if (this.$emit) this.$emit('nav-anchor', id);
        } catch (e) {}
      }

      // fecha menus e painel mobile
      this.closeCategoryDropdowns();
      if (this.mobileOpen) this.toggleMobile();

      // destaque oportunista se já existir
      try {
        const el = document.getElementById(id);
        if (el) {
          if (!this._highlightTimeouts) this._highlightTimeouts = {};
          const key = id;
          if (this._highlightTimeouts[key]) clearTimeout(this._highlightTimeouts[key]);
          el.classList.add('highlight');
          this._highlightTimeouts[key] = setTimeout(() => el.classList.remove('highlight'), 3000);
        }
      } catch (err) {}
    },

    // navigate: dois passos quando viemos de rota (ex: #/terms -> #hero)
    navigate(hash) {
      const id = String(hash).replace(/^#/, '');
      if (this.mobileOpen) this.toggleMobile();

      const onRoute = this._isRoutePage();
      const target = typeof document !== 'undefined' ? document.getElementById(id) : null;

      if (target) {
        try { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
        try { window.dispatchEvent(new CustomEvent('nav:anchor', { detail: { id } })); } catch (e) {}
        if (this.$emit) this.$emit('nav-anchor', id);
        return;
      }

      if (onRoute && id && !id.startsWith('/')) {
        // 1) limpar hash para voltar à main; 2) aplicar âncora
        try {
          window.location.hash = '';
          try { window.dispatchEvent(new Event('nav:home')); } catch (e) {}
          if (this.$emit) this.$emit('nav-home');
        } catch (e) {}
        setTimeout(() => {
          try {
            window.location.hash = '#' + id;
            try { window.dispatchEvent(new CustomEvent('nav:anchor', { detail: { id } })); } catch (e) {}
            if (this.$emit) this.$emit('nav-anchor', id);
          } catch (e) {}
        }, 0);
      } else {
        // fallback padrão
        try {
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.location.hash = '#' + id;
          }
          if (id && id.startsWith('/')) {
            try { window.dispatchEvent(new Event('nav:home')); } catch (e) {}
            if (this.$emit) this.$emit('nav-home');
          } else {
            try { window.dispatchEvent(new CustomEvent('nav:anchor', { detail: { id } })); } catch (e) {}
            if (this.$emit) this.$emit('nav-anchor', id);
          }
        } catch (e) {}
      }
    },

    beforeUnmount() {
      if (this._onDocClick) document.removeEventListener('click', this._onDocClick, false);
      if (this._onDocKeydown) document.removeEventListener('keydown', this._onDocKeydown, true);
      if (this._highlightTimeouts) Object.values(this._highlightTimeouts).forEach(clearTimeout);
    },

    goHome() {
      try {
        window.location.hash = '';
        try { window.dispatchEvent(new Event('nav:home')); } catch (e) {}
        if (this.$emit) this.$emit('nav-home');
      } catch (e) {}
      // assegurar topo
      try { window.scrollTo(0, 0); } catch (e) {}
      if (this.mobileOpen) this.toggleMobile();
    },
    _removeListeners() {
      document.removeEventListener('click', this._onDocClick, true);
      document.removeEventListener('keydown', this._onDocKeydown, true);
      Object.values(this._highlightTimeouts).forEach((t) => clearTimeout(t));
      this._highlightTimeouts = {};
    },
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

a {
  text-decoration: none;
  color: white;
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
  /* aumentar para comportar labels como "Linha Alpha (Dólar)" sem truncar */
  min-width: 260px;
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

/* new: styles for nested line submenu in desktop dropdown */
.cat-dropdown .line-item { 
  padding: 2px 4px;
  margin: 0;
}

/* garantir que o container empurre o caret para a direita */
.cat-dropdown .line-row {
  display: flex;
  align-items: center;
  justify-content: space-between; /* texto à esquerda, caret à direita */
  gap: 8px;
  padding: 0;
  line-height: 1;
}

/* caret desktop: caixa fixa pequena apenas ao redor do ícone */
.cat-dropdown .line-row .line-caret {
  flex: 0 0 20px;       /* não cresce, não encolhe, tamanho fixo */
  width: 20px;
  height: 20px;
  padding: 0;           /* zero padding para não ampliar área */
  margin: 0;            /* sem margem que aumente a área clicável */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;   /* setinha visual menor */
  border-radius: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  transform-origin: center center;
  align-self: center;
}

/* pequeno gap entre o texto e a caixa da seta */
.cat-dropdown .line-row .line-link {
  margin-right: 8px;
}

/* foco acessível discreto (sem retângulo grande) */
.cat-dropdown .line-row .line-caret:focus { outline: none; }
.cat-dropdown .line-row .line-caret:focus-visible {
  box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
  border-radius: 6px;
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
  width: 28px;
  height: 28px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  border-radius: 6px;
  line-height: 1;
}
.mobile-submenu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* aumentar ligeiramente o recuo no mobile para refletir hierarquia */
  padding: 6px 0 10px 18px;
}

/* extra safety for marker pseudo-element */
.navlinks ul li::marker,
.mobile-menu ul li::marker,
.cat-dropdown li::marker,
.line-submenu li::marker,
.mobile-submenu li::marker {
  content: none !important;
  display: none !important;
}

/* ensure submenu items do not get a light background */
.cat-dropdown button,
.line-link,
.line-submenu button,
.mobile-line-button,
.mobile-navlinks a,
.mobile-submenu a,
.mobile-submenu button,
.dropdown a {
  background: transparent !important;
  color: inherit !important;
  border: none !important;
  box-shadow: none !important;
}

/* keep a subtle hover state but dark, not light-gray */
.cat-dropdown button:hover,
.line-link:hover,
.line-submenu button:hover,
.mobile-line-button:hover,
.mobile-navlinks a:hover,
.mobile-submenu a:hover,
.mobile-submenu button:hover,
.dropdown a:hover {
  background: rgba(255,255,255,0.02);
  color: var(--gold-1);
}

/* ensure mobile submenu anchors match other menu items spacing */
.mobile-submenu a,
.mobile-submenu button {
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  text-align: left;
  display: block;
}

/* tighten up any accidental light borders/backgrounds coming from user agent */
.mobile-menu,
.cat-dropdown,
.dropdown {
  background: linear-gradient(180deg, #0b0b0b, #121212);
}

/* reduzir padding e tornar layout adaptável */
@media (max-width: 900px) {
  .navlinks { display: none; } /* esconder links desktop */
  .hamburger { display: inline-flex; } /* mostrar botão mobile */
  /* alinhar .topbar-inner com o container (container usa width:80vw → laterais = 10vw) */
  .topbar-inner {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding-left: 10vw;
    padding-right: 10vw;
  }
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

.brand-title { cursor: pointer; user-select: none; }
</style>