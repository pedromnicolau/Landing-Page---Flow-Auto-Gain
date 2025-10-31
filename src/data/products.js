export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const robotPlan = {
  monthly: {
    label: 'Plano Mensal',
    details: '1X de R$399,99 PIX, Boleto, ou Cartão de Crédito',
    url: 'https://google.com',
  },
  trimestral: {
    label: 'Plano Trimestral',
    details: '3X de R$347,27 ou R$915,30 à vista',
    url: 'https://google.com',
  },
  annual: {
    label: 'Plano Anual',
    details: '12X de 318,97 ou R$2.743,80 à vista',
    url: 'https://google.com',
  },
};

const indicatorPlan = {
  monthly: {
    label: 'Plano Mensal',
    details: '1X de R$199,99 PIX, Boleto, ou Cartão de Crédito',
    url: 'https://google.com',
  },
  trimestral: {
    label: 'Plano Trimestral',
    details: '3X de 173,54 ou R$457,40 à vista',
    url: 'https://google.com',
  },
  annual: {
    label: 'Plano Anual',
    details: '12X de 161,62 ou R$1.390,20 à vista',
    url: 'https://google.com',
  },
};

const package3Plan = {
  monthly: {
    label: 'Plano Mensal',
    details: '1X de R$799,99 PIX, Boleto, ou Cartão de Crédito',
    url: 'https://google.com',
  },
  trimestral: {
    label: 'Plano Trimestral',
    details: '3X de 693,93 ou R$1.829,00 à vista',
    url: 'https://google.com',
  },
  annual: {
    label: 'Plano Anual',
    details: '12X de 646,94 ou R$5.565,00 à vista',
    url: 'https://google.com',
  },
};

const package9Plan = {
  monthly: {
    label: 'Plano Mensal',
    details: '1X de R$1.999,99 PIX, Boleto, ou Cartão de Crédito',
    url: 'https://google.com',
  },
  trimestral: {
    label: 'Plano Trimestral',
    details: '3X de 1.736,36 ou R$4.576,59 à vista',
    url: 'https://google.com',
  },
  annual: {
    label: 'Plano Anual',
    details: '12X de 1.1617,89 ou R$13.917,28 à vista',
    url: 'https://google.com',
  },
};

const package4IndicatorsPlan = {
  monthly: {
    label: 'Plano Mensal',
    details: '1X de R$599,99 PIX, Boleto, ou Cartão de Crédito',
    url: 'https://google.com',
  },
  trimestral: {
    label: 'Plano Trimestral',
    details: '3X de 520,81 ou R$1.372,70 à vista',
    url: 'https://google.com',
  },
  annual: {
    label: 'Plano Anual',
    details: '12X de 485,15 ou R$4.173,30 à vista',
    url: 'https://google.com',
  },
};

// adiciona: cria uma cópia dos planos base atribuindo uma url única por productId + planKey
function buildProductPlans(basePlans, productId) {
  const out = {};
  for (const key in basePlans) {
    if (!Object.prototype.hasOwnProperty.call(basePlans, key)) continue;
    out[key] = {
      ...basePlans[key],
      // URL específica por produto/plano — padronizada para https://google.com/{productId}/{planKey}
      url: `https://google.com/${productId}/${key}`,
    };
  }
  return out;
}

// adiciona mapeamento de URLs customizadas por produto/plano
const customPlanUrls = {
  'gamma-sniper': {
    monthly: 'https://pay.cakto.com.br/ipug4ca',
    trimestral: 'https://pay.cakto.com.br/gndj5fx',
    annual: 'https://pay.cakto.com.br/gndj5fx',
  },
  'gamma-smart': {
    monthly: 'https://pay.cakto.com.br/wsjgb35',
    trimestral: 'https://pay.cakto.com.br/uwdukjc',
    annual: 'https://pay.cakto.com.br/3dkibud',
  },
  'gamma-safe': {
    monthly: 'https://pay.cakto.com.br/q24z76z',
    trimestral: 'https://pay.cakto.com.br/36n9qb7',
    annual: 'https://pay.cakto.com.br/gsjx9hx',
  },
  'alpha-sniper': {
    monthly: 'https://pay.cakto.com.br/35miubv',
    trimestral: 'https://pay.cakto.com.br/t3guy5b',
    annual: 'https://pay.cakto.com.br/y3swnep',
  },
  'alpha-smart': {
    monthly: 'https://pay.cakto.com.br/32kzwvs',
    trimestral: 'https://pay.cakto.com.br/r2hvu67',
    annual: 'https://pay.cakto.com.br/3cx2vt9',
  },
  'alpha-safe': {
    monthly: 'https://pay.cakto.com.br/3bwrqxp',
    trimestral: 'https://pay.cakto.com.br/3x3dw7v',
    annual: 'https://pay.cakto.com.br/3ez9idm',
  },

  // --- Delta robots ---
  'delta-sniper': {
    monthly: 'https://pay.cakto.com.br/37n6sgn',
    trimestral: 'https://pay.cakto.com.br/cdvgfy6',
    annual: 'https://pay.cakto.com.br/iisqsgd',
  },
  'delta-smart': {
    monthly: 'https://pay.cakto.com.br/r6wgpbq',
    trimestral: 'https://pay.cakto.com.br/4npm8k6',
    annual: 'https://pay.cakto.com.br/v2g5bip',
  },
  'delta-safe': {
    monthly: 'https://pay.cakto.com.br/333oux8',
    trimestral: 'https://pay.cakto.com.br/tysa44g',
    annual: 'https://pay.cakto.com.br/hw92ur7',
  },

  // --- Pacotes ---
  'pacote-sniper': {
    monthly: 'https://pay.cakto.com.br/3ethgk2',
    trimestral: 'https://pay.cakto.com.br/k27q85o',
    annual: 'https://pay.cakto.com.br/3f53xz9',
  },
  'pacote-smart': {
    monthly: 'https://pay.cakto.com.br/34erp5x',
    trimestral: 'https://pay.cakto.com.br/kosa99z',
    annual: 'https://pay.cakto.com.br/wyp6v8r',
  },
  'pacote-safe': {
    monthly: 'https://pay.cakto.com.br/34kqc9a',
    trimestral: 'https://pay.cakto.com.br/8uuwwoq',
    annual: 'https://pay.cakto.com.br/3fyh78e',
  },
  'pacote-alpha': {
    monthly: 'https://pay.cakto.com.br/3ecvunf',
    trimestral: 'https://pay.cakto.com.br/b4giq2n',
    annual: 'https://pay.cakto.com.br/p7isub5',
  },
  'pacote-gamma': {
    monthly: 'https://pay.cakto.com.br/jvqksnj',
    trimestral: 'https://pay.cakto.com.br/copbhbn',
    annual: 'https://pay.cakto.com.br/cmvihsy',
  },
  'pacote-delta': {
    monthly: 'https://pay.cakto.com.br/35m9chp',
    trimestral: 'https://pay.cakto.com.br/69rozpn',
    annual: 'https://pay.cakto.com.br/pvoj8ci',
  },

  // Pacote com 9 Robôs (slug gerado: "pacote-com-9-rob-s")
  'pacote-com-9-rob-s': {
    monthly: 'https://pay.cakto.com.br/3d7ekzj',
    trimestral: 'https://pay.cakto.com.br/ocp6rqh',
    annual: 'https://pay.cakto.com.br/a9vq7ux',
  },

  // Pacote com 4 Indicadores Flow (slug: "pacote-com-4-indicadores-flow")
  'pacote-com-4-indicadores-flow': {
    monthly: 'https://pay.cakto.com.br/fj9jdb9',
    trimestral: 'https://pay.cakto.com.br/tyhfmaa',
    annual: 'https://pay.cakto.com.br/dz5jk3u',
  },

  // --- Indicadores Flow ---
  'flow-limit': {
    monthly: 'https://pay.cakto.com.br/3ymk52f',
    trimestral: 'https://pay.cakto.com.br/k29qt9e',
    annual: 'https://pay.cakto.com.br/z5jhfy4',
  },
  'flow-smart-money': {
    monthly: 'https://pay.cakto.com.br/3d28xtf',
    trimestral: 'https://pay.cakto.com.br/35octws',
    annual: 'https://pay.cakto.com.br/37sjzo5',
  },
  'flow-tracker': {
    monthly: 'https://pay.cakto.com.br/hoqtpjs',
    trimestral: 'https://pay.cakto.com.br/v5pqo5u',
    annual: 'https://pay.cakto.com.br/366ddzd',
  },
  'flow-trade-zone': {
    monthly: 'https://pay.cakto.com.br/65sjb7a',
    trimestral: 'https://pay.cakto.com.br/33wvh77',
    annual: 'https://pay.cakto.com.br/32i4sho',
  },

  // --- novas urls para Linha de alta frequência (Vector / Ômega) ----------
  // Vector:
  vector: {
    monthly: 'https://pay.cakto.com.br/p8np99h',
    trimestral: 'https://pay.cakto.com.br/wa2jx8k',
    annual: 'https://pay.cakto.com.br/3unt3xs',
  },
  // Ômega (slug gerado por slugify -> "mega")
  omega: {
    monthly: 'https://pay.cakto.com.br/vi2scdf',
    trimestral: 'https://pay.cakto.com.br/pzdehen',
    annual: 'https://pay.cakto.com.br/tvoj5au',
  },

  // pacote de alta frequência: todos os planos redirecionam para google.com por enquanto
  // nota: o slug gerado por slugify('Pacote de Alta Frequência') = 'pacote-de-alta-frequ-ncia'
  'pacote-de-alta-frequ-ncia': {
    monthly: 'https://google.com',
    trimestral: 'https://google.com',
    annual: 'https://google.com',
  },
};

// substitui a construção original de ROBOTS para aplicar overrides quando existir
const ROBOTS = [
  'Gamma Sniper',
  'Gamma Smart',
  'Gamma Safe',
  'Delta Sniper',
  'Delta Smart',
  'Delta Safe',
  'Alpha Sniper',
  'Alpha Smart',
  'Alpha Safe',
  // adicionado: linha de alta frequência
  'Vector',
  'Ômega'
].map((name) => {
  let line = null;

  // adicionado: detecta a nova linha de alta frequência
  if (name === 'Vector' || name === 'Ômega') line = 'Linha de alta frequência';

  if (name.includes('Smart')) line = 'Linha Smart';
  else if (name.includes('Delta')) line = 'linha delta';
  else if (name.includes('Alpha')) line = 'linha aplhpa';
  const productId = slugify(name);

  // gera planos padronizados para este robô
  const plans = buildProductPlans(robotPlan, productId);

  // aplica overrides de URL quando definido
  const overrides = customPlanUrls[productId];
  if (overrides) {
    for (const key in overrides) {
      if (!Object.prototype.hasOwnProperty.call(overrides, key)) continue;
      if (!plans[key]) continue;
      plans[key] = {
        ...plans[key],
        url: overrides[key],
      };
    }
  }

  return {
    id: productId,
    name,
    category: 'Robô',
    plans,
    ...(line ? { line } : {}),
  };
});

// substitui a definição antiga por uma que gera planos por indicador e aplica overrides
const INDICATORS = [
  'Flow Smart Money',
  'Flow Trade Zone',
  'Flow Tracker',
  'Flow Limit'
].map((name) => {
  const id = slugify(name);
  // gera planos padronizados para este indicador (cada plan.url diferenciado)
  const plans = buildProductPlans(indicatorPlan, id);

  // aplica overrides de URL quando definido (mesma lógica usada para ROBOTS/PACKAGES)
  const overrides = customPlanUrls[id];
  if (overrides) {
    for (const key in overrides) {
      if (!Object.prototype.hasOwnProperty.call(overrides, key)) continue;
      if (!plans[key]) continue;
      plans[key] = {
        ...plans[key],
        url: overrides[key],
      };
    }
  }

  return {
    id,
    name,
    category: 'Indicador',
    plans,
  };
});

const PACKAGES = [
  { name: 'Pacote Alpha', plan: package3Plan },
  { name: 'Pacote Gamma', plan: package3Plan },
  { name: 'Pacote Delta', plan: package3Plan },
  { name: 'Pacote Sniper', plan: package3Plan },
  { name: 'Pacote Smart', plan: package3Plan },
  { name: 'Pacote Safe', plan: package3Plan },
  { name: 'Pacote com 9 Robôs', plan: package9Plan },
  { name: 'Pacote com 4 Indicadores Flow', plan: package4IndicatorsPlan },
  // novo pacote que contém Vector e Ômega
  { name: 'Pacote de Alta Frequência', plan: package3Plan, contents: ['Vector', 'Ômega'] },
].map((p) => {
  const id = slugify(p.name);
  const productId = id;

  // gera planos padronizados para este pacote (cada plan.url diferenciado)
  const plans = buildProductPlans(p.plan, productId);

  // aplica overrides de URL quando definido (mesma lógica usada para ROBOTS)
  const overrides = customPlanUrls[productId];
  if (overrides) {
    for (const key in overrides) {
      if (!Object.prototype.hasOwnProperty.call(overrides, key)) continue;
      if (!plans[key]) continue;
      plans[key] = {
        ...plans[key],
        url: overrides[key],
      };
    }
  }

  return {
    id,
    name: p.name,
    category: 'Pacote',
    plans,
    // quando fornecido, converte lista de nomes para slugs (conteúdo do pacote)
    ...(p.contents ? { contents: p.contents.map(c => slugify(c)) } : {}),
  };
});

export const PRODUCTS = [...ROBOTS, ...INDICATORS, ...PACKAGES];

export function offerUrl(productId, planKey) {
  // padrão de URL de checkout (substitua pelo gateway real quando tiver)
  return `/checkout?product=${encodeURIComponent(productId)}&plan=${encodeURIComponent(planKey)}`;
}
