export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import React from "react";
import { getTranslations } from "next-intl/server";
import { alternatesFor } from "@/lib/i18n-meta";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: alternatesFor(locale, "/apropos"),
  };
}

export default function AproposLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
