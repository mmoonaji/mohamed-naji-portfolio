export type CurrencyCode = 'USD' | 'SAR';

export type TierId = 'starter' | 'growth' | 'ecosystem';

export type AddonId =
  | 'androidApp'
  | 'aiAssistant'
  | 'multiBranchPos'
  | 'bilingual'
  | 'catalogSetup';

export interface PricingTierConfig {
  id: TierId;
  baseUsd: number;
  minWeeks: number;
  maxWeeks: number;
  recommended?: boolean;
  /** Default infra range in USD/month */
  monthlyInfraMinUsd: number;
  monthlyInfraMaxUsd: number;
}

export interface PricingAddonConfig {
  id: AddonId;
  priceUsd: number;
  extraWeeks: number;
  extraMonthlyInfraUsd?: number;
}

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  SAR: { symbol: 'SAR', rate: 3.75 },
};

/**
 * Edit these base prices and add-on figures anytime to adjust your portfolio quote ranges.
 */
export const PRICING_TIERS: PricingTierConfig[] = [
  {
    id: 'starter',
    baseUsd: 650,
    minWeeks: 2,
    maxWeeks: 3,
    monthlyInfraMinUsd: 25,
    monthlyInfraMaxUsd: 30,
  },
  {
    id: 'growth',
    baseUsd: 1250,
    minWeeks: 3,
    maxWeeks: 4,
    recommended: true,
    monthlyInfraMinUsd: 25,
    monthlyInfraMaxUsd: 45,
  },
  {
    id: 'ecosystem',
    baseUsd: 2200,
    minWeeks: 5,
    maxWeeks: 7,
    monthlyInfraMinUsd: 35,
    monthlyInfraMaxUsd: 60,
  },
];

export const PRICING_ADDONS: PricingAddonConfig[] = [
  {
    id: 'androidApp',
    priceUsd: 450,
    extraWeeks: 1,
  },
  {
    id: 'aiAssistant',
    priceUsd: 350,
    extraWeeks: 1,
    extraMonthlyInfraUsd: 10,
  },
  {
    id: 'multiBranchPos',
    priceUsd: 550,
    extraWeeks: 2,
  },
  {
    id: 'bilingual',
    priceUsd: 250,
    extraWeeks: 1,
  },
  {
    id: 'catalogSetup',
    priceUsd: 150,
    extraWeeks: 1,
  },
];

export const WHATSAPP_NUMBER = '967770859270';

export function formatMoney(usdAmount: number, currency: CurrencyCode, isRtl: boolean): string {
  const { rate } = CURRENCY_RATES[currency];
  const converted = Math.round((usdAmount * rate) / 10) * 10;
  const formatted = converted.toLocaleString('en-US');
  if (currency === 'USD') {
    return `$${formatted}`;
  }
  return isRtl ? `${formatted} ر.س` : `${formatted} SAR`;
}
