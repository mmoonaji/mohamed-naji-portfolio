import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type AddonId,
  type CurrencyCode,
  formatMoney,
  PRICING_ADDONS,
  PRICING_TIERS,
  type TierId,
  WHATSAPP_NUMBER,
} from '../data/pricingConfig';

const INCLUDED_BY_TIER: Record<TierId, AddonId[]> = {
  starter: [],
  growth: [],
  ecosystem: ['androidApp', 'aiAssistant', 'multiBranchPos'],
};

export function Pricing() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const BackChevron = isRtl ? ChevronRight : ChevronLeft;

  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selectedTier, setSelectedTier] = useState<TierId>('growth');
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectTier = (tierId: TierId) => {
    setSelectedTier(tierId);
    const included = INCLUDED_BY_TIER[tierId];
    if (included.length > 0) {
      setSelectedAddons((prev) => prev.filter((id) => !included.includes(id)));
    }
  };

  const toggleAddon = (addonId: AddonId) => {
    if (INCLUDED_BY_TIER[selectedTier].includes(addonId)) return;
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const estimate = useMemo(() => {
    const tier = PRICING_TIERS.find((item) => item.id === selectedTier) ?? PRICING_TIERS[1];
    const activeAddons = PRICING_ADDONS.filter(
      (addon) => selectedAddons.includes(addon.id) && !INCLUDED_BY_TIER[selectedTier].includes(addon.id)
    );

    const addonsTotalUsd = activeAddons.reduce((sum, item) => sum + item.priceUsd, 0);
    const extraWeeks = activeAddons.reduce((sum, item) => sum + item.extraWeeks, 0);
    const extraInfraUsd = activeAddons.reduce((sum, item) => sum + (item.extraMonthlyInfraUsd ?? 0), 0);

    return {
      tier,
      activeAddons,
      totalUsd: tier.baseUsd + addonsTotalUsd,
      minWeeks: tier.minWeeks + extraWeeks,
      maxWeeks: tier.maxWeeks + extraWeeks,
      infraMinUsd: tier.monthlyInfraMinUsd + extraInfraUsd,
      infraMaxUsd: tier.monthlyInfraMaxUsd + extraInfraUsd,
    };
  }, [selectedTier, selectedAddons]);

  const whatsappUrl = useMemo(() => {
    const tierName = t(`pricing.tiers.${selectedTier}.name`);
    const addonLabels = estimate.activeAddons.map((a) => t(`pricing.addons.items.${a.id}.title`));
    const estimatedPrice = formatMoney(estimate.totalUsd, currency, isRtl);
    const timeline = `${estimate.minWeeks}–${estimate.maxWeeks} ${t('pricing.estimator.weeksUnit')}`;

    const message = isRtl
      ? [
          `أهلاً محمد، شفت صفحة التسعير وأبغى نتفق على تنفيذ متجر:`,
          `• الباقة: ${tierName}`,
          `• الإضافات: ${addonLabels.length > 0 ? addonLabels.join('، ') : 'بدون إضافات'}`,
          `• التقدير المبدئي: يبدأ من ${estimatedPrice}`,
          `• المدة المتوقعة: ${timeline}`,
        ].join('\n')
      : [
          `Hi Mohamed, I used your pricing estimator and want to discuss a store build:`,
          `• Package: ${tierName}`,
          `• Add-ons: ${addonLabels.length > 0 ? addonLabels.join(', ') : 'None'}`,
          `• Estimated Build: Starting from ${estimatedPrice}`,
          `• Timeline: ${timeline}`,
        ].join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [selectedTier, estimate, currency, isRtl, t]);

  const activeFeatures = t(`pricing.tiers.${selectedTier}.features`, {
    returnObjects: true,
  }) as string[];

  const infraItems = t('pricing.infra.items', { returnObjects: true }) as Array<{
    service: string;
    role: string;
    cost: string;
  }>;

  const comparisonItems = t('pricing.comparison.items', { returnObjects: true }) as Array<{
    aspect: string;
    custom: string;
    platforms: string;
  }>;

  const guarantees = t('pricing.guarantees.items', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <div className="min-h-screen pb-28 sm:pb-32">
      {/* iOS Translucent Sticky Navigation Bar */}
      <nav
        className="sticky top-0 z-30 bg-app-bg/80 backdrop-blur-xl border-b border-app-border"
        aria-label="Pricing navigation"
      >
        <div className="max-w-[640px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-0.5 min-h-[44px] py-2 text-sm font-medium text-app-accent hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              <BackChevron className="size-4 shrink-0" aria-hidden="true" />
              <span>{t('pricing.backHome')}</span>
            </Link>
            <span className="text-app-border text-xs" aria-hidden="true">|</span>
            <Link
              to="/case-study/jouda-food"
              className="inline-flex items-center min-h-[44px] py-2 text-xs sm:text-sm text-app-muted hover:text-app-text truncate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              {t('pricing.viewJoudaCase')}
            </Link>
          </div>

          {/* iOS Segmented Currency Switch */}
          <div
            className="inline-flex items-center rounded-[10px] bg-app-tertiary p-0.5 shrink-0"
            role="group"
            aria-label={t('pricing.currencyLabel')}
          >
            {(['USD', 'SAR'] as CurrencyCode[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                aria-pressed={currency === code}
                className={`min-h-[34px] px-2.5 py-1 rounded-[8px] text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent ${
                  currency === code
                    ? 'bg-app-card text-app-text shadow-sm'
                    : 'text-app-muted hover:text-app-text'
                }`}
              >
                {code === 'USD' ? 'USD' : isRtl ? 'ر.س' : 'SAR'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[640px] mx-auto px-4 pt-6 sm:px-6 sm:pt-10 space-y-8">
        {/* iOS Large Title */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-2"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-app-text leading-snug text-balance">
            {t('pricing.title')}
          </h1>
          <p className="text-sm sm:text-base text-app-muted leading-relaxed text-pretty">
            {t('pricing.subtitle')}
          </p>
        </motion.header>

        {/* 1. iOS Segmented Package Switcher */}
        <section aria-label={t('pricing.estimator.step1')} className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-app-muted">
            <span className="font-semibold uppercase tracking-wider">{t('pricing.estimator.step1')}</span>
            <span className="tabular-nums">
              {t('pricing.deliveryLabel')}: {estimate.tier.minWeeks}–{estimate.tier.maxWeeks}{' '}
              {t('pricing.estimator.weeksUnit')}
            </span>
          </div>

          <div
            className="grid grid-cols-3 gap-1 p-1 rounded-[14px] bg-app-tertiary"
            role="radiogroup"
            aria-label={t('pricing.estimator.step1')}
          >
            {PRICING_TIERS.map((tier) => {
              const active = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => handleSelectTier(tier.id)}
                  className={`flex flex-col items-center justify-center min-h-[60px] px-2 py-2 rounded-[10px] text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent ${
                    active
                      ? 'bg-app-card text-app-text shadow-sm'
                      : 'text-app-muted hover:text-app-text'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs sm:text-sm font-semibold leading-tight">
                      {t(`pricing.tiers.${tier.id}.shortName`)}
                    </span>
                    {tier.recommended && (
                      <span className="text-xs font-medium text-app-accent leading-none">•</span>
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium tabular-nums pt-0.5 ${
                      active ? 'text-app-accent' : 'text-app-muted'
                    }`}
                  >
                    {formatMoney(tier.baseUsd, currency, isRtl)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Package Inset Card */}
          <div className="rounded-2xl bg-app-card border border-app-border p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-app-muted leading-relaxed">
                {t(`pricing.tiers.${selectedTier}.audience`)}
              </p>
              {estimate.tier.recommended && (
                <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-app-accent/15 text-app-accent text-xs font-medium">
                  {t('pricing.recommendedBadge')}
                </span>
              )}
            </div>

            <ul className="divide-y divide-app-border/60 text-sm text-app-text">
              {activeFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 py-2.5 first:pt-1 last:pb-0">
                  <Check className="size-4 text-app-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. Optional Add-ons with iOS Toggle Switches */}
        <section aria-label={t('pricing.estimator.step2')} className="space-y-2.5">
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-app-muted">
            {t('pricing.estimator.step2')}
          </h2>

          <div className="rounded-2xl bg-app-card border border-app-border divide-y divide-app-border overflow-hidden">
            {PRICING_ADDONS.map((addon) => {
              const included = INCLUDED_BY_TIER[selectedTier].includes(addon.id);
              const checked = included || selectedAddons.includes(addon.id);

              return (
                <button
                  key={addon.id}
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  disabled={included}
                  onClick={() => toggleAddon(addon.id)}
                  className={`w-full min-h-[60px] px-4 py-3.5 sm:px-5 flex items-center justify-between gap-4 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-accent ${
                    included
                      ? 'opacity-70 cursor-default'
                      : 'cursor-pointer hover:bg-app-tertiary/30 active:bg-app-tertiary/60'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm font-medium text-app-text leading-snug">
                        {t(`pricing.addons.items.${addon.id}.title`)}
                      </span>
                      <span className="text-xs font-medium text-app-accent tabular-nums">
                        {included
                          ? t('pricing.includedBadge')
                          : `+${formatMoney(addon.priceUsd, currency, isRtl)}`}
                      </span>
                    </div>
                    <p className="text-xs text-app-muted leading-relaxed">
                      {t(`pricing.addons.items.${addon.id}.desc`)}
                    </p>
                  </div>

                  {/* Authentic iOS Toggle Switch */}
                  <span
                    aria-hidden="true"
                    className={`relative inline-flex shrink-0 items-center w-[51px] h-[31px] rounded-full p-[2px] transition-colors duration-200 ${
                      checked ? 'bg-app-green' : 'bg-app-tertiary'
                    }`}
                  >
                    <span
                      className={`size-[27px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        checked
                          ? 'ltr:translate-x-[20px] rtl:-translate-x-[20px]'
                          : 'translate-x-0'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Live Summary Card + Prominent iOS Blue Action Button */}
        <section aria-label="Estimate summary" className="rounded-2xl bg-app-card border border-app-border p-4 sm:p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-app-muted">{t('pricing.estimator.buildTotal')}</div>
              <div className="text-3xl font-semibold tracking-tight text-app-text tabular-nums">
                {t('pricing.startingFrom')} {formatMoney(estimate.totalUsd, currency, isRtl)}
              </div>
            </div>

            <div className="flex items-center gap-5 text-xs text-app-muted tabular-nums">
              <div>
                <span className="block opacity-80">{t('pricing.estimator.timelineLabel')}</span>
                <span className="text-sm font-medium text-app-text">
                  {estimate.minWeeks}–{estimate.maxWeeks} {t('pricing.estimator.weeksUnit')}
                </span>
              </div>
              <div className="h-6 w-px bg-app-border" aria-hidden="true" />
              <div>
                <span className="block opacity-80">{t('pricing.estimator.infraLabel')}</span>
                <span className="text-sm font-medium text-app-text">
                  ~${estimate.infraMinUsd}–${estimate.infraMaxUsd}/{t('pricing.estimator.monthUnit')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] bg-app-accent-solid text-white text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              <span>{t('pricing.estimator.whatsappCta')}</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <p className="text-xs text-app-muted text-center leading-relaxed">
              {t('pricing.estimator.reassurance')}
            </p>
          </div>
        </section>

        {/* 4. Inset Grouped Disclosures (Infra, Comparison, Warranty) */}
        <section aria-label="Details" className="rounded-2xl bg-app-card border border-app-border divide-y divide-app-border overflow-hidden">
          <details className="group">
            <summary className="flex items-center justify-between gap-4 min-h-[52px] px-4 py-3.5 sm:px-5 text-sm font-medium text-app-text cursor-pointer list-none select-none hover:bg-app-tertiary/30 transition-colors">
              <span>{t('pricing.infra.title')}</span>
              <ChevronDown
                className="size-4 text-app-muted shrink-0 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3 border-t border-app-border/60 pt-3">
              <p className="text-xs sm:text-sm text-app-muted leading-relaxed">
                {t('pricing.infra.subtitle')}
              </p>
              <div className="divide-y divide-app-border/60">
                {infraItems.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-start justify-between gap-4 text-sm">
                    <div className="space-y-0.5">
                      <div className="text-app-text font-medium text-xs sm:text-sm">
                        {item.service}
                      </div>
                      <div className="text-xs text-app-muted">{item.role}</div>
                    </div>
                    <span className="shrink-0 text-xs sm:text-sm font-medium text-app-text tabular-nums">
                      {item.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between gap-4 min-h-[52px] px-4 py-3.5 sm:px-5 text-sm font-medium text-app-text cursor-pointer list-none select-none hover:bg-app-tertiary/30 transition-colors">
              <span>{t('pricing.comparison.title')}</span>
              <ChevronDown
                className="size-4 text-app-muted shrink-0 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 divide-y divide-app-border/60 border-t border-app-border/60">
              {comparisonItems.map((row, idx) => (
                <div key={idx} className="py-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="font-medium text-app-text">{row.aspect}</div>
                  <div className="text-app-text">
                    <span className="text-app-accent font-medium">{t('pricing.comparison.customLabel')}: </span>
                    {row.custom}
                  </div>
                  <div className="text-app-muted">
                    <span>{t('pricing.comparison.platformsLabel')}: </span>
                    {row.platforms}
                  </div>
                </div>
              ))}
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between gap-4 min-h-[52px] px-4 py-3.5 sm:px-5 text-sm font-medium text-app-text cursor-pointer list-none select-none hover:bg-app-tertiary/30 transition-colors">
              <span>{t('pricing.guarantees.title')}</span>
              <ChevronDown
                className="size-4 text-app-muted shrink-0 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3 border-t border-app-border/60 pt-3">
              {guarantees.map((item, idx) => (
                <div key={idx} className="space-y-0.5 text-xs sm:text-sm">
                  <div className="font-medium text-app-text">{item.title}</div>
                  <p className="text-app-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </details>
        </section>
      </main>
    </div>
  );
}
