import { describe, expect, it } from 'vitest';
import snapshot from '../data/priceCatalog.snapshot.json';
import {
  calculateShipmentPrice,
  calculateVolume,
} from './calculateShipmentPrice';
import {
  calculatePrice,
  categoryOptions,
  findCategory,
  findSubCategory,
  findVariant,
  isPriceCatalog,
  priceDirection,
  pricingFor,
  sizeOptions,
  specificationOptions,
  subCategoryOptions,
  type Category,
  type FixedPricing,
  type MeasuredPricing,
  type PriceCatalog,
  type Pricing,
  type Variant,
} from './priceCatalog';
import en from './i18n/locales/en/en.json';
import lt from './i18n/locales/lt/lt.json';
import ru from './i18n/locales/ru/ru.json';

const catalog = snapshot as PriceCatalog;

const pricingOf = (category: string, subCategory?: string): Pricing => {
  const c = findCategory(catalog, category);
  const pricing = pricingFor(c, findSubCategory(c, subCategory));
  if (!pricing) throw new Error(`No pricing for ${category}/${subCategory}`);
  return pricing;
};

const values = (options: { value: string }[]) => options.map((o) => o.value);

const variant = (
  size: string | null,
  specification: string | null,
  ukLt: number,
  ltUk: number
): Variant => ({
  sheet: { type: '', size: size ?? '', spec: specification ?? '' },
  size: size ? { value: size, label: size } : null,
  specification: specification
    ? { value: specification, label: specification }
    : null,
  volume: 0.5,
  weight: 20,
  price: { 'UK-LT': ukLt, 'LT-UK': ltUk },
});

const fixed: FixedPricing = {
  type: 'fixed',
  variants: [
    variant('small', 'a', 10, 12),
    variant('small', 'b', 20, 24),
    variant('big', 'a', 30, 36),
  ],
};

describe('priceDirection', () => {
  it('prices shipments with address as UK-LT', () => {
    expect(priceDirection('shipmentWithAddressService', 'LT-UK')).toBe('UK-LT');
  });

  it('uses the chosen direction otherwise', () => {
    expect(priceDirection('anyOtherService', 'LT-UK')).toBe('LT-UK');
    expect(priceDirection('anyOtherService', 'UK-LT')).toBe('UK-LT');
  });

  it('prices an unset or LT-LT direction as UK-LT', () => {
    expect(priceDirection('anyOtherService', null)).toBe('UK-LT');
    expect(priceDirection('anyOtherService', 'LT-LT')).toBe('UK-LT');
  });
});

describe('options', () => {
  it('orders categories by `order`', () => {
    const shuffled: PriceCatalog = {
      categories: [...catalog.categories].reverse(),
    };
    expect(values(categoryOptions(shuffled))).toEqual(
      [...catalog.categories]
        .sort((a, b) => a.order - b.order)
        .map((c) => c.value)
    );
    expect(categoryOptions(catalog)[0]).toEqual({
      value: 'shipments',
      label: 'shipments',
    });
  });

  it('has no sub categories for categories priced directly', () => {
    for (const value of ['shipments', 'removals', 'palettes', 'flatScreenTv']) {
      expect(subCategoryOptions(findCategory(catalog, value))).toEqual([]);
    }
    expect(subCategoryOptions(null)).toEqual([]);
  });

  it('keeps sub category array order', () => {
    expect(
      values(subCategoryOptions(findCategory(catalog, 'goodsForChildren')))
    ).toEqual(['childSeat', 'strollers']);
  });

  it('cascades sizes and specifications', () => {
    const wheels = pricingOf('automotiveGoods', 'setOfWheels');
    expect(values(sizeOptions(wheels))).toEqual([
      '<R16',
      '<R18',
      '<R22',
      '>R22',
    ]);
    expect(values(specificationOptions(wheels))).toEqual([
      'withoutTires',
      'withTires',
    ]);
    expect(values(specificationOptions(wheels, '<R18'))).toEqual([
      'withoutTires',
      'withTires',
    ]);
  });

  it('filters specifications by size', () => {
    const pricing: FixedPricing = {
      type: 'fixed',
      variants: [...fixed.variants, variant('big', 'c', 40, 48)],
    };
    expect(values(specificationOptions(pricing, 'small'))).toEqual(['a', 'b']);
    expect(values(specificationOptions(pricing, 'big'))).toEqual(['a', 'c']);
    expect(values(specificationOptions(pricing))).toEqual(['a', 'b', 'c']);
    // A single specification for the size is chosen silently.
    expect(specificationOptions(fixed, 'big')).toEqual([]);
  });

  it('hides selects with fewer than two options', () => {
    expect(sizeOptions(pricingOf('householdAppliances', 'dishwasher'))).toEqual(
      []
    );
    const stove = pricingOf('householdAppliances', 'stove');
    expect(values(sizeOptions(stove))).toEqual([
      'built-in',
      'freestanding',
      'withBurners',
    ]);
    expect(specificationOptions(stove)).toEqual([]);
    expect(specificationOptions(stove, 'built-in')).toEqual([]);
    const engine = pricingOf('automotiveGoods', 'engine');
    expect(values(specificationOptions(engine, '<1000 cm3'))).toEqual([
      'empty',
      'full',
    ]);
    expect(specificationOptions(engine, 'no such size')).toEqual([]);
  });

  it('has no size options unless the pricing is fixed', () => {
    expect(sizeOptions(pricingOf('shipments'))).toEqual([]);
    expect(sizeOptions(pricingOf('palettes'))).toEqual([]);
    expect(specificationOptions(pricingOf('removals'))).toEqual([]);
    expect(sizeOptions(null)).toEqual([]);
  });

  it('returns plain {value, label} options', () => {
    expect(
      categoryOptions(catalog).every((o) => Object.keys(o).length === 2)
    ).toBe(true);
    expect(sizeOptions(fixed)).toEqual([
      { value: 'small', label: 'small' },
      { value: 'big', label: 'big' },
    ]);
  });
});

describe('pricingFor', () => {
  it('uses the category pricing when there are no sub categories', () => {
    const tv = findCategory(catalog, 'flatScreenTv');
    expect(pricingFor(tv, null)?.type).toBe('fixed');
  });

  it('needs a sub category when the category has them', () => {
    const appliances = findCategory(catalog, 'householdAppliances');
    expect(pricingFor(appliances, null)).toBeNull();
    expect(
      pricingFor(appliances, findSubCategory(appliances, 'fridge'))?.type
    ).toBe('measured');
    expect(findSubCategory(appliances, 'nope')).toBeNull();
    expect(findCategory(catalog, undefined)).toBeNull();
    expect(pricingFor(null, null)).toBeNull();
  });
});

describe('findVariant', () => {
  it('finds an exact match', () => {
    expect(findVariant(fixed, 'small', 'b')).toBe(fixed.variants[1]);
  });

  it('treats an empty selection as any when only one variant matches', () => {
    expect(findVariant(fixed, 'big', null)).toBe(fixed.variants[2]);
    expect(findVariant(fixed, null, 'b')).toBe(fixed.variants[1]);
    const dishwasher = pricingOf('householdAppliances', 'dishwasher');
    expect(findVariant(dishwasher)?.price['UK-LT']).toBe(55);
  });

  it('returns null when the selection is ambiguous or unknown', () => {
    expect(findVariant(fixed, 'small', null)).toBeNull();
    expect(findVariant(fixed, null, 'a')).toBeNull();
    expect(findVariant(fixed)).toBeNull();
    expect(findVariant(fixed, 'huge', 'a')).toBeNull();
    expect(findVariant(pricingOf('shipments'))).toBeNull();
  });
});

describe('calculatePrice', () => {
  it('multiplies the variant price for the direction by amount', () => {
    expect(
      calculatePrice(
        fixed,
        { size: 'small', specification: 'b', amount: 3 },
        'UK-LT'
      )
    ).toEqual({ price: 60, volume: 0.5, weight: 20 });
    expect(
      calculatePrice(
        fixed,
        { size: 'small', specification: 'b', amount: 3 },
        'LT-UK'
      )
    ).toEqual({ price: 72, volume: 0.5, weight: 20 });
  });

  it('gives 0 without a variant', () => {
    expect(
      calculatePrice(fixed, { size: 'small', amount: 1 }, 'UK-LT')
    ).toEqual({ price: 0, volume: null, weight: null });
  });

  it('prices snapshot variants', () => {
    const engine = pricingOf('automotiveGoods', 'engine');
    expect(
      calculatePrice(
        engine,
        { size: '<2000 cm3', specification: 'full', amount: 2 },
        'UK-LT'
      ).price
    ).toBe(440);
  });

  it('has no price for callManager', () => {
    expect(
      calculatePrice(pricingOf('palettes'), { amount: 4 }, 'UK-LT')
    ).toEqual({ price: null, volume: null, weight: null });
  });

  it('takes the larger of the weight and volume prices', () => {
    const shipments = pricingOf('shipments');
    // 0.06 m3 × 230 = 13.8 < 45 per parcel.
    expect(
      calculatePrice(
        shipments,
        { amount: 2, weight: 10, length: 30, width: 40, height: 50 },
        'UK-LT'
      )
    ).toEqual({ price: 90, volume: 0.06, weight: 10 });
    // 0.5 m3 × 205 = 102.5 > 45.
    expect(
      calculatePrice(
        shipments,
        { amount: 1, weight: 10, length: 100, width: 100, height: 50 },
        'UK-LT'
      ).price
    ).toBeCloseTo(102.5, 2);
  });

  it('prices each base from the input it has', () => {
    const shipments = pricingOf('shipments');
    const dims = { length: 50, width: 40, height: 30 };
    // Weight only: 20 kg → 50 per parcel.
    expect(
      calculatePrice(shipments, { amount: 1, weight: 20 }, 'UK-LT')
    ).toEqual({ price: 50, volume: null, weight: 20 });
    // Weight and an incomplete set of dimensions: priced by weight.
    expect(
      calculatePrice(
        shipments,
        { amount: 2, weight: 5, length: 50, width: 40, height: null },
        'UK-LT'
      )
    ).toEqual({ price: 90, volume: null, weight: 5 });
    // Dimensions only: 0.06 m3 × 230.
    const byVolume = calculatePrice(shipments, { amount: 1, ...dims }, 'UK-LT');
    expect(byVolume.price).toBeCloseTo(13.8, 2);
    expect(byVolume.weight).toBeNull();
    // A weight of 0 is priced at 0, the volume still counts.
    expect(
      calculatePrice(shipments, { amount: 1, weight: 0, ...dims }, 'UK-LT')
        .price
    ).toBeCloseTo(13.8, 2);
    // Removals have no weight base, so weight is not needed.
    expect(
      calculatePrice(
        pricingOf('removals'),
        { amount: 1, length: 100, width: 100, height: 50 },
        'UK-LT'
      ).price
    ).toBeCloseTo(100, 2);
  });

  it('gives 0 when no base has its input', () => {
    const shipments = pricingOf('shipments');
    expect(
      calculatePrice(
        shipments,
        { amount: 1, length: 50, width: null, height: 30 },
        'UK-LT'
      )
    ).toEqual({ price: 0, volume: null, weight: null });
    // The fridge is priced by volume only: a weight does not help.
    const appliances = findCategory(catalog, 'householdAppliances');
    const fridge = pricingFor(
      appliances,
      findSubCategory(appliances, 'fridge')
    ) as Pricing;
    expect(
      calculatePrice(
        fridge,
        { amount: 1, weight: 40, length: 60, width: 60, height: null },
        'UK-LT'
      ).price
    ).toBe(0);
  });

  it('uses the per-direction tier rate', () => {
    const pricing: Pricing = {
      type: 'measured',
      byWeight: [
        {
          sheet: { type: '', size: '', spec: '' },
          upTo: null,
          price: { 'UK-LT': 2, 'LT-UK': 3 },
          perUnit: true,
        },
      ],
      byVolume: null,
    };
    expect(calculatePrice(pricing, { amount: 2, weight: 10 }, 'UK-LT')).toEqual(
      { price: 40, volume: null, weight: 10 }
    );
    expect(
      calculatePrice(pricing, { amount: 2, weight: 10 }, 'LT-UK').price
    ).toBe(60);
  });

  it('treats tier limits as inclusive', () => {
    // The old code computed (0.4 × 0.4 × 1) = 0.16000000000000003 m3 here and
    // charged the next tier (220); 0.16 m3 is in the 230 tier.
    expect(
      calculatePrice(
        pricingOf('shipments'),
        { amount: 1, weight: 0, length: 40, width: 40, height: 100 },
        'UK-LT'
      ).price
    ).toBeCloseTo(0.16 * 230, 2);
  });
});

describe('parity with the old calculateShipmentPrice', () => {
  const shipments = pricingOf('shipments');
  const weights = [0, 0.5, 1, 15, 16, 30, 31];
  // Volumes at and around each tier limit: 0.16, 0.31, 0.47, 0.63 m3.
  const dimensions = [
    [40, 40, 99],
    [100, 100, 16],
    [40, 40, 101],
    [50, 62, 99],
    [50, 62, 100],
    [50, 62, 101],
    [50, 94, 99],
    [50, 94, 100],
    [50, 94, 101],
    [70, 90, 99],
    [70, 90, 100],
    [70, 90, 101],
    [100, 100, 100],
  ];

  for (const amount of [1, 2]) {
    for (const weight of weights) {
      for (const [length, width, height] of dimensions) {
        it(`${weight} kg, ${length}×${width}×${height} cm, ×${amount}`, () => {
          const old = calculateShipmentPrice({
            weight: String(weight),
            length: String(length),
            width: String(width),
            height: String(height),
            amount,
          });
          const result = calculatePrice(
            shipments,
            { amount, weight, length, width, height },
            'UK-LT'
          );
          expect(result.price).toBeCloseTo(Number(old.price), 2);
          expect(result.volume).toBeCloseTo(old.volume, 9);
        });
      }
    }
  }
});

describe('parity with the old calculateVolume', () => {
  const dimensions = [
    [50, 50, 50],
    [60, 70, 180],
    [100, 100, 100],
    [100, 100, 150],
    [100, 200, 100],
    [100, 100, 250],
    [100, 100, 300],
    [100, 100, 450],
    [100, 100, 500],
    [200, 200, 200],
    [200, 250, 200],
    [300, 300, 300],
  ];

  for (const [length, width, height] of dimensions) {
    for (const amount of [1, 3]) {
      const input = {
        length: String(length),
        width: String(width),
        height: String(height),
        amount,
      };
      const dims = { length, width, height, amount };

      it(`fridge ${length}×${width}×${height} cm, ×${amount}`, () => {
        const old = calculateVolume(input);
        const result = calculatePrice(
          pricingOf('householdAppliances', 'fridge'),
          dims,
          'UK-LT'
        );
        expect(result.price).toBeCloseTo(Number(old.price), 2);
      });

      it(`removals ${length}×${width}×${height} cm, ×${amount}`, () => {
        const old = calculateVolume({ ...input, categoryValue: 'removals' });
        const result = calculatePrice(pricingOf('removals'), dims, 'UK-LT');
        expect(result.price).toBeCloseTo(Number(old.price), 2);
        expect(result.volume).toBeCloseTo(old.volume, 9);
      });
    }
  }

  it('charges removals of 3–4 m3 at the spreadsheet rate of 160', () => {
    // Intentional change: the old code charged 150 for this band.
    const dims = { length: 100, width: 100, height: 350, amount: 1 };
    expect(
      calculatePrice(pricingOf('removals'), dims, 'UK-LT').price
    ).toBeCloseTo(3.5 * 160, 2);
    expect(
      Number(
        calculateVolume({
          length: '100',
          width: '100',
          height: '350',
          amount: 1,
          categoryValue: 'removals',
        }).price
      )
    ).toBeCloseTo(3.5 * 150, 2);
  });
});

describe('i18n', () => {
  // Literal labels such as "<R18" or ">4000 cm3" are shown as they are.
  const isLiteral = (label: string) => /^[<>]/.test(label);

  const labels = new Set<string>();
  const addPricing = (pricing: Pricing | null) => {
    if (pricing?.type !== 'fixed') return;
    pricing.variants.forEach((v) => {
      if (v.size) labels.add(v.size.label);
      if (v.specification) labels.add(v.specification.label);
    });
  };
  catalog.categories.forEach((category) => {
    labels.add(category.label);
    addPricing(category.pricing);
    category.subCategories.forEach((sub) => {
      labels.add(sub.label);
      addPricing(sub.pricing);
    });
  });
  const keys = [...labels].filter((label) => !isLiteral(label)).sort();

  it.each([
    ['en', en],
    ['lt', lt],
    ['ru', ru],
  ])('%s has every catalog label', (_, translations) => {
    expect(keys.filter((key) => !(key in translations))).toEqual([]);
  });
});

describe('isPriceCatalog', () => {
  const copy = () => structuredClone(snapshot) as unknown as PriceCatalog;

  it('accepts the snapshot', () => {
    expect(isPriceCatalog(snapshot)).toBe(true);
  });

  it('rejects answers the form cannot read', () => {
    expect(isPriceCatalog(null)).toBe(false);
    expect(isPriceCatalog({ data: 123 })).toBe(false);
    expect(isPriceCatalog('<html></html>')).toBe(false);
  });

  it('rejects an empty catalog', () => {
    expect(isPriceCatalog({ categories: [] })).toBe(false);
  });

  it('rejects a broken category, subcategory, variant or tier', () => {
    const noSubCategories = copy();
    delete (noSubCategories.categories[1] as Partial<Category>).subCategories;
    expect(isPriceCatalog(noSubCategories)).toBe(false);

    const unknownPricing = copy();
    unknownPricing.categories[1].subCategories[0].pricing = {
      type: 'other',
    } as unknown as Pricing;
    expect(isPriceCatalog(unknownPricing)).toBe(false);

    const noPrice = copy();
    const pricing = noPrice.categories[1].subCategories[0]
      .pricing as FixedPricing;
    (pricing.variants[0] as Partial<Variant>).price = undefined;
    expect(isPriceCatalog(noPrice)).toBe(false);

    const textTier = copy();
    const shipments = findCategory(textTier, 'shipments')!
      .pricing as MeasuredPricing;
    (shipments.byWeight![0] as unknown as { upTo: string }).upTo = '1';
    expect(isPriceCatalog(textTier)).toBe(false);
  });
});

describe('sizeOptions as on the old site', () => {
  it('asks a single size when the variants differ by specification', () => {
    expect(
      sizeOptions(pricingOf('gardenEquipment', 'smallGardenTractor'))
    ).toHaveLength(1);
  });

  it('asks no size for a single variant', () => {
    expect(sizeOptions(pricingOf('householdAppliances', 'dishwasher'))).toEqual(
      []
    );
  });
});
