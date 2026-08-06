import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.restaurant-carbo.fr";

// Absolute URL for a locale + path. Default locale (fr) is unprefixed
// ('as-needed'), other locales are prefixed (/en, /es, /it).
export function localePath(locale: string, path = ""): string {
  const clean = path && !path.startsWith("/") ? `/${path}` : path;
  return locale === routing.defaultLocale
    ? `${SITE_URL}${clean}`
    : `${SITE_URL}/${locale}${clean}`;
}

// canonical + hreflang alternates (incl. x-default) for a given path.
export function alternatesFor(locale: string, path = "") {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(routing.defaultLocale, path);
  return { canonical: localePath(locale, path), languages };
}

const OG_LOCALE: Record<string, string> = {
  fr: "fr_FR",
  en: "en_GB",
  es: "es_ES",
  it: "it_IT",
};

export function ogLocale(locale: string): string {
  return OG_LOCALE[locale] ?? "fr_FR";
}
