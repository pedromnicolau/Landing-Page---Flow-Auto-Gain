<template>
  <div v-if="visible" class="modal-backdrop" @keydown.esc="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-header">
        <h3>Confirmar compra</h3>
        <button class="close" @click="$emit('close')">✕</button>
      </header>

      <section class="modal-body">
        <p class="product-line"><strong>{{ offer?.name }}</strong> — <em>{{ offer?.plan?.label }}</em></p>
        <p class="price">{{ offer?.plan?.details }}</p>

        <div class="terms-scroll">
          <h4>Termos de Uso e Aviso de Risco</h4>
          <p>Operar no mercado financeiro envolve riscos significativos. Resultados passados não garantem retornos futuros. Ao utilizar nossos robôs e indicadores você reconhece que pode perder parte ou todo o capital investido.</p>
          <p>Você concorda em utilizar as ferramentas apenas em contas próprias e entende que não prestamos consultoria financeira individual. Verifique sempre as políticas completas e a documentação técnica antes de operar.</p>
          <p class="links"><a href="/terms" target="_blank">Termos de Uso</a> • <a href="/privacy" target="_blank">Política de Privacidade</a></p>
        </div>

        <label class="accept">
          <input type="checkbox" v-model="accepted" />
          Eu li e aceito os Termos de Uso e estou ciente dos riscos.
        </label>
      </section>

      <footer class="modal-footer">
        <button class="secondary" @click="$emit('close')">Cancelar</button>
        <button class="primary" :disabled="!accepted" @click="buy">Comprar agora</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfferModal',
  props: {
    visible: { type: Boolean, default: false },
    offer: { type: Object, default: null },
  },
  data() {
    return { accepted: false };
  },
  watch: {
    visible(v) {
      if (!v) this.accepted = false;
    },
  },
  methods: {
    buy() {
      if (!this.accepted) return;
      const url = this.offer?.url || '/';
      // navegar na mesma aba após confirmação dos termos
      window.location.href = url;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position:fixed; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.72)); display:flex; align-items:center; justify-content:center; z-index:60; backdrop-filter: blur(4px);
  animation: fadeInUp 260ms ease both;
}
.modal {
  width:min(880px, 96%); background: linear-gradient(180deg, #0b0b0b, #0f0f10); border-radius:12px; border:1px solid rgba(212,175,55,0.08); padding:1rem; color:#f5f2eb;
  box-shadow:0 20px 60px rgba(0,0,0,0.75);
  transform-origin:center; animation: fadeInUp 320ms cubic-bezier(.2,.9,.2,1);
}
.modal-header { display:flex; justify-content:space-between; align-items:center; }
.modal-header h3 { margin:0; color:#f8ecd8; }
.close { background:transparent; border:none; color:rgba(245,242,235,0.7); font-size:1.1rem; cursor:pointer; }
.modal-body { margin-top:0.6rem; display:flex; flex-direction:column; gap:0.6rem; }
.terms-scroll { max-height:220px; overflow:auto; padding:0.6rem; background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent); border-radius:10px; border:1px solid rgba(255,255,255,0.02); }
.accept { display:flex; gap:0.7rem; align-items:center; margin-top:0.4rem; color:rgba(245,242,235,0.9); }
.modal-footer { display:flex; justify-content:flex-end; gap:0.6rem; margin-top:0.8rem; }
.primary {
  background: linear-gradient(180deg, var(--gold-1), var(--gold-2));
  border: 1px solid rgba(212,175,55,0.16);
  color:#0b0b0b;
  padding:0.6rem 1rem;
  border-radius:8px;
  cursor:pointer;
  font-weight:800;
  transition: transform 160ms ease, box-shadow 220ms ease;
  box-shadow: 0 12px 34px rgba(212,175,55,0.06);
}
.primary:disabled {
  opacity:0.42;
  cursor:not-allowed;
  transform:none;
  box-shadow:none;
}
.primary:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 18px 46px rgba(212,175,55,0.12); }

/* price style */
.price { font-weight:800; color:var(--gold-1); font-size:1rem; }
.links a { color:var(--gold-1); text-decoration:underline; }
</style>
