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
          <!-- toggle image between bear and bull -->
          <img
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
        <a href="#contato" class="cta" @click.prevent="navigate('#contato')">Comprar</a>
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
        <a href="#contato" class="cta" role="menuitem" @click.prevent="navigate('#contato')">Comprar</a>
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
      isBull: false
    };
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
  background: linear-gradient(180deg, #090909 0%, var(--bg) 100%);
  color: #f5f2eb;
  border-bottom: 1px solid rgba(212,175,55,0.5);
  box-shadow: 0 6px 24px rgba(0,0,0,0.6);
  z-index: 9999;
  box-sizing: border-box;
}

.topbar-inner {
  width: 100%;
  max-width: 90%;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.brand { 
  display:flex; 
  align-items:center; 
  gap:0.8rem; 
  height:72px; 
  cursor: pointer; 
}
.brand img {
  width: 62px;
  height: 62px;
  object-fit: contain;
  display: block;
  transition: transform 180ms ease, opacity 140ms ease;
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
.mobile-navlinks a:hover { background: rgba(212,175,55,0.04); color: var(--gold-1); }
.mobile-navlinks a.cta { background: linear-gradient(180deg,var(--gold-1),var(--gold-2)); color:#0b0b0b; font-weight:700; }

@media (max-width: 768px) {
  .topbar-inner { padding: 0 6px; gap: 0.5rem; }
  .navlinks { display: none; }
  .hamburger { display: inline-flex; align-items:center; justify-content:center; }
  .mobile-menu { display: block; }
}

@media (max-width: 400px) {
  .title .logo { font-size: 0.95rem; }
  .title .subtitle { font-size: 0.75rem; }
}
</style>
