<template>
  <article class="product-card">
    <div class="card-head">
      <div class="product-title">{{ product.name }}</div>
      <div class="product-category">{{ product.category }}</div>
    </div>

    <ul class="product-features" v-if="features && features.length">
      <li v-for="(f, idx) in features" :key="idx" class="feature-item">
        <span class="check" aria-hidden="true">✓</span>
        <span class="feature-text">{{ f }}</span>
      </li>
    </ul>

    <p class="product-desc" v-else>{{ product.description || '' }}</p>

    <!-- intro aos planos: título + linha separadora sutil -->
    <div class="plans-header" aria-hidden="false">
        <hr class="plans-separator" />
        <div class="plans-title">Escolha seu plano</div>
    </div>

    <div class="plans">
      <button
        v-for="(plan, key) in product.plans"
        :key="key"
        class="plan-btn"
        @click="handleClick(key, plan)"
        >
        <div class="plan-head" aria-hidden="true">
          <span class="plan-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2"></rect>
              <path d="M16 3v4M8 3v4M3 11h18"></path>
            </svg>
          </span>
          <div class="plan-name">{{ plan.label }}</div>
        </div>
        <div class="plan-price">
          <span class="price-main">{{ splitPrice(plan.details).main }}</span>
          <span v-if="splitPrice(plan.details).sub" class="price-sub">{{ splitPrice(plan.details).sub }}</span>
        </div>
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true },
  },
  methods: {
    handleClick(key, plan) {
      const url = (plan && plan.url) ? plan.url : null;
      this.$emit('select-offer', { productId: this.product.id, name: this.product.name, planKey: key, plan, url });
    },
    splitPrice(details) {
      if (!details) return { main: '', sub: '' };

      const moneyMatch = details.match(/^([\s\S]*?R\$\s*\d[\d.,]*)([\s\S]*)$/i);
      if (/1x\s+de/i.test(details) && moneyMatch) {
        const main = moneyMatch[1].trim();
        let sub = (moneyMatch[2] || '').trim();
        sub = sub.replace(/^[,.\s-]+/, '');
        return { main, sub };
      }

      const parts = details.split(/\s+ou\s+/i);
      if (parts.length > 1) {
        const main = parts[0] ? parts[0].trim() : '';
        const sub = parts[1] ? ('ou ' + parts[1].trim()) : '';
        return { main, sub };
      }

      if (moneyMatch) {
        const main = moneyMatch[1].trim();
        const sub = (moneyMatch[2] || '').trim().replace(/^[,.\s-]+/, '');
        return { main, sub };
      }

      return { main: details.trim(), sub: '' };
    }
  },
  computed: {
    features() {
      const robots = [
        { title: "Gamma Sniper", description: "Versão mais ativa da automação.", features: ["Entra em praticamente todos os sinais detectados","Busca aproveitar ao máximo cada oportunidade do mercado","Ideal para quem quer atingir a meta rapidamente","Não se importa em assumir um risco maior de oscilações","Possíveis perdas no caminho"] },
        { title: "Gamma Smart", description: "Equilibra agressividade e cautela.", features: ["Realiza entradas estratégicas","Faz pequenas pausas para reavaliar o cenário","Busca novas oportunidades","Número moderado de operações no dia","Foco maior em qualidade de entradas"] },
        { title: "Gamma Safe", description: "O mais seletivo da linha.", features: ["Filtra ao máximo as oportunidades","Busca apenas os momentos mais claros e assertivos","Opera com menos operações diárias","Prioriza consistência e precisão","Perfeito para quem prefere menos operações"] },
        { title: "Delta Sniper", description: "Alta velocidade e agressividade.", features: ["Versão mais ativa da linha Delta","Aproveita rapidamente oportunidades","Múltiplas operações no dia","Busca maximizar ganhos com volume","Requer tolerância a volatilidade"] },
        { title: "Delta Smart", description: "Balanço perfeito de timing.", features: ["Equilibra velocidade e análise","Entradas calculadas e precisas","Quantidade moderada de operações","Reduz exposição desnecessária","Ideal para traders intermediários"] },
        { title: "Delta Safe", description: "Prudência e seletividade.", features: ["Foco em operações de alta probabilidade","Menos operações, mais qualidade","Gestão de risco conservadora","Protege capital em cenários incertos","Menor drawdown médio"] },
        { title: "Alpha Sniper", description: "Máxima agressividade e frequência.", features: ["Opera ativamente durante todo o pregão","Capitaliza micro-movimentos","Volume alto de operações","Potencial de altos retornos","Requer acompanhamento ativo"] },
        { title: "Alpha Smart", description: "Inteligência em cada trade.", features: ["Análise aprofundada antes de entrar","Espera confirmações de tendência","Operações bem fundamentadas","Evita armadilhas do mercado","Consistência a longo prazo"] },
        { title: "Alpha Safe", description: "Segurança como prioridade.", features: ["Extremamente seletivo","Opera apenas nos melhores setups","Máxima proteção de capital","Menor frequência operacional","Ideal para perfil conservador"] },
      ];

      const indicators = [
        { title: "Flow Smart Money", description: "Identifica movimentação de grandes players.", features: ["Rastreia volume institucional","Detecta acumulação e distribuição","Sinais de entrada/saída de dinheiro inteligente","Alertas em tempo real","Acompanha fluxo de ordem"] },
        { title: "Flow Trade Zone", description: "Delimita zonas de alta probabilidade.", features: ["Identifica áreas de suporte e resistência","Zonas de liquidez importantes","Pontos ideais de entrada","Níveis de stop loss sugeridos","Visualização clara no gráfico"] },
        { title: "Flow Tracker", description: "Rastreamento avançado de tendências.", features: ["Identifica força da tendência","Sinais de reversão antecipados","Filtra ruído do mercado","Múltiplos timeframes","Confirmação de direção"] },
        { title: "Flow Limit", description: "Gestão inteligente de limites.", features: ["Define limites dinâmicos de risco","Cálculo automático de posição","Proteção contra overtrading","Alertas de exposição excessiva","Maximize ganhos, minimize perdas"] },
      ];

      const name = this.product && (this.product.name || this.product.title || '');
      if (!name) return [];

      const foundInRobots = robots.find(r => r.title === name);
      if (foundInRobots) return foundInRobots.features;
      const foundInIndicators = indicators.find(i => i.title === name);
      if (foundInIndicators) return foundInIndicators.features;

      if (Array.isArray(this.product.features)) return this.product.features;
      return [];
    }
  }
};
</script>

<style scoped>
.product-card {
  background: linear-gradient(225deg, rgba(255,255,255,0.015), rgba(255,255,255,0.005));
  border-radius: 12px;
  padding:1.6rem;
  color:#f5f2eb;
  display:flex;
  flex-direction:column;
  gap:0.8rem;
  border: 1px solid var(--gold-1);
  transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms ease, border-color 180ms ease;
  will-change: transform, box-shadow, border-color;
  transform-origin: center;
}
.product-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 26px 70px rgba(0,0,0,0.75), 0 10px 36px rgba(212,175,55,0.14);
  border-color: var(--gold-2);
}
.card-head { display:flex; justify-content:space-between; align-items:center; }

.product-title {
  font-weight: 900;
  font-size: clamp(1.25rem, 2.6vw, 1.8rem); /* aumentado levemente */
  color: #f8ecd8;
  letter-spacing: 0.2px;
  text-align: left;
}

/* categoria com texto um pouco maior */
.product-category {
  font-size: 0.9rem;
  color: rgba(245,242,235,0.65);
  background: linear-gradient(-225deg, rgba(212,175,55,0.05), transparent);
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(212,175,55,0.1);
}

/* detalhe do produto (ajuste sutil) */
.product-desc { color:rgba(245,242,235,0.62); font-size:1.06rem; margin:0; }

/* features: tamanho um pouco maior para melhor leitura */
.product-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; font-size:1.04rem; } /* gap aumentado */

.feature-item { display:flex; align-items:flex-start; gap:14px; color: rgba(245,242,235,0.88); font-size:1.02rem; } /* gap horizontal aumentado */

/* check maior e com melhor alinhamento */
.feature-item .check {
  justify-content:center;
  width:40px;   /* aumentado para alinhamento */
  height:40px;  /* aumentado para alinhamento */
  color: var(--gold-1);
  font-weight:700;
  font-size: 1.3rem; /* aumentado */
  line-height: 40px;
}

/* garante que o texto da feature fique alinhado à esquerda e ocupe o espaço restante */
.feature-text {
  flex: 1;
  text-align: left;
  display: block;
  word-break: break-word;
  font-size: 1.1rem;
}

.plans {
  display: flex;
  flex-direction: column; /* empilha os planos verticalmente */
  gap: 1rem;
  margin-top: 1rem;
}
.plan-btn {
  background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent);
  border: 1px solid rgba(212,175,55,0.25);
  color: #f5f2eb;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  transition: transform 160ms ease, box-shadow 180ms ease, background 160ms ease, border-color 160ms ease;
}

.plan-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(212,175,55,0.06);
  background: linear-gradient(180deg, rgba(212,175,55,0.02), rgba(255,255,255,0.01));
  border-color: var(--gold-1);
}
.plan-head {
  display: flex;
  align-items: center;   /* alinha verticalmente ícone + nome */
  gap: 10px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;
}
.plan-name {
  margin: 0;
  font-weight: 600;
  color: #f8ecd8;
  font-size: 1.2rem;
  line-height: 1;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plan-price { display: block; margin-top: 6px; }

/* destaque para a parte principal (maior e mais proeminente) */
.price-main {
  display: block;
  font-size: 1.18rem;
  font-weight: 800;
  color: #f8ecd8;
  line-height: 1.1;
}

/* parte secundária (menor e menos proeminente) */
.price-sub {
  display: block;
  margin-top: 4px;
  font-size: 0.95rem;
  color: rgba(245,242,235,0.7);
  font-weight: 600;
}

.plans-header {
  margin-top: 0.4rem;
}
.plans-title {
  color: rgba(245,242,235,0.86);
  font-weight: 600;
  font-size: 1rem;
  text-align: left;
}
.plans-separator {
  border: 0;
  height: 1px;
  background: rgba(212,175,55,0.25);
  margin-bottom: 24px;
  border-radius: 1px;
  /* garante separador sutil */
}
.plan-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  margin-right: 12px;
  color: var(--gold-1);
}

/* garante que o svg use a cor corrente do .plan-icon */
.plan-icon svg { display:block; width:100%; height:100%; color: inherit; }

/* tornar o cartão mais compacto em pequenos dispositivos */
@media (max-width: 640px) {
  .product-card {
    padding: 1rem;
  }
  .product-title { font-size: 1.15rem; }
  .feature-item .check { width: 34px; height: 34px; line-height: 34px; font-size: 1.05rem; }
  .feature-text { font-size: 1rem; }
  .plan-btn { padding: 12px; }
  .plan-name { font-size: 1.05rem; }
  .price-main { font-size: 1.02rem; }
}

/* em telas muito largas, exibir planos em linha para facilitar comparação */
@media (min-width: 1000px) {
  /* changed: manter os planos empilhados mesmo em telas largas */
  .plans { flex-direction: column; gap: 1rem; align-items: flex-start; }
  .plan-btn { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .plan-head { margin-bottom: 8px; }
  .plan-price { margin-top: auto; text-align: left; } /* <- alinhamento à esquerda (alterada) */
}

/* manter boa aparência em tablets */
@media (min-width: 680px) and (max-width: 999px) {
  .plans { gap: 0.9rem; }
}
</style>
