# GA4 / GTM matavimas uzsakymas.ecotrip.lt: perdavimo pastaba analitikui

## Kas padaryta

Užsakymo formoje (`uzsakymas.ecotrip.lt`) įdiegtas GTM konteineris `GTM-TDDPFVS` (GA4 `G-XNCGY4H0DG`) ir trys užsakymo piltuvo įvykiai. GTM kraunamas tik po analitikos sutikimo ir tik šiame domene. Formoje yra savas slapukų baneris, Consent Mode numatytosios reikšmės nustatomos `index.html` prieš bet kokį kitą skriptą. Į įvykius asmens duomenys nededami: siunčiami tik paslaugos id, kryptis, kaina, valiuta ir užsakymo numeris.

GTM žymų, trigerių ir GA4 nustatymų čia nėra, juos konfigūruoja analitikas.

## Įvykiai

Visi įvykiai siunčiami į `dataLayer` tik esant analitikos sutikimui. Prieš kiekvieną `ecommerce` įvykį pirmiausia išvaloma `ecommerce: null`.

Paslaugų id (iš `getServices.ts`): `shipmentWithAddressService`, `productPurchaseService`, `productSalesService`. Kryptis: `LT-UK` arba `UK-LT` (`shipmentWithAddressService` visada `UK-LT`; jei krypties nėra, `unknown`). Valiuta: `EUR` arba `GBP`.

| Įvykis | Kada siunčiamas | Laukai (pavyzdžiai) |
|---|---|---|
| `begin_checkout` | Pirmą kartą pasirinkus paslaugą 1 žingsnyje (kartą per puslapio įkėlimą, žr. pastabą žemiau) | `ecommerce.currency: 'EUR'`, `ecommerce.items: [{item_id: 'productPurchaseService', item_name: 'productPurchaseService', item_category: 'LT-UK'}]`. `value` kol kas nesiunčiamas, nes kaina dar nežinoma |
| `order_created` | Užsakymą sėkmingai išsaugojus (API atsakymas OK) | `transaction_id: '12345'`, `value: 23.5`, `currency: 'EUR'`, `service: 'productPurchaseService'`, `direction: 'LT-UK'` |
| `purchase` | Kartu su `order_created` | `ecommerce.transaction_id: '12345'`, `ecommerce.value: 23.5`, `ecommerce.currency: 'EUR'`, `ecommerce.items: [...]` kaip aukščiau |

- `order_created` ir `purchase` siunčiami po vieną kartą kiekvienam užsakymo numeriui (apsauga per `sessionStorage`).
- `purchase` reiškia, kad užsakymas išsaugotas. Internetinio apmokėjimo nėra (mokama grynaisiais, kortele ar pavedimu už sistemos ribų), todėl tai ne apmokėjimo faktas.
- `value` yra apskaičiuota preliminari užsakymo kaina (skaičius, 2 skaitmenys po kablelio), ne faktiškai gauta suma. Jei kainos nėra, laukas praleidžiamas.
- `begin_checkout` siunčiamas pirmą kartą pasirinkus paslaugą, jei yra analitikos sutikimas. Jei sutikimas duotas vėliau, jis išsiunčiamas kitą kartą pakeitus paslaugą.

## Metaduomenys prieš `gtm.js`

Prieš pakraunant `gtm.js` į `dataLayer` įrašomi šie raktai (po to dar vienas įvykis `ecotrip_measurement_ready` su tais pačiais raktais):

- `ecotrip_site: 'uzsakymas-v1'` (pagal jį galima atskirti šią svetainę nuo ecotrip.lt)
- `ecotrip_language` (`lt`, `en` arba `ru`)
- `ecotrip_path`
- `ecotrip_page_location` (išvalytas kaip pagrindinėje svetainėje: lieka tik patikrinti `utm_*`, o `gclid`/`gbraid`/`wbraid` tik su rinkodaros sutikimu)
- `ecotrip_page_title`
- `ecotrip_page_referrer` (tik origin)
- `ecotrip_analytics` (visada `true`, nes GTM kraunamas tik su sutikimu)
- `ecotrip_marketing` (`true`/`false`)

## Sutikimas

- Baneris su tomis pačiomis kategorijomis kaip ecotrip.lt: būtini / analitika / Google Ads (rinkodara) / Meta. Mygtukai: tik būtini, sutinku su visais, pasirinkti nustatymus. Poraštėje yra nuoroda nustatymams atidaryti iš naujo.
- Pasirinkimas saugomas slapuke `ecotrip_consent_v1`, `Domain=.ecotrip.lt`, `Path=/`, `SameSite=Lax`, `Secure`, galioja 180 dienų. Reikšmė (URL užkoduotas JSON) tokia pati kaip pagrindinėje svetainėje: `{"version":2,"savedAt":<ms>,"analytics":bool,"marketing":bool,"meta":bool}`. Rinkodara galioja tik kartu su analitika.
- Consent Mode numatytosios reikšmės: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` = `denied`; `ads_data_redaction: true`; `url_passthrough: false`. Po sutikimo `ad_personalization` lieka `denied` visada.
- Atsisakius sutikimo išvalomi `_ga*`, `_gcl_*`, `_fbp`, `_fbc` (šiame domene ir `.ecotrip.lt`) ir puslapis perkraunamas.

**Prašymas:** kad vienas pasirinkimas galiotų abiejose svetainėse, prašome WP įskiepį `ecotrip-measurement` pritaikyti taip, kad jis taip pat skaitytų ir rašytų slapuką `ecotrip_consent_v1` domene `.ecotrip.lt` (dabar jis naudoja tik `localStorage`, kurio subdomenas nemato).

**GA4 nustatymas:** į nepageidaujamų nukreipėjų (unwanted referrals) sąrašą įtraukti `ecotrip.lt`, kad perėjimas iš pagrindinės svetainės nesukurtų naujo šaltinio.

## Seni žymekliai (nekeisti, laukia analitiko sprendimo)

- **Google Ads `AW-792301087`** (gtag `App.tsx`, konversijos `Form.tsx` ir `SuccessModalPage.tsx`). Kodas nepakeistas, bet dabar jis dalijasi `dataLayer` su Consent Mode, todėl be sutikimo startuoja `denied` režimu: konversijos be sutikimo siunčiamos be slapukų.
- **`amp-analytics`** blokas `index.html`: greičiausiai neveikia šioje SPA, reikia sprendimo, ar šalinti.
- **Meta Pixel `1060218774766985`** skiriasi nuo pagrindinės svetainės `1158726481773480`; jis kraunasi ir nustato `_fbp` be sutikimo.

## Kaip tikrinti

- Gamyboje: atverti `uzsakymas.ecotrip.lt`, GTM Preview, paspausti „Sutinku su visais“ ir praeiti formą. Turi pasirodyti `ecotrip_measurement_ready`, `begin_checkout`, `order_created`, `purchase`.
- Lokaliai (`localhost`, peržiūros): nieko nesiunčiama (dry-run), duomenų paketai spausdinami konsolėje (`[measurement]`) ir kaip naršyklės įvykis `ecotrip:measurement-preview`.
