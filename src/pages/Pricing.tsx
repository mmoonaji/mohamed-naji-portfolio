import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type AddonId,
  buildDirectConsultationWhatsAppUrl,
  buildPricingWhatsAppUrl,
  calculatePricingEstimate,
  type CurrencyCode,
  formatMoney,
  getAvailableAddonsForTier,
  getTierById,
  PRICING_TIERS,
  sanitizeSelectedAddons,
  type TierId,
} from '../data/pricingConfig';

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
    setSelectedAddons((prev) => sanitizeSelectedAddons(tierId, prev));
  };

  const handleCardSelect = (tierId: TierId) => {
    handleSelectTier(tierId);
    const calculator = document.getElementById('pricing-calculator');
    if (calculator) {
      calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleAddon = (addonId: AddonId) => {
    setSelectedAddons((prev) => {
      const next = prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId];
      return sanitizeSelectedAddons(selectedTier, next);
    });
  };

  const activeTierConfig = useMemo(() => getTierById(selectedTier), [selectedTier]);
  const availableAddons = useMemo(() => getAvailableAddonsForTier(selectedTier), [selectedTier]);

  const estimate = useMemo(
    () => calculatePricingEstimate(selectedTier, selectedAddons),
    [selectedTier, selectedAddons]
  );

  const formatAddonWeeks = (weeks: number): string => {
    if (weeks === 1) return t('pricing.weeksCountOne');
    if (weeks === 2) return t('pricing.weeksCountTwo');
    return t('pricing.weeksCountPlural', { count: weeks });
  };

  const getAddonTitle = (addonId: AddonId, productLimit?: number): string => {
    if (addonId === 'catalogSetup' && productLimit !== undefined) {
      return t(`pricing.addons.items.${addonId}.title`, { count: productLimit });
    }
    return t(`pricing.addons.items.${addonId}.title`);
  };

  const whatsappQuoteUrl = useMemo(() => {
    const tierName = t(`pricing.tiers.${selectedTier}.name`);
    const addonLabels = estimate.activeAddons.map((addon) =>
      getAddonTitle(addon.id, addon.productLimit)
    );
    const formattedPrice = formatMoney(estimate.totalUsd, currency, isRtl);
    const timelineText = t('pricing.weeksRangeLabel', {
      min: estimate.minWeeks,
      max: estimate.maxWeeks,
    });

    return buildPricingWhatsAppUrl({
      tierName,
      addonLabels,
      formattedPrice,
      timelineText,
      isRtl,
    });
  }, [selectedTier, estimate, currency, isRtl, t]);

  const directConsultationUrl = useMemo(
    () => buildDirectConsultationWhatsAppUrl(isRtl),
    [isRtl]
  );

  const faqItems = t('pricing.faq.items', { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;

  return (
    <div className="min-h-screen pb-28 sm:pb-32">
      {/* iOS Translucent Sticky Navigation Bar */}
      <nav
        className="sticky top-0 z-30 bg-app-bg/80 backdrop-blur-xl border-b border-app-border"
        aria-label="Pricing navigation"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
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

      <main className="max-w-4xl mx-auto px-4 pt-8 sm:px-6 sm:pt-12 space-y-12 sm:space-y-16">
        {/* 1. Clear Title & Concise Subtitle */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-2.5 max-w-2xl"
        >
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-app-text leading-snug text-balance">
            {t('pricing.title')}
          </h1>
          <p className="text-sm sm:text-base text-app-muted leading-relaxed text-pretty">
            {t('pricing.subtitle')}
          </p>
        </motion.header>

        {/* 2. Three Package Cards */}
        <section aria-labelledby="tiers-heading" className="space-y-4">
          <h2 id="tiers-heading" className="px-1 text-xs font-semibold uppercase tracking-wider text-app-muted">
            {t('pricing.tiersSectionTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {PRICING_TIERS.map((tier) => {
              const features = t(`pricing.tiers.${tier.id}.features`, {
                returnObjects: true,
              }) as string[];
              const isRecommended = Boolean(tier.recommended);
              const isActiveInCalc = selectedTier === tier.id;

              return (
                <article
                  key={tier.id}
                  className={`flex flex-col justify-between rounded-2xl p-5 sm:p-6 border transition-colors ${
                    isRecommended
                      ? 'bg-app-card border-app-accent ring-1 ring-app-accent/30'
                      : isActiveInCalc
                      ? 'bg-app-card border-app-muted/60'
                      : 'bg-app-card border-app-border'
                  }`}
                >
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2 min-h-[26px]">
                        <h3 className="text-lg font-semibold text-app-text">
                          {t(`pricing.tiers.${tier.id}.name`)}
                        </h3>
                        {isRecommended && (
                          <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-app-accent/15 text-app-accent text-xs font-medium">
                            {t('pricing.recommendedBadge')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-app-muted leading-relaxed text-pretty">
                        {t(`pricing.tiers.${tier.id}.description`)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-app-border space-y-1">
                      <div className="text-xs text-app-muted">{t('pricing.startingFrom')}</div>
                      <div className="text-2xl sm:text-3xl font-semibold text-app-text tracking-tight tabular-nums">
                        {formatMoney(tier.baseUsd, currency, isRtl)}
                      </div>
                      <div className="text-xs text-app-muted tabular-nums">
                        {t('pricing.weeksRangeLabel', {
                          min: tier.minWeeks,
                          max: tier.maxWeeks,
                        })}
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm text-app-text">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="size-4 text-app-accent shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="leading-snug text-pretty">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCardSelect(tier.id)}
                    className={`mt-6 w-full min-h-[46px] px-4 py-2.5 rounded-[14px] text-sm font-semibold transition-all cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent ${
                      isRecommended
                        ? 'bg-app-accent-solid text-white hover:opacity-90'
                        : 'bg-app-tertiary text-app-text hover:bg-app-tertiary/80'
                    }`}
                  >
                    {t(`pricing.tiers.${tier.id}.cta`)}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. Cost & Add-ons Calculator */}
        <section
          id="pricing-calculator"
          aria-labelledby="calculator-heading"
          className="scroll-mt-20 space-y-5"
        >
          <div className="space-y-1.5 max-w-2xl">
            <h2 id="calculator-heading" className="text-xl sm:text-2xl font-semibold text-app-text">
              {t('pricing.estimator.title')}
            </h2>
            <p className="text-sm text-app-muted leading-relaxed text-pretty">
              {t('pricing.estimator.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Step 1 & Step 2 Controls */}
            <div className="lg:col-span-7 space-y-5">
              {/* Step 1: Base Package Picker */}
              <div className="space-y-2">
                <span className="block px-1 text-xs font-semibold uppercase tracking-wider text-app-muted">
                  {t('pricing.estimator.step1')}
                </span>
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
                        className={`flex flex-col items-center justify-center min-h-[58px] px-2 py-2 rounded-[10px] text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent ${
                          active
                            ? 'bg-app-card text-app-text shadow-sm'
                            : 'text-app-muted hover:text-app-text'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold leading-tight">
                          {t(`pricing.tiers.${tier.id}.name`)}
                        </span>
                        <span
                          className={`text-xs font-medium tabular-nums pt-0.5 ${
                            active ? 'text-app-accent' : 'text-app-muted'
                          }`}
                        >
                          {formatMoney(tier.baseUsd, currency, isRtl)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Eligible Optional Add-ons Only */}
              <div className="space-y-2">
                <span className="block px-1 text-xs font-semibold uppercase tracking-wider text-app-muted">
                  {t('pricing.estimator.step2')}
                </span>

                {activeTierConfig.includedAddons.length > 0 && (
                  <p className="px-1 text-xs text-app-muted leading-relaxed">
                    <span className="text-app-text font-medium">
                      {t('pricing.estimator.includedNote', {
                        tierName: t(`pricing.tiers.${selectedTier}.name`),
                      })}{' '}
                    </span>
                    {activeTierConfig.includedAddons
                      .map((id) => getAddonTitle(id))
                      .join(isRtl ? '، ' : ', ')}
                  </p>
                )}

                <div className="rounded-2xl bg-app-card border border-app-border divide-y divide-app-border overflow-hidden">
                  {availableAddons.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);

                    return (
                      <button
                        key={addon.id}
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        onClick={() => toggleAddon(addon.id)}
                        className="w-full min-h-[60px] px-4 py-3.5 sm:px-5 flex items-center justify-between gap-4 text-start cursor-pointer hover:bg-app-tertiary/30 active:bg-app-tertiary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-accent"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="text-sm font-medium text-app-text leading-snug">
                              {getAddonTitle(addon.id, addon.productLimit)}
                            </span>
                            <span className="text-xs font-medium text-app-accent tabular-nums">
                              +{formatMoney(addon.priceUsd, currency, isRtl)} · +{formatAddonWeeks(addon.extraWeeks)}
                            </span>
                          </div>
                          <p className="text-xs text-app-muted leading-relaxed">
                            {t(`pricing.addons.items.${addon.id}.desc`)}
                          </p>
                        </div>

                        {/* Authentic iOS Switch */}
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
              </div>
            </div>

            {/* Summary Panel */}
            <aside
              aria-label={t('pricing.estimator.summaryTitle')}
              className="lg:col-span-5 lg:sticky lg:top-20 rounded-2xl bg-app-card border border-app-border p-5 sm:p-6 space-y-5"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-app-muted">
                {t('pricing.estimator.summaryTitle')}
              </div>

              <div className="space-y-1 pb-4 border-b border-app-border">
                <div className="text-xs text-app-muted">{t('pricing.estimator.buildTotal')}</div>
                <div className="text-3xl font-semibold tracking-tight text-app-text tabular-nums">
                  {t('pricing.startingFrom')} {formatMoney(estimate.totalUsd, currency, isRtl)}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="text-xs text-app-muted">{t('pricing.estimator.timelineLabel')}</div>
                <div className="font-medium text-app-text tabular-nums">
                  {t('pricing.estimator.timelineRange', {
                    min: estimate.minWeeks,
                    max: estimate.maxWeeks,
                  })}
                </div>
              </div>

              <p className="text-xs text-app-muted leading-relaxed">
                {t('pricing.estimator.disclaimer')}
              </p>

              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[50px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] bg-app-accent-solid text-white text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
              >
                <span>{t('pricing.estimator.whatsappCta')}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </aside>
          </div>
        </section>

        {/* 4. Simplified FAQ (3 Concise Questions) */}
        <section aria-labelledby="faq-heading" className="space-y-3">
          <h2 id="faq-heading" className="px-1 text-xs font-semibold uppercase tracking-wider text-app-muted">
            {t('pricing.faq.title')}
          </h2>

          <div className="rounded-2xl bg-app-card border border-app-border divide-y divide-app-border">
            {faqItems.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 space-y-1.5">
                <h3 className="text-sm sm:text-base font-medium text-app-text">{item.q}</h3>
                <p className="text-xs sm:text-sm text-app-muted leading-relaxed text-pretty">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Final Consultation CTA */}
        <section
          aria-labelledby="final-cta-heading"
          className="rounded-2xl bg-app-card border border-app-border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <h2 id="final-cta-heading" className="text-base sm:text-lg font-semibold text-app-text">
              {t('pricing.finalCta.title')}
            </h2>
            <p className="text-sm text-app-muted leading-relaxed text-pretty">
              {t('pricing.finalCta.subtitle')}
            </p>
          </div>

          <a
            href={directConsultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 shrink-0 min-h-[48px] px-5 py-2.5 rounded-[14px] bg-app-accent-solid text-white text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
          >
            <span>{t('pricing.finalCta.button')}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </section>
      </main>
    </div>
  );
}
