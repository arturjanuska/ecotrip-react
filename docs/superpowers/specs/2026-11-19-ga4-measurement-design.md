# GA4 / GTM measurement for uzsakymas.ecotrip.lt — design

## Intent

The analyst asked to connect the order form (`uzsakymas.ecotrip.lt`) to GA4
`G-XNCGY4H0DG` through GTM container `GTM-TDDPFVS`, which ecotrip.lt already
uses, and to send the order funnel events. Requirements from the analyst: no
duplicate measurement, keep the visitor's original source when coming from
ecotrip.lt, respect the cookie choice, send no personal data. The analyst
configures GTM and does the final check.

## Facts found

- ecotrip.lt loads GTM through its own WP mu-plugin `ecotrip-measurement`
  (`policy.js`, `consent.js`, `meta.js`). GTM loads only after analytics
  consent; Consent Mode default is `denied`; `ad_personalization` is always
  denied; `ads_data_redaction` true; `url_passthrough` false; page location
  keeps only validated `utm_*` (and `gclid`/`gbraid`/`wbraid` with marketing
  consent).
- The choice is stored in `localStorage['ecotrip_consent_v1']` as
  `{version: 2, savedAt, analytics, marketing, meta}`, valid 180 days. The
  subdomain cannot read it.
- The order form has no GA4/GTM and no cookie banner. It has Google Ads
  `AW-792301087` (gtag in `App.tsx`, conversions in `Form.tsx` and
  `SuccessModalPage.tsx`), `amp-analytics` in `index.html`, and Meta Pixel
  `1060218774766985` (the main site uses `1158726481773480`).
- No sign-up and no online payment: payment is cash, card or bank transfer,
  outside the system.

## Decisions (user)

- Own banner in the app, same categories and texts as ecotrip.lt; the choice
  is also written to a cookie on `.ecotrip.lt` so the main site can share it
  later (the WP plugin change is the analyst's side).
- Old tags (Ads gtag, amp-analytics, Meta Pixel 1060218774766985): not
  touched, only reported to the analyst.
- `begin_checkout`: when the customer selects a service in step 1, once per
  page load.
- `purchase`: when the order is saved (successful API answer), together with
  `order_created`. No `sign_up`.

## Approaches

- **A — chosen.** Own small module `src/measurement/` mirroring the main
  site's policy (same choice format, Consent Mode, metadata keys, UTM
  cleaning) plus a React banner. GTM receives the same shape the analyst
  already configured.
- B. Load the main site's plugin scripts: hard-coded `ecotrip.lt` hostname
  (dry-run on the subdomain), WP footer selectors, localStorage. Needs plugin
  changes.
- C. Libraries (`react-gtm-module`, `vanilla-cookieconsent`): new
  dependencies, behaviour different from the main site.

## Design

- **Consent store.** Cookie `ecotrip_consent_v1`, `Domain=.ecotrip.lt` (host
  only on localhost), `Path=/`, `SameSite=Lax`, `Secure`, `Max-Age` 180 days,
  value = the same JSON as the main site. Same validation as `policy.choice`.
- **Consent Mode default** is pushed from an inline script in `index.html`
  `<head>` before anything else, same values as the main site. Side effect:
  the old Ads gtag shares `dataLayer`, so it also starts in `denied` mode
  until the visitor consents. The Ads code itself is unchanged.
- **GTM loader.** Only after analytics consent and only on hostname
  `uzsakymas.ecotrip.lt`. Elsewhere (localhost, previews) dry-run: payloads go
  to `console.debug` and a `ecotrip:measurement-preview` event. Before
  `gtm.js` it pushes metadata: `ecotrip_site: 'uzsakymas-v1'`,
  `ecotrip_language`, `ecotrip_path`, `ecotrip_page_location` (cleaned as on
  the main site), `ecotrip_page_referrer` (origin only), `ecotrip_analytics`,
  `ecotrip_marketing`.
- **Banner.** React component with "Essential only / Accept all / Choose
  settings" and the analytics / Google Ads / Meta options, texts from the
  main site in LT/EN/RU i18n. A "Cookie settings" link in the footer reopens
  it. Withdrawing consent clears `_ga*`, `_gcl_*`, `_fb[pc]` on the host and
  `.ecotrip.lt`, then reloads, as the main site does.
- **Events** (pushed to `dataLayer` only with analytics consent; `ecommerce:
  null` before each ecommerce event):
  - `begin_checkout` — `ecommerce.currency`, `items: [{item_id: service,
    item_name: service, item_category: direction}]`.
  - `order_created` — `transaction_id`, `value`, `currency`, `service`,
    `direction`.
  - `purchase` — `ecommerce.transaction_id`, `value`, `currency`, `items`
    as above.
  - Currency symbol `€`/`£` maps to `EUR`/`GBP`; value = estimated order
    price as a number. `transaction_id` = order id from the API.
  - `order_created`/`purchase` fire once per order id (sessionStorage guard).
    If the API answers with a redirect `url` (old Paysera path, currently
    unused) the events still fire before the redirect.
- **No personal data.** Payloads are built from a whitelist: service id,
  direction, price, currency, order id. No names, e-mails, phones, addresses,
  postcodes or free text.

## Left to the builder

- File layout inside `src/measurement/`, test cases (pure policy functions
  get unit tests with vitest).

## Analyst's side (handoff note)

- GA4 tags and triggers in GTM for the events above; unwanted referral
  `ecotrip.lt`; reading/writing the shared cookie in the WP plugin; decision
  on the old Ads gtag, amp-analytics and the second Meta Pixel.
