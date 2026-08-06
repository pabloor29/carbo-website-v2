"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { X } from "lucide-react";

const STORAGE_KEY = "carbo-cookie-banner-dismissed";

function CookieBanner() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("text")}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[100] bg-greenBottle text-whiteSmokedBG rounded-xl shadow-2xl p-5 font-cormorantGaramond"
    >
      <button
        onClick={dismiss}
        aria-label={t("close")}
        className="absolute top-2 right-2 p-1 hover:opacity-80"
      >
        <X size={18} />
      </button>
      <p className="text-base md:text-lg leading-snug pr-4">
        {t("text")}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm md:text-base">
        <Link href="/politique-confidentialite" className="underline">
          {t("learnMore")}
        </Link>
        <button
          onClick={dismiss}
          className="ml-auto bg-whiteSmokedBG text-greenBottle px-3 py-1 rounded-md font-semibold hover:opacity-90"
        >
          {t("gotIt")}
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
