import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["fr", "en", "es", "it"],
  defaultLocale: "fr",
  // French keeps its current URLs (/reservation); other locales are prefixed
  // (/en/reservation). Preserves existing French SEO.
  localePrefix: "as-needed",
  // Always default to French. Do not auto-switch based on the browser's
  // Accept-Language — the visitor picks a language via the navbar switcher.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

// Locale-aware navigation helpers — use these instead of next/link & next/navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
