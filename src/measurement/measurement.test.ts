import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { OrderSummary } from './policy';

type Measurement = typeof import('./measurement');

const summary: OrderSummary = {
  service: 'productPurchaseService',
  direction: 'LT-UK',
  currency: 'EUR',
  value: 23.5,
};

type Env = {
  win: Record<string, unknown> & { dataLayer?: unknown[] };
  reload: ReturnType<typeof vi.fn>;
  appended: { src?: string }[];
  dataset: Record<string, string>;
  jar: Map<string, string>;
};

let env: Env;

function setup(hostname: string, cookies: Record<string, string> = {}): Env {
  const jar = new Map(Object.entries(cookies));
  const reload = vi.fn();
  const appended: { src?: string }[] = [];
  const dataset: Record<string, string> = {};
  const storage = new Map<string, string>();
  const location = {
    hostname,
    href: `https://${hostname}/?utm_source=news&gclid=${'a'.repeat(20)}`,
    pathname: '/',
    reload,
  };
  const win: Env['win'] = {
    location,
    sessionStorage: {
      getItem: (k: string) => storage.get(k) ?? null,
      setItem: (k: string, v: string) => void storage.set(k, v),
    },
    dispatchEvent: () => true,
  };
  const doc = {
    get cookie() {
      return [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
    },
    set cookie(assignment: string) {
      const [pair, ...attrs] = assignment.split(';');
      const eq = pair.indexOf('=');
      const name = pair.slice(0, eq).trim();
      if (attrs.some((a) => a.trim() === 'Max-Age=0')) jar.delete(name);
      else jar.set(name, pair.slice(eq + 1));
    },
    referrer: '',
    title: 'Ecotrip',
    createElement: () => ({}),
    head: { appendChild: (el: { src?: string }) => appended.push(el) },
    documentElement: { dataset },
  };
  vi.stubGlobal('window', win);
  vi.stubGlobal('document', doc);
  vi.stubGlobal('location', location);
  vi.stubGlobal('sessionStorage', win.sessionStorage);
  return { win, reload, appended, dataset, jar };
}

async function load(): Promise<Measurement> {
  vi.resetModules();
  const m = await import('./measurement');
  m.initMeasurement();
  return m;
}

function consentCookie(analytics: boolean, marketing: boolean, meta: boolean) {
  return encodeURIComponent(
    JSON.stringify({
      version: 2,
      savedAt: Date.now() - 1000,
      analytics,
      marketing,
      meta,
    })
  );
}

function scripts(part: string): { src?: string }[] {
  return env.appended.filter((el) => el.src?.includes(part));
}

function isArgs(entry: unknown): entry is IArguments {
  return Object.prototype.toString.call(entry) === '[object Arguments]';
}

function consentUpdates(): unknown[][] {
  return (env.win.dataLayer ?? [])
    .filter(isArgs)
    .map((a) => Array.from(a))
    .filter((a) => a[0] === 'consent' && a[1] === 'update');
}

function events(name: string): Record<string, unknown>[] {
  return (env.win.dataLayer ?? []).filter(
    (e): e is Record<string, unknown> =>
      !isArgs(e) && (e as Record<string, unknown>).event === name
  );
}

beforeEach(() => {
  vi.spyOn(console, 'debug').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('without consent', () => {
  it('pushes no events', async () => {
    env = setup('uzsakymas.ecotrip.lt');
    const m = await load();
    m.trackBeginCheckout(summary);
    m.trackOrderSaved(summary, '12345');
    expect(env.win.dataLayer).toEqual([]);
    expect(env.appended).toHaveLength(0);
  });

  it('pushes nothing after "only necessary"', async () => {
    env = setup('uzsakymas.ecotrip.lt');
    const m = await load();
    m.trackBeginCheckout(summary);
    m.saveChoice(false, false, false);
    m.trackOrderSaved(summary, '12345');
    expect(env.win.dataLayer).toEqual([]);
    expect(env.appended).toHaveLength(0);
  });
});

describe('production with analytics consent', () => {
  it('loads gtm.js once, after the consent update', async () => {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(true, false, false),
    });
    const m = await load();
    m.initMeasurement();
    m.saveChoice(true, false, false);
    expect(env.appended).toHaveLength(1);
    expect(env.appended[0].src).toBe(
      'https://www.googletagmanager.com/gtm.js?id=GTM-TDDPFVS'
    );
    const dl = env.win.dataLayer ?? [];
    const consentAt = dl.findIndex(
      (e) => isArgs(e) && e[0] === 'consent' && e[1] === 'update'
    );
    const gtmAt = dl.findIndex(
      (e) => !isArgs(e) && (e as Record<string, unknown>).event === 'gtm.js'
    );
    expect(consentAt).toBeGreaterThanOrEqual(0);
    expect(gtmAt).toBeGreaterThan(consentAt);
    expect(events('gtm.js')).toHaveLength(1);
    expect(env.dataset.ecotripMeasurement).toBe('enabled');
  });

  it('sends only order_created, once per order id', async () => {
    env = setup('uzsakymas.ecotrip.lt');
    const m = await load();
    m.saveChoice(true, true, false);
    m.trackOrderSaved(summary, '12345');
    m.trackOrderSaved(summary, '12345');
    expect(events('order_created')).toHaveLength(1);
    expect(events('purchase')).toHaveLength(0);
    const dl = env.win.dataLayer ?? [];
    const orderAt = dl.indexOf(events('order_created')[0]);
    expect(dl[orderAt - 1]).toEqual({ ecommerce: null });
  });

  it('sends begin_checkout chosen before consent once consent is given', async () => {
    env = setup('uzsakymas.ecotrip.lt');
    const m = await load();
    m.trackBeginCheckout({ ...summary, service: 'productSalesService' });
    m.trackBeginCheckout(summary);
    expect(env.win.dataLayer).toEqual([]);
    m.saveChoice(true, false, false);
    expect(events('begin_checkout')).toHaveLength(1);
    m.trackBeginCheckout(summary);
    const sent = events('begin_checkout');
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      ecommerce: { items: [{ item_id: 'productPurchaseService' }] },
    });
    const dl = env.win.dataLayer ?? [];
    expect(dl.indexOf(sent[0])).toBeGreaterThan(
      dl.indexOf(events('gtm.js')[0])
    );
  });
});

describe('changing the choice with GTM loaded', () => {
  async function loaded(marketing: boolean, meta: boolean) {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(true, marketing, meta),
      _fbp: 'fb.1.1',
    });
    const m = await load();
    expect(scripts('gtm.js')).toHaveLength(1);
    return m;
  }

  it('does not reload on a Meta-only change', async () => {
    const m = await loaded(true, true);
    const before = consentUpdates().length;
    m.saveChoice(true, true, false);
    expect(env.reload).not.toHaveBeenCalled();
    expect(consentUpdates()).toHaveLength(before);
    expect(env.jar.has('_fbp')).toBe(false);
    expect(
      JSON.parse(decodeURIComponent(env.jar.get('ecotrip_consent_v1') ?? ''))
    ).toMatchObject({ analytics: true, marketing: true, meta: false });
  });

  it('reloads when marketing is withdrawn', async () => {
    const m = await loaded(true, false);
    m.saveChoice(true, false, false);
    expect(env.reload).toHaveBeenCalledTimes(1);
    expect(env.win['ga-disable-G-XNCGY4H0DG']).toBe(true);
    expect(consentUpdates().at(-1)?.[2]).toMatchObject({
      ad_storage: 'denied',
    });
  });

  it('reloads when analytics is withdrawn', async () => {
    const m = await loaded(false, false);
    m.saveChoice(false, false, false);
    expect(env.reload).toHaveBeenCalledTimes(1);
  });

  it('updates consent in place when marketing is granted', async () => {
    const m = await loaded(false, false);
    const before = consentUpdates().length;
    m.saveChoice(true, true, false);
    expect(env.reload).not.toHaveBeenCalled();
    expect(scripts('gtm.js')).toHaveLength(1);
    expect(consentUpdates()).toHaveLength(before + 1);
    expect(consentUpdates().at(-1)?.[2]).toMatchObject({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
    });
    expect(env.win.dataLayer?.at(-1)).toEqual({
      ecotrip_marketing: true,
      ecotrip_page_location: `https://uzsakymas.ecotrip.lt/?utm_source=news&gclid=${'a'.repeat(20)}`,
    });
  });
});

describe('dry-run outside production', () => {
  it('never loads GTM or reloads, and previews events', async () => {
    env = setup('localhost');
    const m = await load();
    const preview = vi.fn();
    env.win.dispatchEvent = preview;
    m.trackBeginCheckout(summary);
    m.saveChoice(true, true, true);
    expect(env.dataset.ecotripMeasurement).toBe('dry-run');
    expect(env.appended).toHaveLength(0);
    expect(preview).toHaveBeenCalledTimes(1);
    expect(preview.mock.calls[0][0].detail).toMatchObject({
      event: 'begin_checkout',
    });
    m.saveChoice(true, false, true);
    expect(env.reload).not.toHaveBeenCalled();
    expect(consentUpdates().at(-1)?.[2]).toMatchObject({
      ad_storage: 'denied',
    });
    expect(events('begin_checkout')).toHaveLength(0);
  });
});

describe('order_created before leaving the site', () => {
  it('resolves once GTM reports the tags fired', async () => {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(true, false, false),
    });
    const m = await load();
    let resolved = false;
    const sent = m.trackOrderSaved(summary, '777').then(() => {
      resolved = true;
    });
    const [payload] = events('order_created');
    expect(payload.eventTimeout).toBe(2000);
    await Promise.resolve();
    expect(resolved).toBe(false);
    (payload.eventCallback as () => void)();
    await sent;
    expect(resolved).toBe(true);
  });

  it('resolves after the timeout when GTM never answers', async () => {
    vi.useFakeTimers();
    try {
      env = setup('uzsakymas.ecotrip.lt', {
        ecotrip_consent_v1: consentCookie(true, false, false),
      });
      const m = await load();
      let resolved = false;
      const sent = m.trackOrderSaved(summary, '778').then(() => {
        resolved = true;
      });
      await vi.advanceTimersByTimeAsync(1999);
      expect(resolved).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      await sent;
      expect(resolved).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('resolves at once without consent or outside production', async () => {
    env = setup('uzsakymas.ecotrip.lt');
    let m = await load();
    await m.trackOrderSaved(summary, '779');
    env = setup('localhost', {
      ecotrip_consent_v1: consentCookie(true, false, false),
    });
    m = await load();
    await m.trackOrderSaved(summary, '780');
  });
});

describe('Meta Pixel', () => {
  const PIXEL = '1158726481773480';

  function queue(): unknown[][] {
    const fbq = env.win.fbq as { queue: unknown[][] } | undefined;
    return fbq?.queue ?? [];
  }

  it('starts with Meta consent from the shared cookie, PageView only', async () => {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(false, false, true),
    });
    await load();
    expect(scripts('fbevents.js')).toHaveLength(1);
    expect(queue()).toContainEqual(['init', PIXEL]);
    expect(queue()).toContainEqual(['trackSingle', PIXEL, 'PageView']);
    expect(queue()).toContainEqual(['optOut', PIXEL, 'AutomaticMatching']);
    expect(scripts('gtm.js')).toHaveLength(0);
  });

  it('stays off without Meta consent and outside production', async () => {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(true, true, false),
    });
    await load();
    expect(scripts('fbevents.js')).toHaveLength(0);
    expect(env.win.fbq).toBeUndefined();
    env = setup('localhost', {
      ecotrip_consent_v1: consentCookie(true, true, true),
    });
    await load();
    expect(scripts('fbevents.js')).toHaveLength(0);
  });

  it('starts on a later grant and is revoked on withdrawal', async () => {
    env = setup('uzsakymas.ecotrip.lt');
    const m = await load();
    m.saveChoice(false, false, true);
    expect(scripts('fbevents.js')).toHaveLength(1);
    m.saveChoice(false, false, false);
    expect(queue()).toEqual([['consent', 'revoke']]);
    expect(env.dataset.ecotripMeta).toBe('revoked');
    m.saveChoice(false, false, true);
    expect(scripts('fbevents.js')).toHaveLength(1);
  });

  it('starts on any production URL and any referrer', async () => {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(false, false, true),
    });
    (env.win.location as { href: string }).href =
      'https://uzsakymas.ecotrip.lt/?gad_source=1&_gl=1*abc&utm_term=x';
    (document as unknown as { referrer: string }).referrer =
      'https://business.facebook.com/events_manager2/test_events?act=1';
    await load();
    expect(scripts('fbevents.js')).toHaveLength(1);
  });

  it('sends PageView and CompleteRegistration once on the confirmation page', async () => {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(false, false, true),
    });
    const m = await load();
    const before = queue().length;
    m.trackOrderConfirmationView('555');
    expect(queue()).toHaveLength(before);
    void m.trackOrderSaved(summary, '555');
    m.trackOrderConfirmationView('555');
    m.trackOrderConfirmationView('555');
    expect(queue().slice(before)).toEqual([
      ['trackSingle', PIXEL, 'PageView'],
      ['trackSingle', PIXEL, 'CompleteRegistration'],
    ]);
  });

  it('sends no confirmation without Meta consent', async () => {
    env = setup('uzsakymas.ecotrip.lt', {
      ecotrip_consent_v1: consentCookie(true, true, false),
    });
    const m = await load();
    void m.trackOrderSaved(summary, '556');
    m.trackOrderConfirmationView('556');
    expect(env.win.fbq).toBeUndefined();
  });

  it('turns back on after a withdrawal and a new grant', async () => {
    env = setup('uzsakymas.ecotrip.lt');
    const m = await load();
    m.saveChoice(false, false, true);
    m.saveChoice(false, false, false);
    m.saveChoice(false, false, true);
    expect(queue()).toEqual([
      ['consent', 'revoke'],
      ['consent', 'grant'],
    ]);
    expect(env.dataset.ecotripMeta).toBe('requested');
  });
});
