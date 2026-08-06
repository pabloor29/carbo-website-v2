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
    title: "Conditions Générales d'Utilisation",
    description: "Conditions générales d'utilisation du site du restaurant CARBO à Carcassonne.",
    alternates: alternatesFor(locale, "/cgu"),
    robots: { index: true, follow: true },
  };
}

export default function CguLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
