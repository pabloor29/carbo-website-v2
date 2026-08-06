export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import MainPage from "@/components/MainPage";
import Navbar from "@/components/Navbar";
import FormulaPopup from "@/components/FormulaPopup";
import { getMenuData, getMenuFileUrl } from "@/lib/menu";
import { Analytics } from "@vercel/analytics/react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/i18n-meta";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: alternatesFor(locale, ""),
  };
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const categories = await getMenuData();
  const formuleCategory = categories.find((c) => c.name === "Formule du midi");
  const formuleImages = formuleCategory?.files.map((f) => getMenuFileUrl(f.file_path)) ?? [];

  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <HeroBanner />
      <MainPage />
      <Footer />
      <Analytics />
      <FormulaPopup images={formuleImages} autoOpen={true} />
    </main>
  );
}
