// Links and copy of the ecotrip.lt site footer, per language, as published on
// ecotrip.lt, ecotrip.lt/en/ and ecotrip.lt/ru/.

export type SiteLanguage = 'lt' | 'en' | 'ru';

type FooterLink = { label: string; href: string };

type FooterNav = { title: string; links: FooterLink[] };

export type SiteFooterContent = {
  home: string;
  homeLabel: string;
  intro: string;
  nav: FooterNav[];
  iso: {
    title: string;
    certificate: string;
    certificateLabel: string;
    href: string;
  };
  documents: { title: string; links: FooterLink[] };
  socialsTitle: string;
  country: string;
  contact: FooterLink;
};

const SITE = 'https://ecotrip.lt';

export const SITE_PHONES = [
  { label: 'LT +370 601 22060', href: 'tel:+37060122060' },
  { label: 'UK +44 74796 22299', href: 'tel:+447479622299' },
];

export const SITE_EMAIL = 'info@ecotrip.lt';

export const SITE_ADDRESS = 'Dubysos g. 37, Klaipėda';

export const SITE_SOCIALS: FooterLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/Ecotrip.lt' },
  { label: 'Instagram', href: 'https://www.instagram.com/ecotriplogistika' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ecotrip-transona/',
  },
  { label: 'TikTok', href: 'https://www.tiktok.com/@ecotriplogistika' },
];

const CERTIFICATES = `${SITE}/wp-content/themes/ecotrip/assets/documents/certificates`;

export const SITE_FOOTER: Record<SiteLanguage, SiteFooterContent> = {
  lt: {
    home: `${SITE}/`,
    homeLabel: 'EcoTrip - pagrindinis puslapis',
    intro:
      'Pervežame tai, kas svarbu — privatiems klientams ir įmonėms, Lietuvoje, LT–UK kryptimi ir kitose Europos šalyse.',
    nav: [
      {
        title: '01 / Kryptys',
        links: [
          {
            label: 'Lietuva ↔ Jungtinė Karalystė',
            href: `${SITE}/siuntos-i-anglija-is-lietuvos-is-anglijos-i-lietuva/`,
          },
          {
            label: 'Pervežimai Lietuvoje',
            href: `${SITE}/pervezimai-lietuvoje/`,
          },
          {
            label: 'Pervežimai Europoje',
            href: `${SITE}/pervezimai-europoje/`,
          },
          {
            label: 'Siuntos ir kroviniai',
            href: `${SITE}/privatiems/siuntos-ir-kroviniai/`,
          },
          {
            label: 'Apsipirkimo adresas UK',
            href: `${SITE}/apsipirkimo-adresas-anglijoje/`,
          },
          { label: 'Prekės iš UK', href: `${SITE}/prekes-is-anglijos-uk/` },
        ],
      },
      {
        title: '02 / Verslui',
        links: [
          { label: 'Visos paslaugos verslui', href: `${SITE}/verslui/` },
          {
            label: 'Pervežimas ir distribucija',
            href: `${SITE}/verslui/reguliarus-marsrutai-ir-distribucija/`,
          },
          {
            label: 'Iš parduotuvės — jūsų klientui',
            href: `${SITE}/verslui/pristatymas-jusu-klientui/`,
          },
          {
            label: 'Įmonės perkraustymas',
            href: `${SITE}/privatiems/perkraustymas/?audience=Verslui`,
          },
          {
            label: 'Specialūs pervežimai',
            href: `${SITE}/specialus-pervezimai/?audience=Verslui`,
          },
          {
            label: 'Sandėliavimas ir valdymas',
            href: `${SITE}/verslui/sandeliavimas-ir-kroviniu-valdymas/`,
          },
          {
            label: 'Cross-dock (planuojama)',
            href: `${SITE}/verslui/cross-dock-ir-konteineriu-operacijos/`,
          },
          {
            label: 'Logistika Lietuvos rinkai',
            href: `${SITE}/verslui/logistika-lietuvos-rinkai/`,
          },
          {
            label: 'Logistikos subranga',
            href: `${SITE}/verslui/individualus-transporto-sprendimas/`,
          },
        ],
      },
      {
        title: '03 / Privatiems',
        links: [
          { label: 'Visos paslaugos privatiems', href: `${SITE}/privatiems/` },
          {
            label: 'Namų perkraustymas',
            href: `${SITE}/privatiems/perkraustymas/?audience=Privatiems`,
          },
          {
            label: 'Didelio pirkinio parvežimas',
            href: `${SITE}/prekiu-baldu-pristatymas-kurjeris/?audience=Privatiems`,
          },
          {
            label: 'Specialūs pervežimai',
            href: `${SITE}/specialus-pervezimai/?audience=Privatiems`,
          },
        ],
      },
      {
        title: '04 / EcoTrip ir pagalba',
        links: [
          { label: 'Apie mus', href: `${SITE}/apie-mus/` },
          { label: 'Kontaktai', href: `${SITE}/kontaktai/` },
          { label: 'Kainos', href: `${SITE}/kainos/` },
          { label: 'Dažniausiai užduodami klausimai', href: `${SITE}/duk/` },
          { label: 'Naujienos', href: `${SITE}/naujienos/` },
          { label: 'Karjera', href: `${SITE}/karjera/` },
        ],
      },
    ],
    iso: {
      title: 'ISO vadybos sistemos',
      certificate: 'SRS24/166 · galioja iki 2027-11-27',
      certificateLabel: 'Atverti ISO sertifikatą SRS24/166',
      href: `${CERTIFICATES}/ecotrip-iso-srs24-166-lt.pdf`,
    },
    documents: {
      title: 'Dokumentai',
      links: [
        { label: 'Vežimo taisyklės', href: `${SITE}/vezimo-taisykles/` },
        {
          label: 'Pakavimo taisyklės',
          href: `${SITE}/siuntos-pakavimo-ir-zenklinimo-taisykles/`,
        },
        { label: 'Privatumo politika', href: `${SITE}/privatumo-politika/` },
        { label: 'ES parama', href: `${SITE}/es-parama/` },
      ],
    },
    socialsTitle: 'EcoTrip internete',
    country: 'Lietuva · Jungtinė Karalystė',
    contact: { label: 'Susisiekti', href: `${SITE}/kontaktai/` },
  },
  en: {
    home: `${SITE}/en/`,
    homeLabel: 'EcoTrip - home page',
    intro:
      'We move what matters — for private customers and businesses, in Lithuania, between Lithuania and the UK, and elsewhere in Europe.',
    nav: [
      {
        title: '01 / Destinations',
        links: [
          {
            label: 'Lithuania ↔ United Kingdom',
            href: `${SITE}/en/lithuania-uk-delivery/`,
          },
          {
            label: 'Transport in Lithuania',
            href: `${SITE}/en/transport-in-lithuania/`,
          },
          {
            label: 'Transport across Europe',
            href: `${SITE}/en/transport-in-europe/`,
          },
          {
            label: 'Parcels and freight',
            href: `${SITE}/en/personal/parcels-and-freight/`,
          },
          {
            label: 'UK shopping address',
            href: `${SITE}/en/uk-shopping-address/`,
          },
          {
            label: 'Purchases from the UK',
            href: `${SITE}/en/uk-purchase-and-collection/`,
          },
        ],
      },
      {
        title: '02 / Businesses',
        links: [
          { label: 'All business services', href: `${SITE}/en/business/` },
          {
            label: 'Transport and distribution',
            href: `${SITE}/en/business/transport-and-distribution/`,
          },
          {
            label: 'From your shop to your customer',
            href: `${SITE}/en/business/customer-delivery/`,
          },
          {
            label: 'Business relocation',
            href: `${SITE}/en/personal/removals/?audience=Verslui`,
          },
          {
            label: 'Special transport',
            href: `${SITE}/en/special-transport/?audience=Verslui`,
          },
          {
            label: 'Warehousing and handling',
            href: `${SITE}/en/business/warehousing/`,
          },
          {
            label: 'Cross-docking (planned)',
            href: `${SITE}/en/business/cross-dock-and-containers/`,
          },
          {
            label: 'Logistics for the Lithuanian market',
            href: `${SITE}/en/business/logistics-for-lithuania/`,
          },
          {
            label: 'Logistics subcontracting',
            href: `${SITE}/en/business/logistics-subcontracting/`,
          },
        ],
      },
      {
        title: '03 / Individuals',
        links: [
          {
            label: 'All services for individuals',
            href: `${SITE}/en/personal/`,
          },
          {
            label: 'Home removals',
            href: `${SITE}/en/personal/removals/?audience=Privatiems`,
          },
          {
            label: 'Large purchase delivery',
            href: `${SITE}/en/large-purchase-delivery/?audience=Privatiems`,
          },
          {
            label: 'Special transport',
            href: `${SITE}/en/special-transport/?audience=Privatiems`,
          },
        ],
      },
      {
        title: '04 / EcoTrip and support',
        links: [
          { label: 'About us', href: `${SITE}/en/about-us/` },
          { label: 'Contact', href: `${SITE}/en/contact/` },
          { label: 'Prices', href: `${SITE}/en/prices/` },
          { label: 'Frequently asked questions', href: `${SITE}/en/faq/` },
          { label: 'News', href: `${SITE}/en/news/` },
          { label: 'Careers', href: `${SITE}/en/careers/` },
        ],
      },
    ],
    iso: {
      title: 'ISO management systems',
      certificate: 'SRS24/166 · valid until 2027-11-27',
      certificateLabel: 'Open ISO certificate SRS24/166',
      href: `${CERTIFICATES}/ecotrip-iso-srs24-166-en.pdf`,
    },
    documents: {
      title: 'Documents',
      links: [
        { label: 'Transport rules', href: `${SITE}/en/transport-terms/` },
        { label: 'Packing rules', href: `${SITE}/en/packing-and-labelling/` },
        { label: 'Privacy policy', href: `${SITE}/en/privacy-policy/` },
        { label: 'EU funding', href: `${SITE}/en/eu-support/` },
      ],
    },
    socialsTitle: 'EcoTrip online',
    country: 'Lithuania · United Kingdom',
    contact: { label: 'Get in touch', href: `${SITE}/en/contact/` },
  },
  ru: {
    home: `${SITE}/ru/`,
    homeLabel: 'EcoTrip - главная страница',
    intro:
      'Перевозим важное — для частных клиентов и компаний по Литве, между Литвой и UK и в других странах Европы.',
    nav: [
      {
        title: '01 / Направления',
        links: [
          {
            label: 'Литва ↔ Великобритания',
            href: `${SITE}/ru/dostavka-litva-velikobritaniya/`,
          },
          {
            label: 'Перевозки по Литве',
            href: `${SITE}/ru/perevozki-po-litve/`,
          },
          {
            label: 'Перевозки по Европе',
            href: `${SITE}/ru/perevozki-po-evrope/`,
          },
          {
            label: 'Посылки и грузы',
            href: `${SITE}/ru/chastnym-klientam/posylki-i-gruzy/`,
          },
          {
            label: 'Адрес для покупок в UK',
            href: `${SITE}/ru/adres-dlya-pokupok-v-velikobritanii/`,
          },
          {
            label: 'Покупки из UK',
            href: `${SITE}/ru/pokupka-i-poluchenie-tovarov-v-velikobritanii/`,
          },
        ],
      },
      {
        title: '02 / Бизнесу',
        links: [
          { label: 'Все услуги для бизнеса', href: `${SITE}/ru/dlya-biznesa/` },
          {
            label: 'Перевозка и дистрибуция',
            href: `${SITE}/ru/dlya-biznesa/perevozki-i-distributsiya/`,
          },
          {
            label: 'Из магазина — вашему клиенту',
            href: `${SITE}/ru/dlya-biznesa/dostavka-vashim-klientam/`,
          },
          {
            label: 'Переезд компании',
            href: `${SITE}/ru/chastnym-klientam/pereezdy/?audience=Verslui`,
          },
          {
            label: 'Специальные перевозки',
            href: `${SITE}/ru/nestandartnye-perevozki/?audience=Verslui`,
          },
          {
            label: 'Хранение и обработка грузов',
            href: `${SITE}/ru/dlya-biznesa/skladskie-uslugi/`,
          },
          {
            label: 'Кросс-докинг (планируется)',
            href: `${SITE}/ru/dlya-biznesa/kross-doking-i-konteynery/`,
          },
          {
            label: 'Логистика для рынка Литвы',
            href: `${SITE}/ru/dlya-biznesa/logistika-dlya-rynka-litvy/`,
          },
          {
            label: 'Логистический субподряд',
            href: `${SITE}/ru/dlya-biznesa/logisticheskiy-subpodryad/`,
          },
        ],
      },
      {
        title: '03 / Частным клиентам',
        links: [
          {
            label: 'Все услуги частным клиентам',
            href: `${SITE}/ru/chastnym-klientam/`,
          },
          {
            label: 'Домашние переезды',
            href: `${SITE}/ru/chastnym-klientam/pereezdy/?audience=Privatiems`,
          },
          {
            label: 'Доставка крупных покупок',
            href: `${SITE}/ru/dostavka-krupnyh-pokupok/?audience=Privatiems`,
          },
          {
            label: 'Специальные перевозки',
            href: `${SITE}/ru/nestandartnye-perevozki/?audience=Privatiems`,
          },
        ],
      },
      {
        title: '04 / EcoTrip и помощь',
        links: [
          { label: 'О нас', href: `${SITE}/ru/o-nas/` },
          { label: 'Контакты', href: `${SITE}/ru/kontakty/` },
          { label: 'Цены', href: `${SITE}/ru/tseny/` },
          {
            label: 'Часто задаваемые вопросы',
            href: `${SITE}/ru/voprosy-i-otvety/`,
          },
          { label: 'Новости', href: `${SITE}/ru/novosti/` },
          { label: 'Карьера', href: `${SITE}/ru/karera/` },
        ],
      },
    ],
    iso: {
      title: 'Системы менеджмента ISO',
      certificate: 'SRS24/166 · действует до 2027-11-27',
      certificateLabel: 'Открыть сертификат ISO SRS24/166',
      href: `${CERTIFICATES}/ecotrip-iso-srs24-166-lt.pdf`,
    },
    documents: {
      title: 'Документы',
      links: [
        { label: 'Правила перевозки', href: `${SITE}/ru/pravila-perevozki/` },
        {
          label: 'Правила упаковки',
          href: `${SITE}/ru/upakovka-i-markirovka/`,
        },
        {
          label: 'Политика конфиденциальности',
          href: `${SITE}/ru/politika-konfidentsialnosti/`,
        },
        { label: 'Поддержка ЕС', href: `${SITE}/ru/podderzhka-es/` },
      ],
    },
    socialsTitle: 'EcoTrip в интернете',
    country: 'Литва · Великобритания',
    contact: { label: 'Связаться', href: `${SITE}/ru/kontakty/` },
  },
};

export const getSiteLanguage = (language: string): SiteLanguage =>
  language === 'lt' || language === 'ru' ? language : 'en';
