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
  /** Add-ons already included in this tier so they are never shown or billed twice */
  includedAddons: readonly AddonId[];
}

export interface PricingAddonConfig {
  id: AddonId;
  priceUsd: number;
  extraWeeks: number;
  productLimit?: number;
}

export interface PricingEstimate {
  tier: PricingTierConfig;
  activeAddons: PricingAddonConfig[];
  totalUsd: number;
  minWeeks: number;
  maxWeeks: number;
}

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  SAR: { symbol: 'SAR', rate: 3.75 },
};

export const CATALOG_SETUP_PRODUCT_LIMIT = 60;

/**
 * Single source of truth for all package prices, durations, included capabilities, and add-ons.
 */
export const PRICING_TIERS: readonly PricingTierConfig[] = [
  {
    id: 'starter',
    baseUsd: 650,
    minWeeks: 2,
    maxWeeks: 3,
    includedAddons: [],
  },
  {
    id: 'growth',
    baseUsd: 1250,
    minWeeks: 3,
    maxWeeks: 4,
    recommended: true,
    includedAddons: [],
  },
  {
    id: 'ecosystem',
    baseUsd: 2200,
    minWeeks: 5,
    maxWeeks: 7,
    includedAddons: ['androidApp', 'aiAssistant', 'multiBranchPos'],
  },
];

export const PRICING_ADDONS: readonly PricingAddonConfig[] = [
  {
    id: 'androidApp',
    priceUsd: 450,
    extraWeeks: 1,
  },
  {
    id: 'aiAssistant',
    priceUsd: 350,
    extraWeeks: 1,
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
    productLimit: CATALOG_SETUP_PRODUCT_LIMIT,
  },
];

export const WHATSAPP_NUMBER = '967770859270';

export function getTierById(tierId: TierId): PricingTierConfig {
  return PRICING_TIERS.find((tier) => tier.id === tierId) ?? PRICING_TIERS[1];
}

export function isAddonIncludedInTier(tierId: TierId, addonId: AddonId): boolean {
  const tier = getTierById(tierId);
  return tier.includedAddons.includes(addonId);
}

export function getAvailableAddonsForTier(tierId: TierId): PricingAddonConfig[] {
  const tier = getTierById(tierId);
  return PRICING_ADDONS.filter((addon) => !tier.includedAddons.includes(addon.id));
}

export function sanitizeSelectedAddons(
  tierId: TierId,
  selectedAddons: readonly AddonId[]
): AddonId[] {
  const tier = getTierById(tierId);
  const validAddonIds = new Set(PRICING_ADDONS.map((addon) => addon.id));
  const seen = new Set<AddonId>();

  for (const addonId of selectedAddons) {
    if (validAddonIds.has(addonId) && !tier.includedAddons.includes(addonId)) {
      seen.add(addonId);
    }
  }

  return Array.from(seen);
}

/**
 * Computes estimated build price and parallel-adjusted delivery window.
 * When 2+ add-ons are selected, parallel work reduces naive linear week stacking.
 */
export function calculatePricingEstimate(
  tierId: TierId,
  selectedAddons: readonly AddonId[]
): PricingEstimate {
  const tier = getTierById(tierId);
  const cleanIds = sanitizeSelectedAddons(tier.id, selectedAddons);
  const activeAddons = PRICING_ADDONS.filter((addon) => cleanIds.includes(addon.id));

  const addonsTotalUsd = activeAddons.reduce((sum, item) => sum + item.priceUsd, 0);

  let effectiveExtraWeeks = 0;
  if (activeAddons.length === 1) {
    effectiveExtraWeeks = activeAddons[0].extraWeeks;
  } else if (activeAddons.length > 1) {
    const rawExtraWeeks = activeAddons.reduce((sum, item) => sum + item.extraWeeks, 0);
    const maxSingleAddonWeeks = Math.max(...activeAddons.map((item) => item.extraWeeks));
    effectiveExtraWeeks = Math.max(maxSingleAddonWeeks, Math.ceil(rawExtraWeeks * 0.75));
  }

  return {
    tier,
    activeAddons,
    totalUsd: tier.baseUsd + addonsTotalUsd,
    minWeeks: tier.minWeeks + effectiveExtraWeeks,
    maxWeeks: tier.maxWeeks + effectiveExtraWeeks,
  };
}

export function formatMoney(usdAmount: number, currency: CurrencyCode, isRtl: boolean): string {
  const { rate } = CURRENCY_RATES[currency];
  const converted = Math.round((usdAmount * rate) / 10) * 10;
  const formatted = converted.toLocaleString('en-US');
  if (currency === 'USD') {
    return `$${formatted}`;
  }
  return isRtl ? `${formatted} ر.س` : `${formatted} SAR`;
}

export interface WhatsAppQuoteParams {
  tierName: string;
  addonLabels: string[];
  formattedPrice: string;
  timelineText: string;
  isRtl: boolean;
}

export function buildPricingWhatsAppUrl({
  tierName,
  addonLabels,
  formattedPrice,
  timelineText,
  isRtl,
}: WhatsAppQuoteParams): string {
  const message = isRtl
    ? [
        'أهلاً محمد، شفت صفحة الأسعار وأرغب بطلب عرض سعر:',
        `• الباقة: ${tierName}`,
        `• الإضافات: ${addonLabels.length > 0 ? addonLabels.join('، ') : 'بدون إضافات'}`,
        `• التكلفة التقديرية: يبدأ من ${formattedPrice}`,
        `• المدة المتوقعة: ${timelineText}`,
      ].join('\n')
    : [
        'Hi Mohamed, I reviewed your pricing page and would like a quote:',
        `• Package: ${tierName}`,
        `• Add-ons: ${addonLabels.length > 0 ? addonLabels.join(', ') : 'None'}`,
        `• Estimated Cost: Starting from ${formattedPrice}`,
        `• Estimated Timeline: ${timelineText}`,
      ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildDirectConsultationWhatsAppUrl(isRtl: boolean): string {
  const message = isRtl
    ? 'أهلاً محمد، عندي متطلبات خاصة لمتجر/نظام وأرغب بمناقشة المشروع معك.'
    : 'Hi Mohamed, my project has custom requirements and I would like to discuss it with you.';

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
