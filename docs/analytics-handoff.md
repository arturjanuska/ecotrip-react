# Matavimas užsakymų sistemoje uzsakymas.ecotrip.lt

Sveiki! Trumpai apie tai, kas įdiegta užsakymų sistemoje ir ko mums dar reikia iš jūsų pusės.

## Kas įdiegta

- **GTM `GTM-TDDPFVS`.** Kraunamas tik tada, kai lankytojas sutinka su analitikos slapukais, ir tik domene `uzsakymas.ecotrip.lt`.
- **GA4 `G-XNCGY4H0DG`** kode neįrašytas. Jį jungiate per GTM, kad matavimas nesidubliuotų.
- **Slapukų juosta** su tomis pačiomis kategorijomis kaip ecotrip.lt: analitika, Google Ads, Meta. Kol lankytojas nepasirenka (tinka ir „Tik būtinieji“), užsakymo forma už juostos neaktyvi. Pasirinkimą galima pakeisti nuoroda puslapio apačioje.
- **Consent Mode.** Pagal nutylėjimą viskas `denied`, kol lankytojas nesutinka.
- **Asmens duomenys** (vardai, kontaktai, adresai) į įvykius nesiunčiami.

## Kiti kodai, kurie jau buvo projekte

Jų nelietėme. Prašome nuspręsti, ką su jais daryti:

- **Google Ads `AW-792301087`** su konversijomis paspaudus „Siųsti“ ir sėkmingo užsakymo puslapyje. Dabar jis paklūsta Consent Mode, todėl be sutikimo konversijos siunčiamos be slapukų.
- **Meta Pixel `1060218774766985`.** Jis skiriasi nuo pagrindinės svetainės `1158726481773480` ir kraunasi be sutikimo.
- **`amp-analytics`** blokas su tuo pačiu Google Ads kodu. Šioje svetainėje jis greičiausiai neveikia.

## Kokius įvykius siunčiame

### `begin_checkout`: pradėtas užsakymas

Siunčiamas, kai lankytojas pirmą kartą pasirenka paslaugą. Jei tuo metu jis dar nesutiko su slapukais, įvykis išsiunčiamas iškart po sutikimo.

| Laukas | Kas tai | Pavyzdys |
|---|---|---|
| `service` | Pasirinkta paslauga | `productPurchaseService` |
| `direction` | Kryptis | `LT-UK` |
| `ecommerce.currency` | Valiuta | `EUR` |
| `ecommerce.items` | Viena eilutė su paslauga, nes siuntų dar nėra | `[{item_id: 'productPurchaseService', item_name: 'productPurchaseService'}]` |

### `order_created`: užsakymas išsaugotas

Siunčiamas vieną kartą, kai užsakymas sėkmingai išsaugomas sistemoje.

| Laukas | Kas tai | Pavyzdys |
|---|---|---|
| `service` | Paslauga | `productPurchaseService` |
| `direction` | Kryptis | `LT-UK` |
| `ecommerce.transaction_id` | Unikalus užsakymo numeris | `12345` |
| `ecommerce.value` | Visa užsakymo suma su mokesčiais (preliminari, kurią parodė forma) | `113.5` |
| `ecommerce.currency` | Valiuta | `EUR` arba `GBP` |
| `ecommerce.items` | Užsakymo siuntos, po vieną eilutę kiekvienai | žr. žemiau |

Kiekviena siunta `items` sąraše:

| Laukas | Kas tai | Pavyzdys |
|---|---|---|
| `item_id`, `item_name` | Siuntos tipas (subkategorija, o jei jos nėra, kategorija) | `fridge` |
| `item_category` | Kategorija | `householdAppliances` |
| `item_category2` | Subkategorija, jei yra | `fridge` |
| `item_variant` | Dydis ar specifikacija, jei yra | `large` |
| `quantity` | Kiekis | `2` |
| `price` | Vieneto kaina. Nesiunčiama, jei kaina nežinoma | `45` |

Reikšmės yra katalogo raktai, ne išversti pavadinimai, todėl nepriklauso nuo lankytojo kalbos. Paslaugos: `standartShipment`, `parcelForceShipment`, `shipmentWithAddressService`, `productPurchaseService`, `productSalesService`. Kryptys: `LT-UK`, `UK-LT`.

## Kodėl nėra `sign_up` ir `purchase`

- **`sign_up`.** Užsakymų sistemoje nėra registracijos ir prisijungimo, todėl nėra ko matuoti.
- **`purchase`.** Sistemoje nėra integruoto apmokėjimo: klientai moka grynaisiais, kortele ar pavedimu vėliau. Todėl galutinė užsakymo būsena, kurią matome, yra „užsakymas išsaugotas“, t. y. `order_created`. Jame yra visi pardavimo duomenys, kurių prašėte: numeris, suma, valiuta ir paslauga.

## Prašymai jums

1. **GTM žymos.** Sukurti GA4 žymas įvykiams `begin_checkout` ir `order_created`, įjungus „Send Ecommerce data“ iš `dataLayer`.
2. **Pajamos GA4.** GA4 pajamų ataskaitos pildomos tik iš įvykio `purchase`. Jei jų reikia, `order_created` žymoje GA4 įvykio pavadinimą nustatykite `purchase`.
3. **Puslapio adresas.** Prieš GTM į `dataLayer` dedame `ecotrip_page_location` su išvalytu adresu, kuriame lieka tik UTM žymos. Prašome jį naudoti kaip GA4 `page_location`, kad į GA4 nepatektų adresai su užsakymo numeriu.
4. **Lankytojo šaltinis.** GA4 nustatymuose įtraukti `ecotrip.lt` į „unwanted referrals“, kad perėjimas iš pagrindinės svetainės nepakeistų pirminio šaltinio. Abu domenai naudoja tą patį `_ga` slapuką, todėl lankytojas atpažįstamas.
5. **Vienas slapukų pasirinkimas abiem svetainėms.** Užsakymų sistema pasirinkimą saugo slapuke `ecotrip_consent_v1` domene `.ecotrip.lt` tokiu pačiu formatu kaip jūsų įskiepis. Jūsų WP įskiepis jį saugo `localStorage`, kurio subdomenas nemato. Jei įskiepis taip pat skaitytų ir rašytų šį slapuką, lankytojui nereikėtų rinktis du kartus.
6. **Senieji kodai.** Nuspręsti dėl Google Ads, antrojo Meta Pixel ir `amp-analytics` (žr. aukščiau).

## Kaip patikrinti

Atidarykite `uzsakymas.ecotrip.lt` su GTM Preview, paspauskite „Sutinku su visais“ ir pateikite užsakymą. Turėtų pasirodyti `begin_checkout` ir `order_created`. Lokaliai (`localhost`) niekas į GA4 nesiunčiama: įvykiai tik rodomi naršyklės konsolėje.

Parašykite, kai GTM bus sukonfigūruotas, ir kartu peržiūrėsime.
