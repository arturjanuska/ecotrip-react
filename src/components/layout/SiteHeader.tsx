import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/site-header.css';
import {
  getSiteLanguage,
  SITE_FOOTER,
  SITE_PHONES,
} from '../../utils/variables/ecotripSite';

type Props = {
  // Shown next to the wordmark, as the language switch on ecotrip.lt.
  children?: React.ReactNode;
};

// The ecotrip.lt header bar: wordmark with language switch, and phones.
const SiteHeader = ({ children }: Props) => {
  const { i18n } = useTranslation();
  const site = SITE_FOOTER[getSiteLanguage(i18n.language)];

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <a
          className="site-header__wordmark"
          href={site.home}
          aria-label={site.homeLabel}
        >
          <img src="/brand/ecotrip-logo.svg" alt="" width="1575" height="197" />
        </a>
        {children}
      </div>
      <div className="site-header__phones">
        {SITE_PHONES.map((phone) => (
          <a key={phone.href} href={phone.href}>
            {phone.label}
          </a>
        ))}
      </div>
    </header>
  );
};

export default SiteHeader;
