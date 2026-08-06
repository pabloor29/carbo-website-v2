"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import { useTransition } from "react";

const FLAGS: Record<string, { flag: string; label: string }> = {
  fr: { flag: "🇫🇷", label: "Français" },
  en: { flag: "🇬🇧", label: "English" },
  es: { flag: "🇪🇸", label: "Español" },
  it: { flag: "🇮🇹", label: "Italiano" },
};

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      // usePathname() from i18n/routing is already locale-stripped, so this
      // keeps the current page and only swaps the language.
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`flex items-center gap-1 ${className}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            disabled={isPending}
            aria-label={FLAGS[l].label}
            aria-current={active ? "true" : undefined}
            title={FLAGS[l].label}
            className={`text-xl leading-none px-1.5 py-1 rounded transition-all ${
              active ? "opacity-100 scale-110" : "opacity-50 hover:opacity-90"
            }`}
          >
            {FLAGS[l].flag}
          </button>
        );
      })}
    </div>
  );
}
