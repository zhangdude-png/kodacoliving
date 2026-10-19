export const AUDIENCE_KEY = "koda-audience";
export const LOCALE_KEY = "koda-locale";
export const LOCALE_SUGGEST_KEY = "koda-locale-suggest";

export type AudiencePreference = "operator" | "landlord" | "dismissed";
export type StoredLocale = "en" | "zh-Hans";

const YEAR = 60 * 60 * 24 * 365;

const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview|lighthouse|headless|wget|curl|bytespider|petalbot/i;

export function isBotUserAgent(ua: string) {
  return BOT_UA.test(ua);
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${YEAR}; SameSite=Lax`;
}

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function persistAudience(value: AudiencePreference) {
  try {
    localStorage.setItem(AUDIENCE_KEY, value);
  } catch {
    /* private mode */
  }
  writeCookie(AUDIENCE_KEY, value);
}

export function readAudience(): AudiencePreference | null {
  const allowed = new Set<AudiencePreference>(["operator", "landlord", "dismissed"]);
  try {
    const stored = localStorage.getItem(AUDIENCE_KEY);
    if (stored && allowed.has(stored as AudiencePreference)) return stored as AudiencePreference;
  } catch {
    /* private mode */
  }
  const cookie = readCookie(AUDIENCE_KEY);
  if (cookie && allowed.has(cookie as AudiencePreference)) return cookie as AudiencePreference;
  return null;
}

export function persistLocale(value: StoredLocale) {
  try {
    localStorage.setItem(LOCALE_KEY, value);
  } catch {
    /* private mode */
  }
  writeCookie(LOCALE_KEY, value);
}

export function readLocale(): StoredLocale | null {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (stored === "en" || stored === "zh-Hans") return stored;
  } catch {
    /* private mode */
  }
  const cookie = readCookie(LOCALE_KEY);
  if (cookie === "en" || cookie === "zh-Hans") return cookie;
  return null;
}

export function dismissLocaleSuggestion() {
  try {
    localStorage.setItem(LOCALE_SUGGEST_KEY, "dismissed");
  } catch {
    /* private mode */
  }
}

export function localeSuggestionDismissed() {
  try {
    return localStorage.getItem(LOCALE_SUGGEST_KEY) === "dismissed";
  } catch {
    return false;
  }
}
