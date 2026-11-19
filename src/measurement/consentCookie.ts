import { parseChoice, type ConsentChoice } from './policy';

export const CONSENT_COOKIE = 'ecotrip_consent_v1';
const MAX_AGE_SECONDS = 15552000;
const ROOT_DOMAIN = 'ecotrip.lt';

function inRootDomain(hostname: string): boolean {
  return hostname === ROOT_DOMAIN || hostname.endsWith(`.${ROOT_DOMAIN}`);
}

function cookieNames(cookieString: string): string[] {
  return cookieString
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter(Boolean);
}

export function readChoice(
  cookieString: string,
  now: number
): ConsentChoice | null {
  const prefix = `${CONSENT_COOKIE}=`;
  const entry = cookieString
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  if (!entry) return null;
  try {
    const parsed: unknown = JSON.parse(
      decodeURIComponent(entry.slice(prefix.length))
    );
    return parseChoice(parsed, now);
  } catch {
    return null;
  }
}

export function choiceCookie(choice: ConsentChoice, hostname: string): string {
  const value = encodeURIComponent(
    JSON.stringify({
      version: 2,
      savedAt: choice.savedAt,
      analytics: choice.analytics,
      marketing: choice.marketing,
      meta: choice.meta,
    })
  );
  const domain = inRootDomain(hostname) ? `; Domain=.${ROOT_DOMAIN}` : '';
  return `${CONSENT_COOKIE}=${value}${domain}; Path=/; SameSite=Lax; Secure; Max-Age=${MAX_AGE_SECONDS}`;
}

const ANALYTICS_COOKIE = /^(_ga|_ga_.*|_gid|_gat.*)$/;
const MARKETING_COOKIE = /^_gcl_/;
const META_COOKIE = /^(_fbp|_fbc)$/;

export function clearingCookies(
  cookieString: string,
  choice: ConsentChoice,
  hostname: string
): string[] {
  const domains: (string | null)[] = [
    null,
    hostname,
    `.${hostname}`,
    ...(inRootDomain(hostname) ? [ROOT_DOMAIN, `.${ROOT_DOMAIN}`] : []),
  ];
  const uniqueDomains = domains.filter((d, i) => domains.indexOf(d) === i);
  const out: string[] = [];
  for (const name of new Set(cookieNames(cookieString))) {
    const blocked =
      (!choice.analytics && ANALYTICS_COOKIE.test(name)) ||
      (!choice.marketing && MARKETING_COOKIE.test(name)) ||
      (!choice.meta && META_COOKIE.test(name));
    if (!blocked) continue;
    for (const domain of uniqueDomains) {
      out.push(
        `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure${domain ? `; Domain=${domain}` : ''}`
      );
    }
  }
  return out;
}
