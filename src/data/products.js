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

const ROBOTS = [
  'Gamma Sniper',
  'Gamma Smart',
  'Gamma Safe',
  'Delta Sniper',
  'Delta Smart',
  'Delta Safe',
  'Alpha Sniper',
  'Alpha Smart',
  'Alpha Safe'
].map((name) => {
  let line = null;
  if (name.includes('Smart')) line = 'Linha Smart';
  else if (name.includes('Delta')) line = 'linha delta';
  else if (name.includes('Alpha')) line = 'linha aplhpa';
  const productId = slugify(name);
  return {
    id: productId,
    name,
    category: 'Robô',
    // gera planos específicos para este robô (cada plan.url diferenciado)
    plans: buildProductPlans(robotPlan, productId),
    ...(line ? { line } : {}),
  };
});

const INDICATORS = [
  'Flow Smart Money',
  'Flow Trade Zone',
  'Flow Tracker',
  'Flow Limit'
].map((name) => ({
  id: slugify(name),
  name,
  category: 'Indicador',
  plans: indicatorPlan,
}));

const PACKAGES = [
  { name: 'Pacote Alpha', plan: package3Plan },
  { name: 'Pacote Gamma', plan: package3Plan },
  { name: 'Pacote Delta', plan: package3Plan },
  { name: 'Pacote Sniper', plan: package3Plan },
  { name: 'Pacote Smart', plan: package3Plan },
  { name: 'Pacote Safe', plan: package3Plan },
  { name: 'Pacote com 9 Robôs', plan: package9Plan },
  { name: 'Pacote com 4 Indicadores Flow', plan: package4IndicatorsPlan },
].map((p) => ({
  id: slugify(p.name),
  name: p.name,
  category: 'Pacote',
  plans: p.plan,
}));

export const PRODUCTS = [...ROBOTS, ...INDICATORS, ...PACKAGES];

export function offerUrl(productId, planKey) {
  // padrão de URL de checkout (substitua pelo gateway real quando tiver)
  return `/checkout?product=${encodeURIComponent(productId)}&plan=${encodeURIComponent(planKey)}`;
}
