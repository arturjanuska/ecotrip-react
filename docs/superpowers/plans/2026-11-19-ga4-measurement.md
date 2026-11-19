# GA4 / GTM Measurement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Load GTM `GTM-TDDPFVS` on uzsakymas.ecotrip.lt behind a cookie banner and push `begin_checkout`, `order_created` and `purchase` to `dataLayer`.

**Architecture:** Pure policy functions (`src/measurement/policy.ts`, `consentCookie.ts`) mirror the ecotrip.lt WP plugin and are unit-tested in node. A small browser runtime (`measurement.ts`) owns the consent state, loads GTM and pushes events. A React banner reads/writes the runtime; `Form.tsx` calls three tracking functions.

**Tech Stack:** React 18, TypeScript, Vite, react-i18next, vitest (node environment, no DOM).

**Spec:** `docs/superpowers/specs/2026-11-19-ga4-measurement-design.md`

## Global Constraints

- GTM id `GTM-TDDPFVS`; GA4 id `G-XNCGY4H0DG` is configured in GTM, never in code.
- Production hostname: exactly `uzsakymas.ecotrip.lt`. Everywhere else: dry-run (no `gtm.js` request).
- Consent cookie: name `ecotrip_consent_v1`, value `encodeURIComponent(JSON.stringify({version: 2, savedAt, analytics, marketing, meta}))`, `Domain=.ecotrip.lt` when hostname is `ecotrip.lt` or ends with `.ecotrip.lt` (else no Domain), `Path=/; SameSite=Lax; Secure; Max-Age=15552000` (180 days).
- Consent Mode: `analytics_storage` = analytics, `ad_storage` and `ad_user_data` = marketing, `ad_personalization` always `denied`. `marketing` is forced false when `analytics` is false.
- `ecotrip_site: 'uzsakymas-v1'`.
- Payloads contain only: service id, direction, numeric value, `EUR`/`GBP`, order id. Never names, e-mails, phones, addresses, postcodes or free text.
- Do not change the old Ads gtag (`App.tsx`), `amp-analytics` (`index.html`), Meta Pixel `1060218774766985`, or the existing `conversion` calls.
- No new npm dependencies. Work happens on local branch `feature/ga4-measurement` (worktree); commit per task there, never push.

## Review Focus

- Stored cookie is malformed, from version 1, older than 180 days or dated in the future → treated as no choice, banner shows.
- Cookie / sessionStorage access throws (privacy mode) → form still works, banner still closes for this page.
- Customer submits, API fails, customer submits again → `order_created`/`purchase` fire once, only for the successful order.
- Success page reloaded or the same order id seen twice → no second `purchase`.
- `estimatedShipmentPrice` empty or `"NaN"` → event still fires without `value`, never `NaN`.

---

### Task 1: Consent and payload policy

**Files:**
- Create: `src/measurement/policy.ts`
- Test: `src/measurement/policy.test.ts`

**Interfaces:**
- Produces:
  - `CONSENT_VERSION = 2`, `CONSENT_MAX_AGE_MS = 180 * 86400000`
  - `type ConsentChoice = { version: 2; savedAt: number; analytics: boolean; marketing: boolean; meta: boolean }`
  - `parseChoice(value: unknown, now: number): ConsentChoice | null` — same rules as main site `policy.choice`.
  - `consentState(choice: ConsentChoice | null): Record<'analytics_storage'|'ad_storage'|'ad_user_data'|'ad_personalization', 'granted'|'denied'>`
  - `cleanPageLocation(href: string, marketing: boolean): string` — origin + pathname; keeps `utm_source|utm_medium|utm_campaign|utm_id|utm_content` matching `/^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/` and not containing `\d{9}`; with marketing also `gclid|gbraid|wbraid` matching `/^[A-Za-z0-9_-]{10,256}$/`.
  - `type OrderSummary = { service: string; direction: string; currency: 'EUR' | 'GBP'; value?: number }`
  - `buildOrderSummary(input: { service: string; direction: string | null; currency: string; price?: string | null }): OrderSummary | null` — `null` when service is empty; direction = `'UK-LT'` for `shipmentWithAddressService`, else input direction or `'unknown'`; `£`→`GBP`, anything else→`EUR`; `value` only when price parses to a finite number ≥ 0, rounded to 2 decimals.
  - `beginCheckoutPayload(s: OrderSummary)`, `orderCreatedPayload(s: OrderSummary, orderId: string)`, `purchasePayload(s: OrderSummary, orderId: string)` — return plain objects (shapes in the tests).

- [ ] **Step 1: Write the failing tests** in `src/measurement/policy.test.ts`:

```ts
const now = Date.UTC(2026, 10, 19);
const ok = { version: 2, savedAt: now - 1000, analytics: true, marketing: true, meta: false };

it('parseChoice accepts a valid choice and forces marketing off without analytics', () => {
  expect(parseChoice(ok, now)).toEqual(ok);
  expect(parseChoice({ ...ok, analytics: false }, now)?.marketing).toBe(false);
});
it('parseChoice rejects wrong version, expired, future and malformed values', () => {
  expect(parseChoice({ ...ok, version: 1 }, now)).toBeNull();
  expect(parseChoice({ ...ok, savedAt: now - CONSENT_MAX_AGE_MS }, now)).toBeNull();
  expect(parseChoice({ ...ok, savedAt: now + 1 }, now)).toBeNull();
  expect(parseChoice({ ...ok, meta: 'yes' }, now)).toBeNull();
  expect(parseChoice(null, now)).toBeNull();
});
it('consentState never grants ad_personalization', () => {
  expect(consentState(null)).toEqual({ analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  expect(consentState(ok)).toEqual({ analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied' });
});
it('cleanPageLocation keeps only valid campaign labels', () => {
  const href = 'https://uzsakymas.ecotrip.lt/?utm_source=google&utm_campaign=a b&email=x@y.lt&gclid=Abc_123-xyz';
  expect(cleanPageLocation(href, false)).toBe('https://uzsakymas.ecotrip.lt/?utm_source=google');
  expect(cleanPageLocation(href, true)).toBe('https://uzsakymas.ecotrip.lt/?utm_source=google&gclid=Abc_123-xyz');
  expect(cleanPageLocation('https://uzsakymas.ecotrip.lt/?utm_source=370612345678', false)).toBe('https://uzsakymas.ecotrip.lt/');
});
it('buildOrderSummary maps currency, direction and price', () => {
  expect(buildOrderSummary({ service: 'productSalesService', direction: 'LT-UK', currency: '£', price: '42.5' }))
    .toEqual({ service: 'productSalesService', direction: 'LT-UK', currency: 'GBP', value: 42.5 });
  expect(buildOrderSummary({ service: 'shipmentWithAddressService', direction: null, currency: '€', price: 'NaN' }))
    .toEqual({ service: 'shipmentWithAddressService', direction: 'UK-LT', currency: 'EUR' });
  expect(buildOrderSummary({ service: '', direction: 'LT-UK', currency: '€' })).toBeNull();
});
it('payloads have the GA4 shapes and nothing else', () => {
  const s = { service: 'productSalesService', direction: 'LT-UK', currency: 'EUR' as const, value: 30 };
  const item = { item_id: 'productSalesService', item_name: 'productSalesService', item_category: 'LT-UK' };
  expect(beginCheckoutPayload(s)).toEqual({ event: 'begin_checkout', ecommerce: { currency: 'EUR', value: 30, items: [item] } });
  expect(orderCreatedPayload(s, 'A1')).toEqual({ event: 'order_created', transaction_id: 'A1', value: 30, currency: 'EUR', service: 'productSalesService', direction: 'LT-UK' });
  expect(purchasePayload(s, 'A1')).toEqual({ event: 'purchase', ecommerce: { transaction_id: 'A1', value: 30, currency: 'EUR', items: [item] } });
  expect(purchasePayload({ ...s, value: undefined }, 'A1').ecommerce).not.toHaveProperty('value');
});
```

- [ ] **Step 2: Run** `npx vitest run src/measurement/policy.test.ts` — expected FAIL (module not found).
- [ ] **Step 3: Implement** the Interfaces above in `src/measurement/policy.ts`. Omit `value` keys entirely when undefined (no `value: undefined`).
- [ ] **Step 4: Run** `npx vitest run src/measurement/policy.test.ts` — expected PASS.

### Task 2: Consent cookie

**Files:**
- Create: `src/measurement/consentCookie.ts`
- Test: `src/measurement/consentCookie.test.ts`

**Interfaces:**
- Consumes: `parseChoice`, `ConsentChoice` (Task 1).
- Produces:
  - `CONSENT_COOKIE = 'ecotrip_consent_v1'`
  - `readChoice(cookieString: string, now: number): ConsentChoice | null` — finds the cookie, `decodeURIComponent` + `JSON.parse` in try/catch, then `parseChoice`.
  - `choiceCookie(choice: ConsentChoice, hostname: string): string` — full `document.cookie` assignment per Global Constraints.
  - `clearingCookies(cookieString: string, choice: ConsentChoice, hostname: string): string[]` — expiring assignments (`Max-Age=0; Path=/; SameSite=Lax; Secure`) for `_ga`, `_ga_*`, `_gid`, `_gat*` without analytics; `_gcl_*` without marketing; `_fbp`, `_fbc` without meta. One assignment per cookie per domain variant: none, hostname, `.hostname`, plus `ecotrip.lt` and `.ecotrip.lt` under `*.ecotrip.lt`.

- [ ] **Step 1: Write the failing tests:**

```ts
const now = Date.UTC(2026, 10, 19);
const choice = { version: 2 as const, savedAt: now - 1, analytics: true, marketing: false, meta: false };

it('round-trips a choice through the cookie string', () => {
  const assignment = choiceCookie(choice, 'uzsakymas.ecotrip.lt');
  expect(assignment).toContain('Domain=.ecotrip.lt');
  expect(assignment).toContain('Max-Age=15552000');
  expect(readChoice('a=1; ' + assignment.split(';')[0], now)).toEqual(choice);
});
it('uses a host-only cookie outside ecotrip.lt', () => {
  expect(choiceCookie(choice, 'localhost')).not.toContain('Domain=');
});
it('ignores a broken cookie', () => {
  expect(readChoice('ecotrip_consent_v1=%7Bbroken', now)).toBeNull();
  expect(readChoice('', now)).toBeNull();
});
it('expires only cookies the choice does not allow', () => {
  const out = clearingCookies('_ga=1; _ga_X=2; _gcl_au=3; _fbp=4; lang=lt', choice, 'uzsakymas.ecotrip.lt');
  expect(out.some(c => c.startsWith('_gcl_au=;'))).toBe(true);
  expect(out.some(c => c.startsWith('_fbp=;'))).toBe(true);
  expect(out.some(c => c.startsWith('_ga'))).toBe(false);
  expect(out.some(c => c.startsWith('lang='))).toBe(false);
  expect(out).toContain('_gcl_au=; Max-Age=0; Path=/; SameSite=Lax; Secure; Domain=.ecotrip.lt');
});
```

- [ ] **Step 2: Run** `npx vitest run src/measurement/consentCookie.test.ts` — expected FAIL.
- [ ] **Step 3: Implement** the Interfaces above.
- [ ] **Step 4: Run** the same command — expected PASS.

### Task 3: Browser runtime, Consent Mode default and tracking API

**Files:**
- Create: `src/measurement/measurement.ts`
- Modify: `index.html` (inline script as the first element in `<head>` after `<meta charset>`)
- Modify: `src/main.tsx` (call `initMeasurement()` before `createRoot`)

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces:
  - `initMeasurement(): void` — reads the cookie, applies `clearingCookies`, starts GTM if analytics was granted. Idempotent.
  - `getChoice(): ConsentChoice | null`
  - `subscribe(listener: () => void): () => void` and `getSnapshot(): { choice: ConsentChoice | null; settingsOpen: boolean }` (stable object between changes, for `useSyncExternalStore`).
  - `saveChoice(analytics: boolean, marketing: boolean, meta: boolean): void` — writes cookie (try/catch, in-memory fallback), clears disallowed cookies; if GTM was already loaded and the choice changed: `window['ga-disable-G-XNCGY4H0DG'] = true`, `gtag('consent','update', …)`, `location.reload()`; otherwise start.
  - `openCookieSettings(): void`, `closeCookieSettings(): void`
  - `trackBeginCheckout(s: OrderSummary): void` — once per page load.
  - `trackOrderSaved(s: OrderSummary, orderId: string): void` — pushes `order_created` then `purchase`; once per order id via sessionStorage key `ecotrip_tracked_order_<id>` (try/catch, in-memory Set fallback).
  - Every push goes through one `push(payload)`: does nothing without analytics consent; pushes `{ ecommerce: null }` before payloads that have `ecommerce`; in dry-run calls `console.debug('[measurement]', payload)` and dispatches `ecotrip:measurement-preview` instead of pushing.
- Start (with analytics consent): `gtag('consent','update', consentState(choice))`; on production only: push metadata `{ ecotrip_site: 'uzsakymas-v1', ecotrip_language: i18n.language (lt|en|ru, else lt), ecotrip_path: location.pathname, ecotrip_page_location: cleanPageLocation(location.href, marketing), ecotrip_page_title: document.title, ecotrip_page_referrer: referrer origin + '/' or '', ecotrip_analytics: true, ecotrip_marketing }`, then `{ 'gtm.start': Date.now(), event: 'gtm.js' }`, append `https://www.googletagmanager.com/gtm.js?id=GTM-TDDPFVS`, then push `{ event: 'ecotrip_measurement_ready', ...metadata }`. Set `document.documentElement.dataset.ecotripMeasurement` to `enabled` or `dry-run`.
- `index.html` inline script (exact):

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);
</script>
```

- [ ] **Step 1: Implement** `measurement.ts`, the `index.html` script and the `main.tsx` call.
- [ ] **Step 2: Run** `npm run type-check` — expected no errors.
- [ ] **Step 3: Verify in browser** (`npm start`, localhost): before consent `window.dataLayer` holds the `consent default` entry and no `gtm.js` request is made; `document.documentElement.dataset.ecotripMeasurement` is unset.

### Task 4: Cookie banner and footer link

**Files:**
- Create: `src/components/consent/CookieBanner.tsx`, `src/components/consent/cookieBanner.css`
- Modify: `src/main.tsx` (render `<CookieBanner />` after `<Footer />`)
- Modify: `src/components/footer/Footer.tsx` (button "cookieSettings" calling `openCookieSettings()`, next to the contacts)
- Modify: `src/utils/i18n/locales/{lt,en,ru}/*.json`

**Interfaces:**
- Consumes: `subscribe`, `getSnapshot`, `saveChoice`, `openCookieSettings`, `closeCookieSettings` (Task 3).

- Banner (no choice yet): fixed bottom bar, title + intro + buttons `cookieReject` → `saveChoice(false,false,false)`, `cookieAccept` → `saveChoice(true,true,true)`, `cookieSettings` → `openCookieSettings()`.
- Settings: native `<dialog>` opened with `showModal()` while `settingsOpen`; checkboxes analytics / marketing / meta pre-filled from the choice; marketing disabled and unchecked while analytics is unchecked; buttons `cookieReject` and `cookieSave`; close `×` with `aria-label={t('cookieClose')}`; link `cookiePrivacy` → `https://ecotrip.lt/privatumo-politika/`; retention line.
- i18n keys and texts: copy verbatim from the main site's `consent.js` `messages` (lt/en/ru) into keys `cookieTitle, cookieIntro, cookieReject, cookieAccept, cookieSettings, cookieSave, cookieClose, cookiePreferences, cookieAnalytics, cookieAnalyticsText, cookieMarketing, cookieMarketingText, cookieMeta, cookieMetaText, cookieRetention, cookiePrivacy`. Adapt `cookieAnalyticsText` to the order form: LT "„Google Analytics“ padeda suprasti, kaip naudojama užsakymo forma. Skaičiuojame užsakymo žingsnius ir sėkmingus užsakymus neperduodami formos laukų turinio." EN "Google Analytics helps us understand how the order form is used. We count order steps and successful orders without sending form field contents." RU "Google Analytics помогает понять, как используется форма заказа. Мы считаем шаги заказа и успешные заказы без передачи содержимого полей формы."
- Style with existing tokens from `globals.css` / DaisyUI; works at 375px width.

- [ ] **Step 1: Implement** banner, CSS, footer button, i18n keys.
- [ ] **Step 2: Run** `npm run type-check` — expected no errors.
- [ ] **Step 3: Verify in browser:** banner shows on first visit; "Accept all" hides it and sets cookie `ecotrip_consent_v1` (localhost, host-only); `dataset.ecotripMeasurement === 'dry-run'`; footer button reopens the dialog with the saved values; switching language changes banner texts; mobile width has no horizontal scroll.

### Task 5: Wire events into the order form

**Files:**
- Modify: `src/pages/Form.tsx`

**Interfaces:**
- Consumes: `buildOrderSummary` (Task 1), `trackBeginCheckout`, `trackOrderSaved` (Task 3).

- `begin_checkout`: `useEffect` on `service`; when `buildOrderSummary({ service, direction, currency, price: undefined })` is not null, call `trackBeginCheckout`.
- Order saved: in `onSubmit`, build the summary from `data` (`service`, `direction`, `currency`, `estimatedShipmentPrice`) and keep it in a `useRef` before `mutateAsync`. In `onSuccess`, before the `data.url` redirect branch, call `trackOrderSaved(summaryRef.current, data.orderId)` when both exist.
- Leave `triggerGoogleConversion` and `SuccessModalPage` unchanged.

- [ ] **Step 1: Implement** the wiring.
- [ ] **Step 2: Verify in browser** (localhost, after "Accept all"): choosing a service logs one `begin_checkout`; choosing another service logs nothing new; submitting a test order logs `order_created` then `purchase` with the API order id, `EUR`/`GBP` and numeric `value`, and no personal data. With "Essential only" nothing is logged. Do not submit test orders against production without the user's OK — if no test API is available, stub `postData` locally for the check and revert.

### Task 6: Full check and analyst handoff

**Files:**
- Create: `docs/analytics-handoff.md`

- [ ] **Step 1: Run** `npm test`, `npm run type-check`, `npm run lint`, `npm run build` — all pass (build runs `prebuild` snapshot refresh; restore `src/data/*.snapshot.json` changes not made by this work).
- [ ] **Step 2: Write** `docs/analytics-handoff.md` (Lithuanian, for the analyst): events with fields; `ecotrip_site: 'uzsakymas-v1'` and metadata keys; consent cookie name/format/domain and the request to make the WP plugin read and write it; unwanted referral `ecotrip.lt`; old tags left untouched (Ads gtag, amp-analytics, Meta Pixel `1060218774766985` vs `1158726481773480`) and that Consent Mode default now applies to the old Ads gtag; how to test (GTM Preview on uzsakymas.ecotrip.lt after "Accept all").
