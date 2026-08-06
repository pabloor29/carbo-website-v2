export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import React from "react";
import { alternatesFor } from "@/lib/i18n-meta";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return {
    title: "Politique de confidentialité",
    description: "Politique de confidentialité du restaurant CARBO à Carcassonne : collecte, traitement et protection de vos données personnelles conformément au RGPD.",
    alternates: alternatesFor(locale, "/politique-confidentialite"),
    robots: { index: true, follow: true },
  };
}

export default function PolitiqueConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
