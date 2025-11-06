<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="brand">
          <div class="logo">Flow Auto Gain</div>
          <p class="tagline">Automatize seus lucros no mercado financeiro com robôs e indicadores profissionais para a B3.</p>
          <div class="icons">
            <!-- substitua src por assets reais se tiver -->
            <img src="/bull.png" alt="bull" class="icon" />
            <img src="/bear.png" alt="bear" class="icon" />
          </div>
        </div>

        <div class="quick-links" aria-label="Links Rápidos">
          <h4>Links Rápidos</h4>
          <ul>
            <!-- usar as âncoras internas que existem na página -->
            <li><a href="#robos">Robôs</a></li>
            <li><a href="#indicadores">Indicadores</a></li>
            <li><a href="#pacotes">Pacotes</a></li>
            <!-- Termos/Privacidade com âncora da seção topo da página -->
            <li>
              <a href="#/terms?anchor=terms-top" @click.prevent="goTo('/terms?anchor=terms-top')">Termos de Uso</a>
            </li>
            <li>
              <a href="#/privacy?anchor=privacy-top" @click.prevent="goTo('/privacy?anchor=privacy-top')">Política de Privacidade</a>
            </li>
          </ul>
        </div>

        <div class="contact">
          <h4>Contato</h4>
          <p class="contact-line"><span class="mail">✉️</span> <a href="mailto:contato@flowautogain.com">contato@flowautogain.com</a></p>
          <p class="contact-line"><span class="tg">💬</span> <a href="https://t.me/+1h9O__7JFzZjM2Fh" target="_blank" rel="noopener noreferrer">Suporte via Telegram</a></p>
        </div>
      </div>

      <hr class="divider" />

      <div class="footer-bottom">
        <div class="risk-box" role="note" aria-live="polite">
          <strong>AVISO DE RISCO:</strong> Operar no mercado financeiro envolve riscos significativos. Você pode perder parte ou todo o capital investido. Os resultados passados não garantem resultados futuros. Invista apenas valores que você pode se dar ao luxo de perder.
        </div>

        <div class="copyright">
          © {{ year }} Flow Auto Gain. Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();

// navegação para rotas de página com suporte a query (ex: '/terms?anchor=terms-top')
function goTo(path) {
  try {
    const h = path.startsWith('/') ? '#' + path : '#/' + String(path).replace(/^#/, '');
    window.location.hash = h;
  } catch (e) {
    // silent
  }
}
</script>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(245,242,235,0.03);
  padding: 3rem 1rem;
  margin-top: 3.2rem;
  color: rgba(245,242,235,0.92);
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.12));
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* container */
.footer-inner {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

/* top area with 3 columns */
.footer-top {
  display: grid;
  grid-template-columns: 1fr 1fr 320px;
  gap: 1.6rem;
  align-items: start;
}

/* Brand column */
.brand .logo {
  font-weight: 800;
  color: #f8ecd8;
  letter-spacing: -0.4px;
  font-size: 1.25rem;
  margin-bottom: 0.35rem;
}
.brand .tagline {
  margin: 0.2rem 0 0.8rem;
  color: rgba(245,242,235,0.72);
  font-size: 0.95rem;
  line-height: 1.4;
  max-width: 380px;
}
.icons { display:flex; gap:0.6rem; margin-top:0.6rem; }
.icon { width:40px; height:40px; object-fit:cover; border-radius:6px; box-shadow: 0 2px 6px rgba(0,0,0,0.5); }

/* Quick links */
.quick-links h4,
.contact h4 {
  color: #f8ecd8;
  margin: 0 0 0.6rem 0;
  font-size: 1rem;
  font-weight: 800;
}
.quick-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display:flex;
  flex-direction:column;
  gap:0.5rem;
}
.quick-links a {
  color: rgba(245,242,235,0.9);
  text-decoration: none;
  font-weight:600;
  transition: color .12s ease, transform .12s ease;
}
.quick-links a:hover { color: #ffd66b; transform: translateX(4px); }

/* Contact column */
.contact .contact-line {
  margin: 0.35rem 0;
  color: rgba(245,242,235,0.82);
  font-size: 0.95rem;
}
.contact a { color: #b8860b; font-weight:700; text-decoration:none; }
.contact a:hover { text-decoration: underline; }

/* divider */
.divider {
  border: none;
  border-top: 1px solid rgba(245,242,235,0.04);
  margin: 0.6rem 0;
}

/* bottom area */
.footer-bottom {
  display:flex;
  flex-direction: column;
  gap: 1rem;
}

/* risk box */
.risk-box {
  border: 1px solid rgba(186, 60, 60, 0.95);
  background: rgba(86, 15, 15, 0.06);
  color: rgba(245,242,235,0.92);
  padding: 1rem 1.2rem;
  border-radius: 10px;
  font-size: 0.95rem;
  line-height: 1.45;
}
.risk-box strong { color: #ff6b6b; margin-right: 0.4rem; }

/* copyright */
copyright,
.copyright {
  color: rgba(245,242,235,0.6);
  font-size: 0.9rem;
  text-align: center;
  width:100%;
}

/* responsiveness */
@media (max-width: 900px) {
  .footer-top { grid-template-columns: 1fr 1fr; gap: 1rem; }
  .contact { grid-column: span 2; }
  .brand .tagline { max-width: none; }
}
@media (max-width: 560px) {
  .footer-top { grid-template-columns: 1fr; gap: 0.9rem; }
  .contact { grid-column: auto; }
  .icons { gap:0.4rem; }
  .icon { width:34px; height:34px; }
  .risk-box { font-size: 0.9rem; padding: 0.9rem; }
  .footer-inner { padding: 0 0.8rem; }
}
</style>
