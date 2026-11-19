import { describe, expect, it } from 'vitest';
import { choiceCookie, clearingCookies, readChoice } from './consentCookie';

const now = Date.UTC(2026, 10, 19);
const choice = {
  version: 2 as const,
  savedAt: now - 1,
  analytics: true,
  marketing: false,
  meta: false,
};

describe('consent cookie', () => {
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
    const out = clearingCookies(
      '_ga=1; _ga_X=2; _gcl_au=3; _fbp=4; lang=lt',
      choice,
      'uzsakymas.ecotrip.lt'
    );
    expect(out.some((c) => c.startsWith('_gcl_au=;'))).toBe(true);
    expect(out.some((c) => c.startsWith('_fbp=;'))).toBe(true);
    expect(out.some((c) => c.startsWith('_ga'))).toBe(false);
    expect(out.some((c) => c.startsWith('lang='))).toBe(false);
    expect(out).toContain(
      '_gcl_au=; Max-Age=0; Path=/; SameSite=Lax; Secure; Domain=.ecotrip.lt'
    );
  });
});
