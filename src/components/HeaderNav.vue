<template>
  <header class="topbar">
    <div class="topbar-inner">
      <!-- make brand clickable and keyboard accessible -->
      <div
        class="brand"
        @click="toggleSymbol"
        @keyup.enter="toggleSymbol"
        role="button"
        tabindex="0"
        aria-label="Ir para a página inicial"
      >
        <div>
          <!-- adicionada ref para controlar via JS -->
          <img
            ref="symbolImg"
            :src="isBull ? '/bull.png' : '/bear.png'"
            :alt="isBull ? 'Touro' : 'Urso'"
            :title="isBull ? 'Touro' : 'Urso'"
            :class="{ bull: isBull }"
          >
        </div>
      </div>

      <!-- Desktop nav -->
      <nav class="navlinks" aria-hidden="false">
        <a href="#pacotes" @click.prevent="navigate('#pacotes')">Pacotes</a>
        <a href="#robos" @click.prevent="navigate('#robos')">Robôs</a>
        <a href="#indicadores" @click.prevent="navigate('#indicadores')">Indicadores</a>

        <!-- NEW: Telegram dropdown -->
        <div
          class="telegram-menu"
          @keyup.enter="toggleTelegram"
        >
          <button
            class="menu-button"
            @click="toggleTelegram"
            :aria-expanded="telegramOpen.toString()"
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
            v-show="telegramOpen"
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
      v-show="mobileOpen"
      role="menu"
      @click.self="toggleMobile"
    >
      <nav class="mobile-navlinks">
        <a href="#robos" role="menuitem" @click.prevent="navigate('#robos')">Robôs</a>
        <a href="#indicadores" role="menuitem" @click.prevent="navigate('#indicadores')">Indicadores</a>
        <a href="#pacotes" role="menuitem" @click.prevent="navigate('#pacotes')">Pacotes</a>

        <!-- NEW: Telegram items for mobile -->
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
export default {
  name: 'HeaderNav',
  data() {
    return {
      mobileOpen: false,
      isBull: false,
      telegramOpen: false
    };
  },

  // adiciona listeners ao montar e limpa ao desmontar (compatível com Vue2/3)
  mounted() {
    // armazenamento interno para evitar re-criação de closures
    this._symbol = {
      clientX: 0,
      clientY: 0,
      rafId: null,
      maxTilt: 15, // graus máximos
      running: false,
    };

    // handler com binding para permitir remoção
    this._onPointerMove = (e) => {
      // pointer event ou mouse event compatível
      const cx = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
      const cy = (e.clientY !== undefined) ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY) || 0;
      this._symbol.clientX = cx;
      this._symbol.clientY = cy;
      if (!this._symbol.running) this._startSymbolRaf();
    };

    // usar pointermove se disponível
    const target = window;
    target.addEventListener('pointermove', this._onPointerMove, { passive: true });
    // fallback
    target.addEventListener('mousemove', this._onPointerMove, { passive: true });

    // stop on touchend to avoid stuck state
    this._onPointerEnd = () => {
      // reset suave para identidade
      this._symbol.clientX = null;
      this._symbol.clientY = null;
      if (!this._symbol.running) this._startSymbolRaf();
    };
    target.addEventListener('pointerleave', this._onPointerEnd, { passive: true });
    target.addEventListener('touchend', this._onPointerEnd, { passive: true });

    // handlers para fechar dropdown Telegram ao clicar fora / Esc
    this._onDocClick = (e) => {
      try {
        if (this.telegramOpen && !this.$el.contains(e.target)) this.closeTelegram();
      } catch (err) { /* silent */ }
    };
    this._onDocKeydown = (e) => {
      if (!this.telegramOpen) return;
      if (e.key === 'Escape' || e.key === 'Esc') this.closeTelegram();
    };
    document.addEventListener('click', this._onDocClick, true);
    document.addEventListener('keydown', this._onDocKeydown, true);
  },

  beforeDestroy() { // Vue 2
    this._removeSymbolListeners();
  },
  beforeUnmount() { // Vue 3
    this._removeSymbolListeners();
  },

  methods: {
    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
      // bloquear scroll do body quando o menu móvel estiver aberto
      document.body.style.overflow = this.mobileOpen ? 'hidden' : '';
    },

    // updated: toggle between bear and bull and go to home
    toggleSymbol() {
      this.isBull = !this.isBull;
      // navigate to home (clears hash, scrolls to top and closes mobile menu)
      this.goHome();
    },

    toggleTelegram() {
      this.telegramOpen = !this.telegramOpen;
    },

    closeTelegram() {
      this.telegramOpen = false;
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
          history.replaceState(null, '', '#' + id);
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

    // ----------------------------
    // Novos métodos para acompanhar o mouse
    // ----------------------------
    _removeSymbolListeners() {
      const target = window;
      if (this._onPointerMove) {
        target.removeEventListener('pointermove', this._onPointerMove);
        target.removeEventListener('mousemove', this._onPointerMove);
      }
      if (this._onPointerEnd) {
        target.removeEventListener('pointerleave', this._onPointerEnd);
        target.removeEventListener('touchend', this._onPointerEnd);
      }

      // remover listeners do documento para dropdown Telegram
      if (this._onDocClick) document.removeEventListener('click', this._onDocClick, true);
      if (this._onDocKeydown) document.removeEventListener('keydown', this._onDocKeydown, true);

      this._stopSymbolRaf();
    },

    _startSymbolRaf() {
      if (this._symbol.rafId) return;
      this._symbol.running = true;
      const loop = () => {
        this._updateSymbolTransform();
        this._symbol.rafId = requestAnimationFrame(loop);
      };
      this._symbol.rafId = requestAnimationFrame(loop);
    },

    _stopSymbolRaf() {
      if (this._symbol.rafId) {
        cancelAnimationFrame(this._symbol.rafId);
        this._symbol.rafId = null;
      }
      this._symbol.running = false;
    },

    _updateSymbolTransform() {
      const img = this.$refs.symbolImg;
      if (!img) return;

      const rect = img.getBoundingClientRect();

      // se não há coords (pointer saiu), animar retorno suave
      if (this._symbol.clientX == null || this._symbol.clientY == null) {
        img.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
        return;
      }

      const cx = this._symbol.clientX;
      const cy = this._symbol.clientY;

      // normaliza -1..1 com base no centro do elemento
      const relX = ((cx - (rect.left + rect.width / 2)) / rect.width) * 2; // -1..1
      const relY = ((cy - (rect.top + rect.height / 2)) / rect.height) * 2; // -1..1

      const clamp = (v, a = -1, b = 1) => Math.max(a, Math.min(b, v));
      const nx = clamp(relX);
      const ny = clamp(relY);

      const max = this._symbol.maxTilt;

      // rotateX = movimento vertical (inverte y), rotateY = movimento horizontal (inverte x)
      const rotateX = (-ny) * max;
      const rotateY = nx * max * -1;

      // pequena tradução Z para dar profundidade
      const translateZ = 6;

      img.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
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
  width: 90vw;
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
  display: none;
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
</style>
