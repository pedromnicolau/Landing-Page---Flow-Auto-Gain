<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="brand">
        <div class="logo">Flow Auto Gain</div>
        <p class="tagline">Robôs e Indicadores profissionais para a B3</p>
      </div>

      <nav class="footer-nav" aria-label="Footer">
        <a href="#/" class="nav-link">Início</a>
        <a href="#/terms" class="nav-link">Termos de Uso</a>
        <a href="#/privacy" class="nav-link">Política de Privacidade</a>
        <a href="https://t.me/+1h9O__7JFzZjM2Fh" target="_blank" rel="noopener noreferrer" class="nav-link">Telegram</a>
      </nav>

      <div class="legal">
        <p>Suporte: <a href="mailto:suporte@flowautogain.com">suporte@flowautogain.com</a></p>
        <p class="copyright">© { new Date().getFullYear() } Flow Auto Gain — Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// nenhum JS adicional necessário atualmente
</script>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(245,242,235,0.03);
  padding: 2rem 1rem;
  margin-top: 3.2rem;
  color: rgba(245,242,235,0.9);
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.12));
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.4rem;
  flex-wrap: wrap;
}
.brand .logo {
  font-weight: 800;
  color: #f8ecd8;
  letter-spacing: -0.4px;
  font-size: 1.05rem;
}
.brand .tagline {
  margin:0.4rem 0 0;
  color: rgba(245,242,235,0.72);
  font-size: 0.92rem;
}
.footer-nav {
  display:flex;
  gap: 1rem;
  align-items:center;
  flex-wrap:wrap;
}
.nav-link {
  color: rgba(245,242,235,0.9);
  text-decoration:none;
  font-weight:700;
  padding: 0.4rem 0.6rem;
  border-radius:8px;
  transition: background .15s ease, transform .12s ease;
}
.nav-link:hover { background: rgba(184,134,11,0.06); transform: translateY(-2px); }

.legal {
  color: rgba(245,242,235,0.7);
  font-size: 0.9rem;
  text-align: right;
}
.legal a { color: #b8860b; text-decoration: none; font-weight:700; }

@media (max-width: 720px) {
  .footer-inner { flex-direction: column; align-items: flex-start; }
  .legal { text-align: left; width:100%; margin-top:0.8rem; }
}
</style>
