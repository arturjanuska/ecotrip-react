import './footer.css';
import { useTranslation } from 'react-i18next';
import {
  getSiteLanguage,
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_FOOTER,
  SITE_PHONES,
  SITE_SOCIALS,
} from '../../utils/variables/ecotripSite';

// The ecotrip.lt site footer, in the language the form is shown in.
const Footer = () => {
  const { i18n } = useTranslation();
  const content = SITE_FOOTER[getSiteLanguage(i18n.language)];

  return (
    <footer className="ecotrip-footer">
      <div className="ecotrip-footer__grid">
        <div className="ecotrip-footer__brand">
          <a
            className="ecotrip-footer__wordmark"
            href={content.home}
            aria-label={content.homeLabel}
          >
            <img
              src="/brand/ecotrip-logo.svg"
              alt=""
              width="1575"
              height="197"
            />
          </a>
          <p>{content.intro}</p>
          <div className="ecotrip-footer__phones">
            {SITE_PHONES.map((phone) => (
              <a key={phone.href} href={phone.href}>
                {phone.label}
              </a>
            ))}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          </div>
        </div>
        {content.nav.map((column) => (
          <nav
            key={column.title}
            className="ecotrip-footer__nav"
            aria-label={column.title.replace(/^\d+ \/ /, '')}
          >
            <p className="ecotrip-eyebrow">{column.title}</p>
            {column.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <aside className="ecotrip-footer__iso" aria-label={content.iso.title}>
        <span className="ecotrip-eyebrow">{content.iso.title}</span>
        <span>9001 · 14001 · 45001</span>
        <a
          href={content.iso.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.iso.certificateLabel}
        >
          <small>{content.iso.certificate}</small>
          <span className="ecotrip-arrow" aria-hidden="true" />
        </a>
      </aside>
      <nav
        className="ecotrip-footer__utility"
        aria-label={content.documents.title}
      >
        <span className="ecotrip-eyebrow">{content.documents.title}</span>
        {content.documents.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div
        className="ecotrip-footer__socials"
        aria-label={content.socialsTitle}
      >
        <span className="ecotrip-eyebrow">{content.socialsTitle}</span>
        {SITE_SOCIALS.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.label} <span className="ecotrip-arrow" aria-hidden="true" />
          </a>
        ))}
      </div>
      <div className="ecotrip-footer__meta">
        <span>© EcoTrip</span>
        <span>{SITE_ADDRESS}</span>
        <span>{content.country}</span>
        <a href={content.contact.href}>{content.contact.label}</a>
      </div>
    </footer>
  );
};

export default Footer;
