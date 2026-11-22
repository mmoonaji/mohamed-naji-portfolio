import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, test } from 'node:test';
import {
  buildDirectConsultationWhatsAppUrl,
  buildPricingWhatsAppUrl,
  calculatePricingEstimate,
  formatMoney,
  getAvailableAddonsForTier,
  isAddonIncludedInTier,
  PRICING_ADDONS,
  PRICING_TIERS,
  sanitizeSelectedAddons,
  WHATSAPP_NUMBER,
} from '../src/data/pricingConfig.ts';

describe('Pricing Config & Anti-Double-Counting Logic', () => {
  test('base tiers preserve expected prices and durations', () => {
    const starter = PRICING_TIERS.find((t) => t.id === 'starter');
    const growth = PRICING_TIERS.find((t) => t.id === 'growth');
    const ecosystem = PRICING_TIERS.find((t) => t.id === 'ecosystem');

    assert.equal(starter?.baseUsd, 650);
    assert.deepEqual([starter?.minWeeks, starter?.maxWeeks], [2, 3]);

    assert.equal(growth?.baseUsd, 1250);
    assert.deepEqual([growth?.minWeeks, growth?.maxWeeks], [3, 4]);
    assert.equal(growth?.recommended, true);

    assert.equal(ecosystem?.baseUsd, 2200);
    assert.deepEqual([ecosystem?.minWeeks, ecosystem?.maxWeeks], [5, 7]);
  });

  test('ecosystem hides included capabilities from paid add-ons', () => {
    const available = getAvailableAddonsForTier('ecosystem').map((a) => a.id);
    assert.deepEqual(available, ['bilingual', 'catalogSetup']);

    assert.equal(isAddonIncludedInTier('ecosystem', 'androidApp'), true);
    assert.equal(isAddonIncludedInTier('ecosystem', 'aiAssistant'), true);
    assert.equal(isAddonIncludedInTier('ecosystem', 'multiBranchPos'), true);
    assert.equal(isAddonIncludedInTier('ecosystem', 'bilingual'), false);
  });

  test('starter and growth expose all 5 optional add-ons', () => {
    assert.equal(getAvailableAddonsForTier('starter').length, PRICING_ADDONS.length);
    assert.equal(getAvailableAddonsForTier('growth').length, PRICING_ADDONS.length);
  });

  test('sanitizeSelectedAddons strips included add-ons and duplicates', () => {
    const cleaned = sanitizeSelectedAddons('ecosystem', [
      'androidApp',
      'aiAssistant',
      'multiBranchPos',
      'bilingual',
      'bilingual',
    ]);
    assert.deepEqual(cleaned, ['bilingual']);
  });

  test('calculatePricingEstimate never double-charges ecosystem included features', () => {
    const estimate = calculatePricingEstimate('ecosystem', [
      'androidApp',
      'aiAssistant',
      'multiBranchPos',
      'bilingual',
    ]);

    assert.equal(estimate.totalUsd, 2200 + 250);
    assert.deepEqual(
      estimate.activeAddons.map((a) => a.id),
      ['bilingual']
    );
    assert.equal(estimate.minWeeks, 6);
    assert.equal(estimate.maxWeeks, 8);
  });

  test('calculatePricingEstimate applies parallel timeline compression for multiple add-ons', () => {
    // Growth (3-4w) + 4 single-week add-ons (raw +4w) => ceil(4 * 0.75) = +3w => 6-7w instead of naive 7-8w
    const estimate = calculatePricingEstimate('growth', [
      'androidApp',
      'aiAssistant',
      'bilingual',
      'catalogSetup',
    ]);

    assert.equal(estimate.totalUsd, 1250 + 450 + 350 + 250 + 150);
    assert.equal(estimate.minWeeks, 6);
    assert.equal(estimate.maxWeeks, 7);
  });
});

describe('Currency Formatting & WhatsApp Quote Links', () => {
  test('formatMoney formats USD and SAR properly in RTL and LTR', () => {
    assert.equal(formatMoney(1250, 'USD', true), '$1,250');
    assert.equal(formatMoney(1250, 'SAR', true), '4,690 ر.س');
    assert.equal(formatMoney(1250, 'SAR', false), '4,690 SAR');
  });

  test('buildPricingWhatsAppUrl builds valid URL using site WhatsApp number and selections', () => {
    const url = buildPricingWhatsAppUrl({
      tierName: 'النمو',
      addonLabels: ['تطبيق أندرويد', 'مساعد ذكي للعملاء'],
      formattedPrice: '$2,050',
      timelineText: 'من 5 إلى 6 أسابيع',
      isRtl: true,
    });

    assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`));
    const decoded = decodeURIComponent(url.split('?text=')[1]);
    assert.match(decoded, /النمو/);
    assert.match(decoded, /تطبيق أندرويد، مساعد ذكي للعملاء/);
    assert.match(decoded, /\$2,050/);
    assert.match(decoded, /من 5 إلى 6 أسابيع/);
  });

  test('buildDirectConsultationWhatsAppUrl uses real site WhatsApp number', () => {
    const arUrl = buildDirectConsultationWhatsAppUrl(true);
    const enUrl = buildDirectConsultationWhatsAppUrl(false);

    assert.ok(arUrl.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`));
    assert.ok(enUrl.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`));
  });
});

describe('Localization Sync & Single Source of Truth', () => {
  test('ar.json and en.json have identical pricing key structure', () => {
    const ar = JSON.parse(
      readFileSync(new URL('../src/locales/ar.json', import.meta.url), 'utf8')
    );
    const en = JSON.parse(
      readFileSync(new URL('../src/locales/en.json', import.meta.url), 'utf8')
    );

    const collectKeys = (obj: unknown, prefix = ''): string[] => {
      if (Array.isArray(obj)) {
        return [`${prefix}[${obj.length}]`];
      }
      if (obj && typeof obj === 'object') {
        return Object.keys(obj as Record<string, unknown>)
          .sort()
          .flatMap((key) =>
            collectKeys((obj as Record<string, unknown>)[key], prefix ? `${prefix}.${key}` : key)
          );
      }
      return [prefix];
    };

    assert.deepEqual(collectKeys(ar.pricing), collectKeys(en.pricing));
  });
});
