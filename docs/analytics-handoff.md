# GA4 / GTM matavimas uzsakymas.ecotrip.lt: perdavimo pastaba analitikui

## Kas padaryta

Užsakymo formoje (`uzsakymas.ecotrip.lt`) įdiegtas GTM konteineris `GTM-TDDPFVS` (GA4 `G-XNCGY4H0DG`) ir du užsakymo piltuvo įvykiai: `begin_checkout` ir `order_created`. GTM kraunamas tik po analitikos sutikimo ir tik šiame domene. Formoje yra savas slapukų baneris, Consent Mode numatytosios reikšmės nustatomos `index.html` prieš bet kokį kitą skriptą. Į įvykius asmens duomenys nededami: siunčiami tik paslaugos id, kryptis, siuntų katalogo raktai, kiekiai, kainos, valiuta ir užsakymo numeris.

GTM žymų, trigerių ir GA4 nustatymų čia nėra, juos konfigūruoja analitikas.

## Įvykiai

Visi įvykiai siunčiami į `dataLayer` tik esant analitikos sutikimui. Prieš kiekvieną `ecommerce` įvykį pirmiausia išvaloma `ecommerce: null`.

Paslaugų id (iš `getServices.ts`): `standartShipment`, `parcelForceShipment`, `shipmentWithAddressService`, `productPurchaseService`, `productSalesService`. Kryptis: `LT-UK`, `UK-LT` arba `LT-LT` (`shipmentWithAddressService` visada `UK-LT`; jei krypties nėra, `unknown`). Krypčiai `LT-LT` forma paslaugų nerodo, todėl praktiškai įvykiuose bus `LT-UK` arba `UK-LT`. Valiuta: `EUR` arba `GBP`.

| Įvykis | Kada siunčiamas | Laukai (pavyzdžiai) |
|---|---|---|
| `begin_checkout` | Pirmą kartą pasirinkus paslaugą 1 žingsnyje arba iškart po sutikimo, jei paslauga jau pasirinkta (kartą per puslapio įkėlimą) | `service: 'productPurchaseService'`, `direction: 'LT-UK'`, `ecommerce.currency: 'EUR'`, `ecommerce.items: [{item_id: 'productPurchaseService', item_name: 'productPurchaseService'}]`. Siuntų šiuo metu dar nėra, todėl item yra paslauga; `value` nesiunčiamas, nes kaina dar nežinoma |
| `order_created` | Užsakymą sėkmingai išsaugojus (API atsakymas OK) | `service: 'productPurchaseService'`, `direction: 'LT-UK'`, `ecommerce.transaction_id: '12345'`, `ecommerce.value: 113.5`, `ecommerce.currency: 'EUR'`, `ecommerce.items`: po vieną kiekvienai užsakymo siuntai (žr. žemiau) |

`order_created` siuntų `items` (raktai iš CMS katalogo, ne išversti pavadinimai, todėl nepriklauso nuo lankytojo kalbos):

| Laukas | Reikšmė | Pavyzdys |
|---|---|---|
| `item_id`, `item_name` | subkategorija, o jei jos nėra, kategorija | `fridge`, `shipments` |
| `item_category` | kategorija | `householdAppliances` |
| `item_category2` | subkategorija (jei yra) | `fridge` |
| `item_variant` | dydis arba specifikacija (jei yra) | `large` |
| `quantity` | kiekis | `2` |
| `price` | vieneto kaina (siuntos kaina / kiekis), užsakymo valiuta; praleidžiama, jei kaina nežinoma (0) | `45` |

- `purchase` įvykio nėra: užsakymas siunčiamas vienu įvykiu `order_created` su pilnu GA4 `ecommerce` bloku. Jei GA4 pajamų ataskaitoms reikia `purchase`, GTM žymoje GA4 įvykio pavadinimą galima nustatyti `purchase` su trigeriu `order_created` ir „Send Ecommerce data“ iš `dataLayer`.
- `order_created` siunčiamas vieną kartą kiekvienam užsakymo numeriui (apsauga per `sessionStorage`). Tai užsakymo išsaugojimas, ne apmokėjimas: internetinio apmokėjimo nėra (mokama grynaisiais, kortele ar pavedimu už sistemos ribų).
- `value` yra apskaičiuota preliminari visa užsakymo kaina su visais mokesčiais (skaičius, 2 skaitmenys po kablelio), ne faktiškai gauta suma. Todėl `items` kainų suma gali būti mažesnė už `value`. Jei kainos nėra, laukas praleidžiamas.
- Siuntos numeris (`orderedShipmentNumber`) ir prekės pirkimo kaina į įvykius nededami.
- `begin_checkout` siunčiamas pirmą kartą pasirinkus paslaugą, jei yra analitikos sutikimas. Jei paslauga pasirinkta prieš atsakant į banerį, įvykis (su paskutine pasirinkta paslauga) išsiunčiamas iškart po analitikos sutikimo. Be sutikimo jis nesiunčiamas.

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

Jei rinkodaros sutikimas duodamas jau įkėlus GTM, į `dataLayer` dar kartą įrašomi atnaujinti `ecotrip_marketing` ir `ecotrip_page_location`.

**Prašymas:** GA4 konfigūracijos žymoje `page_location` nustatyti iš `ecotrip_page_location`. Kitaip GA4 ims tikrą naršyklės URL, o SPA adresai (pvz. `/success?orderId=...`) nueis neišvalyti.

## Sutikimas

- Baneris su tomis pačiomis kategorijomis kaip ecotrip.lt: būtini / analitika / Google Ads (rinkodara) / Meta. Mygtukai: tik būtini, sutinku su visais, pasirinkti nustatymus. Kol lankytojas nepasirenka (bet kurio varianto, ir „Tik būtinieji“), baneris yra modalinis ir forma už jo neaktyvi. Poraštės apačioje yra nuoroda nustatymams atidaryti iš naujo.
- Pasirinkimas saugomas slapuke `ecotrip_consent_v1`, `Domain=.ecotrip.lt`, `Path=/`, `SameSite=Lax`, `Secure`, galioja 180 dienų. Reikšmė (URL užkoduotas JSON) tokia pati kaip pagrindinėje svetainėje: `{"version":2,"savedAt":<ms>,"analytics":bool,"marketing":bool,"meta":bool}`. Rinkodara galioja tik kartu su analitika.
- Consent Mode numatytosios reikšmės: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` = `denied`; `ads_data_redaction: true`; `url_passthrough: false`. Po sutikimo `ad_personalization` lieka `denied` visada.
- Atsisakius sutikimo išvalomi neleidžiami slapukai `_ga*`, `_gcl_*`, `_fbp`, `_fbc` (šiame domene ir `.ecotrip.lt`). Puslapis perkraunamas tik tada, kai analitikos ar rinkodaros sutikimas atšaukiamas jau įkėlus GTM. Davus sutikimą ar pakeitus tik Meta, puslapis neperkraunamas (sutikimo būsena atnaujinama vietoje).

**Prašymas:** kad vienas pasirinkimas galiotų abiejose svetainėse, prašome WP įskiepį `ecotrip-measurement` pritaikyti taip, kad jis taip pat skaitytų ir rašytų slapuką `ecotrip_consent_v1` domene `.ecotrip.lt` (dabar jis naudoja tik `localStorage`, kurio subdomenas nemato). Kol to nėra, abi svetainės saugo atskirus pasirinkimus, o „Tik būtinieji“ vienoje svetainėje ištrina `.ecotrip.lt` slapukus `_ga*`/`_gcl_*`, nustatytus pagal kitos svetainės sutikimą (GA4 kliento id prasideda iš naujo). Tai dar viena priežastis naudoti bendrą slapuką.

**GA4 nustatymas:** į nepageidaujamų nukreipėjų (unwanted referrals) sąrašą įtraukti `ecotrip.lt`, kad perėjimas iš pagrindinės svetainės nesukurtų naujo šaltinio.

## Seni žymekliai (nekeisti, laukia analitiko sprendimo)

- **Google Ads `AW-792301087`** (gtag `App.tsx`, konversijos `Form.tsx` ir `SuccessModalPage.tsx`). Kodas nepakeistas, bet dabar jis dalijasi `dataLayer` su Consent Mode, todėl be sutikimo startuoja `denied` režimu: konversijos be sutikimo siunčiamos be slapukų.
- **`amp-analytics`** blokas `index.html`: greičiausiai neveikia šioje SPA, reikia sprendimo, ar šalinti.
- **Meta Pixel `1060218774766985`** skiriasi nuo pagrindinės svetainės `1158726481773480`; jis kraunasi ir nustato `_fbp` be sutikimo.

## Kaip tikrinti

- Gamyboje: atverti `uzsakymas.ecotrip.lt`, GTM Preview, paspausti „Sutinku su visais“ ir praeiti formą. Turi pasirodyti `ecotrip_measurement_ready`, `begin_checkout`, `order_created`.
- Lokaliai (`localhost`, peržiūros): naujas GTM/GA4 matavimas veikia dry-run režimu: GTM nekraunamas, duomenų paketai spausdinami konsolėje (`[measurement]`) ir kaip naršyklės įvykis `ecotrip:measurement-preview`. Senas Google Ads gtag (`AW-792301087`) kraunasi ir čia, o po „Sutinku su visais“ gauna sutikimo atnaujinimą.
